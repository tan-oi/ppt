"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { LucideIcon, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { presetColors } from "@/lib/const";

interface BaseColorInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
}

export function BaseColorInput({
  label,
  value,
  onChange,
  icon: Icon,
}: BaseColorInputProps) {
  const [open, setOpen] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);

  const handlePresetClick = (color: string) => {
    onChange(color);
    setOpen(false);
  };

  const displayedColors = showMoreColors
    ? presetColors
    : presetColors.slice(0, 9);

  return (
    <div className="space-y-1">
      {label && <Label className="text-xs">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-8 px-2 justify-start gap-2 bg-muted/50 border-none"
          >
            {Icon && <Icon className="w-3.5 h-3.5 opacity-60" />}
            <div
              className="w-4 h-4 rounded-full border border-muted"
              style={{ backgroundColor: value }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 border-none bg-muted/70 backdrop-blur-xl rounded">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap" data-widget>
              {displayedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handlePresetClick(color)}
                  className="size-5 rounded-full border-2 border-muted hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
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
    </div>
  );
}
