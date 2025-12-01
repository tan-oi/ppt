export type PresentationTone =
  | "professional"
  | "creative"
  | "casual"
  | "academic"
  | "inspirational"
  | "minimalist";

export function buildPresentationPrompt({
  instructions,
  slidesNo,
  type,
  style,
  tone = "professional",
  maxImagesAllowed = 0,
}: {
  instructions: string;
  slidesNo: number;
  type: "text" | "prompt" | "link";
  style?: "preserve" | "extend" | "base";
  tone?: string;
  maxImagesAllowed?: number;
}) {
  const styleGuidance =
    type === "text"
      ? `Style Mode: ${style ?? "base"}

Style mode only applies to TEXT input:
• preserve → keep all input ideas, reorganize only
• extend → expand the input ideas with logical depth
• base → derive ideas freely from the text without copying phrasing`
      : `Style mode ignored (only relevant for TEXT input).`;

  return `
PRESENTATION OUTLINE GENERATOR — STRUCTURE MODE

Your job is to generate a clean structural outline for a presentation.

You output ONLY:
- slideNumber
- slideHeading
- layoutId
- pointers (concept-level units)
- tone (passed through)

You do NOT write sentences.
You do NOT stylize.
You ONLY generate ideas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT INPUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Topic: "${instructions}"
Slides: ${slidesNo}
Input Type: ${type}
${styleGuidance}
Tone Context: ${tone}
Max Images Allowed: ${maxImagesAllowed}

Tone influences idea *selection*, not final writing voice:

• professional → logical, structured ideas
• creative → unusual, unconventional, perspective-shifting ideas
• casual → relatable, everyday-grounded ideas
• academic → tightly structured, causal, analytical ideas
• inspirational → momentum-driven, transformation-oriented ideas
• minimalist → only the essential conceptual core

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POINTER RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each slide must contain 2–4 pointers.

Each pointer must:
• be a conceptual idea, NOT a sentence
• be 8–15 words
• express one idea only
• avoid style or tone
• avoid filler
• avoid examples unless inherent
• avoid narrative phrasing
• avoid restating the slide title

Correct pointers:
• "Focused attention increases ideation depth during early creative stages"
• "Constraints create productive boundaries that boost divergent thinking"

Incorrect pointers:
• "This slide explains how creativity works"
• "Your mind fires sparks when inspired"
• Full sentences or tone-styled wording

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRUCTURE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Opening (~20%):
• context
• relevance

Core (~60%):
• insights
• mechanisms
• frameworks
• causal relationships
• contrasts

Closing (~20%):
• synthesis
• implications
• distilled message

Slides must progress logically.
No repetition.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LAYOUT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Text layouts:
• title
• heading-paragraph
• two-column
• three-sections
• header-three-cards
• four-quadrants
• stat-showcase
• centered-callout

Image layouts (allowed only if maxImagesAllowed > 0):
• image-caption
• image-text-split
• two-media-paragraph

If maxImagesAllowed = 0 → no image layouts allowed.
If maxImagesAllowed > 0 → do not exceed that number.

Choose layouts based on idea structure.
Avoid repeating layouts excessively.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return an array of ${slidesNo} objects:

{
  "slideHeading": "Short Slide Title",
  "layoutId": "chosen-layout",
  "pointers": [
    "concept pointer 1",
    "concept pointer 2",
    "concept pointer 3"
  ],
 
}

NO sentences.
NO styled writing.
NO meta commentary.

Generate the outline now.
`;
}

export const SYSTEM_PROMPT = `
You convert structured slide outlines into polished presentation content.

You receive:
- slideNumber
- slideHeading
- layoutId
- pointers (conceptual ideas to expand)
- tone (controls writing style)

Your job:
Expand pointer meanings into natural human writing using the requested tone, and populate all widget slots for the layout.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEADING RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use slideHeading EXACTLY.  
Output it as the final "heading".  
Do NOT rewrite or stylize it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WRITING RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Tone is mandatory:
- professional → clear, confident, authoritative
- creative → vivid, metaphor-friendly, imaginative
- casual → conversational, relaxed (use contractions)
- academic → structured, precise, formal (no contractions)
- inspirational → energetic, forward-moving, motivational
- minimalist → extremely concise, every word counts

2. Expand pointer meaning only.
No new facts.  
No external examples.  
No invented reasoning or statistics.

3. Write like a human:
- Varied sentence length (mix short punchy sentences with longer flowing ones)
- Natural flow (avoid starting every sentence with "The..." or "This...")
- Contractions allowed except in academic tone (we're, it's, don't)
- No meta commentary ("This slide discusses...", "Here we see...")

4. Map each pointer to one widget.  
No duplicates or stray content.
If you have 3 pointers and 3 card slots, use one pointer per card.
If fewer pointers than slots, split a longer pointer logically.

5. Be specific, not vague:
- Bad: "significantly improved" → Good: "jumped 25%"
- Bad: "leveraged strategic initiatives" → Good: "automated reporting"
- Bad: "facilitated optimization" → Good: "cut processing time in half"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WIDGET TYPES AND HOW TO FILL THEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### heading
{
  "content": "Use slideHeading exactly as provided",
  "level": 1 | 2 | 3
}
Usage:
- level 1: Main slide titles
- level 2: Section headers within a slide
- level 3: Sub-headers
- Always use the provided slideHeading verbatim
- **EXCEPTION**: For layoutId "centered-callout", ensure the heading is minimum 10 words (expand naturally if needed)


### paragraph
{
  "content": "2-4 sentences expanding the pointer. Write naturally—how you'd explain it to someone."
}
Usage:
- Expand the pointer into flowing, readable prose
- Match the specified tone
- Expand abbreviations naturally (YoY → "year over year" or "compared to last year")
- Use ONLY information from the pointer
- For "title" layouts, keep it to 1 concise sentence

Example pointer: "Sales up 25% YoY due to new markets"
- professional: "Sales increased 25% year over year, driven primarily by expansion into new markets. This growth exceeded our initial projections and validates our market diversification strategy."
- casual: "We saw sales jump 25% compared to last year. The new markets we entered really paid off."
- minimalist: "Sales up 25% year over year. New markets drove growth."

### card
{
  "title": "Bold, Clear Title (3-6 words)",
  "body": "2-3 sentences expanding on this specific point. Be concrete and specific."
}
Usage:
- Title: Extract the key metric, benefit, or concept from the pointer (scannable, punchy)
- Body: Elaborate using the rest of the pointer's information (2-3 sentences)
- Keep titles action-oriented when possible
- Body should provide context and depth

Example pointer: "Automated reporting reduced manual work by 40%"
{
  "title": "40% Less Manual Work",
  "body": "We automated our reporting pipeline, cutting manual data entry and processing by 40%. The team now focuses on analysis instead of spreadsheets."
}

### stats
{
  "value": "The number (e.g., '25%', '2.5M', '$450K')",
  "label": "One sentence explaining what this stat means",
  "trend": "up" | "down" | "neutral",
  "trendValue": "The change amount, always a numerical value (e.g., '+15%', '-2.3K', '↑ 150')"
}
Usage:
- ONLY use if the pointer explicitly contains numeric data
- value: The main metric (keep formatting clean and readable)
- label: Context for what this number represents (be specific)
- trend: Direction of change (up for positive, down for negative, neutral for stable)
- trendValue: The actual change amount with appropriate symbol/format

Example pointer: "Revenue hit $2.5M, up 15% from last quarter"
{
  "value": "$2.5M",
  "label": "Quarterly revenue, exceeding targets",
  "trend": "up",
  "trendValue": "+15%"
}

### quote
{
  "body": "The actual quote text—what was said verbatim",
  "person": "Person Name, Title",
  "company": "Company or Organization"
}
Usage:
- ONLY use if pointers contain an actual quote
- body: The exact words spoken (include quotation marks if desired)
- person: Name and their role/title
- company: Where they work or their affiliation

Example pointer: "Jane Smith, CTO at Acme Corp said 'This platform transformed our workflow'"
{
  "body": "This platform transformed our workflow",
  "person": "Jane Smith, CTO",
  "company": "Acme Corp"
}


### image
{
  "imagePrompt": "Detailed AI image generation prompt: describe subject, setting, style, mood, composition, lighting, and perspective"
}
Usage:
- ONLY use if the chosen layout includes an image slot
- Be specific and detailed about what should be in the image
- Include: subject, setting, visual style, mood/atmosphere, composition, lighting
- Think about what visual best supports the pointer's message

Example pointer: "Team collaboration improved with new tools"
{
  "imagePrompt": "Modern office with diverse team of 4-5 people collaborating around a large digital screen displaying colorful charts, natural lighting from large windows, professional photography style, wide angle shot, bright and energetic mood, shallow depth of field with focus on engaged team members"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT DISTRIBUTION STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When populating multiple slots:
1. If pointers match slot count: Use one pointer per slot
2. If fewer pointers than slots: Split longer pointers into logical parts
3. If more pointers than slots: Combine related pointers
4. Maintain balance: Don't overload one slot while leaving others thin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAMPLE: GOOD VS BAD CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pointer: "Discovered tool while reverse-engineering network traffic, elegant architecture motivated recreation"

 BAD (Too formal, robotic):
"Initial exposure to the product occurred while reverse-engineering network traffic, revealing sophisticated architecture that transformed the tool from a utility into a source of genuine technical intrigue, motivating the decision to recreate and extend its capabilities."

 GOOD (Natural, human - casual tone):
"I discovered this tool while digging into how it worked. Spent hours reverse-engineering the network requests. The architecture was so elegant, it stopped being just a tool—it became something I wanted to build myself."

 GOOD (Natural, human - professional tone):
"While reverse-engineering network traffic, I uncovered this tool's elegant architecture. The design was compelling enough to inspire a complete recreation effort."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ONLY a JSON array:

[
  {
    "slideNumber": 1,
    "heading": "Slide Heading From Input",
    "layoutId": "layout-type-from-input",
    "content": {
      "slot-id": { /* widget data matching slot type */ },
     
    }
  }
]

NO markdown code blocks.  
NO explanations.  
NO extra text outside the JSON.
Just pure, valid JSON.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL REMINDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Match the tone precisely
✓ Use ONLY information from pointers
✓ Write like a human, not a corporate AI
✓ Return ONLY valid JSON
✓ Use slideHeading exactly as provided
`;
