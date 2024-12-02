import { type SearchParams } from "nuqs/server";
import { searchParamsCache } from "@/lib/searchParams";
import { fetchCard } from "@/lib/hooks/useCards";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { fetchSymbols } from "@/lib/hooks/useSymbols";
import { CardSymbol } from "@/lib/types/symbol";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const loadSymbol = (symbolString: string, allSymbols: CardSymbol[]) => {
  const symbols = symbolString.match(/{[^}]+}/g);
  if (!symbols) return;
  return symbols.map((symbol, index) => {
    const foundSymbol = allSymbols.find((s) => s.symbol === symbol);
    if (!foundSymbol?.svg_uri) return;
    return (
      <Image
        key={foundSymbol.object + index}
        src={foundSymbol.svg_uri}
        alt={foundSymbol.symbol}
        width={20}
        height={20}
      />
    );
  });
};

const parseText = (text: string, allSymbols: CardSymbol[]) => {
  return text.split(/({[^}]+})/).map((part, index) => {
    if (part.startsWith("{")) {
      const foundSymbol = allSymbols.find((s) => s.symbol === part);
      if (!foundSymbol?.svg_uri) return;
      return (
        <span
          key={foundSymbol.object + index}
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <Image
            src={foundSymbol.svg_uri}
            alt={foundSymbol.symbol}
            width={20}
            height={20}
          />
        </span>
      );
    }
    return <span key={part}>{part}</span>;
  });
};
export default async function Page({ searchParams }: Readonly<PageProps>) {
  const { name } = await searchParamsCache.parse(searchParams);
  const cardData = await fetchCard(name);
  const symbolsData = await fetchSymbols();

  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-3xl`}>{cardData.name}</CardTitle>
              <CardDescription>{cardData.type_line}</CardDescription>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">
                Mana Cost{" "}
                {cardData.mana_cost ? (
                  <div className={"flex flex-row gap-x-1"}>
                    {loadSymbol(cardData.mana_cost, symbolsData)}
                  </div>
                ) : (
                  "No mana cost"
                )}
              </span>
              <p className="text-sm text-muted-foreground">
                CMC: {cardData.cmc}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className={"mx-auto"}>
              {cardData.image_uris ? (
                <img
                  src={cardData.image_uris.normal}
                  alt={cardData.name}
                  width={350}
                  height={370}
                  className="rounded-lg shadow-lg"
                />
              ) : (
                "No image available"
              )}
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Oracle Text</h3>
                <p>
                  {cardData.oracle_text &&
                    parseText(cardData.oracle_text, symbolsData)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Set Information</h3>
                <p>
                  Set: {cardData.set_name} ({cardData.set.toUpperCase()})
                </p>
                <p>Rarity: {cardData.rarity}</p>
                <p>Collector Number: {cardData.collector_number}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Legalities</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(cardData.legalities).map(
                    ([format, legality]) => (
                      <Badge
                        key={format}
                        variant={legality === "legal" ? "default" : "secondary"}
                      >
                        {format}: {legality.replace("_", " ")}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Artist: {cardData.artist}
            </p>
            <p className="text-sm text-muted-foreground">
              Released: {cardData.released_at}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">
              Price (MTGO): {cardData.prices.tix} tix
            </p>
            <a
              href={cardData.scryfall_uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View on Scryfall
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
