import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedWorks from "@/components/FeaturedWorks";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Closing from "@/components/Closing";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <FeaturedWorks />
      <Experience />
      <Testimonials />
      <Closing />
    </main>
  );
}