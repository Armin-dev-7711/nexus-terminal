//  src/features/landing/components/MagneticWrapper.tsx
"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticWrapperProps {
  children: React.ReactNode;
}

export function MagneticWrapper({ children }: MagneticWrapperProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.1 });
  const smoothY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } =
      e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // 20% magnetic pull
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className='inline-block'
    >
      {children}
    </motion.div>
  );
}
