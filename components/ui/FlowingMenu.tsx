'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface Skill {
  name: string
  icon: string
}

interface MenuItemData {
  link: string
  text: string
  skills?: Skill[]
}

interface FlowingMenuProps {
  items?: MenuItemData[]
  speed?: number
  textColor?: string
  bgColor?: string
  marqueeBgColor?: string
  marqueeTextColor?: string
  borderColor?: string
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#000',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#000',
  borderColor = '#333'
}) => {
  return (
    <div className="menu-wrap w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="menu flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  )
}

const MenuItem: React.FC<MenuItemData & { speed: number; textColor: string; marqueeBgColor: string; marqueeTextColor: string; borderColor: string; isFirst: boolean }> = ({
  link, text, skills, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst
}) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)
  const [repetitions, setRepetitions] = useState(6) // Increased for full width

  useEffect(() => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return

    const marquee = marqueeRef.current
    const marqueeInner = marqueeInnerRef.current

    // Entry/Exit Animation
    const tl = gsap.timeline({ paused: true })
    tl.to(marquee, { y: '0%', duration: 0.5, ease: 'power2.inOut' })

    // Infinite Marquee Loop
    const scrollTl = gsap.to(marqueeInner, {
      x: '-50%',
      duration: speed,
      repeat: -1,
      ease: 'none'
    })

    const onMouseEnter = () => tl.play()
    const onMouseLeave = () => tl.reverse()

    itemRef.current.addEventListener('mouseenter', onMouseEnter)
    itemRef.current.addEventListener('mouseleave', onMouseLeave)

    return () => {
      tl.kill()
      scrollTl.kill()
    }
  }, [speed])

  // Helper to repeat skill list for seamless loop
  const displayItems = skills ? [...skills, ...skills, ...skills, ...skills] : []

  return (
    <div 
      ref={itemRef} 
      className="menu__item flex-1 relative overflow-hidden flex items-center justify-center border-b"
      style={{ borderColor: borderColor }}
    >
      <a 
        href={link} 
        className="menu__item-link z-10 text-[5vh] uppercase font-bold px-4 transition-opacity group-hover:opacity-0"
        style={{ color: textColor, fontFamily: 'var(--font-russo)' }}
      >
        {text}
      </a>

      {/* Full Width Marquee Overlay */}
      <div 
        ref={marqueeRef}
        className="marquee absolute inset-0 z-20 translate-y-full pointer-events-none flex items-center overflow-hidden"
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div ref={marqueeInnerRef} className="marquee__inner flex items-center whitespace-nowrap min-w-max">
          {displayItems.map((skill, i) => (
            <div key={i} className="flex items-center px-12" style={{ color: marqueeTextColor }}>
              <i className={`${skill.icon} text-[4vh] mr-4`} />
              <span className="text-[3.5vh] uppercase font-bold" style={{ fontFamily: 'var(--font-russo)' }}>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlowingMenu