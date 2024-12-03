import { getQueryClient } from "@/lib/getQueryClient";
import { cardOptions } from "@/lib/hooks/useCards";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(cardOptions(1));

  return (
    <main>
      <h1>Cards List</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchBar />
      </HydrationBoundary>
    </main>
  );
}
