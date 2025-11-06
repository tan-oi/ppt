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
import { ChevronDownIcon, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      <DropdownMenu onOpenChange={setIsOpen}>
        <Tooltip>
          <TooltipTrigger className="-mt-1" asChild>
            <DropdownMenuTrigger className="shadow-none" asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              >
                <Button
                  variant="outline"
                  className={`w-full border-none bg-transparent flex items-center justify-between ${className}`}
                >
                  <motion.span
                    key={displayName}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {displayName}
                  </motion.span>
                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                      scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <ChevronDownIcon
                      className="-me-1 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                  </motion.div>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>

        <AnimatePresence>
          {isOpen && (
            <DropdownMenuContent
              asChild
              forceMount
              sideOffset={10}
              widget-element="true"
              className="w-40 max-w-[230px] min-w-[120px] border-none bg-popover/95 backdrop-filter-xl overflow-hidden"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: -15,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: -10,
                  filter: "blur(2px)",
                  transition: { duration: 0.15 },
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <DropdownMenuGroup>
                  {options.map((option, index) => {
                    const isSelected = selectedValue === option.value;

                    return (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, x: -15, filter: "blur(2px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{
                          duration: 0.3,

                          delay: index * 0.04,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <DropdownMenuItem
                          onClick={() => handleOptionSelect(option.value)}
                          className={`cursor-pointer relative overflow-hidden ${
                            isSelected ? "bg-accent/70" : ""
                          }`}
                        >
                          <motion.span
                            className="text-white relative z-10 flex items-center gap-2"
                            animate={{
                              x: isSelected ? 2 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 180 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.34, 1.56, 0.64, 1],
                                  }}
                                >
                                  <Check size={14} className="text-green-400" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                            {option.label}
                          </motion.span>
                        </DropdownMenuItem>
                      </motion.div>
                    );
                  })}
                </DropdownMenuGroup>

                {showCustomInput && (
                  <>
                    <DropdownMenuSeparator />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.25,
                        delay: options.length * 0.04 + 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Input
                        type={inputType}
                        value={selectedValue}
                        onChange={handleInputChange}
                        placeholder={`Custom ${label.toLowerCase()}`}
                        className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />
                    </motion.div>
                  </>
                )}
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </TooltipProvider>
  );
}
