import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Navbar } from "../components/layout/Navbar";
import { Programs } from "../components/sections/Programs";
import { Footer } from "../components/layout/Footer";
import { Instagram, Youtube, Linkedin, Twitter, Play } from "lucide-react";
import { FaqItem } from "../components/ui/FaqItem";

gsap.registerPlugin(ScrollTrigger);

export const ContactUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Inside our Ecosystem animation
    const ecoLines = gsap.utils.toArray<HTMLElement>(".eco-headline span");
    gsap.fromTo(ecoLines,
      { y: 100, rotation: 3, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".eco-headline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // FAQ Title animation
    const faqLines = gsap.utils.toArray<HTMLElement>(".faq-title-headline span");
    gsap.fromTo(faqLines,
      { y: 100, rotation: 2, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-title-headline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // FAQ Items appearing animation
    const faqItems = gsap.utils.toArray<HTMLElement>(".faq-item-anim");
    gsap.fromTo(faqItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-list-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f2f2f2] font-sans">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Contact info section */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 mb-32 flex flex-col md:flex-row gap-16 md:gap-32">
          
          {/* Left - Socials */}
          <div className="flex-shrink-0 w-full md:w-64 pt-8">
            <div className="text-xs font-medium uppercase tracking-widest text-black/60 mb-12">
               <Link to="/" className="hover:text-black transition-colors">Home</Link> / <span className="text-black">Contact</span>
            </div>
            
            <div className="text-[10px] font-bold tracking-widest text-black mb-12 flex items-center gap-2 uppercase">
              <div className="w-1.5 h-1.5 bg-black" /> CONTACT TIF
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { label: "Instagram", icon: Instagram },
                { label: "YouTube", icon: Youtube },
                { label: "LinkedIn", icon: Linkedin },
                { label: "Twitter", icon: Twitter },
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="relative flex items-center justify-between w-full sm:w-[180px] bg-white border border-gray-100 py-3 px-4 overflow-hidden group shadow-sm"
                >
                  <div className="absolute inset-0 bg-[#52a663] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                  <span className="relative z-10 font-medium text-sm text-black group-hover:text-white transition-colors duration-500">
                    {social.label}
                  </span>
                  <div className="relative z-10 bg-black/5 p-1 rounded-sm group-hover:bg-white/20 transition-colors duration-500">
                    <social.icon className="w-4 h-4 text-black group-hover:text-white transition-colors duration-500" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right - Contact Grid */}
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-20 text-black">
              Get in touch with our team.
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 text-black">
              <div className="flex flex-col gap-4">
                <h3 className="text-gray-500 text-sm font-medium">Reach us</h3>
                <div className="flex flex-col gap-1 text-sm font-medium">
                  <a href="#" className="underline underline-offset-4 decoration-1">hello@tif.world</a>
                  <a href="#" className="underline underline-offset-4 decoration-1">WhatsApp</a>
                  <a href="#" className="underline underline-offset-4 decoration-1">1-855-244-7866</a>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-gray-500 text-sm font-medium">TIF Explained</h3>
                <div className="flex flex-col gap-1 text-sm font-medium">
                  <a href="#" className="underline underline-offset-4 decoration-1">What is TIF? (video)</a>
                </div>
              </div>

              {/* Empty placeholder for grid layout alignment if needed, but going to next row */}
              <div className="hidden lg:block"></div>

              <div className="flex flex-col gap-4">
                <h3 className="text-gray-500 text-sm font-medium">USA</h3>
                <p className="text-sm font-medium max-w-[200px] leading-relaxed">
                  10 Bank Street, Suite 560,<br />
                  White Plains, NY, 10606
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-gray-500 text-sm font-medium">Canada</h3>
                <p className="text-sm font-medium max-w-[200px] leading-relaxed">
                  700 2nd Street SW, Floor<br />
                  19, Calgary AB T2P 2W2
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-gray-500 text-sm font-medium">Dubai</h3>
                <p className="text-sm font-medium max-w-[200px] leading-relaxed">
                  Dubai Future Accelerators,<br />
                  Emirates Towers, Dubai
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-40 flex flex-col items-center justify-center text-center px-4">
          <h2 className="eco-headline text-[12vw] md:text-[8rem] leading-[0.8] font-medium tracking-tighter text-black mb-12 flex flex-col">
            <span className="overflow-hidden pb-2"><span className="inline-block origin-bottom-left">Inside our</span></span>
            <span className="overflow-hidden pb-2"><span className="inline-block origin-bottom-left">Ecosystem</span></span>
          </h2>
          
          <div className="relative group cursor-pointer w-full max-w-[600px] aspect-video bg-black overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop" 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-12 bg-[#FF0000] text-white flex items-center justify-center rounded-[8px]">
                <Play className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm font-medium text-black max-w-[300px]">
            Experience a typical deep-dive collaboration in one of our global hubs.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 mb-40 flex flex-col lg:flex-row gap-16 lg:gap-32 items-start justify-between">
          <div className="lg:w-1/3 pt-4">
            <h2 className="faq-title-headline text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] text-black flex flex-col">
              <span className="overflow-hidden pb-1"><span className="inline-block origin-bottom-left">Frequently</span></span>
              <span className="overflow-hidden pb-1"><span className="inline-block origin-bottom-left">asked questions</span></span>
            </h2>
          </div>
          
          <div className="faq-list-container flex-1 w-full flex flex-col border-t border-black/10">
            {[
              "What topics can I study at TIF?",
              "What are the eligibility requirements to apply for TIF?",
              "Is there financial aid available?",
              "Can TIF help me get into university?",
              "How much does TIF cost?",
              "How long does the program run for?"
            ].map((q, i) => (
              <div key={i} className="faq-item-anim w-full">
                <FaqItem index={i + 1} question={q} />
              </div>
            ))}
          </div>
        </section>

        {/* Programs */}
        <div className="mb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
          <div className="text-[10px] font-bold tracking-widest text-black mb-8 flex items-center gap-2 uppercase">
            <div className="w-1.5 h-1.5 bg-black" /> PROGRAM
          </div>
          <Programs />
        </div>
      </main>

      <Footer />
    </div>
  );
};
