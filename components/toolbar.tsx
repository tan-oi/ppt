"use client";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { FontSizeDropDown } from "./toolbar/font-selector";
import { Separator } from "./ui/separator";
import { ColorSelector } from "./toolbar/color-selector";
import { AlignSelector } from "./toolbar/align-selector";
import { TextFormatting } from "./toolbar/text-formatting";
import { WidgetOptions } from "./toolbar/widget-options";
import { useUIStore } from "@/lib/store/ui-store";
import { Button } from "./ui/button";
import { DividerToolbar } from "./widgets/toolbars/divider-toolbar";
import { BadgeToolbar } from "./widgets/toolbars/badge-toolbar";
import { LinkToolbar } from "./widgets/toolbars/link-toolbar";

export function Toolbar() {
  const [mounted, setMounted] = useState(false);
  const toolbarOpen = useUIStore((s) => s.toolbarOpen);
  const selectedWidget = useUIStore((s) => s.selectedWidget);
  const editBuffer = useUIStore((s) => s.editBuffer);
  console.log(selectedWidget);
  console.log(editBuffer);
  useEffect(() => {
    setMounted(true);
  }, []);

  const normalToolbar = useMemo(() => {
    if (!selectedWidget) return null;
    const widgetType = selectedWidget.widgetType;

    const all = ["text", "feature", "list", "quote", "stat"];

    return all.includes(widgetType);
  }, [selectedWidget]);

  const returnToolbarType = useMemo(() => {
    if (!selectedWidget) return null;

    const widgetType = selectedWidget.widgetType;

    const textFormattedWidgets = ["text", "feature", "list", "quote", "stat"];

    const chartWidget = ["chart"];
    const imageWidget = ["image"];

    const decorationWidgets = ["badge", "link", "divider", "progress"];

    if (textFormattedWidgets.includes(widgetType)) return "normal";
    else if (decorationWidgets.includes(widgetType)) return "decoration";
    else if (chartWidget.includes(widgetType)) return "chart";
    else return "image";
  }, [selectedWidget]);

  if (
    !mounted ||
    !toolbarOpen ||
    !selectedWidget ||
    !selectedWidget?.data.position
  ) {
    return null;
  }

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

  //have a toolabr registry inplace of these
  return createPortal(
    <div className="pointer-events-none" style={toolbarStyle}>
      <div className="pointer-events-auto h-2/3 rounded" data-toolbar>
        <div className="p-1 mb-2 bg-muted/60 backdrop-blur-lg rounded-xl transition-all shadow-md duration-300">
          <div className="flex items-center gap-2   text-foreground">
    


            {returnToolbarType === "normal" && (
              <>
                <FontSizeDropDown />
                <ColorSelector />
                <AlignSelector />
                <TextFormatting />
              </>
            )}
            
            {returnToolbarType === "decoration" && (
              <>
                {selectedWidget.widgetType === "badge" && <BadgeToolbar />}
                {selectedWidget.widgetType === "link" && <LinkToolbar />}
                {selectedWidget.widgetType === "divider" && <DividerToolbar />}
              </>
            )}
            <WidgetOptions />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
