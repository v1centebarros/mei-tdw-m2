"use client";
import {useSuspenseQuery} from "@tanstack/react-query";
import {cardOptions} from "@/lib/hooks/useCards";
import {useState} from "react";

export function CardList() {
    const [page, setPage] = useState(1);
    const {data} = useSuspenseQuery(cardOptions(page));

    return (
        <div>
            <button onClick={() => setPage(page + 1)}>Load More</button>
            <ul>
                {data.map((card) => (
                    <li key={card.id}>
                        {card.name}
                    </li>
                ))}
            </ul>

            <ul>
                {data.map((card) => (
                    <li key={card.id}>
                        {card.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}