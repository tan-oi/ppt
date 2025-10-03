import { Slot } from "@/components/slideUtils";
import {
  OneParagraph,
  HeadingAndParagraph,
  ThreeSections,
  TitleSlide,
  TwoColumn,
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
};

