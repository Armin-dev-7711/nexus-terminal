// src/features/landing/types/faq.types.ts

export type FAQCategory =
  | "Security"
  | "Wallets"
  | "AI Engine"
  | "Analytics"
  | "Billing"
  | "Infrastructure"
  | "API";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  readTime: string;
  question: string;
  answer: string;
  relatedTopics: string[];
}
