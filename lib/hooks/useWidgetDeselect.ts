"use client"
import { useEffect } from "react";
import { useUIStore } from "@/lib/store/ui-store";

export function useWidgetDeselect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("[data-widget]") ||
        target.closest("[data-toolbar]") ||
        target.closest("[widget-element]") ||
        target.closest("[data-drawer]")
      )
        return;
      useUIStore.getState().deselectWidget();
    };

    document.addEventListener("pointerdown", handleClick, true);
    return () =>
      document.removeEventListener("pointerdown", handleClick, true);
  }, []);
}
