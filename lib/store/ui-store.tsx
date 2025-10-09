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

interface UIStore {
  toolbarOpen: boolean;
  drawerOpen: boolean;
  selectedWidget: WidgetData | null;

  updateSelectWidget: ({ slideId, id, widgetType, data }: WidgetData) => void;

  editBuffer: {
    widgetData: any;
  } | null;

  updateEditBuffer: (changes: Partial<any>) => void;
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
      editBuffer: {
        widgetData: { ...data },
      },
      toolbarOpen: true,
    }),

  deselectWidgetAndRemoveToolbar: () => {
    set({
      selectedWidget: null,
      toolbarOpen: false,
      drawerOpen: false,
      editBuffer: null,
    });
  },

  deselectWidgetAndAddData: () => {
    const { selectedWidget, editBuffer } = get();

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

    const { position, editor, ...dataToSave } = editBuffer.widgetData;

    usePresentationStore.getState().updateWidget(slideId, id, {
      data: dataToSave,
    });

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
}));
