import { useCardStore } from "@/lib/providers/CardStoreProvider";
import { Card } from "@/lib/types/card";
import { useToast } from "@/hooks/use-toast";

export function useCardActions(card: Card) {

  const {toast} = useToast();
  const favoriteCards = useCardStore((state) => state.favoriteCards);
  const wantToBuyCards = useCardStore((state) => state.wantToBuyCards);
  const ownedCards = useCardStore((state) => state.ownedCards);

  const addFavoriteCard = useCardStore((state) => state.addFavoriteCard);
  const removeFavoriteCard = useCardStore((state) => state.removeFavoriteCard);

  const addWantToBuyCard = useCardStore((state) => state.addWantToBuyCard);
  const removeWantToBuyCard = useCardStore((state) => state.removeWantToBuyCard);

  const addOwnedCard = useCardStore((state) => state.addOwnedCard);
  const removeOwnedCard = useCardStore((state) => state.removeOwnedCard);

  const isFavorite = favoriteCards.find((c) => c.id === card.id);
  const isWantToBuy = wantToBuyCards.find((c) => c.id === card.id);
  const isOwned = ownedCards.find((c) => c.id === card.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavoriteCard(card);
      toast({ title: "Removed from Favorites", description: `${card.name} was removed from your favorite cards.` });
    } else {
      addFavoriteCard(card);
      toast({ title: "Added to Favorites", description: `${card.name} was added to your favorite cards.` });
    }
  };

  const handleWantToBuyClick = () => {
    if (isWantToBuy) {
      removeWantToBuyCard(card);
      toast({ title: "Removed from Want to Buy", description: `${card.name} was removed from your want to buy cards.` });
    } else {
      addWantToBuyCard(card);
      toast({ title: "Added to Want to Buy", description: `${card.name} was added to your want to buy cards.` });
    }
  };

  const handleOwnedClick = () => {
    if (isOwned) {
      removeOwnedCard(card);
      toast({ title: "Removed from Owned", description: `${card.name} was removed from your owned cards.` });
    } else {
      addOwnedCard(card);
      toast({ title: "Added to Owned", description: `${card.name} was added to your owned cards.`});
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