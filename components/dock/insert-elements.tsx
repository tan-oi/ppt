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
} from "lucide-react";
import { DraggableMenuItem } from "./draggableItems";
export function InsertElements() {
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
  ];
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 py-2 px-3 hover:bg-white/10 rounded-lg transition-colors">
            <Plus size={18} className="text-zinc-400" />
            <span className="text-sm text-zinc-300">Insert</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={16}
          className="h-108 w-xs p-2 overflow-y-auto border border-zinc-800 bg-zinc-900/90 backdrop-blur-md rounded-lg shadow-xl w-80"
        >
          <DropdownMenuLabel className="text-sm text-zinc-300 flex flex-col space-y-0.5 px-2">
            <span>Insert Widget</span>
            <span className="text-xs text-zinc-500">Drag to slide</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 bg-zinc-800" />
          {elements.map((element) => (
            <DraggableMenuItem key={element.id} element={element} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
