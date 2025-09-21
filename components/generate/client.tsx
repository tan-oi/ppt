"use client";
import { useGenerationStore } from "@/lib/store/generation-store";
import { PresentationOptions } from "./options";
import { PromptInput } from "./prompt";
import { Text } from "./text";
import { UrlInput } from "./url";
import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

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
  const [screen, setScreen] = useState<"form" | "result">("form");

  useEffect(() => {
    setGenerateType(type);
  }, [type]);

  const { messages, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/outline",
    }),
    onFinish : (options) => {
      // useGenerationStore.getState().setResult(options.message)
      const outlineText = options.message.parts
      ?.find(part => part.type === 'text')?.text || '';
    
    useGenerationStore.getState().setResult(outlineText);
    }
  });

  const Component = COMPONENTS[type];

  const handleClick = () => {
    const instructions = useGenerationStore.getState().userInstruction;
    const slidesCount = useGenerationStore.getState().slidesCount;

    if (!instructions || !slidesCount) {
      alert("Please provide instructions and slides count");
      return;
    }

    setScreen("result");

    sendMessage(
      {
        role: "user",
        parts: [
          {
            type: "text",
            text: "Generate presentation outline",
          },
        ],
      },
      {
        body: {
          instructions,
          slidesNo: slidesCount,
          type,
          messages: messages,
        },
      }
    );

    console.log(instructions);
    console.log(slidesCount);
  };

  if (screen === "result") {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Generating Presentation Outline...
          </h2>
          <button
            onClick={() => setScreen("form")}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            Back to Form
          </button>
        </div>

        <div className="space-y-4 text-white">
          {messages.map((message) => (
            <div key={message.id} className="p-4 border rounded">
              <div className="font-medium text-sm text-gray-600 mb-2">
                {message.role === "user" ? "Request" : "Generated Outline"}
              </div>
              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <div key={index} className="prose max-w-none">
                      {message.role === "user" ? (
                        <pre className="text-sm bg-gray-50 p-2 rounded overflow-x-auto">
                          {part.text}
                        </pre>
                      ) : (
                        <div className="whitespace-pre-wrap">{part.text}</div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}

          {status === "submitted" && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span>Generating outline...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Component {...props} />
      <PresentationOptions type={type} handleClick={handleClick} />
    </div>
  );
}
