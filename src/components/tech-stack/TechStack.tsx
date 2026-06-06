import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function TechStack() {
  const categories = siteConfig.techStack.categories;

  return (
    <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="overline block mb-3" style={{ color: "var(--text-muted)" }}>Our Expertise</span>
          <h2 className="font-display font-semibold mb-4" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            Tools We Master
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            We work with the best automation and AI tools in the industry.
          </p>
        </div>

        <div className="space-y-14">
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-medium mb-4" style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>
                {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: toolIndex * 0.03 }}
                    className="group"
                  >
                    <div 
                      className="p-4 rounded-lg transition-all duration-200"
                      style={{ 
                        background: "var(--bg-primary)", 
                        border: "1px solid var(--border-primary)" 
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                          {tool.name}
                        </span>
                        <span 
                          className="text-[10px] px-1.5 py-0.5 rounded"
                          style={{ 
                            color: tool.proficiency === "Expert" ? "var(--accent)" : "var(--text-muted)",
                            background: tool.proficiency === "Expert" ? "var(--accent-muted)" : "transparent"
                          }}
                        >
                          {tool.proficiency}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{tool.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 pt-12" style={{ borderTop: "1px solid var(--border-primary)" }}>
          <p className="text-center text-xs mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            CERTIFIED & VERIFIED
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {siteConfig.certifications.map((cert) => (
              <div key={cert.name} className="text-center">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{cert.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{cert.issuer} &middot; {cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
