import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TksButton } from "../ui/TksButton";
import { cn } from "../../lib/utils";

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

const CARDS = [
  {
    id: 1,
    title: "Innovator in clean energy and robotics.",
    quote: '"My time here ignited a passion for prototyping that I carry into my daily work. The hands-on exposure accelerated my career choices immensely and opened doors to incredible resources."',
    logoText: "ROBOTECH",
    company: "RoboTech",
    name: "Alex V.",
    year: "TIF 2021",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Deep learning enthusiast and developer.",
    quote: '"The rapid advancement I found in these short months reshaped my entire perspective. It’s a remarkable environment for ambitious minds."',
    logoText: "NEXUS AI",
    company: "Nexus AI",
    name: "Sam L.",
    year: "TIF 2022",
    img: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Systems Architect in software infrastructure.",
    quote: '"I was uncertain about my path before joining. Now, I confidently design networks impacting massive global audiences daily."',
    logoText: "CLOUDNET",
    company: "CloudNet",
    name: "Elena R.",
    year: "TIF 2023",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
  }
];

export const RealSolutions = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  // Animations
  useGSAP(() => {
    if (!containerRef.current) return;

    // PIN THE PREVIOUS SECTION
    const prevSection = containerRef.current.previousElementSibling as HTMLElement | null;
    if (prevSection) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "top top",
        pin: prevSection,
        pinSpacing: false,
      });
    }

    const headlineLines = gsap.utils.toArray<HTMLElement>(".rs-headline span span");
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
          trigger: ".rs-headline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    gsap.fromTo(".rs-fade", 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".rs-headline",
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: containerRef });

  const getInactiveWidth = () => {
    const vw = window.innerWidth;
    if (vw < 768) return vw * 0.75;
    if (vw < 1024) return vw * 0.50;
    if (vw < 1280) return vw * 0.45;
    return 700; // XL inactive width
  };

  const goToSlide = (idx: number) => {
    const inactiveW = getInactiveWidth();
    const padding = 24; // gap-6 = 24px
    
    // We only care about the items perfectly to the left
    // which are all INACTIVE length.
    setCurrentSlide(idx);
    setTranslateX(-(idx * (inactiveW + padding)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setStartX(e.clientX - translateX);
    if (trackRef.current) {
       trackRef.current.style.transition = 'none';
       trackRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - startX;
    setTranslateX(newX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (trackRef.current) {
       trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    const inactiveW = getInactiveWidth();
    const padding = 24;
    const threshold = inactiveW * 0.15;
    const baseTranslate = -(currentSlide * (inactiveW + padding));
    const diff = translateX - baseTranslate;
    
    if (diff < -threshold && currentSlide < CARDS.length - 1) {
      goToSlide(currentSlide + 1);
    } else if (diff > threshold && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    } else {
      setTranslateX(baseTranslate);
    }
  };

  useEffect(() => {
    goToSlide(currentSlide);
    
    const handleResize = () => goToSlide(currentSlide);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide]);

  return (
    <section id="projects" ref={containerRef} className="bg-[#f0f0f0] text-black w-full py-32 overflow-hidden relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1800px] mx-auto w-full px-6 md:px-12 flex flex-col pt-12">
        
        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24 items-start">
          <div className="lg:col-span-4 flex items-start gap-3">
            <div className="w-[6px] h-[6px] bg-black mt-1.5 shrink-0"></div>
            <h2 className="text-xs font-bold tracking-widest uppercase leading-snug w-[200px]">
              TACKLE TRUE CHALLENGES
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col items-start gap-8">
            <h3 className="rs-headline text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight leading-[1.05] max-w-4xl flex flex-col">
              <span className="overflow-hidden pb-1"><span className="inline-block origin-bottom-left">TIF participants transcend theory,</span></span>
              <span className="overflow-hidden pb-1"><span className="inline-block origin-bottom-left">engineering functional prototypes</span></span>
              <span className="overflow-hidden pb-1"><span className="inline-block origin-bottom-left">alongside leading organizations.</span></span>
            </h3>
            
            <p className="rs-fade text-lg md:text-xl font-medium leading-relaxed text-gray-600 max-w-2xl text-left">
              In record time, members design intelligent drones, experiment with next-gen biofuels, or craft predictive algorithms for complex data models—often starting entirely from scratch.
            </p>

            <div className="rs-fade mt-4">
              <TksButton>See What TIF Alumni Are Building</TksButton>
            </div>
          </div>
        </div>

        <div className="rs-carousel w-full relative mt-12 cursor-grab active:cursor-grabbing">          
          <div 
            ref={trackRef}
            className="flex gap-2 w-max"
            style={{ 
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' 
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {CARDS.map((card, idx) => {
               const isActive = idx === currentSlide;
               const isNextCards = idx > currentSlide;

               return (
                 <div 
                    key={card.id} 
                    className={cn(
                      "bg-white h-[65vh] min-h-[500px] max-h-[700px] flex flex-col md:flex-row shadow-sm rounded-sm shrink-0 relative select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      // Active: Wider, fully visible
                      isActive ? "w-[90vw] md:w-[70vw] lg:w-[65vw] xl:w-[1000px] scale-100 opacity-100 blur-none pointer-events-auto" : "w-[75vw] md:w-[50vw] lg:w-[45vw] xl:w-[700px] pointer-events-none",
                      // Next/Upcoming: Slightly smaller, blurred, overlapping effect
                      !isActive && isNextCards ? "scale-[0.85] opacity-60 blur-[4px]" : "",
                      // Past cards
                      !isActive && !isNextCards ? "scale-[0.85] opacity-0 blur-[4px]" : ""
                    )}
                 >
                   {/* Left Half */}
                   <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                      <span className="font-bold text-xl md:text-2xl mb-8 border-b-2 border-transparent w-max inline-block tabular-nums">
                        0{idx + 1}<span className="text-gray-400 text-sm">/12</span>
                      </span>

                      <h4 className={cn("text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] mb-6", idx === 0 && isActive ? 'first-card-title' : '')}>
                        {idx === 0 ? (
                          <>
                            <span className="overflow-hidden block pb-1"><span className="inline-block">SpaceX engineer and</span></span>
                            <span className="overflow-hidden block pb-1"><span className="inline-block">founder of Faura.</span></span>
                          </>
                        ) : card.title}
                      </h4>

                      <p className="text-gray-600 font-medium text-base leading-relaxed mb-auto max-w-sm">
                        {card.quote}
                      </p>

                      <div className="mt-8">
                        <div className="font-bold text-lg tracking-widest text-[#005288] uppercase mb-4">
                          {card.logoText}
                        </div>
                        <div className="text-xs font-bold text-gray-400 tracking-wider">
                          {card.year}
                        </div>
                      </div>
                   </div>

                   {/* Right Half */}
                   <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-between">
                      <div className="w-full h-[calc(100%-80px)] relative overflow-hidden rounded-[2px]">
                        <img src={card.img} alt={card.name} className="w-full h-full object-cover" draggable={false} />
                      </div>
                      <div className="w-full flex justify-between items-center mt-4 px-2">
                        <span className="text-xl font-medium tracking-tight pointer-events-auto select-auto">{card.name}</span>
                        
                        <div className="flex gap-3 pointer-events-auto select-auto">
                          <button 
                            onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); if (currentSlide > 0) goToSlide(currentSlide - 1); }}
                            className={cn(
                              "w-12 h-12 flex items-center justify-center rounded transition-all group duration-300",
                              currentSlide > 0 ? "bg-[#48a65f] hover:bg-[#3d8c50] shadow-md hover:shadow-lg text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            )}
                          >
                            <PixelArrowIcon direction="left" />
                          </button>
                          <button 
                           onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); if (currentSlide < CARDS.length - 1) goToSlide(currentSlide + 1); }}
                            className={cn(
                              "w-12 h-12 flex items-center justify-center rounded transition-all group duration-300",
                              currentSlide < CARDS.length - 1 ? "bg-[#48a65f] hover:bg-[#3d8c50] shadow-md hover:shadow-lg text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            )}
                          >
                            <PixelArrowIcon direction="right" />
                          </button>
                        </div>
                      </div>
                   </div>
                 </div>
               );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
};
