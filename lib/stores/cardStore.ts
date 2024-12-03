// src/stores/card-store.ts
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { Card } from "@/lib/types/card";

export type CardState = {
  favoriteCards: Card[]
  ownedCards: Card[]
  wantToBuyCards: Card[]
}

export type CardActions = {
  addFavoriteCard: (card: Card) => void
  removeFavoriteCard: (card: Card) => void
  addOwnedCard: (card: Card) => void
  removeOwnedCard: (card: Card) => void
  addWantToBuyCard: (card: Card) => void
  removeWantToBuyCard: (card: Card) => void
}

export type CardStore = CardState & CardActions

export const initCardStore = (): CardState => ({
  favoriteCards: [], ownedCards: [], wantToBuyCards: []
});

export const createCardStore = (initState: CardState = initCardStore()) => {
  return createStore<CardStore>()(persist((set) => ({
    ...initState, addFavoriteCard: (card) => set((state) => ({
      favoriteCards: [...state.favoriteCards, card]
    })), removeFavoriteCard: (card) => set((state) => ({
      favoriteCards: state.favoriteCards.filter((item) => item !== card)
    })), addOwnedCard: (card) => set((state) => ({
      ownedCards: [...state.ownedCards, card]
    })), removeOwnedCard: (card) => set((state) => ({
      ownedCards: state.ownedCards.filter((item) => item !== card)
    })), addWantToBuyCard: (card) => set((state) => ({
      wantToBuyCards: [...state.wantToBuyCards, card]
    })), removeWantToBuyCard: (card) => set((state) => ({
      wantToBuyCards: state.wantToBuyCards.filter((item) => item !== card)
    }))
  }), {
    name: "magic-cards-storage" // Storage key
  }));
};
