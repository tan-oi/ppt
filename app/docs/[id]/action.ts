"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { lightLimit } from "@/lib/rate-limit";

export async function toggleSharePresentation(
  presentationId: string,
  currentState: boolean
): Promise<{ success: boolean; isShared: boolean; error?: string }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, isShared: currentState, error: "Unauthorized" };
  }

  const { success, limit, reset, remaining } = await lightLimit.limit(
    `share:${session.user.id}`
  );

  if (!success) {
    const waitSeconds = Math.ceil((reset - Date.now()) / 1000);
    return {
      success: false,
      isShared: currentState,
      error: `Too many requests. Try again in ${waitSeconds} seconds.`,
    };
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
    return { 
      success: false, 
      isShared: currentState, 
      error: "Failed to update share status" 
    };
  }
}