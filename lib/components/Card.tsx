import {Card as CardType} from '../types/card'
import Image from "next/image";

export function Card({card}: Readonly<{ card: CardType }>) {
    return (
        <article>
            <h2>{card.name}</h2>
            {card.imageUrl && <Image src={card.imageUrl} alt={card.name} width={200} height={200}/>}
            <p>{card.text}</p>
        </article>
    )
}


