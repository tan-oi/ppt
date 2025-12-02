"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";

const options = [
  "How sleeping is important?",
  "A business deck for my company named Yozo",
  "How vaping is harmful?",
  "A personal presentation of a person named Charlie",
];

export function PromptInput() {
  const setUserInstruction = useGenerationStore((s) => s.setUserInstruction);
  const [option, setOption] = useState("");

  return (
    <div className="space-y-2">
      <div className="relative w-full px-6 py-6 space-y-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="inline-block mb-4 px-3 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/60">
              <p className="text-xs font-medium text-neutral-500 tracking-widest">
                Create
              </p>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-5xl font-semibold text-foreground mb-3 leading-tight text-balance">
              Craft prompt
            </h1>
            <p className="text-neutral-500 text-sm max-w-md leading-relaxed">
              Enter a prompt and get your presentation generated
            </p>
          </div>

          <Link href={"/create"}>
            <Button className="rounded-lg cursor-pointer">Back</Button>
          </Link>
        </div>

        <Separator className="w-full text-zinc-600" />
      </div>

      <div className="space-y-4 max-w-xl p-2 sm:p-4 sm:max-w-3xl mx-auto">
        <div className="space-y-2">
          <p className="text-xs text-foreground/60">Topic</p>
          <Input
            placeholder="Enter your prompt here"
            value={option}
            className="focus-visible:ring-none focus-visible:border-none text-primary rounded-xl py-4"
            onChange={(e) => {
              setOption(e.target.value);
              setUserInstruction(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center max-w-full gap-2 text-secondary">
          {options.map((item, i) => (
            <Button
              key={i}
              onClick={() => {
                setOption(item);
                setUserInstruction(item);
              }}
              className="text-xs sm:text-sm rounded-xl opacity-90 cursor-pointer"
              variant="default"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
