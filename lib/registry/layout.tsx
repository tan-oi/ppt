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

/* --background: oklch(0.1797 0.0043 308.1928);
  --foreground: oklch(0.8109 0 0);
  --card: oklch(0.22 0 0);
  --card-foreground: oklch(0.8109 0 0);
  --popover: oklch(0.1797 0.0043 308.1928);
  --popover-foreground: oklch(0.8109 0 0);
  --primary: oklch(0.7214 0.1337 49.9802);
  --primary-foreground: oklch(0.1797 0.0043 308.1928);
  --secondary: oklch(0.594 0.0443 196.0233);
  --secondary-foreground: oklch(0.1797 0.0043 308.1928);
  --muted: oklch(0.252 0 0);
  --muted-foreground: oklch(0.6268 0 0);
  --accent: oklch(0.3211 0 0);
  --accent-foreground: oklch(0.8109 0 0);
  --destructive: oklch(0.594 0.0443 196.0233);
  --destructive-foreground: oklch(0.1797 0.0043 308.1928);
  --border: oklch(0.252 0 0);
  --input: oklch(0.252 0 0);
  --ring: oklch(0.7214 0.1337 49.9802);
  --chart-1: oklch(0.594 0.0443 196.0233);
  --chart-2: oklch(0.7214 0.1337 49.9802);
  --chart-3: oklch(0.8721 0.0864 68.5474);
  --chart-4: oklch(0.6268 0 0);
  --chart-5: oklch(0.683 0 0);
  --sidebar: oklch(0.1822 0 0);
  --sidebar-foreground: oklch(0.8109 0 0);
  --sidebar-primary: oklch(0.7214 0.1337 49.9802);
  --sidebar-primary-foreground: oklch(0.1797 0.0043 308.1928);
  --sidebar-accent: oklch(0.3211 0 0);
  --sidebar-accent-foreground: oklch(0.8109 0 0);
  --sidebar-border: oklch(0.252 0 0);
  --sidebar-ring: oklch(0.7214 0.1337 49.9802);
  --font-sans: var(--font-geist-sans);
  --font-serif: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --radius: 0.3rem;
  --shadow-2xs: 0px 1px 4px 0px hsl(0 0% 0% / 0.03);
  --shadow-xs: 0px 1px 4px 0px hsl(0 0% 0% / 0.03);
  --shadow-sm: 0px 1px 4px 0px hsl(0 0% 0% / 0.05),
    0px 1px 2px -1px hsl(0 0% 0% / 0.05);
  --shadow: 0px 1px 4px 0px hsl(0 0% 0% / 0.05),
    0px 1px 2px -1px hsl(0 0% 0% / 0.05);
  --shadow-md: 0px 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0px 8px 20px rgba(0, 0, 0, 0.6);
  --shadow-xl: 0px 1px 4px 0px hsl(0 0% 0% / 0.05),
    0px 8px 10px -1px hsl(0 0% 0% / 0.05);
  --shadow-2xl: 0px 1px 4px 0px hsl(0 0% 0% / 0.13); */
