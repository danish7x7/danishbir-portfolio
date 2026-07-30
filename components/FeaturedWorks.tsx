import React from "react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "FreightPilot",
    tag: "AGENTIC AI / MICROSERVICES",
    github: "https://github.com/danish7x7/freightpilot",
    image: "/projects/07.jpg",
    placement: "left",
    size: "lg",
  },
  {
    id: "02",
    title: "Terminal Agent Lab",
    tag: "LLM EVALUATION",
    github: "https://github.com/danish7x7/terminal-agent-lab",
    image: "/projects/08.jpg",
    placement: "right",
    size: "lg",
  },
  {
    id: "03",
    title: "Injection-Aware Freight Pipeline",
    tag: "LLM Safety",
    github: "https://github.com/danish7x7/freight-pipeline",
    image: "/projects/06.jpg",
    placement: "left",
    size: "lg",
  },
  {
    id: "04",
    title: "Geospatial Inequality Dashboard",
    tag: "Full-Stack Geospatial",
    github: "https://github.com/danish7x7/geospatial-dashboard",
    image: "/projects/05.png",
    placement: "right",
    size: "md",
  },
  {
    id: "05",
    title: "LLM Inference Benchmarking Suite",
    tag: "Performance Engineering",
    github: "https://github.com/danish7x7/llm-inference-bench",
    image: "/projects/01.png",
    placement: "left",
    size: "lg",
  },
  {
    id: "06",
    title: "Cloud Infrastructure Automation",
    tag: "Infrastructure as Code",
    github: "https://github.com/danish7x7/devops-nginx-project",
    image: "/projects/02.png",
    placement: "right",
    size: "md",
  },
  {
    id: "07",
    title: "Agentic RAG System",
    tag: "Applied ML",
    github: "https://github.com/danish7x7/LegalLLM",
    image: "/projects/03.png",
    placement: "left",
    size: "lg",
  },
  {
    id: "08",
    title: "Travel Companion — Multimodal AI",
    tag: "Applied ML",
    github: "https://github.com/danish7x7/Multi-Modal-AI-Travel-Companion",
    image: "/projects/04.png",
    placement: "right",
    size: "md",
  },
];

const sizeClasses: Record<string, string> = {
  sm: "w-full md:w-[45%]",
  md: "w-full md:w-[55%]",
  lg: "w-full md:w-[65%]",
};

const FeaturedWorks: React.FC = () => {
  return (
    <section id="projects" className="w-full mt-24 pb-[100px] flex flex-col scroll-mt-[150px]">
      {/* Section Header */}
      <div className="border-t border-white/10 pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4">
            <span className="text-sm font-bold text-white uppercase tracking-wider">© Featured Projects — プロジェクト</span>
          </div>
          <div className="md:col-span-4 md:text-center">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">(DSH® — 02)</span>
          </div>
          <div className="md:col-span-4 md:text-right">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Applied ML & Infrastructure</span>
          </div>
        </div>
      </div>
      <div className="border-b border-white/10" />

      {/* Marquee */}
      <div className="relative w-full overflow-hidden py-10 pointer-events-none">
        <div className="flex whitespace-nowrap marquee-track font-bold text-white leading-none tracking-tighter" style={{ fontSize: "clamp(8rem, 22vw, 28rem)" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="pr-16" aria-hidden={i > 0}>Featured Works</span>
          ))}
        </div>
      </div>

      {/* Description + CTA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
        <div className="md:col-span-6">
          <p className="text-gray-300 leading-relaxed" style={{ fontSize: "clamp(1rem, 1.15vw, 1.25rem)" }}>
            Each project is a <span className="font-bold text-white">complete system, not a demo</span>; Built around a real bottleneck and shipped end-to-end. Inference engines benchmarked down to the kernel, infrastructure provisioned in a single command, retrieval pipelines tuned for <span className="font-bold text-white">latency at scale</span>. Code that defends itself in review.
          </p>
          <div className="mt-8">
            <a href="https://github.com/danish7x7" target="_blank" rel="noopener noreferrer" className="inline-block border border-white/80 rounded-full px-10 py-5 text-xl font-bold text-white uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-200">See Works</a>
          </div>
        </div>
      </div>

      {/* Project Islands */}
      <div className="mt-24 flex flex-col gap-24">
        {projects.map((project) => (
          <div key={project.id} className={`flex ${project.placement === "left" ? "justify-start" : "justify-end"}`}>
            <div className={sizeClasses[project.size]}>
              <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="view" className="group block relative w-full aspect-[4/3] bg-zinc-800 border border-white/20 rounded-2xl overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 65vw" />
                <div className="absolute bottom-6 right-6 z-20">
                  <span className="text-sm font-bold text-white/60 tracking-wider">({project.id})</span>
                </div>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white text-black py-4 px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-wider">{project.tag}</span>
                    <span className="text-sm font-bold uppercase tracking-wider">View on GitHub →</span>
                  </div>
                </div>
              </a>
              <div className="flex items-baseline justify-between mt-4">
                <span className="text-lg font-bold text-white">{project.title}</span>
                <span className="text-sm font-bold text-gray-400">({project.id})</span>
              </div>
              {/* Touch devices never see the hover overlay — surface the tag inline */}
              <div className="mt-1 flex items-baseline justify-between md:hidden">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{project.tag}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">View on GitHub →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWorks;