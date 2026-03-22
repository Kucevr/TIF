import React from "react";
import { cn } from "../../lib/utils";

interface TksButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PixelArrow = ({ className }: { className?: string }) => {
  const pixels = [
    { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
    { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
    { x: 5, y: 2 }, { x: 4, y: 1 },
    { x: 5, y: 4 }, { x: 4, y: 5 },
  ];
  return (
    <svg viewBox="0 0 7 7" className={cn("w-[14px] h-[14px] fill-current", className)} aria-hidden="true">
      {pixels.map((p, i) => (
        <rect 
          key={i} 
          x={p.x} 
          y={p.y} 
          width="1" 
          height="1" 
          className="transition-colors duration-[100ms] ease-linear" 
          style={{ transitionDelay: `${i * 30}ms` }} 
        />
      ))}
    </svg>
  );
}

export const TksButton = React.forwardRef<HTMLButtonElement, TksButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative flex items-center overflow-hidden bg-[#48a65f] text-white",
          "h-10 rounded-md border border-transparent hover:border-gray-200 transition-colors",
          className
        )}
        {...props}
      >
        {/* Background fill overlay (from top to bottom) */}
        <div className="absolute inset-0 top-0 h-full w-full bg-white -translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
        
        {/* Text container */}
        <span className="relative px-5 py-2 text-sm font-medium z-10 transition-colors duration-[600ms] group-hover:text-black">
          {children}
        </span>
        
        {/* Arrow box */}
        <div className="relative z-10 mr-1 flex h-8 w-8 shrink-0 items-center justify-center bg-white rounded-[4px] transition-colors duration-[600ms] group-hover:bg-[#48a65f]">
          <PixelArrow className="text-[#48a65f] group-hover:text-white" />
        </div>
      </button>
    );
  }
);

TksButton.displayName = "TksButton";