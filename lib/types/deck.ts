import { Card } from "@/lib/types/card";

export interface Deck {
  id: string;
  name: string;
  cards: Record<string, { card: Card; quantity: number }>;
}
