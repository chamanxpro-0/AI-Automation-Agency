import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export function PortalVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyMagicLink } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      if (!email || !token) { setStatus("error"); return; }
      const success = await verifyMagicLink(email, token);
      if (success) {
        setStatus("success");
        setTimeout(() => navigate("/portal"), 1500);
      } else { setStatus("error"); }
    };
    verify();
  }, [email, token, verifyMagicLink, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg-primary)" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm text-center">
        <div className="card">
          {status === "loading" && (
            <>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "var(--accent-muted)" }}>
                <span className="animate-spin text-sm" style={{ color: "var(--accent)" }}>&#8635;</span>
              </div>
              <h2 className="text-base font-display font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Verifying...</h2>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Please wait</p>
            </>
          )}
          {status === "success" && (
            <>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "var(--accent-muted)" }}>
                <span style={{ color: "var(--accent)" }}>&#10003;</span>
              </div>
              <h2 className="text-base font-display font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Login successful</h2>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Redirecting...</p>
            </>
          )}
          {status === "error" && (
            <>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "rgba(201, 123, 123, 0.1)" }}>
                <span style={{ color: "var(--error)" }}>&#10007;</span>
              </div>
              <h2 className="text-base font-display font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Invalid or expired link</h2>
              <p className="text-xs mb-5" style={{ color: "var(--text-tertiary)" }}>Please request a new one.</p>
              <a href="/portal/login" className="btn-primary text-sm">Request new link</a>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default PortalVerify;
