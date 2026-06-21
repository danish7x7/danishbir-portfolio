// components/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const enabled = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!enabled) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('[data-cursor="view"]');
      setHovering(!!el);
    };

    const handleDown = () => {
      if (reducedMotion) return;
      const el = innerRef.current;
      if (!el) return;
      el.classList.remove("cursor-recoil");
      void el.offsetWidth;
      el.classList.add("cursor-recoil");
    };

    let rafId: number;
    const loop = () => {
      position.current.x += (target.current.x - position.current.x) * 0.25;
      position.current.y += (target.current.y - position.current.y) * 0.25;
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
    };
  }, [enabled]);

  if (!enabled) return null;

  const shape = hovering ? "w-20 h-10 rounded-full" : "w-5 h-5 rounded-full";

  return (
    <div ref={wrapperRef} className="fixed top-0 left-0 z-[9999] pointer-events-none" style={{ mixBlendMode: "difference" }}>
      <div ref={innerRef} className={`flex items-center justify-center bg-white text-black font-bold uppercase tracking-wider text-xs transition-[width,height,border-radius] duration-200 ease-out ${shape}`} style={{ transform: "translate(-50%, -50%)" }}>
        {hovering ? "View" : null}
      </div>
    </div>
  );
}