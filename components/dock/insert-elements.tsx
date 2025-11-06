import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import {
  BarChart,
  CardSim,
  Heading,
  LineChart,
  ParkingSquareIcon,
  PieChart,
  Plus,
  Sparkle,
  AreaChart,
  Quote,
  List,
  Wand,
  LineSquiggle,
  Link,
  Forward,
  Pill,
  Image,
} from "lucide-react";
import { DraggableMenuItem } from "./draggableItems";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const elements = [
  {
    name: "Heading",
    id: "heading",
    slug: "heading",
    icon: Heading,
  },
  {
    name: "Paragraph",
    id: "paragraph",
    slug: "paragraph",
    icon: ParkingSquareIcon,
  },
  {
    name: "Basic card",
    id: "basic-card",
    slug: "basicCard",
    icon: CardSim,
  },
  {
    name: "Feature card",
    id: "feature-card",
    slug: "featureCard",
    icon: Sparkle,
  },
  {
    name: "Quotes Card",
    id: "quotes-card",
    slug: "quoteCard",
    icon: Quote,
  },
  {
    name: "List Card",
    id: "list-card",
    slug: "listCard",
    icon: List,
  },
  {
    name: "Icon Card",
    id: "icon-card",
    slug: "iconCard",
    icon: Wand,
  },
  {
    name: "Divider",
    id: "divider",
    slug: "divider",
    icon: LineSquiggle,
  },
  {
    name: "Link",
    id: "link",
    slug: "buttonLink",
    icon: Link,
  },
  {
    name: "Bar Chart",
    id: "bar-chart",
    slug: "barChart",
    icon: BarChart,
  },
  {
    name: "Line Chart",
    id: "line-chart",
    slug: "lineChart",
    icon: LineChart,
  },
  {
    name: "Area Chart",
    id: "area-chart",
    slug: "areaChart",
    icon: AreaChart,
  },
  {
    name: "Pie chart",
    id: "pie-chart",
    slug: "pieChart",
    icon: PieChart,
  },
  {
    name: "Progress bar",
    id: "progress-bar",
    slug: "progressBar",
    icon: Forward,
  },
  {
    name: "Badge/Pill",
    id: "badge-pill",
    slug: "badge",
    icon: Pill,
  },
  {
    name: "Image",
    id: "image",
    slug: "image",
    icon: Image,
  },
];

export function InsertElements() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Plus size={18} className="text-zinc-400" />
          <span className="text-sm text-zinc-300">Insert</span>
        </motion.button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            asChild
            forceMount
            sideOffset={16}
            className="h-96 w-72 p-2 border border-zinc-800 bg-zinc-900 backdrop-blur-md rounded-lg shadow-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: -8,
                transition: {
                  duration: 0.15,
                },
              }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              <DropdownMenuLabel className="text-sm text-zinc-300 flex flex-col space-y-0.5 px-2">
                <span>Insert widget</span>
                <span className="text-xs text-zinc-500">Drag to slide</span>
              </DropdownMenuLabel>

              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={
                  {
                    // hidden: {},
                    // visible: { transition: { staggerChildren: 0.15 } },
                  }
                }
              >
                <DropdownMenuSeparator className="my-2 bg-zinc-800" />
                {elements.map((el, index) => (
                  <motion.div
                    key={el.id}
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
                    transition={{
                      duration: 0.25,

                      delay: index * 0.18,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <DraggableMenuItem element={el} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
