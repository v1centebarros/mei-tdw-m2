import { queryOptions } from "@tanstack/react-query";
import { Card } from "@/lib/types/card";

const fetchCards = async (page: number): Promise<Array<Card>> => {
  const response = await fetch(
    `https://api.magicthegathering.io/v1/cards?page=${page}`,
  );
  const data = await response.json();
  return data.cards;
};

const cardOptions = (page: number) =>
  queryOptions({
    queryKey: ["cards", page],
    queryFn: () => fetchCards(page),
  });


const cardCompareOptions = (card: string) =>
  queryOptions({
    queryKey: ["card", card],
    queryFn: () => fetchCard(card),
    enabled: !!card,
  });

const fetchAutoComplete = async (q: string): Promise<Array<string>> => {
  if (q.length < 3) {
    return [];
  }

  const response = await fetch(
    `https://api.scryfall.com/cards/autocomplete?q=${q}`,
  );
  const data = await response.json();
  return data.data;
};

const fetchCard = async (name?: string, id?:string): Promise<Card> => {
  const response = await fetch(
    id ? `https://api.scryfall.com/cards/${id}` :
    `https://api.scryfall.com/cards/named?fuzzy=${name}`,
  );
  const data = await response.json();
  return data;
};

const autoCompleteOptions = (q: string) =>
  queryOptions({
    queryKey: ["autocomplete", q],
    queryFn: () => fetchAutoComplete(q),
  });

export { cardOptions, autoCompleteOptions, fetchCard, cardCompareOptions };
