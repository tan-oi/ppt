import { Palette, Sparkles, Share2, Presentation, Link } from "lucide-react";
import { Separator } from "../ui/separator";
import * as motion from "motion/react-client";

const featuredLayouts = [
  {
    id: "title",
    name: "Hero Title",
    description: "Impactful intro",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col justify-center items-center gap-1.5">
        <div className="w-3/4 h-3 bg-zinc-600 rounded" />
        <div className="w-1/2 h-1.5 bg-zinc-700 rounded" />
      </div>
    ),
  },
  {
    id: "two-column",
    name: "2 Pointers",
    description: "Side-by-side",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex items-center justify-center gap-2">
        <div className="flex-1 space-y-1">
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-3/4 h-1 bg-zinc-600 rounded" />
        </div>
        <div className="w-px h-12 bg-zinc-600" />
        <div className="flex-1 space-y-1">
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-3/4 h-1 bg-zinc-600 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "image-text-split",
    name: "Image & Text",
    description: "Split layout",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex gap-2">
        <div className="w-1/2 bg-zinc-600 rounded" />
        <div className="w-1/2 flex flex-col justify-center space-y-1">
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-3/4 h-1 bg-zinc-600 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "chart-with-title",
    name: "Chart Showcase",
    description: "Data viz focus",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col gap-1">
        <div className="w-1/2 h-2 bg-zinc-600 rounded mx-auto" />
        <div className="flex-1 bg-zinc-700 rounded flex items-end justify-around px-2 pb-1">
          <div
            className="w-1/6 bg-zinc-500 rounded-t"
            style={{ height: "40%" }}
          />
          <div
            className="w-1/6 bg-zinc-500 rounded-t"
            style={{ height: "65%" }}
          />
          <div
            className="w-1/6 bg-zinc-500 rounded-t"
            style={{ height: "50%" }}
          />
          <div
            className="w-1/6 bg-zinc-500 rounded-t"
            style={{ height: "80%" }}
          />
        </div>
      </div>
    ),
  },
  {
    id: "big-number",
    name: "Big Stat",
    description: "Key metrics",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col items-center justify-center gap-1.5">
        <div className="w-1/3 h-5 bg-zinc-600 rounded" />
        <div className="w-2/3 h-1 bg-zinc-700 rounded" />
        <div className="w-1/2 h-1 bg-zinc-700 rounded" />
      </div>
    ),
  },
  {
    id: "four-quadrants",
    name: "Four Quadrants",
    description: "Feature compare",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 grid grid-cols-2 grid-rows-2 gap-1.5">
        <div className="bg-zinc-700 rounded flex items-center justify-center">
          <div className="w-3/4 h-1 bg-zinc-600 rounded" />
        </div>
        <div className="bg-zinc-700 rounded flex items-center justify-center">
          <div className="w-3/4 h-1 bg-zinc-600 rounded" />
        </div>
        <div className="bg-zinc-700 rounded flex items-center justify-center">
          <div className="w-3/4 h-1 bg-zinc-600 rounded" />
        </div>
        <div className="bg-zinc-700 rounded flex items-center justify-center">
          <div className="w-3/4 h-1 bg-zinc-600 rounded" />
        </div>
      </div>
    ),
  },
];

const featuredThemes = [
  {
    name: "Hollywood Glamour",
    slug: "hollywood-glamour",
    backgroundColor: "oklch(0.97 0.02 40)",
    accentColor: "oklch(0.72 0.22 80)",
    foregroundColor: "oklch(0.18 0.04 10)",
    category: "Luxury",
  },
  {
    name: "Terminal Neon",
    slug: "terminal-neon",
    backgroundColor: "oklch(0.15 0 0)",
    accentColor: "oklch(0.85 0.25 132)",
    foregroundColor: "oklch(0.98 0 0)",
    category: "Technology",
  },
  {
    name: "Brutal Blackline",
    slug: "brutal-blackline",
    backgroundColor: "oklch(1 0 0)",
    accentColor: "oklch(0.8 0.2 110)",
    foregroundColor: "oklch(0.08 0 0)",
    category: "Brutalist",
  },
  {
    name: "Velvet Night",
    slug: "velvet-night",
    backgroundColor: "oklch(0.17 0.04 300)",
    accentColor: "oklch(0.7 0.21 320)",
    foregroundColor: "oklch(0.98 0 0)",
    category: "Luxury",
  },
  {
    name: "Neon Nights",
    slug: "neon-nights",
    backgroundColor: "oklch(0.08 0 0)",
    accentColor: "oklch(0.7 0.35 330)",
    foregroundColor: "oklch(0.98 0 0)",
    category: "Technology",
  },
];

export function Features() {
  return (
    <>
      <div className="flex flex-col items-center py-10 space-y-8">
        <div
          id="features"
          className="flex flex-col items-center space-y-1 md:space-y-2"
        >
          <motion.p className="text-amber-500 text-sm tracking-widest font-mono hover:underline">
            Features
          </motion.p>
          <p className="text-zinc-50 text-center text-md sm:text-xl md:text-3xl tracking-tighter">
            Everything you need to make quick & beautiful decks
          </p>

          <p className="text-xs sm:text-md md:text-lg text-center text-muted-foreground">
            Powerful features crafted to get the job done, easily and with
            utmost flexibility
          </p>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="md:col-span-2 w-full h-full border border-zinc-800 rounded-lg bg-zinc-900/40 p-6 space-y-4 min-h-80">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="text-zinc-400 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                  <p className="text-zinc-400 text-lg font-mono font-semibold tracking-tight">
                    Pre-built Layouts
                  </p>
                </div>
                <p className="text-zinc-300 text-sm">
                  17+ professionally designed slide layouts for every use case
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {featuredLayouts.map((layout) => (
                  <div
                    key={layout.id}
                    className="group relative bg-zinc-950/50 rounded-lg p-3 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-200 cursor-pointer"
                  >
                    {layout.preview}
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-zinc-200">
                        {layout.name}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        {layout.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <p className="text-xs text-zinc-500 font-mono">
                  +11 more layouts inside
                </p>
              </div>
            </div>

            <div className="w-full h-full border border-zinc-800 rounded-lg bg-zinc-900/40 p-6 space-y-4 min-h-80">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Palette className="text-zinc-400 size-4" />
                  <p className="text-zinc-400 text-lg font-mono font-semibold tracking-tight">
                    Themes
                  </p>
                </div>
                <p className="text-zinc-300 text-sm">
                  27+ beautiful pre-designed themes
                </p>
              </div>

              <div className="relative space-y-2 overflow-hidden">
                {featuredThemes.map((theme) => (
                  <div
                    key={theme.slug}
                    className="group relative rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-200 p-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div
                          className="w-6 h-6 rounded border border-zinc-700"
                          style={{ background: theme.backgroundColor }}
                        />
                        <div
                          className="w-6 h-6 rounded border border-zinc-700"
                          style={{ background: theme.accentColor }}
                        />
                        <div
                          className="w-6 h-6 rounded border border-zinc-700"
                          style={{ background: theme.foregroundColor }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-100 truncate">
                          {theme.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wide">
                          {theme.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-zinc-900/90 via-zinc-900/60 to-transparent flex items-end justify-center pointer-events-none pb-2">
                  <p className="text-xs text-zinc-500 font-mono">
                    +22 more inside
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border border-zinc-800 rounded-lg bg-zinc-900/40 p-6 mt-4">
            <div className="grid grid-cols-3 gap-4 px-4">
              <div className="flex flex-col  gap-2 text-zinc-400">
                <div className="flex gap-1 items-center ">
                  <Sparkles size={16} />
                  <p className="text-zinc-100 text-md">Widgets</p>
                </div>

                <p className=" text-sm tracking-widest">
                  Extensive list of widgets such as multiple cards, images,
                  charts for all the needs
                </p>
              </div>
              <div className="flex flex-col  gap-2 text-zinc-400">
                <div className="flex gap-1 items-center ">
                  <Link size={16} />
                  <p className="text-zinc-100 text-md">Share</p>
                </div>

                <p className=" text-sm tracking-widest">
                  quick share feature allowing a presentation to be viewed by
                  others.
                </p>
              </div>
              <div className="flex flex-col  gap-2 text-zinc-400">
                <div className="flex gap-1 items-center ">
                  <Presentation size={16} />
                  <p className="text-zinc-100 text-md">Present</p>
                </div>

                <p className="text-sm tracking-widest">
                  Easy in-browser present mode
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
