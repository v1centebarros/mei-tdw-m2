"use client";
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
import React from "react";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "nuqs";
import { parseAsString } from "nuqs/server";

export default function SearchFilters() {
  const [selectedColors, setSelectedColors] = useQueryState(
    "colors",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [, setSelectedCardTypes] = useQueryState(
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

  return (
    <>
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
        <div>
          <DualRangeSlider
            id="year-slider"
            value={year}
            min={1993}
            max={2024}
            step={1}
            label={(value) => value}
            onValueChange={(value) => setYear(value)}
          />
          <label htmlFor="year-slider">Year</label>
        </div>
        <div>
          <DualRangeSlider
            id="price-slider"
            value={price}
            min={0}
            max={800}
            step={5}
            label={(value) => value}
            onValueChange={(value) => setPrice(value)}
          />
          <label htmlFor="price-slider">Price</label>
        </div>
        <div>
          <DualRangeSlider
            id="power-slider"
            value={power}
            min={0}
            max={10}
            step={1}
            label={(value) => value}
            onValueChange={(value) => setPower(value)}
            className={"p-y-5 w-full"}
          />
          <label htmlFor="power-slider">Power</label>
        </div>
      </div>
    </>
  );
}
