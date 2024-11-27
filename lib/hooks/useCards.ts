import {queryOptions} from "@tanstack/react-query";
import {Card} from "@/lib/types/card";

const fetchCards = async (page: number): Promise<Array<Card>> => {
    const response = await fetch(`https://api.magicthegathering.io/v1/cards?page=${page}`);
    const data = await response.json();
    return data.cards;
}

const cardOptions = (page: number) => queryOptions({
    queryKey: ['cards', page],
    queryFn: () => fetchCards(page)
});

export {fetchCards, cardOptions};