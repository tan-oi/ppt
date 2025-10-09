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
import { ChevronDownIcon } from "lucide-react";
import { useUIStore } from "@/lib/store/ui-store";

const colors = [
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#a855f7",
  "#fff",
  "#000",
  "#f97316",
];

export function ColorSelector() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  const editor = editBuffer?.widgetData?.editor; 
  const [selected, setSelected] = useState<string | null>("#fff");
  const [open, setOpen] = useState<boolean>(false);

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

  if(!editor) return null;
  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger className="-mt-1" asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="border-none bg-muted/50 flex justify-between"
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
        <PopoverContent className="p-2 my-2 border-none bg-muted/70 backdrop-filter-xl rounded">
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                widget-element="true"
                key={c}
                onClick={() => handleColorChange(c)}
                className="h-4 w-4 rounded-full border-muted"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}
