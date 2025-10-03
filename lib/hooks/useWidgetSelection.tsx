'use client';
import { useRef } from 'react';
import { useUIStore } from '@/lib/store/ui-store';

export function useWidgetSelection(widgetId: string) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const updateSelectWidget = useUIStore((s) => s.updateSelectWidget);

  const handleClick = (additionalData?: any) => {
    if (!widgetRef.current) return;

    const rect = widgetRef.current.getBoundingClientRect();
    const position = {
      widgetX: rect.left,
      widgetY: rect.top,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
    };

    updateSelectWidget({
      slideIndex: 1,
      id: widgetId,
      data: {
        position,
        ...additionalData,
      },
      type: additionalData?.type ?? "editoral",
    });
  };

  return { widgetRef, handleClick };
}