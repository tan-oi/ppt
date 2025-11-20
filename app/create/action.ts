"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { strictLimit } from "@/lib/rate-limit";
import { canCreatePresentation } from "@/lib/functions/plan-enforcement";
import { incrementUserCache } from "@/lib/functions/userCache";

export async function createBlankPresentation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  const userId = session?.user?.id;
  const { success, limit, reset, remaining, pending } = await strictLimit.limit(
    `form-submit:${userId}`
  );

  if (!success) {
    const resetDate = new Date(reset);
    const waitSeconds = Math.ceil((reset - Date.now()) / 1000);

    return {
      success: false,
      error: `Too many requests. Try again in ${waitSeconds} seconds.`,
      rateLimit: {
        limit,
        remaining: 0,
        reset: resetDate.toISOString(),
        retryAfter: waitSeconds,
      },
    };
  }

  const planCheck = await canCreatePresentation(userId);
  if (!planCheck.allowed)
    return {
      success: false,
      error: planCheck.message,
      upgrade: true,
    };

  const id = nanoid(10);
  const slideId = nanoid(10);
  const widgetId = nanoid(8);

  try {
    await prisma.presentation.create({
      data: {
        id,
        topic: "Untitled Presentation",
        isModified: false,
        userId: session.user.id,
        outlineId: null,
        theme: "starter",
        slides: {
          create: {
            id: slideId,
            theme: "starter",
            slideNumber: 1,
            heading: "",
            widgets: {
              create: {
                id: widgetId,
                widgetType: "heading",
                data: {
                  text: "Click to edit heading",
                  level: 1,
                },
                position: {
                  x: 100,
                  y: 100,
                  width: 800,
                  height: 100,
                },
              },
            },
          },
        },
      },
    });

    await incrementUserCache(userId, "pptCount", 1);

    return { success: true, id };
  } catch (err) {
    console.error("Error creating presentation:", err);
    return { success: false, error: "Failed to create presentation" };
  }
}
