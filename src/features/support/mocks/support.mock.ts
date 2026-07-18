import { FaqItem, SupportTicket, PopularArticle } from "../types";

export const mockFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "Why is my WebSocket connection dropping intermittently?",
    answer:
      "Most dropping issues occur due to token expiration or local network throttling. Ensure your client heartbeat interval is set to 30 seconds and your authorization headers are rotated correctly.",
    category: "node_execution",
  },
  {
    id: "faq-2",
    question: "How is the annual discount calculated for Pro Terminal?",
    answer:
      "The annual plan offers a 35% overall discount compared to standard monthly commitments. Billing occurs in a single cryptographic capture cycle at the beginning of the annual index.",
    category: "billing",
  },
  {
    id: "faq-3",
    question: "What happens if my API Key rate limits are breached?",
    answer:
      "When rate boundaries are breached, our gateway returns a 429 Too Many Requests log. Your node will be throttled for exactly 60 seconds before full throughput execution resumes automatically.",
    category: "api_integration",
  },
];

export const mockTickets: SupportTicket[] = [
  {
    id: "TCK-8921",
    subject: "Stripe checkout session failed during crypto gas sync",
    category: "billing",
    status: "processing",
    createdAt: "2026-07-08T14:22:00Z",
    lastUpdate: "10 mins ago",
  },
  {
    id: "TCK-4402",
    subject: "Webhook signature verification throwing mismatch errors",
    category: "api_integration",
    status: "resolved",
    createdAt: "2026-07-01T09:15:00Z",
    lastUpdate: "3 days ago",
  },
];

export const mockArticles: PopularArticle[] = [
  {
    id: "art-1",
    title: "Optimizing High-Throughput WebSocket Streams",
    readTime: "4 min read",
    category: "node_execution",
  },
  {
    id: "art-2",
    title: "Securing Production Environments with Dedicated API Keys",
    readTime: "6 min read",
    category: "security",
  },
  {
    id: "art-3",
    title: "Resolving Webhook Signature Discrepancies",
    readTime: "3 min read",
    category: "api_integration",
  },
];
