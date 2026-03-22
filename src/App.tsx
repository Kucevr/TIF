import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { ContactUs } from "./pages/ContactUs";
import { FaqPage } from "./pages/FaqPage";
import { InPerson } from "./pages/InPerson";
import { Virtual } from "./pages/Virtual";
import { SummerProgram } from "./pages/SummerProgram";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/in-person" element={<InPerson />} />
        <Route path="/virtual" element={<Virtual />} />
        <Route path="/summer-program" element={<SummerProgram />} />
      </Routes>
    </Router>
  );
}

export default App;
