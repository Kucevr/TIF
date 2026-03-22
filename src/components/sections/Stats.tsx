import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const lists = [
    { label: "Our Network", title: "Global Reach", desc: "Thousands of TIF graduates from around the globe are taking leadership roles at cutting-edge tech firms." },
    { label: "Frontier", title: "Technologies", desc: "Gain hands-on experience with artificial intelligence, deep learning, and advanced bio-engineering." },
    { label: "Lifelong", title: "Connections", desc: "Connect with ambitious peers who will become your lifelong partners, collaborators, and visionary friends." },
    { label: "Guidance", title: "From the Best", desc: "Receive dedicated coaching from industry veterans and tap into a worldwide hub of seasoned professionals." },
    { label: "Immersive", title: "Workshops", desc: "Engage in dynamic weekly meetups, either locally or virtually, to challenge your perspective and prototype ideas." },
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Top headline animation
    const headlineLines = gsap.utils.toArray<HTMLElement>(".stats-headline span");
    gsap.fromTo(headlineLines, 
      { y: 100, rotation: 2, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-headline-container",
          start: "top 80%",
        }
      }
    );

    // 2. Large words reveal animation for each row
    const rowTitles = gsap.utils.toArray<HTMLElement>(".stats-row-title-inner");
    rowTitles.forEach((title) => {
      gsap.fromTo(title,
        { y: "100%" },
        {
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title.closest(".stats-row"),
            start: "top 85%",
          }
        }
      );
    });

    // 3. Fade in labels and descriptions
    const fadeTexts = gsap.utils.toArray<HTMLElement>(".stats-fade-text");
    fadeTexts.forEach((text) => {
      gsap.fromTo(text,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text.closest(".stats-row"),
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#f2f2f2] text-black w-full pt-32 pb-40 px-4 md:px-8 relative z-20 shadow-sm border-b border-[#e5e5e5]">
      <div className="max-w-[1800px] mx-auto w-full">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between pb-32">
          {/* Top Left Title */}
          <div className="flex items-center gap-2 mb-12 lg:mb-0 items-start pt-2">
            <div className="w-[6px] h-[6px] bg-black mt-1 shrink-0"></div>
            <h2 className="text-xs font-bold tracking-widest uppercase leading-snug w-[180px]">
              TEENS WORLDWIDE CHOOSE TIF
            </h2>
          </div>
          
          {/* Top Right Animated Headline */}
          <div className="max-w-2xl stats-headline-container">
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] flex flex-col">
              <span className="overflow-hidden pb-1"><span className="stats-headline inline-block origin-bottom-left">TIF embraces curious minds</span></span>
              <span className="overflow-hidden pb-1"><span className="stats-headline inline-block origin-bottom-left">between 13 and 17, empowering</span></span>
              <span className="overflow-hidden pb-1"><span className="stats-headline inline-block origin-bottom-left">them to build a better future.</span></span>
            </h3>
          </div>
        </div>

        {/* List of Stats / Features */}
        <div className="w-full flex flex-col">
          {lists.map((item, index) => (
            <div 
              key={index} 
              className="stats-row border-t border-[#dfdfdf] grid grid-cols-1 md:grid-cols-12 gap-8 py-8 md:py-12 items-end group"
            >
              {/* Label (Left) */}
              <div className="col-span-1 md:col-span-2 hidden md:block">
                <span className="stats-fade-text text-xl font-medium tracking-tight">
                  {item.label}
                </span>
              </div>
              
              {/* Giant Title (Center) */}
              <div className="col-span-1 md:col-span-7 flex justify-center overflow-hidden">
                 <h4 className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-medium tracking-tighter leading-none m-0 p-0 text-center w-full">
                   <div className="overflow-hidden pb-2 lg:pb-5">
                      <span className="stats-row-title-inner block transform-gpu">{item.title}</span>
                   </div>
                 </h4>
              </div>

              {/* Description (Right) */}
              <div className="col-span-1 md:col-span-3 flex md:justify-end">
                <div className="md:hidden text-xl font-medium tracking-tight mb-2">
                  {item.label}
                </div>
                <p className="stats-fade-text text-sm font-medium leading-relaxed text-gray-600 max-w-[280px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
          <div 
              className="stats-row border-t border-[#dfdfdf] items-end group"
            ></div>
        </div>

      </div>
    </section>
  );
};