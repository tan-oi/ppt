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
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";
import { ChevronDownIcon } from "lucide-react";
import { useUIStore } from "@/lib/store/ui-store";

export function AlignSelector() {
  const [align, setAlign] = useState<any>(<TextAlignLeftIcon />);
  const [open, setOpen] = useState(false);
  const editBuffer = useUIStore((s) => s.editBuffer);
  const editor = editBuffer?.widgetData?.editor;
  const alignmentOptions = [
    { label: "Left", icon: <TextAlignLeftIcon size={16} />, value: "left" },
    { label: "Right", icon: <TextAlignRightIcon size={16} />, value: "right" },
    {
      label: "Center",
      icon: <TextAlignCenterIcon size={16} />,
      value: "center",
    },
    {
      label: "Justify",
      icon: <TextAlignJustifyIcon size={16} />,
      value: "justify",
    },
  ];

  const closeDropdown = () => setOpen(false);
  const handleAlignChange = (option: any) => {
    setAlign(option.icon);

    editor.commands.setTextAlign(option.value);
  };
  if (!editor) return null;
  return (
    <TooltipProvider>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className="shadow-none" asChild>
              <Button
                variant="outline"
                className="border-none bg-transparent flex justify-between"
              >
                {align}
                <ChevronDownIcon
                  className="-me-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose alignment</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent
          sideOffset={10}
          className="w-36 max-w-[230px] min-w-[120px] bg-popover border-none backdrop-filter-xl"
          widget-element="true"
        >
          <DropdownMenuGroup className="">
            {alignmentOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                onClick={() => {
                  handleAlignChange(option);
                }}
                className={`cursor-pointer flex items-center gap-2 ${
                  editor.isActive({
                    textAlign: option.value,
                  })
                    ? "bg-accent"
                    : ""
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
