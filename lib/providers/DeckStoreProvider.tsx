"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createDeckStore,
  DeckStore,
  initDeckStore,
} from "@/lib/stores/deckStore";

export type DeckStoreApi = ReturnType<typeof createDeckStore>;

const DeckStoreContext = createContext<DeckStoreApi | undefined>(undefined);

interface DeckStoreProviderProps {
  children: ReactNode;
}

export const DeckStoreProvider = ({ children }: DeckStoreProviderProps) => {
  const storeRef = useRef<DeckStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createDeckStore(initDeckStore());
  }

  return (
    <DeckStoreContext.Provider value={storeRef.current}>
      {children}
    </DeckStoreContext.Provider>
  );
};

export const useDeckStore = <T,>(selector: (store: DeckStore) => T): T => {
  const deckStoreContext = useContext(DeckStoreContext);

  if (!deckStoreContext) {
    throw new Error("useDeckStore must be used within a DeckStoreProvider");
  }

  return useStore(deckStoreContext, selector);
};
