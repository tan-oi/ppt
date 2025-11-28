"use client";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChartProps } from "@/lib/types";

export const BarChartBase: React.FC<BarChartProps> = ({
  chartData,
  chartConfig,
  xKeyToUse,
}) => {
  const xKey =
    xKeyToUse || (chartData?.[0] ? Object.keys(chartData[0])[0] : "month");

  const dataKeys = Object.keys(chartConfig);

  // const seriesKeys = (() => {
  //   if (!chartData?.length || !chartData[0]) return [];
  //   return Object.keys(chartData[0]).filter((key) => key !== xKeyToUse);
  // })();

  // const cleanConfig = (() => {
  //   const config = { ...chartConfig };
  //   delete config[xKey];
  //   return config;
  // })();

  // if (seriesKeys.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center h-full text-muted-foreground">
  //       Add a series to see bars
  //     </div>
  //   );
  // }

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, bottom: 5, left: 5 }}
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
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          className="opacity-30"
          vertical={false}
        />

        <XAxis
          dataKey={xKey}
          type="category"
          tickLine={false}
          tickMargin={12}
          axisLine={false}
          className="text-xs"
          tick={{ fill: "currentColor", opacity: 0.6 }}
          tickFormatter={(value) =>
            typeof value === "string" ? value.slice(0, 3) : String(value)
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
