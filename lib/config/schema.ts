import { z } from "zod";
import { UIMessage } from "ai";
import { baseLayouts, imageLayouts } from "../registry/layout";
export const requestSchema = z.object({
  instructions: z.string().min(5),
  slidesNo: z.number().min(1).max(15),
  type: z.enum(["text", "link", "prompt"]),
  style: z.enum(["preserve", "extend", "base"]).optional(),
  messages: z.array(z.any()) as z.ZodType<UIMessage[]>,
  tone: z.enum([
    "professional",
    "creative",
    "casual",
    "academic",
    "inspirational",
    "minimalist",
  ]),
});

export const createOutlineSchema = (allowImages: boolean) => {
  const ALL_LAYOUTS = [...baseLayouts, ...imageLayouts];

  return z.object({
    slideHeading: z.string(),
    layoutType: z.enum(allowImages ? ALL_LAYOUTS : baseLayouts),
    pointers: z.array(z.string().min(1)).min(1),
  });
};

const BaseWidgetSchema = z.object({}).catchall(z.any());
export const createPresentationSchema = (allowImages: boolean) => {
  const ALL_LAYOUTS = [...baseLayouts, ...imageLayouts];

  return z.object({
    slideNumber: z.number(),
    heading: z.string(),
    layoutId: z.enum(allowImages ? ALL_LAYOUTS : baseLayouts),
    content: z.record(z.string(), BaseWidgetSchema),
  });
};
