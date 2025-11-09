import { Slot } from "@/components/slideUtils";
import {
  OneParagraph,
  HeadingAndParagraph,
  ThreeSections,
  TitleSlide,
  TwoColumn,
  ChartWithTitle,
  ChartComparison,
  ImageWithCaption,
  SideBySideImageText,
  FourQuadrants,
  HeaderWithThreeCards,
  BigNumberWithContext,
  TextOverImage,
  SplitContentChart,
  VerticalTimeline,
  CenteredCallout,
  QuoteHighlight,
  StatShowcase,
  TwoMediaParagraph,
} from "@/components/template";

interface Layout {
  slots: Slot[];
  name: string;
  description?: string;
  recommendedContent?: string;
  layoutType: string;
}

export const LayoutRegistry: Record<string, Layout> = {
  "free-context": {
    slots: [],
    description: "no specific position",
    name: "Free-Fall",
    layoutType: "Only Text",
  },
  "main-pointer": {
    slots: OneParagraph,
    name: "Focused Paragraph",
    description:
      "One large paragraph block for important concise explanation or storytelling",
    layoutType: "Only Text",
  },
  "heading-paragraph": {
    slots: HeadingAndParagraph,
    name: "Heading & Details",
    description: "Prominent heading with a supporting paragraph beneath",
    layoutType: "Only Text",
  },
  "two-column": {
    slots: TwoColumn,
    name: "2 pointers",
    description: "Two parallel columns for side-by-side comparison or lists",
    layoutType: "Only Text",
  },
  "three-sections": {
    slots: ThreeSections,
    name: "Triple Section Layout",
    description:
      "Three evenly spaced sections for structured, segmented content",
    layoutType: "Only Text",
  },
  title: {
    slots: TitleSlide,
    name: "Hero Title Slide",
    description: "Main title and subtitle for impactful introduction",
    layoutType: "Only Text",
  },
  "chart-with-title": {
    slots: ChartWithTitle,
    name: "Chart Showcase",
    description: "Large chart with title for data visualization focus",
    layoutType: "Chart",
  },
  "chart-comparison": {
    slots: ChartComparison,
    name: "Side-by-Side Charts",
    description: "Compare two charts or datasets directly",
    layoutType: "Chart",
  },
  "image-caption": {
    slots: ImageWithCaption,
    name: "Image with Caption",
    description: "Large centered image with descriptive caption below",
    layoutType: "Image",
  },
  "image-text-split": {
    slots: SideBySideImageText,
    name: "Image & Text Split",
    description: "Image on left, explanatory text on right",
    layoutType: "Mixed",
  },
  "four-quadrants": {
    slots: FourQuadrants,
    name: "Four Quadrants",
    description: "Four equal sections for balanced feature comparison",
    layoutType: "Only Text",
  },
  "header-three-cards": {
    slots: HeaderWithThreeCards,
    name: "Header + 3 Cards",
    description: "Main heading followed by three feature cards",
    layoutType: "Only Text",
  },
  "big-number": {
    slots: BigNumberWithContext,
    name: "Big Display",
    description: "Emphasize a key metric or statistic with context",
    layoutType: "Only Text",
  },
  "text-over-image": {
    slots: TextOverImage,
    name: "Hero with Overlay",
    description: "Text overlaid on background image for dramatic effect",
    layoutType: "Mixed",
  },
  "split-content-chart": {
    slots: SplitContentChart,
    name: "Content + Chart",
    description: "Text explanation alongside supporting chart",
    layoutType: "Mixed",
  },
  "vertical-timeline": {
    slots: VerticalTimeline,
    name: "Step-by-Step Timeline",
    description: "Three sequential steps or timeline items",
    layoutType: "Only Text",
  },
  "centered-callout": {
    slots: CenteredCallout,
    name: "Centered Statement",

    description: "Single powerful statement centered on slide",
    recommendedContent:
      "Key takeaways, mission statements, memorable one-liners",
    layoutType: "Only Text",
  },
  "quote-box": {
    slots: QuoteHighlight,
    name: "Quote box",
    description: "A big quote",
    layoutType: "only text",
  },
  "stat-showcase": {
    slots: StatShowcase,
    name: "Stat Story",
    description: "Title + impactful statistic + context explanation",
    recommendedContent:
      "KPIs with backstory, growth metrics, achievement highlights",
    layoutType: "Only Text",
  },
  "two-media-paragraph": {
    slots: TwoMediaParagraph,
    name: "Two Media and paragraphs",
    description: "idl",
    recommendedContent: "",
    layoutType: "Text + Image",
  },
  "quote-highlight": {
    slots: QuoteHighlight,
    layoutType: "Text",
    name: "Quote testimonial",
    description: " ",
    recommendedContent: "",
  },
};

/**
 * 
 *   **"big-number"** → Shocking stats, key metrics, impact moments
     *Use for:* Data highlights, attention-grabbing statistics, proof points
     *Format:* Massive number/stat + context paragraph explaining significance
  
 */
