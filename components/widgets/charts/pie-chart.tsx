"use client"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, LabelList, Pie, PieChart } from "recharts";

interface PieChartProps {
  chartConfig: any;
  chartData: any;
}

export const PieChartBase: React.FC<PieChartProps> = ({
  chartConfig,
  chartData,
}) => {
  const pieData = [
    {
      name: "Desktop",
      value: chartData.reduce((acc: number, d: any) => acc + d.desktop, 0),
    },
    {
      name: "Mobile",
      value: chartData.reduce((acc: number, d: any) => acc + d.mobile, 0),
    },
    {
      name: "Computer",
      value: chartData.reduce((acc: number, d: any) => acc + d.computer, 0),
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-text]:fill-background mx-auto w-full h-full"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="name" hideLabel />}
        />
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          innerRadius={30}
          outerRadius={80}
          cornerRadius={8}
          paddingAngle={4}
        >
          {pieData.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={chartConfig[entry.name.toLowerCase()].color}
            />
          ))}
          <LabelList
            dataKey="value"
            stroke="none"
            fontSize={12}
            fontWeight={500}
            fill="currentColor"
            formatter={(value: number) => value.toString()}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

