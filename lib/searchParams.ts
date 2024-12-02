import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  name: parseAsString.withDefault(""),
});
