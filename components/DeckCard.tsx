import Image from "next/image";
import { Card } from "@/lib/types/card";
import { Button } from "@/components/ui/button";

interface DeckCardProps {
  card: Card;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function DeckCard({ card, quantity, onAdd, onRemove }: Readonly<DeckCardProps>) {
  return (
    <div className="relative flex flex-col items-center rounded-lg border p-2">
      <Image
        src={card.image_uris?.small || "/placeholder.svg"}
        alt={card.name}
        width={146}
        height={204}
        className="mb-2 rounded-lg"
      />
      <h3 className="mb-1 text-sm font-semibold">{card.name}</h3>
      <p className="mb-2 text-xs">{card.type_line}</p>
      <div className="flex w-full justify-between">
        <Button
          onClick={onRemove}
          className="rounded bg-red-500 px-2 py-1 text-xs text-white"
        >
          -
        </Button>
        <span className="text-sm font-bold">{quantity}</span>
        <Button
          onClick={onAdd}
          className="rounded bg-green-500 px-2 py-1 text-xs text-white"
        >
          +
        </Button>
      </div>
    </div>
  );
}
