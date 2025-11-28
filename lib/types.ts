export interface Presentation {
  id: string;
  topic: string;
  outlineId: string | null;
  updatedAt: Date;
  isShared: boolean;
  createdAt: Date;
  userId: string;
  isModified: boolean;
  theme: string;
  _count: {
    slides: number;
  };
}

export interface PresentationListProps {
  initialPresentations: Presentation[];
}

/* Widget types */
export interface WidgetData {
  slideId: string;
  id: string;
  widgetType:
    | "text"
    | "feature"
    | "quote"
    | "list"
    | "table"
    | "stat"
    | "chart"
    | "image"
    | "basic"
    | "link"
    | "divider"
    | "badge"
    | "progress"
    | "icon";
  data: any;
}

export interface WidgetPositionChange {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Slide {
  id: string;
  slideNumber: number;
  heading: string;
  widgets: {
    [widgetId: string]: WidgetData;
  };
  theme: string;
}

/* charts */
export type RowData = Record<string, string | number>;

export type Data = {
  data: RowData[];
  chartType: "bar" | "line" | "area" | "pie";
};

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
  }
>;

export interface ChartTableProps {
  data: RowData[];
  config?: ChartConfig;
  xKey?: string;
  type: "bar" | "area" | "line" | "pie";
}

export interface EditingCell {
  row: number;
  col: string;
}

export interface BaseChartRenderProps {
  type: "bar" | "area" | "line" | "pie";
  data?: any;
  id: string;
  className?: string;
  slideId: string;
  config?: any;
  xKey?: string;
}

export interface PieChartProps {
  chartConfig: any;
  chartData: any;
  xKeyToUse : string;
}

export interface BarChartProps {
  chartConfig: any;
  chartData: any;
  xKeyToUse: string | null;
}
