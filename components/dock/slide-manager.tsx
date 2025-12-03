import {
  Layers,
  LayoutTemplate,
  LucideCopy,
  Plus,
  Trash,
  ArrowLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";
import { usePresentationStore } from "@/lib/store/presentation-store";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const templates = [
  {
    id: "free-context",
    name: "Free-Fall",
    description: "no specific position",
    layoutType: "Only Text",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2">
        <div className="w-full h-full border-2 border-dashed border-zinc-600 rounded" />
      </div>
    ),
  },
  {
    id: "main-pointer",
    name: "Focused Paragraph",
    description:
      "One large paragraph block for important concise explanation or storytelling",
    layoutType: "Only Text",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-3 flex items-center justify-center">
        <div className="w-4/5 space-y-1">
          <div className="w-full h-1.5 bg-zinc-600 rounded" />
          <div className="w-full h-1.5 bg-zinc-600 rounded" />
          <div className="w-3/4 h-1.5 bg-zinc-600 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "heading-paragraph",
    name: "Heading & Details",
    description: "Prominent heading with a supporting paragraph beneath",
    layoutType: "Only Text",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col justify-center items-center gap-1.5">
        <div className="w-1/2 h-2.5 bg-zinc-600 rounded" />
        <div className="w-full space-y-1 flex flex-col items-center">
          <div className="w-full h-1 bg-zinc-700 rounded" />
          <div className="w-full h-1 bg-zinc-700 rounded" />
          <div className="w-2/3 h-1 bg-zinc-700 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "two-column",
    name: "2 pointers",
    description: "Two parallel columns for side-by-side comparison or lists",
    layoutType: "Only Text",
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
    id: "three-sections",
    name: "Triple Section Layout",
    description:
      "Three evenly spaced sections for structured, segmented content",
    layoutType: "Only Text",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex items-center justify-center gap-1.5">
        <div className="flex-1 space-y-1">
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
          <div className="w-full h-1 bg-zinc-600 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "title",
    name: "Hero Title Slide",
    description: "Main title and subtitle for impactful introduction",
    layoutType: "Only Text",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col justify-center items-center gap-1.5">
        <div className="w-3/4 h-3 bg-zinc-600 rounded" />
        <div className="w-1/2 h-1.5 bg-zinc-700 rounded" />
      </div>
    ),
  },
  {
    id: "chart-with-title",
    name: "Chart Showcase",
    description: "Large chart with title for data visualization focus",
    layoutType: "Chart",
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
    id: "chart-comparison",
    name: "Side-by-Side Charts",
    description: "Compare two charts or datasets directly",
    layoutType: "Chart",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex gap-2">
        <div className="flex-1 bg-zinc-700 rounded flex items-end justify-around px-1.5 pb-1">
          <div
            className="w-1/4 bg-zinc-500 rounded-t"
            style={{ height: "45%" }}
          />
          <div
            className="w-1/4 bg-zinc-500 rounded-t"
            style={{ height: "70%" }}
          />
          <div
            className="w-1/4 bg-zinc-500 rounded-t"
            style={{ height: "55%" }}
          />
        </div>
        <div className="flex-1 bg-zinc-700 rounded flex items-end justify-around px-1.5 pb-1">
          <div
            className="w-1/4 bg-zinc-500 rounded-t"
            style={{ height: "60%" }}
          />
          <div
            className="w-1/4 bg-zinc-500 rounded-t"
            style={{ height: "40%" }}
          />
          <div
            className="w-1/4 bg-zinc-500 rounded-t"
            style={{ height: "75%" }}
          />
        </div>
      </div>
    ),
  },
  {
    id: "image-caption",
    name: "Image with Caption",
    description: "Large centered image with descriptive caption below",
    layoutType: "Image",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col items-center gap-1">
        <div className="w-3/4 flex-1 bg-zinc-600 rounded" />
        <div className="w-2/3 h-1 bg-zinc-700 rounded" />
        <div className="w-1/2 h-1 bg-zinc-700 rounded" />
      </div>
    ),
  },
  {
    id: "two-media-paragraph",
    name: "2 Media + Paragraph",
    description: "Two media blocks with supporting paragraphs",
    layoutType: "Image",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex-1 bg-zinc-600 rounded" />
          <div className="space-y-1">
            <div className="h-2 bg-zinc-700 rounded" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <div className="flex-1 bg-zinc-600 rounded" />
          <div className="space-y-1">
            <div className="h-2 bg-zinc-700 rounded" />
          </div>
        </div>
      </div>
    ),
  },

  {
    id: "image-text-split",
    name: "Image & Text Split",
    description: "Image on left, explanatory text on right",
    layoutType: "Mixed",
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
    id: "four-quadrants",
    name: "Four Quadrants",
    description: "Four equal sections for balanced feature comparison",
    layoutType: "Only Text",
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
  {
    id: "header-three-cards",
    name: "Header + 3 Cards",
    description: "Main heading followed by three feature cards",
    layoutType: "Only Text",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col gap-1.5">
        <div className="w-1/2 h-2 bg-zinc-600 rounded mx-auto" />
        <div className="flex-1 flex gap-1.5">
          <div className="flex-1 bg-zinc-700 rounded" />
          <div className="flex-1 bg-zinc-700 rounded" />
          <div className="flex-1 bg-zinc-700 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "big-number",
    name: "Big Stat Display",
    description: "Emphasize a key metric or statistic with context",
    layoutType: "Only Text",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col items-center justify-center gap-1.5">
        <div className="w-1/3 h-5 bg-zinc-600 rounded" />
        <div className="w-2/3 h-1 bg-zinc-700 rounded" />
        <div className="w-1/2 h-1 bg-zinc-700 rounded" />
      </div>
    ),
  },
  {
    id: "text-over-image",
    name: "Hero with Overlay",
    description: "Text overlaid on background image for dramatic effect",
    layoutType: "Mixed",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 relative">
        <div className="absolute inset-2 bg-zinc-600 rounded" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
          <div className="w-1/2 h-2.5 bg-zinc-400 rounded" />
          <div className="w-1/3 h-1 bg-zinc-500 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "split-content-chart",
    name: "Content + Chart",
    description: "Text explanation alongside supporting chart",
    layoutType: "Mixed",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col gap-1">
        <div className="w-1/3 h-1.5 bg-zinc-600 rounded" />
        <div className="flex-1 flex gap-2">
          <div className="w-1/2 space-y-1 flex flex-col justify-center">
            <div className="w-full h-1 bg-zinc-600 rounded" />
            <div className="w-full h-1 bg-zinc-600 rounded" />
            <div className="w-3/4 h-1 bg-zinc-600 rounded" />
          </div>
          <div className="w-1/2 bg-zinc-700 rounded flex items-end justify-around px-2 pb-1">
            <div
              className="w-1/5 bg-zinc-500 rounded-t"
              style={{ height: "50%" }}
            />
            <div
              className="w-1/5 bg-zinc-500 rounded-t"
              style={{ height: "70%" }}
            />
            <div
              className="w-1/5 bg-zinc-500 rounded-t"
              style={{ height: "60%" }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "vertical-timeline",
    name: "Step-by-Step Timeline",
    description: "Three sequential steps or timeline items",
    layoutType: "Only Text",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 flex flex-col gap-1">
        <div className="w-1/3 h-1.5 bg-zinc-600 rounded" />
        <div className="flex-1 flex flex-col justify-around gap-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-zinc-600 rounded-full flex-shrink-0" />
            <div className="flex-1 h-1 bg-zinc-700 rounded" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-zinc-600 rounded-full flex-shrink-0" />
            <div className="flex-1 h-1 bg-zinc-700 rounded" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-zinc-600 rounded-full flex-shrink-0" />
            <div className="flex-1 h-1 bg-zinc-700 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "quote-highlight",
    name: "Quote Highlight",
    description: "Large centered quote with attribution",
    layoutType: "Text Focus",
    preview: (
      <div className="w-full h-20 bg-zinc-800 rounded border border-zinc-700 p-2 relative flex flex-col justify-center items-center text-center">
        <div className="absolute -top-1 left-2 w-3 h-3 rotate-180 border-t border-l border-zinc-600 rounded-sm" />
        <div className="w-3/4 h-2 bg-zinc-600 rounded mb-1" />
        <div className="w-1/3 h-1 bg-zinc-700 rounded" />
        <div className="absolute -bottom-1 right-2 w-3 h-3 border-b border-r border-zinc-600 rounded-sm" />
      </div>
    ),
  },
];

const slideOptions = [
  {
    name: "Add blank slide",
    slug: "add-blank-slide",
    icon: Plus,
    about: "Add a new blank slide below the current one",
  },
  {
    name: "Add from templates",
    slug: "add-template-slide",
    icon: LayoutTemplate,
    about: "Add a new slide with specific template",
  },
  {
    name: "Delete slide",
    slug: "delete-slide",
    icon: Trash,
    about: "Delete the current slide",
  },
  // {
  //   //left only.

  //   name: "Duplicate slide",
  //   slug: "duplicate-slide",
  //   icon: LucideCopy,
  //   about: "Duplicate the current slide",
  // },
] as const;

type SlideSlug = (typeof slideOptions)[number]["slug"];

export function SlideManager() {
  const [activeView, setActiveView] = useState<"main" | "template">("main");

  const handleSelect = (slug: SlideSlug, event: Event) => {
    if (slug === "add-template-slide") {
      event.preventDefault();
      setActiveView("template");
    } else {
      if (slug === "add-blank-slide") {
        const id = usePresentationStore.getState().addSlideAfterCurrent();
        toast.success("Slide added, please scroll below");
        console.log(id);
      } else if (slug === "delete-slide") {
        const currentslide = usePresentationStore.getState().currentSlide;

        usePresentationStore.getState().deleteSlide(currentslide as string);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors"
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.15,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Layers size={18} className="text-zinc-400" />
          <span className="text-sm text-zinc-300">Slides</span>
        </motion.button>
      </DropdownMenuTrigger>

      {activeView === "main" ? (
        <DropdownMenuContent
          sideOffset={16}
          className="w-64 overflow-y-hidden p-2 border-none bg-zinc-900/95 backdrop-blur-md rounded-md"
        >
          <TooltipProvider delayDuration={200}>
            {slideOptions.map((option, index) => (
              <Tooltip key={option.slug}>
                <TooltipTrigger asChild>
                  <motion.div
                    variants={{
                      hidden: {
                        x: -8,
                        opacity: 0,
                        scale: 0.95,
                        filter: "blur(4px)",
                      },
                      visible: {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      duration: 0.25,
                      delay: index * 0.05,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <DropdownMenuItem
                      onSelect={(event) => handleSelect(option.slug, event)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <option.icon size={16} className="text-zinc-400" />
                      <span className="text-sm text-zinc-200">
                        {option.name}
                      </span>
                    </DropdownMenuItem>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs max-w-[200px]">
                  {option.about}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent
          sideOffset={16}
          className="w-md overflow-y-hidden p-2 border-none bg-zinc-900/95 backdrop-blur-md rounded-xl"
        >
          <button
            onClick={(event) => {
              event.preventDefault();
              setActiveView("main");
            }}
            className="flex p-2 justify-start items-center gap-2 cursor-pointer mb-2 border-b border-zinc-800 border-none hover:underline"
          >
            <ArrowLeft size={16} className="text-zinc-400" />
            <span className="text-sm text-zinc-200">Back</span>
          </button>

          <DropdownMenuSeparator className="w-full" />

          <div className="grid grid-cols-2 gap-2 p-2 w-full max-h-[400px] overflow-y-scroll">
            {templates.map((item, index) => (
              <motion.button
                onClick={() => {
                  const id = usePresentationStore
                    .getState()
                    .addSlideAfterCurrent(item.id);

                  toast.success("Slide added");
                }}
                key={item.id}
                className="group hover:ring hover:ring-zinc-500 flex rounded flex-col bg-zinc-800 gap-2 p-2 cursor-pointer"
                variants={{
                  hidden: {
                    x: -8,
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(10px)",
                  },
                  visible: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  },
                }}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 0.25,
                  delay: index * 0.05,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {item.preview}
                <p className="text-xs text-zinc-300 font-light font-sans group-hover:font-semibold">
                  {item.name}
                </p>
              </motion.button>
            ))}
          </div>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
