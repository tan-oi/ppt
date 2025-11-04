import { auth } from "@/lib/auth";
import { buildPresentationPrompt } from "@/lib/config/prompt";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/rate-limit";
import { groq } from "@ai-sdk/groq";
import { UIMessage, generateObject } from "ai";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";

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
    "stat-showcase",
    "centered-callout",
    "image-caption",
    "image-text-split",
    "two-media-paragraph",
  ]),
  pointers: z.array(z.string().min(1)).min(1, "At least 1 pointers required"),
});

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Please log in to continue" },
      { status: 401 }
    );
  }

  const requiredCredits = Number(process.env.REQUIRED_CREDITS);
  const userId = session.user.id;
  const redisKey = `user:${userId}:credits`;

  try {
    const obj = await req.json();
    const parsedData = requestSchema.safeParse(obj);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: parsedData.error.issues[0]?.message || "Invalid input",
        },
        { status: 400 }
      );
    }

    let credits = await redis.get<number>(redisKey);

    if (credits === null) {
      const userCredit = await prisma.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!userCredit) {
        return NextResponse.json(
          { error: "UNAUTHORIZED", message: "User not found" },
          { status: 404 }
        );
      }

      credits = userCredit.credits;
      await redis.set(redisKey, credits, { ex: 24 * 60 * 60 });
    }

    if (credits < requiredCredits) {
      return NextResponse.json(
        {
          error: "INSUFFICIENT_CREDITS",
          message: "You don't have enough credits",
        },
        { status: 403 }
      );
    }

    await redis.decrby(redisKey, requiredCredits);

    const { instructions, slidesNo, type, style, tone } = parsedData.data;

    let slideObject: z.infer<typeof outlineSchema>[];
    try {
      const systemPrompt = buildPresentationPrompt({
        instructions,
        slidesNo,
        type,
        style,
        tone,
      });

      const { object } = await generateObject({
        model: groq("openai/gpt-oss-120b"),
        output: "array",
        schema: outlineSchema,
        system: systemPrompt,
        prompt: "Do as asked!",
      });

      slideObject = object;
    } catch (aiError) {
      console.error("AI generation failed:", aiError);
      await redis.incrby(redisKey, requiredCredits);

      return NextResponse.json(
        {
          error: "AI_GENERATION_ERROR",
          message:
            "Failed to generate slides. Please try different instructions.",
        },
        { status: 500 }
      );
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!user || user.credits < requiredCredits) {
        await redis.incrby(redisKey, requiredCredits);
        throw new Error("Insufficient credits in database");
      }

      await tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: requiredCredits } },
      });

      const record = await tx.transactionHistory.create({
        data: {
          userId,
          credits: requiredCredits,
          type: "ppt",
        },
      });

      const presentationId = nanoid(10);
      const outline = await tx.outline.create({
        data: {
          id: presentationId,
          userId,
          topic: instructions,
          content: slideObject as any,
          finalContent: "",
        },
        select: {
          id: true,
        },
      });

      return {
        record,
        outline,
        newCredits: user.credits - requiredCredits,
      };
    });

    const ttl = await redis.ttl(redisKey);
    if (ttl > 0) {
      await redis.set(redisKey, transaction.newCredits, { ex: ttl });
    } else {
      await redis.set(redisKey, transaction.newCredits, { ex: 24 * 60 * 60 });
    }

    return NextResponse.json(
      {
        slidesOutline: slideObject,
        presentationId: transaction.outline.id,
        transactionId: transaction.record.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating presentation:", error);
    return NextResponse.json(
      {
        error: "UNKNOWN_ERROR",
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
