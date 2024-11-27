"use client";

import {HydrationBoundary, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export default function Providers({
                                      children,
                                  }: Readonly<{
    children: React.ReactNode;
}>) {

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary queryClient={queryClient}>
                {children}
            </HydrationBoundary>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}