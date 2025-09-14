"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
interface LineChart {
  chartConfig: any;
  chartData: any;
}

export const LineChartBase: React.FC<LineChart> = ({
  chartConfig,
  chartData,
}) => {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="linear"
            stroke="var(--color-desktop)"
            dot={false}
            strokeDasharray="4 4"
          />
          <Line dataKey="mobile" type="linear" stroke="var(--color-mobile)" />
          <Line
            dataKey="computer"
            type="linear"
            stroke="var(--color-computer)"
          />
          <Line dataKey="ipod" type="linear" stroke="var(--color-ipod )" />
        </LineChart>
      </ChartContainer>
    </>
  );
};
