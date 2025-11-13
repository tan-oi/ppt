import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Palette, Check } from "lucide-react";

import { themes } from "@/lib/config/theme";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";

export function ThemeSelector() {
  const theme = usePresentationStore((s) => s.theme);
  const setTheme = usePresentationStore((s) => s.setTheme);
  const currentSlide = usePresentationStore((s) => s.currentSlide);
  const slides = usePresentationStore((s) => s.slides);
  const [scope, setScope] = useState<"current" | "all">("all");
  const [isOpen, setIsOpen] = useState(false);

  const currentSlideData = slides?.find((s: any) => s.id === currentSlide);
  const currentSlideTheme = currentSlideData?.theme || theme;

  const handleThemeSelect = (selectedTheme: (typeof themes)[0]) => {
    if (scope === "all") {
      setTheme(selectedTheme.slug);
    } else {
      usePresentationStore
        .getState()
        .updateSlideTheme(currentSlide as string, selectedTheme.slug);
    }
  };

  const iconVariant = {
    idle: { rotate: 0 },
    hover: {
      rotate: 180,
      scale: 1.1,
      transition: { duration: 0.15 },
    },
  };

  return (
    <div className="">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.button
            variants={{
              idle: {},
              hover: { scale: 1.02 },
            }}
            initial="idle"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors hover:font-semibold"
          >
            <motion.div variants={iconVariant}>
              <Palette size={18} className="text-zinc-400" />
            </motion.div>
            <span className="text-sm text-zinc-300">Theme</span>
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={16}
          className="h-108 w-72 overflow-y-scroll p-4 border-none bg-zinc-900/95 backdrop-blur-md rounded-xl"
        >
          <div className="mb-3">
            <div className="w-full flex items-center justify-between gap-4 relative">
              <div
                className={cn(
                  "absolute w-[calc(50%-8px)] bg-zinc-500/30 h-full transition-transform duration-200 rounded",
                  {
                    "translate-x-0": scope === "current",
                    "translate-x-[calc(100%+16px)]": scope === "all",
                  }
                )}
              ></div>
              <Button
                className={cn(
                  "flex-1 text-sm bg-transparent border-px rounded border-zinc-800 shadow-none hover:text-zinc-300 relative z-10",
                  {
                    "text-white": scope === "current",
                  }
                )}
                variant={"outline"}
                onClick={() => setScope("current")}
              >
                Current
              </Button>
              <Button
                className={cn(
                  "flex-1 text-sm bg-transparent border border-zinc-800 rounded shadow-none relative z-10",
                  {
                    "text-white": scope === "all",
                  }
                )}
                variant={"outline"}
                onClick={() => setScope("all")}
              >
                All slides
              </Button>
            </div>
          </div>

          <DropdownMenuSeparator className="mb-2" />
          <div className="space-y-2">
            {themes.map((themeOption, index) => {
              const isSelected =
                scope === "all"
                  ? theme === themeOption.slug
                  : currentSlideTheme === themeOption.slug;

              return (
                <motion.div
                  key={themeOption.slug}
                  variants={{
                    hidden: {
                      x: -8,
                      opacity: 0,
                      scale: 0.95,
                    },
                    visible: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <DropdownMenuItem
                    onSelect={() => handleThemeSelect(themeOption)}
                  >
                    <Button
                      variant={"outline"}
                      size={"lg"}
                      className={cn(
                        "border-none group hover:bg-zinc-500/20 hover:shadow-sm bg-transparent px-0 shadow-none h-full w-full relative",
                        {
                          "bg-zinc-500/20": isSelected,
                        }
                      )}
                    >
                      <div className="w-full flex items-center justify-start h-full gap-4 p-1.5">
                        <div
                          className="w-4 h-10 flex items-center flex-1 justify-center"
                          style={{
                            background: themeOption.backgroundColor,
                          }}
                        >
                          <p
                            className="center text-xs"
                            style={{
                              color: themeOption.accentColor,
                            }}
                          >
                            hola!
                          </p>
                        </div>

                        <p className="flex-2 text-start text-sm font-mono text-zinc-300 group-hover:text-gray-50">
                          {themeOption.name}
                        </p>

                        {isSelected && (
                          <Check
                            size={16}
                            className="text-green-400 ml-auto absolute right-2"
                          />
                        )}
                      </div>
                    </Button>
                  </DropdownMenuItem>
                </motion.div>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
