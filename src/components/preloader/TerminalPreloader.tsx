import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useInView";
import { siteConfig } from "@/config/site";

interface TerminalPreloaderProps {
  onComplete: () => void;
}

interface TerminalLine {
  text: string;
  showCheckmark?: boolean;
}

const terminalLines: TerminalLine[] = [
  { text: "initializing agency_os v2.6.1" },
  { text: "loading automation modules...", showCheckmark: true },
  { text: "connecting to client database...", showCheckmark: true },
  { text: "running diagnostics...", showCheckmark: true },
  { text: "all systems operational" },
  { text: `launching ${siteConfig.agency.name}...` },
];

export function TerminalPreloader({ onComplete }: TerminalPreloaderProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const typeNextChar = useCallback(() => {
    if (currentLineIndex >= terminalLines.length) return;

    const currentLine = terminalLines[currentLineIndex];
    const fullText = currentLine.text;

    if (currentCharIndex < fullText.length) {
      // Still typing current line
      setCurrentCharIndex((prev) => prev + 1);
    } else {
      // Line complete, move to next
      const completedLine = currentLine.showCheckmark
        ? `${fullText} ✓`
        : fullText;
      
      setVisibleLines((prev) => [...prev, completedLine]);
      setCurrentCharIndex(0);
      setCurrentLineIndex((prev) => prev + 1);
    }
  }, [currentLineIndex, currentCharIndex]);

  useEffect(() => {
    // Check if preloader was already shown
    const preloaderShown = sessionStorage.getItem("preloader_shown");
    if (preloaderShown === "true") {
      onComplete();
      return;
    }

    if (prefersReducedMotion) {
      // Show all lines instantly for reduced motion
      const allLines = terminalLines.map((line) =>
        line.showCheckmark ? `${line.text} ✓` : line.text
      );
      setVisibleLines(allLines);
      setIsComplete(true);
      
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          sessionStorage.setItem("preloader_shown", "true");
          onComplete();
        }, 350);
      }, 600);
      
      return;
    }

    // Normal typing animation
    if (currentLineIndex >= terminalLines.length) {
      // All lines complete
      if (!isComplete) {
        setIsComplete(true);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            sessionStorage.setItem("preloader_shown", "true");
            onComplete();
          }, 350);
        }, 400);
      }
      return;
    }

    const timer = setTimeout(typeNextChar, 28);
    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, typeNextChar, isComplete, onComplete, prefersReducedMotion]);

  const getCurrentLineDisplay = () => {
    if (currentLineIndex >= terminalLines.length) return null;
    const line = terminalLines[currentLineIndex];
    return line.text.slice(0, currentCharIndex);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0D0D14] transition-all duration-350 ${
        isExiting ? "opacity-0 scale-[0.85]" : "opacity-100 scale-100"
      }`}
      style={{ transitionDuration: "350ms" }}
    >
      {/* Terminal Window */}
      <div
        className={`w-full max-w-[480px] mx-4 terminal overflow-hidden transition-transform duration-350 ${
          isExiting ? "scale-0" : "scale-100"
        }`}
        style={{ transitionDuration: "350ms" }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border-tertiary)]">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
          <span className="ml-4 text-xs text-[var(--color-text-tertiary)] font-mono">
            agency_os — zsh
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-4 min-h-[200px]">
          <div className="font-mono text-sm space-y-1">
            {visibleLines.map((line, index) => (
              <div key={index} className="flex items-start">
                <span className="text-[var(--color-accent-1)] mr-2">&gt;</span>
                <span className="text-[var(--color-text-primary)]">{line}</span>
              </div>
            ))}
            
            {currentLineIndex < terminalLines.length && (
              <div className="flex items-start">
                <span className="text-[var(--color-accent-1)] mr-2">&gt;</span>
                <span className="text-[var(--color-text-primary)]">
                  {getCurrentLineDisplay()}
                  <span className="cursor-blink inline-block w-[2px] h-[14px] bg-[var(--color-text-primary)] ml-[1px] align-middle" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalPreloader;
