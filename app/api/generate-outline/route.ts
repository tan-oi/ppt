import { auth } from "@/lib/auth";
import { buildPresentationPrompt } from "@/lib/config/prompt";
import { prisma } from "@/lib/prisma";
import { groq } from "@ai-sdk/groq";
import { UIMessage, generateObject } from "ai";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { deductCredits, refundCredits } from "@/lib/functions/credits";
import { requestValidation } from "@/lib/functions/plan-enforcement";

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

const TEXT_LAYOUTS = [
  "main-pointer",
  "heading-paragraph",
  "two-column",
  "three-sections",
  "title",
  "chart-with-title",
  "chart-comparison",
  "four-quadrants",
  "header-three-cards",
  "stat-showcase",
  "centered-callout",
] as const;

const IMAGE_LAYOUTS = [
  "image-caption",
  "image-text-split",
  "two-media-paragraph",
] as const;

const ALL_LAYOUTS = [...TEXT_LAYOUTS, ...IMAGE_LAYOUTS] as const;

const createOutlineSchema = (allowImages: boolean) => {
  return z.object({
    slideHeading: z.string(),
    layoutType: z.enum(allowImages ? ALL_LAYOUTS : TEXT_LAYOUTS),
    pointers: z.array(z.string().min(1)).min(1),
  });
};

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Login required" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message,
        },
        { status: 400 }
      );
    }
    console.log("i did");
    const { slidesNo } = parsed.data;

    const planCheck = await requestValidation(userId, slidesNo);

    if (!planCheck.allowed) {
      return NextResponse.json(
        {
          error: planCheck.error,
          message: planCheck.message,
          upgrade: true,
        },
        {
          status: 402,
        }
      );
    }

    const maxImagesAllowed = planCheck.maxImagesAllowed ?? 0;
    const { instructions, type, style, tone } = parsed.data;

    const requiredCredits = Number(process.env.PPT_REQUIRED_CREDITS);
    console.log(requiredCredits);
    const isDeducted = await deductCredits({
      type: "ppt",
      amount: requiredCredits,
    });

    if (!isDeducted.ok) {
      return NextResponse.json(
        {
          error: isDeducted.error,
          message: "You've exhausted your credits to make presentations",
          upgrade: true,
        },
        {
          status: 402,
        }
      );
    }
    let slideObject;

    try {
      const systemPrompt = buildPresentationPrompt({
        instructions,
        slidesNo,
        type,
        style,
        tone,
        maxImagesAllowed,
      });

      const outlineSchema = createOutlineSchema(maxImagesAllowed > 0);
      const { object } = await generateObject({
        model: groq("openai/gpt-oss-120b"),
        output: "array",
        schema: outlineSchema,
        system: systemPrompt,
        prompt: "Do as asked!",
      });

      slideObject = object;
    } catch (err) {
      await refundCredits({ userId, amount: requiredCredits });
      throw err;
    }

    const presentationId = nanoid(10);

    await prisma.outline.create({
      data: {
        id: presentationId,
        userId,
        topic: instructions,
        content: slideObject as any,
        finalContent: "",
      },
    });

    return NextResponse.json(
      {
        slidesOutline: slideObject,
        presentationId,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "UNKNOWN_ERROR",
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
