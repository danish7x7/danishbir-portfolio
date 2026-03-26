'use client'

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-center w-full">

      {/* Name */}
      <h1
        className="text-6xl md:text-8xl lg:text-9xl text-white mb-8 tracking-tight"
        style={{
          fontFamily: 'var(--font-russo), sans-serif',
          lineHeight: 0.95,
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
        }}
      >
        Danishbir <br /> Singh
      </h1>

      {/* Statement — write this in your own voice */}
      <p
        className="text-xl md:text-2xl text-white/75 leading-relaxed max-w-xl mb-6"
        style={{ fontFamily: 'var(--font-lexend), sans-serif' }}
      >
        I build AI systems that work beyond the benchmark —
        production-grade, low-latency, and actually deployed.
        SJSU CS grad obsessed with the gap between research and reality.
      </p>

      {/* Status line */}
      <p
        className="text-sm uppercase tracking-widest text-white/35"
        style={{ fontFamily: 'var(--font-lexend), sans-serif' }}
      >
        Open to full-time roles · San Jose, CA
      </p>

    </div>
  )
}