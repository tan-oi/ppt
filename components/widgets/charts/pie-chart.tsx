"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, LabelList, Pie, PieChart } from "recharts";
import React from "react";
import { PieChartProps } from "@/lib/types";

const COLORS = [
  "oklch(0.72 0.16 250)",
  "oklch(0.78 0.14 165)",
  "oklch(0.78 0.16 80)",
  "oklch(0.7 0.18 25)",
  "oklch(0.72 0.18 320)",
  "oklch(0.74 0.14 200)",
  "oklch(0.68 0.18 350)",
];

export const PieChartBase: React.FC<PieChartProps> = ({
  chartConfig,
  chartData,
  xKeyToUse,
}) => {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
        No data
      </div>
    );
  }

  const keys = Object.keys(chartData[0]);
  const nameKey = xKeyToUse || keys[0] || "name";
  const valueKey = keys.find((key) => key !== nameKey) || "value";

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <ChartTooltip
          content={
            <ChartTooltipContent
              nameKey={nameKey}
              hideLabel
              className="backdrop-blur-md bg-background/95 border-border/50 shadow-lg"
            />
          }
        />
        <Pie
          data={chartData}
          dataKey={valueKey}
          nameKey={nameKey}
          innerRadius="55%"
          outerRadius="85%"
          cornerRadius={6}
          paddingAngle={2}
          strokeWidth={0}
        >
          {chartData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey={valueKey}
            stroke="none"
            fontSize={11}
            fontWeight={600}
            fill="currentColor"
            formatter={(value: number) => value?.toString() || "0"}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
