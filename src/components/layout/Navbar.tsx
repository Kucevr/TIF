import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";
import { AnimatedLink } from "../ui/AnimatedLink";
import { TksButton } from "../ui/TksButton";
import { Menu } from "./Menu";

gsap.registerPlugin(ScrollTrigger);

const PixelHamburger = ({ className }: { className?: string }) => {
  const pixels = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
    { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
    { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
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
          className="transition-opacity duration-[200ms] ease-linear group-hover:opacity-30" 
          style={{ transitionDelay: `${(i % 5) * 40}ms` }} 
        />
      ))}
    </svg>
  );
};

const PixelClose = ({ className }: { className?: string }) => {
  const pixels = [
    { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 },
    { x: 4, y: 0 }, { x: 3, y: 1 }, { x: 1, y: 3 }, { x: 0, y: 4 },
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
          className="transition-opacity duration-[200ms] ease-linear group-hover:opacity-30" 
          style={{ transitionDelay: `${(i % 3) * 50}ms` }} 
        />
      ))}
    </svg>
  );
};

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#' + id);
    }
  };

  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(isHomePage);

  useGSAP(() => {
    if (!navRef.current) return;

    ScrollTrigger.create({
      start: "top top",
      end: "99999",
      onUpdate: (self) => {
        if (isHomePage) {
          const isTop = self.scroll() < 50;
          setIsTransparent(isTop);
        } else {
          setIsTransparent(false);
        }

        if (isMenuOpen) return;

        // Smooth hide/show adjusting duration and ease to match reference
        if (self.direction === 1 && self.scroll() > 100) {
          gsap.to(navRef.current, { yPercent: -100, duration: 0.4, ease: "power2.out", overwrite: true });
        } else if (self.direction === -1 || self.scroll() <= 100) {
          gsap.to(navRef.current, { yPercent: 0, duration: 0.4, ease: "power2.out", overwrite: true });
        }
      }
    });
  }, [isMenuOpen, isHomePage]);

  const needsSolidBg = !isTransparent || isMenuOpen || !isHomePage;

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] w-full transition-colors duration-300 pointer-events-auto",
          needsSolidBg ? "bg-[#f2f2f2] text-black" : "bg-transparent text-white"
        )}
      >
        <div className="flex h-16 md:h-20 items-center justify-between px-6 md:px-12 pointer-events-auto">
          <a href="/" className="text-3xl font-bold tracking-tighter shrink-0 z-50">
            TIF
          </a>

          <div className="flex items-center gap-6 lg:gap-10 sm:relative z-50 pointer-events-auto">
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <AnimatedLink href="/#about" onClick={(e) => handleScrollToSection(e, 'about')}>About TIF</AnimatedLink>
              <AnimatedLink href="/#projects" onClick={(e) => handleScrollToSection(e, 'projects')}>Projects</AnimatedLink>
              <AnimatedLink href="/#financial-aid" onClick={(e) => handleScrollToSection(e, 'financial-aid')}>Financial aid</AnimatedLink>
              <AnimatedLink href="/#programs" onClick={(e) => handleScrollToSection(e, 'programs')}>Programs</AnimatedLink>
            </nav>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "flex items-center justify-center gap-2 px-4 h-10 rounded-[4px] text-sm font-medium transition-colors border pointer-events-auto group relative overflow-hidden",
                !needsSolidBg ? "bg-white/10 text-white border-white/20 hover:bg-white/20" : "bg-white text-black border-gray-200 hover:bg-gray-50"
              )}
            >
              {isMenuOpen ? <PixelClose className="text-[#48a65f]" /> : <PixelHamburger className="text-[#48a65f]" />}
              <AnimatedLink>Menu</AnimatedLink>
            </button>
          </div>

          <div className="shrink-0 z-50 pointer-events-auto">
            <TksButton className="hidden md:flex">Admissions Process</TksButton>
          </div>
        </div>
      </header>
      
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
