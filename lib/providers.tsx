"use client";

import {HydrationBoundary, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {getQueryClient} from "@/lib/getQueryClient";
export default function Providers({
                                      children,
                                  }: Readonly<{
    children: React.ReactNode;
}>) {

    const queryClient = getQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary queryClient={queryClient}>
                {children}
            </HydrationBoundary>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}