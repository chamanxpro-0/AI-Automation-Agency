import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { CaseStudyCard } from "@/components/case-study-card/CaseStudyCard";
import { siteConfig as config } from "@/config/site";

const industries = config.industries;

export function CaseStudies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndustry, setActiveIndustry] = useState(searchParams.get("industry")?.replace(/^\w/, (c) => c.toUpperCase()) || "All Industries");

  const filtered = activeIndustry === "All Industries" ? config.caseStudies : config.caseStudies.filter((cs) => cs.industry === activeIndustry);

  useEffect(() => {
    if (activeIndustry === "All Industries") setSearchParams({});
    else setSearchParams({ industry: activeIndustry.toLowerCase() });
  }, [activeIndustry, setSearchParams]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="pt-32 pb-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-display font-semibold mb-5" style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Case Studies</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>Real automation projects with real results.</p>
        </div>
      </section>

      <section className="py-5" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)", borderBottom: "1px solid var(--border-primary)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {industries.map((ind) => {
              const isActive = activeIndustry === ind;
              const btnStyle: React.CSSProperties = {
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "white" : "var(--text-tertiary)",
                border: isActive ? "1px solid var(--accent)" : "1px solid var(--border-primary)",
              };
              return (
                <button key={ind} onClick={() => setActiveIndustry(ind)}
                  className="px-4 py-2 rounded-md text-xs font-medium transition-all"
                  style={btnStyle}
                >{ind}</button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((cs, i) => (
              <motion.div key={cs.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.18, delay: i * 0.04 }}>
                <CaseStudyCard caseStudy={cs} index={i} />
              </motion.div>
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p style={{ color: "var(--text-secondary)" }}>No case studies found for this industry.</p>
              <button onClick={() => setActiveIndustry("All Industries")} className="mt-4 text-sm" style={{ color: "var(--accent)" }}>View all</button>
            </div>
          )}
        </div>
      </section>

      {filtered.length > 0 && (
        <section className="section-sm" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <CaseStudyCard caseStudy={filtered[0]} featured />
          </div>
        </section>
      )}
    </motion.div>
  );
}

export default CaseStudies;
