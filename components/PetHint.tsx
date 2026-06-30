// components/PetHint.tsx
// First-visit nudge: a small tag trails the cursor with an arrow that points at
// the shed icon. Shows only until the visitor picks a pet for the first time.
"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePet, useHasSeenPicker } from "@/lib/petStore";
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

export default function PetHint() {
  const pet = usePet();
  const fine = useMediaQuery("(pointer: fine)");
  const seen = useHasSeenPicker();
  // only on a genuine first visit (never opened the picker) with no pet yet
  const show = !seen && !pet;
  const wrapRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!show || !fine || pet) return;
    ensurePointer();

    let rafId = 0;
    const loop = () => {
      const p = getSmooth();
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${p.x + 22}px, ${p.y + 18}px, 0)`;
      }
      const shed = document.getElementById("pet-shed");
      if (shed && arrowRef.current) {
        const r = shed.getBoundingClientRect();
        const angle = Math.atan2(r.top + r.height / 2 - p.y, r.left + r.width / 2 - p.x);
        arrowRef.current.style.transform = `rotate(${angle}rad)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [show, fine, pet]);

  if (!show || !fine || pet) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="fixed top-0 left-0 z-[9995] pointer-events-none select-none"
    >
      <div className="flex items-center gap-1.5 border border-white/25 bg-black/85 px-2 py-1 backdrop-blur-sm animate-pulse">
        <span ref={arrowRef} className="inline-block text-white text-sm leading-none">
          ➜
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
          pick a pet
        </span>
      </div>
    </div>
  );
}
