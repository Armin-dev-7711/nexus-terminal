// src/features/support/hooks/useFaqSection.ts
"use client";

import { useState, useMemo } from "react";
import { FaqItem } from "../types";

export function useFaqSection(faqs: FaqItem[], searchQuery: string) {
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query),
    );
  }, [faqs, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return {
    openId,
    filteredFaqs,
    toggleFaq,
  };
}
