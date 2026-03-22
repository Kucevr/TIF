import { Navbar } from "../components/layout/Navbar";
import { FloatingAction } from "../components/layout/FloatingAction";
import { Hero } from "../components/sections/Hero";
import { WhatIsTks } from "../components/sections/WhatIsTks";
import { ParallaxGallery } from "../components/sections/ParallaxGallery";
import { Stats } from "../components/sections/Stats";
import { StudentSuccess } from "../components/sections/StudentSuccess";
import { WhatYouLearn } from "../components/sections/WhatYouLearn";
import { SkillsForTheFuture } from "../components/sections/SkillsForTheFuture";
import { RealSolutions } from "../components/sections/RealSolutions";
import { FinancialAid } from "../components/sections/FinancialAid";
import { Programs } from "../components/sections/Programs";
import { Faq } from "../components/sections/Faq";
import { Join } from "../components/sections/Join";
import { Footer } from "../components/layout/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />
      <main>
        <Hero />
        <WhatIsTks />
        <ParallaxGallery />
        <Stats />
        <StudentSuccess />
        <WhatYouLearn />
        <SkillsForTheFuture />
        <RealSolutions />
        <FinancialAid />
        <Programs />
        <Faq />
        <Join />
      </main>
      <Footer />
      <FloatingAction />
    </div>
  );
};

