// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import React from "react";
// import { BarChartBase } from "./bar-chart";

// import { AreaChartBase } from "./area-chart";
// import { ChartConfig } from "@/components/ui/chart";
// import { LineChartBase } from "./line-chart";
// import { useUIStore } from "@/lib/store/ui-store";
// import { PieChartBase } from "./pie-chart";
// import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";

// interface BaseChartRenderProps {
//   type: "bar" | "area" | "line" | "pie";
//   data?: any;
//   id: string;
//   className?: string;
//   slideId: string;
//   config?: any;
// }

// const defaultData = [
//   { month: "January", desktop: 186.4, mobile: 80, computer: 20, ipod: 20 },
//   { month: "February", desktop: 305, mobile: 200, computer: 20, ipod: 40 },
//   { month: "March", desktop: 237, mobile: 120, computer: 20, ipod: 40 },
//   { month: "April", desktop: 73, mobile: 190, computer: 20, ipod: 100 },
// ];

// const chartConfig = {
//   desktop: { label: "Desktop", color: "pink" },
//   mobile: { label: "Mobile", color: "lime" },
//   computer: { label: "Computer", color: "blue" },
//   ipod: {
//     label: "Ipod",
//     color: "red",
//   },
// } satisfies ChartConfig;

// export const chartRegistry: Record<
//   BaseChartRenderProps["type"],
//   React.ComponentType<{ chartData: any; chartConfig: ChartConfig }>
// > = {
//   bar: BarChartBase,
//   pie: PieChartBase,
//   area: AreaChartBase,
//   line: LineChartBase,
// };

// export const BaseChartRender: React.FC<BaseChartRenderProps> = ({
//   type,
//   data = null,
//   id,
//   className,
//   slideId,
//   ...props
// }) => {
//   const config = props.config;


//   const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);
//   const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
//   const ChartComponent = chartRegistry[type];

//   const chartConfigToUse = config ?? chartConfig;
//   const chartDataToUse = data ?? defaultData;

//   return (
//     <div
//       ref={widgetRef}
//       data-widget
//       className="cursor-pointer w-full h-full"
//       style={{
//         zIndex: 20,
//       }}
//       onClick={() =>
//         handleClick({
//           widgetType: "chart",
//           data: {
//             type: type,
//             data: chartDataToUse,
//             config: chartConfigToUse,
//           },
//       })
//       }
//     >
//       <Card className="border-none min-w-[180px] min-h-[200px] w-full h-full">
//         <CardHeader>
//           <CardTitle className="text-muted-foreground text-sm font-mono">
//             {type} chart
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="w-full h-full">
//           <ChartComponent
//             chartData={chartDataToUse}
//             chartConfig={chartConfigToUse}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BarChartBase } from "./bar-chart";
import { AreaChartBase } from "./area-chart";
import { ChartConfig } from "@/components/ui/chart";
import { LineChartBase } from "./line-chart";
import { useUIStore } from "@/lib/store/ui-store";
import { PieChartBase } from "./pie-chart";
import { useWidgetSelection } from "@/lib/hooks/useWidgetSelection";

interface BaseChartRenderProps {
  type: "bar" | "area" | "line" | "pie";
  data?: any;
  id: string;
  className?: string;
  slideId: string;
  config?: any;
}

const defaultData = [
  { month: "January", desktop: 186.4, mobile: 80, computer: 20, ipod: 20 },
  { month: "February", desktop: 305, mobile: 200, computer: 20, ipod: 40 },
  { month: "March", desktop: 237, mobile: 120, computer: 20, ipod: 40 },
  { month: "April", desktop: 73, mobile: 190, computer: 20, ipod: 100 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(220, 90%, 56%)" },
  mobile: { label: "Mobile", color: "hsl(280, 90%, 60%)" },
  computer: { label: "Computer", color: "hsl(160, 85%, 45%)" },
  ipod: { label: "Ipod", color: "hsl(340, 85%, 55%)" },
} satisfies ChartConfig;

export const chartRegistry: Record<
  BaseChartRenderProps["type"],
  React.ComponentType<{ chartData: any; chartConfig: ChartConfig }>
> = {
  bar: BarChartBase,
  pie: PieChartBase,
  area: AreaChartBase,
  line: LineChartBase,
};

export const BaseChartRender: React.FC<BaseChartRenderProps> = ({
  type,
  data = null,
  id,
  className,
  slideId,
  ...props
}) => {
  const config = props.config;
  const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);
  const { widgetRef, handleClick } = useWidgetSelection(id, slideId);
  const ChartComponent = chartRegistry[type];

  const chartConfigToUse = config ?? chartConfig;
  const chartDataToUse = data ?? defaultData;

  return (
    <div
      ref={widgetRef}
      data-widget
      className="cursor-pointer w-full h-full"
      style={{ zIndex: 20 }}
      onClick={() =>
        handleClick({
          widgetType: "chart",
          data: {
            type: type,
            data: chartDataToUse,
            config: chartConfigToUse,
          },
        })
      }
    >
      <Card className="border-none backdrop-blur-sm bg-gradient-to-br from-background/95 to-background/80 shadow-2xl min-w-[180px] min-h-[200px] w-full h-full overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-foreground/70 text-xs font-semibold tracking-wider uppercase">
            {type} chart
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full h-[calc(100%-60px)] pb-2">
          <ChartComponent
            chartData={chartDataToUse}
            chartConfig={chartConfigToUse}
          />
        </CardContent>
      </Card>
    </div>
  );
};