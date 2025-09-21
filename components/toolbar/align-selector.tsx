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
  const { editor } = editBuffer.data;
  const alignmentOptions = [
    { label: "Left", icon: <TextAlignLeftIcon />, value: "left" },
    { label: "Right", icon: <TextAlignRightIcon />, value: "right" },
    { label: "Center", icon: <TextAlignCenterIcon />, value: "center" },
    { label: "Justify", icon: <TextAlignJustifyIcon />, value: "justify" },
  ];

  const closeDropdown = () => setOpen(false);
  const handleAlignChange = (option: any) => {
    setAlign(option.icon);
   
    editor.commands.setTextAlign(option.value);
  };
  return (
    <TooltipProvider>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-none bg-muted/50 flex justify-between"
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
          className="my-2 p-1 w-36 max-w-[230px] min-w-[120px] border-none bg-muted/70 backdrop-filter-xl"
          widget-element="true"
        >
          <DropdownMenuGroup>
            {alignmentOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                onClick={() => {
                  handleAlignChange(option);
                }}
                className="cursor-pointer flex items-center gap-2"
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
