import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section id="home" className="w-full scroll-mt-[150px]">
      {/* ============================================= */}
      {/* TIER 1: Headline + Image + Banner (layered)  */}
      {/* ============================================= */}
      <div className="mt-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Headline + Banner stack — fills full height of image */}
          <div className="md:col-span-8 flex flex-col justify-between min-h-[26vw]">
            {/* Headline — top aligned */}
            <h1
              className="font-medium text-white leading-[1.05] tracking-tight max-w-[60%]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Building ML systems, performance-tuned infrastructure, and software that ships{" "}
              <span className="whitespace-nowrap">システム</span>.
            </h1>

            {/* White banner — bottom of stack, extends under image to right margin */}
            <div className="mt-8 bg-white text-black py-3 px-6 relative z-0 -mr-[50%] overflow-hidden">
              <ul className="grid grid-cols-4 w-full">
                <li className="text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap">
                  Applied ML
                </li>
                <li className="text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap">
                  Software Engineering
                </li>
                <li className="text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap">
                  Cloud Infrastructure
                </li>
                <li className="text-xs md:text-sm font-bold uppercase tracking-wide whitespace-nowrap">
                  Research
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Image — anchored to TOP, sits over banner's right portion */}
          <div className="md:col-span-4 md:absolute md:top-0 md:right-20 md:w-[30%] z-10">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <Image src="/me.JPEG" alt="Danish portrait" fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" priority />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* TIER 2: Massive Typography — "Danish™"        */}
      {/* ============================================= */}
      <div className="mt-12">
        <div className="w-full flex justify-center items-start">
          <h2
            className="font-bold text-white leading-none tracking-tighter text-center w-full"
            style={{ fontSize: "clamp(5rem, 17vw, 20rem)" }}
          >
            Danish
            <sup className="text-[0.3em] font-bold align-super tracking-normal ml-2">
              ™
            </sup>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;