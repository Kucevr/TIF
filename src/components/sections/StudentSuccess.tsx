import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const StudentSuccess = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current || !imageRef.current) return;

    // The jitter fix: We use pure CSS `sticky` and negative margin to handle the reveal 
    // so `ScrollTrigger` doesn't fight the main scroll thread via `yPercent`.
    // The container is `200vh` tall. `marginTop: -100vh` places its top exactly 100vh 
    // above the bottom of `Stats`. As we scroll down, `Stats` layers over the sticky content.

    // 1. Animate the image and text while it's being uncovered
    // We trigger off the container. The sticky child is fully covered when `top` of container hits `top` of screen.
    // It's fully revealed when `top` of container hits `-100%` of screen.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top -55%", // Start animating when it's 40% revealed
        toggleActions: "play none none reverse",
      }
    });

    // The image scales up
    tl.fromTo(imageRef.current, 
      { scale: 0.6, opacity: 0, borderRadius: "50px" },
      {
        scale: 1,
        opacity: 0.8, 
        borderRadius: "0px",
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Text reveals
    tl.fromTo(".ss-text-reveal", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      },
      "<0.2"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] -mt-[100vh] z-10 pointer-events-none">
      <div 
        ref={contentRef} 
        className="sticky top-0 w-full h-screen bg-[#f2f2f2] overflow-hidden pointer-events-auto"
      >
        <div className="absolute inset-0 w-full h-full bg-[#000000]">
          <img 
            ref={imageRef}
            src="/studentsuccess.jpg" 
            />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between max-w-[1800px] mx-auto px-6 md:px-12 py-24">
          <h2 className="ss-text-reveal text-white text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tight leading-[1.05] max-w-4xl">
            We've empowered thousands of young minds globally, reaching students in over 60 countries across multiple continents.
          </h2>

          <div className="w-full flex flex-col md:flex-row justify-end items-end gap-12 mt-auto">
            <div className="flex flex-col gap-6 max-w-md w-full">
              <p className="ss-text-reveal text-white text-lg md:text-xl font-medium leading-relaxed">
                Our graduates launch their own ventures, secure roles in top research labs, and acquire positions at industry giants—all before stepping into university.
              </p>
              <div className="ss-text-reveal flex items-center gap-6 mt-4">
                <span className="font-bold text-white tracking-widest text-lg">NASA</span>
                <div className="w-6 h-6 rounded-full border-[2px] border-white flex items-center justify-center p-[2px]">
                  <div className="w-full h-full bg-white rounded-full" />
                </div>
                <span className="font-bold text-[#4285F4] text-xl">Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
