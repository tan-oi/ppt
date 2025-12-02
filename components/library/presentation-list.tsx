"use client";

import { useOptimistic } from "react";
import { PresentationCard } from "./presentation-view-card";

interface Presentation {
  id: string;
  topic: string;
  outlineId: string | null;
  updatedAt: Date;
  isShared: boolean;
  _count: {
    slides: number;
  };
}

interface PresentationListProps {
  initialPresentations: Presentation[];
}

export function PresentationList({
  initialPresentations,
}: PresentationListProps) {
  const [optimisticPresentations, removeOptimisticPresentation] = useOptimistic(
    initialPresentations,
    (state, deletedId: string) => state.filter((p) => p.id !== deletedId)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
      {optimisticPresentations.length === 0 ? (
        <div className="col-span-3 flex flex-col items-center justify-center py-12 text-neutral-500">
          <p className="text-lg">No presentations yet</p>
          <p className="text-sm">Create your first deck to get started</p>
        </div>
      ) : (
        optimisticPresentations.map((item, i) => (
          <PresentationCard
            key={item.id}
            item={item}
            index={i}
            onOptimisticDelete={removeOptimisticPresentation}
          />
        ))
      )}
    </div>
  );
}
