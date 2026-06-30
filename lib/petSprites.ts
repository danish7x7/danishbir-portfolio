// lib/petSprites.ts
// Hand-authored pixel art for each pet and its "prize" (the thing the cursor
// becomes and the pet chases). Sprites are plain string rows:
//   ' ' = transparent, 'W' = white, 'G' = grey, 'D' = dark (eyes/detail)
// Each pet has walk frame(s), a settled "sit" pose (closed eyes), and a prize.
// Frames are rasterised to offscreen canvases once and cached.
"use client";

import type { PetId } from "./petStore";

export type Frame = string[];

const PALETTE: Record<string, string> = {
  W: "#f4f4f5",
  G: "#a1a1aa",
  D: "#18181b",
};

const cache = new Map<string, HTMLCanvasElement>();

export function renderFrame(frame: Frame, scale: number, key: string): HTMLCanvasElement {
  const ck = `${key}@${scale}`;
  const hit = cache.get(ck);
  if (hit) return hit;

  const h = frame.length;
  const w = frame.reduce((m, r) => Math.max(m, r.length), 0);
  const c = document.createElement("canvas");
  c.width = w * scale;
  c.height = h * scale;
  const ctx = c.getContext("2d");
  if (ctx) {
    for (let y = 0; y < h; y++) {
      const row = frame[y];
      for (let x = 0; x < row.length; x++) {
        const col = PALETTE[row[x]];
        if (!col) continue;
        ctx.fillStyle = col;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
  cache.set(ck, c);
  return c;
}

const urlCache = new Map<string, string>();

export function frameDataUrl(frame: Frame, scale: number, key: string): string {
  const ck = `${key}@${scale}`;
  const hit = urlCache.get(ck);
  if (hit) return hit;
  const url = renderFrame(frame, scale, key).toDataURL("image/png");
  urlCache.set(ck, url);
  return url;
}

// ----------------------------------------------------------------------------
// CAT — pointy ears, round eyes; sits with closed eyes.
// ----------------------------------------------------------------------------
const CAT_WALK: Frame = [
  " W         W ",
  " WW       WW ",
  " WWW     WWW ",
  " WWWW   WWWW ",
  "WWWWWWWWWWWWW",
  "WWDDWWWWWDDWW",
  "WWDDWWWWWDDWW",
  "WWWWWWWWWWWWW",
  "WWWWWGGGWWWWW",
  "WWWWWWWWWWWWW",
  " WWWWWWWWWWW ",
  " WW  WW  WW  ",
];
const CAT_SIT: Frame = [
  " W         W ",
  " WW       WW ",
  " WWW     WWW ",
  " WWWW   WWWW ",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWGGWWWWWGGWW",
  "WWWWWWWWWWWWW",
  "WWWWWGGGWWWWW",
  "WWWWWWWWWWWWW",
  " WWWWWWWWWWW ",
  "  WWWWWWWWW  ",
];

// ----------------------------------------------------------------------------
// DOG — floppy ears, dark nose; sits with closed eyes.
// ----------------------------------------------------------------------------
const DOG_WALK: Frame = [
  "WWW       WWW",
  "WWWW     WWWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWDDWWWWWDDWW",
  "WWDDWWWWWDDWW",
  "WWWWWWWWWWWWW",
  "WWWWWDDDWWWWW",
  "WWWWWWGGWWWWW",
  " WWWWWWWWWWW ",
  " WWW WWW WWW ",
  "  W   W   W  ",
];
const DOG_SIT: Frame = [
  "WWW       WWW",
  "WWWW     WWWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWGGWWWWWGGWW",
  "WWWWWWWWWWWWW",
  "WWWWWDDDWWWWW",
  "WWWWWWGGWWWWW",
  " WWWWWWWWWWW ",
  " WWWWWWWWWWW ",
  "  WWWWWWWWW  ",
  "   WWWWWWW   ",
];

// ----------------------------------------------------------------------------
// RAT — big round ears, pointy snout, long tail.
// ----------------------------------------------------------------------------
const RAT_WALK: Frame = [
  " WW      WW ",
  "WWWW    WWWW",
  "WWWWW  WWWWW",
  " WWWWWWWWWW ",
  "  WWWWWWWW  ",
  "  WDDWWDDW  ",
  "  WDDWWDDW  ",
  "  WWWWWWWW  ",
  "   WWWWWW   ",
  "   WWGGWW   ",
  "  WWWWWWWW  ",
  "  WW WW WW W",
  "        WWWW",
];
const RAT_SIT: Frame = [
  " WW      WW ",
  "WWWW    WWWW",
  "WWWWW  WWWWW",
  " WWWWWWWWWW ",
  "  WWWWWWWW  ",
  "  WWWWWWWW  ",
  "  WGGWWGGW  ",
  "  WWWWWWWW  ",
  "   WWWWWW   ",
  "   WWGGWW   ",
  "  WWWWWWWW  ",
  "   WWWWWW  W",
  "        WWWW",
];

// ----------------------------------------------------------------------------
// GHOST — wavy bottom (2 frames), settles with closed eyes.
// ----------------------------------------------------------------------------
const GHOST_A: Frame = [
  "   WWWWWWW   ",
  "  WWWWWWWWW  ",
  " WWWWWWWWWWW ",
  " WWWWWWWWWWW ",
  "WWWWWWWWWWWWW",
  "WWDDWWWWWDDWW",
  "WWDDWWWWWDDWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WW WW WW WW W",
  " W  WW  WW   ",
];
const GHOST_B: Frame = [
  "   WWWWWWW   ",
  "  WWWWWWWWW  ",
  " WWWWWWWWWWW ",
  " WWWWWWWWWWW ",
  "WWWWWWWWWWWWW",
  "WWDDWWWWWDDWW",
  "WWDDWWWWWDDWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "W WW WW WW WW",
  "  WW  WW  W  ",
];
const GHOST_SIT: Frame = [
  "   WWWWWWW   ",
  "  WWWWWWWWW  ",
  " WWWWWWWWWWW ",
  " WWWWWWWWWWW ",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWGGWWWWWGGWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WWWWWWWWWWWWW",
  "WW WW WW WW W",
  " W  WW  WW   ",
];

// ----------------------------------------------------------------------------
// Prizes (what the cursor turns into).
// ----------------------------------------------------------------------------
const YARN: Frame = [
  " WWWWWWW ",
  "WWGWWWGWW",
  "WGWWGWWGW",
  "WWWGWGWWW",
  "WGWWGWWGW",
  "WWGWWWGWW",
  "WGWWGWWGW",
  "WWGWWWGWW",
  " WWWWWWW ",
];
const BONE: Frame = [
  "WW     WW",
  "WWW   WWW",
  " WWWWWWW ",
  " WWWWWWW ",
  "WWW   WWW",
  "WW     WW",
];
const CHEESE: Frame = [
  "        W",
  "      WWW",
  "    WWWWW",
  "  WWDWWWW",
  "WWWWWWWDW",
  "WWDWWWWWW",
  "WWWWDWWWW",
  "WWWWWWWWW",
];
const WISP: Frame = [
  "   W   ",
  "   W   ",
  "  WWW  ",
  "  WWW  ",
  " WWWWW ",
  " WWGWW ",
  " WWWWW ",
  "  WWW  ",
  "   W   ",
];

export type PetConfig = {
  id: PetId;
  label: string;
  prizeLabel: string;
  walk: Frame[]; // movement frames
  sit: Frame; // settled / resting pose
  prize: Frame;
  float: boolean; // ghost hovers instead of hopping
  scale: number;
  prizeScale: number;
};

export const PETS: Record<PetId, PetConfig> = {
  cat: {
    id: "cat",
    label: "Cat",
    prizeLabel: "yarn",
    walk: [CAT_WALK],
    sit: CAT_SIT,
    prize: YARN,
    float: false,
    scale: 3,
    prizeScale: 3,
  },
  dog: {
    id: "dog",
    label: "Dog",
    prizeLabel: "bone",
    walk: [DOG_WALK],
    sit: DOG_SIT,
    prize: BONE,
    float: false,
    scale: 3,
    prizeScale: 3,
  },
  rat: {
    id: "rat",
    label: "Rat",
    prizeLabel: "cheese",
    walk: [RAT_WALK],
    sit: RAT_SIT,
    prize: CHEESE,
    float: false,
    scale: 3,
    prizeScale: 3,
  },
  ghost: {
    id: "ghost",
    label: "Ghost",
    prizeLabel: "wisp",
    walk: [GHOST_A, GHOST_B],
    sit: GHOST_SIT,
    prize: WISP,
    float: true,
    scale: 3,
    prizeScale: 3,
  },
};

export const PET_ORDER: PetId[] = ["cat", "dog", "rat", "ghost"];
