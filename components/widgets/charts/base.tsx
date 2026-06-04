import React, { useMemo } from "react";
import { BarChartBase } from "./bar-chart";
import { AreaChartBase } from "./area-chart";
import { ChartConfig } from "@/components/ui/chart";
import { LineChartBase } from "./line-chart";
import { useUIStore } from "@/lib/store/ui-store";
import { PieChartBase } from "./pie-chart";
import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";
import { BaseChartRenderProps } from "@/lib/types";

const defaultData = [
  { month: "January", desktop: 186.4, mobile: 80, computer: 20, ipod: 20 },
  { month: "February", desktop: 305, mobile: 200, computer: 20, ipod: 40 },
  { month: "March", desktop: 237, mobile: 120, computer: 20, ipod: 40 },
  { month: "April", desktop: 73, mobile: 190, computer: 20, ipod: 100 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "oklch(0.72 0.16 250)" },
  mobile: { label: "Mobile", color: "oklch(0.78 0.14 165)" },
  computer: { label: "Computer", color: "oklch(0.78 0.16 80)" },
  ipod: { label: "Ipod", color: "oklch(0.7 0.18 25)" },
} satisfies ChartConfig;

export const chartRegistry: Record<
  BaseChartRenderProps["type"],
  React.ComponentType<{
    chartData: any;
    chartConfig: ChartConfig;
    xKeyToUse: string;
  }>
> = {
  bar: BarChartBase,
  pie: PieChartBase,
  area: AreaChartBase,
  line: LineChartBase,
};

export const BaseChartRender: React.FC<BaseChartRenderProps> = ({
  type,
  data = null,
  id,
  className,
  slideId,
  config,
  xKey,
  ...props
}) => {
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);

  const editBuffer = useUIStore((s) => s.editBuffer);
  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          type,
          xKey: xKey ?? null,
          data: data ?? defaultData,
          config: config ?? chartConfig,
        };

  const ChartComponent =
    chartRegistry[currentData.type as keyof typeof chartRegistry];

  // const chartConfigToUse = currentData.config;
  const chartConfigToUse = currentData.config;
  const chartDataToUse = currentData.data;
  const xKeyToUse = currentData.xKey;

  // const chartConfigToUse = useMemo(() => {
  //   if (!chartDataToUse?.length) return rawConfig;
  //   const xKey = Object.keys(chartDataToUse[0])[0];
  //   const { [xKey]: _, ...clean } = rawConfig ?? {};
  //   return clean;
  // }, [chartDataToUse, rawConfig]);
  return (
    <div
      ref={widgetRef}
      data-widget
      className="cursor-pointer w-full h-full"
      style={{ zIndex: 20 }}
      onClick={() =>
        handleClick({
          widgetType: "chart",
          data: currentData,
        })
      }
    >
      <div className="w-full h-full min-w-[180px] min-h-[200px] flex flex-col">
        <ChartComponent
          chartData={chartDataToUse}
          chartConfig={chartConfigToUse}
          xKeyToUse={xKeyToUse ?? null}
        />
      </div>
    </div>
  );
};
