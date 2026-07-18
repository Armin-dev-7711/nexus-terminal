// مسیر: src/app/not-found.tsx
import Link from "next/link";
import { Hexagon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className='h-screen w-full bg-[#09090b] text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden'>
      {/* Neon-colored backgrounds to create a sense of depth */}
      <div className='absolute -top-40 left-1/2 -translate-x-1/2 size-96 bg-primary/5 rounded-full blur-3xl' />
      <div className='absolute -bottom-20 left-1/3 size-80 bg-blue-500/5 rounded-full blur-3xl' />

      <div className='relative z-10 max-w-md w-full text-center space-y-6 flex flex-col items-center'>
        {/* Logo */}
        <div className='size-12 rounded-xl bg-card border border-border/60 flex items-center justify-center text-primary shadow-xl'>
          <Hexagon className='size-6' />
        </div>

        {/* Error code */}
        <div className='space-y-1'>
          <h1 className='text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/20'>
            404
          </h1>
          <p className='text-base font-semibold tracking-tight text-foreground'>
            Lost in the Nexus Space
          </p>
          <p className='text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed'>
            The page you are looking for doesn&apos;t exist or has been securely
            migrated to another ledger route.
          </p>
        </div>

        {/* Smart Back Button */}
        <Button
          asChild
          className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xs px-6 h-10 shadow-lg shadow-primary/10 transition-all group'
        >
          <Link href='/dashboard'>
            <ArrowLeft className='size-3.5 mr-2 group-hover:-translate-x-1 transition-transform' />
            Return to Terminal
          </Link>
        </Button>
      </div>

      {/* Subtle Footer Watermark */}
      <span className='absolute bottom-6 text-[9px] text-muted-foreground/40 uppercase tracking-widest'>
        Nexus Ledger Systems © 2026
      </span>
    </div>
  );
}
