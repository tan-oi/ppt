import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  desktop: { label: "Desktop", color: "hsl(220, 90%, 56%)" },
  mobile: { label: "Mobile", color: "hsl(280, 90%, 60%)" },
  computer: { label: "Computer", color: "hsl(160, 85%, 45%)" },
  ipod: { label: "Ipod", color: "hsl(340, 85%, 55%)" },
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
  console.log(xKey);
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const ChartComponent = chartRegistry[type];

  const editBuffer = useUIStore((s) => s.editBuffer);
  const isSelected = useUIStore((s) => s.selectedWidget?.id === id);

  const currentData =
    isSelected && editBuffer?.widgetData
      ? editBuffer.widgetData
      : {
          type,
          xKey : xKey ?? null,
          data: data ?? defaultData,
          config: config ?? chartConfig,
        };

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
      <Card className="border-none backdrop-blur-sm bg-linear-to-br from-background/95 to-background/80 shadow-2xl min-w-[180px] min-h-[200px] w-full h-full overflow-hidden">
        <CardHeader className="">
          <CardTitle className="text-foreground/70 text-xs font-semibold tracking-wider uppercase">
            {currentData.type} chart
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full h-[calc(100%-2px)]">
          <ChartComponent
            chartData={chartDataToUse}
            chartConfig={chartConfigToUse}
            xKeyToUse={xKeyToUse ?? null}
          />
        </CardContent>
      </Card>
    </div>
  );
};
