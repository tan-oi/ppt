export function buildPresentationPrompt({
  instructions,
  slidesNo,
  type,
  style,
}: {
  instructions: string;
  slidesNo: number;
  type: "text" | "prompt" | "link";
  style?: "Preserve" | "Extend" | "Base";
}) {
  return `You are an expert content creator building comprehensive, detailed PowerPoint slide outlines that rival professional presentations.
  
  TASK: Create ${slidesNo} in-depth slide outlines based on:
  - Content: "${instructions}"
  - Type: ${type} 
  - Style: ${style || "comprehensive and detailed"}
  
  CONTENT QUALITY REQUIREMENTS:
  • Include specific facts, statistics, and real-world examples
  • Add actionable insights and practical information
  • Use concrete details rather than generic statements
  • Include current data, studies, or expert opinions where relevant
  • Make each bullet point informative and valuable
  
  PROCESSING RULES:
  ${
    type === "prompt"
      ? "• Research the topic thoroughly and provide expert-level comprehensive coverage with specific details, statistics, and actionable insights"
      : ""
  }
  ${
    type === "text" && style === "Preserve"
      ? "• Use ONLY the provided content but expand each point with specific details and examples"
      : ""
  }
  ${
    type === "text" && style === "Extend"
      ? "• Significantly expand the content with detailed research, specific examples, statistics, and expert insights"
      : ""
  }
  ${
    type === "text" && style === "Base"
      ? "• Use content as foundation but build comprehensive, detailed presentation with extensive related information and expert insights"
      : ""
  }
  
  LAYOUTS AVAILABLE:
  - "title" → Main title slides, introductions with compelling hooks
  - "heading-paragraph" → Topic with detailed explanation and specifics  
  - "two-column" → Detailed comparisons, comprehensive pros/cons
  - "three-sections" → Detailed process steps, comprehensive categories
  - "main-pointer" → Single key concept with deep dive details
  
  OUTPUT FORMAT (exactly like this):
  
  **Slide 1: [Compelling, Specific Title]**
  • Detailed bullet point with specific facts, numbers, or examples
  • Another comprehensive point with concrete information
  • Third point with actionable insights or expert perspective
  • Fourth point with relevant statistics or real-world data (if needed)
  Layout: title
  
  **Slide 2: [Specific, Expert-Level Title]**
  • Comprehensive bullet point with specific details and examples
  • Detailed point with facts, figures, or expert insights
  • In-depth information with practical applications
  • Additional specific detail or statistic (if relevant)
  Layout: heading-paragraph
  
  Continue for all ${slidesNo} slides. Each slide should provide substantial value with specific, detailed, and actionable content that demonstrates expertise on the topic.`;
}
export function buildPreviewPrompt({
  instructions,
  slidesNo,
  type,
  style,
}: {
  instructions: string;
  slidesNo: number;
  type: "text" | "prompt" | "link";
  style?: "Preserve" | "Extend" | "Base";
}) {
  return `You are creating a PREVIEW of PowerPoint slide outlines for the user.
  
  TASK: Create ${slidesNo} slide outlines based on:
  - Content: "${instructions}"
  - Type: ${type} 
  - Style: ${style || "creative"}
  
  RULES:
  ${
    type === "prompt"
      ? "• Treat the instructions as a topic and create comprehensive coverage"
      : ""
  }
  ${
    type === "text" && style === "Preserve"
      ? "• Use ONLY the provided content, just reorganize it"
      : ""
  }
  ${
    type === "text" && style === "Extend"
      ? "• Expand on the provided content with more details and examples"
      : ""
  }
  ${
    type === "text" && style === "Base"
      ? "• Use content as foundation but go beyond with related information"
      : ""
  }
  
  LAYOUTS AVAILABLE:
  - "title" → Main title slides, introductions
  - "heading-paragraph" → Topic with explanation  
  - "two-column" → Comparisons, pros/cons
  - "three-sections" → Process steps, categories
  - "main-pointer" → Single key concept
  
  OUTPUT FORMAT (exactly like this):
  
  **Slide 1: [Title]**
  • Bullet point 1
  • Bullet point 2  
  • Bullet point 3
  Layout: title
  
  **Slide 2: [Title]**
  • Bullet point 1
  • Bullet point 2
  • Bullet point 3
  Layout: heading-paragraph
  
  Continue for all ${slidesNo} slides. Pick the best layout for each slide's content.`;
}
