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

const presentationData = {
  id: "tsk1091-1029-5240-9832",
  isModified: true,
  topic: "India and its festivals",
  slides: [
    {
      id: "slide-1a2b3c",
      slideNumber: 1,
      heading: "The Science of Sleep: Unlocking Your Brain's Superpower",
      widgets: {
        "widget-1a2b3c": {
          widgetType: "heading",
          data: { content: "The Science of Sleep", level: 1 },
          position: { x: 480, y: 210, height: 60, width: 320 },
        },
        "widget-1a2b3d": {
          widgetType: "paragraph",
          data: {
            content:
              "Unlocking the hidden superpower of your brain and transforming your health through the power of a good night's rest.",
          },
          position: { x: 373.333, y: 270, width: 533.33, height: 90 },
        },
      },
    },
    {
      id: "slide-2a2b3c",
      slideNumber: 2,
      heading: "Why We Sleep: More Than Just Rest",
      widgets: {
        "widget-2a2b3c": {
          widgetType: "heading",
          data: { content: "Sleep is an Active Brain State", level: 2 },
          position: { x: 480, y: 150, height: 60, width: 320 },
        },
        "widget-2a2b3d": {
          widgetType: "paragraph",
          data: {
            content:
              "Contrary to old beliefs, sleep is not a passive shutdown. It is a highly organized and active period where the brain works tirelessly. During these critical hours, your brain consolidates memories, clears out harmful metabolic waste, recalibrates emotional circuits, and prepares you for the challenges of the next day. This nightly maintenance is fundamental to learning, mood regulation, and long-term cognitive health, proving that what happens while you sleep is just as important as what you do while you're awake.",
          },
          position: { x: 373.33, y: 270, height: 300, width: 533.33 },
        },
      },
    },
    {
      id: "slide-3a2b3c",
      slideNumber: 3,
      heading: "The Two-Process Model: Your Body's Sleep Regulators",
      widgets: {
        "widget-3a2b3c": {
          widgetType: "featureCard",
          data: {
            title: "Process S: Sleep Pressure",
            body: "Think of this as an hourglass for sleep. From the moment you wake, a neurochemical called adenosine begins to build up in your brain. The longer you are awake, the more it accumulates, increasing the 'pressure' or drive to sleep. This is the biological process that makes you feel progressively drowsier throughout the day. Sleeping is the only way to clear this adenosine and reset the hourglass.",
          },
          position: { width: 426.67, x: 160, y: 180, height: 390 },
        },
        "widget-3a2b3d": {
          widgetType: "featureCard",
          data: {
            title: "Process C: Circadian Rhythm",
            body: "This is your internal 24-hour master clock, primarily controlled by light exposure. It dictates the timing of your sleep-wake cycle, hormone release, and body temperature. Morning light signals your brain to be alert, while darkness in the evening triggers the release of melatonin, the hormone that facilitates sleep. A stable circadian rhythm ensures you feel sleepy and alert at the appropriate times, working in harmony with sleep pressure.",
          },
          position: { width: 426.67, x: 693.33, y: 180, height: 390 },
        },
      },
    },
    {
      id: "slide-4a2b3c",
      slideNumber: 4,
      heading: "The Architecture of a Night: Journey Through the Sleep Stages",
      widgets: {
        "widget-4a2b3c": {
          widgetType: "featureCard",
          data: {
            title: "Light Sleep (NREM 1-2)",
            body: "This is the entry point into slumber. Your breathing and heart rate slow down, muscles relax, and brain waves become less active. This transitional phase accounts for about half the night and prepares your body and mind for the deeper, more restorative stages.",
          },
          position: { width: 320, x: 106.67, y: 240, height: 240 },
        },
        "widget-4a2b3d": {
          widgetType: "featureCard",
          data: {
            title: "Deep Sleep (NREM 3)",
            body: "Often called slow-wave sleep, this is the most physically restorative stage. The body repairs tissues, boosts immune function, and builds bone and muscle. The brain's waste clearance system is also most active during this time. Waking from deep sleep is difficult and causes significant grogginess.",
          },
          position: { width: 320, x: 480, y: 240, height: 240 },
        },
        "widget-4a2b3e": {
          widgetType: "featureCard",
          data: {
            title: "REM Sleep",
            body: "Known as the mentally restorative stage, this is where vivid dreaming occurs. Your brain is highly active, consolidating memories, processing emotions, and cementing learning. Your body's major muscle groups are temporarily paralyzed to prevent you from acting out dreams. This stage is crucial for creativity and problem-solving.",
          },
          position: { width: 320, x: 853.33, y: 240, height: 240 },
        },
      },
    },
    {
      id: "slide-5a2b3c",
      slideNumber: 5,
      heading: "The Brain's Night Shift: Cleaning, Storing, and Resetting",
      widgets: {
        "widget-5a2b3c": {
          widgetType: "paragraph",
          data: {
            content:
              "At the core of sleep's importance is the brain's dedicated maintenance crew. During deep sleep, the glymphatic system—the brain's unique cleaning service—flushes out toxic byproducts like beta-amyloid, a protein linked to Alzheimer's. Following this cleanup, REM sleep acts as a master archivist, sorting the day's experiences, strengthening important neural connections to lock in memories and learning, while pruning irrelevant information. This nightly process of cleaning and organizing is non-negotiable for maintaining cognitive health, emotional stability, and our capacity to learn.",
          },
          position: { width: 693.33, x: 266.67, y: 210, height: 300 },
        },
      },
    },
    {
      id: "slide-6a2b3c",
      slideNumber: 6,
      heading: "The High Cost of Sleep Debt",
      widgets: {
        "widget-6a2b3c": {
          widgetType: "heading",
          data: { content: "The Consequences of Sleep Deprivation", level: 2 },
          position: { x: 480, y: 150, height: 60, width: 320 },
        },
        "widget-6a2b3d": {
          widgetType: "paragraph",
          data: {
            content:
              "Failing to get enough sleep results in 'sleep debt,' a cumulative deficit with severe consequences. Cognitively, it impairs focus, cripples decision-making, and slows reaction times. Emotionally, it destabilizes mood, leading to increased irritability and anxiety. Physically, chronic sleep deprivation is linked to a host of problems, including a weakened immune system, weight gain, high blood pressure, and an increased risk of developing chronic conditions like type 2 diabetes and heart disease. It affects every aspect of your health.",
          },
          position: { x: 373.33, y: 270, height: 300, width: 533.33 },
        },
      },
    },
    {
      id: "slide-7a2b3c",
      slideNumber: 7,
      heading: "Actionable Steps for Better Sleep Tonight",
      widgets: {
        "widget-7a2b3c": {
          widgetType: "featureCard",
          data: {
            title: "Control Your Environment",
            body: "Turn your bedroom into a sanctuary for sleep. Keep it cool (around 18°C / 65°F), dark by using blackout curtains, and quiet. This signals to your brain that it's time to wind down and produce melatonin, facilitating a quicker and deeper sleep onset.",
          },
          position: { x: 106.67, y: 240, height: 240, width: 320 },
        },
        "widget-7a2b3d": {
          widgetType: "featureCard",
          data: {
            title: "Build a Consistent Routine",
            body: "Go to bed and wake up at the same time every day, even on weekends. This consistency anchors your body's circadian rhythm, making it naturally easier to fall asleep and wake up feeling refreshed. A relaxing wind-down ritual, like reading a book, can also help.",
          },
          position: { x: 480, y: 240, height: 240, width: 320 },
        },
        "widget-7a2b3e": {
          widgetType: "featureCard",
          data: {
            title: "Be Mindful of Light & Diet",
            body: "Get bright sunlight exposure in the morning to promote wakefulness. In the evening, avoid blue light from screens for at least an hour before bed. Also, avoid caffeine after 2 PM, and steer clear of large meals or alcohol right before you turn in for the night.",
          },
          position: { x: 853.33, y: 240, height: 240, width: 320 },
        },
      },
    },
    {
      id: "slide-8a2b3c",
      slideNumber: 8,
      heading: "Prioritize Your Sleep, Elevate Your Life",
      widgets: {
        "widget-8a2b3c": {
          widgetType: "heading",
          data: { content: "Invest in Rest, Invest in Yourself", level: 1 },
          position: { x: 480, y: 210, height: 60, width: 320 },
        },
        "widget-8a2b3d": {
          widgetType: "paragraph",
          data: {
            content:
              "Sleep is not a luxury; it is a biological necessity that forms the foundation of good health, happiness, and productivity. By making small, consistent changes, you can fundamentally improve your life. Thank you.",
          },
          position: { height: 90, x: 373.33, y: 270, width: 533.33 },
        },
      },
    },
  ],
};
