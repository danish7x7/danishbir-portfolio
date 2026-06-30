// components/PetPicker.tsx
// The "shed" button (lives in the Nav next to the Danish® logo) plus the panel
// for choosing / dismissing a pet companion.
"use client";

import { useEffect, useRef, useState } from "react";
import { usePet, setPet, type PetId } from "@/lib/petStore";
import { PETS, PET_ORDER, frameDataUrl } from "@/lib/petSprites";

function ShedIcon({ className = "" }: { className?: string }) {
  // simple pixel-ish shed/home glyph
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20h14v-9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export default function PetPicker() {
  const pet = usePet();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id: PetId) => {
    setPet(pet === id ? null : id);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id="pet-shed"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Choose a pet companion"
        aria-expanded={open}
        className="group flex h-7 w-7 items-center justify-center rounded-sm border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
      >
        <ShedIcon className="h-4 w-4" />
        {pet && (
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-white" aria-hidden />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-9 z-[60] w-60 border border-white/15 bg-black/95 p-3 backdrop-blur-sm">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/50">
            Pick a companion
          </p>
          <div className="grid grid-cols-2 gap-2">
            {PET_ORDER.map((id) => {
              const cfg = PETS[id];
              const active = pet === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => choose(id)}
                  className={`flex flex-col items-center gap-1 border p-2 transition-colors ${
                    active ? "border-white bg-white/10" : "border-white/10 hover:border-white/40"
                  }`}
                >
                  <span className="flex h-10 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={frameDataUrl(cfg.walk[0], cfg.scale * 2, `${id}-preview`)}
                      alt=""
                      className="h-9 w-auto"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-white">
                    {cfg.label}
                  </span>
                  <span className="text-[9px] uppercase tracking-wide text-white/40">
                    chases {cfg.prizeLabel}
                  </span>
                </button>
              );
            })}
          </div>
          {pet && (
            <button
              type="button"
              onClick={() => {
                setPet(null);
                setOpen(false);
              }}
              className="mt-2 w-full border border-white/10 py-1 text-[10px] uppercase tracking-wider text-white/50 transition-colors hover:border-white/40 hover:text-white"
            >
              Send pet home
            </button>
          )}
        </div>
      )}
    </div>
  );
}
