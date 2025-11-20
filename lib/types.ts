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

