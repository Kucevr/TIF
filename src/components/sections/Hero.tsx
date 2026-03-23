import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Hero = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textContainerRef.current) return;
    
    // Infinite horizontal sliding text (marquee effect)
    gsap.to(textContainerRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1,
    });
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-black text-white flex flex-col justify-end">
      {/* Background Image / Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          src="/TIFherovid - HD 1080p.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-80"
        ></video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Marquee Ticker at the bottom of the hero */}
      <div className="relative z-10 w-full border-t border-white/20 bg-black/20 backdrop-blur-sm overflow-hidden py-3">
        <div className="flex w-full overflow-hidden">
           <div ref={textContainerRef} className="flex min-w-max gap-8 pr-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-8">
                  <span className="text-sm font-medium tracking-wide uppercase">
                    APPLICATIONS OPEN — DEADLINE MARCH 31
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#48a65f]" />
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};