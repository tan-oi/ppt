import { useCallback, useState } from "react";
import { usePresentationStore } from "../store/presentation-store";
import { WidgetRegistry } from "../registry/widget";
import { WidgetMetadata } from "../core/widget-metadata";

export function useSlideDragDrop(slideScale: number) {
  const [activeElement, setActiveElement] = useState<any>(null);

  const handleDragStart = useCallback((event: any) => {
    setActiveElement(event.active.data.current);
  }, []);

  const handleDragEnd = useCallback(
    (event: any) => {
      setActiveElement(null);
      const { active, over, delta, activatorEvent } = event;

      if (!over || !activatorEvent) return;

      const slideContainer = document.getElementById(String(over.id));
      if (!slideContainer) return;

      const activeRect = active?.rect?.current?.translated;

      const finalScreenX = activeRect
        ? activeRect.left
        : activatorEvent.clientX + delta.x;
      const finalScreenY = activeRect
        ? activeRect.top
        : activatorEvent.clientY + delta.y;

      const presentationContainer = slideContainer.querySelector(
        ".slide-presentation-content"
      );
      const referenceRect = presentationContainer
        ? presentationContainer.getBoundingClientRect()
        : slideContainer.getBoundingClientRect();

      const relativeX = finalScreenX - referenceRect.left;
      const relativeY = finalScreenY - referenceRect.top;

      const actualX = relativeX / slideScale;
      const actualY = relativeY / slideScale;

      const slug = active?.data?.current?.slug;
      const slideId = String(over?.id);
      type WidgetKey = keyof typeof WidgetMetadata;

      const data = WidgetMetadata[slug as WidgetKey].defaultData;

      usePresentationStore
        .getState()
        .addWidget(slideId, slug, { x: actualX, y: actualY }, data);
      requestAnimationFrame(() => setActiveElement(null));
    },
    [slideScale]
  );

  return { activeElement, handleDragStart, handleDragEnd };
}
