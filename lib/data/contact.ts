import { ContactLink, NavItem } from '@/types';

export const contactLinks: ContactLink[] = [
  {
    label: 'RESUME',
    url: 'https://drive.google.com/file/d/1BrTAi506hqACN_MG9QHyT-oNAdgkWEVa/view?usp=sharing', // [RESUME_URL_PLACEHOLDER]
    type: 'external',
  },
  {
    label: 'EMAIL',
    url: 'mailto:danishbirsinghbhatti@gmail.com', // [EMAIL_PLACEHOLDER]
    type: 'mailto',
  },
  {
    label: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/danishbir-singh-bhatti/', // [LINKEDIN_URL_PLACEHOLDER]
    type: 'external',
  },
  {
    label: 'GITHUB',
    url: 'https://github.com/danish7x7', // [GITHUB_URL_PLACEHOLDER]
    type: 'external',
  },
];

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const siteConfig = {
  name: 'Danishbir Singh',
  title: 'Software Engineer',
  location: 'San Jose, CA',
  timezone: 'America/Los_Angeles',
  bio: 'Recent SJSU Master\'s graduate blending AI/ML expertise with creative problem-solving. I turn complex data challenges into elegant solutions, bridging cutting-edge research with real-world impact.',
};
