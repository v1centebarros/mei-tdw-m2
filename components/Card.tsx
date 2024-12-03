import { Card as CardType } from "@/lib/types/card";
import Image from "next/image";
import Link from "next/link";

export function Card({ card }: Readonly<{ card: CardType }>) {
  return (
    <Link href={`/cards?id=${card.id}`}>
      {card.image_uris?.normal ? (
        <Image
          src={card.image_uris.normal || "/unknown.jpg"}
          alt={card.name}
          width={200}
          height={200}
        />
      ): <Image src={"/unknown.jpg"} alt={card.name} width={200} height={200} />}
    </Link>
  );
}
