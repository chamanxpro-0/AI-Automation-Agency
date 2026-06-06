# AI Automation Agency Website Template

A premium, production-ready website template for AI automation consultants and agencies. Built with React 18, TypeScript, Tailwind CSS, and Framer Motion.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Pages](#pages)
- [Components](#components)
- [Animations](#animations)
- [Client Portal](#client-portal)
- [Theming](#theming)
- [Deployment](#deployment)
- [FAQ](#faq)

---

## Overview

This template is purpose-built for AI automation consultants who need to demonstrate credibility, showcase technical expertise, and convert visitors into clients.

### Key Features

- ROI Calculator - Let prospects quantify their potential savings
- Workflow Diagrams - Visually demonstrate the automations you build
- Client Portal - Protected project dashboard for existing clients
- Tech Stack Showcase - Display tool expertise with proficiency levels
- Case Studies - Before/after data with animated counters

### Design Philosophy

The design follows a "refined tech" aesthetic:
- Muted, sophisticated color palette (not neon/flashy)
- Editorial typography with excellent hierarchy
- Generous whitespace and breathing room
- Subtle animations that feel intentional, not distracting

---

## Features

### Design & UX

| Feature | Description |
|---------|-------------|
| Terminal Preloader | CLI-style boot sequence with typing animation (first visit only) |
| Particle Field Hero | Interactive canvas background with mouse attraction |
| Typewriter Headline | Character-by-character typing with cycling keyword |
| Animated Metrics | Count-up numbers triggered on scroll |
| 3D Card Tilt | Mouse-responsive perspective rotation |
| Workflow Diagram | Animated SVG showing automation flow |
| Smooth Transitions | Framer Motion AnimatePresence with fade/slide |
| Scroll Progress Bar | Thin accent-colored bar at top of viewport |
| Dual Theme | Dark (Void) and Light (Studio) modes |

### Pages

| Page | Sections |
|------|----------|
| Home | Hero, ROI ticker, Services preview, Workflow diagram, Tech stack, Case studies, Testimonials, CTA |
| Services | Filterable service cards, ROI calculator, FAQ accordion |
| Case Studies | Industry filter, metric cards, before/after comparisons |
| Process | Interactive 4-phase stepper with keyboard navigation |
| Stack | Tool categories, proficiency badges, certifications |
| About | Founder story, manifesto, credentials, philosophy |
| Blog | Featured article, category filter, article grid |
| Contact | Validated intake form, budget selector, trust signals |
| Client Portal | Magic link auth, projects, deliverables, messages, invoices |

### Technical

- Fully responsive (mobile-first)
- Accessibility: prefers-reduced-motion support
- SEO-ready structure with proper heading hierarchy
- Zero external API dependencies (config-driven)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Base UI components (40+ included) |
| Framer Motion | Animations and transitions |
| react-hook-form | Form handling |
| Zod | Form validation |
| React Router DOM | Client-side routing |
| Lucide React | Icons (used sparingly) |

---

## Quick Start

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

src/
|-- components/
|   |-- preloader/        # Terminal boot animation
|   |-- nav/              # Navigation bar and footer
|   |-- hero/             # Hero section, CTA section
|   |-- roi-calculator/   # ROI ticker and calculator
|   |-- service-card/     # Service cards (3D tilt)
|   |-- workflow-diagram/ # SVG workflow visualization
|   |-- tech-stack/       # Tool showcase
|   |-- case-study-card/  # Case study cards
|   |-- testimonials/     # Testimonial section
|
|-- config/
|   |-- site.ts           # ALL site content and configuration
|   |-- clients.ts        # Client portal data
|
|-- context/
|   |-- ThemeContext.tsx  # Dark/light theme provider
|   |-- AuthContext.tsx   # Authentication state
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
|-- App.tsx               # Router and layout
|-- index.css             # Global styles and CSS variables
|-- main.tsx              # Entry point



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
    role: "Founder and Lead Automation Engineer",
    bio: "I started Nexus Automation after...",
    manifesto: ["Statement 1", "Statement 2"],
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
    rotatingWords: ["save you 40 hours/week", "10x your output"],
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

  // Services
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
      features: ["Multi-step workflow design", "Error handling"],
    },
  ],

  // Tech stack categories
  techStack: {
    categories: [
      {
        name: "Workflow Automation",
        tools: [
          { 
            name: "Make", 
            proficiency: "Expert",  // Expert, Advanced, or Familiar
            description: "Complex multi-step workflows" 
          },
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
      metrics: { 
        timeSaved: "13 hours/week", 
        costReduced: "$4,200/month", 
        roi: "8.5x", 
        satisfaction: "98%" 
      },
      tools: ["OpenAI", "Make", "Apollo"],
      timeline: "3 weeks",
    },
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
};
