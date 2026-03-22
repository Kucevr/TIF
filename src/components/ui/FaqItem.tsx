import { useState } from "react";

export const FaqItem = ({ index, question }: { index: number, question: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Pixel maps for plus to minus transition
  const rects = [
    { pX: 2, pY: 0, mX: 0, mY: 2, mOp: 0 },
    { pX: 2, pY: 1, mX: 1, mY: 2, mOp: 0 },
    { pX: 2, pY: 3, mX: 3, mY: 2, mOp: 0 },
    { pX: 2, pY: 4, mX: 4, mY: 2, mOp: 0 },
    { pX: 0, pY: 2, mX: 0, mY: 2, mOp: 1 },
    { pX: 1, pY: 2, mX: 1, mY: 2, mOp: 1 },
    { pX: 3, pY: 2, mX: 3, mY: 2, mOp: 1 },
    { pX: 4, pY: 2, mX: 4, mY: 2, mOp: 1 },
    { pX: 2, pY: 2, pOp: 0, mX: 2, mY: 2, mOp: 1 }, // center pixel
  ];

  return (
    <div 
      className="border-b border-black/10 py-6 md:py-8 cursor-pointer group flex flex-col overflow-hidden text-black"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6 md:gap-12 transition-transform duration-500 ease-out group-hover:translate-x-6">
          <span className="text-sm font-medium w-6 shrink-0">
            {index.toString().padStart(2, '0')}
          </span>
          <h3 className="text-lg md:text-2xl font-medium tracking-tight">
            {question}
          </h3>
        </div>
        
        <div className="transition-transform duration-500 ease-out group-hover:-translate-x-6 shrink-0 ml-4">
          <div className={`w-8 h-8 flex items-center justify-center rounded-[2px] transition-colors duration-500 ${
            isOpen 
              ? 'bg-[#52a663] text-white' 
              : 'bg-white border border-gray-200 text-[#52a663] group-hover:bg-white group-hover:text-[#52a663] group-hover:border-transparent group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
          }`}>
            <svg viewBox="0 0 5 5" className="w-[14px] h-[14px] fill-current overflow-visible" aria-hidden="true">
              {rects.map((r, i) => (
                <rect 
                  key={i}
                  x={isOpen ? r.mX : r.pX}
                  y={isOpen ? r.mY : r.pY}
                  width="1"
                  height="1"
                  className="transition-all duration-500 ease-out"
                  style={{
                    opacity: isOpen ? r.mOp : (r.pOp ?? 1),
                    transitionDelay: `${i * 30}ms`
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
      
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
        <div className="overflow-hidden">
          <p className="text-gray-600 font-medium text-sm md:text-base pl-[4.5rem] pr-12">
            This is a placeholder for the answer. You can provide very detailed information here about our awesome TIF programs and the skills of the future that students will learn from industry experts.
          </p>
        </div>
      </div>
    </div>
  );
};
