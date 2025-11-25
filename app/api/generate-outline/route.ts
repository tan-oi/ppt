import { auth } from "@/lib/auth";
import { buildPresentationPrompt } from "@/lib/config/prompt";
import { prisma } from "@/lib/prisma";
import { groq } from "@ai-sdk/groq";
import { UIMessage, generateObject } from "ai";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { nanoid } from "nanoid";
import { deductCredits, refundCredits } from "@/lib/functions/credits";
import { requestValidation } from "@/lib/functions/plan-enforcement";
import { createOutlineSchema, requestSchema } from "@/lib/config/schema";
import { redis } from "@/lib/rate-limit";
import { getGenerationRedisKey } from "@/lib/config/plan";

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
    const checkTicket = nanoid(32);

    await prisma.outline.create({
      data: {
        id: presentationId,
        userId,
        topic: instructions,
        content: slideObject as any,
        finalContent: "",
      },
    });
    const genKey = getGenerationRedisKey(checkTicket);
    await redis.set(
      genKey,
      JSON.stringify({
        userId,
        presentationId,
      }),
      {
        ex: 300,
      }
    );
    return NextResponse.json(
      {
        slidesOutline: slideObject,
        presentationId,
        ticket: checkTicket,
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
