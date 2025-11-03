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
    //@ts-ignore
    props?.data || [
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
  const [newlyAddedRows, setNewlyAddedRows] = useState<Set<number>>(new Set());
  const [newlyAddedColumns, setNewlyAddedColumns] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    if (newlyAddedRows.size > 0) {
      const timer = setTimeout(() => setNewlyAddedRows(new Set()), 2000);
      return () => clearTimeout(timer);
    }
  }, [newlyAddedRows]);

  useEffect(() => {
    if (newlyAddedColumns.size > 0) {
      const timer = setTimeout(() => setNewlyAddedColumns(new Set()), 2000);
      return () => clearTimeout(timer);
    }
  }, [newlyAddedColumns]);

  useEffect(() => {
    if (!editingCell) {
      useUIStore.getState().updateEditBuffer({
        data: data,
      });
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
    setNewlyAddedRows(new Set([...newlyAddedRows, data.length]));
  };

  const deleteRow = (index: number) => {
    if (data.length <= 1) return;
    setData(data.filter((_, i) => i !== index));
    const updated = new Set<number>();
    newlyAddedRows.forEach((idx) => {
      if (idx > index) updated.add(idx - 1);
      else if (idx < index) updated.add(idx);
    });
    setNewlyAddedRows(updated);
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
    setNewlyAddedColumns(new Set([...newlyAddedColumns, newColName]));
  };

  const deleteColumn = (colName: string) => {
    if (columns.length <= 1) return;
    const newData = data.map((row) => {
      const newRow = { ...row };
      delete newRow[colName];
      return newRow;
    });
    setData(newData);
    const updated = new Set(newlyAddedColumns);
    updated.delete(colName);
    setNewlyAddedColumns(updated);
  };

  const isMaxRows = data.length >= MAX_ROWS;
  const isMaxColumns = columns.length >= MAX_COLUMNS;

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          onClick={addRow}
          disabled={isMaxRows}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm transition-all ${
            isMaxRows
              ? "bg-slate-700 cursor-not-allowed opacity-60"
              : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md hover:shadow-lg"
          }`}
        >
          <Plus size={18} />
          <span className="text-gray-50">Add Row {isMaxRows && `(Max ${MAX_ROWS})`}</span>
        </button>

        <button
          onClick={addColumn}
          disabled={isMaxColumns}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm transition-all ${
            isMaxColumns
              ? "bg-slate-700 text-slate-500 cursor-not-allowed opacity-60"
              : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md hover:shadow-lg"
          }`}
        >
          <Plus size={18} />
          <span className="text-gray-50">Add Column {isMaxColumns && `(Max ${MAX_COLUMNS})`}</span>
        </button>
      </div>

      <div
        className="flex-1 bg-secondary rounded-xl overflow-hidden border border-muted"
        data-drawer
        onBlur={() => {
          useUIStore.getState().updateEditBuffer({
            data: data,
          });
        }}
      >
        <div className="w-full h-full overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-accent z-10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className={`px-6 py-4 text-left group relative transition-all ${
                      newlyAddedColumns.has(col)
                        ? "bg-emerald-900/30 animate-pulse"
                        : ""
                    }`}
                  >
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
                        className="bg-slate-900 text-neutral px-3 py-2 rounded-lg border-2 border-indigo-500 outline-none w-full focus:ring-2 focus:ring-indigo-500/50"
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            onClick={() => setEditingHeader(col)}
                            className="text-slate-300 font-semibold cursor-pointer hover:text-white transition-colors"
                          >
                            {col}
                          </span>
                          {newlyAddedColumns.has(col) && (
                            <span className="text-[10px] text-emerald-400 font-bold px-2 py-1 bg-emerald-900/50 rounded-full border border-emerald-500">
                              NEW
                            </span>
                          )}
                        </div>
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
                <th className="px-6 py-4 w-16 sticky top-0 bg-accent"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={` group transition-all ${
                    newlyAddedRows.has(rowIndex) ? "bg-emerald-900/20" : ""
                  }`}
                >
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
                          className="bg-slate-900 text-body px-3 py-2 rounded-lg border-2 border-indigo-500 outline-none w-full focus:ring-2 focus:ring-indigo-500/50 shadow-lg"
                        />
                      ) : (
                        <div
                          onClick={() => setEditingCell({ row: rowIndex, col })}
                          className="text-zinc-600 cursor-pointer hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all min-h-[2.5rem] flex items-center"
                        >
                          {row[col] ?? "—"}
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {newlyAddedRows.has(rowIndex) && (
                        <span className="text-[10px] text-emerald-400 font-bold px-2 py-1 bg-emerald-900/50 rounded-full border border-emerald-500 whitespace-nowrap">
                          NEW
                        </span>
                      )}
                      {data.length > 1 && (
                        <button
                          onClick={() => deleteRow(rowIndex)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
