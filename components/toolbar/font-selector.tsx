"use client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useUIStore } from "@/lib/store/ui-store";

export function FontSizeDropDown() {
  const [selectedValue, setSelectedValue] = useState<number>(16);
  const [selectedName, setSelectedName] = useState<string>("Medium");

  const editBuffer = useUIStore((s) => s.editBuffer);

  const editor = editBuffer?.widgetData?.editor;
  const fontSizeOptions = [
    { label: "Extra Small", value: 12 },
    { label: "Small", value: 14 },
    { label: "Medium", value: 16 },
    { label: "Large", value: 20 },
    { label: "Extra Large", value: 24 },
  ];

  const updateFontSizeUI = () => {
    if (!editor) return;

    const attributes = editor.getAttributes("textStyle");

    if (attributes.fontSize) {
      const size = parseInt(attributes.fontSize.replace("px", ""));
      setSelectedValue(size);
      const matchingOption = fontSizeOptions.find(
        (option) => option.value === size
      );
      setSelectedName(matchingOption ? matchingOption.label : `${size}px`);
    } else {
      setSelectedValue(16);
      setSelectedName("Medium");
    }
  };

  useEffect(() => {
    if (!editor) return;

    updateFontSizeUI();

    const updateHandler = () => {
      updateFontSizeUI();
    };

    editor.on("selectionUpdate", updateHandler);
    editor.on("transaction", updateHandler);

    return () => {
      editor.off("selectionUpdate", updateHandler);
      editor.off("transaction", updateHandler);
    };
  }, [editor]);

  const handleOptionSelect = (value: number, name: string) => {
    const { from, to } = editor.state.selection;

    if (from === to) {
      editor.chain().focus().selectAll().setFontSize(`${value}px`).run();
    } else {
      editor.chain().focus().setFontSize(`${value}px`).run();
    }
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    if (value && value > 0) {
      const { from, to } = editor.state.selection;

      if (from === to) {
        editor.chain().focus().selectAll().setFontSize(`${value}px`).run();
      } else {
        editor.chain().focus().setFontSize(`${value}px`).run();
      }
    }
  };

  if (!editor) return null;
  return (
    <>
      <TooltipProvider>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger className="-mt-1" asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-32 border-none bg-card/80 flex justify-between"
                >
                  <span className="">{selectedName}</span>
                  <ChevronDownIcon
                    className="-me-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose font size</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent
            widget-element="true"
            className="my-2 w-40 max-w-[230px] min-w-[120px] border-none bg-popover/95 backdrop-filter-xl"
          >
            <DropdownMenuGroup>
              {fontSizeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => {
                    handleOptionSelect(option.value, option.label);
                  }}
                  className={`cursor-pointer ${
                    selectedValue === option.value ? "bg-accent/70" : ""
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {option.value}px
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <Input
              type="number"
              min={"1"}
              max={"100"}
              value={selectedValue}
              onChange={handleInputChange}
              placeholder="Custom size"
              className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>
    </>
  );
}
