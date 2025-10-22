"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { PresentationOptions } from "./options";
import { PromptInput } from "./prompt";
import { Text } from "./text";
import { UrlInput } from "./url";
import { OutlineViewer } from "./outline-viewer";
import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { outlineSchema } from "@/app/api/generate-outline/route";
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
    api: "/api/generate-outline",
    schema: apiResponseSchema,
    onFinish: async (event) => {
      if (!event.object?.slidesOutline) return;

      setResult(event.object.slidesOutline);

      const getId = nanoid(10);
      const id = `ai-${getId}`;
      setId(id);

      window.history.replaceState(
        null,
        "",
        `/create/generate/${id}?type=${type}`
      );

      const payload = {
        topic: useGenerationStore.getState().userInstruction,
        content: event.object.slidesOutline,
        id: getId,
      };

      try {
        const res = await fetch("/api/outline", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error("Failed to save outline:", await res.text());
        }
      } catch (err) {
        console.error("Network error while saving outline:", err);
      }
    },
  });

  const Component = COMPONENTS[type];

  const handleClick = () => {
    const { userInstruction, slidesCount, tone, writeStyle } =
      useGenerationStore.getState();

    if (!userInstruction || !slidesCount) {
      alert("Please provide instructions and slides count");
      return;
    }

    setScreen("result");

    submit({
      instructions: userInstruction,
      slidesNo: slidesCount,
      type,
      style: type === "text" ? writeStyle : undefined,
      tone,
      messages: [],
    });
  };

  if (screen === "result") return <OutlineViewer />;

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Component {...props} />
      <PresentationOptions type={type} handleClick={handleClick} />
    </div>
  );
}
