// src/features/support/hooks/useTickets.ts
"use client";

import { useState, useTransition, FormEvent } from "react";
import { toast } from "sonner";
import { SupportTicket, SupportCategory } from "../types";

export function useTickets(initialTickets: SupportTicket[]) {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<SupportCategory>("node_execution");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    startTransition(async () => {
      // Simulate a request to the server
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newTicket: SupportTicket = {
        id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        subject,
        category,
        status: "open",
        createdAt: new Date().toISOString(),
        lastUpdate: "Just now",
      };

      setTickets((prev) => [newTicket, ...prev]);
      setSubject("");
      toast.success("Support Ticket Created", {
        description: `Our operations node has indexed your ticket: ${newTicket.id}`,
      });
    });
  };

  return {
    tickets,
    subject,
    setSubject,
    category,
    setCategory,
    isPending,
    handleSubmit,
  };
}
