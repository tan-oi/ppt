import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "../ui/button";
import {
  BoldIcon,
  Italic,
  MoreHorizontal,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useUIStore } from "@/lib/store/ui-store";

function isMacOS() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

export function TextFormatting() {
  const modKey = isMacOS() ? "⌘" : "Ctrl";
  const editBuffer = useUIStore((s) => s.editBuffer);
  const editor = editBuffer?.widgetData?.editor;
  const moreOptions = [
    {
      label: "Bold",
      keyboard: "B",
      icon: <BoldIcon size={14} />,
      value: "toggleBold",
    },
    {
      label: "Underline",
      keyboard: "U",
      icon: <Underline size={14} />,
      value: "toggleUnderline",
    },
    {
      label: "Strikethrough",
      keyboard: "S",
      icon: <Strikethrough size={14} />,
      value: "toggleStrike",
    },
    {
      label: "Italic",
      keyboard: "I",
      icon: <Italic size={14} />,
      value: "toggleItalic",
    },
  ];

  const handleFormat = (value: string) => {
    if (!editor) return;

    editor.chain().focus()[value]().run();
  };

  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger className="-mt-1" asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="px-4 border-none bg-card/80 flex justify-between"
              >
                <MoreHorizontal
                  className="-me-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>More options</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent
          widget-element="true"
          className="my-2 w-48 max-w-[230px] min-w-[120px] border-none bg-popover/95 backdrop-filter-xl"
        >
          <DropdownMenuGroup className="flex flex-col gap-1">
            {moreOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={`cursor-pointer flex items-center gap-2 ${
                  editor.isActive(
                    option.value.replace("toggle", "").toLowerCase()
                  )
                    ? "bg-accent"
                    : ""
                }`}
                onClick={() => handleFormat(option.value)}
              >
                {option.icon}
                <span>{option.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {modKey}+{option.keyboard}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
