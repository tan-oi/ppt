"use client";

import { useUIStore } from "@/lib/store/ui-store";
import { Plus, X } from "lucide-react";
import { useMemo } from "react";
import { ChartTableProps } from "@/lib/types";
import { useChartTableData } from "@/lib/hooks/useChartTableData";

export function ChartTable(props: ChartTableProps) {
  const normalizedData = useMemo(() => {
    if (!props?.data?.length) return null;
    const xKey = props.xKey || Object.keys(props.data[0])[0];
    return props.data.map((row) => {
      const { [xKey]: xValue, ...rest } = row;
      return { [xKey]: xValue, ...rest };
    });
  }, [props?.data, props?.xKey]);

  const {
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
  } = useChartTableData({
    initialData: normalizedData,
    initialConfig: props.config,
    initialXKey: props.xKey,
    chartType: props.type,
  });
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
          <span className="text-gray-50">
            Add Row {isMaxRows && `(Max ${MAX_ROWS})`}
          </span>
        </button>

        <button
          onClick={addColumn}
          disabled={isMaxColumns || props.type === "pie"}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm transition-all ${
            isMaxColumns || props.type === "pie"
              ? "bg-slate-700 text-slate-500 cursor-not-allowed opacity-60"
              : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md hover:shadow-lg"
          }`}
        >
          <Plus size={18} />
          <span className="text-gray-50">
            Add Column {isMaxColumns && `(Max ${MAX_COLUMNS - 1})`}
          </span>
        </button>
      </div>

      <div
        className="flex-1 bg-secondary rounded-xl overflow-hidden border border-muted"
        data-drawer
        onBlur={() => {
          const currentBuffer = useUIStore.getState().editBuffer?.widgetData;
          useUIStore.getState().updateEditBuffer({
            ...currentBuffer,
            data,
            config,
            xKey: xAxisKey,
          });
        }}
      >
        <div className="w-full h-full overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-accent z-10">
              <tr>
                <th className="px-6 py-4 text-left group relative bg-blue-900/30 border-r-2 border-blue-700/50">
                  {editingHeader === xAxisKey ? (
                    <input
                      type="text"
                      defaultValue={xAxisKey}
                      autoFocus
                      onBlur={(e) => {
                        updateXAxisName(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateXAxisName(e.currentTarget.value);
                        }
                      }}
                      className="bg-slate-900 text-white px-3 py-2 rounded-lg border-2 border-blue-500 outline-none w-full focus:ring-2 focus:ring-blue-500/50 font-semibold"
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          onClick={() => setEditingHeader(xAxisKey)}
                          className="text-blue-300 font-semibold cursor-pointer hover:text-white transition-colors"
                        >
                          {xAxisKey}
                        </span>
                        <span className="text-[10px] text-blue-400 font-bold px-2 py-1 bg-blue-900/50 rounded-full border border-blue-500">
                          X-AXIS
                        </span>
                      </div>
                    </div>
                  )}
                </th>

                {dataColumns.map((col) => (
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
                          updateSeriesName(col, e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateSeriesName(col, e.currentTarget.value);
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
                        {dataColumns.length > 1 && (
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
                <th className="px-6 py-4 w-16 sticky top-0 bg-accent" />
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`group transition-all ${
                    newlyAddedRows.has(rowIndex) ? "bg-emerald-900/20" : ""
                  }`}
                >
                  <td className="px-6 py-4 border-r-2 border-blue-700/30">
                    {editingCell?.row === rowIndex &&
                    editingCell?.col === xAxisKey ? (
                      <input
                        type="text"
                        defaultValue={row[xAxisKey] ?? ""}
                        autoFocus
                        onBlur={(e) => {
                          updateCell(rowIndex, xAxisKey, e.target.value);
                          setEditingCell(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateCell(
                              rowIndex,
                              xAxisKey,
                              e.currentTarget.value
                            );
                            setEditingCell(null);
                          }
                        }}
                        className="bg-slate-900 text-white px-3 py-2 rounded-lg border-2 border-blue-500 outline-none w-full focus:ring-2 focus:ring-blue-500/50 shadow-lg"
                      />
                    ) : (
                      <div
                        onClick={() =>
                          setEditingCell({ row: rowIndex, col: xAxisKey })
                        }
                        className="text-zinc-300 cursor-pointer hover:text-white hover:bg-blue-900/50 px-3 py-2 rounded-lg transition-all min-h-10 flex items-center"
                      >
                        {row[xAxisKey] ?? "—"}
                      </div>
                    )}
                  </td>

                  {dataColumns.map((col) => (
                    <td key={col} className="px-6 py-4">
                      {editingCell?.row === rowIndex &&
                      editingCell?.col === col ? (
                        <input
                          type="number"
                          defaultValue={row[col] ?? 0}
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
                          className="text-zinc-600 cursor-pointer hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-all min-h-10 flex items-center"
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
