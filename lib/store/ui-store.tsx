import { create } from "zustand";
import { usePresentationStore } from "./presentation-store";

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
}

export const useUIStore = create<UIStore>((set, get) => ({
  toolbarOpen: false,
  drawerOpen: false,
  editBuffer: null,
  selectedWidget: null,
  isProcessing: false,

  setProcessing: (processing) =>
    set({
      isProcessing: processing,
    }),

  setDrawer: () =>
    set((state) => ({
      drawerOpen: !state.drawerOpen,
    })),

  updateSelectWidget: ({ slideId, id, widgetType, data }: WidgetData) => {
    const widget = usePresentationStore.getState().getWidget(slideId, id);

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
      console.log("Processing");
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
      console.log(" Processing ");
      return;
    }

    console.log("yeah");

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

    console.log(editBuffer);
    usePresentationStore.getState().updateWidget(slideId, id, {
      data: dataToSave,
    });

    if (
      x !== undefined ||
      y !== undefined ||
      width !== undefined ||
      height !== undefined
    ) {
      usePresentationStore.getState().updateWidgetPosition(slideId, id, {
        x,
        y,
        width,
        height,
      });
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
    console.log(changes);
    console.log(editBuffer);
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
