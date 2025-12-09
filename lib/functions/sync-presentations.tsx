"use client";

import { getAllLocalPresentations, markPresentationAsSynced } from "@/lib/local-db";
import { LocalPresentation } from "@/lib/local-db";
import { Slide } from "@/lib/store/presentation-store";

interface CloudPresentationData {
  topic: string;
  theme: string;
  isModified: boolean;
  slides: Array<{
    id: string;
    theme: string;
    slideNumber: number;
    heading: string;
    widgets: Array<{
      id: string;
      widgetType: string;
      data: any;
      position: any;
    }>;
  }>;
}

function convertLocalToCloudFormat(
  local: LocalPresentation
): CloudPresentationData {
  const slides = local.slides.map((slide: Slide) => ({
    id: slide.id,
    theme: slide.theme,
    slideNumber: slide.slideNumber,
    heading: slide.heading,
    widgets: Object.values(slide.widgets).map((widget) => ({
      id: widget.id,
      widgetType: widget.widgetType,
      data: widget.data,
      position: widget.position,
    })),
  }));

  return {
    topic: local.title,
    theme: local.theme,
    isModified: true,
    slides,
  };
}

export async function syncLocalPresentationToCloud(
  localPresentation: LocalPresentation
): Promise<{ success: boolean; cloudId?: string; error?: string }> {
  try {
    const cloudData = convertLocalToCloudFormat(localPresentation);

    // Create or update presentation in cloud
    const response = await fetch(`/api/presentation/${localPresentation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cloudData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to sync presentation",
      };
    }

    // Mark as synced in local DB
    await markPresentationAsSynced(localPresentation.id);

    return {
      success: true,
      cloudId: localPresentation.id,
    };
  } catch (error) {
    console.error("Error syncing presentation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function syncAllLocalPresentations(): Promise<{
  success: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}> {
  const localPresentations = await getAllLocalPresentations();
  const unsynced = localPresentations.filter((p) => !p.syncedToCloud);

  let success = 0;
  let failed = 0;
  const errors: Array<{ id: string; error: string }> = [];

  for (const presentation of unsynced) {
    const result = await syncLocalPresentationToCloud(presentation);
    if (result.success) {
      success++;
    } else {
      failed++;
      errors.push({
        id: presentation.id,
        error: result.error || "Unknown error",
      });
    }
  }

  return { success, failed, errors };
}

