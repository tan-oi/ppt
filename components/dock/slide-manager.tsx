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
import { Button } from "../ui/button";
import { usePresentationStore } from "@/lib/store/presentation-store";

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
  {
    //left only.
    
    name: "Duplicate slide",
    slug: "duplicate-slide",
    icon: LucideCopy,
    about: "Duplicate the current slide",
  },
] as const;

type SlideSlug = (typeof slideOptions)[number]["slug"];

export function SlideManager() {
  const [activeView, setActiveView] = useState<"main" | "template">("main");

  const handleSelect = (slug: SlideSlug, event: Event) => {
    if (slug === "add-template-slide") {
      event.preventDefault(); // Prevent dropdown from closing
      setActiveView("template");
    } else {
      if (slug === "add-blank-slide") {
        const id = usePresentationStore.getState().addSlideAfterCurrent();
        console.log("we're here.");

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
        <button className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors">
          <Layers size={18} className="text-zinc-400" />
          <span className="text-sm text-zinc-300">Slides</span>
        </button>
      </DropdownMenuTrigger>

      {activeView === "main" ? (
        <DropdownMenuContent
          sideOffset={16}
          className="w-72 overflow-y-hidden p-4 border-none bg-zinc-900/95 backdrop-blur-md rounded-xl"
        >
          <TooltipProvider delayDuration={200}>
            {slideOptions.map((option) => (
              <Tooltip key={option.slug}>
                <TooltipTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(event) => handleSelect(option.slug, event)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <option.icon size={16} className="text-zinc-400" />
                    <span className="text-sm text-zinc-200">{option.name}</span>
                  </DropdownMenuItem>
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
          className="w-md overflow-y-hidden p-4 border-none bg-zinc-900/95 backdrop-blur-md rounded-xl"
        >
          <Button
            variant={"ghost"}
            onClick={(event) => {
              event.preventDefault();
              setActiveView("main");
            }}
            className="flex justify-start items-center gap-2 cursor-pointer mb-2 border-b border-zinc-800 w-full border-none "
          >
            <ArrowLeft size={16} className="text-zinc-400" />
            <span className="text-sm text-zinc-200">Back</span>
          </Button>

          <div className="grid grid-cols-2 gap-2 w-full">
            {templates.map((item, i) => (
              <button
                onClick={() => {
                  const id = usePresentationStore
                    .getState()
                    .addSlideAfterCurrent(item.id);

                  console.log(id);
                  console.log("eventually works");
                }}
                key={item.id}
                className="group hover:ring hover:ring-zinc-500 flex rounded flex-col bg-zinc-800 gap-2 p-2 cursor-pointer"
              >
                {item.preview}
                <p className="text-xs text-zinc-300 font-light font-sans group-hover:font-semibold">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
