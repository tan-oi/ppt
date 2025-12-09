export const presetColors = [
  // Essentials (most commonly used)
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#6b7280",

  "#8b0000", // Newspaper Riot
  "#7b9fd9", // Boardroom Blue
  "#d4905f", // Executive Charcoal
  "#e6c068", // Hollywood Glamour
  "#b8d96d", // Aurora Tech
  "#5affc5", // Terminal Neon
  "#ff1a8c", // Neon Grid
  "#d1d1d1", // Whitespace Pro
  "#c1532f", // Gourmet Fire
  "#87b556", // Fresh Harvest
  "#ffb347", // Champion Energy
  "#66d97a", // Midnight Athlete
  "#c89948", // Wall Street Gold
  "#8b5cf6", // Crypto Midnight
  "#d946c7", // Velvet Night
  "#ff006e", // Neon Nights

  // Secondary/accent colors from themes
  "#ff4500",
  "#2f4f4f", // Newspaper Riot
  "#5a7aa8", // Boardroom Blue
  "#1a1a1a", // Executive Charcoal
  "#d4a574", // Hollywood Glamour
  "#a8e05f", // Aurora Tech
  "#00ff9f", // Terminal Neon
  "#5dc4ff", // Neon Grid
  "#cccccc", // Whitespace Pro
  "#b84520", // Gourmet Fire
  "#7cb342", // Fresh Harvest
  "#ffa726", // Champion Energy
  "#d4a862", // Wall Street Gold
  "#9575f6", // Crypto Midnight
];

export const GROQ_MODELS = [
  { value: "openai/gpt-oss-120b", label: "GPT-OSS-120B" },
  { value: "meta-llama/llama-4-maverick-17b-128e-instruct", label: "Llama maverick" },
  { value: "openai/gpt-oss-20b", label: "GPT-OSS-20B" },
  { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B" },
  { value: "gemma-7b-it", label: "Gemma 7B" },

  { value: "moonshotai/kimi-k2-instruct-0905", label: "Kimi K2" },
];

export const REPLICATE_MODELS = [
  { value: "black-forest-labs/flux-pro", label: "Flux Pro" },
  { value: "black-forest-labs/flux-schnell", label: "Flux Schnell" },
  { value: "black-forest-labs/flux-dev", label: "Flux Dev" },
  { value: "stability-ai/stable-diffusion-3", label: "Stable Diffusion 3" },
  { value: "stability-ai/sdxl", label: "Stable Diffusion XL" },
];

export const ERROR_MESSAGES: Record<string, string> = {
  UNAUTHORIZED: "You need to be logged in to do this.",
  VALIDATION_ERROR: "Please check your inputs and try again.",
  INSUFFICIENT_CREDITS:
    "You don't have enough credits to generate this presentation.",
  AI_GENERATION_ERROR:
    "The AI couldn't generate slides. Try different instructions.",
  UNKNOWN_ERROR: "Something went wrong. Please try again.",
  INSUFFICIENT_ALLOWANCE: "You've exhausted your limit",
  INVALID_API_KEY:
    "Invalid API key. Please check your Groq API key in settings and try again.",
};
