"use client"
import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
interface BarChart {
  chartConfig: any;
  chartData: any;
}

export const BarChartBase: React.FC<BarChart> = ({
  chartConfig,
  chartData,
}) => {
  return (
    <>
      <ChartContainer config={chartConfig}>
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
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          <Bar dataKey="computer" fill="var(--color-computer)" radius={4} />
          <Bar dataKey="ipod" fill="var(--color-ipod)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
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
