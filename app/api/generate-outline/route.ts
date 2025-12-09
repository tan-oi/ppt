import { auth } from "@/lib/auth";
import { buildPresentationPrompt } from "@/lib/config/prompt";
import { prisma } from "@/lib/prisma";
import { groq, createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
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

  const userId = session?.user?.id;

  const groqApiKey = req.headers.get("x-groq-api-key");

  const isGuestMode = !userId;

  // if (!session && !isGuestMode) {
  //   return NextResponse.json(
  //     { error: "UNAUTHORIZED", message: "Login required or provide API key" },
  //     { status: 401 }
  //   );
  // }

  console.log(userId, groqApiKey);

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
    const { slidesNo } = parsed.data;

    let maxImagesAllowed = 0;

    // if (!isGuestMode) {
    //   const planCheck = await requestValidation(userId, slidesNo);
    //   if (!planCheck.allowed) {
    //     return NextResponse.json(
    //       {
    //         error: planCheck.error,
    //         message: planCheck.message,
    //         upgrade: true,
    //       },
    //       {
    //         status: 402,
    //       }
    //     );
    //   }

    //   maxImagesAllowed = planCheck.maxImagesAllowed ?? 0;

    //   const requiredCredits = Number(process.env.PPT_REQUIRED_CREDITS);
    //   const isDeducted = await deductCredits({
    //     type: "ppt",
    //     amount: requiredCredits,
    //     userId: userId,
    //   });

    //   if (!isDeducted.ok) {
    //     return NextResponse.json(
    //       {
    //         error: isDeducted.error,
    //         message: "You've exhausted your credits to make presentations",
    //         upgrade: true,
    //       },
    //       {
    //         status: 402,
    //       }
    //     );
    //   }
    // }

    const { instructions, type, style, tone } = parsed.data;
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
      const groqModel =
        req.headers.get("x-groq-model") || "openai/gpt-oss-120b";

      const groqProvider = groqApiKey
        ? createGroq({ apiKey: groqApiKey })
        : groq;

      const { object } = await generateObject({
        model: groqProvider(groqModel),
        output: "array",
        schema: outlineSchema,
        system: systemPrompt,
        prompt: "Do as asked!",
      });

      slideObject = object;
    } catch (err: any) {
      const errorMessage = err.message?.toLowerCase() || "";
      console.log(err.message);
      const isAuthError =
        err.status === 401 ||
        err.statusCode === 401 ||
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("invalid api key") ||
        errorMessage.includes("authentication");

      // if (!isGuestMode) {
      //   const requiredCredits = Number(process.env.PPT_REQUIRED_CREDITS);
      //   await refundCredits({ userId, amount: requiredCredits });
      // }

      if (isAuthError) {
        return NextResponse.json(
          {
            error: "INVALID_API_KEY",
            message:
              "Invalid Groq API key. Please check your API key and try again.",
          },
          { status: 401 }
        );
      }

      throw err;
    }

    const presentationId = isGuestMode ? `${nanoid(10)}_gm` : nanoid(10);
    const checkTicket = isGuestMode ? `gm_${nanoid(32)}` : nanoid(32);

    if (!isGuestMode && session) {
      await prisma.outline.create({
        data: {
          id: presentationId,
          userId,
          topic: instructions,
          content: slideObject as any,
          finalContent: "",
        },
      });
    }

    const genKey = getGenerationRedisKey(checkTicket);
    await redis.set(
      genKey,
      JSON.stringify({
        userId: isGuestMode ? "guest" : userId,
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
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "UNKNOWN_ERROR",
        message: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
