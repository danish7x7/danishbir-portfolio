// components/PetCompanion.tsx
// A full-screen, pointer-events-none canvas. When a pet is chosen it chases the
// smoothed cursor (the "prize") around the site. When the cursor goes still the
// pet picks a random idle behaviour: sit, nudge/play with the cursor, or zoomies
// (circling around it).
"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePet } from "@/lib/petStore";
import { PETS, renderFrame } from "@/lib/petSprites";
import { ensurePointer, getSmooth, idleTime } from "@/lib/petPointer";

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

type Activity = "sit" | "nudge" | "zoomies";

export default function PetCompanion() {
  const pet = usePet();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fine = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!pet || !fine) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ensurePointer();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cfg = PETS[pet];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const GAP = 80; // resting distance the pet keeps from the cursor

    // pet world position (slides in from the left edge)
    const pos = { x: -80, y: window.innerHeight / 2 };
    let prevX = pos.x;
    let prevY = pos.y;
    let facing = 1;

    let mode: "chase" | "idle" = "chase";
    let activity: Activity = "sit";
    let activityEnd = 0;
    let orbit = Math.random() * Math.PI * 2;
    let zoomDir = 1;
    let bumped = false;

    let walkFrame = 0;
    let walkTimer = 0;
    let bob = 0;
    let tilt = 0;
    let last = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener("resize", resize);

    const pickActivity = (now: number) => {
      if (reduced) {
        activity = "sit";
        activityEnd = now + 100000;
        return;
      }
      // weighted random, but never repeat the same activity twice in a row so
      // all three show up quickly while the cursor is parked.
      const pool: Activity[] = ["zoomies", "zoomies", "nudge", "nudge", "sit"];
      const choices = pool.filter((a) => a !== activity);
      activity = choices[Math.floor(Math.random() * choices.length)];

      if (activity === "sit") {
        activityEnd = now + rand(2800, 4800);
      } else if (activity === "zoomies") {
        activityEnd = now + rand(3200, 5200);
        zoomDir = Math.random() < 0.5 ? 1 : -1;
        orbit = Math.atan2(pos.y - getSmooth().y, pos.x - getSmooth().x);
      } else {
        activityEnd = now + rand(2800, 4400);
      }
    };

    let rafId = 0;
    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;

      const prize = getSmooth();
      const dxp = prize.x - pos.x;
      const dyp = prize.y - pos.y;
      const dist = Math.hypot(dxp, dyp) || 0.001;

      const pointerIdle = idleTime() > 650;
      const settled = dist < GAP + 44;

      // mode arbitration: any cursor movement (or being far away) → chase
      if (!pointerIdle || (mode === "chase" && !settled)) {
        mode = "chase";
      } else if (mode !== "idle") {
        mode = "idle";
        activityEnd = 0; // force a fresh pick on entry
      }

      // resolve a target point for this frame
      let tx = pos.x;
      let ty = pos.y;
      if (mode === "chase") {
        const ux = dxp / dist;
        const uy = dyp / dist;
        tx = prize.x - ux * GAP;
        ty = prize.y - uy * GAP;
        bumped = false;
      } else {
        if (now >= activityEnd) pickActivity(now);

        if (activity === "sit") {
          tx = pos.x;
          ty = pos.y;
        } else if (activity === "zoomies") {
          orbit += dt * 0.0038 * zoomDir;
          tx = prize.x + Math.cos(orbit) * GAP;
          ty = prize.y + Math.sin(orbit) * GAP * 0.72;
        } else {
          // nudge: oscillate in and out, bumping the cursor
          const f = (Math.sin(now * 0.0034) + 1) / 2; // 0..1
          const d = 10 + f * GAP;
          const ang = Math.atan2(pos.y - prize.y, pos.x - prize.x);
          tx = prize.x + Math.cos(ang) * d;
          ty = prize.y + Math.sin(ang) * d;
          // fire a little cursor recoil on each inward bump
          if (d < 18 && !bumped) {
            bumped = true;
            window.dispatchEvent(new CustomEvent("pet-bump"));
          } else if (d > 40) {
            bumped = false;
          }
        }
      }

      // ease toward target
      const ease =
        reduced ? 0.12 : mode === "chase" ? 0.1 : activity === "zoomies" ? 0.16 : activity === "nudge" ? 0.13 : 0.07;
      pos.x += (tx - pos.x) * ease;
      pos.y += (ty - pos.y) * ease;

      // velocity → facing, motion state
      const vx = pos.x - prevX;
      const vy = pos.y - prevY;
      const speed = Math.hypot(vx, vy);
      prevX = pos.x;
      prevY = pos.y;
      if (Math.abs(vx) > 0.4) facing = vx < 0 ? -1 : 1;

      const sitting = mode === "idle" && activity === "sit";
      const moving = speed > 0.5 && !sitting;

      // frame selection
      walkTimer += dt;
      if (moving && cfg.walk.length > 1 && walkTimer > 150) {
        walkFrame = (walkFrame + 1) % cfg.walk.length;
        walkTimer = 0;
      }
      let sprite;
      let key;
      if (sitting) {
        sprite = cfg.sit;
        key = `${pet}-sit`;
      } else {
        const i = cfg.walk.length > 1 ? walkFrame : 0;
        sprite = cfg.walk[i];
        key = `${pet}-w${i}`;
      }
      const frame = renderFrame(sprite, cfg.scale, key);
      const w = frame.width;
      const h = frame.height;

      // vertical motion
      bob += dt * (moving ? 0.013 : 0.004);
      let yOff: number;
      let squash = 1;
      if (cfg.float) {
        yOff = Math.sin(bob * (moving ? 2 : 1)) * (moving ? 5 : 3);
      } else if (sitting) {
        yOff = Math.sin(bob * 0.6) * 1;
      } else if (moving) {
        const hop = Math.abs(Math.sin(bob * 2.2));
        yOff = -hop * 7;
        squash = 1 + hop * 0.1;
      } else {
        yOff = Math.sin(bob) * 1.2;
      }

      // lean into horizontal motion (gives zoomies their energy)
      const targetTilt = reduced ? 0 : clamp(vx * 0.018, -0.32, 0.32);
      tilt += (targetTilt - tilt) * 0.2;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.save();
      ctx.translate(pos.x, pos.y + yOff);
      ctx.rotate(tilt);
      ctx.scale(facing, sitting ? 0.94 : squash);
      ctx.drawImage(frame, -w / 2, -h / 2, w, h);
      ctx.restore();

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [pet, fine]);

  if (!pet || !fine) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-[9990] pointer-events-none"
    />
  );
}
