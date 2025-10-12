"use client";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartProps {
  chartConfig: any;
  chartData: any;
}

export const BarChartBase: React.FC<BarChartProps> = ({
  chartConfig,
  chartData,
}) => {
  const dataKeys = Object.keys(chartConfig);
  const xAxisKey = chartData[0] ? Object.keys(chartData[0])[0] : "month";

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <defs>
          {dataKeys.map((key, idx) => (
            <linearGradient
              key={key}
              id={`gradient-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={
                  chartConfig[key]?.color || `hsl(${idx * 60}, 70%, 50%)`
                }
                stopOpacity={0.9}
              />
              <stop
                offset="100%"
                stopColor={
                  chartConfig[key]?.color || `hsl(${idx * 60}, 70%, 50%)`
                }
                stopOpacity={0.3}
              />
            </linearGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          className="opacity-20"
          vertical={false}
        />

        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={12}
          axisLine={false}
          className="text-xs"
          tick={{ fill: "currentColor", opacity: 0.6 }}
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
          cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
          content={
            <ChartTooltipContent
              indicator="dot"
              className="backdrop-blur-sm bg-background/95 border-border/50"
            />
          }
        />

        {dataKeys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`url(#gradient-${key})`}
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
            filter="url(#glow)"
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};
