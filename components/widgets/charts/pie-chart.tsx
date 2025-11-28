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
  "hsl(220, 90%, 56%)",
  "hsl(160, 85%, 45%)",
  "hsl(30, 90%, 55%)",
  "hsl(280, 90%, 60%)",
  "hsl(340, 85%, 55%)",
  "hsl(200, 85%, 55%)",
  "hsl(0, 85%, 55%)",
];

export const PieChartBase: React.FC<PieChartProps> = ({
  chartConfig,
  chartData,
  xKeyToUse,
}) => {
  
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">No data</div>
    );
  }

  const keys = Object.keys(chartData[0]);

  const nameKey = xKeyToUse || keys[0] || "name";

  const valueKey = keys.find((key) => key !== nameKey) || "value";

  console.log("Using nameKey:", nameKey, "valueKey:", valueKey);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey={nameKey} hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey={valueKey}
          nameKey={nameKey}
          innerRadius={20}
          outerRadius={"100%"}
          cornerRadius={8}
          paddingAngle={4}
        >
          {chartData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey={valueKey}
            stroke="none"
            fontSize={12}
            fontWeight={500}
            fill="currentColor"
            formatter={(value: number) => value?.toString() || "0"}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
