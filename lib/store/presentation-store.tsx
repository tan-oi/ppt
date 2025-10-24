import { nanoid } from "nanoid";
import { create } from "zustand";
import { SLIDE_CONFIG } from "../config/slide";
import { LayoutRegistry } from "../registry/layout";
import { createWidgetsFromSlots } from "@/components/slideUtils";
import { WidgetRegistry } from "../registry/widget";

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
  theme: string;
}

interface PresentationState {
  theme?: string;
  setTheme: (theme: string) => void;
  type: "llm" | "db";
  setType: (type: "llm" | "db") => void;

  currentSlide?: string;
  setCurrentSlide: (slideId: string) => void;

  topic?: string;
  setTopic?: (topic: string) => void;

  slides: Slide[] | [];
  addSlide: (slide: Slide) => void;
  addSlideAfterCurrent: (slug?: string) => string;
  deleteSlide: (slideId: string) => void;

  addWidget: (
    slideId: string,
    widgetType: string,
    defaultData?: any,
    position?: Partial<WidgetData["position"]>
  ) => string;

  updateWidget: (
    slideId: string,
    widgetId: string,
    updates: Partial<WidgetData>
  ) => void;

  updateWidgetPosition: (
    slideId: string,
    widgetId: string,
    position: {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
    }
  ) => void;
  deleteWidget: (slideId: string, widgetId: string) => void;
  getWidget: (slideId: string, widgetId: string) => WidgetData | null;
  updateSlideTheme: (slideId: string, theme: string) => void;

  clearPresentation: () => void;
  resetStore: () => void;
}

export const usePresentationStore = create<PresentationState>((set, get) => ({
  theme: "starter",
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

  addSlideAfterCurrent: (layoutSlug) => {
    const { slides, currentSlide, theme } = get();
    const currentIndex = slides.findIndex((s) => s.id === currentSlide);

    const newSlide: Slide = {
      id: nanoid(10),
      slideNumber: 0,
      heading: "",
      widgets: {},
      theme: theme || "starter",
    };

    const newSlides = [...slides];
    console.log(newSlides);
    const insertAt = currentIndex >= 0 ? currentIndex + 1 : slides.length;
    newSlides.splice(insertAt, 0, newSlide);

    set({
      slides: newSlides,
      currentSlide: newSlide.id,
    });

    if (layoutSlug && LayoutRegistry[layoutSlug]) {
      const layout = LayoutRegistry[layoutSlug];

      const positions = createWidgetsFromSlots(
        layout.slots,
        SLIDE_CONFIG.width,
        SLIDE_CONFIG.height,
        SLIDE_CONFIG.columns,
        SLIDE_CONFIG.rows
      );

      positions.forEach((pos) => {
        const slot = layout.slots.find((s) => s.id === pos.id);
        if (!slot) return;

        let widgetType = "paragraph";

        for (const [slug, widget] of Object.entries(WidgetRegistry)) {
          if (widget.component === slot.defaultComponent) {
            widgetType = slug;
            break;
          }
        }

        const defaultData = WidgetRegistry[widgetType]?.defaultData || null;

        get().addWidget(
          newSlide.id,
          widgetType,
          { x: pos.x, y: pos.y, width: pos.width, height: pos.height },
          defaultData
        );
      });
    }

    return newSlide.id;
  },

  deleteSlide: (slideId) =>
    set((state) => ({
      slides: state.slides.filter((slide) => slide.id !== slideId),
    })),

  addWidget: (slideId, widgetType, position, defaultData) => {
    const widgetId = nanoid(7);
    const widgetConfig = WidgetRegistry[widgetType];
    const defaultPosition = widgetConfig?.defaultPosition || {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    };

    console.log(widgetType);
    const widget: WidgetData = {
      id: widgetId,
      widgetType,
      data: defaultData ?? widgetConfig?.defaultData ?? null,
      position: {
        ...defaultPosition,
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

  updateWidgetPosition: (slideId, widgetId, position) =>
    set((state) => ({
      slides: state.slides.map((slide) => {
        if (slide.id !== slideId) return slide;

        return {
          ...slide,
          widgets: {
            ...slide.widgets,
            [widgetId]: {
              ...slide.widgets[widgetId],
              position: {
                ...slide.widgets[widgetId].position,
                ...position,
              },
            },
          },
        };
      }),
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

  setTheme: (theme) =>
    set({
      theme: theme,
    }),

  updateSlideTheme: (slideId: string, theme: string) => {
    console.log(slideId);
    console.log(theme);

    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === slideId ? { ...slide, theme } : slide
      ),
    }));
  },

  clearPresentation: () =>
    set({
      slides: [],
      currentSlide: undefined,
      topic: undefined,
    }),
  resetStore: () =>
    set({
      theme: undefined,
      type: "db",
      currentSlide: undefined,
      topic: undefined,
      slides: [],
    }),
}));
