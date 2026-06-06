import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

const footerLinks = {
  Services: [
    { label: "Workflow Automation", href: "/services" },
    { label: "AI Agents", href: "/services" },
    { label: "Data Pipelines", href: "/services" },
    { label: "Chatbots", href: "/services" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Process", href: "/process" },
    { label: "Blog", href: "/blog" },
  ],
  Connect: [
    { label: "Contact", href: "/contact" },
    { label: "Client Portal", href: "/portal" },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-primary)" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                {siteConfig.agency.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-tertiary)" }}>
              {siteConfig.agency.description}
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border-secondary)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} {siteConfig.agency.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(siteConfig.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs capitalize transition-colors duration-200 hover:text-[var(--text-primary)]"
                style={{ color: "var(--text-muted)" }}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
