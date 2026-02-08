'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // *** THE CRITICAL BRIDGE: Connect Lenis scroll to GSAP ScrollTrigger ***
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker as the single animation loop (not a separate rAF)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Lenis expects ms, GSAP ticker gives seconds
    });
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from throttling on tab switch

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}