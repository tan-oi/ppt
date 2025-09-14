import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BarChartBase } from "./bar-chart";
// import { PieChartBase } from "./pie-chart"

import { AreaChartBase } from "./area-chart";
import { ChartConfig } from "@/components/ui/chart";
import { LineChartBase } from "./line-chart";
import { useUIStore } from "@/lib/store/ui-store";
import { PieChartBase } from "./pie-chart";

interface BaseChartRenderProps {
  type: "bar" | "area" | "line" | "pie";
  data?: any;
  id: string;
  className?: string;
}

const defaultData = [
  { month: "January", desktop: 186.4, mobile: 80, computer: 20, ipod: 20 },
  { month: "February", desktop: 305, mobile: 200, computer: 20, ipod: 40 },
  { month: "March", desktop: 237, mobile: 120, computer: 20, ipod: 40 },
  { month: "April", desktop: 73, mobile: 190, computer: 20, ipod: 100 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "pink" },
  mobile: { label: "Mobile", color: "lime" },
  computer: { label: "Computer", color: "blue" },
  ipod: {
    label: "Ipod",
    color: "red",
  },
} satisfies ChartConfig;

const chartRegistry: Record<
  BaseChartRenderProps["type"],
  React.ComponentType<{ chartData: any; chartConfig: ChartConfig }>
> = {
  bar: BarChartBase,
  pie: PieChartBase,
  area: AreaChartBase,
  line: LineChartBase,
};

export const BaseChartRender: React.FC<BaseChartRenderProps> = ({
  type,
  data,
  id,
  className,
}) => {
  const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);
  const ChartComponent = chartRegistry[type];

  return (
    <div
      className="cursor-pointer"
      style={{
        zIndex: 20,
        // top: "100px",
        // left: "500px",
        // width: "400px",
        // // height: "280px",
      }}
      onClick={() => {
        updateSelectWidget({
          slideIndex: 1,
          id: "chart-101",
          data: {
            type: type,
            data: data ?? defaultData,
          },
          type: "drawer",
        });
      }}
    >
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm font-mono">
            {type} chart
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full h-full">
          <ChartComponent
            chartData={data ?? defaultData}
            chartConfig={chartConfig}
          />
        </CardContent>
      </Card>
    </div>
  );
};
