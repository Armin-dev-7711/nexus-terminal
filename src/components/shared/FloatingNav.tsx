// src/components/shared/FloatingNav.tsx
"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

const NAV_LINKS = [
  { name: "Overview", href: "#hero" },
  { name: "Capabilities", href: "#features" },
  { name: "Terminal", href: "#dashboard" },
  { name: "Pricing", href: "#pricing" },
  { name: "Documentation", href: "#faq" },
];

export function FloatingNav() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isCompact, setIsCompact] = React.useState(false);
  const [isNearFooter, setIsNearFooter] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const navRef = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const spotlightBackground = useMotionTemplate`radial-gradient(120px circle at ${smoothX}px ${smoothY}px, rgba(132,204,34,0.15), transparent)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    // 🚀 فیکس شد: توقف درگیری CPU برای موس روی موبایل
    if (window.innerWidth < 768) return;
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 60) setIsVisible(true);
    else setIsVisible(false);

    if (latest > previous && latest > 150) setIsCompact(true);
    else setIsCompact(false);

    if (scrollYProgress.get() > 0.95) setIsNearFooter(true);
    else setIsNearFooter(false);
  });

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(href.substring(1));
            }
          });
        },
        { rootMargin: "-40% 0px -40% 0px" },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: href, offsetY: 80 },
      ease: "expo.inOut",
    });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.96 }}
            animate={{
              y: 0,
              opacity: isNearFooter ? 0.6 : 1,
              scale: 1,
            }}
            exit={{ y: -50, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className='fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[1000px]'
          >
            <motion.nav
              ref={navRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
              }}
              animate={{
                height: isCompact ? "56px" : "64px",
                paddingLeft: isCompact ? "16px" : "24px",
                paddingRight: isCompact ? "16px" : "24px",
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className='w-full bg-[#0c0c0e]/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_16px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-full flex items-center justify-between relative overflow-hidden group'
            >
              <motion.div
                className='absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0'
                style={{ background: spotlightBackground }}
              />

              {/* Logo & Status */}
              <div className='flex items-center gap-4 relative z-10'>
                <a
                  href='#hero'
                  onClick={(e) => handleScrollTo(e, "#hero")}
                  className='text-foreground font-black tracking-tighter text-lg'
                >
                  NEXUS
                </a>
                <div className='hidden xl:flex items-center gap-2 bg-black/40 border border-white/5 px-2.5 py-1 rounded-full'>
                  <span className='relative flex size-1.5'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75'></span>
                    <span className='relative inline-flex rounded-full size-1.5 bg-emerald-500'></span>
                  </span>
                  <span className='text-[9px] text-muted-foreground uppercase tracking-widest whitespace-nowrap'>
                    All Systems Operational
                  </span>
                </div>
              </div>

              {/* Desktop Links */}
              <div className='hidden lg:flex items-center gap-1 relative z-10'>
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className='relative px-4 py-1.5 text-xs font-bold transition-colors whitespace-nowrap'
                    >
                      {isActive ? (
                        <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 drop-shadow-[0_0_8px_rgba(132,204,34,0.4)]'>
                          {link.name}
                        </span>
                      ) : (
                        <span className='relative z-10 text-muted-foreground hover:text-foreground transition-colors'>
                          {link.name}
                        </span>
                      )}

                      {isActive && (
                        <motion.div
                          layoutId='activeNavIndicator'
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                          }}
                          className='absolute inset-0 bg-white/5 border border-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] z-0'
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* CTA & Mobile Toggle */}
              <div className='flex items-center gap-3 relative z-10'>
                <a
                  href='/auth/login'
                  className='hidden sm:flex items-center gap-1.5 h-8 px-4 rounded-full bg-primary text-black text-[11px] font-bold transition-all hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(132,204,34,0.4)] active:scale-95 group/btn whitespace-nowrap'
                >
                  Launch Dashboard
                  <ArrowRight className='size-3 group-hover/btn:translate-x-1 transition-transform' />
                </a>

                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className='lg:hidden size-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-white/10 transition-colors outline-none'
                >
                  <Menu className='size-4' />
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className='fixed inset-0 z-[200] bg-[#050507]/80 flex flex-col px-6 py-8'
          >
            <div className='flex items-center justify-between w-full'>
              <span className='text-foreground font-black tracking-tighter text-xl'>
                NEXUS
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className='size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-white/10 transition-colors'
              >
                <X className='size-5' />
              </button>
            </div>

            <div className='flex flex-col gap-6 mt-16'>
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className='flex items-end gap-4 text-3xl font-black text-foreground hover:text-primary transition-colors'
                >
                  <span className='text-sm text-muted-foreground/50 mb-1'>
                    0{idx + 1}
                  </span>
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className='mt-auto'
            >
              <a
                href='/auth/login'
                className='w-full h-14 rounded-full bg-primary text-black text-sm font-bold flex items-center justify-center gap-2'
              >
                Launch Dashboard
                <ArrowRight className='size-4' />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
