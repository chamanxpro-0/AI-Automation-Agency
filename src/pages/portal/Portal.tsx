import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth, ProtectedRoute } from "@/context/AuthContext";

type Tab = "overview" | "deliverables" | "communication" | "invoices";

function StatusIcon({ status }: { status: string }) {
  if (status === "Complete") return <span style={{ color: "var(--success)" }}>&#10003;</span>;
  if (status === "In Progress") return <span style={{ color: "var(--accent-warm)" }}>&#9733;</span>;
  return <span style={{ color: "var(--text-muted)" }}>&#9675;</span>;
}

function PortalContent() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  if (!user) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "deliverables", label: "Deliverables" },
    { id: "communication", label: "Messages" },
    { id: "invoices", label: "Invoices" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <header className="sticky top-0 z-30 glass" style={{ borderBottom: "1px solid var(--border-primary)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-semibold" style={{ background: "var(--accent)" }}>N</div>
              <span className="font-display font-medium text-sm hidden sm:block" style={{ color: "var(--text-primary)" }}>Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{user.name}</p>
                <p className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>{user.company}</p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: "var(--accent)" }}>
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <button onClick={logout} className="text-xs px-2 py-1 rounded transition-colors" style={{ color: "var(--text-muted)" }}>Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="sticky top-14 z-20" style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border-primary)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-0 -mb-px overflow-x-auto">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className="px-4 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap"
                style={{ borderColor: activeTab === t.id ? "var(--accent)" : "transparent", color: activeTab === t.id ? "var(--accent)" : "var(--text-tertiary)" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <section>
              <h2 className="text-sm font-display font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Active Projects</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {user.projects.map((p) => (
                  <div key={p.id} className="card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{p.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>{p.description}</p>
                      </div>
                      <span className="tag text-[10px]">{p.phase}</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span style={{ color: "var(--text-muted)" }}>Progress</span>
                        <span style={{ color: "var(--text-primary)" }}>{p.progress}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-primary)" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${p.progress}%`, background: "var(--accent)" }} />
                      </div>
                    </div>
                    <p className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>Next: {p.nextMilestone} ({p.nextMilestoneDate})</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-display font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Timeline</h2>
              <div className="card">
                <div className="space-y-4">
                  {user.timeline.map((m, i) => (
                    <div key={m.id} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <StatusIcon status={m.status} />
                        {i < user.timeline.length - 1 && <div className="w-px flex-1 min-h-[24px] mt-1" style={{ background: "var(--border-primary)" }} />}
                      </div>
                      <div className="flex-1 pb-3">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{m.date}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ color: m.status === "Complete" ? "var(--success)" : m.status === "In Progress" ? "var(--accent-warm)" : "var(--text-muted)", background: "var(--bg-primary)" }}>{m.status}</span>
                        </div>
                        <h4 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{m.name}</h4>
                        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "deliverables" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card" style={{ padding: 0 }}>
              {user.deliverables.map((d, i) => (
                <div key={d.id} className="flex items-center justify-between p-4" style={{ borderBottom: i < user.deliverables.length - 1 ? "1px solid var(--border-primary)" : "none" }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{d.name}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{d.date}</p>
                  </div>
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: "var(--accent)" }}>View</a>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "communication" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {user.messages.map((msg) => (
              <div key={msg.id} className="card">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ background: "var(--accent)" }}>
                    {msg.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{msg.author}</span>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{new Date(msg.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "invoices" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="grid grid-cols-12 gap-4 p-4 text-[10px] uppercase tracking-wider font-medium" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-primary)" }}>
                <div className="col-span-4">Invoice</div>
                <div className="col-span-3">Date</div>
                <div className="col-span-3">Amount</div>
                <div className="col-span-2">Status</div>
              </div>
              {user.invoices.map((inv) => (
                <div key={inv.id} className="grid grid-cols-12 gap-4 p-4 items-center" style={{ borderBottom: "1px solid var(--border-secondary)" }}>
                  <div className="col-span-4 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{inv.number}</div>
                  <div className="col-span-3 text-xs" style={{ color: "var(--text-secondary)" }}>{inv.date}</div>
                  <div className="col-span-3 text-sm" style={{ color: "var(--text-primary)" }}>${inv.amount.toLocaleString()}</div>
                  <div className="col-span-2">
                    <span className="text-xs" style={{ color: inv.status === "Paid" ? "var(--success)" : inv.status === "Due" ? "var(--accent-warm)" : "var(--error)" }}>{inv.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export function Portal() {
  return (
    <ProtectedRoute>
      <PortalContent />
    </ProtectedRoute>
  );
}

export default Portal;
