import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function Stack() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
      <section className="pt-32 pb-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-display font-semibold mb-5" style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Our Tech Stack</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>We work with industry-leading tools. If you use it, we probably know it.</p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {siteConfig.techStack.categories.map((cat) => (
            <div key={cat.name} className="mb-12 last:mb-0">
              <h3 className="text-xs uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{cat.name}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.tools.map((tool, i) => (
                  <motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="p-4 rounded-lg" style={{ background: "var(--bg-primary)", border: "1px solid var(--border-primary)" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{tool.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ color: tool.proficiency === "Expert" ? "var(--accent)" : "var(--text-muted)", background: tool.proficiency === "Expert" ? "var(--accent-muted)" : "transparent" }}>{tool.proficiency}</span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{tool.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="font-display font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Don&apos;t see your stack?</h3>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>We work with 50+ tools and can integrate with virtually any system that has an API.</p>
          <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">Message us on WhatsApp</a>
        </div>
      </section>
    </motion.div>
  );
}

export default Stack;
