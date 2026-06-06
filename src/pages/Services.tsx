import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/service-card/ServiceCard";
import { ROICalculator } from "@/components/roi-calculator/ROICalculator";
import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

const categories = ["All", "Workflow Automation", "AI Agents", "Data Pipelines", "Chatbots", "Custom Integrations"];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="overline block mb-3" style={{ color: "var(--text-muted)" }}>FAQ</span>
          <h2 className="font-display font-semibold" style={{ color: "var(--text-primary)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
            Common Questions
          </h2>
        </div>
        <div className="space-y-3">
          {siteConfig.faq.map((item, index) => (
            <div key={index} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="text-sm font-medium pr-4" style={{ color: "var(--text-primary)" }}>{item.question}</span>
                <span className="text-lg transition-transform duration-200 shrink-0" style={{ color: "var(--text-muted)", transform: openIndex === index ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openIndex === index ? "300px" : "0" }}>
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "All" ? siteConfig.services : siteConfig.services.filter((s) => s.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), { threshold: 0 });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-display font-semibold mb-5" style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            What We Build
          </h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            We don&apos;t just connect tools&mdash;we architect intelligent systems that transform how your business operates.
          </p>
        </div>
      </section>

      <div ref={sentinelRef} className="h-px" />

      {/* Filter */}
      <div className={`py-4 transition-all duration-200 ${isSticky ? "sticky top-16 z-30 glass" : ""}`} style={isSticky ? { borderBottom: "1px solid var(--border-primary)" } : {}}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className="px-4 py-2 rounded-md text-xs font-medium transition-all"
                style={{
                  background: activeCategory === c ? "var(--accent)" : "transparent",
                  color: activeCategory === c ? "white" : "var(--text-tertiary)",
                  border: `1px solid ${activeCategory === c ? "var(--accent)" : "var(--border-primary)"}`,
                }}
              >{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-sm" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 gap-5">
            {filtered.map((s, i) => (
              <motion.div key={s.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.18 }}>
                <ServiceCard service={s} index={i} detailed />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ROICalculator />
      <FAQAccordion />

      {/* CTA */}
      <section className="section-sm text-center" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-xl mx-auto px-6">
          <h3 className="font-display font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Still have questions?</h3>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>Let&apos;s talk about your project.</p>
          <Link to="/contact" className="btn-primary text-sm">Book a free call</Link>
        </div>
      </section>
    </motion.div>
  );
}

export default Services;
