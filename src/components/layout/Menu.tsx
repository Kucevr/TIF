import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "../../lib/utils";
import { AnimatedLink } from "../ui/AnimatedLink";
import { TksButton } from "../ui/TksButton";

interface MenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

const TABS = ["Programs", "Student Experience", "About TIF", "Follow us"] as const;
type Tab = typeof TABS[number];

const PixelArrowCard = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = wrapperRef.current?.parentElement;
    if (!parent || !wrapperRef.current) return;
    
    // Ensure parent context is preserved for measuring
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(wrapperRef.current, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out", overwrite: true });
    };
    
    const handleMouseLeave = () => {
      gsap.to(wrapperRef.current, { x: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: true });
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const pixels = [
    { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
    { x: 5, y: 4 }, { x: 5, y: 3 }, { x: 5, y: 2 }, { x: 5, y: 1 },
    { x: 4, y: 4 }, { x: 3, y: 3 }, { x: 2, y: 2 }, { x: 1, y: 1 }
  ];
  
  return (
    <div ref={wrapperRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center pointer-events-none z-20">
      <div className="w-10 h-10 bg-[#48a65f] rounded-[4px] flex items-center justify-center opacity-0 scale-50 transition-all duration-[400ms] group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
        <svg viewBox="0 0 7 7" className="w-[20px] h-[20px] fill-white" aria-hidden="true">
          {pixels.map((p, i) => (
            <rect 
              key={i} 
              x={p.x} 
              y={p.y} 
              width="1" 
              height="1" 
              className="opacity-0 transition-opacity duration-[100ms] group-hover:opacity-100" 
              style={{ transitionDelay: `${i * 20}ms` }} 
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Programs");
  const [isAnimatingTab, setIsAnimatingTab] = useState(false);

  useGSAP(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(bgRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: "power4.inOut" });
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(contentRef.current, { autoAlpha: 0, y: -20, duration: 0.3, ease: "power2.in" });
      gsap.to(bgRef.current, { yPercent: -100, duration: 0.5, delay: 0.1, ease: "power4.inOut" });
      setTimeout(() => setActiveTab("Programs"), 600);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleTabClick = (tab: Tab) => {
    if (tab === activeTab || isAnimatingTab) return;
    setIsAnimatingTab(true);

    const el = rightContentRef.current;
    if (!el) return;

    gsap.to(el, {
      y: -40, opacity: 0, duration: 0.3, ease: "power2.in", 
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        setIsAnimatingTab(false);
      }
    });
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 overflow-hidden text-black",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-[#f2f2f2] w-full h-[100svh]"
      />

      <div ref={contentRef} className="relative z-10 w-full h-[100dvh] overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col px-6 md:px-12 pt-28 md:pt-32 pb-8 text-black opacity-0">
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 h-auto lg:h-full pb-20 lg:pb-0">
          
          <div className="flex flex-col gap-4 lg:hidden text-[2rem] font-medium tracking-tight mb-2 uppercase">
            <AnimatedLink className="justify-start origin-left w-fit" href="/contact" onClick={onClose}>Contact us</AnimatedLink>
            <AnimatedLink className="justify-start origin-left w-fit" href="/faq" onClick={onClose}>FAQs</AnimatedLink>
          </div>

          <div className="hidden lg:flex lg:col-span-2 flex-col gap-6 text-xl font-medium mt-1 uppercase tracking-tight">
            <AnimatedLink className="justify-start origin-left w-fit" href="/contact" onClick={onClose}>Contact us</AnimatedLink>
            <AnimatedLink className="justify-start origin-left w-fit" href="/faq" onClick={onClose}>FAQs</AnimatedLink>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-12 text-[2.2rem] md:text-[2.5rem] lg:text-[3.5rem] lg:leading-[1.1] font-medium tracking-tight h-auto lg:h-full">
            {TABS.map((tab) => (
              <button 
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  "text-left transition-colors duration-300 w-fit cursor-pointer flex group",
                  activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <div className={cn("relative overflow-hidden flex items-center pr-2", tab === "Student Experience" ? "h-[2em]" : "h-[1.3em]")}>
                  <span className="relative flex transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[110%] pt-2 px-1">
                    {tab}
                  </span>
                  <span className="absolute top-[110%] left-0 flex transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[110%] pt-2 px-1">
                    {tab}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4 overflow-visible mt-6 lg:mt-0" ref={rightContentRef}>
            {activeTab === "Programs" && (
              <>
                <div className="flex flex-col gap-3">
                  {[ 
                    { title: "In-Person", desc: "Experience TIF in your city. We're launching new cities yearly.", loc: "Calgary / New York / San Francisco / Toronto / Vancouver / Dubai / Seattle", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800", link: "/in-person" },
                    { title: "Virtual", desc: "Meet like-minded people from around the world in our virtual program.", loc: "Online", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800", link: "/virtual" },
                    { title: "Summer Program", desc: "A 3-week pre-college academic enrichment program at one of the world's top universities.", loc: "UCLA Campus", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800", link: "/summer-program" }
                  ].map((card, i) => (
                    <Link to={card.link || "#"} key={i} onClick={onClose} className="group relative flex flex-col sm:flex-row gap-4 bg-white p-3 lg:p-4 cursor-pointer items-center sm:items-start h-auto lg:h-[130px] rounded shadow-sm hover:shadow-md transition-shadow">
                      <PixelArrowCard />
                      <div className="flex-1 flex flex-col justify-between h-full z-10 relative pointer-events-none">
                        <div>
                          <h3 className="text-xl lg:text-2xl font-medium mb-1 group-hover:-translate-y-1 transition-transform">{card.title}</h3>
                          <p className="text-xs lg:text-sm text-gray-500 line-clamp-2 max-w-sm group-hover:-translate-y-1 transition-transform">{card.desc}</p>
                        </div>
                        <p className="text-[10px] lg:text-xs text-black font-medium mt-2">{card.loc}</p>
                      </div>
                      <div className="hidden sm:block w-32 lg:w-48 h-full bg-gray-200 overflow-hidden shrink-0 z-10 relative pointer-events-none rounded-[4px]">
                        <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 h-auto lg:h-[100px]">
                  <a href="#" className="bg-white flex items-end p-3 lg:p-4 text-xs lg:text-sm font-medium rounded shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden min-h-[70px] lg:min-h-0"><span className="relative z-10 pointer-events-none">Alumni</span><PixelArrowCard /></a>
                  <a href="#" className="bg-white flex items-end p-3 lg:p-4 text-xs lg:text-sm font-medium rounded shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden min-h-[70px] lg:min-h-0"><span className="relative z-10 pointer-events-none">Our Mentors</span><PixelArrowCard /></a>
                  <a href="#" className="bg-white flex items-end p-3 lg:p-4 text-xs lg:text-sm font-medium rounded shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden col-span-2 md:col-span-1 min-h-[70px] lg:min-h-0"><span className="relative z-10 pointer-events-none">Financial Aid</span><PixelArrowCard /></a>
                </div>
              </>
            )}

            {activeTab === "Student Experience" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto lg:h-[200px]">
                 <div className="bg-white p-6 rounded shadow-sm flex items-end justify-center text-2xl lg:text-3xl font-medium hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden min-h-[120px]">
                    <span className="relative z-10 pointer-events-none">Student Experience</span>
                    <PixelArrowCard />
                 </div>
                 <div className="bg-white p-6 rounded shadow-sm flex items-end justify-center text-2xl lg:text-3xl font-medium hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden min-h-[120px]">
                    <span className="relative z-10 pointer-events-none">Student Talks</span>
                    <PixelArrowCard />
                 </div>
              </div>
            )}
            
            {activeTab === "About TIF" && (
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 h-auto lg:h-[500px] w-full lg:w-[100%] xl:w-[1600px]">
              <div className="bg-white p-6 md:p-8 rounded shadow-sm flex-1 flex flex-col justify-center gap-4 group relative overflow-hidden cursor-pointer min-h-[150px]">
                 <h2 className="text-2xl md:text-3xl font-medium relative z-10 pointer-events-none">About The Knowledge Society</h2>
                 <p className="text-gray-500 relative z-10 pointer-events-none text-sm md:text-base">We exist to help ambitious young people reach their full potential.</p>
                 <PixelArrowCard />
              </div>
              </div>
            )}
            
            {activeTab === "Follow us" && (
              <div className="grid grid-cols-2 gap-4 h-auto lg:h-[180px]">
                 <a href="#" className="bg-white p-4 lg:p-2 flex items-end justify-center text-lg lg:text-xl font-medium shadow-sm hover:shadow-md transition-all rounded group relative overflow-hidden min-h-[80px] lg:min-h-0"><span className="relative z-10 pointer-events-none">Instagram</span><PixelArrowCard/></a>
                 <a href="#" className="bg-white p-4 lg:p-2 flex items-end justify-center text-lg lg:text-xl font-medium shadow-sm hover:shadow-md transition-all rounded group relative overflow-hidden min-h-[80px] lg:min-h-0"><span className="relative z-10 pointer-events-none">Twitter</span><PixelArrowCard/></a>
                 <a href="#" className="bg-white p-4 lg:p-2 flex items-end justify-center text-lg lg:text-xl font-medium shadow-sm hover:shadow-md transition-all rounded group relative overflow-hidden min-h-[80px] lg:min-h-0"><span className="relative z-10 pointer-events-none">LinkedIn</span><PixelArrowCard/></a>
                 <a href="#" className="bg-white p-4 lg:p-2 flex items-end justify-center text-lg lg:text-xl font-medium shadow-sm hover:shadow-md transition-all rounded group relative overflow-hidden min-h-[80px] lg:min-h-0"><span className="relative z-10 pointer-events-none">YouTube</span><PixelArrowCard/></a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 lg:mt-auto pt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between text-sm text-gray-500 w-full shrink-0">
          <div className="w-full lg:w-auto mb-10 lg:mb-0">
            <p className="font-medium text-black mb-4 uppercase tracking-wider text-sm">Stay Updated</p>
            <div className="flex align-center border border-gray-300 p-1 bg-white w-full lg:min-w-[400px] rounded-[4px] shadow-sm">
              <input type="email" placeholder="E-mail" className="flex-1 outline-none px-3 bg-transparent text-black text-sm w-full" />
              <div className="shrink-0 flex items-center justify-center">
                <TksButton className="h-10 py-1 px-4 text-xs">Submit</TksButton>
              </div>
            </div>
          </div>
          
          <div className="text-sm w-full lg:w-auto flex flex-col sm:flex-row mt-0 lg:mt-20 justify-between lg:gap-32 gap-2 text-gray-400">
            <p className="text-black">TIF©2026</p>
            <p>All rights reserved ©2026</p>
            <p>
            Developed by{" "}
            <a 
              href="https://kutsev-studio.by" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-[#52a663] transition-colors"
            >
              kutsev-studio
            </a>
          </p>
          </div>
        </div>

      </div>
    </div>
  );
};
