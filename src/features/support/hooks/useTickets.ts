"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SupportTicket, SupportCategory } from "../types";
import { getTickets, createTicket } from "../actions/support.actions";

export const TICKETS_QUERY_KEY = ["support_tickets"];

export function useTicketsData() {
  return useQuery({
    queryKey: TICKETS_QUERY_KEY,
    queryFn: async () => await getTickets(),
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { subject: string; category: SupportCategory }) =>
      createTicket(data),
    onMutate: async (newTicketData) => {
      await queryClient.cancelQueries({ queryKey: TICKETS_QUERY_KEY });

      const previousTickets = queryClient.getQueryData<SupportTicket[]>(
        TICKETS_QUERY_KEY
      );

      const optimisticTicket: SupportTicket = {
        id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        ticketId: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: newTicketData.subject,
        category: newTicketData.category,
        status: "open",
        createdAt: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
      };

      queryClient.setQueryData<SupportTicket[]>(TICKETS_QUERY_KEY, (old) => {
        return [optimisticTicket, ...(old || [])];
      });

      return { previousTickets };
    },
    onError: (err, newTicketData, context) => {
      queryClient.setQueryData(TICKETS_QUERY_KEY, context?.previousTickets);
      toast.error(err?.message || "Failed to create ticket");
    },
    onSuccess: (data) => {
      toast.success("Support Ticket Created", {
        description: `Our operations node has indexed your ticket: ${data.ticketId}`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
