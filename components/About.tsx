import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <section id="about" className="w-full mt-24 pb-[100px] min-h-[100vh] flex flex-col scroll-mt-[150px]">
      {/* ============================================= */}
      {/* Section Header — thin divider row            */}
      {/* ============================================= */}
      <div className="border-t border-white/10 pt-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4">
            <span className="text-sm font-bold text-white uppercase tracking-wider">© About — ビジュアル</span>
          </div>
          <div className="md:col-span-4 md:text-center">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">(DSH® — 01)</span>
          </div>
          <div className="md:col-span-4 md:text-right">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Software Engineer</span>
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* Main content: Portrait + Text/Checkerboard   */}
      {/* flex-grow = fills remaining vertical space   */}
      {/* ============================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-grow">
        {/* Left: 3-col × 8-row tall portrait (aspect 3:8) */}
        <div className="md:col-span-4">
          <div className="relative w-full h-full min-h-[600px] bg-zinc-800 rounded-2xl overflow-hidden">
            <Image src="/about-portrait.JPEG" alt="Portrait of Danishbir Singh Bhatti" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
          </div>
        </div>

        {/* Right: Headline + Button + Checkerboard */}
        <div className="md:col-span-8 flex flex-col">
          {/* Headline / bio */}
          <h3 className="font-medium text-white leading-[1.15] tracking-tight" style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)" }}>
            A Master&apos;s in Software Engineering and a portfolio of ML, infrastructure, and research projects shipped end-to-end.
          </h3>

          {/* Contact pill button */}
          <div className="mt-8">
            <a href="#contact" className="inline-block border border-white/80 rounded-full px-10 py-5 text-xl font-bold text-white uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-200">Contact</a>
          </div>

          {/* Spacer — pushes checkerboard to the bottom of the column */}
          <div className="flex-grow" />

          {/* ======================================= */}
          {/* Checkerboard: 2 rows × 5 cols          */}
          {/* Row 1: filled at cols 1, 3, 5         */}
          {/* Row 2: filled at cols 2, 4           */}
          {/* ======================================= */}
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5 md:grid-rows-2 md:gap-4">
              {/* Row 1, Col 1 — STUDENT (Playfair serif) */}
            <div className="md:col-start-1 md:row-start-1 aspect-square border border-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Student.</span>
            </div>
    
            {/* Row 1, Col 3 — ENGINEER (JetBrains Mono) */}
            <div className="md:col-start-3 md:row-start-1 aspect-square border border-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-base md:text-lg font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-jetbrains)" }}>{`<Engineer />`}</span>
            </div>
            
            {/* Row 1, Col 5 — RESEARCHER (IBM Plex Serif) */}
            <div className="md:col-start-5 md:row-start-1 aspect-square border border-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-lg md:text-xl font-semibold text-white italic" style={{ fontFamily: "var(--font-plex-serif)" }}>Researcher</span>
            </div>
            
            {/* Row 2, Col 2 — TRAVELER (Caveat handwritten) */}
            <div className="md:col-start-2 md:row-start-2 aspect-square border border-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-caveat)" }}>traveler</span>
            </div>
            
            {/* Row 2, Col 4 — CREATOR (Bebas Neue condensed) */}
            <div className="md:col-start-4 md:row-start-2 aspect-square border border-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-2xl md:text-3xl text-white tracking-[0.15em]" style={{ fontFamily: "var(--font-bebas)" }}>CREATOR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;