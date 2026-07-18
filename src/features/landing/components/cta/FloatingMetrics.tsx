// مسیر: src/features/landing/components/cta/FloatingMetrics.tsx
"use client";

import * as React from "react";
import { motion, useTransform, MotionValue } from "motion/react";

const METRICS = [
  { text: "99.98%", top: "15%", left: "10%" },
  { text: "+842%", top: "60%", left: "5%" },
  { text: "$2.4B TVL", top: "25%", right: "12%" },
  { text: "Latency 11ms", top: "70%", right: "8%" },
  { text: "Ethereum", top: "85%", left: "20%" },
  { text: "API Healthy", top: "45%", right: "18%" },
];

interface Particle {
  id: number;
  yEnd: number;
  opacityPeak: number;
  duration: number;
  delay: number;
  top: string;
  left: string;
}

export function FloatingMetrics({
  smoothX,
  smoothY,
  isSectionInView = true,
}: {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isSectionInView?: boolean;
}) {
  const x = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const [particles, setParticles] = React.useState<Particle[]>([]);

  React.useEffect(() => {
    if (!isSectionInView) return;

    const generated = [...Array(15)].map((_, i) => ({
      id: i,
      yEnd: Math.random() * -50 - 20,
      opacityPeak: Math.random() * 0.1 + 0.02,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));

    let mounted = true;
    if (mounted) {
      // eslint-disable-next-line
      setParticles(generated);
    }
    return () => {
      mounted = false;
    };
  }, [isSectionInView]); // 🚀 Dependent on the vision status

  if (!isSectionInView) return null;

  return (
    <motion.div
      style={{ x, y }}
      className='absolute inset-0 pointer-events-none z-0 transform-gpu'
    >
      {particles.map((p) => (
        <motion.div
          key={`dust-${p.id}`}
          animate={{ y: [0, p.yEnd], opacity: [0, p.opacityPeak, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className='absolute size-1 bg-white rounded-full blur-[1px]'
          style={{ top: p.top, left: p.left }}
        />
      ))}
      {METRICS.map((metric, i) => (
        <motion.div
          key={`metric-${i}`}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 8 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className='absolute text-[10px] font-bold tracking-widest text-muted-foreground/30 uppercase transform-gpu'
          style={{ top: metric.top, left: metric.left, right: metric.right }}
        >
          {metric.text}
        </motion.div>
      ))}
    </motion.div>
  );
}
