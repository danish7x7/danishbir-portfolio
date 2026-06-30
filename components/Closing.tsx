// components/Closing.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

const PHOTOS = [
  { src: "/closing/1.jpg", w: 240, h: 300 },
  { src: "/closing/2.jpg", w: 280, h: 200 },
  { src: "/closing/3.jpg", w: 200, h: 280 },
  { src: "/closing/4.jpg", w: 300, h: 240 },
  { src: "/closing/5.jpg", w: 220, h: 320 },
  { src: "/closing/6.jpg", w: 260, h: 200 },
  { src: "/closing/7.jpg", w: 240, h: 280 },
  { src: "/closing/8.jpg", w: 290, h: 220 },
  { src: "/closing/9.jpg", w: 240, h: 280 },
];

const BANNER_LABELS = ["Engineering", "Research", "Infrastructure", "ML/AI"];

const EMAIL = "danishbirsinghbhatti@gmail.com";

interface FlipLinkProps {
  children: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href, onClick }) => {
  const isExternal = !!href && (href.startsWith("http") || href.startsWith("mailto:"));
  return (
    <a href={href ?? "#"} onClick={onClick} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} aria-label={isExternal ? `${children} (opens in new tab)` : undefined} className="group relative block overflow-hidden whitespace-nowrap text-3xl md:text-5xl lg:text-6xl font-normal uppercase" style={{ lineHeight: 0.9, fontFamily: "var(--font-bebas), sans-serif" }}>
      <div className="flex text-white transition-all duration-500 group-hover:text-gray-400">
        {children.split("").map((letter, i) => (
          <span key={i} className="inline-block transition-transform duration-500 ease-in-out group-hover:-translate-y-full" style={{ transitionDelay: i * 20 + "ms" }}>
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex text-white">
        {children.split("").map((letter, i) => (
          <span key={i} className="inline-block translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0" style={{ transitionDelay: i * 20 + "ms" }}>
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </a>
  );
};

const Closing: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const fallback = () => {
      // Clipboard unavailable (insecure context / older browser) — open mail client instead
      window.location.href = `mailto:${EMAIL}`;
    };
    if (!navigator.clipboard) {
      fallback();
      return;
    }
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2000);
      })
      .catch(fallback);
  };

  return (
    <section className="mt-24 pb-[100px]">
      {/* Toast */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${toastVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        Email copied
      </div>

      {/* Section header */}
      <div className="border-t border-white/10 py-4">
        <div className="grid grid-cols-3 items-center text-sm text-gray-400 uppercase tracking-wider">
          <span>© Final Section クロージング</span>
          <span className="text-center">(DSH® — 05)</span>
          <span className="text-right">Closing Notes</span>
        </div>
      </div>
      <div className="border-t border-white/10" />

      {/* Photo marquee — full bleed */}
      <div className="mt-16 overflow-hidden -mx-[3%] md:-mx-4 lg:-mx-9">
        <div className="marquee-track flex items-center gap-4">
          {[...PHOTOS, ...PHOTOS].map((p, i) => (
            <div key={i} className="relative shrink-0 bg-zinc-800 rounded-2xl overflow-hidden" style={{ width: p.w + "px", height: p.h + "px" }}>
              <Image src={p.src} alt="" fill className="object-cover" sizes={p.w + "px"} />
            </div>
          ))}
        </div>
      </div>

      {/* White banner with 4 labels */}
      <div className="mt-16 bg-white text-black grid grid-cols-4 px-8 py-4 rounded-sm">
        {BANNER_LABELS.map((label, i) => (
          <span key={label} className={`text-sm font-medium ${i === 0 ? "text-left" : i === BANNER_LABELS.length - 1 ? "text-right" : "text-center"}`}>
            {label}
          </span>
        ))}
      </div>

      {/* Signed quote */}
      <div className="mt-20 max-w-3xl mx-auto text-center">
        <p className="italic text-white leading-snug" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
          &ldquo;New enough to be hungry, experienced enough to know what I don&rsquo;t know.&rdquo;
        </p>
        <p className="mt-6 text-gray-400 text-right" style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
          ~ Danish
        </p>
      </div>

      {/* Flip-link footer — horizontal quick-links */}
      <div id="contact" className="mt-24 flex flex-row flex-wrap items-center justify-center gap-8 md:gap-16 scroll-mt-[150px]">
        <FlipLink href="https://drive.google.com/file/d/14MsgsXX1zMgdz1p4XUs9f-tfI6qT5D2a/view?usp=drive_link">Resume</FlipLink>
        <FlipLink href="https://www.linkedin.com/in/danishbir-singh-bhatti/">LinkedIn</FlipLink>
        <FlipLink href="https://github.com/danish7x7">GitHub</FlipLink>
        <FlipLink onClick={handleEmailClick}>Email</FlipLink>
      </div>

      {/* Back to top */}
      <div className="mt-24 flex justify-center">
        <a href="#home" className="inline-block border border-white/80 rounded-full px-10 py-5 text-xl font-bold text-white uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-200">Back to Top</a>
      </div>
    </section>
  );
};

export default Closing;