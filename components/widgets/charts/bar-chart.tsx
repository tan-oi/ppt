"use client";
import { Bar, BarChart, XAxis } from "recharts";
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
      <BarChart accessibilityLayer data={chartData}>
        <rect
          x="0"
          y="0"
          width="100%"
          height="85%"
          fill="url(#default-multiple-pattern-dots)"
        />
        <defs>
          <DottedBackgroundPattern />
        </defs>
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => 
            typeof value === "string" ? value.slice(0, 3) : value
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        {dataKeys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};

const DottedBackgroundPattern = () => {
  return (
    <pattern
      id="default-multiple-pattern-dots"
      x="0"
      y="0"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
    >
      <circle
        className="dark:text-muted/40 text-muted"
        cx="2"
        cy="2"
        r="1"
        fill="currentColor"
      />
    </pattern>
  );
};