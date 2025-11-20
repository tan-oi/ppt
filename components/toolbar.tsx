"use client";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { WidgetOptions } from "./toolbar/widget-options";
import { useUIStore } from "@/lib/store/ui-store";
import { ToolbarRegistry } from "@/lib/registry/toolbar";

export function Toolbar() {
  const [mounted, setMounted] = useState(false);
  const toolbarOpen = useUIStore((s) => s.toolbarOpen);
  const selectedWidget = useUIStore((s) => s.selectedWidget);
  const isPresentationMode = useUIStore((s) => s.presentationMode === true);
  useEffect(() => setMounted(true), []);

  const ToolbarComponent = useMemo(() => {
    if (!selectedWidget) return null;
    const widgetType = selectedWidget.widgetType;

    //@ts-ignore
    return ToolbarRegistry[widgetType]?.component || null;
  }, [selectedWidget]);

  if (isPresentationMode) return null;
  if (!mounted || !toolbarOpen || !selectedWidget?.data?.position) return null;

  const { position } = selectedWidget.data;
  const toolbarHeight = 40;
  const toolbarOffset = 20;

  const toolbarStyle = {
    position: "fixed" as const,
    left: `${position.centerX}px`,
    top: `${position.widgetY - toolbarHeight - toolbarOffset}px`,
    transform: "translateX(-50%)",
    zIndex: 1000,
  };

  return createPortal(
    <div className="pointer-events-none" style={toolbarStyle}>
      <div className="pointer-events-auto rounded" data-toolbar>
        <div className="bg-zinc-900 backdrop-blur-lg rounded-xl transition-all shadow-md duration-300">
          <div className="flex items-center gap-2 text-foreground p-1">
            {ToolbarComponent && <ToolbarComponent />}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />
            <WidgetOptions />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
