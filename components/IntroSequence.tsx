'use client';

import { useState, useEffect, ReactNode } from 'react';

interface IntroSequenceProps {
  children: ReactNode;
}

export default function IntroSequence({ children }: IntroSequenceProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so the browser has painted before fading in
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="transition-opacity duration-700 ease-in-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {children}
    </div>
  );
}