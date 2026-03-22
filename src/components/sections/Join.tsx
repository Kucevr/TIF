import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { TksButton } from "../ui/TksButton";

const PHOTOS = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop",
];

export const Join = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textsRef = useRef<HTMLHeadingElement>(null);
  const photosRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      photosRef.current.forEach((photo, index) => {
        if (!photo) return;
        
        // Spread the photos around the cursor slightly differently based on index
        const xOffset = (index % 2 === 0 ? 1 : -1) * (50 + index * 30);
        const yOffset = (index < 2 ? -1 : 1) * (50 + index * 20);
        
        gsap.to(photo, {
          x: x - photo.offsetWidth / 2 + xOffset,
          y: y - photo.offsetHeight / 2 + yOffset,
          duration: 0.8 + index * 0.1,
          ease: "power2.out",
          opacity: 1,
          scale: 1,
          rotation: (x - rect.width / 2) * 0.02 + (index * 5)
        });
      });
    };

    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#f2f2f2] text-black py-32 flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={textsRef}
        className={`relative z-10 transition-opacity duration-1000 ${isHovered ? 'opacity-20 blend-overlay' : 'opacity-100'}`}
      >
        <h2 className="text-[11vw] font-bold tracking-tighter leading-[0.85] text-center mix-blend-difference uppercase">
          STEP INTO <br />
          THE FUTURE <br />
          WITH US
        </h2>
      </div>

      {/* Floating Photos showing on hover */}
      {PHOTOS.map((src, index) => (
        <div 
          key={index}
          ref={(el) => { photosRef.current[index] = el; }}
          className={`absolute top-0 left-0 pointer-events-none opacity-0 scale-50 z-20 ${
            index === 0 ? "w-[180px] h-[220px]" : 
            index === 1 ? "w-[150px] h-[190px]" : 
            index === 2 ? "w-[200px] h-[250px]" : "w-[160px] h-[200px]"
          }`}
        >
          <img 
            src={src} 
            alt="Join TIF" 
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
      ))}

      <div className="relative z-30 mt-16 flex items-center justify-center cursor-pointer">
        <TksButton className="text-xl px-12 py-4 shadow-xl">Apply Now</TksButton>
      </div>
    </section>
  );
};
