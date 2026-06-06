# AI Automation Agency Website Template

A premium, production-ready website template for AI automation consultants and agencies. Built with React 18, TypeScript, Tailwind CSS, and Framer Motion.

**Live Demo:** [https://moy2vthch5qdw.ok.kimi.link](https://moy2vthch5qdw.ok.kimi.link)

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Configuration Guide](#configuration-guide)
7. [Page Breakdown](#page-breakdown)
8. [Component Reference](#component-reference)
9. [Animation System](#animation-system)
10. [Client Portal](#client-portal)
11. [Theming](#theming)
12. [Deployment](#deployment)
13. [Customization FAQ](#customization-faq)

---

## Overview

This template is purpose-built for AI automation consultants who need to demonstrate credibility, showcase technical expertise, and convert visitors into clients. Unlike generic agency templates, it includes industry-specific features:

- **ROI Calculator** -- Let prospects quantify their potential savings
- **Workflow Diagrams** -- Visually demonstrate the automations you build
- **Client Portal** -- Protected project dashboard for existing clients
- **Tech Stack Showcase** -- Display tool expertise with proficiency levels
- **Case Studies with Metrics** -- Before/after data with animated counters

### Design Philosophy

The design follows a "refined tech" aesthetic:
- Muted, sophisticated color palette (not neon/flashy)
- Editorial typography with excellent hierarchy
- Generous whitespace and breathing room
- Subtle animations that feel intentional, not distracting
- No excessive icons -- text and subtle visual cues communicate professionalism

---

## Features

### Design & UX

| Feature | Description |
|---------|-------------|
| Terminal Preloader | CLI-style boot sequence with typing animation (first visit only) |
| Particle Field Hero | Interactive canvas background with mouse attraction (desktop only) |
| Typewriter Headline | Character-by-character typing with cycling keyword |
| Animated Metrics | Count-up numbers triggered on scroll into view |
| 3D Card Tilt | Mouse-responsive perspective rotation on service cards |
| Workflow Diagram | Animated SVG showing automation flow |
| Smooth Page Transitions | Framer Motion `AnimatePresence` with fade/slide |
| Scroll Progress Bar | Thin accent-colored bar at top of viewport |
| Dual Theme | Dark (Void) and Light (Studio) modes |

### Pages

| Page | Sections |
|------|----------|
| **Home** | Hero, ROI ticker, Services preview, Workflow diagram, Tech stack, Case studies, Testimonials, CTA |
| **Services** | Filterable service cards, ROI calculator, FAQ accordion |
| **Case Studies** | Industry filter, metric cards, before/after comparisons |
| **Process** | Interactive 4-phase stepper with keyboard navigation |
| **Stack** | Tool categories, proficiency badges, certifications |
| **About** | Founder story, manifesto, credentials, philosophy |
| **Blog** | Featured article, category filter, article grid |
| **Contact** | Validated intake form, budget selector, trust signals |
| **Client Portal** | Magic link auth, projects, deliverables, messages, invoices |

### Technical

- Fully responsive (mobile-first)
- Accessibility: `prefers-reduced-motion` support, keyboard navigation, focus states
- SEO-ready structure with proper heading hierarchy
- Zero external API dependencies (config-driven)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Base UI components (40+ included) |
| Framer Motion | Animations & transitions |
| react-hook-form | Form handling |
| Zod | Form validation |
| React Router DOM | Client-side routing |
| Lucide React | Icons (used sparingly) |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd ai-agency-template

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Output is in the `dist/` directory. This is a static site -- can be deployed to any static host.

---

## Project Structure

```
src/
|-- components/
|   |-- preloader/        # Terminal boot animation
|   |-- nav/              # Navigation bar & footer
|   |-- hero/             # Hero section, CTA section
|   |-- roi-calculator/   # ROI ticker & calculator
|   |-- service-card/     # Service cards (3D tilt)
|   |-- workflow-diagram/ # SVG workflow visualization
|   |-- tech-stack/       # Tool showcase
|   |-- case-study-card/  # Case study cards
|   |-- testimonials/     # Testimonial section
|
|-- config/
|   |-- site.ts           # ALL site content & configuration
|   |-- clients.ts        # Client portal data
|
|-- context/
|   |-- ThemeContext.tsx   # Dark/light theme provider
|   |-- AuthContext.tsx    # Authentication state
|
|-- hooks/
|   |-- useInView.ts      # Scroll animation hooks
|
|-- pages/
|   |-- Home.tsx
|   |-- Services.tsx
|   |-- CaseStudies.tsx
|   |-- Process.tsx
|   |-- Stack.tsx
|   |-- About.tsx
|   |-- Blog.tsx
|   |-- Contact.tsx
|   |-- portal/
|   |   |-- Login.tsx
|   |   |-- Portal.tsx
|   |   |-- Verify.tsx
|
|-- App.tsx               # Router & layout
|-- index.css             # Global styles & CSS variables
|-- main.tsx              # Entry point
```

---

## Configuration Guide

All visible content is controlled through **two files**. You never need to edit component code.

### 1. Site Configuration -- `src/config/site.ts`

This is the main config file. Here's what you can customize:

```typescript
export const siteConfig = {
  // Agency identity
  agency: {
    name: "Nexus Automation",
    tagline: "We build AI systems...",
    description: "AI automation consultancy...",
  },

  // Founder info
  founder: {
    name: "Alex Chen",
    role: "Founder & Lead Automation Engineer",
    bio: "I started Nexus Automation after...",
    manifesto: ["Statement 1", "Statement 2", ...],
  },

  // Contact details
  contact: {
    email: "hello@nexusautomation.co",
    whatsapp: "+1 (555) 123-4567",
    calendlyUrl: "https://calendly.com/...",
    responseTime: "2 hours on weekdays",
  },

  // Hero section
  hero: {
    headline: "We build AI systems that",
    rotatingWords: ["save you 40 hours/week", "10x your output", ...],
    subheadline: "Custom automation workflows...",
    ctaPrimary: "Book a strategy call",
    ctaSecondary: "View our work",
  },

  // ROI metrics (displayed in ticker)
  roiMetrics: {
    hoursSaved: 2400,
    costReduction: 1200000,
    automationsBuilt: 47,
    clientsServed: 89,
  },

  // Services (array of service objects)
  services: [
    {
      id: "workflow-automation",
      name: "Workflow Automation",
      category: "Workflow Automation",
      description: "Connect your tools and eliminate manual data entry...",
      shortDescription: "Connect tools, eliminate manual work",
      deliverables: ["n8n workflow", "Zapier zap", "Custom API"],
      timeline: "2-4 weeks",
      priceRange: "From $2,400",
      tools: ["Make", "n8n", "Zapier"],
      features: ["Multi-step workflow design", "Error handling", ...],
    },
    // ... more services
  ],

  // Tech stack categories
  techStack: {
    categories: [
      {
        name: "Workflow Automation",
        tools: [
          { name: "Make", proficiency: "Expert", description: "Complex multi-step workflows" },
          // proficiency: "Expert" | "Advanced" | "Familiar"
        ],
      },
    ],
  },

  // Certifications
  certifications: [
    { name: "Make Certified Partner", issuer: "Make", date: "2023" },
  ],

  // Case studies
  caseStudies: [
    {
      slug: "saas-lead-qualification",
      industry: "SaaS",
      title: "AI-Powered Lead Qualification",
      problem: "Sales team spending 15 hours/week...",
      solution: "Built an AI agent that enriches leads...",
      before: "15 hours/week on manual lead review",
      after: "2 hours/week, 90% auto-qualified",
      metrics: { timeSaved: "13 hours/week", costReduced: "$4,200/month", roi: "8.5x", satisfaction: "98%" },
      tools: ["OpenAI", "Make", "Apollo"],
      timeline: "3 weeks",
    },
  ],

  // Testimonials
  testimonials: [
    {
      quote: "Nexus Automation transformed how we operate...",
      author: "Michael Torres",
      role: "CEO",
      company: "ScaleUp Inc.",
      outcome: "$95k saved in Q1",
    },
  ],

  // Blog posts
  blogPosts: [
    {
      slug: "roi-of-automation-2024",
      title: "The Real ROI of Business Automation in 2024",
      excerpt: "We analyzed 50+ automation projects...",
      category: "Automation",
      date: "2024-03-15",
      readingTime: "8 min read",
      featured: true,
    },
  ],

  // FAQ
  faq: [
    { question: "How long does a typical project take?", answer: "Most projects take 2-4 weeks..." },
  ],

  // ROI calculator defaults
  roiCalculator: {
    implementationCost: 3500,
    defaultHoursPerWeek: 20,
    defaultHourlyCost: 50,
    defaultPeopleCount: 3,
    automationRate: 0.85,
  },

  // Process phases
  process: {
    phases: [
      {
        id: "discovery",
        name: "Discovery",
        duration: "Week 1",
        description: "We dive deep into your current workflows...",
        clientActions: ["Share access to tools", "Participate in workshops"],
        agencyActions: ["Conduct interviews", "Map workflows"],
        deliverables: ["Workflow audit", "Automation roadmap"],
      },
    ],
  },

  // Contact form options
  contactForm: {
    companySizes: ["Solo", "2-10 employees", "11-50 employees", "50+ employees"],
    budgetRanges: ["Under $1k", "$1k-$3k", "$3k-$10k", "$10k+"],
    industries: ["SaaS", "E-commerce", "Real Estate", ...],
    referralSources: ["Google Search", "LinkedIn", ...],
  },
};
```

### 2. Client Portal Data -- `src/config/clients.ts`

Each client entry contains their projects, deliverables, messages, invoices, and timeline.

```typescript
export const clientsData: Record<string, ClientData> = {
  "client@example.com": {
    id: "client-001",
    email: "client@example.com",
    name: "Sarah Mitchell",
    company: "TechFlow SaaS",
    projects: [
      {
        id: "proj-001",
        name: "AI Lead Qualification",
        phase: "Live",
        progress: 100,
        nextMilestone: "Monthly review",
        nextMilestoneDate: "2024-04-15",
        description: "Automated lead scoring system",
      },
    ],
    deliverables: [
      { id: "del-001", name: "Project Kickoff", type: "video", date: "2024-02-15", url: "..." },
    ],
    messages: [
      { id: "msg-001", author: "Alex Chen", role: "Lead Engineer", content: "Welcome!", date: "...", type: "update" },
    ],
    invoices: [
      { id: "inv-001", number: "INV-001", date: "2024-02-15", amount: 3500, status: "Paid", pdfUrl: "..." },
    ],
    timeline: [
      { id: "tl-001", name: "Discovery Workshop", date: "2024-02-15", status: "Complete", description: "..." },
    ],
  },
};
```

To add a new client, add a new entry to `clientsData` with the client's email as the key.

**Demo login:** Use `demo@example.com` to test the portal without email setup.

---

## Page Breakdown

### Home Page

The homepage is designed to answer three questions in order:
1. **What do you do?** -- Hero headline + services preview
2. **Can you prove it works?** -- ROI ticker + case studies + testimonials
3. **What does it cost?** -- ROI calculator (on Services page) + CTA

Sections:
1. **Hero** -- Full-viewport with particle canvas, typewriter headline, CTAs
2. **ROI Ticker** -- 4 animated metrics in a row
3. **Services Preview** -- First 3 service cards with 3D tilt
4. **Workflow Diagram** -- Animated SVG showing lead qualification flow
5. **Tech Stack** -- Categorized tool grid with proficiency badges
6. **Case Studies** -- First 3 case study cards with before/after
7. **Testimonials** -- 3 quote cards with author info and outcomes
8. **CTA** -- Final conversion section with gradient background

### Services Page

- Hero with description
- Sticky category filter bar (All, Workflow Automation, AI Agents, etc.)
- Detailed service cards (with features list, tools, pricing)
- Interactive ROI Calculator with 3 sliders and real-time calculations
- FAQ accordion (Radix UI primitive)

### Case Studies Page

- Industry filter bar (synced to URL params for shareability)
- Grid of case study cards with before/after comparisons
- Featured case study section (first result gets large treatment)

### Process Page

- Full interactive stepper with 4 phases
- Progress bar with numbered steps
- Click and keyboard (arrow keys) navigation
- Each phase shows: description, client actions, agency actions, deliverables

### Stack Page

- Tool categories in organized grids
- Proficiency badges: Expert (filled), Advanced (outlined), Familiar (muted)
- Certifications section
- "Don't see your stack?" CTA

### About Page

- Two-column layout: founder story + manifesto
- Credentials grid (animated count-up numbers)
- Philosophy cards (3 items)

### Blog Page

- Featured article (large card)
- Category filter (synced to URL)
- Article grid with excerpt, reading time, category

### Contact Page

- Two-column on desktop: form (55%) + info (45%)
- Form fields: name, email, company, size, industry, problem, budget, referral source
- Zod validation with inline error messages
- Success state with confirmation

### Client Portal

**Authentication:**
- Magic link via email (simulated in development)
- 15-minute token expiry
- 24-hour session in sessionStorage
- Protected routes with redirect to login

**Dashboard tabs:**
- **Overview** -- Active projects with progress bars + timeline
- **Deliverables** -- File list with view/download links
- **Messages** -- Chronological message thread
- **Invoices** -- Table with status (Paid/Due/Overdue)

---

## Component Reference

### TerminalPreloader

- CLI-style typing animation on first visit
- 28ms per character, 6 lines total
- Skips on repeat visits (sessionStorage flag)
- Respects `prefers-reduced-motion` (shows instantly, no animation)
- Communicates completion via `onComplete` callback

### Navigation

- Three states: transparent (home top), scrolled (blur background), interior (always blurred)
- Active page indicator (thin underline)
- Hover underline that follows cursor between links
- Mobile: hamburger with animated icon + slide-in drawer
- Theme toggle button (sun/moon icon)

### ParticleField

- Canvas-based particle system
- 80 dots with proximity-based connections
- Mouse attraction with spring physics
- Disabled on touch devices and `prefers-reduced-motion`
- Falls back to gradient background on mobile

### ServiceCard

- 3D tilt: max 8 degrees rotation on mouse move
- Spring physics reset on mouse leave (not instant)
- Ambient glow follows cursor
- Disabled on touch devices
- `detailed` prop for full card (Services page) vs preview card (Home page)

### WorkflowDiagram

- SVG nodes with sequential animation
- Edges draw with stroke-dashoffset animation
- Hover tooltips on desktop
- Mobile: vertical list fallback

### ROICalculator

- 3 sliders: hours/week, hourly cost, people count
- Real-time calculation (85% automation rate)
- 4 output cards: hours saved, annual cost, cost after, savings
- Payback period calculation with color coding
- 200ms count-up animation on value change

---

## Animation System

### Scroll-Triggered Animations

All major sections use the `useInView` hook:

```typescript
const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
```

- Triggers when 15% of element is visible
- Fires once per page load (not on re-scroll)
- Used with Framer Motion's `whileInView` for declarative animations

### Page Transitions

Framer Motion `AnimatePresence` with `mode="wait"`:

```
Exit: opacity 0, duration 0.25s
Enter: opacity 0->1, y 12px->0, duration 0.25s
Easing: [0.22, 1, 0.36, 1]
```

### Number Count-Up

Custom `useCountUp` hook:
- Ease-out expo curve
- `requestAnimationFrame` based
- `Intl.NumberFormat` for proper currency formatting

### Typewriter Effect

Custom `useTypewriter` hook:
- 40ms per character
- Optional `onComplete` callback
- Works with cycling words for the hero section

---

## Theming

### CSS Variables

All colors are defined as CSS custom properties in `src/index.css`. Two themes:

**Dark (default):**
```
--bg-primary: #0C0C0F      (near-black with warmth)
--bg-secondary: #131318
--accent: #7B74DB           (muted indigo)
--accent-warm: #D4A574      (warm coral)
--text-primary: #F0EDE8     (warm white)
--text-secondary: #9C9892   (soft gray)
```

**Light:**
```
--bg-primary: #FAFAF8       (warm white)
--accent: #6B5FC7           (deeper indigo)
--text-primary: #1C1B19     (warm black)
```

### Switching Themes

The `ThemeProvider` context manages theme state:
- Reads from `localStorage` on mount
- Falls back to system preference
- Provides `toggleTheme()` and `setTheme()`
- Smooth 400ms transition between themes

---

## Deployment

### Static Hosting

This template outputs static HTML/CSS/JS. Deploy to any static host:

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build
# Drag dist/ folder to Netlify
```

**Cloudflare Pages:**
```bash
npm run build
# Upload dist/ folder
```

### SPA Routing

This uses React Router with client-side routing. For static hosts, you need to configure redirect rules so all routes serve `index.html`:

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify** (`_redirects`):
```
/* /index.html 200
```

---

## Customization FAQ

### How do I change the agency name?

Edit `src/config/site.ts`:
```typescript
agency: {
  name: "Your Agency Name",
  // ...
}
```

### How do I change the color scheme?

Edit the CSS variables in `src/index.css`. Key variables:
- `--accent` - Primary brand color
- `--accent-warm` - Secondary accent
- `--bg-primary` - Page background
- `--text-primary` - Main text color

### How do I add a new service?

Add to the `services` array in `src/config/site.ts`:
```typescript
{
  id: "your-service",
  name: "Service Name",
  category: "Workflow Automation",
  description: "Full description...",
  shortDescription: "Brief description for cards",
  deliverables: ["Deliverable 1", "Deliverable 2"],
  timeline: "2-4 weeks",
  priceRange: "From $X,XXX",
  tools: ["Tool 1", "Tool 2"],
  features: ["Feature 1", "Feature 2"],
}
```

### How do I add a case study?

Add to the `caseStudies` array in `src/config/site.ts` with all required fields.

### How do I add a client to the portal?

Add to `src/config/clients.ts` following the `ClientData` interface. Use the client's email as the key.

### How do I disable the preloader?

Remove the `<TerminalPreloader>` component from `App.tsx`, or set `preloader_shown` in `sessionStorage` to `"true"`.

### How do I change fonts?

1. Update the Google Fonts import in `src/index.css`
2. Update the CSS variables:
```css
--font-display: 'Your Display Font', sans-serif;
--font-body: 'Your Body Font', sans-serif;
--font-mono: 'Your Mono Font', monospace;
```

### How do I connect the contact form to a backend?

The contact form currently logs to console. To connect to a backend:

1. Create a form submission handler in `src/pages/Contact.tsx`
2. Replace the `onSubmit` function with an API call:
```typescript
const onSubmit = async (data: FormData) => {
  setSubmitting(true);
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) setSubmitted(true);
  setSubmitting(false);
};
```

### How do I set up real email authentication?

The portal uses a simulated magic link system. For production:

1. Set up a backend API (Next.js, Express, etc.)
2. Generate and store tokens server-side
3. Send actual emails via Resend, SendGrid, or AWS SES
4. Update the `login` and `verifyMagicLink` functions in `AuthContext.tsx`

---

## License

This template is provided as-is for personal and commercial use. Attribution appreciated but not required.

---

Built with care for AI automation professionals.
