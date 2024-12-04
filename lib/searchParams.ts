import { createSearchParamsCache, parseAsString, parseAsArrayOf, parseAsInteger } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  name: parseAsString.withDefault(""),
  id: parseAsString.withDefault(""),
});

export const advancedSearchParamsCache = createSearchParamsCache({
  selectedColors: parseAsArrayOf(parseAsString).withDefault([]),
  selectedCardTypes: parseAsArrayOf(parseAsString).withDefault([]),
  selectedRarity: parseAsString.withDefault(""),
  power: parseAsArrayOf(parseAsInteger).withDefault([0, 10]),
  year: parseAsArrayOf(parseAsInteger).withDefault([1993, 2024]),
  price: parseAsArrayOf(parseAsInteger).withDefault([0, 800]),
  legalities: parseAsArrayOf(parseAsString).withDefault([]),
  page: parseAsInteger.withDefault(1),
});



