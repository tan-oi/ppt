import { Layers, MoreHorizontal, Palette, Play, Plus } from "lucide-react";
import { ThemeSelector } from "./theme-selector";
import { InsertElements } from "./insert-elements";
import { SlideManager } from "./slide-manager";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";

export function DockBase() {
  return (
    <div className="font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-zinc-900/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl px-1.5 py-1.5 flex items-center gap-1">
        <ThemeSelector />

        <InsertElements />

        <SlideManager />

        <button className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors">
          <Play size={18} className="text-zinc-400" />
          <span className="text-sm text-zinc-300">Present</span>
        </button>
      </div>
    </div>
  );
}
