"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface LineChartProps {
  chartConfig: any;
  chartData: any;
  xKeyToUse: string;
}

export const LineChartBase: React.FC<LineChartProps> = ({
  chartConfig,
  chartData,
  xKeyToUse,
}) => {
  const dataKeys = Object.keys(chartConfig);
  const xKey =
    xKeyToUse || (chartData?.[0] ? Object.keys(chartData[0])[0] : "month");

  return (
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
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            typeof value === "string" ? value.slice(0, 3) : value
          }
        />
         <YAxis
          tickLine={false}
          axisLine={false}
          className="text-xs"
          tick={{ fill: "currentColor", opacity: 0.6 }}
          width={40}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            dataKey={key}
            type="linear"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={false}
            strokeDasharray={index === 0 ? "4 4" : undefined}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};
