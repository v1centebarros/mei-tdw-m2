"use client";

import { Button } from "@/components/ui/button";
import { useCardActions } from "@/lib/hooks/useCardActions";
import { Card } from "@/lib/types/card";
import { Heart, Package, ScrollText } from "lucide-react";

interface CardToggleProps {
  card: Card;

}

export function CardToggle({ card }: Readonly<CardToggleProps>) {
  const {
    isFavorite, isWantToBuy, isOwned, handleFavoriteClick, handleWantToBuyClick, handleOwnedClick
  } = useCardActions(card);

  return (
    <div className="flex flex-row gap-2">
      <Button
        variant={isFavorite ? "destructive" : "outline"}
        onClick={handleFavoriteClick}
      >
        <Heart />
      </Button>
      <Button
        variant={isWantToBuy ? "default" : "outline"}
        onClick={handleWantToBuyClick}
      >
        <ScrollText />
      </Button>
      <Button
        variant={isOwned ? "default" : "outline"}
        onClick={handleOwnedClick}
      >
        <Package />
      </Button>
    </div>
  );
}
