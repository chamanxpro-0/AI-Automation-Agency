import { useState, useEffect } from "react";
import { useCountUp } from "@/hooks/useInView";
import { siteConfig } from "@/config/site";

interface SliderProps {
  label: string; value: number; min: number; max: number; step: number;
  prefix?: string; suffix?: string; onChange: (value: number) => void;
}

function Slider({ label, value, min, max, step, prefix = "", suffix = "", onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{label}</label>
        <span className="text-sm font-display font-medium" style={{ color: "var(--accent)" }}>
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--bg-primary) ${pct}%, var(--bg-primary) 100%)`,
          outline: "none",
        }}
      />
    </div>
  );
}

interface OutputCardProps {
  label: string; value: number; prefix?: string; suffix?: string;
  isCurrency?: boolean; highlight?: boolean; animate: boolean;
}

function OutputCard({ label, value, prefix = "", suffix = "", isCurrency = false, highlight = false, animate }: OutputCardProps) {
  const count = useCountUp(value, 200, 0, animate);
  const fmt = (n: number) => isCurrency
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
    : n.toLocaleString();

  return (
    <div 
      className="p-4 rounded-lg"
      style={{ 
        background: highlight ? "var(--accent-muted)" : "var(--bg-primary)",
        border: `1px solid ${highlight ? "var(--accent-border)" : "var(--border-primary)"}`
      }}
    >
      <p className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>{label}</p>
      <p className="text-xl font-display font-semibold" style={{ color: highlight ? "var(--accent)" : "var(--text-primary)" }}>
        {prefix}{fmt(count)}{suffix}
      </p>
    </div>
  );
}

export function ROICalculator() {
  const defaults = siteConfig.roiCalculator;
  const [hoursPerWeek, setHoursPerWeek] = useState(defaults.defaultHoursPerWeek);
  const [hourlyCost, setHourlyCost] = useState(defaults.defaultHourlyCost);
  const [peopleCount, setPeopleCount] = useState(defaults.defaultPeopleCount);
  const [animateOutputs, setAnimateOutputs] = useState(false);

  const hoursSaved = Math.round(hoursPerWeek * peopleCount * defaults.automationRate);
  const annualCurrent = hoursPerWeek * hourlyCost * peopleCount * 52;
  const annualAfter = Math.round(annualCurrent * (1 - defaults.automationRate));
  const annualSavings = annualCurrent - annualAfter;
  const monthlySavings = annualSavings / 12;
  const roiMonths = monthlySavings > 0 ? Math.round((defaults.implementationCost / monthlySavings) * 10) / 10 : 0;

  useEffect(() => {
    const timer = setTimeout(() => setAnimateOutputs(true), 100);
    return () => { clearTimeout(timer); setAnimateOutputs(false); };
  }, [hoursPerWeek, hourlyCost, peopleCount]);

  const roiColor = roiMonths < 3 ? "var(--success)" : roiMonths <= 6 ? "var(--accent-warm)" : "var(--text-primary)";

  return (
    <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="overline block mb-3" style={{ color: "var(--text-muted)" }}>ROI Calculator</span>
          <h2 className="font-display font-semibold mb-3" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            Calculate Your Savings
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            See how much time and money you could save by automating repetitive tasks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Sliders */}
          <div className="card">
            <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Your Current Setup
            </p>
            <div className="space-y-8">
              <Slider label="Hours per week on this task" value={hoursPerWeek} min={1} max={80} step={1} suffix=" hrs" onChange={setHoursPerWeek} />
              <Slider label="Average hourly cost (fully loaded)" value={hourlyCost} min={15} max={200} step={5} prefix="$" onChange={setHourlyCost} />
              <Slider label="Number of people doing this task" value={peopleCount} min={1} max={20} step={1} suffix=" people" onChange={setPeopleCount} />
            </div>
          </div>

          {/* Outputs */}
          <div>
            <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Projected Savings
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <OutputCard label="Hours saved/week" value={hoursSaved} suffix=" hrs" animate={animateOutputs} />
              <OutputCard label="Annual cost now" value={annualCurrent} isCurrency animate={animateOutputs} />
              <OutputCard label="Annual cost after" value={annualAfter} isCurrency animate={animateOutputs} />
              <OutputCard label="Annual savings" value={annualSavings} isCurrency highlight animate={animateOutputs} />
            </div>

            <div className="card mb-4">
              <p className="text-xs mb-2" style={{ color: "var(--text-tertiary)" }}>Payback Period</p>
              <p className="text-3xl font-display font-semibold" style={{ color: roiColor }}>
                {roiMonths} <span className="text-base font-normal" style={{ color: "var(--text-tertiary)" }}>months</span>
              </p>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                Based on ${defaults.implementationCost.toLocaleString()} implementation cost
              </p>
            </div>

            <a href="/contact" className="btn-primary w-full text-center text-sm">Start Saving &mdash; Book a Call</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ROICalculator;
