import Image from 'next/image';
import { Card } from '@/lib/types/card';
import { Button } from "@/components/ui/button";

interface DeckCardProps {
  card: Card;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function DeckCard({ card, quantity, onAdd, onRemove }: DeckCardProps) {
  return (
    <div className="relative border rounded-lg p-2 flex flex-col items-center">
      <Image
        src={card.image_uris?.small || '/placeholder.svg'}
        alt={card.name}
        width={146}
        height={204}
        className="rounded-lg mb-2"
      />
      <h3 className="text-sm font-semibold mb-1">{card.name}</h3>
      <p className="text-xs mb-2">{card.type_line}</p>
      <div className="flex justify-between w-full">
        <Button
          onClick={onRemove}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          -
        </Button>
        <span className="text-sm font-bold">{quantity}</span>
        <Button
          onClick={onAdd}
          className="bg-green-500 text-white px-2 py-1 rounded text-xs"
        >
          +
        </Button>
      </div>
    </div>
  );
}

