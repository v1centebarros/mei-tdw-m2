import { getQueryClient } from "@/lib/getQueryClient";
import { cardOptions } from "@/lib/hooks/useCards";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { Card } from "@/components/ui/card";
import { LucideDiff, LucideFolder, LucideLayers, LucideSearch, LucideSettings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(cardOptions(1));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto p-8 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        <section
          className="text-center py-16 rounded-lg mb-12 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
          <h1 className="text-4xl font-bold mb-4">Magic: The Gathering Deck Manager</h1>
          <p className="text-lg mb-6">
            Discover, compare, and manage your favorite Magic: The Gathering cards effortlessly.
          </p>
          <Link href="/search"
                className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] font-semibold hover:bg-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--secondary))] px-6 py-3 rounded">
            Get Started
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
            <LucideSearch size={48} className="text-[hsl(var(--primary))] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Advanced Search</h2>
            <p>
              Utilize the <a href="https://scryfall.com/docs/syntax" target="_blank"
                             className="text-[hsl(var(--primary))] underline">Scryfall API syntax</a> for detailed
              card searches with filters.
            </p>
          </Card>

          <Card className="p-6 text-center bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
            <LucideFolder size={48} className="text-[hsl(var(--primary))] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Collection Management</h2>
            <p>
              Organize your favorite cards, owned cards, and wishlist in a personalized collection.
            </p>
          </Card>

          <Card className="p-6 text-center bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
            <LucideDiff size={48} className="text-[hsl(var(--primary))] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Card Comparison</h2>
            <p>
              Compare two cards side by side to analyze their stats, effects, and prices.
            </p>
          </Card>

          <Card className="p-6 text-center bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
            <LucideSettings size={48} className="text-[hsl(var(--primary))] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Custom Settings</h2>
            <p>
              Adjust settings like preferred currency (USD, EUR, or TIX) for a personalized experience.
            </p>
          </Card>

          <Card className="p-6 text-center bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
            <LucideLayers size={48} className="text-[hsl(var(--primary))] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Deck Builder</h2>
            <p>
              Create, customize, and save your decks to prepare for your next match.
            </p>
          </Card>

          <Card className="p-6 text-center bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
            <LucideSearch size={48} className="text-[hsl(var(--primary))] mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Seamless Navigation</h2>
            <p>
              Enjoy fluid navigation between pages with accessible links for each feature.
            </p>
          </Card>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Powered by Scryfall API</h2>
          <p className="mb-6">
            This project integrates with the <a href="https://scryfall.com" target="_blank"
                                                className="text-[hsl(var(--primary))] underline">Scryfall API</a> to
            provide comprehensive card data, advanced searches, and up-to-date prices.
          </p>
          <Link
            href="https://scryfall.com/docs/api"
            target={"_blank"}
            className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-6 py-3 rounded hover:bg-[hsl(var(--secondary))]">
            Learn More
          </Link>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Gateway to MTG Mastery</h2>
          <p className="mb-8">
            Start building your collection and decks today with the ultimate MTG deck manager.
          </p>
          <Image src="/banner.webp" alt="Banner" className="w-full h-auto rounded-lg mb-6" width={2000} height={1087} />
        </section>

        <footer className="text-center py-4 text-[hsl(var(--muted-foreground))]">
        Made with ❤️ by <Link
          className={"hover:underline underline-offset-2"}
          href={"https://github.com/v1centebarros"} target={"_blank"}>v1centebarros</Link> for TDW 2024
        </footer>
      </main>
    </HydrationBoundary>
  );
}
