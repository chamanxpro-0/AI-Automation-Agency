import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navigation } from "@/components/nav/Navigation";
import { Footer } from "@/components/nav/Footer";
import { TerminalPreloader } from "@/components/preloader/TerminalPreloader";

import { Home } from "@/pages/Home";
import { Services } from "@/pages/Services";
import { CaseStudies } from "@/pages/CaseStudies";
import { Process } from "@/pages/Process";
import { Stack } from "@/pages/Stack";
import { About } from "@/pages/About";
import { Blog } from "@/pages/Blog";
import { Contact } from "@/pages/Contact";
import { PortalLogin } from "@/pages/portal/Login";
import { Portal } from "@/pages/portal/Portal";
import { PortalVerify } from "@/pages/portal/Verify";

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(dh > 0 ? Math.min(Math.max(st / dh, 0), 1) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    setProgress(0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]">
      <motion.div style={{ scaleX: progress, transformOrigin: "left" }} className="h-full" transition={{ duration: 0.1 }}
        // Use inline gradient since CSS var doesn't work well here
        // The accent color from CSS var
      >
        <div className="h-full w-full" style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-warm))" }} />
      </motion.div>
    </div>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

function AppContent() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("preloader_shown") === "true") {
      setShowPreloader(false);
      setPreloaderDone(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setPreloaderDone(true);
  };

  const isPortal = location.pathname.startsWith("/portal");

  return (
    <>
      {showPreloader && <TerminalPreloader onComplete={handlePreloaderComplete} />}
      {preloaderDone && (
        <>
          {!isPortal && <ScrollProgressBar />}
          {!isPortal && <Navigation />}
          <div className={!isPortal ? "pt-16" : ""}>
            <Routes location={location}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
              <Route path="/process" element={<PageTransition><Process /></PageTransition>} />
              <Route path="/stack" element={<PageTransition><Stack /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/portal/login" element={<PortalLogin />} />
              <Route path="/portal/verify" element={<PortalVerify />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
                  <div className="text-center">
                    <h1 className="text-5xl font-display font-semibold mb-3" style={{ color: "var(--text-primary)" }}>404</h1>
                    <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>Page not found</p>
                    <a href="/" className="btn-primary text-sm">Go home</a>
                  </div>
                </div>
              } />
            </Routes>
          </div>
          {!isPortal && <Footer />}
        </>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
