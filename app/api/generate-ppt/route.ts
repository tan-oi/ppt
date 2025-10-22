import { streamObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { SYSTEM_PROMPT } from "@/lib/config/prompt";
import { z } from "zod";

export async function POST(req: Request) {
  const userText = await req.json();
  const { processedOutline } = userText;
  console.log(userText);

  const result = streamObject({
    model: groq("moonshotai/kimi-k2-instruct"),
    system: SYSTEM_PROMPT,
    prompt: JSON.stringify(processedOutline),
    schema: z.array(z.any()),
  });

  result.object.then((finalObject) => {
    console.log("Finhal object:", finalObject);
  });

  return result.toTextStreamResponse();
}
