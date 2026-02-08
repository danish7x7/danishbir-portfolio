import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Navigation from '@/components/Navigation';
import ScrollExpandMedia from '@/components/ui/ScrollExpandMedia';

// Dynamic import — IntroSequence (and SpiralAnimation inside it) only loads client-side
const IntroSequence = dynamic(() => import('@/components/IntroSequence'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />,
});

// --- DATA (serializable, zero client bundle cost in a Server Component) ---

const skillCategories = [
  {
    link: '#languages',
    text: 'Languages',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    skills: [
      { name: 'Python', icon: 'devicon-python-plain' },
      { name: 'C++', icon: 'devicon-cplusplus-plain' },
      { name: 'SQL', icon: 'devicon-postgresql-plain' },
      { name: 'JS', icon: 'devicon-javascript-plain' },
      { name: 'HTML', icon: 'devicon-html5-plain' },
    ],
  },
  {
    link: '#frameworks',
    text: 'Frameworks',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    skills: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'Next.js', icon: 'devicon-nextjs-plain' },
      { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
      { name: 'PyTorch', icon: 'devicon-pytorch-original' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
    ],
  },
  {
    link: '#tools',
    text: 'Tools & DevOps',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
    skills: [
      { name: 'Git', icon: 'devicon-git-plain' },
      { name: 'Docker', icon: 'devicon-docker-plain' },
      { name: 'K8s', icon: 'devicon-kubernetes-plain' },
      { name: 'Terraform', icon: 'devicon-terraform-plain' },
      { name: 'AWS', icon: 'devicon-amazonwebservices-plain' },
    ],
  },
  {
    link: '#databases',
    text: 'Databases & Cloud',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
    skills: [
      { name: 'Postgres', icon: 'devicon-postgresql-plain' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
      { name: 'Redis', icon: 'devicon-redis-plain' },
      { name: 'S3', icon: 'devicon-amazonwebservices-plain' },
    ],
  },
];

const projectsData = [
  {
    id: 'travel-companion',
    leftLabel: 'Multi-Modal AI Travel Companion',
    rightLabel: '2024-2025',
    title: 'Multi-Modal AI Travel Companion',
    description:
      'Architected a low-latency multi-modal platform combining OCR, Speech, and Geolocation, delivering real-time menu translation in under 2 seconds. Fine-tuned EfficientNet-B4 classifier achieving 87.3% Top-1 accuracy on Food-101 dataset.',
    techStack: ['FastAPI', 'SwiftUI', 'PostgreSQL', 'Redis', 'PaddleOCR', 'Llama', 'Docker'],
    background: '/images/projects/project-1.jpg',
    githubUrl: 'https://github.com/danish7x7/Multi-Modal-AI-Travel-Companion',
  },
  {
    id: 'legal-llm',
    leftLabel: 'Legal LLM',
    rightLabel: '2024',
    title: 'Legal LLM',
    description:
      'Established a scalable RAG system capable of processing 30,000+ documents with 3s retrieval latency. Maximized retrieval accuracy to 80% Hitrate using Llama 3.1 embeddings and semantic re-ranking.',
    techStack: ['Python', 'LangChain', 'Streamlit', 'Hugging Face', 'Chroma', 'Groq', 'NLP'],
    background: '/images/projects/project-2.jpg',
    githubUrl: 'https://github.com/danish7x7/LegalLLM',
  },
  {
    id: 'pokeprice',
    leftLabel: 'PokéPrice',
    rightLabel: '2023-2024',
    title: 'PokéPrice',
    description:
      'Deployed a serverless marketplace on Next.js and Supabase, supporting 500+ concurrent users with zero downtime. Accelerated API response times to 200ms for 1,000+ item index using Redis caching strategies.',
    techStack: ['React', 'Next.js', 'Supabase', 'Vercel', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    background: '/images/projects/project-3.jpg',
    githubUrl: 'https://github.com/danish7x7/pokeprice',
  },
  {
    id: 'medical-imaging',
    leftLabel: 'Medical Imaging Pipeline',
    rightLabel: '2025-Present',
    title: 'Medical Imaging Pipeline',
    description:
      'Constructed a medical imaging pipeline using YOLOv8 and Mask R-CNN, achieving a 22% increase in diagnostic precision (F1 0.58 to 0.71) on 3,200 clinical images. Boosted tobacco-use risk prediction AUC to 0.81.',
    techStack: ['YOLOv8', 'Mask R-CNN', 'SQL', 'Pandas', 'scikit-learn', 'PyTorch'],
    background: '/images/projects/project-4.jpg',
    githubUrl: 'https://github.com/yourusername/medical-imaging',
  },
];

const contactLinks = [
  { label: 'Resume', url: 'https://drive.google.com/file/d/1BrTAi506hqACN_MG9QHyT-oNAdgkWEVa/view?usp=sharing' },
  { label: 'Email', url: 'mailto:danishbirsinghbhatti@gmail.com' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danishbir-singh-bhatti/' },
  { label: 'GitHub', url: 'https://github.com/danish7x7' },
];

// --- PAGE (Server Component — no 'use client') ---

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      <IntroSequence>
        {/* Navigation */}
        <Navigation visible={true} />

        <div id="about">
          <ScrollExpandMedia mediaSrc="/images/me.JPEG">
            <HeroSection />
          </ScrollExpandMedia>
        </div>

        <div id="skills">
          <SkillsSection categories={skillCategories} />
        </div>

        <ProjectsSection projects={projectsData} />
        <ContactSection links={contactLinks} />

        <footer className="py-5 bg-black text-center border-t border-white/5">
          <p className="text-sm text-gray-600">© 2026 Danishbir Singh.</p>
        </footer>
      </IntroSequence>
    </main>
  );
}