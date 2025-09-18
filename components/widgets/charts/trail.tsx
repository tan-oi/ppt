// "use client";

// import { Bar, BarChart, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Badge } from "@/components/ui/badge";
// import { TrendingDown } from "lucide-react";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80, computer: 20 },
//   { month: "February", desktop: 305, mobile: 200, computer: 20 },
//   { month: "March", desktop: 237, mobile: 120, computer: 20 },
//   { month: "April", desktop: 73, mobile: 190, computer: 20 },
//   { month: "May", desktop: 209, mobile: 130, computer: 20 },
//   { month: "June", desktop: 214, mobile: 140, computer: 20 },
//   { month: "July", desktop: 214, mobile: 140, computer: 20 },
//   { month: "August", desktop: 214, mobile: 140, computer: 20 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "pink",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "lime",
//   },
//   computer : {
//     label : "Computer",
//     color : "blue"
//   }
// } satisfies ChartConfig;

// export function DefaultMultipleBarChart() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           Bar Chart - Multiple{" "}
//           <Badge
//             variant="outline"
//             className="text-red-500 bg-red-500/10 border-none ml-2"
//           >
//             <TrendingDown className="h-4 w-4" />
//             <span>-5.2%</span>
//           </Badge>
//         </CardTitle>
//         <CardDescription>January - June 2025</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={chartData}>
//             <rect
//               x="0"
//               y="0"
//               width="100%"
//               height="85%"
//               fill="url(#default-multiple-pattern-dots)"
//             />
//             {/* <defs>
//               <DottedBackgroundPattern />
//             </defs> */}
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="dashed" />}
//             />
//             <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
//             <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
//             <Bar dataKey="computer" fill="var(--color-computer)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

// const DottedBackgroundPattern = () => {
//   return (
//     <pattern
//       id="default-multiple-pattern-dots"
//       x="0"
//       y="0"
//       width="10"
//       height="10"
//       patternUnits="userSpaceOnUse"
//     >
//       <circle
//         className="dark:text-muted/40 text-muted"
//         cx="2"
//         cy="2"
//         r="1"
//         fill="currentColor"
//       />
//     </pattern>
//   );
// };

// "use client";

// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Badge } from "@/components/ui/badge";
// import { TrendingDown } from "lucide-react";
// import React from "react";

// const animationConfig = {
//   glowWidth: 300,
// };

// const chartData = [
//   { month: "January", desktop: 342, mobile: 245 },
//   { month: "February", desktop: 876, mobile: 654 },
//   { month: "March", desktop: 512, mobile: 387 },
//   { month: "April", desktop: 629, mobile: 521 },
//   { month: "May", desktop: 458, mobile: 412 },
//   { month: "June", desktop: 781, mobile: 598 },
//   { month: "July", desktop: 394, mobile: 312 },
//   { month: "August", desktop: 925, mobile: 743 },
//   { month: "September", desktop: 647, mobile: 489 },
//   { month: "October", desktop: 532, mobile: 476 },
//   { month: "November", desktop: 803, mobile: 687 },
//   { month: "December", desktop: 271, mobile: 198 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "red",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "green",
//   },
// } satisfies ChartConfig;

// export function AnimatedHighlightedAreaChart() {
//   const [xAxis, setXAxis] = React.useState<number | null>(null);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           Highlighted Area Chart
//           <Badge
//             variant="outline"
//             className="text-red-500 bg-red-500/10 border-none ml-2"
//           >
//             <TrendingDown className="h-4 w-4" />
//             <span>-5.2%</span>
//           </Badge>
//         </CardTitle>
//         <CardDescription>
//           Showing total visitors for the last 6 months
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
        //   <AreaChart
        //     accessibilityLayer
        //     data={chartData}
        //     onMouseMove={(e) => setXAxis(e.chartX as number)}
        //     onMouseLeave={() => setXAxis(null)}
        //   >
        //     <CartesianGrid vertical={false} strokeDasharray="3 3" />
        //     <XAxis
        //       dataKey="month"
        //       tickLine={false}
        //       axisLine={false}
        //       tickMargin={8}
        //       tickFormatter={(value) => value.slice(0, 3)}
        //     />
        //     <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        //     <defs>
        //       <linearGradient
        //         id="animated-highlighted-mask-grad"
        //         x1="0"
        //         y1="0"
        //         x2="1"
        //         y2="0"
        //       >
        //         <stop offset="0%" stopColor="transparent" />
        //         <stop offset="50%" stopColor="white" />
        //         <stop offset="100%" stopColor="transparent" />
        //       </linearGradient>
        //       <linearGradient
        //         id="animated-highlighted-grad-desktop"
        //         x1="0"
        //         y1="0"
        //         x2="0"
        //         y2="1"
        //       >
        //         <stop
        //           offset="5%"
        //           stopColor="var(--color-desktop)"
        //           stopOpacity={0.4}
        //         />
        //         <stop
        //           offset="95%"
        //           stopColor="var(--color-desktop)"
        //           stopOpacity={0}
        //         />
        //       </linearGradient>
        //       <linearGradient
        //         id="animated-highlighted-grad-mobile"
        //         x1="0"
        //         y1="0"
        //         x2="0"
        //         y2="1"
        //       >
        //         <stop
        //           offset="5%"
        //           stopColor="var(--color-mobile)"
        //           stopOpacity={0.4}
        //         />
        //         <stop
        //           offset="95%"
        //           stopColor="var(--color-mobile)"
        //           stopOpacity={0}
        //         />
        //       </linearGradient>
        //       {xAxis && (
        //         <mask id="animated-highlighted-mask">
        //           <rect
        //             x={xAxis - animationConfig.glowWidth / 2}
        //             y={0}
        //             width={animationConfig.glowWidth}
        //             height="100%"
        //             fill="url(#animated-highlighted-mask-grad)"
        //           />
        //         </mask>
        //       )}
        //     </defs>
        //     <Area
        //       dataKey="mobile"
        //       type="natural"
        //       fill={"url(#animated-highlighted-grad-mobile)"}
        //       fillOpacity={0.4}
        //       stroke="var(--color-mobile)"
        //       stackId="a"
        //       strokeWidth={0.8}
        //       mask="url(#animated-highlighted-mask)"
        //     />
        //     <Area
        //       dataKey="desktop"
        //       type="natural"
        //       fill={"url(#animated-highlighted-grad-desktop)"}
        //       fillOpacity={0.4}
        //       stroke="var(--color-desktop)"
        //       stackId="a"
        //       strokeWidth={0.8}
        //       mask="url(#animated-highlighted-mask)"
        //     />
        //   </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";

// import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Badge } from "@/components/ui/badge";
// import { TrendingDown } from "lucide-react";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 87 },
//   { month: "February", desktop: 305, mobile: 163 },
//   { month: "March", desktop: 237, mobile: 142 },
//   { month: "April", desktop: 73, mobile: 195 },
//   { month: "May", desktop: 209, mobile: 118 },
//   { month: "June", desktop: 214, mobile: 231 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-2)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-5)",
//   },
// } satisfies ChartConfig;

// export function DottedMultiLineChart() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           Multi Line Chart
//           <Badge
//             variant="outline"
//             className="text-red-500 bg-red-500/10 border-none ml-2"
//           >
//             <TrendingDown className="h-4 w-4" />
//             <span>-5.2%</span>
//           </Badge>
//         </CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
        // <ChartContainer config={chartConfig}>
        //   <LineChart
        //     accessibilityLayer
        //     data={chartData}
        //     margin={{
        //       left: 12,
        //       right: 12,
        //     }}
        //   >
        //     <CartesianGrid vertical={false} />
        //     <XAxis
        //       dataKey="month"
        //       tickLine={false}
        //       axisLine={false}
        //       tickMargin={8}
        //       tickFormatter={(value) => value.slice(0, 3)}
        //     />
        //     <ChartTooltip
        //       cursor={false}
        //       content={<ChartTooltipContent hideLabel />}
        //     />
        //     <Line
        //       dataKey="desktop"
        //       type="linear"
        //       stroke="var(--color-desktop)"
        //       dot={false}
        //       strokeDasharray="4 4"
        //     />
        //     <Line dataKey="mobile" type="linear" stroke="var(--color-mobile)" />
        //   </LineChart>
        // </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }
