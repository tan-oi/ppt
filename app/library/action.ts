"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { lightLimit } from "@/lib/rate-limit";
import { incrementUserCache, updateUserCache } from "@/lib/functions/userCache";

export async function deletePresentation(presentationId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }
    const id = session?.user?.id;
    const { success, limit, reset, remaining, pending } =
      await lightLimit.limit(`delete:${id}`);

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

    const presentation = await prisma.presentation.findUnique({
      where: { id: presentationId },
      select: { userId: true },
    });

    if (!presentation) {
      return { success: false, error: "Presentation not found" };
    }

    if (presentation.userId !== session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.presentation.delete({
      where: { id: presentationId },
    });

    await incrementUserCache(id, "pptCount", -1);

    revalidatePath("/library");

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Failed to delete presentation" };
  }
}
