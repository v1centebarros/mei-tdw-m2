import { Deck } from "@/lib/types/deck";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type DeckState = {
  decks: Deck[];
  currentDeck: Deck | null;
};

export type DeckActions = {
  addDeck: (deck: Deck) => void;
  removeDeck: (deck: Deck) => void;
  setCurrentDeck: (deck: Deck) => void;
};

export type DeckStore = DeckState & DeckActions;

export const initDeckStore = (): DeckState => ({
  decks: [],
  currentDeck: null,
});

export const createDeckStore = (initState: DeckState = initDeckStore()) => {
  return createStore<DeckStore>()(
    persist(
      (set) => ({
        ...initState,
        addDeck: (deck) =>
          set((state) => ({
            decks: [...state.decks, deck],
          })),
        removeDeck: (deck) =>
          set((state) => ({
            decks: state.decks.filter((item) => item !== deck),
          })),
        setCurrentDeck: (deck) =>
          set(() => ({
            currentDeck: deck,
          })),
      }),
      {
        name: "magic-decks-storage",
      },
    ),
  );
};
