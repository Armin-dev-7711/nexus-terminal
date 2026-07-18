// src/features/settings/hooks/usePreferencesSettings.ts
"use client";

import { useState, useTransition, FormEvent } from "react";
import { toast } from "sonner";
import { mockUserProfile } from "../mocks/settings.mock";
import {
  ThemePreference,
  CurrencyPreference,
  LanguagePreference,
} from "../types";

export function usePreferencesSettings() {
  const [isPending, startTransition] = useTransition();

  const [prefs, setPrefs] = useState<{
    theme: ThemePreference;
    currency: CurrencyPreference;
    language: LanguagePreference;
    timezone: string;
  }>({
    theme: mockUserProfile.theme,
    currency: mockUserProfile.currency,
    language: mockUserProfile.language,
    timezone: mockUserProfile.timezone,
  });

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Preferences Saved", {
        description: "Your platform settings have been updated successfully.",
      });
    });
  };

  return { isPending, prefs, setPrefs, handleSave };
}
