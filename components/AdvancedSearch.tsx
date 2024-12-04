"use client";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { parseAsString } from "nuqs/server";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { infiniteSearchOptions } from "@/hooks/useSearch";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { Card as CardType } from "@/lib/types/card";
import CardContextMenu from "@/components/CardContextMenu";
import { Card } from "@/components/Card";
import { buildQueryParts } from "@/lib/utils";

export default function AdvancedSearch() {
  const [selectedColors] = useQueryState("colors", parseAsArrayOf(parseAsString).withDefault([]));
  const [selectedCardTypes] = useQueryState("cardTypes", parseAsArrayOf(parseAsString).withDefault([]));
  const [selectedRarity] = useQueryState("rarity", parseAsString.withDefault(""));
  const [power] = useQueryState("power", parseAsArrayOf(parseAsInteger).withDefault([0, 10]));
  const [year] = useQueryState("year", parseAsArrayOf(parseAsInteger).withDefault([1993, 2024]));
  const [price] = useQueryState("price", parseAsArrayOf(parseAsInteger).withDefault([0, 800]));
  const [legalities] = useQueryState("legalities", parseAsArrayOf(parseAsString).withDefault([]));
  const [page] = useState(1);

  const query = useMemo(() => buildQueryParts({
    selectedCardTypes, selectedColors, selectedRarity, power, year, price, legalities
  }), [selectedColors, selectedCardTypes, selectedRarity, power, year, price, legalities]);

  const {
    data, isFetching, isFetchingNextPage, isLoading, isSuccess, fetchNextPage, hasNextPage
  } = useSuspenseInfiniteQuery(infiniteSearchOptions(query, page));
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (<div className="mt-4">
    {isLoading && <Spinner />}
    {isSuccess && query.length > 0 && (<>
      <h2 className="text-center text-3xl font-semibold">
        Search Results
      </h2>
      {data.pages.length > 0 ? (<div className={"grid grid-cols-6 gap-2"}>
        {data.pages.map((page) => (<Fragment key={page.nextId}>
          {page.map((card: CardType) => (<CardContextMenu card={card} key={card.id}>
            <Card card={card} key={card.id} />
          </CardContextMenu>))}
        </Fragment>))}
      </div>) : (<p>No results found</p>)}
      <div className="flex justify-center">
        <button
          ref={ref}
          className={"mx-auto"}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (<Spinner />) : (!hasNextPage && "Nothing more to load")}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </>)}
  </div>);
}
