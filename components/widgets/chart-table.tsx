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
  const cellBase =
    "px-3 py-1.5 rounded-md text-sm transition-colors h-8 border border-transparent flex items-center";
  const inputBase =
    "bg-background text-foreground px-3 py-1.5 rounded-md border border-ring/60 outline-none w-full text-sm h-8 box-border";

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex gap-2">
        <button
          onClick={addRow}
          disabled={isMaxRows}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors border ${
            isMaxRows
              ? "bg-muted/40 text-muted-foreground border-border/40 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700"
          }`}
        >
          <Plus size={14} />
          Add row {isMaxRows && `(max ${MAX_ROWS})`}
        </button>

        <button
          onClick={addColumn}
          disabled={isMaxColumns || props.type === "pie"}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors border ${
            isMaxColumns || props.type === "pie"
              ? "bg-muted/40 text-muted-foreground border-border/40 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700"
          }`}
        >
          <Plus size={14} />
          Add column {isMaxColumns && `(max ${MAX_COLUMNS - 1})`}
        </button>
      </div>

      <div
        className="flex-1 bg-background/50 rounded-lg overflow-hidden border border-border/60"
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
        <div className="w-full h-full overflow-auto scrollbar-subtle">
          <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-0 bg-muted/60 backdrop-blur-md z-10">
              <tr>
                <th className="px-3 py-2.5 text-left group relative border-b border-border/60 border-r border-border/40 min-w-[140px]">
                  {editingHeader === xAxisKey ? (
                    <input
                      type="text"
                      defaultValue={xAxisKey}
                      autoFocus
                      onBlur={(e) => updateXAxisName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          updateXAxisName(e.currentTarget.value);
                      }}
                      className={inputBase}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span
                        onClick={() => setEditingHeader(xAxisKey)}
                        className="text-foreground/90 font-medium text-xs cursor-pointer"
                      >
                        {xAxisKey}
                      </span>
                      {props.type !== "pie" && (
                        <span className="text-[9px] tracking-wider text-muted-foreground font-medium px-1.5 py-0.5 bg-background/60 rounded border border-border/60 uppercase">
                          x-axis
                        </span>
                      )}
                    </div>
                  )}
                </th>

                {dataColumns.map((col) => (
                  <th
                    key={col}
                    className={`px-3 py-2.5 text-left group relative border-b border-border/60 min-w-[120px] transition-colors ${
                      newlyAddedColumns.has(col) ? "bg-foreground/[0.04]" : ""
                    }`}
                  >
                    {editingHeader === col ? (
                      <input
                        type="text"
                        defaultValue={col}
                        autoFocus
                        onBlur={(e) => updateSeriesName(col, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            updateSeriesName(col, e.currentTarget.value);
                        }}
                        className={inputBase}
                      />
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: config[col]?.color,
                            }}
                          />
                          <span
                            onClick={() => setEditingHeader(col)}
                            className="text-foreground/90 font-medium text-xs cursor-pointer truncate"
                          >
                            {col}
                          </span>
                        </div>
                        {dataColumns.length > 1 && (
                          <button
                            onClick={() => deleteColumn(col)}
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all ml-1"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                ))}
                <th className="px-3 py-2.5 w-10 border-b border-border/60" />
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`group transition-colors hover:bg-foreground/[0.02] ${
                    newlyAddedRows.has(rowIndex) ? "bg-foreground/[0.03]" : ""
                  }`}
                >
                  <td className="px-3 py-1.5 border-b border-border/30 border-r border-border/30">
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
                        className={inputBase}
                      />
                    ) : (
                      <div
                        onClick={() =>
                          setEditingCell({ row: rowIndex, col: xAxisKey })
                        }
                        className={`${cellBase} text-foreground/90 cursor-pointer hover:bg-foreground/5`}
                      >
                        {row[xAxisKey] ?? "—"}
                      </div>
                    )}
                  </td>

                  {dataColumns.map((col) => (
                    <td
                      key={col}
                      className="px-3 py-1.5 border-b border-border/30"
                    >
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
                          className={inputBase}
                        />
                      ) : (
                        <div
                          onClick={() =>
                            setEditingCell({ row: rowIndex, col })
                          }
                          className={`${cellBase} text-foreground/70 cursor-pointer hover:bg-foreground/5 font-mono tabular-nums`}
                        >
                          {row[col] ?? "—"}
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="px-2 py-1.5 border-b border-border/30">
                    {data.length > 1 && (
                      <button
                        onClick={() => deleteRow(rowIndex)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                      >
                        <X size={14} />
                      </button>
                    )}
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
