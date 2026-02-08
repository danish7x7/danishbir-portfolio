'use client'

import ScrollVelocity from '@/components/ui/ScrollVelocity'
import FlowingMenu from '@/components/ui/FlowingMenu'

interface FlowingMenuSkill {
  name: string;
  icon: string;
}

interface FlowingMenuItem {
  link: string;
  text: string;
  image?: string;
  skills?: FlowingMenuSkill[];
}

interface SkillsSectionProps {
  categories: FlowingMenuItem[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative min-h-screen bg-black w-full overflow-x-hidden">
      {/* ScrollVelocity Header */}
      <div className="pt-16 pb-8">
        <ScrollVelocity
          texts={['Skills -', 'Expertise -']}
          velocity={120}
          className="text-white"
          parallaxClassName="relative overflow-hidden"
          scrollerClassName="flex whitespace-nowrap"
          scrollerStyle={{
            fontFamily: 'var(--font-russo), sans-serif',
            fontSize: 'clamp(6rem, 25vw, 18rem)',
            fontWeight: 'bold',
            opacity: 0.2,
          }}
        />
      </div>
      {/* FlowingMenu - Spanning full screen width */}
      <div className="w-full h-[700px] md:h-[800px] border-y border-white/10">
        <FlowingMenu
          items={categories}
          speed={15}
          textColor="#ffffff"
          bgColor="#000000"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#000000"
          borderColor="white"
        />
      </div>
    </section>
  )
}