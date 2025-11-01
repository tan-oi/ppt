"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { lightLimit } from "@/lib/rate-limit";

export async function toggleSharePresentation(
  presentationId: string,
  currentState: boolean
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  const id = session?.user?.id;
  const { success, limit, reset, remaining, pending } = await lightLimit.limit(
    `share:{user}`
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
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.presentation.update({
      where: {
        id: presentationId,
        userId: session.user.id,
      },
      data: {
        isShared: !currentState,
      },
    });

    revalidatePath(`/docs/${presentationId}`);

    return { success: true, isShared: !currentState };
  } catch (error) {
    console.error("Error toggling share:", error);
    throw new Error("Failed to update share status");
  }
}