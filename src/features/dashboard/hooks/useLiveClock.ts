// src/features/dashboard/hooks/useLiveClock.ts
"use client";

import { useState, useEffect } from "react";

export function useLiveClock() {
  const [currentTime, setCurrentTime] = useState("Syncing network time...");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
}
