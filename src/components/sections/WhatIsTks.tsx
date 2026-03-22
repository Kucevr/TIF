import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const WhatIsTks = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Photos wipe from top to bottom
    const images = gsap.utils.toArray<HTMLElement>(".tif-image-reveal");
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
      // slight internal scale down of the image itself for parallax reveal
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

    // 2. Headline split text flying up line by line
    const headlineLines = gsap.utils.toArray<HTMLElement>(".tif-headline-line span");
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
          trigger: ".tif-headline-container",
          start: "top 80%",
        }
      }
    );

    // 3. Brands stagger in one by one
    const brands = gsap.utils.toArray<HTMLElement>(".brand-logo");
    gsap.fromTo(brands,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tif-brands-container",
          start: "top 90%",
        }
      }
    );
    
    // Paragraph fade in
    gsap.fromTo(".tif-paragraph", 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
          trigger: ".tif-paragraph",
          start: "top 85%"
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="bg-[#f2f2f2] text-black w-full min-h-screen pt-32 pb-40 px-6 md:px-12 flex flex-col relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 max-w-[1800px] mx-auto w-full">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-[6px] h-[6px] bg-black"></div>
            <h2 className="text-xs font-bold tracking-widest uppercase">WHAT IS TIF?</h2>
          </div>
          
          <div className="w-full mb-8 overflow-hidden rounded-[2px] tif-image-reveal">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" 
              alt="Students working" 
              className="w-full h-auto object-cover max-h-[350px]"
            />
          </div>
          
          <p className="tif-paragraph text-lg md:text-xl font-medium leading-relaxed max-w-md text-gray-800">
            TIF is where driven young minds come to leapfrog ordinary education. From collaborating on real-world solutions with top tech leaders to deeply exploring AI, biotech, and advanced engineering. Our students don't just study the future—they actively design it.
          </p>
          
          <div className="mt-20 tif-brands-container">
            <h3 className="text-[10px] font-bold tracking-wider uppercase mb-8 text-black opacity-60">ACCESS TO MENTORS AND ALUMNI FROM</h3>
            <div className="grid grid-cols-3 gap-y-8 gap-x-4 items-center">
              <span className="brand-logo font-bold text-xl tracking-tight" style={{ color: '#4285F4' }}>Google</span>
              <span className="brand-logo font-semibold text-lg flex items-center gap-1">
                <span className="grid grid-cols-2 gap-[2px] w-4 h-4">
                  <span className="bg-[#F25022]"></span><span className="bg-[#7FBA00]"></span>
                  <span className="bg-[#00A4EF]"></span><span className="bg-[#FFB900]"></span>
                </span>
                Microsoft
              </span>
              <span className="brand-logo font-bold text-lg tracking-widest uppercase">SPACEX</span>
              <span className="brand-logo font-bold text-xl text-[#95bf47]">shopify</span>
              <span className="brand-logo font-bold text-xl flex items-center gap-1">
                <div className="w-5 h-5 rounded-full border-[3px] border-black flex items-center justify-center p-[2px]">
                  <div className="w-full h-full bg-black rounded-full" />
                </div>
                OpenAI
              </span>
              <span className="brand-logo font-medium text-sm leading-tight flex items-center gap-1 text-[#005bbb]">
                <div className="w-6 h-6 rounded-full bg-[#005bbb] text-white flex items-center justify-center text-[8px]">UN</div>
                United<br/>Nations
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 flex flex-col pt-12">
          
          {/* Manually split text to achieve line-by-line reveal */}
          <h1 className="tif-headline-container text-4xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] mb-24 flex flex-col">
            <span className="tif-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">TIF is an immersive global</span></span>
            <span className="tif-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">innovation academy for</span></span>
            <span className="tif-headline-line overflow-hidden pb-1"><span className="inline-block origin-bottom-left">forward-thinking youth.</span></span>
          </h1>
          
          <div className="w-full relative overflow-hidden rounded-[2px] flex-1 min-h-[500px] tif-image-reveal">
            <img 
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=2000" 
              alt="Presentation" 
              className="w-full object-cover min-h-[600px] h-full absolute inset-0"
            />
           
          </div>
        </div>
      </div>
    </section>
  );
};