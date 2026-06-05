"use client";

import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

export interface ApiConfig {
  googleApiKey: string;
  replicateApiKey: string;
  googleModel: string;
  replicateModel: string;
}

interface ApiConfigState {
  config: ApiConfig;
  setGoogleApiKey: (key: string) => void;
  setReplicateApiKey: (key: string) => void;
  setGoogleModel: (model: string) => void;
  setReplicateModel: (model: string) => void;
  updateConfig: (config: Partial<ApiConfig>) => void;
  clearApiKeys: () => void;
  resetConfig: () => void;
}

const defaultConfig: ApiConfig = {
  googleApiKey: "",
  replicateApiKey: "",
  googleModel: "gemini-2.5-flash",
  replicateModel: "black-forest-labs/flux-schnell",
};

export const useApiConfigStore = create<ApiConfigState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      setGoogleApiKey: (key: string) =>
        set((state) => ({
          config: { ...state.config, googleApiKey: key },
        })),
      setReplicateApiKey: (key: string) =>
        set((state) => ({
          config: { ...state.config, replicateApiKey: key },
        })),
      setGoogleModel: (model: string) =>
        set((state) => ({
          config: { ...state.config, googleModel: model },
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
            googleApiKey: "",
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
