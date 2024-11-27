"use client";
import {useSuspenseQuery} from "@tanstack/react-query";
import {cardOptions} from "@/lib/hooks/useCards";

export function CardList () {
    const { data } = useSuspenseQuery(cardOptions);

    return (
        <ul>
            {data.map((card) => (
                <li key={card.id}>
                    {card.name}
                </li>
            ))}
        </ul>
    );
}