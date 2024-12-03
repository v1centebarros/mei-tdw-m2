"use client";

import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/getQueryClient";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Providers({
                                    children
                                  }: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary queryClient={queryClient}>
            {children}
          </HydrationBoundary>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
