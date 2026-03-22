import { useRef } from "react";
import { cn } from "../../lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PlusIcon = ({ className }: { className?: string }) => {
  // Creating a pixel-art plus with an empty center on a 5x5 grid
  const pixels = [
    { x: 2, y: 0 }, { x: 2, y: 1 }, // top arm
    { x: 2, y: 3 }, { x: 2, y: 4 }, // bottom arm
    { x: 0, y: 2 }, { x: 1, y: 2 }, // left arm
    { x: 3, y: 2 }, { x: 4, y: 2 }, // right arm
  ];
  return (
    <svg viewBox="0 0 5 5" className={cn("w-[14px] h-[14px] fill-current", className)} aria-hidden="true">
      {pixels.map((p, i) => (
        <rect 
          key={i} 
          x={p.x} 
          y={p.y} 
          width="1" 
          height="1" 
        />
      ))}
    </svg>
  );
};

const ProgramCard = ({ 
  title, 
  priceDetails, 
  price, 
  aidDescription, 
  locations,
  timing
}: {
  title: string;
  priceDetails: string;
  price: string;
  aidDescription: string;
  locations: string[];
  timing: string;
}) => {
  return (
     <div className="group w-full bg-white rounded flex flex-col p-8 md:p-12 transition-colors duration-500 hover:bg-[#52a663] text-black hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] max-w-[250px] prog-card-title flex flex-col">
            {title.split(' ').map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span className="block prog-title-word origin-bottom-left">{word}</span>
              </div>
            ))}
          </h3>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#52a663] text-white flex items-center justify-center rounded-[4px] transition-all duration-500 group-hover:text-[#52a663] group-hover:bg-white group-hover:scale-125 shrink-0">
             <PlusIcon />
          </div>
        </div>

        {/* Pricing Info */}
        <div className="flex flex-col gap-6 md:gap-8 mb-24 md:mb-32">
          <div>
            <div className="text-xs md:text-sm text-gray-400 font-medium mb-1 group-hover:text-green-100 transition-colors duration-500">{priceDetails}</div>
            <div className="font-medium text-sm md:text-base leading-snug max-w-xs">{price}</div>
          </div>
          <div>
            <div className="text-xs md:text-sm text-gray-400 font-medium mb-1 group-hover:text-green-100 transition-colors duration-500">Financial aid available</div>
            <div className="font-medium text-sm md:text-base leading-snug max-w-[260px]">{aidDescription}</div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-12">
          
          <div className="w-full sm:w-auto">
             <div className="text-xs text-gray-400 font-medium mb-4 group-hover:text-green-100 transition-colors duration-500">Where</div>
             <div className="grid grid-cols-2 gap-x-8 gap-y-2">
               {locations.map((loc, i) => (
                 <div key={i} className="flex items-center gap-2 text-sm font-medium">
                   <div className="w-1 h-1 bg-black group-hover:bg-white rounded-sm shrink-0 transition-colors duration-500"></div>
                   {loc}
                 </div>
               ))}
             </div>
          </div>

          <div className="flex flex-col items-start sm:items-end">
             <div className="text-xs text-gray-400 font-medium mb-2 md:mb-4 group-hover:text-green-100 transition-colors duration-500">Program Timing</div>
             <div className="font-medium text-sm text-right whitespace-nowrap">{timing}</div>
          </div>

        </div>

     </div>
  );
};

export const Programs = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Main headlines
    const headlineLines = gsap.utils.toArray<HTMLElement>(".prog-headline .prog-line");
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
          trigger: ".prog-headline",
          start: "top 80%",
        }
      }
    );

    // Card titles
    const cards = gsap.utils.toArray<HTMLElement>(".prog-card-title");
    cards.forEach((card) => {
      const words = gsap.utils.toArray<HTMLElement>(card.querySelectorAll(".prog-title-word"));
      gsap.fromTo(words,
        { y: 100, rotation: 3, opacity: 0 },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section id="programs" ref={containerRef} className="bg-[#f2f2f2] text-black w-full py-32 px-4 md:px-8 relative z-10">
      <div className="max-w-[1800px] mx-auto w-full flex flex-col items-center">
        
        <div className="prog-headline text-4xl md:text-5xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] text-center mb-16 md:mb-24 flex flex-col">
          <div className="overflow-hidden"><span className="block prog-line origin-bottom-left">Choose your path.</span></div>
          <div className="overflow-hidden"><span className="block prog-line origin-bottom-left">Join our global network.</span></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full max-w-[1400px]">
          
          <ProgramCard 
            title="In-Person Program"
            priceDetails="Program Fees / Vary by location"
            price="$539-$639/month + $1000 deposit Visit your city's page for exact pricing."
            aidDescription="You can request financial aid during the application process."
            locations={["Vancouver", "Toronto", "Calgary", "New York", "Dubai", "San Francisco"]}
            timing="Sep 2026 - Jun 2027"
          />

          <ProgramCard 
            title="Virtual Program"
            priceDetails="Program Fees"
            price="$489/month + $1000 deposit (USD)"
            aidDescription="You can request financial aid during the application process."
            locations={["Online", "Global cohort", "Accessible from anywhere"]}
            timing="Sep 2026 - Jun 2027"
          />

        </div>

      </div>
    </section>
  );
};
