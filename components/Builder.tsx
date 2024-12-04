"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardSearch } from "@/components/CardSearch";
import { DeckCard } from "@/components/DeckCard";
import { DeckStats } from "@/components/DeckStats";
import { Spinner } from "@/components/ui/spinner";
import { cardCompareOptions } from "@/hooks/useCards";
import { Card } from "@/lib/types/card";
import Container from "@/components/Container";

export default function DeckBuilderPage() {
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [deck, setDeck] = useState<{ [cardId: string]: { card: Card; quantity: number } }>({});

  const { data: card, isLoading } = useQuery(cardCompareOptions(selectedCard));

  const handleCardSelect = (cardName: string) => {
    setSelectedCard(cardName);
  };

  const addCardToDeck = (card: Card) => {
    setDeck((prevDeck) => {
      const currentQuantity = prevDeck[card.id]?.quantity || 0;
      return {
        ...prevDeck,
        [card.id]: {
          card,
          quantity: currentQuantity + 1,
        },
      };
    });
  };

  const removeCardFromDeck = (cardId: string) => {
    setDeck((prevDeck) => {
      const updatedDeck = { ...prevDeck };
      if (!updatedDeck[cardId]) {
        return prevDeck;
      }
      if (updatedDeck[cardId].quantity > 1) {
        updatedDeck[cardId].quantity -= 1;
      } else {
        delete updatedDeck[cardId];
      }
      return updatedDeck;
    });
  };

  return (
    <Container title={"Deck Builder"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CardSearch onCardSelect={handleCardSelect} placeholder="Search for a card..." />
          {isLoading && <Spinner />}
          {card && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Selected Card</h2>
              <DeckCard
                card={card}
                quantity={deck[card.id]?.quantity || 0}
                onAdd={() => addCardToDeck(card)}
                onRemove={() => removeCardFromDeck(card.id)}
              />
            </div>
          )}
        </div>
        <div>
          {Object.keys(deck).length > 0 && <DeckStats deck={deck} />}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Deck</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Object.values(deck).map(({ card, quantity }) => (
            <DeckCard
              key={card.id}
              card={card}
              quantity={quantity}
              onAdd={() => addCardToDeck(card)}
              onRemove={() => removeCardFromDeck(card.id)}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
