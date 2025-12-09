"use client";

import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

export interface ApiConfig {
  groqApiKey: string;
  replicateApiKey: string;
  groqModel: string;
  replicateModel: string;
}

interface ApiConfigState {
  config: ApiConfig;
  setGroqApiKey: (key: string) => void;
  setReplicateApiKey: (key: string) => void;
  setGroqModel: (model: string) => void;
  setReplicateModel: (model: string) => void;
  updateConfig: (config: Partial<ApiConfig>) => void;
  clearApiKeys: () => void;
  resetConfig: () => void;
}

const defaultConfig: ApiConfig = {
  groqApiKey: "",
  replicateApiKey: "",
  groqModel: "openai/gpt-oss-120b",
  replicateModel: "black-forest-labs/flux-schnell",
};

export const useApiConfigStore = create<ApiConfigState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      setGroqApiKey: (key: string) =>
        set((state) => ({
          config: { ...state.config, groqApiKey: key },
        })),
      setReplicateApiKey: (key: string) =>
        set((state) => ({
          config: { ...state.config, replicateApiKey: key },
        })),
      setGroqModel: (model: string) =>
        set((state) => ({
          config: { ...state.config, groqModel: model },
        })),
      setReplicateModel: (model: string) =>
        set((state) => ({
          config: { ...state.config, replicateModel: model },
        })),
      updateConfig: (config: Partial<ApiConfig>) =>
        set((state) => ({
          config: { ...state.config, ...config },
        })),
      clearApiKeys: () =>
        set((state) => ({
          config: {
            ...state.config,
            groqApiKey: "",
            replicateApiKey: "",
          },
        })),
      resetConfig: () =>
        set({
          config: defaultConfig,
        }),
    }),
    {
      name: "api-config-storage",
      storage: {
        getItem: (name): StorageValue<ApiConfigState> | null => {
          try {
            if (typeof window === "undefined") return null;

            const str = localStorage.getItem(name);
            if (!str) return null;

            return JSON.parse(str);
          } catch (error) {
            console.error("Error reading API config:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            if (typeof window !== "undefined") {
              localStorage.setItem(name, JSON.stringify(value));
            }
          } catch (error) {
            console.error("Error saving API config:", error);
          }
        },
        removeItem: (name) => {
          try {
            if (typeof window !== "undefined") {
              localStorage.removeItem(name);
            }
          } catch (error) {
            console.error("Error removing API config:", error);
          }
        },
      },
    }
  )
);
