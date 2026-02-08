'use client';

import React from 'react';

interface FlipLinkProps {
  children: string;
  href: string;
}

export default function FlipLink({ children, href }: FlipLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={isExternal ? `${children} (opens in new tab)` : undefined}
      className="group relative block overflow-hidden whitespace-nowrap text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal uppercase"
      style={{
        lineHeight: 0.8, // Tighter line height for the bigger font
        fontFamily: 'var(--font-russo), sans-serif',
      }}
    >
      {/* First layer */}
      <div className="flex text-white transition-all duration-500 group-hover:text-gray-400">
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-500 ease-in-out group-hover:-translate-y-full"
            style={{ transitionDelay: i * 20 + 'ms' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
      
      {/* Second layer */}
      <div className="absolute inset-0 flex text-white">
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0"
            style={{ transitionDelay: i * 20 + 'ms' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </a>
  );
}