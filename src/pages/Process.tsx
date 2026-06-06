import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

const phases = siteConfig.process.phases;

export function Process() {
  const [activePhase, setActivePhase] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => { if (activePhase < phases.length - 1) { setDirection(1); setActivePhase((p) => p + 1); } };
  const handlePrev = () => { if (activePhase > 0) { setDirection(-1); setActivePhase((p) => p - 1); } };
  const goTo = (i: number) => { setDirection(i > activePhase ? 1 : -1); setActivePhase(i); };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") handleNext(); if (e.key === "ArrowLeft") handlePrev(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activePhase]);

  const current = phases[activePhase];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <section className="pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-display font-semibold mb-5" style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Our Process</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>A proven 4-phase approach to building automation that delivers results.</p>
        </div>
      </section>

      {/* Progress */}
      <section className="py-6 sticky top-16 z-20 glass" style={{ borderBottom: "1px solid var(--border-primary)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" style={{ background: "var(--border-primary)" }} />
            <motion.div className="absolute top-1/2 left-0 h-px -translate-y-1/2 origin-left" style={{ background: "var(--accent)" }}
              initial={{ scaleX: 0 }} animate={{ scaleX: activePhase / (phases.length - 1) }} transition={{ duration: 0.3 }}
            />
            <div className="relative flex justify-between">
              {phases.map((p, i) => (
                <button key={p.id} onClick={() => goTo(i)} className="flex flex-col items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all"
                    style={{
                      background: i <= activePhase ? "var(--accent)" : "var(--bg-tertiary)",
                      color: i <= activePhase ? "white" : "var(--text-tertiary)",
                      border: `1px solid ${i === activePhase ? "var(--accent)" : "var(--border-primary)"}`,
                    }}
                  >{i + 1}</div>
                  <span className="text-[10px] hidden sm:block" style={{ color: i === activePhase ? "var(--accent)" : "var(--text-tertiary)" }}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 min-h-[450px]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={activePhase} initial={{ opacity: 0, x: direction * 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -30 }} transition={{ duration: 0.25 }} className="card">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0" style={{ background: "var(--accent-muted)", color: "var(--accent)" }}>
                  {activePhase + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-display font-semibold" style={{ color: "var(--text-primary)" }}>{current.name}</h2>
                    <span className="tag text-[10px]">{current.duration}</span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{current.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>What You Do</p>
                  <ul className="space-y-2">
                    {current.clientActions.map((a, i) => (
                      <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--text-muted)" }}>{i + 1}.</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>What We Do</p>
                  <ul className="space-y-2">
                    {current.agencyActions.map((a, i) => (
                      <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                        <span style={{ color: "var(--accent)" }}>+</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 flex flex-wrap gap-2" style={{ borderTop: "1px solid var(--border-primary)" }}>
                {current.deliverables.map((d, i) => <span key={i} className="tag">{d}</span>)}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <button onClick={handlePrev} disabled={activePhase === 0} className="text-sm font-medium transition-opacity disabled:opacity-30" style={{ color: "var(--text-primary)" }}>&larr; Previous</button>
            <div className="flex gap-1.5">
              {phases.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: i === activePhase ? "var(--accent)" : "var(--border-primary)", width: i === activePhase ? "1.25rem" : "0.375rem" }} />
              ))}
            </div>
            <button onClick={handleNext} disabled={activePhase === phases.length - 1} className="text-sm font-medium transition-opacity disabled:opacity-30" style={{ color: "var(--text-primary)" }}>Next &rarr;</button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Process;
