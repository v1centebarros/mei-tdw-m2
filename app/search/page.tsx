import AdvancedSearch from "@/components/AdvancedSearch";
import React, { Suspense } from "react";
import { getQueryClient } from "@/lib/getQueryClient";
import { infiniteSearchOptions } from "@/lib/hooks/useSearch";
import { type SearchParams } from "nuqs/server";
import { advancedSearchParamsCache } from "@/lib/searchParams";
import { buildQueryParts } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Readonly<PageProps>) {
  const {
    selectedColors,
    selectedCardTypes,
    selectedRarity,
    power,
    year,
    price,
    legalities,
    page,
  } = await advancedSearchParamsCache.parse(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    infiniteSearchOptions(
      buildQueryParts({
        selectedCardTypes,
        selectedColors,
        selectedRarity,
        power,
        year,
        price,
        legalities,
      }),
      page,
    ),
  );

  return (
    <Suspense fallback={<div className={"mx-auto"}><Spinner/></div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdvancedSearch />
      </HydrationBoundary>
    </Suspense>
  );
}
