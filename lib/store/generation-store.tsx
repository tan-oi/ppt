import { create } from "zustand";
import { LayoutRegistry } from "../registry/layout";

export const COMPONENT_TO_TYPE: Record<string, string> = {
  HeadingWidget: "heading",
  ParagraphWidget: "paragraph",
  FeatureCardWidget: "card",
  QuoteCard: "quote",
  BasicCard: "card",
  ListCard: "paragraph",
  BaseChartRender: "chart",
  ImageWidget: "image",
};

export const TYPE_TO_WIDGET: Record<string, string> = {
  heading: "heading",
  paragraph: "paragraph",
  card: "featureCard",
  quote: "quoteCard",
  chart: "barChart",
  image: "image",
};
type GenType = "prompt" | "text" | "link";
export type PresentationTone =
  | "professional"
  | "creative"
  | "casual"
  | "academic"
  | "inspirational"
  | "minimalist";

interface GenerationInterface {
  userInstruction: string;
  setUserInstruction: (data: string) => void;
  generateType: GenType;
  setGenerateType: (type: GenType) => void;
  slidesCount: number;
  setSlidesCount: (count: number) => void;
  result: string | null;
  setResult: (data: string | null) => void;
  writeStyle: "base" | "extend" | "preserve";
  setWriteStyle: (style: "base" | "extend" | "preserve") => void;
  tone: PresentationTone;

  setTone: (tone: PresentationTone) => void;
  id: null | string;
  setId: (id: string) => void;

  processedOutline: string | null;
  prepareForLLM: () => void;
}

export const useGenerationStore = create<GenerationInterface>((set, get) => ({
  id: null,
  setId: (id) =>
    set({
      id: id,
    }),
  writeStyle: "extend",
  setWriteStyle: (style) =>
    set({
      writeStyle: style,
    }),
  userInstruction: "",
  result: null,
  setResult: (data) =>
    set({
      result: data,
    }),
  setUserInstruction: (data) =>
    set({
      userInstruction: data,
    }),
  generateType: "prompt",
  setGenerateType: (type) =>
    set({
      generateType: type,
    }),
  tone: "professional",
  setTone: (tone) =>
    set({
      tone,
    }),
  slidesCount: 1,
  setSlidesCount: (count) =>
    set({
      slidesCount: count,
    }),

  processedOutline: null,
  prepareForLLM: () => {
    const outlines = get().result;

    const processed = outlines?.map(
      (outline: {
        layoutType: string | number;
        slideHeading: string;
        pointers: any;
      }) => {
        const layout = LayoutRegistry[outline.layoutType];
        if (!layout) throw new Error(`Layout ${outline.layoutType} not found`);

        const slots: Record<string, { type: string }> = {};
        layout.slots.forEach((slot: any) => {
          const componentName =
            slot.defaultComponent?.name || "ParagraphWidget";
          slots[slot.id] = {
            type: COMPONENT_TO_TYPE[componentName] || "paragraph",
          };
        });

        return {
          slideHeading: outline.slideHeading,
          layoutType: outline.layoutType,
          pointers: outline.pointers,
          slots,
        };
      }
    );

    set({ processedOutline: processed });
  },
}));
