//  src/features/support/components/SupportDashboard.tsx
"use client";

import * as React from "react";
import { Search, Activity, BookOpen, ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockFaqs, mockTickets, mockArticles } from "../mocks/support.mock";
import { FaqSection } from "./FaqSection";
import { TicketSection } from "./TicketSection";

import { useSupportDashboard } from "../hooks/useSupportDashboard";

export function SupportDashboard() {
  const { isMounted, searchQuery, setSearchQuery, handleArticleClick } =
    useSupportDashboard();

  if (!isMounted)
    return (
      <div className='animate-pulse h-[80vh] bg-muted/5 rounded-3xl border border-border/40' />
    );

  return (
    <div className='flex-1 space-y-8 p-6 pt-8 md:p-8 max-w-5xl mx-auto w-full animate-in fade-in duration-700'>
      {/* 1. HERO SECTION */}
      <div className='text-center max-w-xl mx-auto space-y-4 pt-4 relative'>
        <div className='absolute inset-0 bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none' />
        <h2 className='text-3xl font-black text-foreground tracking-tight sm:text-4xl'>
          Terminal Support Core
        </h2>
        <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
          Search cryptographic documentation nodes, audit live connections, or
          open direct support channels.
        </p>
        <div className='relative max-w-md mx-auto pt-2'>
          <Search className='absolute left-3.5 top-1/2 z-20 -translate-y-1 size-4 text-primary' />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search documentation, API protocols, codes...'
            className='h-11 pl-10 pr-4 bg-background/50 backdrop-blur-md rounded-xl border-border/60 text-xs focus-visible:ring-1 focus-visible:ring-primary'
          />
        </div>
      </div>

      {/* 2. POPULAR ARTICLES & SYSTEM STATUS */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4'>
        <Card className='lg:col-span-1 border-primary/30 bg-gradient-to-br from-primary/[0.03] to-transparent backdrop-blur-xl rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-xl'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-sm font-bold text-foreground'>
                Nexus Grid Node Status
              </CardTitle>
              <Activity className='size-4 text-primary animate-pulse' />
            </div>
            <CardDescription className='text-[10px]  uppercase tracking-wider text-primary'>
              All Engines Operational
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-6'>
            <div className=' space-y-2.5 text-xs text-muted-foreground'>
              <div className='flex justify-between items-center gap-4'>
                <span className='truncate'>Core Gateway:</span>
                <span className='text-foreground font-bold shrink-0'>
                  99.99%
                </span>
              </div>
              <div className='flex justify-between items-center gap-4'>
                <span className='truncate'>Prisma Edge Database:</span>
                <span className='text-foreground font-bold shrink-0'>
                  Operational
                </span>
              </div>
              <div className='flex justify-between items-center gap-4'>
                <span className='truncate'>WS AI Engine Index:</span>
                <span className='text-foreground font-bold shrink-0'>
                  14ms latency
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='lg:col-span-2 border-border/40 bg-card/20 backdrop-blur-xl rounded-3xl shadow-xl'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-sm font-bold text-foreground flex items-center gap-1.5'>
              <BookOpen className='size-4 text-primary' /> Popular Node Runbooks
            </CardTitle>
          </CardHeader>
          <CardContent className='p-0 border-t border-border/20'>
            <div className='divide-y divide-border/20'>
              {mockArticles.map((art) => (
                <div
                  key={art.id}
                  className='flex items-center justify-between p-3.5 px-6 hover:bg-muted/5 transition-colors cursor-pointer group text-xs'
                  onClick={() => handleArticleClick(art.title)}
                >
                  <span className='font-medium text-foreground/80 group-hover:text-primary transition-colors truncate max-w-xs sm:max-w-md'>
                    {art.title}
                  </span>
                  <div className='flex items-center gap-3 shrink-0  text-[10px] text-muted-foreground/60'>
                    <span>{art.readTime}</span>
                    <ExternalLink className='size-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. KNOWLEDGE BASE */}
      <FaqSection faqs={mockFaqs} searchQuery={searchQuery} />

      {/* 4. TICKETS */}
      <TicketSection initialTickets={mockTickets} />
    </div>
  );
}
