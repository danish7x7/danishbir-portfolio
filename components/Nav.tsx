// components/Nav.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import PetPicker from "@/components/PetPicker";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const FlipLink: React.FC<{ label: string; href: string }> = ({ label, href }) => {
  return (
    <a href={href} className="group relative inline-block overflow-hidden whitespace-nowrap leading-[1.2]">
      <span className="flex text-gray-400 transition-colors duration-300">
        {label.split("").map((letter, i) => (
          <span key={i} className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full" style={{ transitionDelay: `${i * 15}ms` }}>
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
      <span className="absolute inset-0 flex text-white">
        {label.split("").map((letter, i) => (
          <span key={i} className="inline-block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0" style={{ transitionDelay: `${i * 15}ms` }}>
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </a>
  );
};

const Nav: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 100) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="mx-auto max-w-[2000px] px-[3%] md:px-4 lg:px-9 pt-8 pb-6">
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="flex items-start gap-3">
            <a href="#home" className="text-2xl font-bold text-white tracking-normal">Danish<sup className="text-[0.8em] font-bold align-super">®</sup></a>
            <PetPicker />
          </div>

          <div className="flex flex-col md:items-center">
            <span className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</span>
            <div className="flex gap-2 mt-1 text-sm">
              {LINKS.map((link, i) => (
                <span key={link.label} className="flex items-center gap-2">
                  <FlipLink label={link.label} href={link.href} />
                  {i < LINKS.length - 1 && <span className="text-gray-400">,</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="text-xs font-bold text-white uppercase tracking-wide">Based in San Jose サンノゼ</span>
            <span className="text-sm text-gray-400 mt-1 md:text-right">AI/ML + Software Developer</span>
          </div>
        </nav>

        <div className="mt-4 border-b border-white/10" />
      </div>
    </header>
  );
};

export default Nav;