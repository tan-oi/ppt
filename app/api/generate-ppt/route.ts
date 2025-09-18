import { streamObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { google } from "@ai-sdk/google";
// Widget schemas
const headingWidget = z.object({
  widgetType: z.literal("heading"),
  id: z.string(),
  data: z.object({
    content: z.string(),
    level: z.number().optional(),
  }),
});

const paragraphWidget = z.object({
  widgetType: z.literal("paragraph"),
  id: z.string(),
  data: z.object({
    content: z.string(),
  }),
});

const featureCardWidget = z.object({
  widgetType: z.literal("featureCard"),
  id: z.string(),
  data: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

const widgetSchema = z.union([
  headingWidget,
  paragraphWidget,
  featureCardWidget,
]);

// One slide
const slideSchema = z.object({
  id: z.string(),
  slideNumber: z.number(),
  heading: z.string(),
  layoutId: z.string(),
  content: z.array(widgetSchema),
  image: z.string(),
});

export async function POST(req: Request) {
  const result = streamObject({
    model: groq("moonshotai/kimi-k2-instruct"),
    // providerOptions: {
    //   google: {
    //     thinkingConfig: {
    //       thinkingBudget: 128,
    //     },
    //   },
    // },
    output: "array",
    schema: slideSchema,
    prompt: `Generate a set of slides about "India and its festivals". 
The array should be named "slides".
Each slide must have a unique string "id", heading, layoutId,
slideNumber, and content (mix of headings, paragraphs, featureCards) and as well as add a image prompt signifing something of that slide.`,
    onFinish({ object, error, usage }) {
      console.log(object);
      console.log(error);
      console.log(usage);
    },
  });

  return result.toTextStreamResponse();
}
