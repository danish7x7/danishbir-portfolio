'use client';

import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FullScreenScrollFX.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ProjectSection = {
  id: string;
  background: string;
  leftLabel: string;
  rightLabel: string;
  title: string | ReactNode;
  description: string;
  techStack: string[];
  githubUrl: string;
};

export type FullScreenFXProps = {
  sections: ProjectSection[];
  className?: string;
  style?: CSSProperties;
  header?: ReactNode;
  showProgress?: boolean;
  durations?: { change?: number; snap?: number };
  reduceMotion?: boolean;
  parallaxAmount?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export default function FullScreenScrollFX({
  sections,
  className = '',
  style,
  header,
  showProgress = true,
  durations = { change: 0.7, snap: 800 },
  reduceMotion,
  parallaxAmount = 4,
  onIndexChange,
  initialIndex = 0,
}: FullScreenFXProps) {
  const total = sections.length;
  const [localIndex, setLocalIndex] = useState(
    clamp(initialIndex, 0, Math.max(0, total - 1))
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const fixedSectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const progressFillRef = useRef<HTMLDivElement>(null);
  const currentNumberRef = useRef<HTMLSpanElement>(null);

  const stRef = useRef<ScrollTrigger | null>(null);
  const lastIndexRef = useRef(localIndex);
  const isAnimatingRef = useRef(false);
  const isSnappingRef = useRef(false);
  const sectionTopRef = useRef<number[]>([]);

  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const motionOff = reduceMotion ?? prefersReduced;

  const computePositions = () => {
    const el = fixedSectionRef.current;
    if (!el) return;
    const top = el.offsetTop;
    const h = el.offsetHeight;
    const arr: number[] = [];
    for (let i = 0; i < total; i++) {
      arr.push(top + (h * i) / total);
    }
    sectionTopRef.current = arr;
  };

  // FIX: Toggle pointer-events via fx-active class
  const updateActiveClass = (activeIdx: number) => {
    contentRefs.current.forEach((el, i) => {
      if (el) {
        if (i === activeIdx) {
          el.classList.add('fx-active');
        } else {
          el.classList.remove('fx-active');
        }
      }
    });
  };

  // FIX: Update progress bar and counter immediately (not deferred)
  const updateProgress = (idx: number) => {
    if (currentNumberRef.current) {
      currentNumberRef.current.textContent = String(idx + 1).padStart(2, '0');
    }
    if (progressFillRef.current) {
      const p = (idx / (total - 1 || 1)) * 100;
      progressFillRef.current.style.width = p + '%';
    }
  };

  const changeSection = (to: number) => {
    if (to === lastIndexRef.current || isAnimatingRef.current) return;
    const from = lastIndexRef.current;
    const down = to > from;
    isAnimatingRef.current = true;

    setLocalIndex(to);
    if (onIndexChange) {
      onIndexChange(to);
    }

    // Update progress immediately on section change
    updateProgress(to);

    // Update pointer-events immediately
    updateActiveClass(to);

    const D = durations.change ?? 0.7;

    const prevBg = bgRefs.current[from];
    const newBg = bgRefs.current[to];

    if (newBg) {
      gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 2 : -2 });
      gsap.to(newBg, {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        duration: D,
        ease: 'power2.out',
      });
    }
    if (prevBg) {
      gsap.to(prevBg, {
        opacity: 0,
        yPercent: down ? -parallaxAmount : parallaxAmount,
        duration: D,
        ease: 'power2.out',
      });
    }

    const prevContent = contentRefs.current[from];
    const newContent = contentRefs.current[to];

    if (prevContent) {
      gsap.to(prevContent, {
        opacity: 0,
        y: down ? -30 : 30,
        duration: D * 0.6,
        ease: 'power2.out',
      });
    }
    if (newContent) {
      gsap.set(newContent, { opacity: 0, y: down ? 50 : -50 });
      gsap.to(newContent, {
        opacity: 1,
        y: 0,
        duration: D,
        ease: 'power2.out',
        delay: D * 0.2,
      });
    }

    gsap.delayedCall(D, () => {
      lastIndexRef.current = to;
      isAnimatingRef.current = false;
    });
  };

  const goTo = (to: number, withScroll: boolean = true) => {
    const clamped = clamp(to, 0, total - 1);
    isSnappingRef.current = false;
    changeSection(clamped);

    const pos = sectionTopRef.current[clamped];
    const snapMs = durations.snap ?? 800;

    if (withScroll && typeof window !== 'undefined') {
      window.scrollTo({ top: pos, behavior: 'smooth' });
      setTimeout(() => {
        isSnappingRef.current = false;
      }, snapMs);
    } else {
      setTimeout(() => {
        isSnappingRef.current = false;
      }, 10);
    }
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const fixed = fixedRef.current;
    const fs = fixedSectionRef.current;
    const headerEl = headerRef.current;

    if (!fixed || !fs || total === 0) return;

    bgRefs.current.forEach((bg, i) => {
      if (bg) {
        gsap.set(bg, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.04 });
      }
    });

    contentRefs.current.forEach((content, i) => {
      if (content) {
        gsap.set(content, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 50,
        });
      }
    });

    // Set initial active class
    updateActiveClass(0);

    computePositions();

    // PINNING SCROLL TRIGGER
    const st = ScrollTrigger.create({
      trigger: fs,
      start: 'top top',
      end: 'bottom bottom',
      pin: fixed,
      pinSpacing: true,
      anticipatePin: 1,
      fastScrollEnd: true,
      onUpdate: (self) => {
        if (motionOff || isSnappingRef.current) return;
        const prog = self.progress;
        const target = Math.min(total - 1, Math.floor(prog * total));
        if (target !== lastIndexRef.current && !isAnimatingRef.current) {
          const nextIdx =
            lastIndexRef.current + (target > lastIndexRef.current ? 1 : -1);
          goTo(nextIdx, false);
        }
        // FIX: Smooth progress bar — use scroll progress directly, not lastIndexRef
        if (progressFillRef.current) {
          const smoothP = (prog / (1 || 1)) * 100;
          // Blend between smooth scroll progress and discrete step
          const discreteP = (lastIndexRef.current / (total - 1 || 1)) * 100;
          // Use discrete steps so the bar snaps to each project cleanly
          progressFillRef.current.style.width = discreteP + '%';
        }
      },
    });

    // ENTRANCE ANIMATION TRIGGER
    if (headerEl) {
      gsap.fromTo(
        headerEl,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    stRef.current = st;

    const ro = new ResizeObserver(() => {
      computePositions();
      ScrollTrigger.refresh();
    });
    ro.observe(fs);

    return () => {
      ro.disconnect();
      st.kill();
      stRef.current = null;
    };
  }, [total, motionOff, parallaxAmount]);

  useEffect(() => {
    // Initial load animation for first slide
    contentRefs.current.forEach((content, i) => {
      if (content && i === 0) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
        );
      }
    });
  }, []);

  return (
    <div ref={rootRef} className={'fx-root ' + className} style={style}>
      <div className="fx-scroll">
        {/* Header scrolls naturally before pin engages */}
        {header && (
          <div ref={headerRef} className="fx-header-section">
            {header}
          </div>
        )}

        <div
          className="fx-fixed-section"
          ref={fixedSectionRef}
          style={{ height: (total + 1) * 100 + 'vh' }}
        >
          <div className="fx-fixed" ref={fixedRef}>
            {/* Backgrounds */}
            <div className="fx-backgrounds">
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  ref={(el) => {
                    bgRefs.current[i] = el;
                  }}
                  className="fx-background"
                  style={{
                    backgroundImage: 'url(' + section.background + ')',
                  }}
                >
                  <div className="fx-overlay" />
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="fx-content-container">
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className={`fx-content${i === 0 ? ' fx-active' : ''}`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <div className="fx-labels">
                    <span className="fx-label-left">{section.leftLabel}</span>
                    <span className="fx-label-right">{section.rightLabel}</span>
                  </div>

                  <a
                    href={section.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fx-title-link"
                  >
                    <h3 className="fx-title">{section.title}</h3>
                  </a>

                  <p className="fx-description">{section.description}</p>

                  <div className="fx-tech-stack">
                    {section.techStack.map((tech, techIdx) => (
                      <span key={techIdx} className="fx-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {showProgress && (
                <div className="fx-progress">
                  <div className="fx-progress-numbers">
                    <span ref={currentNumberRef}>01</span>
                    <span>{String(total).padStart(2, '0')}</span>
                  </div>
                  <div className="fx-progress-bar">
                    <div className="fx-progress-fill" ref={progressFillRef} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}