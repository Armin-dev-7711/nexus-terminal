// src/features/support/components/FaqSection.tsx
"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaqItem } from "../types";

import { useFaqSection } from "../hooks/useFaqSection";

interface FaqSectionProps {
  faqs: FaqItem[];
  searchQuery: string;
}

export function FaqSection({ faqs, searchQuery }: FaqSectionProps) {
  // Get filtered statuses and articles
  const { openId, filteredFaqs, toggleFaq } = useFaqSection(faqs, searchQuery);

  return (
    <Card className='rounded-3xl border border-border/40 bg-card/20 backdrop-blur-xl overflow-hidden shadow-lg'>
      <CardHeader>
        <CardTitle className='text-base font-bold text-foreground flex items-center gap-2'>
          <HelpCircle className='size-4 text-primary shrink-0' /> Synchronized
          Knowledge Base
        </CardTitle>
        <CardDescription className='text-xs'>
          Instant cryptographic solutions for typical system anomalies.
        </CardDescription>
      </CardHeader>
      <CardContent className='p-4 sm:p-6 border-t border-border/30'>
        <div className='space-y-2'>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={cn(
                    "border border-border/20 rounded-2xl transition-all overflow-hidden",
                    isOpen
                      ? "bg-muted/10 border-border/50 shadow-inner"
                      : "bg-muted/5 hover:bg-muted/10",
                  )}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className='w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer'
                  >
                    <span className='text-xs sm:text-sm font-semibold text-foreground/90'>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180 text-primary",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out text-xs text-muted-foreground leading-relaxed",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 p-4 pt-0 border-t border-border/10"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className='overflow-hidden'>{faq.answer}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='p-6 text-center text-xs text-muted-foreground'>
              No matching records found for index hash sequence.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
