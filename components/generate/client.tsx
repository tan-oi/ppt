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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOutlineSchema } from "@/lib/config/schema";
import { ERROR_MESSAGES } from "@/lib/const";

type ApiError = Error & { code?: string; status?: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMPONENTS: Record<"text" | "prompt", React.FC<any>> = {
  text: Text,
  prompt: PromptInput,
};

export function GenerateClient({
  type,
  ...props
}: {
  type: "text" | "prompt";
  [key: string]: unknown;
}) {
  const plan = props.plan as "free" | "pro" | "basic";
  const userId = props.userId as string | null;

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

      if (config.googleApiKey) {
        headers.set("x-google-api-key", config.googleApiKey);
        headers.set("x-google-model", config.googleModel || "gemini-2.5-flash");
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
        const error: ApiError = new Error(data.message || "Request failed");
        error.code = data.error;
        error.status = response.status;
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

    onError: (rawError) => {
      const error = rawError as ApiError;
      const message =
        (error.code && ERROR_MESSAGES[error.code]) ||
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
    setResult(null);
    setId("");
    setTicket("");
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
