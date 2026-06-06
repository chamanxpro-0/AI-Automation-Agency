import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useInView";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
}

interface ParticleFieldProps {
  particleCount?: number;
  connectionDistance?: number;
  maxDrift?: number;
  className?: string;
}

export function ParticleField({
  particleCount = 80,
  connectionDistance = 120,
  maxDrift = 30,
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
        });
      }
      particlesRef.current = particles;
    },
    [particleCount]
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Apply spring physics toward base position
        const dx = particle.baseX - particle.x;
        const dy = particle.baseY - particle.y;
        particle.vx += dx * 0.03;
        particle.vy += dy * 0.03;
        particle.vx *= 0.92;
        particle.vy *= 0.92;

        // Mouse attraction
        const mouseDx = mouse.x - particle.x;
        const mouseDy = mouse.y - particle.y;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (mouseDist < connectionDistance * 1.5 && mouseDist > 0) {
          const force = (connectionDistance * 1.5 - mouseDist) / (connectionDistance * 1.5);
          const maxForce = 0.5;
          const clampedForce = Math.min(force * maxForce, maxForce);
          particle.vx += (mouseDx / mouseDist) * clampedForce;
          particle.vy += (mouseDy / mouseDist) * clampedForce;
        }

        // Limit drift from base position
        const driftX = particle.x - particle.baseX;
        const driftY = particle.y - particle.baseY;
        const driftDist = Math.sqrt(driftX * driftX + driftY * driftY);
        
        if (driftDist > maxDrift) {
          const correction = (driftDist - maxDrift) / driftDist * 0.1;
          particle.vx -= driftX * correction;
          particle.vy -= driftY * correction;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) {
          particle.x = width;
          particle.baseX = width;
        }
        if (particle.x > width) {
          particle.x = 0;
          particle.baseX = 0;
        }
        if (particle.y < 0) {
          particle.y = height;
          particle.baseY = height;
        }
        if (particle.y > height) {
          particle.y = 0;
          particle.baseY = 0;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-text-secondary")
          .trim() || "#94A3B8";
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const connDx = particle.x - other.x;
          const connDy = particle.y - other.y;
          const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

          if (connDist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            const opacity = (1 - connDist / connectionDistance) * 0.3;
            ctx.strokeStyle = getComputedStyle(document.documentElement)
              .getPropertyValue("--color-accent-1")
              .trim() || "#6366F1";
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });
    },
    [connectionDistance, maxDrift]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for touch device
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    
    // Disable on mobile/touch devices
    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let lastTime = 0;
    const animate = (currentTime: number) => {
      // Throttle to ~30fps for performance
      if (currentTime - lastTime >= 33) {
        const rect = canvas.getBoundingClientRect();
        draw(ctx, rect.width, rect.height);
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, draw, prefersReducedMotion]);

  // Don't render on touch devices or when reduced motion is preferred
  const isTouchDevice = typeof window !== "undefined" && 
    window.matchMedia("(pointer: coarse)").matches;
  
  if (isTouchDevice || prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}

export default ParticleField;
