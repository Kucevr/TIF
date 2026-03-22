import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { cn } from "../lib/utils";
import { TksButton } from "../components/ui/TksButton";

gsap.registerPlugin(ScrollTrigger);

const SplitChars = ({ text, className, id }: { text: string; className?: string; id: string }) => {
  return (
    <div className={cn("perspective-[1000px] flex items-center justify-center font-medium", className)} style={{ transformStyle: 'preserve-3d' }}>
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className={`char-${id} inline-block leading-none`}
          style={{ 
            backfaceVisibility: "hidden",
            transformOrigin: "50% 50% -8vw",
            transform: id === "1" ? "rotateX(0deg)" : "rotateX(-90deg)"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

const TOOLS = ["Zoom", "Slack", "Figma", "Notion", "GitHub", "Miro"];
const REGIONS = [
  { name: "Americas", desc: "PST / EST Timezones" },
  { name: "EMEA", desc: "GMT / CET Timezones" },
  { name: "APAC", desc: "IST / SGT Timezones" }
];

const PixelArrowTopRight = ({ className }: { className?: string }) => {
  const pixels = [
    {x:0, y:6}, {x:1, y:5}, {x:2, y:4}, {x:3, y:3}, {x:4, y:2}, {x:5, y:1}, {x:6, y:0},
    {x:2, y:0}, {x:3, y:0}, {x:4, y:0}, {x:5, y:0},
    {x:6, y:1}, {x:6, y:2}, {x:6, y:3}, {x:6, y:4}
  ];
  return (
    <svg viewBox="0 0 7 7" className={cn("w-[24px] h-[24px] fill-current", className)} aria-hidden="true">
      {pixels.map((p, i) => (
        <rect 
          key={i} 
          x={p.x} 
          y={p.y} 
          width="1" 
          height="1" 
          className="transition-colors duration-[100ms] ease-linear" 
          style={{ transitionDelay: `${i * 30}ms` }} 
        />
      ))}
    </svg>
  );
};

export const Virtual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // digital text reveal
    gsap.fromTo(".virt-digital",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }
    );

    // bento boxes fade up
    gsap.fromTo(".bento-box",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: ".bento-container", start: "top 80%" } }
    );

    if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
           xPercent: -50,
           repeat: -1,
           duration: 15,
           ease: "none"
        });
    }

    // PINNED 3D TEXT TIMELINE
    if (pinSectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=300%", 
          scrub: 1, 
          pin: true,
        }
      });

      // 1. Убираем первую фразу 
      tl.to(".char-1", { rotateX: 90, stagger: 0.05, duration: 1, ease: "none" }, 0);
      // 2. Показываем вторую фразу 
      tl.to(".char-2", { rotateX: 0, stagger: 0.05, duration: 1, ease: "none" }, 0.5);
      // 3. Убираем вторую фразу
      tl.to(".char-2", { rotateX: 90, stagger: 0.05, duration: 1, ease: "none" }, 2);
      // 4. Показываем третью фразу
      tl.to(".char-3", { rotateX: 0, stagger: 0.05, duration: 1, ease: "none" }, 2.5);
    }

    // Scroll Header Reveals
    const headerLines = gsap.utils.toArray<HTMLElement>(".virt-header-line");
    headerLines.forEach(line => {
      gsap.fromTo(line,
        { y: 100, rotation: 3, opacity: 0 },
        { 
          y: 0, 
          rotation: 0, 
          opacity: 1, 
          duration: 0.9, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: line.closest(".virt-header-trigger"),
            start: "top 85%"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <Navbar />
      
      <main className="pt-40 pb-0 overflow-hidden">
        {/* HERO */}
        <section className="px-4 md:px-8 max-w-[1400px] mx-auto text-center mb-32 flex flex-col items-center">
            <div className="text-[#48a65f] text-sm uppercase tracking-widest mb-6 virt-digital">Virtual Program</div>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter leading-none mb-8 virt-digital">
               Access <span className="text-white/50">from</span><br/>Anywhere.
            </h1>
            <p className="max-w-xl text-lg text-white/60 virt-digital mb-12">
               Our proprietary digital campus connects the most ambitious minds globally. No borders, no limits, just pure acceleration.
            </p>
            <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden virt-digital relative group">
                <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" alt="digital world" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                    <TksButton onClick={() => navigate("/contact")}>Join Now</TksButton>
                </div>
            </div>
        </section>

        {/* PINNED 3D TEXT SECTION (Copied from BuiltDifferent concept) */}
        <section ref={pinSectionRef} className="relative w-full h-screen bg-[#0a0a0a] text-white z-10 overflow-hidden border-y border-white/10">
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 text-sm font-semibold tracking-tight text-white/50 uppercase">
              (Our Philosophy)
            </div>

            <div className="relative flex items-center justify-center w-full h-full text-[9vw] sm:text-7xl md:text-[8vw] tracking-tighter">
              <div className="absolute top-1/2 left-1/2 w-full max-w-[100vw] -translate-x-1/2 -translate-y-1/2 flex justify-center flex-wrap">
                <SplitChars id="1" text="Code from anywhere" className="flex-wrap text-white" />
              </div>
              <div className="absolute top-1/2 left-1/2 w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex justify-center flex-wrap">
                <SplitChars id="2" text="Collaborate globally" className="flex-wrap text-[#48a65f]" />
              </div>
              <div className="absolute top-1/2 left-1/2 w-full max-w-[100vw] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-6 flex-wrap">
                <SplitChars id="3" text="Impact reality" className="z-10 flex-wrap text-white" />
              </div>
            </div>

            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 pointer-events-none" />
          </div>
        </section>

        {/* MARQUEE TOOLS */}
        <section className="py-12 mb-32 overflow-hidden bg-[#0a0a0a] virt-digital">
            <div className="w-[200vw] flex">
                <div ref={marqueeRef} className="flex whitespace-nowrap text-3xl md:text-5xl font-medium tracking-tight text-white/20">
                    {Array(4).fill(TOOLS).flat().map((t, i) => (
                        <span key={i} className="px-12 flex items-center gap-6 hover:text-white transition-colors duration-300">
                            <span className="w-3 h-3 rounded-full bg-[#48a65f]" /> {t}
                        </span>
                    ))}
                </div>
            </div>
        </section>

        {/* BENTO GRID */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 mb-40 bento-container virt-header-trigger">
            <div className="mb-20">
               <h2 className="text-5xl md:text-7xl font-medium tracking-tighter w-full lg:w-2/3">
                 <span className="block overflow-hidden pb-2"><span className="block virt-header-line origin-bottom-left">Building the supreme</span></span>
                 <span className="block overflow-hidden pb-2"><span className="block virt-header-line origin-bottom-left">digital habitat.</span></span>
               </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                <div className="bento-box md:col-span-2 bg-[#141414] rounded-3xl p-8 md:p-12 border border-white/5 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors">
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" alt="collaborating" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent opacity-90" />
                    <div className="relative z-10">
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-end">
                      <div className="mb-auto text-[#48a65f] font-mono text-xl">01/</div>
                        <h3 className="text-4xl md:text-5xl font-medium mb-4">Live Sync Sessions</h3>
                        <p className="text-white/60 text-xl max-w-md">Real-time ideation, aggressive debates, and tight feedback loops with founders.</p>
                    </div>
                </div>

                <div className="bento-box bg-[#141414] rounded-3xl p-8 md:p-12 border border-white/5 flex flex-col justify-between group overflow-hidden relative hover:border-white/10 transition-colors">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#48a65f] opacity-20 blur-[80px] rounded-full group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="relative z-10 h-full flex flex-col justify-end">
                        <div className="mb-auto text-[#48a65f] font-mono text-xl">02/</div>
                        <h3 className="text-3xl md:text-4xl font-medium mb-3">Global Network</h3>
                        <p className="text-white/60 text-lg">Connect with ambitious peers across 80+ countries instantly.</p>
                    </div>
                </div>

                <div className="bento-box bg-[#141414] rounded-3xl p-8 md:p-12 border border-white/5 flex flex-col justify-between group overflow-hidden relative hover:border-white/10 transition-colors">
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#48a65f] opacity-20 blur-[80px] rounded-full group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="relative z-10 h-full flex flex-col justify-end">
                        <div className="mb-auto text-[#48a65f] font-mono text-xl">03/</div>
                        <h3 className="text-3xl md:text-4xl font-medium mb-3">Asynchronous</h3>
                        <p className="text-white/60 text-lg">Deep work blocks and recorded archives tailored to your personal timezone layout.</p>
                    </div>
                </div>

                <div className="bento-box md:col-span-2 bg-[#141414] rounded-3xl p-8 md:p-12 border border-white/5 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-[#141414]/20 opacity-100" />
                    <div className="relative z-10 h-full flex flex-col justify-end max-w-xl">
                      <div className="mb-auto text-[#48a65f] font-mono text-xl">04/</div>
                        <h3 className="text-4xl md:text-5xl font-medium mb-4">Proprietary Space</h3>
                        <p className="text-white/60 text-xl leading-relaxed">We built our own custom digital habitat specifically designed for extreme acceleration, resource sharing, and seamless peer-to-peer collaboration.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* TIMEZONES */}
        <section className="bg-[#f2f2f2] text-black py-32 md:py-48 px-4 md:px-8 rounded-t-[3rem] virt-header-trigger">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-16">
                <div className="lg:w-1/2 sticky top-40">
                    <div className="w-16 h-1 bg-black mb-10" />
                    <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] mb-8">
                       <span className="block overflow-hidden pb-1"><span className="block virt-header-line origin-bottom-left">Optimized for</span></span>
                       <span className="block overflow-hidden pb-1"><span className="block virt-header-line origin-bottom-left">your location.</span></span>
                    </h2>
                    <p className="text-gray-500 text-2xl font-medium max-w-md leading-relaxed virt-header-line">
                       Don't sacrifice your sleep. Find a cohort perfectly aligned with your local region and time flexibility.
                    </p>
                </div>
                
                <div className="flex flex-col gap-8 w-full lg:w-1/2 pt-10">
                    {REGIONS.map((r, i) => (
                        <div key={i} className="border-b border-black/10 pb-8 flex flex-col gap-4 bento-box cursor-pointer group" onClick={() => navigate("/contact")}>
                            <span className="text-sm font-bold text-[#48a65f] uppercase tracking-widest">{r.desc}</span>
                            <div className="flex justify-between items-end">
                                <h4 className="text-5xl md:text-6xl font-medium tracking-tight mb-2 group-hover:text-[#48a65f] transition-colors">{r.name}</h4>
                                <div className="w-16 h-16 rounded-md border border-black/20 flex items-center justify-center group-hover:bg-[#48a65f] group-hover:border-[#48a65f] transition-all duration-300">
                                    <PixelArrowTopRight className="text-black group-hover:text-white w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* BIG VIRTUAL CTA */}
                    <div className="mt-20 w-full bento-box flex justify-center lg:justify-start">
                        <TksButton onClick={() => navigate("/contact")} className="h-16 px-10 text-xl">
                            Apply to Virtual
                        </TksButton>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};