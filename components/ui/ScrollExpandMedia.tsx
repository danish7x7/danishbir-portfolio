'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ScrollExpandMediaProps {
  mediaSrc: string;
  bgImageSrc?: string; 
  children?: ReactNode; // HeroSection text
}

const ScrollExpandMedia = ({
  mediaSrc,
  children,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Increased height to 350vh to give plenty of scroll time before Skills appear
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- ANIMATION MAPPING ---

  // 1. IMAGE ANIMATION
  // Width: Starts full screen (100%), shrinks to side column (30%)
  const widthAnim = useTransform(scrollYProgress, [0, 0.6], ["100%", "30%"]);
  
  // Height: Starts full screen (100vh), shrinks to a nice card height (65vh)
  const heightAnim = useTransform(scrollYProgress, [0, 0.6], ["100vh", "65vh"]);
  
  // Left Position: Starts at 0 (occupies whole screen), moves to 70% (right side)
  const leftAnim = useTransform(scrollYProgress, [0, 0.6], ["0%", "70%"]);
  
  // Border Radius: Starts square (0px), becomes rounded (20px)
  const radiusAnim = useTransform(scrollYProgress, [0, 0.6], ["0px", "20px"]);

  // 2. TEXT ANIMATION (The "Start Thing")
  // Left: Starts at 50% (Center of screen). Moves to 5% (Left align margin)
  const textLeftAnim = useTransform(scrollYProgress, [0, 0.6], ["50%", "5%"]);
  
  // X Translate: Starts at -50% (to truly center it). Moves to 0% (to align left)
  const textXAnim = useTransform(scrollYProgress, [0, 0.6], ["-50%", "0%"]);
  
  // Width: Text container width
  const textWidthAnim = useTransform(scrollYProgress, [0, 0.6], ["90%", "65%"]);

  return (
    <div ref={containerRef} className="relative h-[350vh]">
      
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center">
        
        {/* --- BACKGROUND PARTICLES (Always visible behind everything) --- */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
           {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white blur-[1px]"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${Math.random() * 10 + 20}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* --- CONTENT CONTAINER --- */}
        <div className="relative w-full h-full max-w-[1920px] mx-auto">
          
          {/* 1. IMAGE SECTION (Background Layer that moves) */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-10 overflow-hidden border-white/10"
            style={{
              width: widthAnim,
              height: heightAnim,
              left: leftAnim,
              borderRadius: radiusAnim,
              borderWidth: useTransform(scrollYProgress, [0, 0.1], ["0px", "1px"]) // Fade in border
            }}
          >
            <Image
              src={mediaSrc}
              alt="Danishbir Singh - Profile"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            
            {/* Dark Gradient Overlay - Crucial for text readability when overlayed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-black/20" /> {/* Extra tint */}
          </motion.div>

          {/* 2. TEXT SECTION (Front Layer) */}
          <motion.div 
            className="absolute top-0 h-full flex flex-col justify-center z-20 pointer-events-none"
            style={{ 
              left: textLeftAnim,
              x: textXAnim,
              width: textWidthAnim,
            }}
          >
            {/* Inner container to enable pointer events on text/buttons only */}
            <div className="pointer-events-auto">
               {children}
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, -25px); }
        }
      `}</style>
    </div>
  );
};

export default ScrollExpandMedia;