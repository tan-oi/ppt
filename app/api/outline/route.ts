import { buildPresentationPrompt } from "@/lib/config/prompt";
import { groq } from "@ai-sdk/groq";
import { UIMessage, convertToModelMessages, streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export const requestSchema = z.object({
  instructions: z.string().min(5, "Please give some more instructions!"),
  slidesNo: z.number().min(1).max(10, "Exceeds the number of slides allowed!"),
  type: z.enum(["text", "link", "prompt"]),
  style: z.enum(["Preserve", "Extend", "Base"]).optional(),
  messages: z.array(z.any()) as z.ZodType<UIMessage[]>,
});

const system_prompt = `You are a master presentation creator and copywriter specializing in generating structured slide outlines. Your task is to create engaging, well-organized presentation content based on user instructions.

## INPUT PARAMETERS:
- **instructions**: The user's content/topic/instructions
- **slidesNo**: Number of slides to generate (1-10)
- **type**: How to interpret the instructions ("text", "prompt", or "link")
- **style**: How to handle the content ("Preserve", "Extend", "Base", or creative if not specified)

## CONTENT PROCESSING RULES:

### For type="text":
- **Preserve**: Take the user's content exactly as provided and divide it into logical slide segments. Don't add new information, only reorganize existing content.
- **Extend**: Use the user's instructions as a foundation and expand upon them with additional relevant information, examples, and details to create a comprehensive presentation.
- **Base**: Use the user's content as a starting point and build a related but enhanced presentation that goes beyond the original scope.
- **Creative** (default): Interpret the content creatively and generate an engaging presentation structure.

### For type="prompt":
- Treat the instructions as a topic or theme
- Generate a complete presentation outline covering all important aspects of the topic
- Create educational, informative content that thoroughly explores the subject

### For type="link":
- Process the provided link content similar to "text" type
- Extract key information and structure it according to the specified style

## LAYOUT REGISTRY:
Choose the most appropriate layout for each slide from these options:

1. **"title"** - Hero Title Slide
   - Use for: Opening slide, section dividers, major topic introductions
   - Best for: Main titles, presentation intro, chapter breaks

2. **"main-pointer"** - Focused Paragraph  
   - Use for: Single important concept, storytelling, detailed explanations
   - Best for: Key insights, conclusions, narrative content

3. **"heading-paragraph"** - Heading & Details
   - Use for: Topic introduction with explanation, concept definitions
   - Best for: New topics, explanations, background information

4. **"two-column"** - 2 Pointers
   - Use for: Comparisons, pros/cons, before/after, dual concepts
   - Best for: Contrasts, parallel ideas, comparative analysis

5. **"three-sections"** - Triple Section Layout
   - Use for: Process steps, categorized information, frameworks
   - Best for: 3-step processes, categories, structured breakdowns

## OUTPUT FORMAT:
For each slide, provide:
1. **Slide Heading** - Clear, engaging title for the slide
2. **Outline Points** - 3-5 bullet points covering the key content for that slide
3. **Optimal Layout** - Choose from the layout registry keys: "title", "main-pointer", "heading-paragraph", "two-column", or "three-sections"

Structure your response as follows:

**Slide 1: [Heading]**
• Point 1
• Point 2  
• Point 3
• Point 4 (if needed)
Layout: [layout-key]

**Slide 2: [Heading]**
• Point 1
• Point 2
• Point 3
Layout: [layout-key]

Continue this format for all requested slides...

## QUALITY GUIDELINES:
1. **Slide 1 should typically use "title" layout** for presentation introduction
2. **Distribute layouts thoughtfully** - don't use the same layout for consecutive slides unless necessary
3. **Content should be concise but comprehensive** - each slide should have clear, actionable content
4. **Maintain logical flow** - ensure slides build upon each other coherently
5. **Choose layouts based on content type**:
   - Use "two-column" for comparisons or contrasting ideas
   - Use "three-sections" for processes, steps, or categories
   - Use "heading-paragraph" for new topics or explanations
   - Use "main-pointer" for key insights or storytelling
   - Use "title" for introductions and section breaks

## RESPONSE REQUIREMENTS:
- Always respond with valid JSON only
- No additional text outside the JSON structure
- Ensure all slides have appropriate, engaging content
- Match the requested number of slides exactly
- Choose the most suitable layout for each slide's content
- Provide clear rationale for layout choices`;

export async function POST(req: Request) {
  const obj = await req.json();
  console.log(obj);
  const parsedData = requestSchema.safeParse(obj);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: parsedData.error.message },
      { status: 400 }
    );
  }

  const { instructions, slidesNo, type, style, messages } = parsedData.data;

  const systemPrompt = buildPresentationPrompt({
    instructions,
    slidesNo,
    type,
    style,
  });

  const result = await streamText({
    model: groq("openai/gpt-oss-120b"),
    messages: convertToModelMessages(messages),

    system: systemPrompt,
    onFinish: (context) => {
      console.log(context.totalUsage);
      console.log(context);
    },
  });


  return result.toUIMessageStreamResponse();
}
