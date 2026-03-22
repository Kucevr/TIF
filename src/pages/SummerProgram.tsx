import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { TksButton } from "../components/ui/TksButton";

gsap.registerPlugin(ScrollTrigger);

const WEEKS = [
  { num: "01", title: "Foundations & Mindset", desc: "Break down limiting beliefs. Learn directly from founders and build your first rapid prototype." },
  { num: "02", title: "Emerging Tech Dive", desc: "Immerse yourself in AI, synthetic biology, or quantum computing. Build projects using cutting-edge tools." },
  { num: "03", title: "The Showcase", desc: "48 hours to solve a massive real-world problem. Pitch to industry executives and investors on stage." }
];

const CAMPUSES = [
  { 
    name: "UCLA", 
    city: "Los Angeles", 
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop",
    desc: "Sun-soaked innovation. Study in state-of-the-art facilities surrounded by the thriving LA tech and creative ecosystems."
  },
  { 
    name: "NYU", 
    city: "New York City", 
    img: "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1200&auto=format&fit=crop",
    desc: "The heartbeat of global commerce. Embed yourself in the financial and cultural epicenter of the world."
  },
  { 
    name: "UofT", 
    city: "Toronto", 
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
    desc: "Canada's premier tech hub. Access world-leading AI research labs and a rapidly expanding startup landscape."
  }
];

const STATS = [
  { label: "Hours of Building", value: "300+" },
  { label: "Industry Mentors", value: "50+" },
  { label: "Lifelong Friends", value: "Countless" },
];

export const SummerProgram = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (!containerRef.current) return;

    // Line-by-line GSAP text reveal
    const heroLines = gsap.utils.toArray<HTMLElement>(".sum-hero-line");
    gsap.fromTo(heroLines,
      { y: 100, rotation: 3, opacity: 0 },
      { y: 0, rotation: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }
    );

    const headerLines = gsap.utils.toArray<HTMLElement>(".sum-header-line");
    headerLines.forEach(line => {
       gsap.fromTo(line,
         { y: 80, rotation: 2, opacity: 0 },
         { y: 0, rotation: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: line, start: "top 85%" } }
       );
    });

    // Centered Hero Pop
    gsap.fromTo(".sum-pop",
      { y: 60, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.3 }
    );

    // Stats fade up
    gsap.fromTo(".sum-stat",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: ".stats-container", start: "top 80%" } }
    );

    // Timeline fade ins
    const weeks = gsap.utils.toArray<HTMLElement>(".week-item");
    weeks.forEach(week => {
      gsap.fromTo(week,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: week, start: "top 80%" } }
      );
    });

    // Campus panels parallax
    const panels = gsap.utils.toArray<HTMLElement>(".campus-panel-img");
    panels.forEach(panelImg => {
        gsap.fromTo(panelImg, 
            { scale: 1.15 }, 
            { scale: 1, duration: 1, ease: "none", scrollTrigger: { trigger: panelImg, start: "top 95%", end: "bottom top", scrub: 1 } }
        );
    });

    // Horizontal Scroll Section
    if (horizontalRef.current && scrollWrapperRef.current) {
        const sections = gsap.utils.toArray<HTMLElement>(".hz-panel");
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: horizontalRef.current,
                pin: true,
                scrub: 1,
                end: () => "+=" + scrollWrapperRef.current!.offsetWidth
            }
        });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f2f2f2] text-black font-sans">
      <Navbar />

      <main className="pt-40 pb-0 overflow-hidden">
        {/* HERO - CENTERED EDITORIAL */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 text-center mb-24 flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#48a65f] mb-6 sum-pop">3-Week Immersion</span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter leading-[0.85] mb-8 uppercase text-black">
                <span className="block overflow-hidden"><span className="block sum-hero-line origin-bottom-left">Summer</span></span>
                <span className="block overflow-hidden"><span className="block sum-hero-line origin-bottom-left text-black/30">Of Impact.</span></span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-gray-600 font-medium sum-pop leading-relaxed">
                Trade your typical summer break for an intensive, life-changing pre-college academic enrichment program at top-tier university campuses.
            </p>
        </section>

        {/* MASONRY / OFFSET GALLERY */}
        <section className="w-full px-4 md:px-8 mb-40 max-w-[1400px] mx-auto sum-pop">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[50vh] md:h-[70vh]">
                <div className="w-full h-full rounded-2xl overflow-hidden md:col-span-1 md:row-span-2 shadow-xl">
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" alt="Student" />
                </div>
                <div className="w-full h-full rounded-2xl overflow-hidden md:col-span-2 shadow-xl cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" alt="Campus" />
                </div>
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1525926472898-a08dc3196ed5?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" alt="Study" />
                </div>
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
                     <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" alt="Hackathon" />
                </div>
                <div className="w-full h-full rounded-2xl overflow-hidden md:col-span-2 hidden md:block shadow-xl">
                     <img src="https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" alt="NYU" />
                </div>
            </div>
        </section>

        {/* MASSIVE STATS SECTION */}
        <section className="bg-black text-white py-32 px-4 md:px-8 stats-container">
            <div className="max-w-[1400px] mx-auto text-center mb-24">
               <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter mb-4 text-white/50">
                  <span className="block overflow-hidden pb-2"><span className="block sum-header-line origin-bottom-left">Accelerated Growth.</span></span>
               </h2>
               <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white">
                  <span className="block overflow-hidden pb-2"><span className="block sum-header-line origin-bottom-left">Unparalleled Experience.</span></span>
               </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-[1200px] mx-auto text-center">
                {STATS.map((s, i) => (
                    <div key={i} className="sum-stat border-t border-white/20 pt-8">
                        <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">{s.value}</div>
                        <div className="text-xl text-[#48a65f] font-medium tracking-wide uppercase">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>

        {/* HORIZONTAL SCROLL GALLERY (HORIZONTAL PIN) */}
        <section ref={horizontalRef} className="bg-[#f2f2f2] h-screen overflow-hidden flex items-center shadow-lg relative z-10 w-[100vw]">
            <div ref={scrollWrapperRef} className="flex h-full md:h-[80%] w-[300vw]">
                {/* Panel 1 */}
                <div className="hz-panel w-screen flex flex-col justify-center px-6 md:px-24 relative pt-12 md:pt-0">
                     <div className="z-20 relative mix-blend-difference text-white mb-6 md:mb-0">
                         <div className="text-[#48a65f] font-bold text-sm md:text-base tracking-[0.2em] uppercase mb-4 mix-blend-normal">The Campus Vibe</div>
                         <h3 className="text-5xl md:text-8xl font-medium tracking-tighter w-full md:w-2/3 mb-10 leading-[0.9]">Live where legends learned.</h3>
                     </div>
                     <div className="w-[90%] md:w-[60%] aspect-video overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl relative md:absolute md:right-12 md:bottom-1/4 z-10 mx-auto md:mx-0">
                         <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" />
                     </div>
                </div>
                {/* Panel 2 */}
                <div className="hz-panel w-screen flex flex-col justify-center px-6 md:px-24 relative pt-12 md:pt-0">
                     <div className="z-20 relative mix-blend-difference text-white mb-6 md:mb-0">
                         <div className="text-[#48a65f] font-bold text-sm md:text-base tracking-[0.2em] uppercase mb-4 mix-blend-normal">Deep Work</div>
                         <h3 className="text-5xl md:text-8xl font-medium tracking-tighter w-full md:w-2/3 mb-10 leading-[0.9]">Hackathons & Sprints.</h3>
                     </div>
                     <div className="w-[90%] md:w-[60%] aspect-video overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl relative md:absolute md:right-1/4 md:top-1/4 z-10 mx-auto md:mx-0">
                         <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" />
                     </div>
                </div>
                {/* Panel 3 */}
                <div className="hz-panel w-screen flex flex-col justify-center px-6 md:px-24 relative pt-12 md:pt-0">
                     <div className="z-20 relative mix-blend-difference text-white mb-6 md:mb-0">
                         <div className="text-[#48a65f] font-bold text-sm md:text-base tracking-[0.2em] uppercase mb-4 mix-blend-normal">Global Network</div>
                         <h3 className="text-5xl md:text-8xl font-medium tracking-tighter w-full md:w-2/3 mb-10 leading-[0.9]">Meet your co-founders.</h3>
                     </div>
                     <div className="w-[90%] md:w-[60%] aspect-video overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl relative md:absolute md:left-1/4 md:bottom-1/4 z-10 mx-auto md:mx-0">
                         <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" />
                     </div>
                </div>
            </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="bg-black text-white py-32 px-4 md:px-8 relative z-10">
            <div className="max-w-[1000px] mx-auto pt-20">
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-32 text-center">
                    <span className="block overflow-hidden pb-2"><span className="block sum-header-line origin-bottom-left">The 21-Day Blueprint.</span></span>
                </h2>
                <div className="flex flex-col border-l-2 border-white/10 ml-4 md:ml-8 gap-24 relative pb-20">
                    {WEEKS.map((week, i) => (
                        <div key={i} className="pl-12 md:pl-24 relative week-item group">
                            <div className="absolute w-5 h-5 bg-[#48a65f] rounded-full -left-[11px] top-2 shadow-[0_0_15px_#48a65f] group-hover:scale-150 transition-transform duration-500" />
                            <div className="text-[#48a65f] font-bold text-sm tracking-[0.2em] mb-4">WEEK {week.num}</div>
                            <h3 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight">{week.title}</h3>
                            <p className="text-white/60 text-xl md:text-2xl max-w-2xl leading-relaxed">{week.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ALTERNATING CAMPUSES */}
        <section className="py-32 md:py-48 bg-[#f2f2f2] text-black">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="mb-32">
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.8]">
                        <span className="block overflow-hidden pb-2"><span className="block sum-header-line origin-bottom-left">Host</span></span>
                        <span className="block overflow-hidden pb-2"><span className="block sum-header-line origin-bottom-left text-black/20">Campuses.</span></span>
                    </h2>
                </div>

                <div className="flex flex-col gap-32 md:gap-48">
                    {CAMPUSES.map((camp, i) => (
                        <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}>
                            <div className="w-full md:w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl">
                                <img src={camp.img} alt={camp.name} className="w-full h-full object-cover campus-panel-img group-hover:scale-105 transition-transform duration-[2s] ease-out" />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
                                <span className="text-sm font-bold tracking-[0.2em] text-[#48a65f] mb-6 uppercase flex items-center gap-4">
                                  <div className="w-12 h-[2px] bg-[#48a65f]" /> {camp.city}
                                </span>
                                <h3 className="text-7xl md:text-8xl lg:text-[9rem] font-medium tracking-tighter mb-8 leading-[0.8]">{camp.name}.</h3>
                                <p className="text-gray-600 text-2xl leading-relaxed mb-12 max-w-xl">{camp.desc}</p>
                                
                                <TksButton onClick={() => navigate("/contact")} className="h-14 px-8 text-sm uppercase tracking-widest font-bold">
                                    Apply Here
                                </TksButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* MASSIVE BOTTOM CTA */}
        <section className="bg-black text-white py-40 px-4 md:px-8 text-center flex flex-col items-center justify-center">
            <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter uppercase leading-[0.8] mb-12">
                <span className="block overflow-hidden pb-2"><span className="block sum-header-line origin-bottom-left">Your turn.</span></span>
            </h2>
            <TksButton onClick={() => navigate("/contact")} className="h-20 px-16 text-2xl uppercase tracking-widest font-bold bg-white text-black hover:bg-[#48a65f] hover:text-white transition-colors duration-300">
                Apply Now
            </TksButton>
        </section>

      </main>

      <Footer />
    </div>
  );
};