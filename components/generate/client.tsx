"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { PresentationOptions } from "./options";
import { PromptInput } from "./prompt";
import { Text } from "./text";
import { UrlInput } from "./url";
import { OutlineViewer } from "./outline-viewer";
import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { outlineSchema } from "@/app/api/outline/route";
import { z } from "zod";
import { nanoid } from "nanoid";

const COMPONENTS: Record<"text" | "prompt" | "link", React.FC<any>> = {
  text: Text,
  prompt: PromptInput,
  link: UrlInput,
};

const apiResponseSchema = z.object({
  slidesOutline: z.array(outlineSchema),
});

export function GenerateClient({
  type,
  ...props
}: {
  type: "text" | "prompt" | "link";
  [key: string]: any;
}) {
  const setGenerateType = useGenerationStore((s) => s.setGenerateType);
  const setResult = useGenerationStore((s) => s.setResult);
  const setId = useGenerationStore((s) => s.setId);
  const [screen, setScreen] = useState<"form" | "result">("form");

  useEffect(() => {
    setGenerateType(type);
  }, [type]);

  const { object, submit, isLoading } = useObject({
    api: "/api/outline",
    schema: apiResponseSchema,
    onFinish: (event) => {
      console.log(event.object);
      if (event.object?.slidesOutline) {
        setResult(event.object.slidesOutline);

        //WIP -> make db call to like persist outline
        const id = `ai-${nanoid()}`;

        window.history.replaceState(
          null,
          "",
          `/create/generate/${id}?type=${type}`
        );

        setId(id);
      }
    },
  });

  const Component = COMPONENTS[type];

  const handleClick = () => {
    const instructions = useGenerationStore.getState().userInstruction;
    const slidesCount = useGenerationStore.getState().slidesCount;
    const tone = useGenerationStore.getState().tone;
    let style;

    if (type === "text") {
      style = useGenerationStore.getState().writeStyle;
    }

    if (!instructions || !slidesCount) {
      alert("Please provide instructions and slides count");
      return;
    }

    setScreen("result");

    submit({
      instructions,
      slidesNo: slidesCount,
      type,
      style,
      tone,
      messages: [],
    });
  };

  if (screen === "result") {
    return <OutlineViewer />;
  }

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Component {...props} />
      <PresentationOptions type={type} handleClick={handleClick} />
    </div>
  );
}
