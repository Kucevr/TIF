import { useState } from "react";
import { Link } from "react-router-dom";
import { TksButton } from "../ui/TksButton";

const pixelsUp = [
  { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 },
  { x: 2, y: 2 }, { x: 1, y: 3 }, 
  { x: 4, y: 2 }, { x: 5, y: 3 }
]; 

export const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-24 pb-8 px-4 md:px-8 font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col min-h-[60vh] justify-between">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Left Column - Subscription */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest font-medium">STAY UPDATED</span>
            <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-medium leading-[1.2] tracking-tight mb-4">
              Get notified about special events, opportunities, and announcements.
            </h3>
            
            <div className="flex bg-[#f2f2f2] p-1 w-full max-w-sm rounded-[4px]">
              <input 
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 text-black outline-none placeholder:text-[#1a1a1a] bg-transparent text-sm w-full"
              />
              <div className="shrink-0 flex items-center justify-center">
                <TksButton className="h-10 py-1 px-4 text-xs font-sans rounded-[2px]">Submit</TksButton>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium mb-2">In-Person Program</h4>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Vancouver</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Toronto</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Calgary</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">New York</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Dubai</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">San Francisco</a>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium mb-2">Online Program</h4>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Virtual</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium mb-2">PR & Media</h4>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">About TIF</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Students Talks</a>
            </div>
          </div>

          {/* Right Column - Large Links */}
          <div className="lg:col-span-2 flex flex-col gap-6 items-start lg:items-end">
            <Link to="/contact" className="text-2xl font-medium hover:text-[#52a663] transition-colors">Contact us</Link>
            <a href="#" className="text-2xl font-medium hover:text-[#52a663] transition-colors">Careers</a>
          </div>

        </div>

        {/* Middle Section - Secondary Links and Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end mb-16">
          
          {/* Logo representation based on the image (if strictly UI built with text/blocks) */}
          <div className="lg:col-span-4 flex items-end -ml-2">
            <div className="text-[14rem] leading-[0.75] font-bold tracking-tighter select-none flex items-end">
              <div className="relative">
                <span>T</span>
              </div>
              <span className="-ml-1">IF</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Secondary Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium mb-2">Programs</h4>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Virtual (online)</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">In-Person</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Summer Program</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Mentors</a>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium mb-2">Resources</h4>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Blog</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Student Experience</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Alumni Stories</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Development Principles</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium mb-2">Follow us</h4>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">YouTube</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">X</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">TikTok</a>
            </div>
          </div>

          {/* Back to top button */}
          <div className="lg:col-span-2 flex justify-start lg:justify-end pb-2 text-[#48a65f]">
            <button 
              onClick={scrollToTop}
              className="group relative w-12 h-12 border border-white/20 flex items-center justify-center overflow-hidden transition-colors rounded-sm"
            >
              <div className="absolute inset-0 bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></div>
              
              <div className="relative z-10 w-5 h-5 text-white group-hover:text-current transition-colors duration-500">
                <svg viewBox="0 0 7 7" className="w-full h-full fill-current" aria-hidden="true">
                  {/* Default Up Arrow */}
                  <g className="group-hover:opacity-0 transition-opacity">
                    <rect x="3" y="1" width="1" height="5" />
                    <rect x="2" y="2" width="1" height="1" />
                    <rect x="1" y="3" width="1" height="1" />
                    <rect x="4" y="2" width="1" height="1" />
                    <rect x="5" y="3" width="1" height="1" />
                  </g>
                  {/* Hover Up Arrow Animated */}
                  {pixelsUp.map((p, i) => (
                    <rect 
                      key={`up-hov-${i}`} 
                      x={p.x} 
                      y={p.y} 
                      width="1" 
                      height="1" 
                      className="opacity-0 transition-opacity duration-[100ms] ease-linear group-hover:opacity-100" 
                      style={{ transitionDelay: `${i * 30}ms` }} 
                    />
                  ))}
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 text-sm text-gray-300 border-t border-white/20">
          <p>All rights reserved ©2026</p>
          <p>
            Developed by{" "}
            <a 
              href="https://kutsev-studio.by" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#52a663] transition-colors"
            >
              kutsev-studio
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
