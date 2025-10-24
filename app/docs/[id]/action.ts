"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleSharePresentation(
  presentationId: string,
  currentState: boolean
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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