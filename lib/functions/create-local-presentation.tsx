"use client";

import { nanoid } from "nanoid";
import { savePresentationToLocal, LocalPresentation } from "@/lib/local-db";
import { Slide } from "@/lib/store/presentation-store";

export async function createBlankLocalPresentation(): Promise<{
  success: boolean;
  id?: string;
  error?: string;
}> {
  try {
    const id = `${nanoid(10)}_gm`;
    const slideId = nanoid(10);
    const widgetId = nanoid(8);

    const blankSlide: Slide = {
      id: slideId,
      slideNumber: 1,
      heading: "",
      widgets: {
        [widgetId]: {
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
      theme: "starter",
    };

    const presentation: LocalPresentation = {
      id,
      title: "Untitled Presentation",
      slides: [blankSlide],
      theme: "starter",
      createdAt: new Date(),
      updatedAt: new Date(),
      syncedToCloud: false,
    };

    await savePresentationToLocal(presentation);

    return { success: true, id };
  } catch (error) {
    console.error("Error creating local presentation:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create presentation",
    };
  }
}
