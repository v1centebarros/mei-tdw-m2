"use client";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { parseAsString } from "nuqs/server";
import React, { Fragment, Suspense, useEffect, useMemo } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { infiniteSearchOptions } from "@/lib/hooks/useSearch";
import { useInView } from "react-intersection-observer";
import Container from "@/components/Container";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  cardRarity,
  cardTypes,
  colors,
  formatLegalities,
} from "@/lib/primitives";
import MultipleSelector from "@/components/ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Spinner } from "@/components/ui/spinner";
import { Card as CardType } from "@/lib/types/card";
import CardContextMenu from "@/components/CardContextMenu";
import { Card } from "@/components/Card";
import { buildQueryParts } from "@/lib/utils";

export default function AdvancedSearch() {
  const [selectedColors, setSelectedColors] = useQueryState(
    "colors",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [selectedCardTypes, setSelectedCardTypes] = useQueryState(
    "cardTypes",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [selectedRarity, setSelectedRarity] = useQueryState(
    "rarity",
    parseAsString.withDefault(""),
  );
  const [power, setPower] = useQueryState(
    "power",
    parseAsArrayOf(parseAsInteger).withDefault([0, 10]),
  );
  const [year, setYear] = useQueryState(
    "year",
    parseAsArrayOf(parseAsInteger).withDefault([1993, 2024]),
  );
  const [price, setPrice] = useQueryState(
    "price",
    parseAsArrayOf(parseAsInteger).withDefault([0, 800]),
  );
  const [legalities, setLegalities] = useQueryState(
    "legalities",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const query = useMemo(
    () =>
      buildQueryParts({
        selectedCardTypes,
        selectedColors,
        selectedRarity,
        power,
        year,
        price,
        legalities,
      }),
    [
      selectedColors,
      selectedCardTypes,
      selectedRarity,
      power,
      year,
      price,
      legalities,
    ],
  );

  const {
    data,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery(infiniteSearchOptions(query, page));
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Container title={"Advanced Search"}>
      <Suspense>
        <div className={"grid grid-cols-4 gap-x-2 pb-10"}>
          <MultiSelect
            options={colors}
            onValueChange={setSelectedColors}
            defaultValue={selectedColors}
            placeholder="Select Colors"
            variant="default"
            animation={0}
            maxCount={3}
          />
          <MultipleSelector
            defaultOptions={cardTypes}
            onChange={async (values) => {
              const selectedCardTypes = values.map((value) => value.value);
              await setSelectedCardTypes(selectedCardTypes);
            }}
            placeholder="Select Card Types"
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
            groupBy="group"
          />
          <MultiSelect
            options={formatLegalities}
            onValueChange={setLegalities}
            defaultValue={legalities}
            placeholder="Select Legalities"
            variant="default"
            animation={0}
            maxCount={3}
          />
          <Select onValueChange={setSelectedRarity} value={selectedRarity}>
            <SelectTrigger className="h-full">
              <SelectValue placeholder="Select a Rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cardRarity.map((rarity) => (
                  <SelectItem key={rarity.value} value={rarity.value}>
                    {rarity.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className={"grid grid-cols-3 gap-x-2 gap-y-10"}>
          <DualRangeSlider
            value={power}
            min={0}
            max={10}
            step={1}
            label={(value) => value}
            onValueChange={(value) => setPower(value)}
            className={"p-y-5 w-full"}
          />

          <DualRangeSlider
            value={year}
            min={1993}
            max={2024}
            step={1}
            label={(value) => value}
            onValueChange={(value) => setYear(value)}
          />

          <DualRangeSlider
            value={price}
            min={0}
            max={800}
            step={5}
            label={(value) => value}
            onValueChange={(value) => setPrice(value)}
          />
        </div>
        <div className="mt-4">
          {isLoading && <Spinner />}
          {isSuccess && (
            <>
              <h2 className="text-center text-3xl font-semibold">
                Search Results
              </h2>
              {data.pages.length > 0 ? (
                <div className={"grid grid-cols-6 gap-2"}>
                  {data.pages.map((page) => (
                    <Fragment key={page.nextId}>
                      {page.map((card: CardType) => (
                        <CardContextMenu card={card} key={card.id}>
                          <Card card={card} key={card.id} />
                        </CardContextMenu>
                      ))}
                    </Fragment>
                  ))}
                </div>
              ) : (
                <p>No results found</p>
              )}
              <div className="flex justify-center">
                <button
                  ref={ref}
                  className={"mx-auto"}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <Spinner />
                  ) : (
                    !hasNextPage && "Nothing more to load"
                  )}
                </button>
              </div>
              <div>
                {isFetching && !isFetchingNextPage
                  ? "Background Updating..."
                  : null}
              </div>
            </>
          )}
        </div>
      </Suspense>
    </Container>
  );
}
