import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ParticleField } from "./ParticleField";
import { useTypewriter, useReducedMotion } from "@/hooks/useInView";
import { siteConfig } from "@/config/site";

const rotatingWords = siteConfig.hero.rotatingWords;

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSubheadline, setShowSubheadline] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);
  const [displayWord, setDisplayWord] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const staticText = siteConfig.hero.headline;

  const { displayText: typedStatic, isComplete: staticComplete } = useTypewriter(
    staticText,
    40,
    true
  );

  // Word cycling
  useEffect(() => {
    if (!staticComplete || prefersReducedMotion) return;
    const word = rotatingWords[currentWordIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (displayWord.length > 0) {
        timeoutId = setTimeout(() => setDisplayWord((prev) => prev.slice(0, -1)), 35);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
      }
    } else {
      if (displayWord.length < word.length) {
        timeoutId = setTimeout(() => setDisplayWord((prev) => word.slice(0, prev.length + 1)), 55);
      } else {
        timeoutId = setTimeout(() => setIsDeleting(true), 2500);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [staticComplete, currentWordIndex, isDeleting, prefersReducedMotion, displayWord.length]);

  useEffect(() => {
    if (staticComplete && !showSubheadline) {
      const t = setTimeout(() => setShowSubheadline(true), 500);
      return () => clearTimeout(t);
    }
  }, [staticComplete, showSubheadline]);

  useEffect(() => {
    if (showSubheadline && !showCTAs) {
      const t = setTimeout(() => setShowCTAs(true), 300);
      return () => clearTimeout(t);
    }
  }, [showSubheadline, showCTAs]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayWord(rotatingWords[0]);
      setShowSubheadline(true);
      setShowCTAs(true);
    }
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField className="z-0" />
      <div className="absolute inset-0 grid-overlay z-[1] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-20 text-center">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="overline" style={{ color: "var(--text-tertiary)" }}>
            AI Automation Agency
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-semibold leading-[1.1] tracking-tight mb-8" style={{ color: "var(--text-primary)", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
          <span className="block">
            {typedStatic}
            {!staticComplete && (
              <span className="cursor-blink inline-block w-[2px] h-[0.85em] ml-1 align-middle" style={{ background: "var(--text-primary)" }} />
            )}
          </span>
          {staticComplete && (
            <span className="block mt-2" style={{ color: "var(--accent)" }}>
              {displayWord}
              <span className="cursor-blink inline-block w-[2px] h-[0.85em] ml-1 align-middle" style={{ background: "var(--accent)" }} />
            </span>
          )}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showSubheadline ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {siteConfig.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showCTAs ? 1 : 0, y: showCTAs ? 0 : 12 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="btn-primary text-sm px-7 py-3">
            Book a strategy call
          </Link>
          <Link to="/case-studies" className="btn-outline text-sm px-7 py-3">
            View our work
          </Link>
        </motion.div>

        {/* Trust indicators - minimal, text only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showCTAs ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {["Make Certified Partner", "OpenAI Verified Developer", "100+ Automations Delivered"].map((item) => (
            <span key={item} className="text-xs" style={{ color: "var(--text-muted)" }}>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-[5] pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
      />
    </section>
  );
}

export default HeroSection;
