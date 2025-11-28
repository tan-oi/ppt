"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";

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
  console.log(chartData)
  const [xAxis, setXAxis] = useState<number | null>(null);
  const animationConfig = { glowWidth: 300 };

  const dataKeys = Object.keys(chartConfig);
  const xKey =
    xKeyToUse || (chartData?.[0] ? Object.keys(chartData[0])[0] : "month");

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        onMouseMove={(e) => setXAxis(e.chartX as number)}
        onMouseLeave={() => setXAxis(null)}
        margin={{ left: 10, right: 10 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={true}
          tickMargin={4}
          tickFormatter={(value) =>
            typeof value === "string" ? value.slice(0, 3) : value
          }
          fontSize={14}
          interval={0}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          className="text-xs"
          tick={{ fill: "currentColor", opacity: 0.6 }}
          width={40}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient
            id="animated-highlighted-mask-grad"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          {dataKeys.map((key) => (
            <linearGradient
              key={key}
              id={`animated-highlighted-grad-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={`var(--color-${key})`}
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-${key})`}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
          {xAxis && (
            <mask id="animated-highlighted-mask">
              <rect
                x={xAxis - animationConfig.glowWidth / 2}
                y={0}
                width={animationConfig.glowWidth}
                height="100%"
                fill="url(#animated-highlighted-mask-grad)"
              />
            </mask>
          )}
        </defs>
        {dataKeys.map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            fill={`url(#animated-highlighted-grad-${key})`}
            fillOpacity={0.4}
            stroke={`var(--color-${key})`}
            stackId="a"
            strokeWidth={0.8}
            mask="url(#animated-highlighted-mask)"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};
