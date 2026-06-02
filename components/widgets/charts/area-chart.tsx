"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface AreaChartProps {
  chartConfig: any;
  chartData: any;
  xKeyToUse: string;
}

export const AreaChartBase: React.FC<AreaChartProps> = ({
  chartConfig,
  chartData,
  xKeyToUse,
}) => {
  const dataKeys = Object.keys(chartConfig);
  const xKey =
    xKeyToUse || (chartData?.[0] ? Object.keys(chartData[0])[0] : "month");

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
      >
        <defs>
          {dataKeys.map((key) => (
            <linearGradient
              key={key}
              id={`area-grad-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={`var(--color-${key})`}
                stopOpacity={0.45}
              />
              <stop
                offset="100%"
                stopColor={`var(--color-${key})`}
                stopOpacity={0.02}
              />
            </linearGradient>
          ))}
        </defs>
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
          interval={0}
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
          <Area
            key={key}
            dataKey={key}
            type="monotone"
            fill={`url(#area-grad-${key})`}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            stackId="a"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};
