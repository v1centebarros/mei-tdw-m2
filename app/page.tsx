import React from "react";
import { Card } from "@/components/ui/card";
import { LucideDiff, LucideFolder, LucideLayers, LucideSearch, LucideSettings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

  return (
    <main className="container mx-auto bg-[hsl(var(--background))] p-8 text-[hsl(var(--foreground))]">
      <section
        className="mb-12 rounded-lg bg-[hsl(var(--primary))] py-16 text-center text-[hsl(var(--primary-foreground))]">
        <h1 className="mb-4 text-4xl font-bold">
          Magic: The Gathering Deck Manager
        </h1>
        <p className="mb-6 text-lg">
          Discover, compare, and manage your favorite Magic: The Gathering
          cards effortlessly.
        </p>
        <Link
          href="/search"
          className="rounded bg-[hsl(var(--secondary))] px-6 py-3 font-semibold text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--secondary))]"
        >
          Get Started
        </Link>
      </section>

      <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[hsl(var(--card))] p-6 text-center text-[hsl(var(--card-foreground))]">
          <LucideSearch
            size={48}
            className="mx-auto mb-4 text-[hsl(var(--primary))]"
          />
          <h2 className="mb-2 text-xl font-semibold">Advanced Search</h2>
          <p>
            Utilize the{" "}
            <a
              href="https://scryfall.com/docs/syntax"
              target="_blank"
              className="text-[hsl(var(--primary))] underline"
            >
              Scryfall API syntax
            </a>{" "}
            for detailed card searches with filters.
          </p>
        </Card>

        <Card className="bg-[hsl(var(--card))] p-6 text-center text-[hsl(var(--card-foreground))]">
          <LucideFolder
            size={48}
            className="mx-auto mb-4 text-[hsl(var(--primary))]"
          />
          <h2 className="mb-2 text-xl font-semibold">
            Collection Management
          </h2>
          <p>
            Organize your favorite cards, owned cards, and wishlist in a
            personalized collection.
          </p>
        </Card>

        <Card className="bg-[hsl(var(--card))] p-6 text-center text-[hsl(var(--card-foreground))]">
          <LucideDiff
            size={48}
            className="mx-auto mb-4 text-[hsl(var(--primary))]"
          />
          <h2 className="mb-2 text-xl font-semibold">Card Comparison</h2>
          <p>
            Compare two cards side by side to analyze their stats, effects,
            and prices.
          </p>
        </Card>

        <Card className="bg-[hsl(var(--card))] p-6 text-center text-[hsl(var(--card-foreground))]">
          <LucideSettings
            size={48}
            className="mx-auto mb-4 text-[hsl(var(--primary))]"
          />
          <h2 className="mb-2 text-xl font-semibold">Custom Settings</h2>
          <p>
            Adjust settings like preferred currency (USD, EUR, or TIX) for a
            personalized experience.
          </p>
        </Card>

        <Card className="bg-[hsl(var(--card))] p-6 text-center text-[hsl(var(--card-foreground))]">
          <LucideLayers
            size={48}
            className="mx-auto mb-4 text-[hsl(var(--primary))]"
          />
          <h2 className="mb-2 text-xl font-semibold">Deck Builder</h2>
          <p>
            Create, customize, and save your decks to prepare for your next
            match.
          </p>
        </Card>

        <Card className="bg-[hsl(var(--card))] p-6 text-center text-[hsl(var(--card-foreground))]">
          <LucideSearch
            size={48}
            className="mx-auto mb-4 text-[hsl(var(--primary))]"
          />
          <h2 className="mb-2 text-xl font-semibold">Seamless Navigation</h2>
          <p>
            Enjoy fluid navigation between pages with accessible links for
            each feature.
          </p>
        </Card>
      </section>

      <section className="mb-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Powered by Scryfall API</h2>
        <p className="mb-6">
          This project integrates with the{" "}
          <a
            href="https://scryfall.com"
            target="_blank"
            className="text-[hsl(var(--primary))] underline"
          >
            Scryfall API
          </a>{" "}
          to provide comprehensive card data, advanced searches, and
          up-to-date prices.
        </p>
        <Link
          href="https://scryfall.com/docs/api"
          target={"_blank"}
          className="rounded bg-[hsl(var(--primary))] px-6 py-3 text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--secondary))]"
        >
          Learn More
        </Link>
      </section>

      <section className="text-center">
        <h2 className="mb-4 text-2xl font-bold">
          Your Gateway to MTG Mastery
        </h2>
        <p className="mb-8">
          Start building your collection and decks today with the ultimate MTG
          deck manager.
        </p>
        <Image
          src="/banner.webp"
          alt="Banner"
          className="mb-6 h-auto w-full rounded-lg"
          width={2000}
          height={1087}
        />
      </section>

      <footer className="py-4 text-center text-[hsl(var(--muted-foreground))]">
        Made with ❤️ by{" "}
        <Link
          className={"underline-offset-2 hover:underline"}
          href={"https://github.com/v1centebarros"}
          target={"_blank"}
        >
          v1centebarros
        </Link>{" "}
        for TDW 2024
      </footer>
    </main>
  );
}
