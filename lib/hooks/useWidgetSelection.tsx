"use client";
import { useRef } from "react";
import { useUIStore } from "@/lib/store/ui-store";

export function useWidgetSelection(widgetId: string, slideId: string) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);

  const handleClick = (additionalData?: any) => {
    const { isProcessing } = useUIStore.getState();
    const { selectedWidget } = useUIStore.getState();
    if (isProcessing) {
      console.log("⏳ Cannot switch widgets during processing");
      return;
    }

    if (selectedWidget?.id === widgetId) {
      console.log("Widget already selected, skipping position recalculation");
      return;
    }

    if (!widgetRef.current) return;

    const rect = widgetRef.current.getBoundingClientRect();
    const position = {
      widgetX: rect.left,
      widgetY: rect.top,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };

    const { widgetType, data, editor, ...rest } = additionalData || {};

    updateSelectWidget({
      slideId: slideId,
      id: widgetId,
      widgetType: widgetType,
      data: {
        position,
        editor,
        ...data,
        ...rest,
      },
    });
  };

  return { widgetRef, handleClick };
}
