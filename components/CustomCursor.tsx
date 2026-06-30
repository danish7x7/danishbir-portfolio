// components/CustomCursor.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { usePet } from "@/lib/petStore";
import { PETS, frameDataUrl } from "@/lib/petSprites";
import { ensurePointer, getSmooth } from "@/lib/petPointer";

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
  const [hovering, setHovering] = useState(false);
  const enabled = useMediaQuery("(pointer: fine)");
  const pet = usePet();

  // The prize sprite the cursor becomes (rasterised once, cached). Only built
  // on the client where `enabled` is true, so `document` is always available.
  const prizeUrl = useMemo(() => {
    if (!enabled || !pet) return null;
    const cfg = PETS[pet];
    return frameDataUrl(cfg.prize, cfg.prizeScale * 4, `${pet}-prize`);
  }, [pet, enabled]);

  useEffect(() => {
    if (!enabled) return;
    ensurePointer();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('[data-cursor="view"]');
      setHovering(!!el);
    };

    const recoil = () => {
      if (reducedMotion) return;
      const el = innerRef.current;
      if (!el) return;
      el.classList.remove("cursor-recoil");
      void el.offsetWidth;
      el.classList.add("cursor-recoil");
    };
    const handleDown = () => recoil();

    let rafId: number;
    const loop = () => {
      const p = getSmooth();
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("pet-bump", recoil);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("pet-bump", recoil);
    };
  }, [enabled]);

  if (!enabled) return null;

  // ── Prize mode: the cursor becomes the thing the pet chases ──
  if (prizeUrl) {
    const size = hovering ? 34 : 26;
    return (
      <div ref={wrapperRef} className="fixed top-0 left-0 z-[9999] pointer-events-none">
        <div
          ref={innerRef}
          className="transition-[width,height] duration-200 ease-out"
          style={{
            width: size,
            height: size,
            transform: "translate(-50%, -50%)",
            backgroundImage: `url(${prizeUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            imageRendering: "pixelated",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
          }}
        />
      </div>
    );
  }

  // ── Default mode: original monochrome dot ──
  const shape = hovering ? "w-20 h-10 rounded-full" : "w-5 h-5 rounded-full";

  return (
    <div ref={wrapperRef} className="fixed top-0 left-0 z-[9999] pointer-events-none" style={{ mixBlendMode: "difference" }}>
      <div ref={innerRef} className={`flex items-center justify-center bg-white text-black font-bold uppercase tracking-wider text-xs transition-[width,height,border-radius] duration-200 ease-out ${shape}`} style={{ transform: "translate(-50%, -50%)" }}>
        {hovering ? "View" : null}
      </div>
    </div>
  );
}
