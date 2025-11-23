"use client";
import { useUIStore } from "@/lib/store/ui-store";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export function AuthButton({
  type,
  label,
}: {
  type: "small" | "medium" | "large";
  label: string;
}) {
  const toggleAuth = useUIStore((s) => s.toggleAuth);

  const authModalRender = () => {
    toggleAuth(true);
  };
  if (type === "large") {
    return (
      <Button
        onClick={authModalRender}
        className="group relative inline-flex items-center justify-center gap-2 px-10 py-6 text-base font-medium text-background bg-foreground rounded-full duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 active:scale-95 hover:rotate-3 hover:cursor-pointer transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] "
      >
        <span className="relative z-10 flex items-center gap-2">
          {label}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/60 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </Button>
    );
  } else if (type === "medium") {
    return (
      <Button
        onClick={authModalRender}
        className="font-semibold rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] whitespace-nowrap cursor-pointer"
        size={"lg"}
      >
        {label}
      </Button>
    );
  } else {
    return (
      <Button
        onClick={authModalRender}
        className="text-xs font-semibold rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] whitespace-nowrap cursor-pointer"
        size={"sm"}
      >
        {label}
      </Button>
    );
  }
}
