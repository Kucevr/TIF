import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TksButton } from "../ui/TksButton";

gsap.registerPlugin(ScrollTrigger);

export const FinancialAid = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;

    // Headline split text flying up line by line
    const headlineLines = gsap.utils.toArray<HTMLElement>(".fa-headline-line span");
    gsap.fromTo(headlineLines, 
      { y: 100, rotation: 3, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fa-headline-container",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Photos wipe from top to bottom
    const images = gsap.utils.toArray<HTMLElement>(".fa-image-reveal");
    images.forEach(img => {
      gsap.fromTo(img, 
        { clipPath: "inset(0 0 100% 0)" },
        { 
          clipPath: "inset(0 0 0% 0)", 
          duration: 1.2, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
      // internal scale down
      const innerImg = img.querySelector("img");
      if (innerImg) {
        gsap.fromTo(innerImg, { scale: 1.1 }, {
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
             trigger: img,
             start: "top 85%",
             toggleActions: "play none none reverse"
          }
        });
      }
    });

    // Paragraph fade in
    gsap.fromTo(".fa-paragraph", 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1,
        scrollTrigger: {
          trigger: ".fa-paragraph",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section id="financial-aid" ref={containerRef} className="bg-[#f2f2f2] text-black w-full min-h-[90vh] py-32 px-6 md:px-12 flex flex-col relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 max-w-[1800px] mx-auto w-full">
        
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-start gap-3 mb-24 lg:mb-32">
            <div className="w-[6px] h-[6px] bg-black mt-1.5 shrink-0"></div>
            <h2 className="text-xs font-bold tracking-widest uppercase leading-snug w-[200px]">EQUITABLE ENTRY FOR ALL</h2>
          </div>
          
          <div className="w-full h-full relative overflow-hidden rounded-[2px] fa-image-reveal min-h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
              alt="Students collaborating" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-6 flex flex-col pt-2 md:pt-12">
          
          <h1 className="fa-headline-container text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight leading-[1.05] mb-12 flex flex-col">
            <span className="fa-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">We offer financial aid, supported by</span></span>
            <span className="fa-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">companies like Interac, BenchSci,</span></span>
            <span className="fa-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">Masason Foundation, and Shell, to ensure</span></span>
            <span className="fa-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">access for students.</span></span>
          </h1>
          
          <p className="fa-paragraph text-lg font-medium leading-relaxed max-w-sm text-gray-800 mb-10">
            Many of our students attend TIF with financial support. If you're accepted into TIF, we'll help you find a way to join.
          </p>

          <div className="fa-paragraph mb-24">
             <TksButton>Learn more about Financial Aid</TksButton>
          </div>
          
          {/* Small bottom right image */}
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[400px] ml-auto relative overflow-hidden rounded-[2px] mt-auto fa-image-reveal h-[250px]">
             <img 
               src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
               alt="Panel discussion" 
               className="w-full h-full object-cover absolute inset-0"
             />
          </div>

        </div>
      </div>
    </section>
  );
};
