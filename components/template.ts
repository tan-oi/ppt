import { HeadingWidget } from "./widgets/headings";
import { FeatureCardWidget } from "./widgets/cards/features";
import { ParagraphWidget } from "./widgets/paragraph";
import { BaseChartRender } from "./widgets/charts/base";
import { ImageWidget } from "./widgets/image";
import { QuoteCard } from "./widgets/cards/quotes";

export interface Slot {
  id: string;
  type: "text" | "image" | "chart";
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
  defaultComponent: any;
}

export const textImageTemplate: Slot[] = [
  {
    id: "title",
    type: "text",
    columnStart: 3,
    columnEnd: 23,
    rowStart: 2,
    rowEnd: 4,
    defaultComponent: HeadingWidget,
  },
  {
    id: "text",
    type: "text",
    columnStart: 4,
    columnEnd: 22,
    rowStart: 5,
    rowEnd: 7,
    defaultComponent: ParagraphWidget,
  },
  {
    id: "image",
    type: "image",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 9,
    rowEnd: 14,
    defaultComponent: "none",
  },
];

export const OneParagraph: Slot[] = [
  {
    id: "uno",
    type: "text",
    columnStart: 6,
    columnEnd: 19,
    rowStart: 8,
    rowEnd: 18,
    defaultComponent: ParagraphWidget,
  },
];

export const HeadingAndParagraph: Slot[] = [
  {
    id: "heading-1",
    type: "text",
    columnStart: 10,
    columnEnd: 16,
    rowStart: 6,
    rowEnd: 8,
    defaultComponent: HeadingWidget,
  },
  {
    id: "paragraph-1",
    type: "text",
    columnStart: 8,
    columnEnd: 16,
    rowStart: 10,
    rowEnd: 20,
    defaultComponent: ParagraphWidget,
  },
];

export const TwoColumn: Slot[] = [
  {
    id: "left-column",
    type: "text",
    columnStart: 4,
    columnEnd: 12,
    rowStart: 7,
    rowEnd: 20,
    defaultComponent: ParagraphWidget,
  },
  {
    id: "right-column",
    type: "text",
    columnStart: 14,
    columnEnd: 22,
    rowStart: 7,
    rowEnd: 20,
    defaultComponent: ParagraphWidget,
  },
];

export const TitleSlide: Slot[] = [
  {
    id: "main-title",
    type: "text",
    columnStart: 10,
    columnEnd: 16,
    rowStart: 8,
    rowEnd: 10,
    defaultComponent: HeadingWidget,
  },
  {
    id: "subtitle",
    type: "text",
    columnStart: 8,
    columnEnd: 18,
    rowStart: 10,
    rowEnd: 13,
    defaultComponent: ParagraphWidget,
  },
];

export const ThreeSections: Slot[] = [
  // {
  //   id: "main-heading",
  //   type: "text",
  //   columnStart: 3,
  //   columnEnd: 23,
  //   rowStart: 2,
  //   rowEnd: 4,
  // },
  {
    id: "section-1",
    type: "text",
    columnStart: 3,
    columnEnd: 9,
    rowStart: 9,
    rowEnd: 17,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "section-2",
    type: "text",
    columnStart: 10,
    columnEnd: 16,
    rowStart: 9,
    rowEnd: 17,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "section-3",
    type: "text",
    columnStart: 17,
    columnEnd: 23,
    rowStart: 9,
    rowEnd: 17,
    defaultComponent: FeatureCardWidget,
  },
];
export const ChartWithTitle: Slot[] = [
  {
    id: "chart-title",
    type: "text",
    columnStart: 3,
    columnEnd: 23,
    rowStart: 2,
    rowEnd: 5,
    defaultComponent: HeadingWidget,
  },
  {
    id: "main-chart",
    type: "chart",
    columnStart: 4,
    columnEnd: 22,
    rowStart: 6,
    rowEnd: 20,
    defaultComponent: BaseChartRender,
  },
];

export const ChartComparison: Slot[] = [
  {
    id: "left-chart",
    type: "chart",
    columnStart: 3,
    columnEnd: 12,
    rowStart: 4,
    rowEnd: 22,
    defaultComponent: BaseChartRender,
  },
  {
    id: "right-chart",
    type: "chart",
    columnStart: 14,
    columnEnd: 23,
    rowStart: 4,
    rowEnd: 22,
    defaultComponent: BaseChartRender,
  },
];

export const ImageWithCaption: Slot[] = [
  {
    id: "main-image",
    type: "image",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 3,
    rowEnd: 18,
    defaultComponent: ImageWidget,
  },
  {
    id: "caption",
    type: "text",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 19,
    rowEnd: 22,
    defaultComponent: ParagraphWidget,
  },
];

export const SideBySideImageText: Slot[] = [
  {
    id: "left-image",
    type: "image",
    columnStart: 3,
    columnEnd: 12,
    rowStart: 3,
    rowEnd: 22,
    defaultComponent: ImageWidget,
  },
  {
    id: "right-content",
    type: "text",
    columnStart: 14,
    columnEnd: 23,
    rowStart: 6,
    rowEnd: 19,
    defaultComponent: ParagraphWidget,
  },
];

export const FourQuadrants: Slot[] = [
  {
    id: "top-left",
    type: "text",
    columnStart: 3,
    columnEnd: 12,
    rowStart: 3,
    rowEnd: 12,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "top-right",
    type: "text",
    columnStart: 14,
    columnEnd: 23,
    rowStart: 3,
    rowEnd: 12,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "bottom-left",
    type: "text",
    columnStart: 3,
    columnEnd: 12,
    rowStart: 14,
    rowEnd: 23,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "bottom-right",
    type: "text",
    columnStart: 14,
    columnEnd: 23,
    rowStart: 14,
    rowEnd: 23,
    defaultComponent: FeatureCardWidget,
  },
];

export const HeaderWithThreeCards: Slot[] = [
  {
    id: "main-header",
    type: "text",
    columnStart: 3,
    columnEnd: 23,
    rowStart: 2,
    rowEnd: 5,
    defaultComponent: HeadingWidget,
  },
  {
    id: "card-1",
    type: "text",
    columnStart: 3,
    columnEnd: 9,
    rowStart: 7,
    rowEnd: 22,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "card-2",
    type: "text",
    columnStart: 10,
    columnEnd: 16,
    rowStart: 7,
    rowEnd: 22,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "card-3",
    type: "text",
    columnStart: 17,
    columnEnd: 23,
    rowStart: 7,
    rowEnd: 22,
    defaultComponent: FeatureCardWidget,
  },
];

export const BigNumberWithContext: Slot[] = [
  {
    id: "big-stat",
    type: "text",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 6,
    rowEnd: 12,
    defaultComponent: HeadingWidget,
  },
  {
    id: "stat-description",
    type: "text",
    columnStart: 6,
    columnEnd: 20,
    rowStart: 13,
    rowEnd: 19,
    defaultComponent: ParagraphWidget,
  },
];

export const TextOverImage: Slot[] = [
  {
    id: "background-image",
    type: "image",
    columnStart: 2,
    columnEnd: 24,
    rowStart: 2,
    rowEnd: 24,
    defaultComponent: ImageWidget,
  },
  {
    id: "overlay-heading",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 9,
    rowEnd: 12,
    defaultComponent: HeadingWidget,
  },
  {
    id: "overlay-text",
    type: "text",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 13,
    rowEnd: 17,
    defaultComponent: ParagraphWidget,
  },
];

export const SplitContentChart: Slot[] = [
  {
    id: "title-section",
    type: "text",
    columnStart: 3,
    columnEnd: 23,
    rowStart: 2,
    rowEnd: 5,
    defaultComponent: HeadingWidget,
  },
  {
    id: "left-text",
    type: "text",
    columnStart: 3,
    columnEnd: 11,
    rowStart: 7,
    rowEnd: 22,
    defaultComponent: ParagraphWidget,
  },
  {
    id: "right-chart",
    type: "chart",
    columnStart: 13,
    columnEnd: 23,
    rowStart: 7,
    rowEnd: 22,
    defaultComponent: BaseChartRender,
  },
];

export const VerticalTimeline: Slot[] = [
  {
    id: "timeline-title",
    type: "text",
    columnStart: 3,
    columnEnd: 23,
    rowStart: 2,
    rowEnd: 5,
    defaultComponent: HeadingWidget,
  },
  {
    id: "step-1",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 7,
    rowEnd: 11,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "step-2",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 13,
    rowEnd: 17,
    defaultComponent: FeatureCardWidget,
  },
  {
    id: "step-3",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 19,
    rowEnd: 23,
    defaultComponent: FeatureCardWidget,
  },
];

export const CenteredCallout: Slot[] = [
  {
    id: "callout-text",
    type: "text",
    columnStart: 6,
    columnEnd: 20,
    rowStart: 10,
    rowEnd: 16,
    defaultComponent: HeadingWidget,
  },
];

export const QuoteHighlight: Slot[] = [
  {
    id: "quote-card",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 8,
    rowEnd: 17,
    defaultComponent: QuoteCard,
  },
];
// export const BulletPoints: Slot[] = [
//   {
//     id: "section-title",
//     type: "text",
//     columnStart: 3,
//     columnEnd: 21,
//     rowStart: 2,
//     rowEnd: 4,
//   },
//   {
//     id: "bullet-content",
//     type: "text",
//     columnStart: 5,
//     columnEnd: 22,
//     rowStart: 6,
//     rowEnd: 14,
//   },
// ];

// export const QuoteLayout: Slot[] = [
//   {
//     id: "quote-text",
//     type: "text",
//     columnStart: 4,
//     columnEnd: 22,
//     rowStart: 6,
//     rowEnd: 11,
//   },
//   {
//     id: "attribution",
//     type: "text",
//     columnStart: 14,
//     columnEnd: 22,
//     rowStart: 13,
//     rowEnd: 14,
//   },
// ];
