import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await streamText({
    model: groq("moonshotai/kimi-k2-instruct"),
    messages: [
      {
        role: "user",
        content: "Yo who are u",
      },
    ],
    onFinish(context) {
      console.log(context);
    },
  });

  return result.toUIMessageStreamResponse();
}
