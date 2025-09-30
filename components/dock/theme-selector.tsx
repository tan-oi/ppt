import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

import { Separator } from "../ui/separator";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const themes = [
  {
    id: "modern",
    name: "Modern",
    bgColor: "#ffffff",
    accentColor: "#3b82f6",
    fontFamily: "Inter, sans-serif",
  },
  {
    id: "dark",
    name: "Dark Mode",
    bgColor: "#1e293b",
    accentColor: "#06b6d4",
    fontFamily: "Roboto, sans-serif",
  },
  {
    id: "nature",
    name: "Nature",
    bgColor: "#f0fdf4",
    accentColor: "#22c55e",
    fontFamily: "Georgia, serif",
  },
  {
    id: "sunset",
    name: "Sunset",
    bgColor: "#fff7ed",
    accentColor: "#f97316",
    fontFamily: "Lora, serif",
  },
  {
    id: "corporate",
    name: "Corporate",
    bgColor: "#f8fafc",
    accentColor: "#475569",
    fontFamily: "Arial, sans-serif",
  },
  {
    id: "vibrant",
    name: "Vibrant",
    bgColor: "#fef3c7",
    accentColor: "#ec4899",
    fontFamily: "Poppins, sans-serif",
  },
];

export function ThemeSelector() {
  const [scope, setScope] = useState("current");
  const [globalTheme, setGlobalTheme] = useState("modern");
  const [currentSlideTheme, setCurrentSlideTheme] = useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    if (scope === "all") {
      setGlobalTheme(themeId);
      setCurrentSlideTheme(null);
    } else {
      setCurrentSlideTheme(themeId);
    }
  };

  const getAppliedLabel = (themeId: string) => {
    if (currentSlideTheme === themeId) {
      return "Applied Locally";
    }
    if (globalTheme === themeId && !currentSlideTheme) {
      return "Applied Globally";
    }
    if (globalTheme === themeId) {
      return "Global Default";
    }
    return null;
  };

  const isThemeActive = (themeId: string) => {
    return (
      (scope === "current" && currentSlideTheme === themeId) ||
      (scope === "all" && globalTheme === themeId) ||
      (scope === "current" && !currentSlideTheme && globalTheme === themeId)
    );
  };

  return (
    <div className="">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors">
            <Palette size={18} className="text-zinc-400" />
            <span className="text-sm text-zinc-300">Theme</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={16}
          className="h-108 w-72 overflow-y-hidden p-4 border-none bg-zinc-900/60 backdrop-blur-md rounded-xl"
        >
          <div className="mb-3">
            <div className="w-full flex items-center justify-between gap-4 relative">
              <div
                className="absolute
                translate-x-[calc(100%+16px)]
              w-[calc(50%-8px)] bg-zinc-500/30  h-full"
              ></div>
              <Button
                className="flex-1 text-sm bg-transparent 
                border-px rounded border-zinc-800
                shadow-none hover:text-zinc-300"
                variant={"outline"}
              >
                Current
              </Button>
              <Button
                className="flex-1 text-sm bg-transparent border-px border-zinc-800 rounded shadow-none"
                variant={"outline"}
              >
                All slides
              </Button>
            </div>
          </div>

          <DropdownMenuSeparator className="mb-2" />
          <div className="space-y-2">
            {themes.map((theme) => {
              const appliedLabel = getAppliedLabel(theme.id);
              const isActive = isThemeActive(theme.id);

              return (
                <DropdownMenuItem>
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="border-none 
                  group
                  hover:bg-zinc-500/20
                  hover:shadow-sm
                  bg-transparent
                  px-0 shadow-none h-full w-full"
                  >
                    <div className="w-full flex items-center justify-start h-full gap-4 p-1.5">
                      <div
                        className="w-4 h-10
                    flex items-center
                  
                    flex-1 justify-center"
                        style={{
                          background: theme.bgColor,
                        }}
                      >
                        <p
                          className="center text-xs"
                          style={{
                            color: theme.accentColor,
                          }}
                        >
                          hola!
                        </p>
                      </div>

                      <p className="flex-2 text-start text-sm font-mono text-zinc-300 group-hover:text-gray-50">
                        {theme.name}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
