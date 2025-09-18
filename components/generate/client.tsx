"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { PresentationOptions } from "./options";
import { PromptInput } from "./prompt";
import { Text } from "./text";
import { UrlInput } from "./url";
import { useEffect, useState } from "react";

const COMPONENTS: Record<"text" | "prompt" | "link", React.FC<any>> = {
  text: Text,
  prompt: PromptInput,
  link: UrlInput,
};

export function GenerateClient({
  type,
  ...props
}: {
  type: "text" | "prompt" | "link";
  [key: string]: any;
}) {
  const setGenerateType = useGenerationStore((s) => s.setGenerateType);
  const [screen, setScreen] = useState<"form"|"result">("form");

  useEffect(() => {
    setGenerateType(type);
  }, [type]);

  const Component = COMPONENTS[type];
  const handleClick = () => {
    const instructions = useGenerationStore.getState().userInstruction;
    const slidesCount = useGenerationStore.getState().slidesCount;
    
    if(!instructions || !slidesCount) {
        alert("dude nothig")
        return;
    };

    

    console.log(instructions)
    console.log(slidesCount)
  };
  return (
    <>
      <div className="flex flex-col gap-4 justify-center">
        <Component {...props} />
        <PresentationOptions type={type} handleClick={handleClick} />
      </div>
    </>
  );
}
