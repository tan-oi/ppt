import { useCallback, useState } from "react";
import { usePresentationStore } from "../store/presentation-store";
import { WidgetRegistry } from "../registry/widget";

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

      const containerRect = slideContainer.getBoundingClientRect();
      const finalScreenX = activatorEvent.clientX + delta.x;
      const finalScreenY = activatorEvent.clientY + delta.y;

      const relativeX = finalScreenX - containerRect.left;
      const relativeY = finalScreenY - containerRect.top;

      const actualX = relativeX / slideScale;
      const actualY = relativeY / slideScale;

      const slug = active?.data?.current?.slug;
      const slideId = String(over?.id);
      const data = WidgetRegistry[slug].defaultData;

      usePresentationStore
        .getState()
        .addWidget(slideId, slug, { x: actualX, y: actualY }, data);
      requestAnimationFrame(() => setActiveElement(null));
    },
    [slideScale]
  );

  return { activeElement, handleDragStart, handleDragEnd };
}
