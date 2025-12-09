"use client";

import { getAllLocalPresentations } from "@/lib/local-db";


export interface UnifiedPresentation {
  id: string;
  // title: string;
  topic: string;
  updatedAt: Date;
  createdAt: Date;
  slideCount?: number;
  isShared?: boolean;
  storageType: "local" | "cloud";
  syncedToCloud: boolean;
  localId?: string;
  cloudId?: string;
  _count?: {
    slides: number;
  };
}

export async function loadUnifiedPresentations(): Promise<
  UnifiedPresentation[]
> {
  const presentations: UnifiedPresentation[] = [];

  const localPresentations = await getAllLocalPresentations();
  localPresentations.forEach((presentation) => {
    const unified: UnifiedPresentation = {
      id: presentation.id,
      localId: presentation.id,
      // title: presentation.title,
      topic: presentation.title,
      updatedAt: presentation.updatedAt,
      createdAt: presentation.createdAt,
      _count: {
        slides: presentation.slides.length,
      },
      isShared: false,
      storageType: "local",
      syncedToCloud: presentation.syncedToCloud,
    };
    presentations.push(unified);
  });

  return presentations.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );
}
