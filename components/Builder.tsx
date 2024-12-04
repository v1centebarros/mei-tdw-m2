"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CardSearch } from '@/components/CardSearch';
import { DeckCard } from '@/components/DeckCard';
import { DeckStats } from '@/components/DeckStats';
import { Spinner } from '@/components/ui/spinner';
import { fetchCard } from '@/hooks/useCards';
import { Card } from '@/lib/types/card';

export default function DeckBuilderPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [deck, setDeck] = useState<{ [cardId: string]: { card: Card; quantity: number } }>({});

  const { data: card, isLoading, error } = useQuery({
    queryKey: ['card', selectedCard],
    queryFn: () => selectedCard ? fetchCard(selectedCard) : null,
    enabled: !!selectedCard,
  });

  const handleCardSelect = (cardName: string) => {
    setSelectedCard(cardName);
  };

  const addCardToDeck = (card: Card) => {
    setDeck((prevDeck) => {
      const updatedDeck = { ...prevDeck };
      if (updatedDeck[card.id]) {
        updatedDeck[card.id].quantity += 1;
      } else {
        updatedDeck[card.id] = { card, quantity: 1 };
      }
      return updatedDeck;
    });
  };

  const removeCardFromDeck = (cardId: string) => {
    setDeck((prevDeck) => {
      const updatedDeck = { ...prevDeck };
      if (updatedDeck[cardId].quantity > 1) {
        updatedDeck[cardId].quantity -= 1;
      } else {
        delete updatedDeck[cardId];
      }
      return updatedDeck;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MTG Deck Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CardSearch onCardSelect={handleCardSelect} placeholder="Search for a card..." />
          {isLoading && <Spinner />}
          {error && <p className="text-red-500">Error: {(error as Error).message}</p>}
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
        </div>
        <div>
          <DeckStats deck={deck} />
        </div>
      </div>
    </div>
  );
}

