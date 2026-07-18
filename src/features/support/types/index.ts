export type TicketStatus = "open" | "processing" | "resolved";
export type SupportCategory =
  | "node_execution"
  | "billing"
  | "api_integration"
  | "security";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: SupportCategory;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: SupportCategory;
  status: TicketStatus;
  createdAt: string;
  lastUpdate: string;
}

export interface PopularArticle {
  id: string;
  title: string;
  readTime: string;
  category: SupportCategory;
}
