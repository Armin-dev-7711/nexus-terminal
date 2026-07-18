// src/features/landing/hooks/useMouseParallax.ts
"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "motion/react";

export function useMouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);
  const smoothNormX = useSpring(normX, springConfig);
  const smoothNormY = useSpring(normY, springConfig);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        mouseX.set((clientX / innerWidth - 0.5) * 30);
        mouseY.set((clientY / innerHeight - 0.5) * 30);
        normX.set(clientX / innerWidth);
        normY.set(clientY / innerHeight);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, normX, normY]);

  return { x: smoothX, y: smoothY, normX: smoothNormX, normY: smoothNormY };
}
