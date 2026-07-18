// src/features/support/components/TicketSection.tsx
"use client";

import * as React from "react";
import {
  Plus,
  MessageSquare,
  ShieldAlert,
  CheckCircle2,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SupportTicket, SupportCategory } from "../types";
import { useTickets } from "../hooks/useTickets";

function RefreshCwIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
      <path d='M3 3v5h5' />
      <path d='M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16' />
      <path d='M16 16h5v5' />
    </svg>
  );
}

const getStatusBadge = (status: SupportTicket["status"]) => {
  switch (status) {
    case "open":
      return (
        <span className='inline-flex items-center gap-1 text-[10px] text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 font-bold'>
          <Clock className='size-3' /> Open
        </span>
      );
    case "processing":
      return (
        <span className='inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-bold '>
          <RefreshCwIcon className='size-3 animate-spin' /> Processing
        </span>
      );
    case "resolved":
      return (
        <span className='inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold '>
          <CheckCircle2 className='size-3' /> Resolved
        </span>
      );
  }
};

interface TicketSectionProps {
  initialTickets: SupportTicket[];
}

export function TicketSection({ initialTickets }: TicketSectionProps) {
  const {
    tickets,
    subject,
    setSubject,
    category,
    setCategory,
    isPending,
    handleSubmit,
  } = useTickets(initialTickets);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
      <Card className='lg:col-span-2 border-border/40 bg-card/20 backdrop-blur-xl rounded-3xl shadow-xl'>
        <CardHeader>
          <CardTitle className='text-base  font-bold text-foreground flex items-center gap-2'>
            <MessageSquare className='size-4 text-primary shrink-0' /> Open
            Operational Ticket
          </CardTitle>
          <CardDescription className='text-xs'>
            Direct communications stream with Nexus Core Engineers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='ticket-subject'
                className='text-[10px]  uppercase tracking-wider text-muted-foreground'
              >
                Context Subject
              </label>
              <Input
                id='ticket-subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder='Briefly describe the anomaly...'
                disabled={isPending}
                aria-label='Context Subject'
                className='h-10 rounded-xl bg-background/50 border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='ticket-category'
                className='text-[10px]  uppercase tracking-wider text-muted-foreground'
              >
                Node Pipeline
              </label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as SupportCategory)}
                disabled={isPending}
              >
                <SelectTrigger
                  id='ticket-category'
                  aria-label='Select Node Pipeline'
                  className='w-full h-10 px-3 text-xs bg-background/50 border border-border/60 rounded-xl text-foreground focus:ring-1 focus:ring-primary  text-left transition-all'
                >
                  <SelectValue placeholder='Select Pipeline' />
                </SelectTrigger>
                <SelectContent className='rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'>
                  <SelectItem
                    value='node_execution'
                    className='text-xs rounded-lg cursor-pointer focus:bg-muted/50'
                  >
                    Node Execution & Streams
                  </SelectItem>
                  <SelectItem
                    value='billing'
                    className='text-xs rounded-lg cursor-pointer focus:bg-muted/50'
                  >
                    Ledger Billing & Plans
                  </SelectItem>
                  <SelectItem
                    value='api_integration'
                    className='text-xs rounded-lg cursor-pointer focus:bg-muted/50'
                  >
                    Developer API Integrations
                  </SelectItem>
                  <SelectItem
                    value='security'
                    className='text-xs rounded-lg cursor-pointer focus:bg-muted/50'
                  >
                    Vault & Security Access
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type='submit'
              disabled={isPending || !subject.trim()}
              className='w-full h-10 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/10 cursor-pointer'
            >
              {isPending ? (
                "Indexing..."
              ) : (
                <>
                  <Plus className='size-4 mr-1.5' /> Submit Ticket
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className='lg:col-span-3 border-border/40 bg-card/20 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden'>
        <CardHeader>
          <CardTitle className='text-base font-bold text-foreground'>
            Active Connection Tickets
          </CardTitle>
          <CardDescription className='text-xs'>
            Historical logging of your secure communication streams.
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0 border-t border-border/30'>
          <div className='divide-y divide-border/30'>
            {tickets.length > 0 ? (
              tickets.map((t) => (
                <div
                  key={t.id}
                  className='flex items-center justify-between p-4 px-6 hover:bg-muted/5 transition-colors gap-4'
                >
                  <div className='min-w-0 space-y-1'>
                    <div className='flex items-center gap-2 flex-wrap'>
                      <span className=' text-[10px] font-bold text-primary'>
                        {t.id}
                      </span>
                      <span className='text-[9px]  uppercase text-muted-foreground/60 tracking-wider'>
                        [{t.category.replace("_", " ")}]
                      </span>
                    </div>
                    <p className='text-xs font-medium text-foreground truncate max-w-sm sm:max-w-md'>
                      {t.subject}
                    </p>
                  </div>
                  <div className='flex flex-col items-end gap-1 shrink-0'>
                    {getStatusBadge(t.status)}
                    <span className='text-[9px]  text-muted-foreground/40'>
                      {t.lastUpdate}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='p-8 text-center py-12 flex flex-col items-center gap-2'>
                <ShieldAlert className='size-6 text-muted-foreground/30' />
                <p className='text-xs text-muted-foreground font-medium'>
                  No operational log tickets found.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
