import { FeatureCardWidget } from "./widgets/cards/features";
import headings from "./widgets/headings";
import { ParagraphWidget } from "./widgets/paragraph";

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
    defaultComponent: headings,
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
    defaultComponent: headings,
  },
  {
    id: "paragraph-1",
    type: "text",
    columnStart: 8,
    columnEnd: 18,
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
    defaultComponent: headings,
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

