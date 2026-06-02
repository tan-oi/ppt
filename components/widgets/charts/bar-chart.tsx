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
        margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        barCategoryGap="20%"
      >
        <CartesianGrid
          strokeDasharray="2 4"
          stroke="currentColor"
          className="opacity-10"
          vertical={false}
        />

        <XAxis
          dataKey={xKey}
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fill: "currentColor", opacity: 0.55, fontSize: 11 }}
          tickFormatter={(value) =>
            typeof value === "string" ? value.slice(0, 6) : String(value)
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
          cursor={{ fill: "currentColor", opacity: 0.05 }}
          itemSorter={(item) => -(Number(item.value) || 0)}
          content={
            <ChartTooltipContent
              indicator="dot"
              className="backdrop-blur-md bg-background/95 border-border/50 shadow-lg"
            />
          }
        />

        {dataKeys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={[6, 6, 0, 0]}
            maxBarSize={48}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};
