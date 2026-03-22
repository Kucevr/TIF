import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ParallaxGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    { text: "Year-Long Focus", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000" },
    { text: "For Youth 13-17", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" },
    { text: "Worldwide Hub", img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=2000" }
  ];

  useGSAP(() => {
    // Parallax effect specifically for each panel as it becomes visible/sticks
    gsap.utils.toArray<HTMLElement>(".gallery-panel").forEach((panel) => {
      const img = panel.querySelector(".parallax-image");
      const text = panel.querySelector(".parallax-text");
      
      if (img) {
        // Slow subtle scale to give the image life while stuck
        gsap.fromTo(img, 
          { scale: 1 }, 
          { scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

      if (text) {
        // Text subtle parallax
        gsap.fromTo(text,
          { y: 50 },
          { y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-black flex flex-col">
      {/* 
        Using sticky top-0 creates a beautiful panel-stacking effect 
        where the next panel wipes over the previous one seamlessly.
      */}
      {sections.map((sec, i) => (
        <div 
          key={i} 
          className="gallery-panel sticky top-0 w-full h-[100svh] overflow-hidden flex items-center justify-center bg-black"
        >
          {/* Parallax Image */}
          <img 
            src={sec.img} 
            alt={`Gallery ${i}`} 
            className="parallax-image absolute inset-0 w-full h-full object-cover object-center opacity-60"
          />
          
          {/* Text */}
          <h2 className="parallax-text relative z-10 text-white font-medium text-[6rem] md:text-[10rem] tracking-tighter w-full text-center leading-none drop-shadow-lg">
            {sec.text}
          </h2>
        </div>
      ))}
    </section>
  );
};
