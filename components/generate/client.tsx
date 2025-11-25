"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { PresentationOptions } from "./options";
import { PromptInput } from "./prompt";
import { Text } from "./text";
import { OutlineViewer } from "./outline-viewer";
import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import { createBlankPresentation } from "@/app/create/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PLAN_CONFIG } from "@/lib/config/plan";
import { createOutlineSchema } from "@/lib/config/schema";

const COMPONENTS: Record<"text" | "prompt", React.FC<any>> = {
  text: Text,
  prompt: PromptInput,
};

const ERROR_MESSAGES: Record<string, string> = {
  UNAUTHORIZED: "You need to be logged in to do this.",
  VALIDATION_ERROR: "Please check your inputs and try again.",
  INSUFFICIENT_CREDITS:
    "You don't have enough credits to generate this presentation.",
  AI_GENERATION_ERROR:
    "The AI couldn't generate slides. Try different instructions.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
  INSUFFICIENT_ALLOWANCE: "You've exhausted your limit",
};

export function GenerateClient({
  type,
  ...props
}: {
  type: "text" | "prompt";
  [key: string]: any;
}) {
  const plan = props.plan as "free" | "pro" | "basic";
  const maxImagesAllowed = PLAN_CONFIG[plan].maxImagePerPresentation;

  const [isCreatingScratch, setIsCreatingScratch] = useState(false);

  const router = useRouter();
  const setGenerateType = useGenerationStore((s) => s.setGenerateType);
  const setResult = useGenerationStore((s) => s.setResult);
  const setId = useGenerationStore((s) => s.setId);
  const setTicket = useGenerationStore((s) => s.setTicket);
  const [screen, setScreen] = useState<"form" | "result">("form");

  const apiResponseSchema = z.object({
    slidesOutline: z.array(createOutlineSchema(maxImagesAllowed > 0)),
    presentationId: z.string(),
    transactionId: z.string().optional(),
    ticket: z.string(),
  });

  useEffect(() => {
    setGenerateType(type);
  }, [type, setGenerateType]);

  const { submit } = useObject({
    api: "/api/generate-outline",
    schema: apiResponseSchema,

    fetch: async (url, options) => {
      const response = await fetch(url, options);

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        const error = new Error(data.message || "Request failed");
        (error as any).code = data.error;
        (error as any).status = response.status;
        throw error;
      }

      return response;
    },

    onFinish: async (event) => {
      if (!event.object?.slidesOutline || !event.object?.presentationId) {
        toast.error("No slides generated. Please try again.");
        setScreen("form");
        return;
      }
      setResult(event.object.slidesOutline);
      toast.success("Outline created successfully");
      const id = `ai-${event.object.presentationId}`;
      setId(id);
      setTicket(event.object.ticket);

      window.history.replaceState(
        null,
        "",
        `/create/generate/${id}?type=${type}`
      );
    },

    onError: (error: any) => {
      console.log(error.code);
      const message =
        ERROR_MESSAGES[error.code] ||
        error.message ||
        ERROR_MESSAGES.UNKNOWN_ERROR;

      if (error.code === "UNAUTHORIZED") {
        toast.error("Not logged in, you'd be redirect in a couple of seconds");
        setTimeout(() => {
          router.replace("/?login=true");
        }, 1000);
        return;
      }

      if (error.code && error.code.includes("INSUFFICIENT")) {
        toast.error(error.message);
        setScreen("form");

        setTimeout(() => {
          alert("upgrade1");
        }, 3000);
        return;
      }

      toast.error(message);
      setScreen("form");
    },
  });

  const Component = COMPONENTS[type];

  const handleClick = () => {
    const { userInstruction, slidesCount, tone, writeStyle } =
      useGenerationStore.getState();

    if (!userInstruction || !slidesCount) {
      toast.error("Please provide instructions and slides count");
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

  const handleStartFromScratch = async () => {
    setIsCreatingScratch(true);
    const result = await createBlankPresentation();

    if (result.success) {
      router.push(`/docs/${result.id}`);
    } else {
      toast.error(result.error || "Failed to create presentation");
      setIsCreatingScratch(false);
    }
  };

  if (screen === "result") return <OutlineViewer plan={plan} />;

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen space-y-6">
      <Component {...props} />
      <PresentationOptions plan={plan} type={type} handleClick={handleClick} />
    </div>
  );
}
