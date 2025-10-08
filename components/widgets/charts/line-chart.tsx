// "use client";
// import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// interface LineChart {
//   chartConfig: any;
//   chartData: any;
// }

// export const LineChartBase: React.FC<LineChart> = ({
//   chartConfig,
//   chartData,
// }) => {
//   return (
//     <>
//       <ChartContainer config={chartConfig}>
//         <LineChart
//           accessibilityLayer
//           data={chartData}
//           margin={{
//             left: 12,
//             right: 12,
//           }}
//         >
//           <CartesianGrid vertical={false} />
//           <XAxis
//             dataKey="month"
//             tickLine={false}
//             axisLine={false}
//             tickMargin={8}
//             tickFormatter={(value) => value.slice(0, 3)}
//           />
//           <ChartTooltip
//             cursor={false}
//             content={<ChartTooltipContent hideLabel />}
//           />
//           <Line
//             dataKey="desktop"
//             type="linear"
//             stroke="var(--color-desktop)"
//             dot={false}
//             strokeDasharray="4 4"
//           />
//           <Line dataKey="mobile" type="linear" stroke="var(--color-mobile)" />
//           <Line
//             dataKey="computer"
//             type="linear"
//             stroke="var(--color-computer)"
//           />
//           <Line dataKey="ipod" type="linear" stroke="var(--color-ipod )" />
//         </LineChart>
//       </ChartContainer>
//     </>
//   );
// };

"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface LineChartProps {
  chartConfig: any;
  chartData: any;
}

export const LineChartBase: React.FC<LineChartProps> = ({
  chartConfig,
  chartData,
}) => {
  const dataKeys = Object.keys(chartConfig);
  const xAxisKey = chartData[0] ? Object.keys(chartData[0])[0] : "month";

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
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            typeof value === "string" ? value.slice(0, 3) : value
          }
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
