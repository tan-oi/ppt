// import { create } from "zustand";

import { nanoid } from "nanoid";
import { create } from "zustand";
import { DEFAULT_POSITIONS } from "../config/slide";

// interface WidgetData {
//   // slideIndex: number;
//   id: string;
//   data: any;
//   // type: "editoral" | "drawer";
//   position: {
//     x: number;
//     y: number;
//     height: number;
//     width: number;
//   };
//   widgetType?: string;
//   slideId: string;
// }

// interface Slide {
//   id: string;
//   // widget: WidgetData[];
//   background?: string;
//   slideNumber: number;
//   heading?: string;
//   layoutId: string;
//   widgetIds: string[];
// }

// interface PresentationState {
//   type: "llm" | "db";
//   setType: (type: "llm" | "db") => void;
//   currentSlideIndex: number;
//   currentWidgetId: string;
//   slides: Slide[] | [];
//   setCurrentSlide: (id: number) => void;
//   addSlide: (slide: Slide) => void;
//   deleteSlide: (slide: Slide) => void;
//   widgets: WidgetData[] | [];
//   addWidget: (
//     data: Omit<WidgetData, "slideId"> | null,
//     slideId: string,
//     widgetId: string
//   ) => void;
//   getWidget: (id: string) => WidgetData | null;
// }

// export const usePresentationStore = create<PresentationState>((set, get) => ({
//   widgets: [],
//   type: "db",
//   setType: (type) =>
//     set({
//       type,
//     }),
//   currentSlideIndex: 1,
//   currentWidgetId: "",
//   slides: [],

//   addSlide: (slide) =>
//     set((state) => ({
//       slides: [...state.slides, slide],
//     })),

//   deleteSlide: (slide) => set({}),

//   addWidget: (data, slideId, widgetId) =>
//     set((state) => ({
//       widgets: [
//         ...state.widgets,
//         {
//           id: widgetId,
//           data: data?.data,
//           position: data.position,
//           widgetType: data?.widgetType,
//           slideId: slideId,
//         },
//       ],
//     })),
//   setCurrentSlide: (id) => set({ currentSlideIndex: id }),

//   getWidget: (widgetId: string) => {
//     return get().widgets.find((w) => w.id === widgetId) || null;
//   },
// }));

interface WidgetData {
  id: string;
  widgetType: string;
  data: any;
  position: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

interface Slide {
  id: string;
  slideNumber: number;
  heading: string;
  widgets: {
    [widgetId: string]: WidgetData;
  };
}

interface PresentationState {
  type: "llm" | "db";
  setType: (type: "llm" | "db") => void;

  currentSlide?: string;
  setCurrentSlide: (slideId: string) => void;

  topic?: string;
  setTopic?: (topic: string) => void;

  slides: Slide[] | [];
  addSlide: (slide: Slide) => void;

  deleteSlide: (slideId: string) => void;

  addWidget: (
    slideId: string,
    widgetType: string,
    position?: Partial<WidgetData["position"]>
  ) => string;

  updateWidget: (
    slideId: string,
    widgetId: string,
    updates: Partial<WidgetData>
  ) => void;

  deleteWidget: (slideId: string, widgetId: string) => void;
  getWidget: (slideId: string, widgetId: string) => WidgetData | null;
}

export const usePresentationStore = create<PresentationState>((set, get) => ({
  type: "db",
  setType: (type) =>
    set({
      type: type,
    }),
  slides: [],
  setCurrentSlide: (slideId) =>
    set({
      currentSlide: slideId,
    }),
  setTopic: (topic: string) =>
    set({
      topic: topic,
    }),

  addSlide: (slide) =>
    set((state) => ({
      slides: [...state.slides, slide],
    })),

  deleteSlide: (slideId) =>
    set((state) => ({
      slides: state.slides.filter((slide) => slide.id !== slideId),
    })),

  addWidget: (slideId, widgetType, position) => {
    const widgetId = nanoid(7);
    const defaultConfig = DEFAULT_POSITIONS[widgetType];
    console.log(position);
    console.log(defaultConfig);

    const finalPosition = { ...defaultConfig, ...position };

    console.log(finalPosition);
    const widget: WidgetData = {
      id: widgetId,
      widgetType,
      data: null,
      position: {
        ...defaultConfig,
        ...position,
      },
    };

    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === slideId
          ? { ...slide, widgets: { ...slide.widgets, [widgetId]: widget } }
          : slide
      ),
    }));

    return widgetId;
  },

  updateWidget: (slideId, widgetId, updates) =>
    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              widgets: {
                ...slide.widgets,
                [widgetId]: { ...slide.widgets[widgetId], ...updates },
              },
            }
          : slide
      ),
    })),

  deleteWidget: (slideId, widgetId) =>
    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              widgets: Object.fromEntries(
                Object.entries(slide.widgets).filter(([id]) => id !== widgetId)
              ),
            }
          : slide
      ),
    })),

  getWidget: (slideId, widgetId) => {
    const slide = get().slides.find((s) => s.id === slideId);
    return slide?.widgets[widgetId] || null;
  },
}));
