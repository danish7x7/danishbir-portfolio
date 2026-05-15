// components/SmoothScroll.tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
        const clickTarget = e.target as HTMLElement;
        const anchor = clickTarget.closest("a");
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        if (href === "#") return;

        const el = document.querySelector(href);
        if (!el) return;

        e.preventDefault();

        // Distance-aware duration: short hops snappy, long hauls cinematic
        const rect = (el as HTMLElement).getBoundingClientRect();
        const distance = Math.abs(rect.top);
        const duration = Math.min(2.5, Math.max(0.8, distance / 2500));

        lenis.scrollTo(el as HTMLElement, {
            offset: -120,
            duration,
            easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}