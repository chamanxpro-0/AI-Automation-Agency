import { useInView, useCountUp } from "@/hooks/useInView";
import { siteConfig } from "@/config/site";

function MetricItem({ value, prefix, suffix, label, inView, isCurrency }: {
  value: number; prefix?: string; suffix?: string; label: string;
  inView: boolean; isCurrency?: boolean;
}) {
  const count = useCountUp(value, 2000, 0, inView);

  const formatNumber = (num: number) => {
    if (isCurrency) {
      return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", maximumFractionDigits: 0, notation: num >= 1000000 ? "compact" : "standard",
      }).format(num);
    }
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="text-center">
      <div className="font-display font-semibold tracking-tight mb-1" style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
        {prefix}{formatNumber(count)}{suffix}
      </div>
      <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>{label}</div>
    </div>
  );
}

export function ROITicker() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const metrics = siteConfig.roiMetrics;

  return (
    <section ref={ref} className="section-sm" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)", borderBottom: "1px solid var(--border-primary)" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <MetricItem value={metrics.hoursSaved} suffix="+" label="Hours saved" inView={inView} />
          <MetricItem value={metrics.costReduction} prefix="$" label="Cost reduction" inView={inView} isCurrency />
          <MetricItem value={metrics.automationsBuilt} label="Automations built" inView={inView} />
          <MetricItem value={metrics.clientsServed} suffix="+" label="Clients served" inView={inView} />
        </div>
      </div>
    </section>
  );
}

export default ROITicker;
