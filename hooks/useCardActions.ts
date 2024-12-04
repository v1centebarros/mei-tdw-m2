import { useCardStore } from "@/lib/providers/CardStoreProvider";
import { Card } from "@/lib/types/card";
import { useToast } from "@/hooks/use-toast";

export function useCardActions(card: Card) {
  const { toast } = useToast();
  const {
    favoriteCards,
    wantToBuyCards,
    ownedCards,
    addFavoriteCard,
    removeFavoriteCard,
    addWantToBuyCard,
    removeWantToBuyCard,
    addOwnedCard,
    removeOwnedCard,
  } = useCardStore((state) => state);
  const isFavorite = favoriteCards.find((c) => c.id === card.id);
  const isWantToBuy = wantToBuyCards.find((c) => c.id === card.id);
  const isOwned = ownedCards.find((c) => c.id === card.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavoriteCard(card);
      toast({
        title: "Removed from Favorites",
        description: `${card.name} was removed from your favorite cards.`,
      });
    } else {
      addFavoriteCard(card);
      toast({
        title: "Added to Favorites",
        description: `${card.name} was added to your favorite cards.`,
      });
    }
  };

  const handleWantToBuyClick = () => {
    if (isWantToBuy) {
      removeWantToBuyCard(card);
      toast({
        title: "Removed from Want to Buy",
        description: `${card.name} was removed from your want to buy cards.`,
      });
    } else {
      addWantToBuyCard(card);
      toast({
        title: "Added to Want to Buy",
        description: `${card.name} was added to your want to buy cards.`,
      });
    }
  };

  const handleOwnedClick = () => {
    if (isOwned) {
      removeOwnedCard(card);
      toast({
        title: "Removed from Owned",
        description: `${card.name} was removed from your owned cards.`,
      });
    } else {
      addOwnedCard(card);
      toast({
        title: "Added to Owned",
        description: `${card.name} was added to your owned cards.`,
      });
    }
  };

  return {
    favoriteCards,
    wantToBuyCards,
    ownedCards,
    isFavorite,
    isWantToBuy,
    isOwned,
    handleFavoriteClick,
    handleWantToBuyClick,
    handleOwnedClick,
  };
}
