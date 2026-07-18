// src/features/landing/components/faq/FAQSection.tsx
"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { Search } from "lucide-react";
import { FAQ_DATA } from "../../constants/faq.data";
import { FAQCard } from "./FAQCard";

export function FAQSection() {
  const [openId, setOpenId] = React.useState<string | null>(FAQ_DATA[0].id);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px" });

  return (
    <section
      ref={sectionRef}
      className='w-full py-24 md:py-32 relative bg-[#050507] overflow-hidden flex flex-col items-center justify-center'
    >
      <div className='absolute inset-0 z-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]'>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 60 0 L 0 0 0 60\' fill=\'none\' stroke=\'white\' strokeWidth=\'1\'/%3E%3C/svg%3E')]" />

        {isInView && (
          <>
            <motion.div
              animate={{
                x: ["-20%", "0%", "-20%"],
                y: ["0%", "10%", "0%"],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className='absolute top-[-10%] left-[10%] md:left-[20%] w-[600px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] transform-gpu'
            />
            <motion.div
              animate={{
                x: ["20%", "0%", "20%"],
                y: ["10%", "0%", "10%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className='absolute top-[20%] right-[10%] md:right-[20%] w-[500px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px] transform-gpu'
            />
          </>
        )}

        <div
          className='absolute inset-0 opacity-[0.03] mix-blend-overlay transform-gpu'
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMc/kBAAAACHRSTlMAAAAAAABhGPeXoQAAAIZJREFUOMuV1bENwCAMQ9FwEQ4yQrEB82cgP1UqROrt1L9PsoL/2E4h5aDUI9Qj1CPUo5P/e5z0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz05Z5yCweK6T23AAAAAElFTkSuQmCC")`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className='max-w-3xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col items-center'>
        {/* Scroll Reveal, Header, Search Bar and FAQ Cards Codes */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className='w-full flex flex-col items-center'
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className='text-center max-w-3xl mx-auto mb-20 md:mb-28 space-y-6'
          >
            <div className='inline-flex items-center gap-2 bg-muted/20 border border-border/40 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-muted-foreground shadow-inner backdrop-blur-md'>
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className='size-1.5 rounded-full bg-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]'
              />
              Operator Handbook
            </div>
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight'>
              System{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.3,
                }}
                className='inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary drop-shadow-[0_0_20px_rgba(52,211,153,0.2)]'
              >
                Documentation.
              </motion.span>
            </h2>
            <p className='text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-medium'>
              Everything you need to know before initiating your terminal
              session. Core operational parameters and security protocols.
            </p>
          </motion.div>

          {/* Search box */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className='w-full mb-12 relative group'
          >
            <div
              className={`absolute inset-0 bg-primary/20 blur-xl rounded-2xl transition-opacity duration-500 ${isSearchFocused ? "opacity-100" : "opacity-0"}`}
            />
            <div
              className={`relative flex items-center bg-card/40 backdrop-blur-xl border rounded-2xl px-4 py-3 transition-colors duration-300 ${isSearchFocused ? "border-primary/50" : "border-white/10 group-hover:border-white/20"}`}
            >
              <Search
                className={`size-5 mr-3 transition-colors duration-300 ${isSearchFocused ? "text-primary" : "text-muted-foreground"}`}
              />
              <input
                type='text'
                placeholder='Search Documentation...'
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className='flex-1 bg-transparent border-none outline-none text-sm font-medium text-foreground placeholder:text-muted-foreground/50 w-full'
              />
              <kbd className='hidden sm:inline-flex pointer-events-none h-6 select-none items-center gap-1 rounded bg-black/40 border border-white/10 px-2 text-[10px] font-medium text-muted-foreground'>
                ⌘K
              </kbd>
            </div>
          </motion.div>

          {/* FAQ list */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className='w-full flex flex-col gap-4'
          >
            {FAQ_DATA.map((item) => (
              <FAQCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
