import { create } from "zustand";
import { usePresentationStore } from "./presentation-store";

interface Position {
  // widgetX: number;
  widgetY: number;

  centerX: number;
  // centerY: number;
}

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
    | "badge";

  data: {
    editor?: any;
    chartType?: "bar" | "pie" | "line" | "area";
    position?: Position;
    [key: string]: any;
  };
}

interface UIStore {
  toolbarOpen: boolean;
  drawerOpen: boolean;
  selectedWidget: WidgetData | null;

  updateSelectWidget: ({ slideId, id, widgetType, data }: WidgetData) => void;

  editBuffer: any | null;
  updateEditBuffer: (changes: any) => void;
  deselectWidgetAndRemoveToolbar: () => void;
  deselectWidgetAndAddData: () => void;
  setDrawer: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  toolbarOpen: false,
  drawerOpen: false,
  editBuffer: null,
  selectedWidget: null,

  setDrawer: () =>
    set((state) => ({
      drawerOpen: !state.drawerOpen,
    })),

  updateSelectWidget: ({ slideId, id, widgetType, data }) =>
    set({
      selectedWidget: {
        slideId,
        id,
        widgetType,
        data,
      },
      editBuffer: { data },
      toolbarOpen: true,
      // drawerOpen: type === "drawer" ? true : false,
    }),

  deselectWidgetAndRemoveToolbar: () => {
    const { editBuffer } = get();
    set({
      selectedWidget: null,
      toolbarOpen: false,
      drawerOpen: false,
      editBuffer: null,
    });
  },

  deselectWidgetAndAddData: () => {
    const { selectedWidget, editBuffer } = get();
    const slideId = selectedWidget?.slideId;
    const widgetId = selectedWidget?.id;

    console.log(selectedWidget);
    console.log(editBuffer);

    if (editBuffer.widgetData) {
      usePresentationStore
        .getState()
        .updateWidget(slideId as string, widgetId as string, {
          data: editBuffer.widgetData,
        });
    }

    set({
      selectedWidget: null,
      toolbarOpen: false,
      drawerOpen: false,
      editBuffer: null,
    });
  },

  updateEditBuffer: (changes: any) =>
    set((state) => ({
      editBuffer: {
        ...state.editBuffer,
        ...changes,
      },
    })),
}));
