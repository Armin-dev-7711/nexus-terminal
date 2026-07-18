// src/features/landing/components/footer/FooterSection.tsx
"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useMotionTemplate,
  useInView,
} from "motion/react";
import { ArrowRight, MessageSquare, Terminal } from "lucide-react";
import { FooterTerminal } from "./FooterTerminal";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4' />
    <path d='M9 18c-4.51 2-5-2-7-2' />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect width='4' height='12' x='2' y='9' />
    <circle cx='4' cy='4' r='2' />
  </svg>
);

const NAV_LINKS = [
  "Dashboard",
  "Pricing",
  "Documentation",
  "API Reference",
  "Support",
  "System Status",
  "About Nexus",
];
const SOCIAL_LINKS = [
  { name: "GitHub", icon: GithubIcon, meta: "42 repositories", href: "#" },
  { name: "X (Twitter)", icon: TwitterIcon, meta: "Daily updates", href: "#" },
  { name: "LinkedIn", icon: LinkedinIcon, meta: "Engineering blog", href: "#" },
  { name: "Discord", icon: MessageSquare, meta: "12,842 operators", href: "#" },
];

export function FooterSection() {
  const containerRef = React.useRef<HTMLSelectElement>(null);

  const isInView = useInView(containerRef, { margin: "200px" });

  // Mouse Parallax & Spotlight Physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 40, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [0, 1], [6, -6]);
  const parallaxY = useTransform(smoothY, [0, 1], [6, -6]);

  const spotlightX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(132,204,34,0.08), transparent)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  // Live System Data Simulation
  const [latency, setLatency] = React.useState(11);
  const [utcTime, setUtcTime] = React.useState("");

  React.useEffect(() => {
    if (!isInView) return;

    const timeInterval = setInterval(() => {
      setUtcTime(new Date().toUTCString().replace(" GMT", ""));
    }, 1000);
    const latencyInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 4) + 9);
    }, 3000);
    return () => {
      clearInterval(timeInterval);
      clearInterval(latencyInterval);
    };
  }, [isInView]);

  // Easter Egg Logic
  const [clicks, setClicks] = React.useState(0);
  const [devMode, setDevMode] = React.useState(false);

  const playSystemSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogoClick = () => {
    if (devMode) return;
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks === 5) {
      playSystemSound();
      setDevMode(true);
      setTimeout(() => setDevMode(false), 5000);
      setClicks(0);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className='w-full min-h-[110vh] relative bg-[#050507] overflow-hidden flex flex-col items-center justify-between pt-32 pb-12 select-none'
    >
      {/* 1. Digital Horizon */}
      <div className='absolute top-0 inset-x-0 flex justify-center'>
        <div className='w-full h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent animate-pulse' />
        <div className='absolute top-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm animate-pulse' />
      </div>

      {/* 2. Background Ambiance & Spotlight */}
      <div className='absolute inset-0 z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_90%,transparent_100%)]'>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 60 0 L 0 0 0 60\' fill=\'none\' stroke=\'white\' strokeWidth=\'1\'/%3E%3C/svg%3E')]" />

        <div
          className='absolute inset-0 opacity-[0.03] mix-blend-overlay transform-gpu'
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMc/kBAAAACHRSTlMAAAAAAABhGPeXoQAAAIZJREFUOMuV1bENwCAMQ9FwEQ4yQrEB82cgP1UqROrt1L9PsoL/2E4h5aDUI9Qj1CPUo5P/e5z0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz0hZz05Z5yCweK6T23AAAAAElFTkSuQmCC")`,
            backgroundSize: "100px 100px",
          }}
        />

        {isInView && (
          <motion.div
            className='absolute inset-0 opacity-40 mix-blend-screen blur-[120px] transform-gpu'
            style={{ background: spotlightBackground }}
          />
        )}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.02] rounded-full blur-[200px]' />
      </div>

      {/* 3. Background Watermark */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center w-full'>
        <span className='text-[18vw] font-black text-white/[0.02] tracking-tighter mix-blend-plus-lighter'>
          NEXUS
        </span>
      </div>

      {/* 4. Floating Tech Metrics */}
      <div className='absolute inset-0 pointer-events-none z-10 hidden lg:block'>
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className='w-full h-full relative transform-gpu'
        >
          <span className='absolute top-[20%] left-[10%] text-[9px] text-muted-foreground/30 uppercase'>
            UTC {utcTime || "SYNCING"}
          </span>
          <span className='absolute top-[60%] right-[15%] text-[9px] text-muted-foreground/30 uppercase'>
            Kernel v4.2.1
          </span>
          <span className='absolute top-[80%] left-[20%] text-[9px] text-muted-foreground/30 uppercase'>
            Cluster: EU-C1
          </span>
        </motion.div>
      </div>

      {/* 5. Main Content Container */}
      <div className='max-w-7xl mx-auto px-6 w-full relative z-20 flex-1 flex flex-col justify-center mt-12'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className='w-full'
        >
          <div className='flex flex-col items-center justify-center mb-24'>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <button
                onClick={handleLogoClick}
                className='w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-2xl hover:bg-white/10 transition-colors cursor-default outline-none'
              >
                <Terminal className='size-8 text-foreground' />
              </button>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className='mt-8'
            >
              <div className='inline-flex items-center gap-2 bg-muted/20 border border-border/40 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-muted-foreground shadow-inner backdrop-blur-md'>
                <div className='flex items-center gap-2 pr-4 border-r border-white/10'>
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className='size-1.5 rounded-full bg-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]'
                  />
                  <span className='text-[10px] text-foreground uppercase tracking-widest'>
                    All Systems Operational
                  </span>
                </div>
                <div className='flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest'>
                  <span>Latency: {latency}ms</span>
                  <span>Uptime: 99.998%</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-8 w-full border-t border-white/[0.04] pt-16'>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className='flex flex-col gap-4'
            >
              <h4 className='text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-2'>
                Platform
              </h4>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href='#'
                  className='group flex items-center w-fit text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                >
                  {link}
                  <ArrowRight className='size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 text-primary' />
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className='flex flex-col gap-4'
            >
              <h4 className='text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-2'>
                Network
              </h4>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className='group flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors w-fit'
                >
                  <div className='p-2 rounded-md bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:text-primary transition-colors text-muted-foreground'>
                    <social.icon className='size-4' />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm font-bold text-foreground'>
                      {social.name}
                    </span>
                    <span className='text-[10px] text-muted-foreground/60'>
                      {social.meta}
                    </span>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className='lg:col-span-2 flex flex-col justify-end'
            >
              <FooterTerminal />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 6. Final Message & Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        className='w-full max-w-7xl mx-auto px-6 mt-24 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left z-20'
      >
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-bold text-foreground'>
            The Operating System for Digital Assets.
          </span>
          <span className='text-[10px] text-muted-foreground/60 uppercase tracking-widest'>
            Engineered for the future. Designed for builders.
          </span>
        </div>
        <div className='flex flex-col items-center md:items-end gap-1'>
          <span className='text-xs text-muted-foreground'>
            © 2026 NEXUS PROTOCOL
          </span>
          <span className='text-[9px] text-muted-foreground/40 uppercase tracking-widest'>
            Built with Next.js 16 • React 19 • Motion
          </span>
        </div>
      </motion.div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {devMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className='fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#09090b]/95 border border-primary/50 shadow-[0_0_40px_rgba(132,204,34,0.3)] rounded-2xl p-6 backdrop-blur-xl flex items-center gap-4'
          >
            <div className='size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30'>
              <Terminal className='size-5' />
            </div>
            <div className='flex flex-col'>
              <span className='text-primary font-black uppercase tracking-widest text-xs'>
                Developer Mode Enabled
              </span>
              <span className='text-foreground text-[10px]'>
                Welcome to the core, Operator.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
