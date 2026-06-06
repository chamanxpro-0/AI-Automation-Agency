import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/useInView";

interface CaseStudyCardProps {
  caseStudy: {
    slug: string; industry: string; title: string; problem: string;
    solution: string; before: string; after: string;
    metrics: { timeSaved: string; costReduced: string; roi: string; satisfaction: string; };
    tools: string[]; timeline: string;
  };
  index?: number; featured?: boolean;
}

export function CaseStudyCard({ caseStudy, index = 0, featured = false }: CaseStudyCardProps) {
  const { ref } = useInView<HTMLDivElement>({ threshold: 0.2 });

  if (featured) {
    return (
      <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="card overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-6 md:p-8">
            <span className="tag mb-4 inline-block">{caseStudy.industry}</span>
            <h3 className="text-2xl font-display font-semibold mb-4" style={{ color: "var(--text-primary)" }}>{caseStudy.title}</h3>
            <div className="space-y-3 mb-6">
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}><span style={{ color: "var(--text-muted)" }}>Problem: </span>{caseStudy.problem}</p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}><span style={{ color: "var(--text-muted)" }}>Solution: </span>{caseStudy.solution}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {caseStudy.tools.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            <Link to={`/case-studies/${caseStudy.slug}`} className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "var(--text-primary)" }}>
              Read full case study &rarr;
            </Link>
          </div>
          <div className="p-6 md:p-8" style={{ background: "var(--bg-primary)" }}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "hours saved/week", value: caseStudy.metrics.timeSaved },
                { label: "cost reduced/month", value: caseStudy.metrics.costReduced },
                { label: "ROI", value: caseStudy.metrics.roi },
                { label: "satisfaction", value: `${caseStudy.metrics.satisfaction}%` },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-display font-semibold" style={{ color: "var(--accent)" }}>{m.value}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="card group">
      <span className="tag mb-3 inline-block">{caseStudy.industry}</span>
      <h3 className="text-lg font-display font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{caseStudy.title}</h3>
      <div className="space-y-2 mb-4">
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}><span style={{ color: "var(--error)" }}>Before:</span> <span style={{ color: "var(--text-secondary)" }}>{caseStudy.before}</span></p>
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}><span style={{ color: "var(--success)" }}>After:</span> <span style={{ color: "var(--text-secondary)" }}>{caseStudy.after}</span></p>
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.entries(caseStudy.metrics).slice(0, 2).map(([k, v]) => (
          <span key={k} className="tag" style={{ color: "var(--text-tertiary)" }}>{v}</span>
        ))}
      </div>
      <Link to={`/case-studies/${caseStudy.slug}`} className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "var(--text-primary)" }}>
        Read the full story &rarr;
      </Link>
    </motion.div>
  );
}

export default CaseStudyCard;
