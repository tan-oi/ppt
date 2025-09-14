import { create } from "zustand";

interface WidgetData {
  slideIndex: number;
  id: string;
  data: any;
  type: "editoral" | "drawer";
  position: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

interface Slide {
  id: string;
  widget: WidgetData[];
  background?: string;
  orderNumber: number;
}

interface PresentationState {
  currentSlideIndex: number;
  currentWidgetId: string;
  slides: Slide[] | [];
  setCurrentSlide: (id: number) => void;
  addSlide: (slide: Slide) => void;
  deleteSlide: (slide: Slide) => void;

  addWidget: (data: WidgetData) => void;
}

export const usePresentationStore = create<PresentationState>((set) => ({
  currentSlideIndex: 1,
  currentWidgetId: "",
  slides: [],
  addSlide: (slide) => set({}),

  deleteSlide: (slide) => set({}),

  addWidget: (data) => set({}),
  setCurrentSlide: (id) => set({ currentSlideIndex: id }),


  // getWidget : (slideId, widgetId) => ({
  //   return {
      
  //   }
  // })
}));
