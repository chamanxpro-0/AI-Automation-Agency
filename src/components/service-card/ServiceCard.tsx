import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    deliverables: string[];
    timeline: string;
    priceRange: string;
    tools: string[];
    features?: string[];
  };
  index?: number;
  detailed?: boolean;
}

export function ServiceCard({ service, index = 0, detailed = false }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);
    setTransform({ rotateX: -ny * 6, rotateY: nx * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  if (detailed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="card"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-display font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {service.name}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{service.description}</p>
          </div>
          <span className="tag" style={{ color: "var(--text-tertiary)" }}>{service.timeline}</span>
        </div>

        {service.features && (
          <div className="mb-5">
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Deliverables</p>
            <ul className="space-y-1.5">
              {service.features.map((f, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent)" }}>+</span> {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-5">
          {service.tools.map((t) => (
            <span key={t} className="tag" style={{ color: "var(--text-tertiary)" }}>{t}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border-primary)" }}>
          <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>{service.priceRange}</span>
          <Link to={`/contact?service=${service.id}`} className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: "var(--text-primary)" }}>
            Get started &rarr;
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={isTouchDevice ? undefined : handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="tilt-card"
      style={{
        transform: `perspective(800px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: isHovered ? "none" : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="card h-full relative overflow-hidden">
        {isHovered && !isTouchDevice && (
          <div
            className="absolute w-[250px] h-[250px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)",
              left: "50%", top: "50%", transform: "translate(-50%, -50%)", filter: "blur(50px)", opacity: 0.6,
            }}
          />
        )}
        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {service.deliverables.map((d) => (
              <span key={d} className="tag" style={{ color: "var(--text-tertiary)" }}>{d}</span>
            ))}
          </div>
          <h3 className="text-lg font-display font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            {service.name}
          </h3>
          <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {service.shortDescription}
          </p>
          <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border-primary)" }}>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{service.timeline}</span>
            <Link to="/services" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-primary)" }}>
              Learn more &rarr;
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ServiceCard;
