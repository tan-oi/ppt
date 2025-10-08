import { useUIStore } from "@/lib/store/ui-store";
import { Check, Copy, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type RowData = Record<string, string | number>;

type Data = {
  data: RowData[];
  chartType: "bar" | "line" | "area" | "pie";
};
interface ChartTableProps {
  data?: Data;
}

interface EditingCell {
  row: number;
  col: string;
}

export function ChartTable(props: ChartTableProps) {
  const MAX_ROWS = 8;
  const MAX_COLUMNS = 8;

  console.log(props);
  const [data, setData] = useState<RowData[]>(
    props?.data?.data || [
      { month: "January", desktop: 186.4, mobile: 80, computer: 20, ipod: 20 },
      { month: "February", desktop: 305, mobile: 200, computer: 20, ipod: 40 },
      { month: "March", desktop: 237, mobile: 120, computer: 20, ipod: 40 },
      { month: "April", desktop: 73, mobile: 190, computer: 20, ipod: 100 },
    ]
  );

  const columns = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
    [data]
  );
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [showJson, setShowJson] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!editingCell) {
      useUIStore.getState().updateEditBuffer(data);
      console.log(data);
    }
  }, [editingCell, data]);
  const updateCell = (rowIndex: number, colName: string, value: string) => {
    const newData = [...data];
    const numValue = colName === columns[0] ? value : Number(value) || 0;
    newData[rowIndex] = { ...newData[rowIndex], [colName]: numValue };
    setData(newData);
  };

  const updateColumnName = (oldName: string, newName: string) => {
    if (!newName.trim() || newName === oldName) return;
    if (columns.includes(newName)) {
      alert("Column name already exists!");
      return;
    }

    const newData = data.map((row) => {
      const newRow: Record<string, string | number> = {
        ...row,
        [newName]: row[oldName],
      };
      delete newRow[oldName];
      return newRow;
    });
    setData(newData);
  };

  const addRow = () => {
    if (data.length >= MAX_ROWS) return;
    const newRow: RowData = {};
    columns.forEach((col, i) => {
      newRow[col] = i === 0 ? "" : 0;
    });
    setData([...data, newRow]);
  };

  const deleteRow = (index: number) => {
    if (data.length <= 1) return;
    setData(data.filter((_, i) => i !== index));
  };

  const addColumn = () => {
    if (columns.length >= MAX_COLUMNS) return;

    let newColName = `column${columns.length + 1}`;
    let counter = 1;
    while (columns.includes(newColName)) {
      counter++;
      newColName = `column${columns.length + counter}`;
    }

    const newData = data.map((row) => ({ ...row, [newColName]: 0 }));
    setData(newData);
  };

  const deleteColumn = (colName: string) => {
    if (columns.length <= 1) return;
    const newData = data.map((row) => {
      const newRow = { ...row };
      delete newRow[colName];
      return newRow;
    });
    setData(newData);
  };

  return (
    <div
      className="bg-secondary rounded-xl overflow-hidden border border-slate-700"
      data-drawer
      onBlur={() => {
        console.log("hey");
        const chartData = JSON.stringify(data, null, 2);
        useUIStore.getState().updateEditBuffer(chartData);
        console.log(useUIStore.getState().editBuffer);
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-accent">
              {columns.map((col) => (
                <th key={col} className="px-6 py-4 text-left group relative">
                  {editingHeader === col ? (
                    <input
                      type="text"
                      defaultValue={col}
                      autoFocus
                      onBlur={(e) => {
                        updateColumnName(col, e.target.value);
                        setEditingHeader(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateColumnName(col, e.currentTarget.value);
                          setEditingHeader(null);
                        }
                      }}
                      className="bg-slate-900 text-white px-3 py-2 rounded-lg border-2 border-indigo-500 outline-none w-full focus:ring-2 focus:ring-indigo-500/50"
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span
                        onClick={() => setEditingHeader(col)}
                        className="text-slate-300 font-semibold cursor-pointer hover:text-white transition-colors"
                      >
                        {col}
                      </span>
                      {columns.length > 1 && (
                        <button
                          onClick={() => deleteColumn(col)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all ml-2"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </th>
              ))}
              <th className="px-6 py-4 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-750 group">
                {columns.map((col, colIndex) => (
                  <td key={col} className="px-6 py-4">
                    {editingCell?.row === rowIndex &&
                    editingCell?.col === col ? (
                      <input
                        type={colIndex === 0 ? "text" : "number"}
                        defaultValue={row[col] ?? ""}
                        autoFocus
                        onBlur={(e) => {
                          updateCell(rowIndex, col, e.target.value);
                          setEditingCell(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateCell(rowIndex, col, e.currentTarget.value);
                            setEditingCell(null);
                          }
                        }}
                        className="bg-slate-900 text-white px-3 py-2 rounded-lg border-2 border-indigo-500 outline-none w-full focus:ring-2 focus:ring-indigo-500/50 shadow-lg"
                      />
                    ) : (
                      <div
                        onClick={() => setEditingCell({ row: rowIndex, col })}
                        className="text-slate-300 cursor-pointer hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all min-h-[2.5rem] flex items-center"
                      >
                        {row[col] ?? "—"}
                      </div>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4">
                  {data.length > 1 && (
                    <button
                      onClick={() => deleteRow(rowIndex)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all"
                    >
                      <X size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-700 p-4 flex gap-4">
        {data.length < MAX_ROWS && (
          <button
            onClick={addRow}
            className="text-slate-400 hover:text-indigo-400 flex items-center gap-2 transition-colors text-sm"
          >
            <Plus size={16} />
            Add row
          </button>
        )}
        {columns.length < MAX_COLUMNS && (
          <button
            onClick={addColumn}
            className="text-slate-400 hover:text-indigo-400 flex items-center gap-2 transition-colors text-sm"
          >
            <Plus size={16} />
            Add column
          </button>
        )}
      </div>

      {showJson && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <pre className="text-green-400 text-sm font-mono overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <button
        onClick={() => setShowJson(!showJson)}
        className="text-slate-400 hover:text-slate-300 text-sm transition-colors"
      >
        {showJson ? "Hide" : "Show"} JSON output
      </button>
    </div>
  );
}
