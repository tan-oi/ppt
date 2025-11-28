import { create } from "zustand";
import { getPresentationStore } from "./store-bridge";

interface WidgetData {
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

interface WidgetPositionChange {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UIStore {
  showAuth: boolean;
  toggleAuth: (value: boolean) => void;
  toolbarOpen: boolean;
  drawerOpen: boolean;
  selectedWidget: WidgetData | null;

  isProcessing: boolean;
  setProcessing: (processing: boolean) => void;

  updateSelectWidget: ({ slideId, id, widgetType, data }: WidgetData) => void;

  editBuffer: {
    widgetData: any;
  } | null;

  updateEditBuffer: (changes: Partial<any>) => void;
  deselectWidgetAndRemoveToolbar: () => void;
  deselectWidgetAndAddData: () => void;
  setDrawer: () => void;
  updateWidgetPosition: (changes: Partial<WidgetPositionChange>) => void;

  presentationMode: boolean;
  setPresentationMode: (mode: boolean) => void;

  currentSlideIndex: number;
  setCurrentSlideIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  toolbarOpen: false,
  drawerOpen: false,
  showAuth: false,
  editBuffer: null,
  selectedWidget: null,
  isProcessing: false,
  presentationMode: false,

  toggleAuth: (value) =>
    set((state) => ({
      showAuth: value,
    })),
  setPresentationMode: (mode) =>
    set({
      presentationMode: mode,
    }),

  currentSlideIndex: 0,

  setCurrentSlideIndex: (index) =>
    set({
      currentSlideIndex: index,
    }),

  nextSlide: () =>
    set((state) => {
      // const usePresentationStore = require("./presentation-store").default;
      // const { getPresentationStore } = require("./store-bridge");

      const totalSlides = getPresentationStore().slides.length;
      return {
        currentSlideIndex: Math.min(
          state.currentSlideIndex + 1,
          totalSlides - 1
        ),
      };
    }),

  prevSlide: () =>
    set((state) => ({
      currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0),
    })),

  setProcessing: (processing) =>
    set({
      isProcessing: processing,
    }),

  setDrawer: () =>
    set((state) => ({
      drawerOpen: !state.drawerOpen,
    })),

  updateSelectWidget: ({ slideId, id, widgetType, data }: WidgetData) => {
    const widget = getPresentationStore().getWidget(slideId, id);

    set({
      selectedWidget: {
        slideId,
        id,
        widgetType,
        data,
      },
      editBuffer: {
        widgetData: {
          ...data,
          x: widget?.position.x,
          y: widget?.position.y,
          width: widget?.position.width,
          height: widget?.position.height,
        },
      },
      toolbarOpen: true,
    });
  },

  deselectWidgetAndRemoveToolbar: () => {
    const { isProcessing } = get();

    if (isProcessing) {
      return;
    }

    set({
      selectedWidget: null,
      toolbarOpen: false,
      drawerOpen: false,
      editBuffer: null,
    });
  },

  deselectWidgetAndAddData: () => {
    const { selectedWidget, editBuffer, isProcessing } = get();

    if (isProcessing) {
      return;
    }

    if (!selectedWidget || !editBuffer?.widgetData) {
      set({
        selectedWidget: null,
        toolbarOpen: false,
        drawerOpen: false,
        editBuffer: null,
      });
      return;
    }

    const { slideId, id } = selectedWidget;

    const { position, editor, x, y, width, height, ...dataToSave } =
      editBuffer.widgetData;

    // const usePresentationStore = require("./presentation-store").default;
    // const { getPresentationStore } = require("./store-bridge");

    const currentWidget = getPresentationStore().getWidget(slideId, id);

    const dataChanged =
      JSON.stringify(currentWidget?.data) !== JSON.stringify(dataToSave);

    if (dataChanged) {
      getPresentationStore().updateWidget(slideId, id, {
        data: dataToSave,
      });
    }

    if (
      x !== undefined ||
      y !== undefined ||
      width !== undefined ||
      height !== undefined
    ) {
      const positionChanged =
        x !== currentWidget?.position.x ||
        y !== currentWidget?.position.y ||
        width !== currentWidget?.position.width ||
        height !== currentWidget?.position.height;

      if (positionChanged) {
        getPresentationStore().updateWidgetPosition(slideId, id, {
          x,
          y,
          width,
          height,
        });
      }
    }

    set({
      selectedWidget: null,
      toolbarOpen: false,
      drawerOpen: false,
      editBuffer: null,
    });
  },

  updateEditBuffer: (changes: Partial<any>) => {
    set((state) => ({
      editBuffer: {
        widgetData: {
          ...state.editBuffer?.widgetData,
          ...changes,
        },
      },
    }));
  },

  updateWidgetPosition: (changes: Partial<WidgetPositionChange>) => {
    const { editBuffer } = get();

    set((state) => ({
      editBuffer: {
        widgetData: {
          ...state.editBuffer?.widgetData,
          ...changes,
        },
      },
    }));
  },
}));
