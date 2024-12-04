import Image from "next/image";
import { Card } from "@/lib/types/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface DeckCardProps {
  card: Card;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function DeckCard({
  card,
  quantity,
  onAdd,
  onRemove,
}: Readonly<DeckCardProps>) {
  return (
    <div className="flex flex-col rounded-lg p-2">
      <Image
        src={card.image_uris?.small || "/placeholder.svg"}
        alt={card.name}
        width={146}
        height={204}
        className="mb-2 rounded-lg"
      />

      <h3 className="mb-1 text-sm font-semibold">{card.name}</h3>
      <p className="mb-2 text-xs">{card.type_line}</p>
      <div className="flex w-full items-center gap-x-3">
        <Button
          onClick={onRemove}
          className="rounded px-2 py-1 text-xs text-white"
        >
          <Minus size={16} />
        </Button>
        <Button
          onClick={onAdd}
          className="rounded px-2 py-1 text-xs text-white"
        >
          <Plus size={16} />
        </Button>
        <span className="text-3xl">x {quantity}</span>
      </div>
    </div>
  );
}
