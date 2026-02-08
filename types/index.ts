import { ReactNode } from 'react';

/**
 * Project data type for the Projects section
 */
export interface Project {
  id: string;
  leftLabel: string;
  rightLabel: string;
  title: ReactNode;
  description: string;
  techStack: string[];
  background: string;
  githubUrl: string;
}

/**
 * Skill category containing multiple skills
 */
export interface SkillCategories {
  name: string;
  skills: Skill[];
}

/**
 * Individual skill with icon and link
 */
export interface Skill {
  name: string;
  icon: string;
  url: string;
  color?: string;
}

/**
 * Contact link for the Contact section
 */
export interface ContactLink {
  label: string;
  url: string;
  type: 'external' | 'mailto';
}

/**
 * Navigation item for GooeyNav
 */
export interface NavItem {
  label: string;
  href: string;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

/**
 * Particle configuration for animations
 */
export interface ParticleConfig {
  count: number;
  colors: string[];
  sizeRange: [number, number];
  speed: number;
  direction?: 'random' | 'up' | 'down';
  density?: 'low' | 'medium' | 'high';
}

/**
 * Section visibility state
 */
export interface SectionVisibility {
  loading: boolean;
  hero: boolean;
  skills: boolean;
  projects: boolean;
  contact: boolean;
  footer: boolean;
}