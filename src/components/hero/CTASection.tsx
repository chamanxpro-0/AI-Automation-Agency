import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function CTASection() {
  return (
    <section className="section-lg relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      {/* Subtle gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, var(--accent-muted) 0%, transparent 60%)" }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="font-display font-semibold mb-5 leading-tight"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Ready to stop doing manually{" "}
            <span style={{ color: "var(--accent)" }}>what machines can do?</span>
          </h2>

          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Book a free strategy call. We&apos;ll analyze your workflows and show you exactly where automation can save you time and money.
          </p>

          <Link to="/contact" className="btn-primary text-sm px-8 py-3.5">
            Book a free strategy call
          </Link>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>{siteConfig.contact.meetingLength} call</span>
            <span>&middot;</span>
            <span>No commitment</span>
            <span>&middot;</span>
            <span>Response within {siteConfig.contact.responseTime}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
