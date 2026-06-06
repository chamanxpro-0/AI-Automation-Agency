import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface WorkflowNode { id: string; name: string; description: string; }
interface WorkflowEdge { from: string; to: string; label?: string; }

const defaultNodes: WorkflowNode[] = [
  { id: "lead", name: "Website Form", description: "New lead submits form" },
  { id: "enrich", name: "Apollo", description: "Enrich lead data" },
  { id: "qualify", name: "GPT-4", description: "AI qualification" },
  { id: "score", name: "Scoring", description: "Score 0-100" },
  { id: "high", name: "Calendly", description: "Auto-book meeting" },
  { id: "low", name: "Nurture", description: "Email sequence" },
];

const defaultEdges: WorkflowEdge[] = [
  { from: "lead", to: "enrich" },
  { from: "enrich", to: "qualify" },
  { from: "qualify", to: "score" },
  { from: "score", to: "high", label: "> 70" },
  { from: "score", to: "low", label: "< 70" },
];

const nodePositions: Record<string, { x: number; y: number }> = {
  lead: { x: 50, y: 100 }, enrich: { x: 200, y: 100 }, qualify: { x: 350, y: 100 },
  score: { x: 500, y: 100 }, high: { x: 650, y: 50 }, low: { x: 650, y: 150 },
};

export function WorkflowDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [drawnEdges, setDrawnEdges] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!inView) return;
    const animate = async () => {
      for (let i = 0; i < defaultNodes.length; i++) {
        await new Promise((r) => setTimeout(r, 300));
        setVisibleNodes((prev) => new Set([...prev, defaultNodes[i].id]));
        if (i < defaultNodes.length - 1) {
          await new Promise((r) => setTimeout(r, 400));
          const edge = defaultEdges.find((e) => e.from === defaultNodes[i].id);
          if (edge) setDrawnEdges((prev) => new Set([...prev, `${edge.from}-${edge.to}`]));
        }
      }
    };
    animate();
  }, [inView]);

  return (
    <section ref={ref} className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="overline block mb-3" style={{ color: "var(--text-muted)" }}>Example Workflow</span>
          <h2 className="font-display font-semibold mb-4" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            See How It Works
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            A real automation workflow we built for a SaaS client. This exact system saves them 14 hours per week.
          </p>
        </div>

        <div className="card p-6 md:p-8 overflow-hidden">
          {/* Mobile: vertical list */}
          <div className="lg:hidden space-y-3">
            {defaultNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -16 }}
                animate={visibleNodes.has(node.id) ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="p-4 rounded-lg cursor-default transition-colors"
                  style={{ 
                    background: hoveredNode === node.id ? "var(--bg-hover)" : "var(--bg-primary)",
                    border: "1px solid var(--border-primary)"
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{node.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{node.description}</p>
                    </div>
                  </div>
                </div>
                {index < defaultNodes.length - 1 && (
                  <div className="flex justify-center py-1.5">
                    <span style={{ color: "var(--accent)" }} className="text-lg">&darr;</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop: SVG */}
          <div className="hidden lg:block">
            <svg viewBox="0 0 750 200" className="w-full h-auto" style={{ minHeight: "200px" }}>
              {defaultEdges.map((edge) => {
                const from = nodePositions[edge.from], to = nodePositions[edge.to];
                if (!from || !to) return null;
                const sx = from.x + 60, sy = from.y, ex = to.x - 60, ey = to.y;
                const mid = (sx + ex) / 2;
                const path = `M ${sx} ${sy} C ${mid} ${sy}, ${mid} ${ey}, ${ex} ${ey}`;
                const len = Math.abs(ex - sx) + Math.abs(ey - sy);
                const isDrawn = drawnEdges.has(`${edge.from}-${edge.to}`);

                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <path d={path} fill="none" stroke="var(--border-primary)" strokeWidth="1.5"
                      strokeDasharray={len} strokeDashoffset={isDrawn ? 0 : len}
                      style={{ transition: "stroke-dashoffset 0.5s ease" }}
                    />
                    {edge.label && (
                      <text x={mid} y={Math.min(sy, ey) - 8} textAnchor="middle"
                        className="text-[10px]" style={{ fill: "var(--text-muted)" }}>{edge.label}</text>
                    )}
                  </g>
                );
              })}

              {defaultNodes.map((node) => {
                const pos = nodePositions[node.id];
                const vis = visibleNodes.has(node.id);
                return (
                  <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}
                    style={{ opacity: vis ? 1 : 0, transform: `translate(${pos.x}px, ${pos.y}px) scale(${vis ? 1 : 0.92})`, transition: "all 0.3s ease", cursor: "pointer" }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <rect x="-55" y="-26" width="110" height="52" rx="6"
                      fill={hoveredNode === node.id ? "var(--bg-hover)" : "var(--bg-primary)"}
                      stroke={hoveredNode === node.id ? "var(--accent)" : "var(--border-primary)"}
                      strokeWidth="1" style={{ transition: "all 0.2s ease" }}
                    />
                    <text x="0" y="-4" textAnchor="middle" style={{ fontSize: "13px", fontWeight: 500, fill: "var(--text-primary)" }}>{node.name}</text>
                    <text x="0" y="14" textAnchor="middle" style={{ fontSize: "10px", fill: "var(--text-tertiary)" }}>{node.description}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={visibleNodes.size === defaultNodes.length ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <span style={{ color: "var(--accent)" }} className="font-medium">
            This exact workflow saves our clients an average of 14 hours per week.
          </span>{" "}
          We built it in 3 days.
        </motion.p>
      </div>
    </section>
  );
}

export default WorkflowDiagram;
