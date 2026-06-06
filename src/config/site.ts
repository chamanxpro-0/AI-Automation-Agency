/**
 * AI Automation Agency Template - Site Configuration
 * 
 * This is the main configuration file for the template.
 * Edit this file to customize the entire website without touching any component files.
 * All content, colors, and settings are defined here.
 */

export const siteConfig = {
  // Agency Identity
  agency: {
    name: "Nexus Automation",
    tagline: "We build AI systems that transform how businesses work",
    description: "AI automation consultancy helping businesses save time, reduce costs, and scale operations through intelligent automation.",
    founded: 2021,
    location: "Remote-first, serving globally",
  },

  // Founder Information
  founder: {
    name: "Alex Chen",
    role: "Founder & Lead Automation Engineer",
    bio: "I started Nexus Automation after watching too many brilliant people waste their days on copy-paste work. Before this, I spent 8 years as a solutions architect, building systems for Fortune 500 companies. Now I help businesses reclaim their time through AI-powered automation.",
    avatar: "/images/founder-avatar.jpg",
    manifesto: [
      "Automation should feel magical, not mechanical",
      "Every hour saved is an hour reinvested in growth",
      "The best system is one your team actually uses",
      "We build for longevity, not just launch day",
      "Your success metric is our success metric",
    ],
  },

  // Contact Information
  contact: {
    email: "hello@nexusautomation.co",
    whatsapp: "+1 (555) 123-4567",
    calendlyUrl: "https://calendly.com/nexusautomation/strategy-call",
    responseTime: "2 hours on weekdays",
    meetingLength: "30 minutes",
  },

  // Social Links
  social: {
    twitter: "https://twitter.com/nexusautomation",
    linkedin: "https://linkedin.com/company/nexusautomation",
    github: "https://github.com/nexusautomation",
    youtube: "https://youtube.com/@nexusautomation",
  },

  // Hero Section
  hero: {
    headline: "We build AI systems that",
    rotatingWords: [
      "save you 40 hours/week",
      "10x your output",
      "replace 3 employees",
      "cut costs by 60%",
      "never miss a lead",
    ],
    subheadline: "Custom automation workflows, AI agents, and integrations that transform how your business operates. Built by engineers who understand your stack.",
    ctaPrimary: "Book a strategy call",
    ctaSecondary: "See our work",
  },

  // ROI Metrics (shown in ticker)
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
      description: "Connect your tools and eliminate manual data entry. We build end-to-end workflows that move information automatically between systems.",
      shortDescription: "Connect tools, eliminate manual work",
      deliverables: ["n8n workflow", "Zapier zap", "Custom API"],
      timeline: "2–4 weeks",
      priceRange: "From $2,400",
      tools: ["Make", "n8n", "Zapier", "Pipedream"],
      features: [
        "Multi-step workflow design",
        "Error handling & retries",
        "Real-time monitoring dashboard",
        "Documentation & handoff",
        "30-day support period",
      ],
    },
    {
      id: "ai-agents",
      name: "AI Agent Development",
      category: "AI Agents",
      description: "Deploy intelligent agents that handle customer support, research, content creation, and complex decision-making tasks.",
      shortDescription: "Intelligent agents for complex tasks",
      deliverables: ["GPT-4 agent", "LangChain app", "Vector DB"],
      timeline: "3–6 weeks",
      priceRange: "From $4,800",
      tools: ["OpenAI", "Anthropic", "LangChain", "Pinecone"],
      features: [
        "Custom prompt engineering",
        "Knowledge base integration",
        "Multi-turn conversation handling",
        "Human-in-the-loop escalation",
        "Performance analytics",
      ],
    },
    {
      id: "data-pipelines",
      name: "Data Pipelines",
      category: "Data Pipelines",
      description: "Build robust ETL pipelines that extract, transform, and load data from multiple sources into your warehouse or CRM.",
      shortDescription: "ETL pipelines for business intelligence",
      deliverables: ["Python pipeline", "Airflow DAG", "Data validation"],
      timeline: "2–5 weeks",
      priceRange: "From $3,200",
      tools: ["Python", "Airflow", "dbt", "BigQuery"],
      features: [
        "Multi-source data extraction",
        "Data cleaning & validation",
        "Scheduled or event-driven execution",
        "Error alerting & monitoring",
        "Scalable architecture",
      ],
    },
    {
      id: "chatbots",
      name: "Intelligent Chatbots",
      category: "Chatbots",
      description: "Deploy chatbots that understand context, answer questions, and take actions across your website, Slack, or WhatsApp.",
      shortDescription: "AI chatbots for customer engagement",
      deliverables: ["Chatbot logic", "Knowledge base", "Analytics"],
      timeline: "2–3 weeks",
      priceRange: "From $1,800",
      tools: ["OpenAI", "Voiceflow", "Intercom", "Crisp"],
      features: [
        "Natural language understanding",
        "Multi-channel deployment",
        "Custom knowledge base",
        "Handoff to human agents",
        "Conversation analytics",
      ],
    },
    {
      id: "custom-integrations",
      name: "Custom Integrations",
      category: "Custom Integrations",
      description: "Connect systems that don't have native integrations. We build custom APIs and middleware to make your tools talk.",
      shortDescription: "API development & middleware",
      deliverables: ["REST API", "Webhook handler", "Documentation"],
      timeline: "3–6 weeks",
      priceRange: "From $5,500",
      tools: ["Node.js", "Python", "AWS", "Vercel"],
      features: [
        "Custom API development",
        "Webhook integration",
        "Authentication & security",
        "Rate limiting & throttling",
        "API documentation",
      ],
    },
    {
      id: "crm-automation",
      name: "CRM Automation",
      category: "Workflow Automation",
      description: "Automate your sales and marketing workflows. Lead enrichment, scoring, routing, and follow-up sequences.",
      shortDescription: "Sales & marketing automation",
      deliverables: ["CRM setup", "Lead scoring", "Email sequences"],
      timeline: "2–4 weeks",
      priceRange: "From $2,800",
      tools: ["HubSpot", "Salesforce", "Apollo", "Instantly"],
      features: [
        "Lead enrichment & scoring",
        "Automated follow-up sequences",
        "Deal stage automation",
        "Reporting & analytics",
        "Sales team training",
      ],
    },
  ],

  // Tech Stack
  techStack: {
    categories: [
      {
        name: "Workflow Automation",
        tools: [
          { name: "Make", proficiency: "Expert", description: "Complex multi-step workflows" },
          { name: "Zapier", proficiency: "Expert", description: "Quick integrations & prototypes" },
          { name: "n8n", proficiency: "Expert", description: "Self-hosted automation" },
          { name: "Pipedream", proficiency: "Advanced", description: "Event-driven workflows" },
        ],
      },
      {
        name: "AI/LLM Platforms",
        tools: [
          { name: "OpenAI", proficiency: "Expert", description: "GPT-4, embeddings, fine-tuning" },
          { name: "Anthropic", proficiency: "Expert", description: "Claude for long-context tasks" },
          { name: "LangChain", proficiency: "Advanced", description: "Agent orchestration" },
          { name: "Pinecone", proficiency: "Advanced", description: "Vector search & RAG" },
        ],
      },
      {
        name: "CRM & Business Software",
        tools: [
          { name: "HubSpot", proficiency: "Expert", description: "Marketing & sales automation" },
          { name: "Salesforce", proficiency: "Advanced", description: "Enterprise CRM workflows" },
          { name: "Airtable", proficiency: "Expert", description: "Database & project management" },
          { name: "Notion", proficiency: "Expert", description: "Documentation & wikis" },
        ],
      },
      {
        name: "Communication APIs",
        tools: [
          { name: "Slack", proficiency: "Expert", description: "Team notifications & bots" },
          { name: "Twilio", proficiency: "Advanced", description: "SMS & voice automation" },
          { name: "WhatsApp Business", proficiency: "Advanced", description: "Customer messaging" },
          { name: "Resend", proficiency: "Expert", description: "Transactional email" },
        ],
      },
      {
        name: "Database & Storage",
        tools: [
          { name: "PostgreSQL", proficiency: "Advanced", description: "Relational data" },
          { name: "MongoDB", proficiency: "Advanced", description: "Document storage" },
          { name: "Redis", proficiency: "Advanced", description: "Caching & sessions" },
          { name: "BigQuery", proficiency: "Familiar", description: "Data warehousing" },
        ],
      },
      {
        name: "Analytics",
        tools: [
          { name: "Google Analytics", proficiency: "Expert", description: "Web analytics" },
          { name: "Mixpanel", proficiency: "Advanced", description: "Product analytics" },
          { name: "Looker Studio", proficiency: "Advanced", description: "Dashboards & reports" },
          { name: "Amplitude", proficiency: "Familiar", description: "User behavior" },
        ],
      },
    ],
  },

  // Certifications
  certifications: [
    {
      name: "Make Certified Partner",
      issuer: "Make (formerly Integromat)",
      date: "2023",
      logo: "/images/cert-make.svg",
    },
    {
      name: "OpenAI Verified Developer",
      issuer: "OpenAI",
      date: "2023",
      logo: "/images/cert-openai.svg",
    },
    {
      name: "HubSpot Solutions Partner",
      issuer: "HubSpot",
      date: "2022",
      logo: "/images/cert-hubspot.svg",
    },
    {
      name: "Zapier Certified Expert",
      issuer: "Zapier",
      date: "2022",
      logo: "/images/cert-zapier.svg",
    },
  ],

  // Case Studies
  caseStudies: [
    {
      slug: "saas-lead-qualification",
      industry: "SaaS",
      title: "AI-Powered Lead Qualification",
      problem: "Sales team spending 15 hours/week manually qualifying leads from website forms.",
      solution: "Built an AI agent that enriches leads, scores them, and auto-books meetings for qualified prospects.",
      before: "15 hours/week on manual lead review",
      after: "2 hours/week, 90% auto-qualified",
      metrics: {
        timeSaved: "13 hours/week",
        costReduced: "$4,200/month",
        roi: "8.5x",
        satisfaction: "98%",
      },
      tools: ["OpenAI", "Make", "Apollo", "Calendly", "HubSpot"],
      timeline: "3 weeks",
      testimonial: {
        quote: "The lead qualification system paid for itself in the first month. Our sales team can focus on closing deals instead of chasing unqualified leads.",
        author: "Sarah Mitchell",
        role: "VP of Sales",
        company: "TechFlow SaaS",
      },
    },
    {
      slug: "ecommerce-customer-support",
      industry: "E-commerce",
      title: "24/7 AI Customer Support",
      problem: "Support team overwhelmed with repetitive questions, slow response times hurting satisfaction.",
      solution: "Deployed an AI chatbot that handles 80% of inquiries instantly, with smart escalation to humans.",
      before: "4-hour average response time",
      after: "Instant, 24/7 support",
      metrics: {
        timeSaved: "120 hours/week",
        costReduced: "$12,000/month",
        roi: "12x",
        satisfaction: "96%",
      },
      tools: ["OpenAI", "Intercom", "Shopify", "Gorgias"],
      timeline: "2 weeks",
      testimonial: {
        quote: "Our customers get instant answers at 2 AM. The AI knows our products better than some of our human agents did.",
        author: "Marcus Johnson",
        role: "Customer Success Manager",
        company: "LuxeHome Decor",
      },
    },
    {
      slug: "real-estate-followup",
      industry: "Real Estate",
      title: "Automated Property Follow-up",
      problem: "Agents losing leads due to delayed follow-up, no system for nurturing long-term prospects.",
      solution: "Built a multi-channel automation that responds to inquiries in 30 seconds and nurtures leads for months.",
      before: "50% of leads never contacted",
      after: "100% contacted in <1 minute",
      metrics: {
        timeSaved: "25 hours/week",
        costReduced: "$6,500/month",
        roi: "6x",
        satisfaction: "94%",
      },
      tools: ["Zapier", "Twilio", "Instantly", "Follow Up Boss"],
      timeline: "4 weeks",
      testimonial: {
        quote: "We've closed 40% more deals since implementing the follow-up system. Speed to lead is everything in real estate.",
        author: "Jennifer Park",
        role: "Broker/Owner",
        company: "Park Realty Group",
      },
    },
    {
      slug: "healthcare-appointment-scheduling",
      industry: "Healthcare",
      title: "Smart Appointment Scheduling",
      problem: "Front desk spending 30+ hours/week on phone scheduling, high no-show rates.",
      solution: "AI-powered scheduling bot that handles bookings, reminders, and rescheduling via SMS and web.",
      before: "30 hours/week on scheduling calls",
      after: "5 hours/week, 70% self-service",
      metrics: {
        timeSaved: "25 hours/week",
        costReduced: "$5,200/month",
        roi: "7x",
        satisfaction: "92%",
      },
      tools: ["OpenAI", "Twilio", "Calendly", "Airtable"],
      timeline: "3 weeks",
      testimonial: {
        quote: "Patients love booking by text at midnight. Our no-show rate dropped from 25% to 8% with automated reminders.",
        author: "Dr. Robert Chen",
        role: "Medical Director",
        company: "Wellness Medical Group",
      },
    },
    {
      slug: "agency-reporting-automation",
      industry: "Agencies",
      title: "Client Reporting Automation",
      problem: "Team spending 60 hours/month manually creating client reports from multiple data sources.",
      solution: "Automated data pipeline that pulls from all platforms and generates branded reports.",
      before: "60 hours/month on manual reports",
      after: "2 hours/month, auto-delivered",
      metrics: {
        timeSaved: "58 hours/month",
        costReduced: "$8,700/month",
        roi: "15x",
        satisfaction: "99%",
      },
      tools: ["Python", "Google Sheets", "Looker Studio", "Make"],
      timeline: "4 weeks",
      testimonial: {
        quote: "Our team went from dreading report week to reports just appearing in client inboxes. It's like magic.",
        author: "Lisa Thompson",
        role: "Operations Director",
        company: "Growth Marketing Agency",
      },
    },
    {
      slug: "financial-data-processing",
      industry: "Finance",
      title: "Financial Data Processing Pipeline",
      problem: "Analysts manually processing thousands of transactions, error-prone and slow.",
      solution: "Built an AI pipeline that extracts, categorizes, and validates transaction data automatically.",
      before: "40 hours/week on data entry",
      after: "2 hours/week for review only",
      metrics: {
        timeSaved: "38 hours/week",
        costReduced: "$9,500/month",
        roi: "11x",
        satisfaction: "97%",
      },
      tools: ["Python", "OpenAI", "PostgreSQL", "Airflow"],
      timeline: "5 weeks",
      testimonial: {
        quote: "What used to take our team a week now happens overnight. The accuracy is actually better than manual processing.",
        author: "David Martinez",
        role: "CFO",
        company: "Venture Capital Fund",
      },
    },
  ],

  // Testimonials
  testimonials: [
    {
      quote: "Nexus Automation transformed how we operate. The ROI calculator they built showed we'd save $80k in the first quarter alone. We actually saved $95k.",
      author: "Michael Torres",
      role: "CEO",
      company: "ScaleUp Inc.",
      outcome: "$95k saved in Q1",
    },
    {
      quote: "Working with Alex felt like having a technical co-founder. They understood our business, asked the right questions, and delivered beyond expectations.",
      author: "Emily Watson",
      role: "Founder",
      company: "BrightPath Education",
      outcome: "10x improvement in response time",
    },
    {
      quote: "The client portal alone is worth the investment. Our clients can see project progress in real-time. It's become a major selling point for us.",
      author: "James Liu",
      role: "Director of Operations",
      company: "TechVentures",
      outcome: "40% faster project delivery",
    },
  ],

  // ROI Calculator Defaults
  roiCalculator: {
    implementationCost: 3500,
    defaultHoursPerWeek: 20,
    defaultHourlyCost: 50,
    defaultPeopleCount: 3,
    automationRate: 0.85,
  },

  // Process Phases
  process: {
    phases: [
      {
        id: "discovery",
        name: "Discovery",
        duration: "Week 1",
        description: "We dive deep into your current workflows, pain points, and goals. Through workshops and interviews, we map out exactly what needs to be automated and why.",
        clientActions: [
          "Share access to current tools and systems",
          "Participate in 2-3 discovery workshops",
          "Provide sample data and workflow documentation",
        ],
        agencyActions: [
          "Conduct stakeholder interviews",
          "Map current state workflows",
          "Identify automation opportunities",
          "Create technical architecture plan",
          "Define success metrics",
        ],
        deliverables: [
          "Workflow audit report",
          "Automation roadmap",
          "Technical specification",
          "Project timeline",
        ],
      },
      {
        id: "build",
        name: "Build",
        duration: "Weeks 2–3",
        description: "We build your automation in iterative sprints. You'll see progress through regular demos and have opportunities to provide feedback along the way.",
        clientActions: [
          "Review and approve workflow designs",
          "Provide feedback on demo versions",
          "Test automation with real data",
        ],
        agencyActions: [
          "Develop automation workflows",
          "Build integrations and APIs",
          "Create error handling & monitoring",
          "Conduct internal testing",
          "Document the system",
        ],
        deliverables: [
          "Working automation system",
          "Test results & QA report",
          "User documentation",
          "Training materials",
        ],
      },
      {
        id: "deploy",
        name: "Deploy & Test",
        duration: "Week 4",
        description: "We deploy your automation to production and run comprehensive tests. Your team gets hands-on training to ensure confidence with the new system.",
        clientActions: [
          "Participate in training sessions",
          "Run parallel testing (old vs new)",
          "Sign off on production deployment",
        ],
        agencyActions: [
          "Deploy to production environment",
          "Configure monitoring & alerts",
          "Conduct user training",
          "Run final acceptance testing",
          "Provide go-live support",
        ],
        deliverables: [
          "Production deployment",
          "Training completion certificate",
          "Go-live checklist",
          "Support contact info",
        ],
      },
      {
        id: "maintain",
        name: "Maintain & Scale",
        duration: "Ongoing",
        description: "Automation isn't 'set and forget.' We monitor performance, fix issues, and continuously optimize. As your business grows, we scale the automation with you.",
        clientActions: [
          "Report any issues or edge cases",
          "Share feedback on performance",
          "Request new features as needed",
        ],
        agencyActions: [
          "Monitor system health 24/7",
          "Fix bugs and edge cases",
          "Optimize performance",
          "Monthly performance reports",
          "Quarterly optimization reviews",
        ],
        deliverables: [
          "Monthly performance report",
          "Quarterly optimization plan",
          "Priority support access",
          "Feature roadmap updates",
        ],
      },
    ],
  },

  // Blog Posts
  blogPosts: [
    {
      slug: "roi-of-automation-2024",
      title: "The Real ROI of Business Automation in 2024",
      excerpt: "We analyzed 50+ automation projects to find out what actually drives ROI. The results might surprise you.",
      category: "Automation",
      date: "2024-03-15",
      readingTime: "8 min read",
      featured: true,
    },
    {
      slug: "ai-agents-vs-traditional-automation",
      title: "AI Agents vs Traditional Automation: When to Use What",
      excerpt: "Understanding the difference between rule-based automation and AI-powered agents helps you choose the right approach.",
      category: "AI",
      date: "2024-03-08",
      readingTime: "6 min read",
      featured: false,
    },
    {
      slug: "n8n-vs-make-vs-zapier",
      title: "n8n vs Make vs Zapier: The 2024 Comparison",
      excerpt: "A detailed breakdown of the three leading automation platforms, with use cases and pricing analysis.",
      category: "Tools",
      date: "2024-02-28",
      readingTime: "10 min read",
      featured: false,
    },
    {
      slug: "5-automation-mistakes",
      title: "5 Automation Mistakes That Cost Companies Millions",
      excerpt: "Learn from the failures. These common automation pitfalls can derail your project before it starts.",
      category: "Strategy",
      date: "2024-02-20",
      readingTime: "7 min read",
      featured: false,
    },
    {
      slug: "building-your-first-ai-agent",
      title: "Building Your First AI Agent: A Step-by-Step Guide",
      excerpt: "Everything you need to know to build a functional AI agent using OpenAI and LangChain.",
      category: "Tutorial",
      date: "2024-02-12",
      readingTime: "15 min read",
      featured: false,
    },
    {
      slug: "automation-for-saas-startups",
      title: "Essential Automations for SaaS Startups",
      excerpt: "The 7 automations every SaaS startup should implement in their first year.",
      category: "SaaS",
      date: "2024-02-05",
      readingTime: "9 min read",
      featured: false,
    },
  ],

  // FAQ
  faq: [
    {
      question: "How long does a typical automation project take?",
      answer: "Most projects take 2-4 weeks from kickoff to production. Simple integrations can be done in a week, while complex multi-system automations may take 6-8 weeks. We'll give you a precise timeline during the discovery phase.",
    },
    {
      question: "What if we don't use the tools you specialize in?",
      answer: "We work with 50+ tools and can integrate with virtually any system that has an API. If you're using something niche, we'll learn it or build a custom integration. Our expertise transfers quickly.",
    },
    {
      question: "How do you handle errors and failures?",
      answer: "Every automation we build includes robust error handling: automatic retries, fallback workflows, and real-time alerting. If something breaks, we know immediately and fix it before it impacts your business.",
    },
    {
      question: "Can we make changes after the automation is live?",
      answer: "Absolutely. Business needs change, and your automation should evolve with them. We offer ongoing support packages that include modifications, optimizations, and new feature additions.",
    },
    {
      question: "Do you provide training for our team?",
      answer: "Yes, every project includes comprehensive training. We record Loom videos, write documentation, and do live training sessions. Your team will feel confident managing and extending the automation.",
    },
    {
      question: "What kind of ROI can we expect?",
      answer: "Most clients see ROI within 1-3 months. Use our ROI calculator on the Services page to estimate your specific savings. Typical results: 60-85% time reduction on automated tasks, 40-70% cost savings.",
    },
  ],

  // Industries for filtering
  industries: ["All Industries", "SaaS", "E-commerce", "Real Estate", "Healthcare", "Agencies", "Finance"],

  // Contact Form Options
  contactForm: {
    companySizes: ["Solo", "2–10 employees", "11–50 employees", "50+ employees"],
    budgetRanges: ["Under $1k", "$1k–$3k", "$3k–$10k", "$10k+"],
    industries: [
      "SaaS",
      "E-commerce",
      "Real Estate",
      "Healthcare",
      "Marketing Agency",
      "Financial Services",
      "Education",
      "Manufacturing",
      "Retail",
      "Technology",
      "Consulting",
      "Other",
    ],
    referralSources: [
      "Google Search",
      "LinkedIn",
      "Twitter/X",
      "Referral from friend/colleague",
      "Podcast",
      "Blog post",
      "YouTube",
      "Other",
    ],
  },
};

export type SiteConfig = typeof siteConfig;
