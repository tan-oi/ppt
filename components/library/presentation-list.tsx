"use client";

import { useEffect, useState, useOptimistic } from "react";
import { PresentationCard } from "./presentation-view-card";
import { loadUnifiedPresentations } from "@/lib/functions/presentation-loader";
import { AboutPresentation, PresentationListProps } from "@/lib/types";

export function PresentationList({
  initialCloudPresentations = [],
  userId,
}: PresentationListProps) {
  const isLocal = !userId;
  const [presentations, setPresentations] = useState<AboutPresentation[]>([]);
  const [loading, setLoading] = useState(true);

  const [optimisticPresentations, removeOptimisticPresentation] = useOptimistic(
    presentations,
    (state, deletedId: string) => state.filter((p) => p.id !== deletedId)
  );

  useEffect(() => {
    if (userId) {
      setPresentations(initialCloudPresentations);
      setLoading(false);
    } else {
      const loadGuestData = async () => {
        setLoading(true);
        try {
          const unified = await loadUnifiedPresentations();
          const mapped: AboutPresentation[] = unified.map((p) => ({
            id: p.id,
            topic: p.topic,
            updatedAt: p.updatedAt,
            isShared: p.isShared,
            _count: p._count || { slides: 0 },
          }));
          setPresentations(mapped);
        } catch (error) {
          console.error("Error loading presentations:", error);
        } finally {
          setLoading(false);
        }
      };

      loadGuestData();
    }
  }, [userId, initialCloudPresentations]);

  const handleOptimisticDelete = (id: string) => {
    removeOptimisticPresentation(id);
    if (isLocal) {
      setPresentations((prev) => prev.filter((p) => p.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
        <div className="col-span-3 flex items-center justify-center py-12 text-neutral-500">
          <p className="text-sm">Loading presentations...</p>
        </div>
      </div>
    );
  }

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
            onOptimisticDelete={handleOptimisticDelete}
            isLocal={isLocal}
          />
        ))
      )}
    </div>
  );
}
