// src/features/settings/hooks/useDeveloperSettings.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";

export function useDeveloperSettings() {
  const [hiddenKeys, setHiddenKeys] = useState<Record<string, boolean>>({});

  const toggleVisibility = (id: string) => {
    setHiddenKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Key Copied", {
      description: "API Key copied to clipboard.",
    });
  };

  return { hiddenKeys, toggleVisibility, copyKey };
}
