"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { useApiConfigStore } from "@/lib/store/guest-mode-store";
import { PresentationOptions } from "./options";
import { PromptInput } from "./prompt";
import { Text } from "./text";
import { OutlineViewer } from "./outline-viewer";
import { useEffect, useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import { createBlankPresentation } from "@/app/create/action";
import { createBlankLocalPresentation } from "@/lib/functions/create-local-presentation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PLAN_CONFIG } from "@/lib/config/plan";
import { createOutlineSchema } from "@/lib/config/schema";
import { ERROR_MESSAGES } from "@/lib/const";

const COMPONENTS: Record<"text" | "prompt", React.FC<any>> = {
  text: Text,
  prompt: PromptInput,
};

export function GenerateClient({
  type,
  ...props
}: {
  type: "text" | "prompt";
  [key: string]: any;
}) {
  const plan = props.plan as "free" | "pro" | "basic";
  const userId = props.userId as string | null;
  // let maxImagesAllowed;

  // if (!plan) {
  //   maxImagesAllowed = 4;
  // } else maxImagesAllowed = PLAN_CONFIG[plan].maxImagePerPresentation;

  const [isCreatingScratch, setIsCreatingScratch] = useState(false);

  const router = useRouter();
  const setGenerateType = useGenerationStore((s) => s.setGenerateType);
  const setResult = useGenerationStore((s) => s.setResult);
  const setId = useGenerationStore((s) => s.setId);
  const setTicket = useGenerationStore((s) => s.setTicket);
  const [screen, setScreen] = useState<"form" | "result">("form");
  const [mount, setMounted] = useState(false);

  const apiResponseSchema = z.object({
    slidesOutline: z.array(createOutlineSchema(true)),
    presentationId: z.string(),
    transactionId: z.string().optional(),
    ticket: z.string(),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setGenerateType(type);
  }, [type, setGenerateType]);

  const config = useApiConfigStore((s) => s.config);

  const { submit } = useObject({
    api: "/api/generate-outline",
    schema: apiResponseSchema,

    fetch: async (url, options) => {
      const headers = new Headers(options?.headers);

      if (config.groqApiKey) {
        headers.set("x-groq-api-key", config.groqApiKey);
        headers.set("x-groq-model", config.groqModel || "openai/gpt-oss-120b");
      }

      if (config.replicateApiKey) {
        headers.set("x-replicate-api-key", config.replicateApiKey);
        headers.set(
          "x-replicate-model",
          config.replicateModel || "black-forest-labs/flux-schnell"
        );
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

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
        toast.error("Authentication required. Redirecting...");
        setTimeout(() => {
          router.replace("/?login=true");
        }, 1000);
        return;
      }

      if (error.code === "INVALID_API_KEY") {
        toast.error(message, {
          duration: 5000,
          action: {
            label: "Open Settings",
            onClick: () => {
              console.log("i was cliekd mate");
            },
          },
        });

        router.replace("/create?config=true");

        setScreen("form");
        return;
      }

      if (error.code && error.code.includes("INSUFFICIENT")) {
        toast.error(error.message);
        setScreen("form");
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

    const result = userId
      ? await createBlankPresentation()
      : await createBlankLocalPresentation();

    if (result.success) {
      router.push(`/docs/${result.id}`);
    } else {
      toast.error(result.error || "Failed to create presentation");
      setIsCreatingScratch(false);
    }
  };

  if (!mount) return <p>Loading...</p>;
  if (screen === "result")
    return <OutlineViewer plan={plan} userId={userId ?? null} />;

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen space-y-6">
      <Component {...props} />
      <PresentationOptions
        type={type}
        handleClick={handleClick}
        mode={userId ? "auth" : "guest"}
      />
    </div>
  );
}
