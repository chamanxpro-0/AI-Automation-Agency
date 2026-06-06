import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function Testimonials() {
  const testimonials = siteConfig.testimonials;

  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="overline block mb-3" style={{ color: "var(--text-muted)" }}>Testimonials</span>
          <h2 className="font-display font-semibold" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            What Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card"
            >
              <blockquote className="text-base leading-relaxed mb-6" style={{ color: "var(--text-primary)" }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border-primary)" }}>
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ background: "var(--accent)" }}
                >
                  {t.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{t.author}</p>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{t.role}, {t.company}</p>
                </div>
              </div>
              <p className="text-xs mt-4 font-medium" style={{ color: "var(--accent)" }}>
                Result: {t.outcome}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { label: "Average rating", value: "4.9/5" },
              { label: "Clients served", value: "89+" },
              { label: "Would recommend", value: "98%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-display font-semibold text-lg" style={{ color: "var(--text-primary)" }}>{stat.value}</span>
                <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
