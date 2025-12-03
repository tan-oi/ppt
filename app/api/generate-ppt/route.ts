//gotta make the repair work
import { streamObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { SYSTEM_PROMPT } from "@/lib/config/prompt";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { userPlan } from "@/lib/functions/plan-enforcement";
import { PLAN_CONFIG } from "@/lib/config/plan";
import { createPresentationSchema } from "@/lib/config/schema";
import { incrementUserCache } from "@/lib/functions/userCache";
type CurrentPlan = "free" | "basic" | "pro";
const slideSchema = z.object({
  slideNumber: z.number(),
});
export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return;
  const userId = session?.user?.id;

  const { plan } = await userPlan(userId);
  const maxImagePerPresentation =
    PLAN_CONFIG[plan as CurrentPlan].maxImagePerPresentation;

  const imageAllowed = maxImagePerPresentation > 0;

  const pptSchema = z.array(createPresentationSchema(imageAllowed));

  const userText = await req.json();
  const { processedOutline } = userText;
  console.log(userText);

  const result = streamObject({
    model: groq("openai/gpt-oss-120b"),
    system: SYSTEM_PROMPT,
    prompt: JSON.stringify(processedOutline),
    schema: pptSchema,
    experimental_repairText: async ({ text, error }) => {
      console.log("Repairing text due to:", error);

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

  await incrementUserCache(userId, "pptCount", 1);
  return result.toTextStreamResponse();
}
