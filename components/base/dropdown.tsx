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
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DropdownOption {
  label: string;
  value: string | number;
}

interface BaseDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  tooltip?: string;
  showCustomInput?: boolean;
  inputType?: "text" | "number";
  className?: string;
}

export function BaseDropdown({
  label,
  options,
  value,
  onChange,
  tooltip = "Select an option",
  showCustomInput = false,
  inputType = "text",
  className = "",
}: BaseDropdownProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayName = selectedOption ? selectedOption.label : value;

  const handleOptionSelect = (optionValue: string | number) => {
    setSelectedValue(optionValue);
    onChange(optionValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue =
      inputType === "number" ? Number(e.target.value) : e.target.value;

    if (inputValue) {
      setSelectedValue(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger className="-mt-1" asChild>
            <DropdownMenuTrigger className="shadow-none" asChild>
              <Button
                variant="outline"
                className={`w-28 border-none bg-transparent flex justify-between ${className}`}
              >
                <span>{displayName}</span>
                <ChevronDownIcon
                  className="-me-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent
          sideOffset={10}
          widget-element="true"
          className="w-40 max-w-[230px] min-w-[120px] border-none bg-popover/95 backdrop-filter-xl"
        >
          <DropdownMenuGroup>
            {options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`cursor-pointer ${
                  selectedValue === option.value ? "bg-accent/70" : ""
                }`}
              >
                <span className="text-white">{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          {showCustomInput && (
            <>
              <DropdownMenuSeparator />
              <Input
                type={inputType}
                value={selectedValue}
                onChange={handleInputChange}
                placeholder={`Custom ${label.toLowerCase()}`}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
