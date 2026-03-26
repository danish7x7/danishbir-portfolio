'use client';

import React from 'react';
import FullScreenScrollFX from './ui/FullScreenScrollFX';
import { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative">
      <div className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none bg-gradient-to-b from-black to-transparent" />
      <FullScreenScrollFX
        sections={projects}
        showProgress={true}
        parallaxAmount={4}
      />
    </section>
  );
}