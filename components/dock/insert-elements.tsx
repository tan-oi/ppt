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
import { motion } from "motion/react";

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
    name: "link",
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors">
          <Plus size={18} className="text-zinc-400" />
          <span className="text-sm text-zinc-300">Insert</span>
        </button>
      </DropdownMenuTrigger>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <DropdownMenuContent
          sideOffset={16}
          className="h-96 w-72 p-2 border border-zinc-800 bg-zinc-900 backdrop-blur-md rounded-lg shadow-xl"
        >
          <DropdownMenuLabel className="text-sm text-zinc-300 flex flex-col space-y-0.5 px-2">
            <span>Insert widget</span>
            <span className="text-xs text-zinc-500">Drag to slide</span>
          </DropdownMenuLabel>

          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.03 } },
            }}
          >
            <DropdownMenuSeparator className="my-2 bg-zinc-800" />
            {elements.map((el) => (
              <motion.div
                key={el.id}
                variants={{
                  hidden: { y: 8, opacity: 0, scale: 0.95 },
                  visible: { y: 0, opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <DraggableMenuItem element={el} />
              </motion.div>
            ))}
          </motion.div>
        </DropdownMenuContent>
      </motion.div>
    </DropdownMenu>
  );
}
