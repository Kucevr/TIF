import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Lazy loading pages for better performance
const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const ContactUs = lazy(() => import("./pages/ContactUs").then(module => ({ default: module.ContactUs })));
const FaqPage = lazy(() => import("./pages/FaqPage").then(module => ({ default: module.FaqPage })));
const InPerson = lazy(() => import("./pages/InPerson").then(module => ({ default: module.InPerson })));
const Virtual = lazy(() => import("./pages/Virtual").then(module => ({ default: module.Virtual })));
const SummerProgram = lazy(() => import("./pages/SummerProgram").then(module => ({ default: module.SummerProgram })));

// Loading fallback
const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black text-white">
    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/in-person" element={<InPerson />} />
          <Route path="/virtual" element={<Virtual />} />
          <Route path="/summer-program" element={<SummerProgram />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
