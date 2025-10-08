"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { LucideIcon, Plus, X } from "lucide-react";
import { useState } from "react";

interface BaseColorInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
}

const presetColors = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#000000",
  "#ffffff",
];

export function BaseColorInput({
  label,
  value,
  onChange,
  icon: Icon,
}: BaseColorInputProps) {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handlePresetClick = (color: string) => {
    onChange(color);
    setCustomColor(color);
    setOpen(false);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    onChange(color);
  };

  const toggleCustomInput = () => {
    setShowCustomInput(!showCustomInput);
  };

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
            <div className="flex gap-2" data-widget>
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handlePresetClick(color)}
                  className="size-5 rounded-full border-2 border-muted hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}

              <button
                onClick={toggleCustomInput}
                className="size-5 rounded-full border-2 border-muted hover:scale-110 transition-transform bg-background flex items-center justify-center"
              >
                {showCustomInput ? (
                  <X className="size-3" />
                ) : (
                  <Plus className="size-3" />
                )}
              </button>
            </div>

            {showCustomInput && (
              <div className="pt-1">
                <Input
                  type="color"
                  value={customColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-8 h-8 p-0.5 cursor-pointer"
                />

              
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
