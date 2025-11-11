export interface Slot {
  id: string;
  type: "text" | "image" | "chart";
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
  //changed name
  defaultComponentPath: string;
}

export const textImageTemplate: Slot[] = [
  {
    id: "title",
    type: "text",
    columnStart: 3,
    columnEnd: 23,
    rowStart: 2,
    rowEnd: 4,
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "text",
    type: "text",
    columnStart: 4,
    columnEnd: 22,
    rowStart: 5,
    rowEnd: 7,
    defaultComponentPath: "@/components/widgets/paragraph",
  },
  {
    id: "image",
    type: "image",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 9,
    rowEnd: 14,
    defaultComponentPath: "none",
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
    defaultComponentPath: "@/components/widgets/paragraph",
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
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "paragraph-1",
    type: "text",
    columnStart: 8,
    columnEnd: 18,
    rowStart: 10,
    rowEnd: 16,
    defaultComponentPath: "@/components/widgets/paragraph",
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
    defaultComponentPath: "@/components/widgets/paragraph",
  },
  {
    id: "right-column",
    type: "text",
    columnStart: 14,
    columnEnd: 22,
    rowStart: 7,
    rowEnd: 20,
    defaultComponentPath: "@/components/widgets/paragraph",
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
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "subtitle",
    type: "text",
    columnStart: 8,
    columnEnd: 18,
    rowStart: 10,
    rowEnd: 13,
    defaultComponentPath: "@/components/widgets/paragraph",
  },
];

export const ThreeSections: Slot[] = [
  {
    id: "section-1",
    type: "text",
    columnStart: 3,
    columnEnd: 9,
    rowStart: 9,
    rowEnd: 17,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "section-2",
    type: "text",
    columnStart: 10,
    columnEnd: 16,
    rowStart: 9,
    rowEnd: 17,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "section-3",
    type: "text",
    columnStart: 17,
    columnEnd: 23,
    rowStart: 9,
    rowEnd: 17,
    defaultComponentPath: "@/components/widgets/cards/features",
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
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "main-chart",
    type: "chart",
    columnStart: 4,
    columnEnd: 22,
    rowStart: 6,
    rowEnd: 20,
    defaultComponentPath: "@/components/widgets/charts/base",
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
    defaultComponentPath: "@/components/widgets/charts/base",
  },
  {
    id: "right-chart",
    type: "chart",
    columnStart: 14,
    columnEnd: 23,
    rowStart: 4,
    rowEnd: 22,
    defaultComponentPath: "@/components/widgets/charts/base",
  },
];

export const ImageWithCaption: Slot[] = [
  {
    id: "main-image",
    type: "image",
    columnStart: 8,
    columnEnd: 17,
    rowStart: 3,
    rowEnd: 18,
    defaultComponentPath: "@/components/widgets/image",
  },
  {
    id: "caption",
    type: "text",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 19,
    rowEnd: 22,
    defaultComponentPath: "@/components/widgets/paragraph",
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
    defaultComponentPath: "@/components/widgets/image",
  },
  {
    id: "right-content",
    type: "text",
    columnStart: 14,
    columnEnd: 23,
    rowStart: 6,
    rowEnd: 19,
    defaultComponentPath: "@/components/widgets/paragraph",
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
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "top-right",
    type: "text",
    columnStart: 14,
    columnEnd: 23,
    rowStart: 3,
    rowEnd: 12,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "bottom-left",
    type: "text",
    columnStart: 3,
    columnEnd: 12,
    rowStart: 14,
    rowEnd: 23,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "bottom-right",
    type: "text",
    columnStart: 14,
    columnEnd: 23,
    rowStart: 14,
    rowEnd: 23,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
];

export const HeaderWithThreeCards: Slot[] = [
  {
    id: "main-header",
    type: "text",
    columnStart: 10,
    columnEnd: 16,
    rowStart: 2,
    rowEnd: 5,
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "card-1",
    type: "text",
    columnStart: 3,
    columnEnd: 9,
    rowStart: 7,
    rowEnd: 22,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "card-2",
    type: "text",
    columnStart: 10,
    columnEnd: 16,
    rowStart: 7,
    rowEnd: 22,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "card-3",
    type: "text",
    columnStart: 17,
    columnEnd: 23,
    rowStart: 7,
    rowEnd: 22,
    defaultComponentPath: "@/components/widgets/cards/features",
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
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "stat-description",
    type: "text",
    columnStart: 6,
    columnEnd: 20,
    rowStart: 13,
    rowEnd: 19,
    defaultComponentPath: "@/components/widgets/paragraph",
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
    defaultComponentPath: "@/components/widgets/image",
  },
  {
    id: "overlay-heading",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 9,
    rowEnd: 12,
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "overlay-text",
    type: "text",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 13,
    rowEnd: 17,
    defaultComponentPath: "@/components/widgets/paragraph",
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
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "left-text",
    type: "text",
    columnStart: 3,
    columnEnd: 11,
    rowStart: 7,
    rowEnd: 22,
    defaultComponentPath: "@/components/widgets/paragraph",
  },
  {
    id: "right-chart",
    type: "chart",
    columnStart: 13,
    columnEnd: 23,
    rowStart: 7,
    rowEnd: 22,
    defaultComponentPath: "@/components/widgets/charts/base",
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
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "step-1",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 7,
    rowEnd: 11,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "step-2",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 13,
    rowEnd: 17,
    defaultComponentPath: "@/components/widgets/cards/features",
  },
  {
    id: "step-3",
    type: "text",
    columnStart: 5,
    columnEnd: 21,
    rowStart: 19,
    rowEnd: 23,
    defaultComponentPath: "@/components/widgets/cards/features",
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
    defaultComponentPath: "@/components/widgets/headings",
  },
];

export const StatShowcase: Slot[] = [
  {
    id: "stat-title",
    type: "text",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 3,
    rowEnd: 6,
    defaultComponentPath: "@/components/widgets/headings",
  },
  {
    id: "main-stat",
    type: "text",
    columnStart: 7,
    columnEnd: 19,
    rowStart: 7,
    rowEnd: 16,
    defaultComponentPath: "@/components/widgets/stat-widget",
  },
  {
    id: "stat-explanation",
    type: "text",
    columnStart: 8,
    columnEnd: 18,
    rowStart: 17,
    rowEnd: 21,
    defaultComponentPath: "@/components/widgets/paragraph",
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
    defaultComponentPath: "@/components/widgets/cards/quotes",
  },
];

export const TwoMediaParagraph: Slot[] = [
  {
    id: "media-1",
    type: "image",
    columnStart: 4,
    columnEnd: 12,
    rowStart: 3,
    rowEnd: 18,
    defaultComponentPath: "@/components/widgets/image",
  },
  {
    id: "text-1",
    type: "text",
    columnStart: 5,
    columnEnd: 11,
    rowStart: 19,
    rowEnd: 21,
    defaultComponentPath: "@/components/widgets/paragraph",
  },
  {
    id: "media-2",
    type: "image",
    columnStart: 14,
    columnEnd: 22,
    rowStart: 3,
    rowEnd: 18,
    defaultComponentPath: "@/components/widgets/image",
  },
  {
    id: "paragraph-2",
    type: "text",
    columnStart: 15,
    columnEnd: 21,
    rowStart: 19,
    rowEnd: 21,
    defaultComponentPath: "@/components/widgets/paragraph",
  },
];
