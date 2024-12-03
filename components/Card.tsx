import { Card as CardType } from "@/lib/types/card";
import Image from "next/image";

export function Card({ card }: Readonly<{ card: CardType }>) {
  return (
    <article>
      {card.image_uris?.normal ? (
        <Image
          src={card.image_uris.normal || "/unknown.jpg"}
          alt={card.name}
          width={200}
          height={200}
        />
      ): <Image src={"/unknown.jpg"} alt={card.name} width={200} height={200} />}
    </article>
  );
}
