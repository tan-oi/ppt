import { useState, useMemo, useEffect } from "react";
import { useUIStore } from "@/lib/store/ui-store";
import { RowData, ChartConfig, EditingCell } from "@/lib/types";

const COLORS = [
  "hsl(220, 90%, 56%)",
  "hsl(280, 90%, 60%)",
  "hsl(160, 85%, 45%)",
  "hsl(340, 85%, 55%)",
  "hsl(20, 85%, 55%)",
  "hsl(60, 85%, 55%)",
  "hsl(180, 85%, 45%)",
  "hsl(300, 85%, 55%)",
];

const MAX_ROWS = 8;
const MAX_COLUMNS = 5;

interface UseChartTableDataProps {
  initialData: RowData[] | null;
  initialConfig?: ChartConfig;
  initialXKey?: string;
  chartType?: string;
}

export function useChartTableData({
  initialData,
  initialConfig,
  initialXKey,
  chartType,
}: UseChartTableDataProps) {
  const defaultData = [
    { month: "January", desktop: 186.4, mobile: 80, computer: 20, ipod: 20 },
    { month: "February", desktop: 305, mobile: 200, computer: 20, ipod: 40 },
    { month: "March", desktop: 237, mobile: 120, computer: 20, ipod: 40 },
    { month: "April", desktop: 73, mobile: 190, computer: 20, ipod: 100 },
  ];

  const defaultConfig = {
    desktop: { label: "Desktop", color: "hsl(220, 90%, 56%)" },
    mobile: { label: "Mobile", color: "hsl(280, 90%, 60%)" },
    computer: { label: "Computer", color: "hsl(160, 85%, 45%)" },
    ipod: { label: "Ipod", color: "hsl(340, 85%, 55%)" },
  };

  const [data, setData] = useState<RowData[]>(initialData || defaultData);
  const [config, setConfig] = useState<ChartConfig>(
    initialConfig || defaultConfig
  );
  const [xAxisKey, setXAxisKey] = useState<string>(
    initialXKey || (data.length > 0 ? Object.keys(data[0])[0] : "month")
  );

  const dataColumns = useMemo(
    () =>
      data.length > 0 ? Object.keys(data[0]).filter((k) => k !== xAxisKey) : [],
    [data, xAxisKey]
  );

  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [newlyAddedRows, setNewlyAddedRows] = useState<Set<number>>(new Set());
  const [newlyAddedColumns, setNewlyAddedColumns] = useState<Set<string>>(
    new Set()
  );

  // Clear newly added row highlights after 2 seconds
  useEffect(() => {
    if (newlyAddedRows.size > 0) {
      const timer = setTimeout(() => setNewlyAddedRows(new Set()), 2000);
      return () => clearTimeout(timer);
    }
  }, [newlyAddedRows]);

  // Clear newly added column highlights after 2 seconds
  useEffect(() => {
    if (newlyAddedColumns.size > 0) {
      const timer = setTimeout(() => setNewlyAddedColumns(new Set()), 2000);
      return () => clearTimeout(timer);
    }
  }, [newlyAddedColumns]);

  // Update edit buffer when not editing
  useEffect(() => {
    if (!editingCell && !editingHeader) {
      const currentBuffer = useUIStore.getState().editBuffer?.widgetData;
      useUIStore.getState().updateEditBuffer({
        ...currentBuffer,
        data,
        config,
        xKey: xAxisKey,
      });
    }
  }, [editingCell, editingHeader, data, config, xAxisKey]);

  const updateCell = (rowIndex: number, colName: string, value: string) => {
    setData((prev) => {
      const newData = [...prev];
      const parsedValue = colName === xAxisKey ? value : Number(value) || 0;
      newData[rowIndex] = { ...newData[rowIndex], [colName]: parsedValue };
      return newData;
    });
  };

  const updateXAxisName = (newName: string) => {
    if (
      !newName.trim() ||
      newName === xAxisKey ||
      dataColumns.includes(newName)
    ) {
      alert("Invalid X-axis name!");
      setEditingHeader(null);
      return;
    }
    setData((prev) =>
      prev.map((row) => {
        const { [xAxisKey]: value, ...rest } = row;
        return { [newName]: value, ...rest };
      })
    );
    setXAxisKey(newName);
    setEditingHeader(null);
  };

  const updateSeriesName = (oldName: string, newName: string) => {
    if (
      !newName.trim() ||
      newName === oldName ||
      newName === xAxisKey ||
      dataColumns.includes(newName)
    ) {
      alert("Invalid series name!");
      setEditingHeader(null);
      return;
    }

    setData((prev) =>
      prev.map((row) => {
        const newRow = { ...row };
        newRow[newName] = newRow[oldName];
        delete newRow[oldName];
        return newRow;
      })
    );

    if (config[oldName]) {
      setConfig((prev) => {
        const newCfg = { ...prev };
        newCfg[newName] = {
          ...newCfg[oldName],
          label: newName.charAt(0).toUpperCase() + newName.slice(1),
        };
        delete newCfg[oldName];
        return newCfg;
      });
    }
    setEditingHeader(null);
  };

  const addRow = () => {
    if (data.length >= MAX_ROWS) return;
    const newRow: RowData = { [xAxisKey]: "" };
    dataColumns.forEach((col) => {
      newRow[col] = 0;
    });
    setData((prev) => [...prev, newRow]);
    setNewlyAddedRows((prev) => new Set([...prev, data.length]));
  };

  const deleteRow = (index: number) => {
    if (data.length <= 1) return;
    setData((prev) => prev.filter((_, i) => i !== index));
    setNewlyAddedRows((prev) => {
      const updated = new Set<number>();
      prev.forEach((idx) => {
        if (idx > index) updated.add(idx - 1);
        else if (idx !== index) updated.add(idx);
      });
      return updated;
    });
  };

  const addColumn = () => {
    if (chartType === "pie") return;
    if (dataColumns.length + 1 >= MAX_COLUMNS) return;

    let newColName = `series${dataColumns.length + 1}`;
    let counter = 1;
    while ([xAxisKey, ...dataColumns].includes(newColName)) {
      newColName = `series${dataColumns.length + counter++}`;
    }

    setData((prev) => prev.map((row) => ({ ...row, [newColName]: 0 })));
    setNewlyAddedColumns((prev) => new Set([...prev, newColName]));

    const colorIndex = Object.keys(config).length % COLORS.length;
    setConfig((prev) => ({
      ...prev,
      [newColName]: {
        label: newColName.charAt(0).toUpperCase() + newColName.slice(1),
        color: COLORS[colorIndex],
      },
    }));
  };

  const deleteColumn = (colName: string) => {
    if (colName === xAxisKey) {
      alert("Cannot delete the X-axis column!");
      return;
    }
    if (dataColumns.length <= 1) {
      alert("Need at least one series!");
      return;
    }
    setData((prev) =>
      prev.map((row) => {
        const { [colName]: _, ...rest } = row;
        return rest;
      })
    );
    setNewlyAddedColumns((prev) => {
      const updated = new Set(prev);
      updated.delete(colName);
      return updated;
    });
    setConfig((prev) => {
      const { [colName]: _, ...rest } = prev;
      return rest;
    });
  };

  const isMaxRows = data.length >= MAX_ROWS;
  const isMaxColumns = dataColumns.length + 1 >= MAX_COLUMNS;

  return {
    data,
    config,
    xAxisKey,
    dataColumns,
    editingCell,
    editingHeader,
    newlyAddedRows,
    newlyAddedColumns,
    isMaxRows,
    isMaxColumns,

    setData,
    setConfig,
    setXAxisKey,
    setEditingCell,
    setEditingHeader,

    updateCell,
    updateXAxisName,
    updateSeriesName,
    addRow,
    deleteRow,
    addColumn,
    deleteColumn,

    MAX_ROWS,
    MAX_COLUMNS,
  };
}
