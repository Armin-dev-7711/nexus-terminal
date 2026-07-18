//  src/features/support/hooks/useSupportDashboard.ts
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useSupportDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // eslint-disable-next-line
      setIsMounted(true);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleArticleClick = (title: string) => {
    toast.info("Runbook Stream Access", {
      description: `Loading article buffer layout for: ${title}`,
    });
  };

  return {
    isMounted,
    searchQuery,
    setSearchQuery,
    handleArticleClick,
  };
}
