import { Card as CardType } from "@/lib/types/card";
import Image from "next/image";

export function Card({ card }: Readonly<{ card: CardType }>) {
  return (
    <article>
      {/*<h2>{card.name}</h2>*/}
      {card.image_uris?.normal && card.image_uris?.normal !== "" ? (
        <img
          src={card.image_uris.normal}
          alt={card.name}
          width={200}
          height={200}
        />
      ): null}
      {/*<p>{card.oracle_text}</p>*/}
    </article>
  );
}
