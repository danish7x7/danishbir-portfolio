// lib/petStore.ts
// Tiny external store for the chosen pet, persisted to localStorage and shared
// across the cursor, the companion canvas, the picker and the first-visit hint.
"use client";

import { useSyncExternalStore } from "react";

export type PetId = "cat" | "dog" | "rat" | "ghost";

const KEY = "danish-pet";
const SEEN_KEY = "danish-pet-seen";

let current: PetId | null = null;
let loaded = false;
const subs = new Set<() => void>();

function isPetId(v: string | null): v is PetId {
  return v === "cat" || v === "dog" || v === "rat" || v === "ghost";
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const v = localStorage.getItem(KEY);
  if (isPetId(v)) current = v;
}

function emit() {
  subs.forEach((f) => f());
}

export function setPet(id: PetId | null) {
  load();
  current = id;
  if (typeof window !== "undefined") {
    if (id) localStorage.setItem(KEY, id);
    else localStorage.removeItem(KEY);
    localStorage.setItem(SEEN_KEY, "1");
  }
  emit();
}

export function hasSeenPicker(): boolean {
  return typeof window !== "undefined" && localStorage.getItem(SEEN_KEY) === "1";
}

function subscribe(cb: () => void) {
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}

function snapshot(): PetId | null {
  load();
  return current;
}

export function usePet(): PetId | null {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

export function useHasSeenPicker(): boolean {
  return useSyncExternalStore(subscribe, hasSeenPicker, () => false);
}
