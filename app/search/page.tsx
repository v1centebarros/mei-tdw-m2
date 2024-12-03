"use client";
import { useMemo } from "react";
import {
  cardRarity,
  cardTypes,
  colors,
  formatLegalities,
  preferTypes,
  sortTypes,
  uniqueTypes
} from "@/lib/primitives";
import { searchOptions } from "@/lib/hooks/useSearch";
import { useQuery } from "@tanstack/react-query";
import { Card as CardType } from "@/lib/types/card";
import { Card } from "@/components/Card";
import { MultiSelect } from "@/components/ui/multi-select";
import MultipleSelector from "@/components/ui/multiple-selector";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { parseAsString } from "nuqs/server";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

export default function Page() {


  const [selectedColors, setSelectedColors] = useQueryState("colors", parseAsArrayOf(parseAsString).withDefault([]));
  const [selectedCardTypes, setSelectedCardTypes] = useQueryState("cardTypes", parseAsArrayOf(parseAsString).withDefault([]));
  const [selectedRarity, setSelectedRarity] = useQueryState("rarity", parseAsString.withDefault(""));
  const [power, setPower] = useQueryState("power", parseAsArrayOf(parseAsInteger).withDefault([0, 10]));
  const [year, setYear] = useQueryState("year", parseAsArrayOf(parseAsInteger).withDefault([1993, 2024]));
  const [price, setPrice] = useQueryState("price", parseAsArrayOf(parseAsInteger).withDefault([0, 800]));
  const [legalities, setLegalities] = useQueryState("legalities", parseAsArrayOf(parseAsString).withDefault([]));
  const [unique, setUnique] = useQueryState("unique", parseAsString.withDefault(""));
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault(""));
  const [prefer, setPrefer] = useQueryState("prefer", parseAsString.withDefault(""));

  const query = useMemo(() => {
    let query = "";
    if (selectedCardTypes.length > 0) {
      query += "t:" + selectedCardTypes.join("+t:");
    }
    if (selectedCardTypes.length > 0 && selectedColors.length > 0) {
      query += "+";
    }
    if (selectedColors.length > 0) {
      query += "c:" + selectedColors.join(" ");
    }

    if (selectedRarity.length > 0) {
      query += "+r:" + selectedRarity;
    }

    if (power[0] !== 0 || power[1] !== 10) {
      query += `+pow>=${power[0]}+pow<=${power[1]}`;
    }

    if (year[0] !== 1993 || year[1] !== 2024) {
      query += `+year>=${year[0]}+year<=${year[1]}`;
    }

    if (price[0] !== 0 || price[1] !== 800) {
      query += `+usd>=${price[0]}+usd<=${price[1]}`;
    }

    if (legalities.length > 0) {
      query += "+f:" + legalities.join("+f:");
    }

    if (unique.length > 0) {
      query += "+unique:" + unique;
    }

    if (sort.length > 0) {
      query += "+order:" + sort;
    }

    if (prefer.length > 0) {
      query += "+prefer:" + prefer;
    }
    return query;
  }, [selectedColors, selectedCardTypes, selectedRarity, power, year, price, legalities, unique, sort, prefer]);


  const { data, isLoading, isSuccess } = useQuery(searchOptions(query));

  return (<main className={"m-2"}>
    <h1 className="text-2xl font-bold mb-4">Advanced Search</h1>

    <div className={"flex flex-row flex-wrap gap-y-2"}>
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
        emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          no results found.
        </p>}
        groupBy="group"
      />
      <Select onValueChange={setSelectedRarity} value={selectedRarity}>
        <SelectTrigger className="h-full">
          <SelectValue placeholder="Select a Rarity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {cardRarity.map((rarity) => (<SelectItem key={rarity.value} value={rarity.value}>
              {rarity.label}
            </SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <DualRangeSlider
        value={power}
        min={0}
        max={10}
        step={1}
        label={(value) => value}
        onValueChange={(value) => setPower(value)}
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

      <MultiSelect
        options={formatLegalities}
        onValueChange={setLegalities}
        defaultValue={legalities}
        placeholder="Select Legalities"
        variant="default"
        animation={0}
        maxCount={3}
      />

      <Select onValueChange={setUnique} value={unique}>
        <SelectTrigger className="h-full">
          <SelectValue placeholder="Select Unique" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {uniqueTypes.map((unique) => (<SelectItem key={unique.value} value={unique.value}>
              {unique.label}
            </SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={setSort} value={sort}>
        <SelectTrigger className="h-full">
          <SelectValue placeholder="Select Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortTypes.map((sort) => (<SelectItem key={sort.label} value={sort.value}>
              {sort.label}
            </SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={setPrefer} value={prefer}>
        <SelectTrigger className="h-full">
          <SelectValue placeholder="Select Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {preferTypes.map((prefer) => (<SelectItem key={prefer.label} value={prefer.value}>
              {prefer.label}
            </SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Search Results:</h2>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <>

        {data?.length > 0 ? <div className={"grid grid-cols-6 gap-2"}>
          {data?.map((card: CardType) => <Card card={card} key={card.id} />)
          }</div> : <p>No results found</p>}
      </>}
    </div>
  </main>);
}

