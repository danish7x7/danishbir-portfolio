'use client';

import { useState, useEffect } from 'react';

interface LocationTagProps {
  city?: string;
  country?: string;
  timezone?: string;
}

export default function LocationTag({
  city = 'San Jose',
  country = 'CA',
  timezone = 'PST',
}: LocationTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'America/Los_Angeles',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-5 transition-all duration-500 ease-out hover:border-white/40 hover:bg-white/10 cursor-default"
    >
      {/* Live pulse indicator */}
      <div className="relative flex items-center justify-center">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      </div>

      {/* Location text container */}
      <div className="relative flex items-center overflow-hidden h-5">
        {/* City, Country - visible by default */}
        <span
          className="text-sm font-medium text-white transition-all duration-500 whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-lexend), sans-serif',
            transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
            opacity: isHovered ? 0 : 1,
          }}
        >
          {city}, {country}
        </span>

        {/* Time - visible on hover */}
        <span
          className="absolute left-0 text-sm font-medium text-white transition-all duration-500 whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-lexend), sans-serif',
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            opacity: isHovered ? 1 : 0,
          }}
        >
          {currentTime} {timezone}
        </span>
      </div>

      {/* Arrow indicator */}
      <svg
        className="h-3 w-3 text-white/50 transition-all duration-300"
        style={{
          transform: isHovered ? 'translateX(5px) rotate(-45deg)' : 'translateX(0) rotate(0)',
          opacity: isHovered ? 1 : 0.5,
        }}
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </div>
  );
}