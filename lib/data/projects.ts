import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'travel-companion',
    leftLabel: 'Multi-Modal AI Travel Companion',
    rightLabel: '2024-2025',
    title: 'Multi-Modal AI Travel Companion',
    description:
      'Architected a low-latency multi-modal platform combining OCR, Speech, and Geolocation, delivering real-time menu translation in under 2 seconds. Fine-tuned EfficientNet-B4 classifier achieving 87.3% Top-1 accuracy on Food-101 dataset.',
    techStack: [
      'FastAPI',
      'SwiftUI',
      'PostgreSQL',
      'Redis',
      'PaddleOCR',
      'Llama',
      'Docker',
    ],
    background: '/images/projects/project-1.jpg',
    githubUrl: 'https://github.com/danish7x7/Multi-Modal-AI-Travel-Companion', // [GITHUB_LINK_PLACEHOLDER]
  },
  {
    id: 'legal-llm',
    leftLabel: 'Legal LLM',
    rightLabel: '2024',
    title: 'Legal LLM',
    description:
      'Established a scalable RAG system capable of processing 30,000+ documents with 3s retrieval latency. Maximized retrieval accuracy to 80% Hitrate using Llama 3.1 embeddings and semantic re-ranking.',
    techStack: [
      'Python',
      'LangChain',
      'Streamlit',
      'Hugging Face',
      'Chroma',
      'Groq',
      'NLP',
    ],
    background: '/images/projects/project-2.jpg',
    githubUrl: 'https://github.com/danish7x7/LegalLLM', // [GITHUB_LINK_PLACEHOLDER]
  },
  {
    id: 'pokeprice',
    leftLabel: 'PokéPrice',
    rightLabel: '2023-2024',
    title: 'PokéPrice',
    description:
      'Deployed a serverless marketplace on Next.js and Supabase, supporting 500+ concurrent users with zero downtime. Accelerated API response times to 200ms for 1,000+ item index using Redis caching strategies.',
    techStack: [
      'React',
      'Next.js',
      'Supabase',
      'Vercel',
      'Node.js',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    background: '/images/projects/project-3.jpg',
    githubUrl: 'https://github.com/danish7x7/pokeprice', // [GITHUB_LINK_PLACEHOLDER]
  },
  {
    id: 'medical-imaging',
    leftLabel: 'Medical Imaging Pipeline',
    rightLabel: '2025-Present',
    title: 'Medical Imaging Pipeline',
    description:
      'Constructed a medical imaging pipeline using YOLOv8 and Mask R-CNN, achieving a 22% increase in diagnostic precision (F1 0.58 to 0.71) on 3,200 clinical images. Boosted tobacco-use risk prediction AUC to 0.81.',
    techStack: [
      'YOLOv8',
      'Mask R-CNN',
      'SQL',
      'Pandas',
      'scikit-learn',
      'PyTorch',
    ],
    background: '/images/projects/project-4.jpg',
    githubUrl: '#', // [GITHUB_LINK_PLACEHOLDER - if publishable]
  },
];