// components/Experience.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ROTATING_WORDS = ["Education.", "Experience.", "Practice."];

const EXPERIENCE_HEADERS = ["Company", "Years", "Role", "Location"];
const EXPERIENCE_ROWS = [
  ["San Jose State University", "Jul 2025 — Dec 2025", "Graduate Research Assistant", "San Jose, CA"],
  ["SJSU Student Union", "Jul 2024 — Dec 2025", "Events & Programs Assistant", "San Jose, CA"],
];

const EDUCATION_HEADERS = ["Institution", "Years", "Degree", "Location"];
const EDUCATION_ROWS = [
  ["San Jose State University", "2024 — 2025", "M.S. Software Engineering", "San Jose, CA"],
  ["Thapar Institute of Engineering & Technology", "2019 — 2023", "B.E. Electronics & Communication", "Patiala, India"],
];

const Experience: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let swapTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setVisible(false);
      swapTimeout = setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 250);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(swapTimeout);
    };
  }, []);

  return (
    <section className="mt-24 pb-[100px]">
      {/* Section header */}
      <div className="border-t border-white/10 py-4">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-3 items-center text-sm text-gray-400 uppercase tracking-wider">
          <span>© Experience エクスペリエンス</span>
          <span className="md:text-center">(DSH® — 03)</span>
          <span className="md:text-right">Engineering & Research</span>
        </div>
      </div>
      <div className="border-t border-white/10" />

      {/* Top composition: rotating word + square image */}
      <div className="relative mt-16">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-9">
            <h2
              className="font-bold tracking-tighter leading-[0.9]"
              style={{ fontSize: "clamp(3rem, 17vw, 20rem)" }}
            >
              <span
                className={`inline-block transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
            </h2>
          </div>
        </div>

        <div className="hidden md:block absolute top-0 right-0 w-[10%] aspect-[2/3] bg-zinc-800 rounded-2xl overflow-hidden">
          <Image src="/grad.jpg" alt="Graduation portrait" fill className="object-cover" sizes="10vw" />
        </div>
      </div>

      {/* Experience block */}
      <div className="mt-20">
        <div className="hidden md:grid bg-white text-black grid-cols-4 px-8 py-4 rounded-sm">
          {EXPERIENCE_HEADERS.map((h, i) => (
            <span
              key={h}
              className={`text-sm font-medium ${i === 0 ? "text-left" : i === EXPERIENCE_HEADERS.length - 1 ? "text-right" : "text-center"}`}
            >
              {h}
            </span>
          ))}
        </div>
        <div>
          {EXPERIENCE_ROWS.map((row, rIdx) => (
            <div
              key={rIdx}
              className="grid grid-cols-1 gap-1 md:grid-cols-4 md:gap-0 px-4 md:px-8 py-6 border-b border-white/10 text-gray-300"
            >
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`text-base ${cIdx === 0 ? "text-white" : cIdx === row.length - 1 ? "md:text-right" : "md:text-center"}`}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Education block */}
      <div className="mt-16">
        <div className="hidden md:grid bg-white text-black grid-cols-4 px-8 py-4 rounded-sm">
          {EDUCATION_HEADERS.map((h, i) => (
            <span
              key={h}
              className={`text-sm font-medium ${i === 0 ? "text-left" : i === EDUCATION_HEADERS.length - 1 ? "text-right" : "text-center"}`}
            >
              {h}
            </span>
          ))}
        </div>
        <div>
          {EDUCATION_ROWS.map((row, rIdx) => (
            <div
              key={rIdx}
              className="grid grid-cols-1 gap-1 md:grid-cols-4 md:gap-0 px-4 md:px-8 py-6 border-b border-white/10 text-gray-300"
            >
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`text-base ${cIdx === 0 ? "text-white" : cIdx === row.length - 1 ? "md:text-right" : "md:text-center"}`}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;