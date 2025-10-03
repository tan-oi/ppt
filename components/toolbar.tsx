"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FontSizeDropDown } from "./toolbar/font-selector";
import { Separator } from "./ui/separator";
import { ColorSelector } from "./toolbar/color-selector";
import { AlignSelector } from "./toolbar/align-selector";
import { TextFormatting } from "./toolbar/text-formatting";
import { WidgetOptions } from "./toolbar/widget-options";
import { useUIStore } from "@/lib/store/ui-store";
import { Button } from "./ui/button";

export function Toolbar() {
  const [mounted, setMounted] = useState(false);
  const toolbarOpen = useUIStore((s) => s.toolbarOpen);
  const selectedWidget = useUIStore((s) => s.selectedWidget);
  const editBuffer = useUIStore((s) => s.editBuffer);
  console.log(selectedWidget);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !toolbarOpen || !selectedWidget?.data.position) {
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

  return createPortal(
    <div className="pointer-events-none" style={toolbarStyle}>
      <div className="pointer-events-auto h-2/3 rounded" data-toolbar>
        <div className="p-1 mb-2 bg-muted/60 backdrop-blur-lg rounded-xl transition-all shadow-md duration-300">
          <div className="flex items-center gap-2   text-foreground">
            {selectedWidget.type === "drawer" ? (
              <>
                <Button
                variant={"ghost"}
                  className="cursor-pointer"
                  onClick={() => useUIStore.getState().setDrawer()}
                >
                  Edit Chart
                </Button>
              </>
            ) : (
              <>
                <FontSizeDropDown />
                <ColorSelector />
                <AlignSelector />
                <TextFormatting />
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
