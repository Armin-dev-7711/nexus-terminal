// src/features/settings/types/index.ts

export type ThemePreference = "light" | "dark" | "system";
export type CurrencyPreference = "USD" | "EUR" | "GBP" | "JPY";
export type LanguagePreference = "English" | "Persian" | "French";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  timezone: string;
  currency: CurrencyPreference;
  language: LanguagePreference;
  theme: ThemePreference;
}

export interface ActiveSession {
  id: string;
  device: string; // e.g., "MacBook Pro"
  browser: string; // e.g., "Chrome"
  location: string; // e.g., "Long Beach, USA"
  ipAddress: string;
  lastActive: string; // ISO Date
  isCurrent: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string; // e.g., "nx_live_8f9..."
  createdAt: string;
  lastUsed: string | null;
}
