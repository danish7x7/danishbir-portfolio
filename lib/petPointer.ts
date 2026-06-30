// lib/petPointer.ts
// Single shared source of truth for the pointer position.
// One global mousemove listener + one rAF loop smooth the position so that
// the custom cursor and the pet companion both chase the exact same point.
"use client";

type Vec = { x: number; y: number };

const raw: Vec = { x: -200, y: -200 };
const smooth: Vec = { x: -200, y: -200 };
let started = false;
let lastMove = 0;

export function ensurePointer() {
  if (started || typeof window === "undefined") return;
  started = true;

  raw.x = smooth.x = window.innerWidth / 2;
  raw.y = smooth.y = window.innerHeight / 2;

  window.addEventListener(
    "mousemove",
    (e: MouseEvent) => {
      raw.x = e.clientX;
      raw.y = e.clientY;
      lastMove = performance.now();
    },
    { passive: true },
  );

  const loop = () => {
    smooth.x += (raw.x - smooth.x) * 0.25;
    smooth.y += (raw.y - smooth.y) * 0.25;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

export function getSmooth(): Vec {
  return smooth;
}

export function getRaw(): Vec {
  return raw;
}

export function idleTime(): number {
  return typeof performance === "undefined" ? 0 : performance.now() - lastMove;
}
