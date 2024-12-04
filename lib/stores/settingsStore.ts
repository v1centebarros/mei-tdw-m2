import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsState = {
  language: string;
  currency: string;
};

type SettingsActions = {
  setLanguage: (language: string) => void;
  setCurrency: (currency: string) => void;
};

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create(
  persist<SettingsStore>(
    (set) => ({
      language: "en",
      currency: "usd",
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "settings-store",
    },
  ),
);
