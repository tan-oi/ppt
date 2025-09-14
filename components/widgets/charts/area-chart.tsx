"use client"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
interface AreaChart {
  chartConfig: any;
  chartData: any;
}

export const AreaChartBase: React.FC<AreaChart> = ({
  chartConfig,
  chartData,
}) => {
  const [xAxis, setXAxis] = useState<number | null>(null);
  const animationConfig = {
    glowWidth: 300,
  };
  return (
    <>
      <ChartContainer config={chartConfig} className="w-full h-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          onMouseMove={(e) => setXAxis(e.chartX as number)}
          onMouseLeave={() => setXAxis(null)}
          margin={{
            left: 10,
            right: 10,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={true}
            tickMargin={4}
            tickFormatter={(value) => value.slice(0, 3)}
            fontSize={14}
            interval={0}
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
            <linearGradient
              id="animated-highlighted-grad-desktop"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id="animated-highlighted-grad-mobile"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id="animated-highlighted-grad-computer"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="var(--color-computer)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-computer)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient
              id="animated-highlighted-grad-ipod"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="var(--color-ipod)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-ipod)"
                stopOpacity={0}
              />
            </linearGradient>
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
          <Area
            dataKey="mobile"
            type="natural"
            fill={"url(#animated-highlighted-grad-mobile)"}
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
            strokeWidth={0.8}
            mask="url(#animated-highlighted-mask)"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill={"url(#animated-highlighted-grad-desktop)"}
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
            strokeWidth={0.8}
            mask="url(#animated-highlighted-mask)"
          />
          <Area
            dataKey="computer"
            type="natural"
            fill={"url(#animated-highlighted-grad-computer)"}
            fillOpacity={0.4}
            stroke="var(--color-computer)"
            stackId="a"
            strokeWidth={0.8}
            mask="url(#animated-highlighted-mask)"
          />
          <Area
            dataKey="ipod"
            type="natural"
            fill={"url(#animated-highlighted-grad-ipod)"}
            fillOpacity={0.4}
            stroke="var(--color-ipod)"
            stackId="a"
            strokeWidth={0.8}
            mask="url(#animated-highlighted-mask)"
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
};
