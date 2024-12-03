import { queryOptions } from "@tanstack/react-query";

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

const searchOptions = (query: string) =>
  queryOptions({
    queryKey: ["search", query],
    queryFn: () => fetchSearch(query),
    enabled: query.length > 0,
  });

export { searchOptions };