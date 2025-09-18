import { create } from "zustand";

type GenType = "prompt" | "text" | "link";
interface GenerationInterface {
  userInstruction: string;
  setUserInstruction: (data: string) => void;
  generateType: GenType;
  setGenerateType: (type: GenType) => void;
  slidesCount: number;
  setSlidesCount: (count: number) => void;
  result: string;
  setResult: (data: string) => void;
}

export const useGenerationStore = create<GenerationInterface>((set) => ({
  userInstruction: "",
  result: "",
  setResult(data) {
    result: data;
  },
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
