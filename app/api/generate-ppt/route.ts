//gotta make the repair work
import { streamObject } from "ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "@/lib/config/prompt";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { buildPresentationSchemaFromOutline } from "@/lib/config/widget-schemas";
import { incrementUserCache } from "@/lib/functions/userCache";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const googleApiKey = req.headers.get("x-google-api-key");
  const userId = session?.user?.id;
  const isGuestMode = !userId;

  if (!session && !isGuestMode) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userText = await req.json();
  const { processedOutline } = userText;

  const outlineObj =
    typeof processedOutline === "string"
      ? JSON.parse(processedOutline)
      : processedOutline;
  const slides = outlineObj?.slides ?? outlineObj;

  console.log("=== SLIDES ===");
  const pptSchema = buildPresentationSchemaFromOutline(slides);
  console.log("=== SYSTEM PROMPT ===");
  console.log(SYSTEM_PROMPT);
  console.log("=== USER PROMPT (processedOutline) ===");
  console.log(JSON.stringify(processedOutline, null, 2));
  console.log("=== END ===");

  const googleModel =
    req.headers.get("x-google-model") || "gemini-2.5-flash";

  const googleProvider = googleApiKey
    ? createGoogleGenerativeAI({ apiKey: googleApiKey })
    : google;

  const result = streamObject({
    model: googleProvider(googleModel),
    providerOptions: {
      google: { structuredOutputs: false },
    },
    maxOutputTokens: 32000,
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

  result.object
    .then((finalObject) => {
      console.log("Final object:", finalObject);
    })
    .catch((err) => {
      console.error("generate-ppt failed:", err?.message || err);
    });

  if (!isGuestMode && session) {
    await incrementUserCache(userId, "pptCount", 1);
  }
  return result.toTextStreamResponse();
}
