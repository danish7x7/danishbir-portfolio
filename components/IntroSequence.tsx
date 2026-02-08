'use client';

import { useState, useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';

const SpiralAnimation = dynamic(
  () => import('@/components/ui/SpiralAnimation'),
  { ssr: false }
);

interface IntroSequenceProps {
  children: ReactNode;
}

export default function IntroSequence({ children }: IntroSequenceProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [startVisible, setStartVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showIntroDOM, setShowIntroDOM] = useState(true);

  useEffect(() => {
    const entered = sessionStorage.getItem('portfolioEntered');
    if (entered) {
      setHasEntered(true);
      setShowIntroDOM(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!hasEntered && !isLoading && showIntroDOM) {
      const timer = setTimeout(() => {
        setStartVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasEntered, isLoading, showIntroDOM]);

  const handleEnter = () => {
    setIsTransitioning(true);
    setStartVisible(false);
    sessionStorage.setItem('portfolioEntered', 'true');
    setTimeout(() => {
      setHasEntered(true);
      setShowIntroDOM(false);
    }, 2000);
  };

  if (isLoading) return <div className="fixed inset-0 bg-black" />;

  return (
    <>
      {/* INTRO OVERLAY */}
      {showIntroDOM && (
        <div
          className={`
            fixed inset-0 z-50 overflow-hidden pointer-events-auto
            transition-all duration-[2000ms] ease-in-out
            ${isTransitioning ? 'opacity-0 scale-[1.5] pointer-events-none' : 'opacity-100 scale-100'}
          `}
        >
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0">
            <SpiralAnimation />
          </div>

          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-700 ${
              startVisible && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleEnter}
              aria-label="Enter portfolio"
              className="text-white text-5xl tracking-[0.5em] uppercase font-bold hover:tracking-[0.7em] transition-all duration-700"
              style={{ fontFamily: 'var(--font-russo), sans-serif' }}
            >
              Enter
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT — fades in when intro completes */}
      <div
        className={`relative z-0 transition-opacity duration-[2000ms] ease-in-out ${
          !showIntroDOM || isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}