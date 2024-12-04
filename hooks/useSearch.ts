import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

const fetchSearch = async (query: string) => {
  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${query}`,
  );

  if (response.status === 404) {
    return [];
  }

  const data = await response.json();

  return data.data;
};

export const fetchInfiniteSearch = async (query: string, page: number) => {
  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${query}&page=${page}`,
  );

  if (response.status === 404) {
    return [];
  }

  const data = await response.json();

  return data.data;
};

const searchOptions = (query: string) =>
  queryOptions({
    queryKey: ["search", query],
    queryFn: () => fetchSearch(query),
    enabled: query.length > 0,
  });

const infiniteSearchOptions = (query: string, page: number) =>
  infiniteQueryOptions({
    queryKey: ["search", query, page],
    queryFn: ({ pageParam = page }) => fetchInfiniteSearch(query, pageParam),
    initialPageParam: page,
    getNextPageParam: () => {
      return page + 1;
    },
    enabled: query.length > 0,
  });
export { searchOptions, infiniteSearchOptions };
