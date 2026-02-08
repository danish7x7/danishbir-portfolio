'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RotatingTextProps {
  texts: string[]
  interval?: number
  className?: string
}

export default function RotatingText({ 
  texts, 
  interval = 2000,
  className = '' 
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    // Added min-w-[140px] to reserve space for the longest word
    // Added justify-start to align text properly
    <div className={`relative inline-flex h-[1.2em] w-[140px] overflow-hidden align-top ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute left-0 top-0 whitespace-nowrap"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}