//gotta make the repair work
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
    experimental_repairText: async ({ text, error }) => {
      console.warn("Repairing text due to:", error);

      try {
        let repaired = text
          .replace(/,\s*}/g, "}")
          .replace(/,\s*]/g, "]")
          .replace(/[\u0000-\u001F]+/g, "");

        let parsed = JSON.parse(repaired);

        console.log(parsed);
        if (!Array.isArray(parsed)) parsed = [parsed];

        console.log(parsed);
        return JSON.stringify(parsed);
      } catch {
        return null;
      }
    },
  });

  result.object.then((finalObject) => {
    console.log("Finhal object:", finalObject);
  });

  return result.toTextStreamResponse();
}
