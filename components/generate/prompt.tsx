"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

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
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-primary text-xl">
          Craft a prompt or write any topic
        </h1>
        <p className="text-muted-foreground text-sm">
          Create a deck by just stating a topic
        </p>
      </div>

      <div className="space-y-4">
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
              className="rounded-xl opacity-90 cursor-pointer"
              variant="default"
              size="sm"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
