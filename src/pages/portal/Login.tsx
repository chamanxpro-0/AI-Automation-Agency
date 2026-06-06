import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";

export function PortalLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email);
    if (result.success) setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg-primary)" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-semibold" style={{ background: "var(--accent)" }}>
              {siteConfig.agency.name.charAt(0)}
            </div>
            <span className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{siteConfig.agency.name}</span>
          </div>
        </div>

        <div className="card">
          {!sent ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-lg font-display font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Client Login</h1>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Enter your email for a secure login link.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required
                  className="w-full px-3.5 py-2.5 rounded-md text-sm border transition-colors focus:outline-none"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--border-primary)", color: "var(--text-primary)" }} />
                <button type="submit" disabled={loading} className="w-full btn-primary text-sm py-2.5 disabled:opacity-50">
                  {loading ? "Sending..." : "Send Login Link"}
                </button>
              </form>
              <p className="mt-4 text-center text-[10px]" style={{ color: "var(--text-muted)" }}>Demo: use <code className="px-1 py-0.5 rounded" style={{ background: "var(--bg-primary)" }}>demo@example.com</code></p>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "var(--accent-muted)" }}>
                <span style={{ color: "var(--accent)" }}>&#10003;</span>
              </div>
              <h2 className="text-base font-display font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Check your inbox</h2>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Link sent to {email}</p>
            </motion.div>
          )}
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-xs transition-colors hover:opacity-70" style={{ color: "var(--text-muted)" }}>&larr; Back to website</a>
        </div>
      </motion.div>
    </div>
  );
}

export default PortalLogin;
