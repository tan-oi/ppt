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
    <ChartContainer config={chartConfig} className="w-full h-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="2 4"
          stroke="currentColor"
          className="opacity-10"
        />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fill: "currentColor", opacity: 0.55, fontSize: 11 }}
          tickFormatter={(value) =>
            typeof value === "string" ? value.slice(0, 6) : value
          }
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "currentColor", opacity: 0.5, fontSize: 11 }}
          width={44}
          tickFormatter={(value) => {
            const n = Number(value);
            if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1)}k`;
            return String(value);
          }}
        />
        <ChartTooltip
          cursor={{
            stroke: "currentColor",
            strokeOpacity: 0.15,
            strokeDasharray: "3 3",
          }}
          itemSorter={(item) => -(Number(item.value) || 0)}
          content={
            <ChartTooltipContent
              indicator="line"
              className="backdrop-blur-md bg-background/95 border-border/50 shadow-lg"
            />
          }
        />
        {dataKeys.map((key) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={{
              r: 3,
              fill: `var(--color-${key})`,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "var(--background)",
            }}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};
