'use client';

import React from 'react';
import FlipLink from './ui/FlipLink';
import LocationTag from './ui/LocationTag';

interface ContactLink {
  label: string;
  url: string;
}

interface ContactSectionProps {
  links: ContactLink[];
}

export default function ContactSection({ links }: ContactSectionProps) {
  return (
    <section id="contact" className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900/20" />

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Photo (35% Width) */}
        <div className="w-full lg:w-[35%] flex items-center justify-center p-4 lg:p-0">
          <div className="relative w-full h-[60vh] lg:h-screen">
            <img
              src="/images/me.JPEG"
              alt="Danishbir Singh"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
            <div className="absolute bottom-10 left-10 scale-125 origin-left">
              <LocationTag city="San Jose" country="CA" timezone="PST" />
            </div>
          </div>
        </div>

        {/* Right side - Contact Links (65% Width) */}
        <div className="w-full lg:w-[65%] flex flex-col justify-center px-8 lg:px-24 py-16">
          <div className="mb-16">
            <h2
              className="text-5xl md:text-7xl text-white/30 uppercase tracking-tighter"
              style={{ fontFamily: 'var(--font-russo), sans-serif' }}
            >
              Get in touch
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <FlipLink key={index} href={link.url}>
                {link.label}
              </FlipLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}