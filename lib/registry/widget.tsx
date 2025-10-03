import { BasicCard } from "@/components/widgets/cards/basic";
import { FeatureCardWidget } from "@/components/widgets/cards/features";
import { ListCard } from "@/components/widgets/cards/list";
import { QuoteCard } from "@/components/widgets/cards/quotes";
import { BaseChartRender } from "@/components/widgets/charts/base";
import headings from "@/components/widgets/headings";
import { ParagraphWidget } from "@/components/widgets/paragraph";

interface Objects {
  slug: string;
  type: "text" | "chart" | "image";
  component: React.ComponentType<any>;
  defaultData: Record<string, any>;
  description: string;
}

export const WidgetRegistry: Record<string, Objects> = {
  heading: {
    slug: "heading",
    type: "text",
    component: headings,
    defaultData: {
      content: "Insert headings",
      level: 1,
    },
    description:
      "Headings from level 1 to 3 to be written while emphasising on a topic",
  },
  paragraph: {
    slug: "paragraph",
    type: "text",
    component: ParagraphWidget,
    defaultData: {
      content: "Your paragraph starts",
    },
    description: "Normal paragraphs to write",
  },
  featureCard: {
    slug: "featureCard",
    type: "text",
    component: FeatureCardWidget,
    defaultData: {
      title: "",
      body: "",
    },
    description: "Card to highlight a feature or an example",
  },
  basicCard: {
    slug: "basicCard",
    type: "text",
    component: BasicCard,
    defaultData: {
      body: "",
    },
    description: "Card to highlight a point",
  },
  quoteCard: {
    slug: "quoteCard",
    type: "text",
    component: QuoteCard,
    defaultData: {
      body: "Good job building this",
      person: "Sam Altman, CEO",
      company: "Openai",
    },
    description: "A testimonial card",
  },
  listCard: {
    slug: "listCard",
    type: "text",
    component: ListCard,
    defaultData: {
      content:
        "<ul><li>First item</li><li>Second item</li><li>Third item</li></ul>",
    },
    description: "A list card",
  },

  barChart: {
    slug: "barChart",
    type: "chart",
    component: BaseChartRender,
    defaultData: {
      type: "bar",
    },
    description: "A bar chart to visualize data",
  },
  lineChart: {
    slug: "lineChart",
    type: "chart",
    component: BaseChartRender,
    defaultData: {
      type: "line",
    },
    description: "A line chart",
  },
  areaChart: {
    slug: "areaChart",
    type: "chart",
    component: BaseChartRender,
    defaultData: {
      type: "area",
    },
    description: "A area chart",
  },
  pieChart: {
    slug: "pieChart",
    type: "chart",
    component: BaseChartRender,
    defaultData: {
      type: "pie",
    },
    description: "A line chart",
  },
};
