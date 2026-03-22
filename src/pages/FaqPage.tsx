import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "../components/layout/Navbar";
import { Programs } from "../components/sections/Programs";
import { Footer } from "../components/layout/Footer";
import { FaqItem } from "../components/ui/FaqItem";
import { cn } from "../lib/utils";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PixelArrowIcon = ({ className, direction = "right" }: { className?: string, direction?: "left" | "right" }) => {
  const pixels = [
    { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
    { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
    { x: 5, y: 2 }, { x: 4, y: 1 },
    { x: 5, y: 4 }, { x: 4, y: 5 },
  ];
  return (
    <svg 
      viewBox="0 0 7 7" 
      className={cn("w-[14px] h-[14px] fill-current", className)} 
      style={{ transform: direction === "left" ? "rotate(180deg)" : "none" }} 
      aria-hidden="true"
    >
      {pixels.map((p, i) => (
        <rect 
          key={i} 
          x={p.x} 
          y={p.y} 
          width="1" 
          height="1" 
          className="transition-opacity duration-[200ms] ease-linear group-hover:opacity-30"
          style={{ transitionDelay: `${(i % 5) * 40}ms` }} 
        />
      ))}
    </svg>
  );
};

const VIDEOS = [
  { img: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80&w=800", name: "Ali Amin", company: "Apple" },
  { img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800", name: "Alisha Giglio", company: "SINAI" },
  { img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800", name: "Ben Watters", company: "Hopper" },
  { img: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=800", name: "Danish Ajmeri", company: "Wealthsimple" },
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", name: "Jenna Smith", company: "Google" },
];

export const FaqPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, VIDEOS.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (trackRef.current) {
       const itemWidth = 320; 
       const padding = 24;
       gsap.to(trackRef.current, {
           x: -(currentSlide * (itemWidth + padding)),
           duration: 0.6,
           ease: "power3.out"
       });
    }
  }, [currentSlide]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Headline splits
    const headlineLines1 = gsap.utils.toArray<HTMLElement>(".fq-headline-1");
    
    gsap.fromTo(headlineLines1, 
      { y: 100, rotation: 3, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fq-top",
          start: "top 80%",
        }
      }
    );

    const headlineLines2 = gsap.utils.toArray<HTMLElement>(".fq-headline-2");
    gsap.fromTo(headlineLines2,
      { y: 100, rotation: 3, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fq-accordion-wrapper",
          start: "top 80%",
        }
      }
    );

    const headlineLines3 = gsap.utils.toArray<HTMLElement>(".fq-headline-3");
    gsap.fromTo(headlineLines3,
      { y: 100, rotation: 3, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fq-headline-3-trigger",
      }
    }
    );

    // Parallax Photo
    gsap.fromTo(".fq-photo img",
      { yPercent: -15, scale: 1.1 },
      {
        yPercent: 15,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".fq-photo",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // FAQ Items Fade in as in WhatIsTks
    const elements = gsap.utils.toArray<HTMLElement>(".fq-fade-up");
    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fq-accordion-wrapper",
          start: "top 85%"
        }
      }
    );

    const topElements = gsap.utils.toArray<HTMLElement>(".fq-top-fade-up");
    gsap.fromTo(topElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fq-top",
          start: "top 85%"
        }
      }
    );

    const faqItems = gsap.utils.toArray<HTMLElement>(".fq-item-fade");
    gsap.fromTo(faqItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fq-accordion-wrapper",
          start: "top 75%"
        }
      }
    );

    // Marquee animation
    if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 30,
          ease: "none"
        });
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f2f2f2] font-sans">
      <Navbar />
      
      <main className="pt-32 pb-0 overflow-hidden">
        
        {/* Top Header Section */}
        <section className="fq-top max-w-[1400px] mx-auto px-4 md:px-8 mb-16 flex flex-col lg:flex-row justify-between lg:items-end gap-12 mt-10">
          <div className="flex flex-col gap-4">
             <div className="text-xs font-medium uppercase tracking-widest text-black/60 mb-2">
               <Link to="/" className="hover:text-black transition-colors">Home</Link> / <span className="text-black">FAQ</span>
             </div>
             <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tight leading-[1] text-black">
                <span className="block overflow-hidden"><span className="block fq-headline-1 origin-bottom-left">Questions?</span></span>
                <span className="block overflow-hidden"><span className="block fq-headline-1 origin-bottom-left">We've got answers.</span></span>
             </h1>
          </div>
          <div className="max-w-[400px]">
             <p className="fq-top-fade-up text-sm md:text-base text-gray-700 font-medium">
               Whether you're curious about the curriculum, time commitment, or how TIF helps with university - start here.
             </p>
          </div>
        </section>

        {/* Parallax Image */}
        <section className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden fq-photo relative">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2600&auto=format&fit=crop" 
            alt="Students in classroom" 
            className="w-full h-full object-cover absolute top-0 left-0"
          />
        </section>

        {/* FAQ List Section */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-32 flex flex-col lg:flex-row gap-16 lg:gap-32 items-start justify-between">
          <div className="lg:w-1/3 pt-4 fq-accordion-wrapper">
             <div className="text-[10px] font-bold tracking-widest text-black mb-12 flex items-start gap-2 uppercase fq-fade-up">
               <div className="w-1.5 h-1.5 bg-black mt-1" /> 
               <div className="leading-tight">PROGRAM<br/>INSIGHTS</div>
             </div>
             
             <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] text-black mb-8">
                <span className="block overflow-hidden"><span className="block fq-headline-2 origin-bottom-left">All your questions,</span></span>
                <span className="block overflow-hidden"><span className="block fq-headline-2 origin-bottom-left">answered here.</span></span>
             </h2>

             <p className="text-sm text-gray-700 font-medium max-w-sm fq-fade-up">
               Find clarity on our program structure, financial support, student experience, and the admissions process. If you have a question, chances are we've covered it below.
             </p>
          </div>
          
          <div className="flex-1 w-full flex flex-col border-t border-black/10">
            {[
              "Which cities have in-person TIF programs? If it's not in my city can I still participate?",
              "What's the time commitment?",
              "What topics can I study at TIF?",
              "What payment methods are available?",
              "What have alumni worked on after completing TIF?",
              "What happens in sessions?",
              "What does the application process look like?",
              "What are the eligibility requirements to apply for TIF?",
              "Is there financial aid available?",
              "What are we looking for in the interview?",
              "Do I need technical knowledge to join?",
              "Can TIF help me get into university?",
              "Is there a refund policy?",
              "How much does TIF cost?",
              "How long does the program run for?",
              "Do we look at students' grades as part of our assessment?"
            ].map((q, i) => (
              <div key={i} className="fq-fade-up">
                 <FaqItem index={i + 1} question={q} />
              </div>
            ))}
          </div>
        </section>

        {/* Marquee Section */}
        <section 
           className="relative w-full bg-white text-[#1a1a1a] py-24 overflow-hidden cursor-pointer"
           onClick={() => navigate("/contact")}
        >
          <div className="relative z-10 w-[200vw] flex overflow-hidden">
            <div ref={marqueeRef} className="flex whitespace-nowrap text-[6rem] md:text-[12rem] font-medium leading-none tracking-tighter">
              {Array(8).fill("■ Contact Us ").map((text, i) => (
                <span key={i} className="px-8 hover:text-[#52a663] transition-colors">{text}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Learn From The Best Section */}
        <section className="fq-headline-3-trigger bg-[#1a1a1a] text-white py-32 px-4 md:px-8 overflow-hidden">
          <div className="max-w-[1400px] mx-auto w-full">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
               
               <div className="text-[10px] font-bold tracking-widest mb-12 flex items-start gap-2 uppercase">
                 <div className="w-1.5 h-1.5 bg-white mt-1" /> 
                 <div className="leading-tight">LEARN<br/>FROM THE<br/>BEST</div>
               </div>

               <div className="lg:w-1/2">
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
                    <span className="block overflow-hidden"><span className="block fq-headline-3 origin-bottom-left">Insights and advice</span></span>
                    <span className="block overflow-hidden"><span className="block fq-headline-3 origin-bottom-left">from our global network</span></span>
                    <span className="block overflow-hidden"><span className="block fq-headline-3 origin-bottom-left">of industry experts.</span></span>
                 </h2>
               </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2 mb-12">
               <button 
                onClick={prevSlide}
                className="w-12 h-12 bg-[#333] hover:bg-[#52a663] text-white flex items-center justify-center rounded-[2px] transition-colors duration-300 group shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentSlide === 0}
               >
                 <PixelArrowIcon direction="left" />
               </button>
               <button 
                onClick={nextSlide}
                className="w-12 h-12 bg-[#333] hover:bg-[#52a663] text-white flex items-center justify-center rounded-[2px] transition-colors duration-300 group shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentSlide >= VIDEOS.length - 1}
               >
                 <PixelArrowIcon direction="right" />
               </button>
            </div>

            {/* Slider Track */}
            <div className="relative w-full">
               <div ref={trackRef} className="flex gap-6 w-max">
                  {VIDEOS.map((vid, idx) => (
                    <div key={idx} className="w-[300px] md:w-[320px] shrink-0 group">
                       <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-[#333] cursor-pointer">
                         <img src={vid.img} alt={vid.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] opacity-80 group-hover:opacity-100" />
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Play className="w-6 h-6 fill-white text-white ml-1" />
                            </div>
                         </div>
                       </div>
                       <div className="flex gap-2 text-sm font-medium">
                          <span>{vid.name},</span>
                          <span className="text-gray-400">{vid.company}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </section>
<Programs />
      </main>

      <Footer />
    </div>
  );
};
