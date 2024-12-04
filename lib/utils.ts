import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildQueryParts({
                                  selectedCardTypes,
                                  selectedColors,
                                  selectedRarity,
                                  power,
                                  year,
                                  price,
                                  legalities
                                }: {
  selectedCardTypes: string[],
  selectedColors: string[],
  selectedRarity: string,
  power: number[],
  year: number[],
  price: number[],
  legalities: string[]
}): string {
  const parts = [];
  if (selectedCardTypes.length > 0) {
    parts.push("t:" + selectedCardTypes.join("+t:"));
  }
  if (selectedColors.length > 0) {
    parts.push("c:" + selectedColors.join(" "));
  }
  if (selectedRarity.length > 0) {
    parts.push("r:" + selectedRarity);
  }
  if (power[0] !== 0 || power[1] !== 10) {
    parts.push(`pow>=${power[0]}+pow<=${power[1]}`);
  }
  if (year[0] !== 1993 || year[1] !== 2024) {
    parts.push(`year>=${year[0]}+year<=${year[1]}`);
  }
  if (price[0] !== 0 || price[1] !== 800) {
    parts.push(`usd>=${price[0]}+usd<=${price[1]}`);
  }
  if (legalities.length > 0) {
    parts.push("f:" + legalities.join("+f:"));
  }
  return parts.join("+");
}