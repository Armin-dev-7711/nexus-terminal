//  src/features/settings/hooks/useNotificationSettings.ts
"use client";

import { useTransition } from "react";
import { toast } from "sonner";

export function useNotificationSettings() {
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Settings Saved", {
        description: "Notification preferences updated.",
      });
    });
  };

  return { isPending, handleSave };
}
