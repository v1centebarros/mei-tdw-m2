"use client";
import { useState } from "react";
import { ComparisonCard } from "@/components/ComparisonCards";
import { Card as CardType } from "@/lib/types/card";
import { Card } from "@/components/Card";
import { useCardStore } from "@/lib/providers/CardStoreProvider";

export default function Page() {
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);

  const favoriteCards = useCardStore((state) => state.favoriteCards);


  const handleCardSelect = (card: CardType) => {
    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleReset = () => {
    setSelectedCards([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Magic: The Gathering Card Comparison</h1>

      {selectedCards.length < 2 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Select cards to compare:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
            {favoriteCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardSelect(card)}
                className="text-left hover:bg-gray-100 p-2 rounded"
              >
                <Card card={card} linkEnabled={false}/>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedCards.length === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Comparison:</h2>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            <ComparisonCard card={selectedCards[0]} otherCard={selectedCards[1]} />
            <ComparisonCard card={selectedCards[1]} otherCard={selectedCards[0]} />
          </div>
          <button
            onClick={handleReset}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Reset Comparison
          </button>
        </div>
      )}
    </div>
  );
}