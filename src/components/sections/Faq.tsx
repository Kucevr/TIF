import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Faq = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Marquee animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear"
      });
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#fff] text-[#1a1a1a] py-32 overflow-hidden cursor-pointer"
      onClick={() => navigate("/faq")}
    >
      <div className="relative z-10 w-[200vw] flex overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap text-[6rem] md:text-[12rem] font-medium leading-none tracking-tighter">
          {Array(10).fill("■ FAQ ").map((text, i) => (
            <span key={i} className="px-4 md:px-8 hover:text-[#52a663] transition-colors">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
