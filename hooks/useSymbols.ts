import { CardSymbol } from "@/lib/types/symbol";
import { queryOptions } from "@tanstack/react-query";

const fetchSymbols = async (): Promise<Array<CardSymbol>> => {
  const response = await fetch(`https://api.scryfall.com/symbology`);
  const data = await response.json();
  return data.data;
};

const symbolOptions = () =>
  queryOptions({
    queryKey: ["symbols"],
    queryFn: () => fetchSymbols(),
  });

export { symbolOptions, fetchSymbols };
