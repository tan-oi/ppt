import { z } from "zod";
import { LayoutRegistry } from "@/lib/registry/layout";

const HeadingWidget = z.object({
  content: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});

const ParagraphWidget = z.object({
  content: z.string(),
});

const FeatureCardWidget = z.object({
  title: z.string(),
  body: z.string(),
});

const QuoteCardWidget = z.object({
  body: z.string(),
  person: z.string(),
  company: z.string(),
});

const ImageWidget = z.object({
  imagePrompt: z.string(),
});

const StatWidget = z.object({
  value: z.string(),
  label: z.string(),
  trend: z.enum(["up", "down", "neutral"]),
  trendValue: z.string(),
});

const ChartWidget = z.object({}).catchall(z.any());

const WIDGET_BY_PATH: Record<string, z.ZodTypeAny> = {
  "@/components/widgets/headings": HeadingWidget,
  "@/components/widgets/paragraph": ParagraphWidget,
  "@/components/widgets/cards/features": FeatureCardWidget,
  "@/components/widgets/cards/quotes": QuoteCardWidget,
  "@/components/widgets/image": ImageWidget,
  "@/components/widgets/stat-widget": StatWidget,
  "@/components/widgets/charts/base": ChartWidget,
};

type OutlineSlide = {
  slideHeading: string;
  layoutType: string;
  pointers: string[];
};

export function buildPresentationSchemaFromOutline(outline: OutlineSlide[]) {
  const slideSchemas = outline.map((slide, idx) => {
    const layout = LayoutRegistry[slide.layoutType];

    if (!layout || layout.slots.length === 0) {
      return z.object({
        slideNumber: z.literal(idx + 1),
        heading: z.string(),
        layoutId: z.literal(slide.layoutType),
        content: z.record(z.string(), z.any()),
      });
    }

    const contentShape: Record<string, z.ZodTypeAny> = {};
    for (const slot of layout.slots) {
      const widget =
        WIDGET_BY_PATH[slot.defaultComponentPath] ??
        z.object({}).catchall(z.any());
      contentShape[slot.id] = widget;
    }

    return z.object({
      slideNumber: z.literal(idx + 1),
      heading: z.string(),
      layoutId: z.literal(slide.layoutType),
      content: z.object(contentShape),
    });
  });

  return z.tuple(slideSchemas as [z.ZodTypeAny, ...z.ZodTypeAny[]]);
}
