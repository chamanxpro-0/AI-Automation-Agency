import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteConfig } from "@/config/site";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  company: z.string().min(1, "Company is required"),
  companySize: z.string().min(1, "Select company size"),
  industry: z.string().min(1, "Select an industry"),
  problem: z.string().min(10, "Please describe your problem (min 10 characters)"),
  budget: z.string().min(1, "Select a budget"),
  referralSource: z.string().min(1, "Select how you heard about us"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const opts = siteConfig.contactForm;

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log(data);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
      <section className="pt-32 pb-16" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-display font-semibold mb-5" style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>Let&apos;s Talk</h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>Tell us about your project. We&apos;ll get back within {siteConfig.contact.responseTime}.</p>
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="card">
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Name</label>
                    <input {...register("name")} type="text" placeholder="John Doe" className="w-full px-3.5 py-2.5 rounded-md text-sm border transition-colors focus:outline-none"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-primary)" }} />
                    {errors.name && <p className="text-xs mt-1" style={{ color: "var(--error)" }}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Business Email</label>
                    <input {...register("email")} type="email" placeholder="john@company.com" className="w-full px-3.5 py-2.5 rounded-md text-sm border transition-colors focus:outline-none"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-primary)" }} />
                    {errors.email && <p className="text-xs mt-1" style={{ color: "var(--error)" }}>{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Company</label>
                  <input {...register("company")} type="text" placeholder="Acme Inc." className="w-full px-3.5 py-2.5 rounded-md text-sm border transition-colors focus:outline-none"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-primary)" }} />
                  {errors.company && <p className="text-xs mt-1" style={{ color: "var(--error)" }}>{errors.company.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Company Size</label>
                    <select {...register("companySize")} className="w-full px-3.5 py-2.5 rounded-md text-sm border transition-colors focus:outline-none"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-primary)" }}>
                      <option value="">Select</option>
                      {opts.companySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.companySize && <p className="text-xs mt-1" style={{ color: "var(--error)" }}>{errors.companySize.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Industry</label>
                    <select {...register("industry")} className="w-full px-3.5 py-2.5 rounded-md text-sm border transition-colors focus:outline-none"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-primary)" }}>
                      <option value="">Select</option>
                      {opts.industries.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                    {errors.industry && <p className="text-xs mt-1" style={{ color: "var(--error)" }}>{errors.industry.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>What problem are you trying to solve?</label>
                  <textarea {...register("problem")} rows={4} placeholder="Describe the manual tasks or inefficiencies..." className="w-full px-3.5 py-2.5 rounded-md text-sm border transition-colors focus:outline-none resize-none"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-primary)" }} />
                  {errors.problem && <p className="text-xs mt-1" style={{ color: "var(--error)" }}>{errors.problem.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Estimated Monthly Budget</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {opts.budgetRanges.map((r) => (
                      <label key={r} className="cursor-pointer">
                        <input {...register("budget")} type="radio" value={r} className="sr-only peer" />
                        <div className="px-2 py-2 text-center text-xs rounded-md border transition-all peer-checked:bg-[var(--accent)] peer-checked:text-white peer-checked:border-[var(--accent)]"
                          style={{ borderColor: "var(--border-primary)", color: "var(--text-secondary)" }}>{r}</div>
                      </label>
                    ))}
                  </div>
                  {errors.budget && <p className="text-xs mt-1" style={{ color: "var(--error)" }}>{errors.budget.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>How did you hear about us?</label>
                  <select {...register("referralSource")} className="w-full px-3.5 py-2.5 rounded-md text-sm border transition-colors focus:outline-none"
                    style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-primary)" }}>
                    <option value="">Select</option>
                    {opts.referralSources.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.referralSource && <p className="text-xs mt-1" style={{ color: "var(--error)" }}>{errors.referralSource.message}</p>}
                </div>

                <button type="submit" disabled={submitting} className="w-full btn-primary text-sm py-3 disabled:opacity-50">
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ background: "var(--accent-muted)" }}>
                  <span className="text-xl" style={{ color: "var(--accent)" }}>&#10003;</span>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2" style={{ color: "var(--text-primary)" }}>We got your message!</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Expect a reply within {siteConfig.contact.responseTime} on weekdays.</p>
              </motion.div>
            )}
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>{siteConfig.contact.meetingLength} call</span>
            <span>&middot;</span>
            <span>No commitment</span>
            <span>&middot;</span>
            <span>Response within {siteConfig.contact.responseTime}</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Contact;
