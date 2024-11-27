export type Card = {
  id: string;
  name: string;
  manaCost: string;
  cmc: number; // Converted Mana Cost
  colors: string[];
  colorIdentity: string[];
  type: string;
  rarity: string;
  set: string;
  setName: string;
  text: string;
  flavor: string;
  artist: string;
  number: string;
  power?: string; // Optional, as not all cards have power
  toughness?: string; // Optional, as not all cards have toughness
  loyalty?: number; // Optional, as not all cards have loyalty
  multiverseid?: number; // Optional, as not all cards have multiverseid
  imageUrl?: string; // Optional, as not all cards have an image URL
  rulings?: { date: string; text: string }[]; // Optional, as not all cards have rulings
  foreignNames?: { name: string; language: string; multiverseid?: number }[]; // Optional, as not all cards have foreign names
  printings?: string[]; // Optional, as not all cards have printings
  originalText?: string; // Optional, as not all cards have original text
  originalType?: string; // Optional, as not all cards have original type
  legalities?: { format: string; legality: string }[]; // Optional, as not all cards have legalities
};