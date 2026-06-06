import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPosition } from "@/hooks/useInView";
import { useTheme } from "@/context/ThemeContext";
import { siteConfig } from "@/config/site";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const { isScrolled } = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const isHomePage = location.pathname === "/";
  const isScrolledState = isScrolled || !isHomePage;

  useEffect(() => {
    if (hoveredLink && linkRefs.current.has(hoveredLink)) {
      const link = linkRefs.current.get(hoveredLink);
      if (link && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        setUnderlineStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    }
  }, [hoveredLink]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolledState
            ? "glass border-b" 
            : ""
        }`}
        style={{ borderColor: isScrolledState ? "var(--border-primary)" : "transparent" }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80"
            >
              <div 
                className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-semibold"
                style={{ background: "var(--accent)" }}
              >
                {siteConfig.agency.name.charAt(0)}
              </div>
              <span 
                className="font-display font-semibold text-sm tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {siteConfig.agency.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 relative">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  ref={(el) => { if (el) linkRefs.current.set(link.href, el); }}
                  to={link.href}
                  className="relative px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-200"
                  style={{ 
                    color: isActive(link.href) ? "var(--accent)" : "var(--text-secondary)" 
                  }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-3 right-3 h-px"
                      style={{ background: "var(--accent)" }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              ))}

              {/* Hover underline */}
              {hoveredLink && !isActive(hoveredLink) && (
                <motion.div
                  className="absolute -bottom-0.5 h-px"
                  style={{ background: "var(--text-tertiary)" }}
                  initial={false}
                  animate={{ left: underlineStyle.left + 12, width: underlineStyle.width - 24 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md transition-colors duration-200"
                style={{ color: "var(--text-tertiary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* CTA */}
              <Link
                to="/contact"
                className="hidden md:inline-flex btn-primary text-xs px-4 py-2"
              >
                Book a call
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2"
                style={{ color: "var(--text-primary)" }}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-3.5">
                  <motion.span
                    className="absolute left-0 w-5 h-px rounded-full"
                    style={{ background: "var(--text-primary)" }}
                    animate={{
                      top: isMobileMenuOpen ? "50%" : "0%",
                      rotate: isMobileMenuOpen ? 45 : 0,
                      translateY: isMobileMenuOpen ? "-50%" : "0%",
                    }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-px rounded-full"
                    style={{ background: "var(--text-primary)", opacity: isMobileMenuOpen ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    className="absolute left-0 w-5 h-px rounded-full"
                    style={{ background: "var(--text-primary)" }}
                    animate={{
                      bottom: isMobileMenuOpen ? "50%" : "0%",
                      rotate: isMobileMenuOpen ? -45 : 0,
                      translateY: isMobileMenuOpen ? "50%" : "0%",
                    }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] z-50 lg:hidden"
              style={{ 
                background: "var(--bg-secondary)", 
                borderLeft: "1px solid var(--border-primary)" 
              }}
            >
              <div className="flex flex-col h-full pt-20 pb-6 px-6">
                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                    >
                      <Link
                        to={link.href}
                        className="block py-3 text-base font-medium transition-colors"
                        style={{ 
                          color: isActive(link.href) ? "var(--accent)" : "var(--text-primary)" 
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border-primary)" }}>
                  <Link to="/portal" className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                    Client Portal
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
