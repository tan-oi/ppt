"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Minus, Plus } from "lucide-react";
import { useUIStore } from "@/lib/store/ui-store";
import { presetColors } from "@/lib/const";

export function ColorSelector() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const editor = editBuffer?.widgetData?.editor;
  const [selected, setSelected] = useState<string | null>("#fff");
  const [open, setOpen] = useState<boolean>(false);
  const [showMoreColors, setShowMoreColors] = useState(false);

  const displayedColors = showMoreColors
    ? presetColors
    : presetColors.slice(0, 9);

  const updateFontColor = () => {
    if (!editor) return;
    const attributes = editor.getAttributes("textStyle");
    if (attributes.color) {
      setSelected(attributes.color);
    } else {
      setSelected("#fff");
    }
  };
  useEffect(() => {
    if (!editor) return;

    updateFontColor();
    const updateHandler = () => {
      updateFontColor();
    };

    editor.on("selectionUpdate", updateHandler);
    editor.on("transaction", updateHandler);

    return () => {
      editor.off("selectionUpdate", updateHandler);
      editor.off("transaction", updateHandler);
    };
  }, [editor]);
  const handleColorChange = (c: string) => {
    setSelected(c);

    editor.commands.setColor(c);
  };

  if (!editor) return null;
  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger className="-mt-1" asChild>
            <PopoverTrigger className="shadow-none" asChild>
              <Button
                variant="outline"
                className="border-none bg-transparent flex justify-between"
              >
                {selected ? (
                  <>
                    <div
                      className="size-4 rounded-full"
                      style={{
                        background: selected,
                      }}
                    ></div>
                  </>
                ) : (
                  <></>
                )}

                <ChevronDownIcon
                  className="-me-1 opacity-60 "
                  size={16}
                  aria-hidden="true"
                />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Choose a color</TooltipContent>
        </Tooltip>
        <PopoverContent
          sideOffset={10}
          className="p-2 border-none bg-muted/70 backdrop-filter-xl rounded"
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-2" data-widget>
              {displayedColors.map((c) => (
                <button
                  widget-element="true"
                  key={c}
                  onClick={() => handleColorChange(c)}
                  className="h-4 w-4 rounded-full border-muted"
                  style={{ backgroundColor: c }}
                />
              ))}

              {!showMoreColors && (
                <button
                  onClick={() => setShowMoreColors(true)}
                  className="size-5 rounded-full hover:scale-110 transition-transform flex items-center justify-center"
                  title="Show more colors"
                >
                  <Plus className="size-3" />
                </button>
              )}
            </div>

            {showMoreColors && (
              <button
                onClick={() => setShowMoreColors(false)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 py-1"
              >
                <Minus className="size-3" />
                Show less
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}
