import {queryOptions, useQuery} from "@tanstack/react-query";
import {Card} from "@/lib/types/card";

const fetchCards = async (): Promise<Array<Card>> => {
    const response = await fetch('https://api.magicthegathering.io/v1/cards/');
    const data = await response.json();
    return data.cards;
}

const useCards = () => {
    return useQuery({
        queryKey: ['cards'],
        queryFn: () => fetchCards(),
    });
}

const cardOptions = queryOptions({
    queryKey: ['cards'],
    queryFn: () => fetchCards()
});

export {useCards, fetchCards, cardOptions};