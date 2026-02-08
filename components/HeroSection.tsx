'use client'

import { useRef } from 'react'
import VariableProximity from '@/components/ui/VariableProximity'
import RotatingText from '@/components/ui/RotatingText'


export default function HeroSection() {
  const bioContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col justify-center w-full">
      
      {/* Name */}
      <h1 
        className="text-6xl md:text-8xl lg:text-9xl text-white mb-6 tracking-tight drop-shadow-2xl"
        style={{ 
          fontFamily: 'var(--font-russo), sans-serif',
          lineHeight: 0.95,
          textShadow: '0 4px 30px rgba(0,0,0,0.5)' // Extra shadow for readability over image
        }}
      >
        Danishbir <br/> Singh
      </h1>
      
      {/* Rotating Subheading */}
      <div 
        className="text-2xl md:text-3xl text-gray-200 mb-10 flex items-center gap-3 font-medium drop-shadow-lg"
        style={{ fontFamily: 'var(--font-lexend), sans-serif' }}
      >
        <span className="text-white opacity-90">I am a</span>
        
        <RotatingText 
          texts={['Software', 'AI/ML', 'Creative', 'Full Stack']} 
          interval={2000} 
          className="text-blue-400 font-bold" 
        />
        
        <span className="text-white opacity-90">Engineer</span>
      </div>

      {/* Bio with Variable Proximity Effect */}
      <div ref={bioContainerRef} className="max-w-3xl cursor-default drop-shadow-md">
        <VariableProximity
          label="Building intelligent systems that bridge the gap between complex data and human experience."
          className="text-xl md:text-2xl text-gray-200 leading-relaxed tracking-wide"
          fromFontVariationSettings="'wght' 300, 'opsz' 9"
          toFontVariationSettings="'wght' 700, 'opsz' 40"
          containerRef={bioContainerRef}
          radius={120}
          falloff="linear"
        />
      </div>
    </div>
  )
}