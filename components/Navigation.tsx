'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import GooeyNav from './ui/GooeyNav';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['about', 'projects', 'contact'];

interface NavigationProps {
  visible?: boolean;
}

export default function Navigation({ visible = true }: NavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // FIX: Track whether we're in a programmatic scroll to suppress scroll spy
  const isNavigatingRef = useRef(false);
  const navigateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check sessionStorage for intro completion
  useEffect(() => {
    const checkEntered = () => {
      if (sessionStorage.getItem('portfolioEntered')) {
        setHasEntered(true);
      }
    };

    checkEntered();

    const interval = setInterval(() => {
      if (sessionStorage.getItem('portfolioEntered')) {
        setHasEntered(true);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Fade in after entry
  useEffect(() => {
    if (visible && hasEntered) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [visible, hasEntered]);

  // FIX: Throttled scroll spy that pauses during programmatic navigation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking || isNavigatingRef.current) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const section = document.getElementById(SECTION_IDS[i]);
          if (section && scrollPosition >= section.offsetTop) {
            setActiveIndex(i);
            break;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX: Navigate handler that locks out scroll spy during the scroll
  const handleNavigate = useCallback((index: number, href: string) => {
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Lock out scroll spy immediately
    isNavigatingRef.current = true;
    if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);

    // Set active index immediately so the pill moves instantly
    setActiveIndex(index);

    // Scroll to section
    const offsetTop = section.offsetTop;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });

    // Unlock scroll spy after scroll completes (~800ms is enough for most smooth scrolls)
    navigateTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  }, []);

  if (!visible || !hasEntered) return null;

  return (
    <header
      className={`
        fixed top-4 left-0 right-0 z-50
        w-full px-8 md:px-16 lg:px-24
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      <GooeyNav
        items={navItems}
        activeIndex={activeIndex}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        animationTime={400}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        onNavigate={handleNavigate}
      />
    </header>
  );
}