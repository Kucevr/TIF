import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TksButton } from "../ui/TksButton";

gsap.registerPlugin(ScrollTrigger);

export const FloatingAction = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!tickerRef.current) return;

    // Show when scrolling PAST the hero section (e.g. 50% of viewport)
    // Hide when scrolling back up
    ScrollTrigger.create({
      trigger: "body",
      start: "50vh top", 
      onEnter: () => gsap.to(tickerRef.current, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }),
      onLeaveBack: () => gsap.to(tickerRef.current, { y: 150, autoAlpha: 0, duration: 0.5, ease: "power3.in" }),
    });

  }, []);

  return (
    <div 
      ref={tickerRef} 
      style={{ opacity: 0, visibility: "hidden", transform: "translateY(150px)" }}
      className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm"
    >
      <div className="flex items-center bg-white p-2 rounded-sm shadow-xl border border-gray-100/50">
        <span className="px-4 text-sm font-bold tracking-tight text-black whitespace-nowrap">Deadline March 31</span>
        <TksButton className="ml-auto flex-1 justify-center rounded-[2px] h-10">Apply Now</TksButton>
      </div>
    </div>
  );
};