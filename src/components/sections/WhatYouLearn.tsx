import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const WhatYouLearn = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;

    // Photos wipe from top to bottom (like in WhatIsTks)
    const images = gsap.utils.toArray<HTMLElement>(".wyl-image-reveal");
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
          }
        }
      );
      
      const innerImg = img.querySelector("img");
      if (innerImg) {
        gsap.fromTo(innerImg, { scale: 1.1 }, {
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
             trigger: img,
             start: "top 85%",
          }
        });
      }
    });

    // Headline split text flying up line by line
    const headlineLines = gsap.utils.toArray<HTMLElement>(".wyl-headline-line span");
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
          trigger: ".wyl-headline-container",
          start: "top 80%",
        }
      }
    );

    // Paragraph fade in
    const paragraphs = gsap.utils.toArray<HTMLElement>(".wyl-paragraph");
    paragraphs.forEach(p => {
      gsap.fromTo(p, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#f2f2f2] text-black w-full min-h-screen pt-32 pb-40 px-6 md:px-12 flex flex-col relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 max-w-[1800px] mx-auto w-full">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col pt-2">
          <div className="flex items-start gap-3 mb-32">
            <div className="w-[6px] h-[6px] bg-black mt-1.5 shrink-0"></div>
            <h2 className="text-xs font-bold tracking-widest uppercase leading-snug w-[180px]">YOUR PATH TO MASTERY</h2>
          </div>
          
          <div className="mt-auto flex flex-col gap-12">
            <p className="wyl-paragraph text-xl font-medium leading-relaxed max-w-md text-gray-800">
              Absorb advanced soft skills like persuasive communication, logical debugging, and strategic framing, while constructing tangible solutions using forefront fields like quantum computing and genomics.
            </p>
            
            <div className="w-full relative overflow-hidden rounded-[2px] wyl-image-reveal">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Students discussing" 
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 flex flex-col">
          <h1 className="wyl-headline-container text-4xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] mb-12 flex flex-col">
            <span className="wyl-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">You'll build mindsets like</span></span>
            <span className="wyl-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">self-agency, boss mentality, and</span></span>
            <span className="wyl-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">systems thinking.</span></span>
          </h1>
          
          <p className="wyl-paragraph text-xl font-medium leading-relaxed max-w-lg text-gray-600 mb-16">
            TIF students train mindsets and build mental models to solve complex problems and create real impact.
          </p>

          <div className="w-full relative overflow-hidden rounded-[2px] flex-1 min-h-[500px] wyl-image-reveal">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000" 
              alt="Group of students" 
              className="w-full object-cover min-h-[600px] h-full absolute inset-0"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};
