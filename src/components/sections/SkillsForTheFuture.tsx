import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { title: "Visionary Frameworks", icon: 2, pos: { x: 0, y: -260 }, mobilePos: { x: 0, y: -300 } },
  { title: "Empirical Reasoning", icon: 1, pos: { x: -350, y: -210 }, mobilePos: { x: -90, y: -160 } },
  { title: "Exponential Growth", icon: 3, pos: { x: 370, y: -180 }, mobilePos: { x: 90, y: -160 } },
  { title: "Core Fundamentals", icon: 4, pos: { x: -370, y: 170 }, mobilePos: { x: -90, y: 160 } },
  { title: "Confident Pitching", icon: 6, pos: { x: 350, y: 210 }, mobilePos: { x: 90, y: 160 } },
  { title: "Influential Network", icon: 5, pos: { x: -50, y: 260 }, mobilePos: { x: 0, y: 300 } },
];

const SkillIcon = ({ count }: { count: number }) => (
  <div className="flex flex-wrap w-[18px] gap-[2px] mb-8">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="w-[6px] h-[6px] border border-green-500 rounded-[1px]"></div>
    ))}
  </div>
);

export const SkillsForTheFuture = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;

    // Center text fade in
    gsap.fromTo(".skills-title",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // When we scroll down and title would be visible
          toggleActions: "play none none reverse",
        }
      }
    );

    // Cards shooting out from center
    let mm = gsap.matchMedia();
    const cards = gsap.utils.toArray<HTMLElement>(".skill-card");

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(cards,
        { x: 0, y: 0, scale: 0, opacity: 0 },
        {
          x: (index) => SKILLS[index].pos.x,
          y: (index) => SKILLS[index].pos.y,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%", 
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(cards,
        { x: 0, y: 0, scale: 0, opacity: 0 },
        {
          x: (index) => SKILLS[index].mobilePos.x,
          y: (index) => SKILLS[index].mobilePos.y,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%", 
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#f2f2f2] text-black w-full min-h-[100vh] py-32 md:py-32 relative overflow-hidden flex items-center justify-center">
      
      <div className="relative z-10 w-full max-w-[1200px] h-[800px] md:h-[600px] flex items-center justify-center">
        
        {/* Main Title Center */}
        <h2 className="skills-title text-[5rem] md:text-[7rem] lg:text-[8rem] font-medium tracking-tight leading-[0.9] text-center z-20 flex flex-col">
          <span>Tomorrow's</span>
          <span>Expertise</span>
        </h2>

        {/* Floating Cards */}
        {SKILLS.map((skill, index) => (
          <div 
            key={index}
            className="skill-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded flex flex-col p-4 md:p-6 shadow-sm z-10 w-[150px] md:w-[240px] min-h-[130px] md:min-h-[160px]"
          >
            <SkillIcon count={skill.icon} />
            <h3 className="text-[17px] md:text-xl font-medium leading-tight mt-auto tracking-tight">{skill.title}</h3>
          </div>
        ))}
        
      </div>

    </section>
  );
};
