export const WidgetMetadata = {
  heading: {
    slug: "heading",
    type: "text",
    path: "@/components/widgets/headings",
    defaultData: {
      content: "Add Your Heading Here",
      level: 1,
    },
    defaultPosition: { x: 80, y: 60, width: 400, height: 100 },
    description:
      "Headings frobm level 1 to 3 to be written while emphasising on a topic",
  },
  paragraph: {
    slug: "paragraph",
    type: "text",
    path: "@/components/widgets/paragraph",

    defaultData: {
      content:
        "Click to edit this paragraph. Add your key points, explanations, or supporting details here.",
    },
    defaultPosition: { x: 80, y: 200, width: 500, height: 120 },
    description: "Normal paragraphs to write",
  },
  featureCard: {
    slug: "featureCard",
    type: "text",
    path: "@/components/widgets/cards/features",
    defaultData: {
      title: "Key Feature",
      body: "Describe the main benefit or feature that makes your solution stand out. Focus on value and impact.",
    },
    defaultPosition: { x: 80, y: 180, width: 380, height: 280 },
    description: "Card to highlight a feature or an example",
  },
  basicCard: {
    slug: "basicCard",
    type: "text",
    path: "@/components/widgets/cards/basic",
    defaultData: {
      content: "Important Point",
    },
    defaultPosition: { x: 100, y: 250, width: 280, height: 200 },
    description: "Card to highlight a point",
  },
  quoteCard: {
    slug: "quoteCard",
    type: "text",
    path: "@/components/widgets/cards/quotes",
    defaultData: {
      body: "This solution transformed how we approach our workflow. The results exceeded our expectations.",
      person: "Alex Chen, CTO",
      company: "TechCorp",
    },
    defaultPosition: { x: 80, y: 180, width: 520, height: 280 },
    description: "A testimonial card",
  },
  listCard: {
    slug: "listCard",
    type: "text",
    path: "@/components/widgets/cards/list",
    defaultData: {
      content:
        "<ul><li>Increase productivity by 40%</li><li>Reduce operational costs</li><li>Improve team collaboration</li><li>Scale effortlessly</li></ul>",
    },
    defaultPosition: { x: 80, y: 200, width: 450, height: 350 },
    description: "A list card",
  },

  barChart: {
    slug: "barChart",
    type: "chart",
    path: "@/components/widgets/charts/base",
    defaultData: {
      type: "bar",
      data: [
        { month: "Q1", desktop: 4500, mobile: 3200 },
        { month: "Q2", desktop: 5200, mobile: 4100 },
        { month: "Q3", desktop: 6800, mobile: 5500 },
        { month: "Q4", desktop: 8900, mobile: 7200 },
      ],
      config: {
        desktop: { label: "Desktop", color: "red" },
        mobile: { label: "Mobile", color: "green" },
      },
    },
    defaultPosition: { x: 140, y: 150, width: 520, height: 380 },
    description: "A bar chart to visualize data",
  },
  lineChart: {
    slug: "lineChart",
    type: "chart",
    path: "@/components/widgets/charts/base",
    defaultData: {
      type: "line",
      data: [
        { month: "Jan", users: 2400, revenue: 3800 },
        { month: "Feb", users: 3200, revenue: 4200 },
        { month: "Mar", users: 4100, revenue: 5100 },
        { month: "Apr", users: 5500, revenue: 6800 },
        { month: "May", users: 6800, revenue: 8200 },
        { month: "Jun", users: 8200, revenue: 9500 },
      ],
      config: {
        users: { label: "Users", color: "red" },
        revenue: { label: "Revenue", color: "green" },
      },
    },
    defaultPosition: { x: 140, y: 150, width: 580, height: 380 },
    description: "A line chart",
  },
  areaChart: {
    slug: "areaChart",
    type: "chart",
    path: "@/components/widgets/charts/base",
    defaultData: {
      type: "area",
      data: [
        { month: "Jan", performance: 3200, target: 3000 },
        { month: "Feb", performance: 4100, target: 3500 },
        { month: "Mar", performance: 3800, target: 4000 },
        { month: "Apr", performance: 5200, target: 4500 },
        { month: "May", performance: 6500, target: 5000 },
        { month: "Jun", performance: 7800, target: 6000 },
      ],
      config: {
        performance: { label: "Performance", color: "red" },
        target: { label: "Target", color: "green" },
      },
    },
    defaultPosition: { x: 140, y: 150, width: 580, height: 380 },
    description: "An area chart",
  },
  pieChart: {
    slug: "pieChart",
    type: "chart",
    path: "@/components/widgets/charts/base",
    defaultData: {
      type: "pie",
      data: [
        { category: "Product A", value: 3500, fill: "hsl(var(--chart-1))" },
        { category: "Product B", value: 2800, fill: "hsl(var(--chart-2))" },
        { category: "Product C", value: 2200, fill: "hsl(var(--chart-3))" },
        { category: "Product D", value: 1500, fill: "hsl(var(--chart-4))" },
      ],
      config: {
        value: { label: "Sales" },
      },
    },
    defaultPosition: { x: 180, y: 120, width: 450, height: 450 },
    description: "A pie chart",
  },
  iconCard: {
    slug: "iconCard",
    type: "text",
    path: "@/components/widgets/cards/icon",
    defaultData: {
      iconName: "Zap",
      label: "Fast Performance",
      iconSize: 48,
      iconColor: "#3B82F6",
      showLabel: true,
      labelPosition: "bottom",
    },
    defaultPosition: { x: 200, y: 200, width: 150, height: 150 },
    description: "Icon with optional label for visual emphasis",
  },
  divider: {
    slug: "divider",
    type: "decoration",
    path: "@/components/widgets/divider",
    defaultData: {
      style: "dashed",
      thickness: 2,
      color: "#E5E7EB",
      width: "100%",
      orientation: "horizontal",
    },
    defaultPosition: { x: 80, y: 200, width: 200, height: 200 },
    description: "Horizontal or vertical line separator",
  },
  buttonLink: {
    slug: "buttonLink",
    type: "text",
    path: "@/components/widgets/links/base",
    defaultData: {
      text: "Click Here",
      url: "holy.so",
      variant: "text",
      color: "#3B82F6",
      showIcon: true,
    },
    defaultPosition: { x: 200, y: 250, width: 200, height: 80 },
    description: "Clickable button link with customizable styles",
  },
  progressBar: {
    slug: "progressBar",
    type: "decoration",
    path: "@/components/widgets/progress-bar",
    defaultData: {
      percentage: 75,
      label: "Project Progress",
      color: "#3B82F6",
      backgroundColor: "#E5E7EB",
      showPercentage: true,
      height: 24,
    },
    defaultPosition: { x: 100, y: 250, width: 500, height: 100 },
    description: "Visual progress indicator with percentage display",
  },
  badge: {
    slug: "badge",
    type: "decoration",
    path: "@/components/widgets/badge",
    defaultData: {
      label: "hey",
      color: "#000",
      backgroundColor: "#fff",
    },
    defaultPosition: {
      x: 100,
      y: 250,
      width: 60,
      height: 80,
    },
    description: "Visual badge/pill component",
  },
  image: {
    slug: "image",
    type: "image",
    path: "@/components/widgets/image",
    defaultData: {
      imageUrl:
        "https://res.cloudinary.com/dcuxne34n/image/upload/v1761637833/ai-generated-images/jzyhx6xug4nltulbxhgz.png",
      alt: "Slide image demo",
      objectFit: "contain",
    },
    defaultPosition: { x: 150, y: 150, width: 400, height: 300 },
    description: "Add images to your slides with upload support",
  },
  statWidget: {
    slug: "statWidget",
    type: "text",
    path: "@/components/widgets/stat-widget",
    defaultData: {
      value: "85%",
      label: "Customer Satisfaction",
      trend: "up",
      trendValue: "+12%",
      unit: "",
    },
    defaultPosition: { x: 100, y: 150, width: 400, height: 350 },
    description: "Large impactful number with trend indicator",
  },
};

export const COMPONENT_PATH_TO_WIDGET: Record<string, string> = {
  "@/components/widgets/headings": "heading",
  "@/components/widgets/paragraph": "paragraph",

  "@/components/widgets/cards/features": "featureCard",
  "@/components/widgets/cards/basic": "basicCard",
  "@/components/widgets/cards/list": "listCard",

  "@/components/widgets/cards/quotes": "quoteCard",
  "@/components/widgets/charts/base": "barChart",
  "@/components/widgets/image": "image",
  "@/components/widgets/stat-widget": "statWidget",
};

interface Conversion {
  widgetType: string;
  typeSet: string;
}
export const COMPONENT_PATH_CONVERSION: Record<string, Conversion> = {
  "@/components/widgets/headings": {
    widgetType: "heading",
    typeSet: "heading",
  },
  "@/components/widgets/paragraph": {
    widgetType: "paragraph",
    typeSet: "paragraph",
  },

  "@/components/widgets/cards/features": {
    widgetType: "featureCard",
    typeSet: "card",
  },
  "@/components/widgets/cards/basic": {
    widgetType: "basicCard",
    typeSet: "card",
  },
  "@/components/widgets/cards/list": {
    widgetType: "listCard",
    typeSet: "list",
  },

  "@/components/widgets/cards/quotes": {
    widgetType: "quoteCard",
    typeSet: "quote",
  },
  "@/components/widgets/charts/base": {
    widgetType: "barChart",
    typeSet: "chart",
  },
  "@/components/widgets/image": { widgetType: "image", typeSet: "image" },
  "@/components/widgets/stat-widget": {
    widgetType: "statWidget",
    typeSet: "stats",
  },
};
