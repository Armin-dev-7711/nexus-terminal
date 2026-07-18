// src/features/settings/mocks/settings.mock.ts

import { UserProfile, ActiveSession, ApiKey } from "../types";

export const mockUserProfile: UserProfile = {
  id: "usr_1001",
  firstName: "Arshad",
  lastName: "Dev",
  email: "candidate@nexus.cap",
  timezone: "America/Los_Angeles",
  currency: "USD",
  language: "English",
  theme: "dark",
};

export const mockSessions: ActiveSession[] = [
  {
    id: "sess_1",
    device: "MacBook Pro M3",
    browser: "Chrome 125.0",
    location: "Long Beach, CA, USA",
    ipAddress: "192.168.1.105",
    lastActive: new Date().toISOString(),
    isCurrent: true,
  },
  {
    id: "sess_2",
    device: "iPhone 15 Pro",
    browser: "Safari Mobile",
    location: "Long Beach, CA, USA",
    ipAddress: "10.0.0.42",
    lastActive: "2026-07-06T18:30:00Z",
    isCurrent: false,
  },
];

export const mockApiKeys: ApiKey[] = [
  {
    id: "key_1",
    name: "Binance Sync Read-Only",
    keyPrefix: "nx_live_8f9d...a1b2",
    createdAt: "2026-06-15T10:00:00Z",
    lastUsed: "2026-07-07T08:15:00Z",
  },
];
