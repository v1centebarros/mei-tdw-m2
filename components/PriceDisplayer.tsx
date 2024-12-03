"use client";

import { Prices } from "@/lib/types/card";
import { useSettingsStore } from "@/lib/stores/settingsStore";
import React from "react";

interface PriceDisplayerProps {
  prices: Prices;
}

export default function PriceDisplayer({ prices }: Readonly<PriceDisplayerProps>) {
  const { currency } = useSettingsStore();

  const getPriceDisplay = () => {
    switch (currency) {
      case "usd":
        return `Price: $${prices.usd ?? "N/A"}`;
      case "eur":
        return `Price: €${prices.eur ?? "N/A"}`;
      case "tix":
        return `Price (MTGO): ${prices.tix ?? "N/A"} tix`;
      default:
        return `Price: ${prices.usd ?? "N/A"} USD`; // Fallback to USD
    }
  };

  return <p className="text-sm font-semibold">{getPriceDisplay()}</p>;
}
