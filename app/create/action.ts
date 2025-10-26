"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

export async function createBlankPresentation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  const id = nanoid(10);
  const slideId = nanoid(8);
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

    return { success: true, id };
  } catch (err) {
    console.error("Error creating presentation:", err);
    return { success: false, error: "Failed to create presentation" };
  }
}
