//gotta make the repair work
import { streamObject } from "ai";
import { createGroq, groq } from "@ai-sdk/groq";
import { SYSTEM_PROMPT } from "@/lib/config/prompt";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { createPresentationSchema } from "@/lib/config/schema";
import { incrementUserCache } from "@/lib/functions/userCache";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const groqApiKey = req.headers.get("x-groq-api-key");
  const userId = session?.user?.id;
  const isGuestMode = !userId;

  if (!session && !isGuestMode) {
    return new Response("Unauthorized", { status: 401 });
  }

  let imageAllowed = true;
  // if (!isGuestMode) {
  //   const { plan } = await userPlan(userId);
  //   const maxImagePerPresentation =
  //     PLAN_CONFIG[plan as CurrentPlan].maxImagePerPresentation;
  //   imageAllowed = maxImagePerPresentation > 0;
  // }

  const pptSchema = z.array(createPresentationSchema(imageAllowed));

  const userText = await req.json();
  const { processedOutline } = userText;
  console.log(userText);

  const groqModel = req.headers.get("x-groq-model") || "openai/gpt-oss-120b";

  const groqProvider = groqApiKey
    ? createGroq({
        apiKey: groqApiKey,
      })
    : groq;

  const result = streamObject({
    model: groqProvider(groqModel),
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

  if (!isGuestMode && session) {
    await incrementUserCache(userId, "pptCount", 1);
  }
  return result.toTextStreamResponse();
}
