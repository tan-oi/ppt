import { create } from "zustand";

interface WidgetData {
  slideIndex: number;
  id: string;
  data: any;
  type: "editoral" | "drawer";
}

interface UIStore {
  toolbarOpen: boolean;
  drawerOpen: boolean;
  selectedWidget: WidgetData | null;

  updateSelectWidget: ({ slideIndex, id, data, type }: WidgetData) => void;

  editBuffer: any | null;
  updateEditBuffer: (changes: any) => void;
  deselectWidget: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  toolbarOpen: false,
  drawerOpen: false,
  editBuffer: null,
  selectedWidget: null,

  updateSelectWidget: ({ slideIndex, id, data, type }) =>
    set({
      selectedWidget: {
        slideIndex,
        id,
        data,
        type,
      },
      editBuffer: { data },
      toolbarOpen: type === "editoral" ? true : false,
      drawerOpen: type === "drawer" ? true : false,
    }),

  deselectWidget: () =>
    set({
      selectedWidget: null,
      toolbarOpen: false,
      drawerOpen: false,
    }),

  updateEditBuffer: (changes: any) =>
    set((state) => ({
      editBuffer: {
        ...state.editBuffer,
        ...changes,
      },
    })),
}));
