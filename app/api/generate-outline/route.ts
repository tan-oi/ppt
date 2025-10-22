import { buildPresentationPrompt } from "@/lib/config/prompt";
import { groq } from "@ai-sdk/groq";
import { UIMessage, convertToModelMessages, generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export const requestSchema = z.object({
  instructions: z.string().min(5, "Please give some more instructions!"),
  slidesNo: z.number().min(1).max(10, "Exceeds the number of slides allowed!"),
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

export const outlineSchema = z.object({
  slideHeading: z.string(),
  layoutType: z.enum([
    "main-pointer",
    "heading-paragraph",
    "two-column",
    "three-sections",
    "title",
    "chart-with-title",
    "chart-comparison",
    "image-caption",
    "four-quadrants",
    "header-three-cards",
    "big-number",
  ]),
  pointers: z.array(z.string().min(1)).min(1, "At least 1 pointers required"),
});

export async function POST(req: Request) {
  try {
    const obj = await req.json();
    console.log(obj);
    const parsedData = requestSchema.safeParse(obj);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.message },
        { status: 400 }
      );
    }

    const { instructions, slidesNo, type, style, tone, messages } =
      parsedData.data;

    const systemPrompt = buildPresentationPrompt({
      instructions,
      slidesNo,
      type,
      style,
      tone,
    });

    console.log(systemPrompt);
    const { object, finishReason, usage } = await generateObject({
      model: groq("openai/gpt-oss-120b"),
      output: "array",
      schema: outlineSchema,

      system: systemPrompt,
      prompt: "Do as asked!",
    });

    console.log(object);
    console.log(finishReason);
    console.log(usage, "usage");
    return NextResponse.json({ slidesOutline: object }, { status: 200 });
  } catch (error) {
    console.error("Error generating presentation:", error);
    return NextResponse.json(
      { error: "Failed to generate presentation" },
      { status: 500 }
    );
  }
}
