import { BasicCard } from "@/components/widgets/cards/basic";
import { FeatureCardWidget } from "@/components/widgets/cards/features";
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
      content: "Your heading",
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
      content: "Your paragraph starts here...",
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
      body: "",
      person: "",
      company: "",
    },
    description: "A testimonial card",
  },
  // barChart: {
  //   slug: "barChart",
  //   type: "chart",
  //   component: BaseChartRender,
  //   defaultData: {
  //     chartData: null,
  //   },
  //   description: "A bar chart to visualize data",
  // },
};
