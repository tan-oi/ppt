import { create } from "zustand";

interface WidgetData {
  // slideIndex: number;
  id: string;
  data: any;
  // type: "editoral" | "drawer";
  position: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  widgetType ? : string;
}

interface Slide {
  id: string;
  // widget: WidgetData[];
  background?: string;
  slideNumber: number;
  heading? : string;
  layoutId : string;
  widgetIds : string[]
}

interface PresentationState {
  type: "llm" | "db";
  setType: (type: "llm" | "db") => void;
  currentSlideIndex: number;
  currentWidgetId: string;
  slides: Slide[] | [];
  setCurrentSlide: (id: number) => void;
  addSlide: (slide: Slide) => void;
  deleteSlide: (slide: Slide) => void;
  widgets: WidgetData[] | [];
  addWidget: (data: WidgetData, slideId: string, widgetId: string) => void;
  getWidget : (id : string) => WidgetData | null;
}

export const usePresentationStore = create<PresentationState>((set,get) => ({
  widgets: [], 
  type: "db",
  setType: (type) =>
    set({
      type,
    }),
  currentSlideIndex: 1,
  currentWidgetId: "",
  slides: [],

  addSlide: (slide) =>
    set((state) => ({
      slides: [...state.slides, slide],
    })),

  deleteSlide: (slide) => set({}),

  addWidget: (data, slideId, widgetId) =>
    set((state) => ({
      widgets: [
        ...state.widgets,
        {
          id: widgetId,
          data: data.data,
          position: data.position,
          widgetType : data.widgetType
        },
      ],
    })),
  setCurrentSlide: (id) => set({ currentSlideIndex: id }),

  getWidget: (widgetId: string) => {
    return get().widgets.find((w) => w.id === widgetId) || null;
  },
}));
