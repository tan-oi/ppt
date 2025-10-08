"use client";
import { useEffect } from "react";
import { useUIStore } from "@/lib/store/ui-store";

export function useWidgetDeselect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isToolbarOpen = useUIStore.getState().toolbarOpen;
      console.log("hey");

      if (
        target.closest("[data-widget]") ||
        target.closest("[data-toolbar]") ||
        target.closest("[widget-element]") ||
        target.closest("[data-drawer]") ||
        target.closest("[data-widget-interactive]")
      )
        return;
      if (isToolbarOpen) {
        useUIStore.getState().deselectWidgetAndAddData();
      }
    };

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const isToolbarOpen = useUIStore.getState().toolbarOpen;
      if (target instanceof Element && target.closest("[data-drawer]")) {
        return;
      }

      if (isToolbarOpen) {
        useUIStore.getState().deselectWidgetAndRemoveToolbar();
      }
    };

    document.addEventListener("pointerdown", handleClick, true);
    window.addEventListener("scroll", handleScroll, true);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("pointerdown", handleClick, true);
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);
}

//scroll works as well.
