"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deletePresentation(presentationId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
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

    revalidatePath("/library");

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Failed to delete presentation" };
  }
}
