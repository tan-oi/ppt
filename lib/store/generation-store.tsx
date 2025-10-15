import { create } from "zustand";

type GenType = "prompt" | "text" | "link";
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
  id: null | string;
  setId: (id: string) => void;
}

export const useGenerationStore = create<GenerationInterface>((set) => ({
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
  slidesCount: 1,
  setSlidesCount: (count) =>
    set({
      slidesCount: count,
    }),
}));
