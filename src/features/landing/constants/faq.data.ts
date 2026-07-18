// src/features/landing/constants/faq.data.ts
import { FAQItem } from "../types/faq.types";

export const FAQ_DATA: FAQItem[] = [
  {
    id: "sec-01",
    category: "Security",
    readTime: "1m read",
    question: "How secure is the Nexus infrastructure?",
    answer:
      "Nexus employs military-grade cryptographic protocols. All portfolio states and API keys are encrypted at rest using AES-256 and in transit via TLS 1.3. We operate zero-knowledge architecture, meaning your private keys never touch our servers.",
    relatedTopics: ["Encryption", "Zero-Knowledge", "Private Keys"],
  },
  {
    id: "wal-01",
    category: "Wallets",
    readTime: "2m read",
    question: "Can I connect multiple wallets across different networks?",
    answer:
      "Yes. Our universal sync engine supports over 40 distinct blockchains. You can aggregate unlimited wallets, exchange APIs, and cold storage addresses into a single unified cryptographic state without manual bridging.",
    relatedTopics: ["Ledger Sync", "Supported Networks", "Cold Storage"],
  },
  {
    id: "ai-01",
    category: "AI Engine",
    readTime: "2m read",
    question: "How does the predictive AI Analytics model operate?",
    answer:
      "The Nexus AI parses millions of real-time market data points against your portfolio allocations. It utilizes predictive machine learning to forecast volatility, suggest algorithmic rebalancing, and identify yield opportunities with sub-millisecond latency.",
    relatedTopics: ["Predictive Models", "Yield Optimization", "Latency"],
  },
  {
    id: "inf-01",
    category: "Infrastructure",
    readTime: "1m read",
    question: "Does Nexus support enterprise teams and shared nodes?",
    answer:
      "Absolutely. The Enterprise tier provides dedicated infrastructure, private RPC nodes, and role-based access control (RBAC). You can deploy shared dashboards for quantitative engineering teams with custom permission hierarchies.",
    relatedTopics: ["RBAC", "Private RPC", "Team Deployment"],
  },
  {
    id: "bil-01",
    category: "Billing",
    readTime: "1m read",
    question: "Can I pause or cancel my operational tier at any time?",
    answer:
      "Yes, billing is fully transparent. You can downgrade or pause your operational tier at any moment from the billing terminal. Prorated refunds are automatically calculated and issued directly via smart contract settlement.",
    relatedTopics: ["Proration", "Smart Contracts", "Downgrades"],
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Security: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Wallets: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "AI Engine": "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Infrastructure: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Billing: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};
