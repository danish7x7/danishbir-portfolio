import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Navigation from '@/components/Navigation';
import ScrollExpandMedia from '@/components/ui/ScrollExpandMedia';

const IntroSequence = dynamic(() => import('@/components/IntroSequence'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />,
});

const projectsData = [
  {
    id: 'travel-companion',
    leftLabel: 'AI Travel Companion',
    rightLabel: '2024–2025',
    title: 'AI Travel Companion',
    description:
      'Tourists were getting overcharged at restaurants because they couldn\'t read local menus. I built a low-latency multi-modal platform combining OCR, Speech, and Geolocation that translates menus in real time — under 2 seconds. Fine-tuned EfficientNet-B4 achieving 87.3% Top-1 accuracy on Food-101.',
    techStack: ['Python', 'PyTorch', 'React', 'FastAPI', 'EfficientNet-B4', 'Google Maps API'],
    background: '/images/projects/project-1.jpg',
    githubUrl: 'https://github.com/danish7x7',
  },
  {
    id: 'rag-pipeline',
    leftLabel: 'RAG Pipeline',
    rightLabel: '2024',
    title: 'RAG Pipeline',
    description:
      'Built a production retrieval-augmented generation pipeline to answer questions over private enterprise documents. Achieved sub-500ms query latency at scale using vector search and response caching.',
    techStack: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'PostgreSQL'],
    background: '/images/projects/project-2.jpg',
    githubUrl: 'https://github.com/danish7x7',
  },
  {
    id: 'pokeprice',
    leftLabel: 'PokéPrice',
    rightLabel: '2024',
    title: 'PokéPrice',
    description:
      'Card collectors were making buying decisions on stale data. PokéPrice pulls live market data and surfaces price trends, grade differentials, and arbitrage signals — built for people who take the hobby seriously.',
    techStack: ['React', 'Next.js', 'Supabase', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    background: '/images/projects/project-3.jpg',
    githubUrl: 'https://github.com/danish7x7/pokeprice',
  },
  {
    id: 'medical-imaging',
    leftLabel: 'Medical Imaging Pipeline',
    rightLabel: '2025–Present',
    title: 'Medical Imaging Pipeline',
    description:
      'Clinical imaging annotation is slow, expensive, and inconsistent. This pipeline uses YOLOv8 and Mask R-CNN to automate lesion detection — improving F1 from 0.58 to 0.71 on 3,200 clinical images. Tobacco-use risk prediction AUC reached 0.81.',
    techStack: ['YOLOv8', 'Mask R-CNN', 'PyTorch', 'Pandas', 'scikit-learn', 'SQL'],
    background: '/images/projects/project-4.jpg',
    githubUrl: '',
  },
];

const contactLinks = [
  { label: 'Resume', url: 'https://drive.google.com/file/d/1BrTAi506hqACN_MG9QHyT-oNAdgkWEVa/view?usp=sharing' },
  { label: 'Email', url: 'mailto:danishbirsinghbhatti@gmail.com' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danishbir-singh-bhatti/' },
  { label: 'GitHub', url: 'https://github.com/danish7x7' },
];

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      <IntroSequence>
        <Navigation visible={true} />

        <div id="about">
          <ScrollExpandMedia mediaSrc="/images/me.JPEG">
            <HeroSection />
          </ScrollExpandMedia>
        </div>

        <ProjectsSection projects={projectsData} />
        <ContactSection links={contactLinks} />

        <footer className="py-5 bg-black text-center border-t border-white/10">
          <p className="text-sm text-white/30">© {new Date().getFullYear()} Danishbir Singh.</p>
        </footer>
      </IntroSequence>
    </main>
  );
}