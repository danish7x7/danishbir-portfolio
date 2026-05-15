// components/Testimonials.tsx
const TESTIMONIALS = [
  {
    quote:
      "Some engineers can only make a product. You are one of the few who can sell it too.",
    name: "Dan Raisovich",
    role: "Founder & CEO, Mentor",
    linkedin: "https://www.linkedin.com/in/raisovich/",
  },
  {
    quote:
      "We need to hire like 3 people to replace you.",
    name: "Alexis Graesser",
    role: "Assistant Director of Programming, SJSU Student Union",
    linkedin: "https://www.linkedin.com/in/alexis-graesser/",
  },
  {
    quote:
      "This guy knows how to get things done and have fun at the same time.",
    name: "Omar Garcia",
    role: "Director, Events & Programs, SJSU Student Union",
    linkedin: "https://www.linkedin.com/in/omar-garcia-m-ed-67809999/",
  },
];

// Alternating sides for the cards as they fly past
const ALIGNMENTS = ["md:mr-auto md:ml-[4%]", "md:ml-auto md:mr-[4%]", "md:mr-auto md:ml-[12%]"];

const Testimonials: React.FC = () => {
  return (
    <section className="mt-24">
      {/* Section header */}
      <div className="border-t border-white/10 py-4">
        <div className="grid grid-cols-3 items-center text-sm text-gray-400 uppercase tracking-wider">
          <span>© Testimonials レビュー</span>
          <span className="text-center">(DSH® — 04)</span>
          <span className="text-right">Real Feedback</span>
        </div>
      </div>
      <div className="border-t border-white/10" />

      {/* Sticky scroll container */}
      <div className="relative">
        {/* Sticky marquee layer — pins to viewport while cards scroll past */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden -mx-[5%] md:-mx-10 lg:-mx-16">
          <div
            className="marquee-track flex font-bold tracking-tighter leading-[0.9] whitespace-nowrap text-white pointer-events-none"
            style={{ fontSize: "clamp(5rem, 17vw, 20rem)" }}
          >
            <span className="pr-16">Testimonials© — Reviews</span>
            <span className="pr-16">Testimonials© — Reviews</span>
            <span className="pr-16">Testimonials© — Reviews</span>
            <span className="pr-16">Testimonials© — Reviews</span>
          </div>

          {/* GET IN TOUCH pill — stays centered with the pinned marquee */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[8rem] z-20">
            <a href="#contact" className="inline-block border border-white/80 rounded-full px-10 py-5 text-xl font-bold text-white uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-200">Get in Touch</a>
          </div>
        </div>

        {/* Cards layer — flows over the pinned marquee */}
        <div className="relative -mt-screen z-10 pt-[40vh] pb-[40vh] flex flex-col gap-[30vh]">
          {TESTIMONIALS.map((t, i) => (
            <a key={i} href={t.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="view" className={`block w-full md:w-[32%] bg-black border border-white/20 hover:border-white/40 transition-colors duration-200 rounded-2xl p-6 ${ALIGNMENTS[i]}`}>
              <div>
                <p className="text-white text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col">
                  <span className="text-white text-sm font-medium">{t.name}</span>
                  <span className="text-gray-400 text-xs">{t.role}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;