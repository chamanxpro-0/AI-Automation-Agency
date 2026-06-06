import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useCountUp, useInView } from "@/hooks/useInView";

function Credentials() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const creds = [
    { value: 3, suffix: "+", label: "Years in automation" },
    { value: 47, suffix: "", label: "Automations built" },
    { value: 12, suffix: "", label: "Countries served" },
    { value: 89, suffix: "+", label: "Happy clients" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {creds.map((c, i) => {
        const count = useCountUp(c.value, 2000, 0, inView);
        return (
          <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card text-center">
            <p className="text-2xl md:text-3xl font-display font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{count}{c.suffix}</p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{c.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function PhilosophyCards() {
  const items = [
    { title: "Rapid Response", desc: "We respond to all client messages within 2 hours during business hours." },
    { title: "Clear Communication", desc: "No jargon, no fluff. We explain everything in plain English." },
    { title: "Unlimited Revisions", desc: "We keep refining until you're 100% satisfied with the result." },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="card">
          <div className="w-8 h-8 rounded-md mb-4 flex items-center justify-center text-xs font-semibold" style={{ background: "var(--accent-muted)", color: "var(--accent)" }}>{i + 1}</div>
          <h3 className="text-base font-display font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function About() {
  const founder = siteConfig.founder;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
      <section className="pt-32 pb-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="overline block mb-4" style={{ color: "var(--text-muted)" }}>Our Story</span>
              <h1 className="font-display font-semibold mb-6" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
                Why I Started {siteConfig.agency.name}
              </h1>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {founder.bio.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: "var(--accent)" }}>
                  {founder.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{founder.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{founder.role}</p>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: "var(--bg-tertiary)" }}>
              <h2 className="text-lg font-display font-semibold mb-5" style={{ color: "var(--text-primary)" }}>Our Manifesto</h2>
              <ul className="space-y-4">
                {founder.manifesto.map((s, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm" style={{ color: "var(--text-primary)" }}>
                    <span className="w-0.5 h-5 rounded-full shrink-0 mt-0.5" style={{ background: "var(--accent)" }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-semibold mb-2" style={{ color: "var(--text-primary)", fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>By The Numbers</h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Our track record speaks for itself.</p>
          </div>
          <Credentials />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-semibold mb-2" style={{ color: "var(--text-primary)", fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>Working With Us</h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>What you can expect when you partner with us.</p>
          </div>
          <PhilosophyCards />
        </div>
      </section>
    </motion.div>
  );
}

export default About;
