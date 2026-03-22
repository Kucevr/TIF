import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";


gsap.registerPlugin(ScrollTrigger);

const CITIES = [
  { 
    name: "New York", 
    role: "US East Hub",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    name: "San Francisco", 
    role: "US West Hub",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    name: "Toronto", 
    role: "Canada East Hub",
    img: "https://images.unsplash.com/photo-1513628253939-010e64ac66cd?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    name: "Vancouver", 
    role: "Canada West Hub",
    img: "https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    name: "Dubai", 
    role: "MENA Hub",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    name: "Calgary", 
    role: "Innovation Hub",
    img: "https://images.unsplash.com/photo-1579893976695-18237ba51de5?q=80&w=1200&auto=format&fit=crop" 
  },
];

const FEATURES = [
  {
    title: "Deep Collaboration",
    desc: "Work side-by-side with other ambitious builders. Bounce ideas, debug code, and form lifelong friendships.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Direct Mentorship",
    desc: "Get unvarnished feedback from industry veterans and tech founders sitting right across the table.",
    img: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Live Showcases",
    desc: "Pitch your prototypes on stage, defend your theses, and build immense confidence in public speaking.",
    img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop"
  }
];

export const InPerson = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Hero text reveal
    const heroLines = gsap.utils.toArray<HTMLElement>(".in-hero-line");
    gsap.fromTo(heroLines,
      { y: 100, rotation: 3, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      }
    );

    // Fade-ins for hero intro
    gsap.fromTo(".in-hero-fade",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.3
      }
    );

    // 2. Parallax Image
    gsap.fromTo(".in-parallax-img",
      { yPercent: -15, scale: 1.1 },
      {
        yPercent: 15,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".in-parallax-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // 3. Grid elements fade up
    const gridItems = gsap.utils.toArray<HTMLElement>(".in-fade-up");
    gridItems.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });

    // 4. Marquee animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none"
      });
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f2f2f2] font-sans">
      <Navbar />
      
      <main className="pt-32 pb-0 overflow-hidden">
        {/* --- HERO SECTION --- */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 mb-20 flex flex-col lg:flex-row justify-between lg:items-end gap-12 mt-10">
          <div className="flex flex-col gap-4">
             <div className="text-xs font-medium uppercase tracking-widest text-black/60 mb-2 in-hero-fade">
               <Link to="/" className="hover:text-black transition-colors">Home</Link> / <span className="text-black">In-Person</span>
             </div>
             
             <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tight leading-[1] text-black">
                <span className="block overflow-hidden"><span className="block in-hero-line origin-bottom-left">The power of being</span></span>
                <span className="block overflow-hidden"><span className="block in-hero-line origin-bottom-left">in the same room.</span></span>
             </h1>
          </div>
          
          <div className="max-w-[420px] in-hero-fade">
             <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
               Join ambitious peers for weekly deep-dive sessions at one of our global hubs. Collaborate, prototype, and build the future together face-to-face.
             </p>
          </div>
        </section>

        {/* --- HUGE PARALLAX IMAGE --- */}
        <section className="in-parallax-container w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden relative mb-32">
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2600&auto=format&fit=crop"
            alt="Students collaborating" 
            className="in-parallax-img w-full h-full object-cover absolute top-0 left-0"
          />
        </section>

        {/* --- THE VIBE / WHAT HAPPENS --- */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 mb-24">
          <div className="flex flex-col lg:flex-row justify-between mb-20 gap-8">
            <div className="text-[10px] font-bold tracking-widest text-black flex items-start gap-2 uppercase in-fade-up">
              <div className="w-1.5 h-1.5 bg-black mt-1" /> 
              <div className="leading-tight">THE TIF<br/>EXPERIENCE</div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-black lg:w-2/3 in-fade-up">
              More than a classroom. We are an incubator for the next generation of builders.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feat, i) => (
              <div key={i} className="flex flex-col group in-fade-up">
                <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden mb-6 rounded-[2px]">
                  <img 
                    src={feat.img} 
                    alt={feat.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-black">{feat.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed max-w-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- LOCATIONS GRID --- */}
        <section className="bg-black text-white py-32 px-4 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
               <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-none in-fade-up">
                 Find a hub<br/>near you.
               </h2>
               <p className="text-white/70 max-w-sm text-sm font-medium in-fade-up">
                 We host weekly sessions in world-leading cities. Can't find yours? Check out our Virtual program.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CITIES.map((city, i) => (
                <div 
                  key={i} 
                  className="relative group aspect-[4/5] overflow-hidden bg-gray-900 rounded-[2px] cursor-pointer in-fade-up"
                  onClick={() => navigate("/contact")}
                >
                  <img 
                    src={city.img} 
                    alt={city.name} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-[#48a65f] uppercase mb-2">
                        {city.role}
                      </div>
                      <h3 className="text-3xl font-medium tracking-tight text-white">
                        {city.name}
                      </h3>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <svg width="12" height="12" viewBox="0 0 12 12" className="fill-none stroke-current" strokeWidth="1.5">
                        <path d="M1 11L11 1m0 0H1m10 0v10" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MARQUEE CTA --- */}
        <section 
           className="relative w-full bg-[#f2f2f2] text-black py-32 overflow-hidden cursor-pointer"
           onClick={() => navigate("/contact")}
        >
          <div className="relative z-10 w-[200vw] flex overflow-hidden">
            <div ref={marqueeRef} className="flex whitespace-nowrap text-[6rem] md:text-[12rem] font-medium leading-none tracking-tighter">
              {Array(8).fill("■ Apply Now ").map((text, i) => (
                <span key={i} className="px-8 hover:text-[#48a65f] transition-colors">{text}</span>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
