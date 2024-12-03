'use client'

import { Button } from "@/components/ui/button"
import { useCardStore } from "@/lib/providers/CardStoreProvider";
import { Card } from "@/lib/types/card";
import { Heart, Package, ScrollText } from "lucide-react";

interface CardToggleProps {
  card: Card
}

export function CardToggle({ card }: Readonly<CardToggleProps>) {
  const favoriteCards = useCardStore((state) => state.favoriteCards)
  const wantToBuyCards = useCardStore((state) => state.wantToBuyCards)
  const ownedCards = useCardStore((state) => state.ownedCards)

  const addFavoriteCard = useCardStore((state) => state.addFavoriteCard)
  const removeFavoriteCard = useCardStore((state) => state.removeFavoriteCard)

  const addWantToBuyCard = useCardStore((state) => state.addWantToBuyCard)
  const removeWantToBuyCard = useCardStore((state) => state.removeWantToBuyCard)

  const addOwnedCard = useCardStore((state) => state.addOwnedCard)
  const removeOwnedCard = useCardStore((state) => state.removeOwnedCard)

  const isFavorite = favoriteCards.find((c) => c.id === card.id)
  const isWantToBuy = wantToBuyCards.find((c) => c.id === card.id)
  const isOwned = ownedCards.find((c) => c.id === card.id)

  return (
    <div className="flex flex-row gap-2">
      <Button
        variant={isFavorite ? "default" : "outline"}
        onClick={() => isFavorite ? removeFavoriteCard(card) : addFavoriteCard(card)}
      >
        <Heart />
      </Button>
      <Button
        variant={isWantToBuy ? "default" : "outline"}
        onClick={() => isWantToBuy ? removeWantToBuyCard(card) : addWantToBuyCard(card)}
      >
        <ScrollText />
      </Button>
      <Button
        variant={isOwned ? "default" : "outline"}
        onClick={() => isOwned ? removeOwnedCard(card) : addOwnedCard(card)}
      >
        <Package />
      </Button>
    </div>
  )
}
