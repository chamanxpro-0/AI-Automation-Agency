import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/hero/HeroSection";
import { ROITicker } from "@/components/roi-calculator/ROITicker";
import { ServiceCard } from "@/components/service-card/ServiceCard";
import { WorkflowDiagram } from "@/components/workflow-diagram/WorkflowDiagram";
import { TechStack } from "@/components/tech-stack/TechStack";
import { CaseStudyCard } from "@/components/case-study-card/CaseStudyCard";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { CTASection } from "@/components/hero/CTASection";
import { siteConfig } from "@/config/site";

function ServicesPreview() {
  const services = siteConfig.services.slice(0, 3);
  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="overline block mb-3" style={{ color: "var(--text-muted)" }}>What We Build</span>
            <h2 className="font-display font-semibold mb-3" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
              Our Services
            </h2>
            <p className="text-base max-w-lg" style={{ color: "var(--text-secondary)" }}>
              Custom automation solutions designed to save time, reduce costs, and scale your operations.
            </p>
          </div>
          <Link to="/services" className="text-sm font-medium transition-opacity hover:opacity-70 shrink-0" style={{ color: "var(--text-primary)" }}>
            View all services &rarr;
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesPreview() {
  const caseStudies = siteConfig.caseStudies.slice(0, 3);
  return (
    <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="overline block mb-3" style={{ color: "var(--text-muted)" }}>Case Studies</span>
            <h2 className="font-display font-semibold mb-3" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
              Proven Results
            </h2>
            <p className="text-base max-w-lg" style={{ color: "var(--text-secondary)" }}>
              Real automation projects with real ROI.
            </p>
          </div>
          <Link to="/case-studies" className="text-sm font-medium transition-opacity hover:opacity-70 shrink-0" style={{ color: "var(--text-primary)" }}>
            View all case studies &rarr;
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((cs, i) => <CaseStudyCard key={cs.slug} caseStudy={cs} index={i} />)}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
      <HeroSection />
      <ROITicker />
      <ServicesPreview />
      <WorkflowDiagram />
      <TechStack />
      <CaseStudiesPreview />
      <Testimonials />
      <CTASection />
    </motion.div>
  );
}

export default Home;
