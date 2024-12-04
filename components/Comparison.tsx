"use client";
import { parseAsArrayOf, useQueryState } from "nuqs";
import { parseAsString } from "nuqs/server";
import { useQuery } from "@tanstack/react-query";
import { cardCompareOptions } from "@/hooks/useCards";
import Container from "@/components/Container";
import { CardSearch } from "@/components/CardSearch";
import { Spinner } from "@/components/ui/spinner";
import { ComparisonCard } from "@/components/ComparisonCard";

export default function Comparison() {
  const [selectedCards, setSelectedCards] = useQueryState(
    "cards",
    parseAsArrayOf(parseAsString).withDefault(["", ""]),
  );

  const {
    data: card1,
    isLoading: isLoading1,
    error: error1,
  } = useQuery(cardCompareOptions(selectedCards[0]));

  const {
    data: card2,
    isLoading: isLoading2,
    error: error2,
  } = useQuery(cardCompareOptions(selectedCards[1]));

  const handleCardSelect = (index: number) => async (cardName: string) => {
    await setSelectedCards((prev) => {
      const newCards = [...prev];
      newCards[index] = cardName;
      return newCards;
    });
  };

  return (
    <Container title={"Card Comparison"}>
      <div className="mb-8 flex flex-col justify-center gap-4 md:flex-row">
        <CardSearch
          onCardSelect={handleCardSelect(0)}
          placeholder="Search for first card..."
        />
        <CardSearch
          onCardSelect={handleCardSelect(1)}
          placeholder="Search for second card..."
        />
      </div>

      {(isLoading1 || isLoading2) && <Spinner />}

      {(error1 || error2) && (
        <div className="text-red-500">
          Error: {((error1 || error2) as Error).message || "An error occurred"}
        </div>
      )}

      <div className="mb-8 flex flex-col justify-center gap-x-64 md:flex-row">
        {card1 && <ComparisonCard card={card1} otherCard={card2} />}
        {card2 && <ComparisonCard card={card2} otherCard={card1} />}
      </div>
    </Container>
  );
}
