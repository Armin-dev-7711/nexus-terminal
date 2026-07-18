// src/features/landing/hooks/usePricingState.ts
"use client";

import * as React from "react";
import { BillingPeriod, CurrencyType } from "../types/pricing.types";
import { CURRENCY_CONVERSION } from "../constants/pricing.data";

export function usePricingState() {
  const [billingPeriod, setBillingPeriod] =
    React.useState<BillingPeriod>("monthly");
  const [currency, setCurrency] = React.useState<CurrencyType>("USD");

  const toggleBilling = React.useCallback(() => {
    setBillingPeriod((prev) => (prev === "monthly" ? "annual" : "monthly"));
  }, []);

  const changeCurrency = React.useCallback((type: CurrencyType) => {
    setCurrency(type);
  }, []);

  // 🚀 Instant price calculation based on conversion rate and invoice period
  const calculatePrice = React.useCallback(
    (basePriceMonthly: number, basePriceAnnual: number) => {
      const base =
        billingPeriod === "monthly" ? basePriceMonthly : basePriceAnnual;
      const conversion = CURRENCY_CONVERSION[currency];

      if (!conversion) return { symbol: "$", convertedPrice: base };

      return {
        symbol: conversion.symbol,
        convertedPrice: Math.round(base * conversion.rate),
      };
    },
    [billingPeriod, currency],
  );

  return {
    billingPeriod,
    currency,
    toggleBilling,
    changeCurrency,
    calculatePrice,
  };
}
