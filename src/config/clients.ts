/**
 * Client Portal Data Configuration
 * 
 * This file contains all client-specific data for the protected client portal.
 * In a production environment, this would typically come from a database.
 * For this template, it's stored as a TypeScript object for zero infrastructure cost.
 */

export interface ClientProject {
  id: string;
  name: string;
  phase: "Discovery" | "Build" | "Deploy" | "Live";
  progress: number;
  nextMilestone: string;
  nextMilestoneDate: string;
  description: string;
}

export interface Deliverable {
  id: string;
  name: string;
  type: "video" | "pdf" | "link" | "figma" | "document";
  date: string;
  url: string;
  thumbnail?: string;
}

export interface Message {
  id: string;
  author: string;
  role: string;
  content: string;
  date: string;
  type: "update" | "milestone" | "question" | "file";
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
  pdfUrl: string;
}

export interface TimelineMilestone {
  id: string;
  name: string;
  date: string;
  status: "Upcoming" | "In Progress" | "Complete";
  description: string;
}

export interface ClientData {
  id: string;
  email: string;
  name: string;
  company: string;
  avatar?: string;
  projects: ClientProject[];
  deliverables: Deliverable[];
  messages: Message[];
  invoices: Invoice[];
  timeline: TimelineMilestone[];
}

export const clientsData: Record<string, ClientData> = {
  "client@techflow.com": {
    id: "client-001",
    email: "client@techflow.com",
    name: "Sarah Mitchell",
    company: "TechFlow SaaS",
    projects: [
      {
        id: "proj-001",
        name: "AI Lead Qualification System",
        phase: "Live",
        progress: 100,
        nextMilestone: "Monthly optimization review",
        nextMilestoneDate: "2024-04-15",
        description: "Automated lead scoring and qualification using AI, integrated with HubSpot and Calendly.",
      },
      {
        id: "proj-002",
        name: "Customer Support Chatbot",
        phase: "Build",
        progress: 65,
        nextMilestone: "Beta testing begins",
        nextMilestoneDate: "2024-03-25",
        description: "AI-powered chatbot for handling common support inquiries and routing complex issues.",
      },
    ],
    deliverables: [
      {
        id: "del-001",
        name: "Project Kickoff Recording",
        type: "video",
        date: "2024-02-15",
        url: "https://www.loom.com/share/example1",
        thumbnail: "/images/deliverables/video-thumb-1.jpg",
      },
      {
        id: "del-002",
        name: "Workflow Architecture Document",
        type: "pdf",
        date: "2024-02-18",
        url: "/deliverables/architecture-doc.pdf",
      },
      {
        id: "del-003",
        name: "Live Automation Dashboard",
        type: "link",
        date: "2024-03-01",
        url: "https://make.com/dashboard/example",
      },
      {
        id: "del-004",
        name: "UI Mockups - Chatbot",
        type: "figma",
        date: "2024-03-10",
        url: "https://figma.com/file/example",
      },
    ],
    messages: [
      {
        id: "msg-001",
        author: "Alex Chen",
        role: "Lead Engineer",
        content: "Welcome to the client portal! I'll be posting regular updates here as we build your automation systems.",
        date: "2024-02-15T10:00:00Z",
        type: "update",
      },
      {
        id: "msg-002",
        author: "Alex Chen",
        role: "Lead Engineer",
        content: "🎉 Milestone complete: Lead qualification workflow is now live! Check the deliverables tab for the dashboard link.",
        date: "2024-03-01T14:30:00Z",
        type: "milestone",
      },
      {
        id: "msg-003",
        author: "Alex Chen",
        role: "Lead Engineer",
        content: "Quick question: Should the chatbot escalate to support@ or sales@ for pricing inquiries?",
        date: "2024-03-12T09:15:00Z",
        type: "question",
      },
      {
        id: "msg-004",
        author: "Alex Chen",
        role: "Lead Engineer",
        content: "Beta testing is going well! 85% of inquiries are being handled automatically. See the latest metrics in the deliverables.",
        date: "2024-03-20T16:45:00Z",
        type: "update",
      },
    ],
    invoices: [
      {
        id: "inv-001",
        number: "INV-2024-001",
        date: "2024-02-15",
        amount: 3500,
        status: "Paid",
        pdfUrl: "/invoices/INV-2024-001.pdf",
      },
      {
        id: "inv-002",
        number: "INV-2024-002",
        date: "2024-03-01",
        amount: 2400,
        status: "Paid",
        pdfUrl: "/invoices/INV-2024-002.pdf",
      },
      {
        id: "inv-003",
        number: "INV-2024-003",
        date: "2024-03-15",
        amount: 1800,
        status: "Due",
        pdfUrl: "/invoices/INV-2024-003.pdf",
      },
    ],
    timeline: [
      {
        id: "tl-001",
        name: "Discovery Workshop",
        date: "2024-02-15",
        status: "Complete",
        description: "Initial requirements gathering and workflow mapping",
      },
      {
        id: "tl-002",
        name: "Architecture Design",
        date: "2024-02-18",
        status: "Complete",
        description: "Technical specification and tool selection",
      },
      {
        id: "tl-003",
        name: "Lead Qualification Build",
        date: "2024-03-01",
        status: "Complete",
        description: "Core automation workflow development",
      },
      {
        id: "tl-004",
        name: "Chatbot Development",
        date: "2024-03-25",
        status: "In Progress",
        description: "AI training and conversation flow design",
      },
      {
        id: "tl-005",
        name: "Beta Testing",
        date: "2024-04-01",
        status: "Upcoming",
        description: "User acceptance testing and feedback collection",
      },
      {
        id: "tl-006",
        name: "Production Launch",
        date: "2024-04-08",
        status: "Upcoming",
        description: "Go-live and team training",
      },
    ],
  },
  "marcus@luxehome.com": {
    id: "client-002",
    email: "marcus@luxehome.com",
    name: "Marcus Johnson",
    company: "LuxeHome Decor",
    projects: [
      {
        id: "proj-003",
        name: "AI Customer Support Bot",
        phase: "Live",
        progress: 100,
        nextMilestone: "Quarterly performance review",
        nextMilestoneDate: "2024-04-30",
        description: "24/7 AI chatbot handling order inquiries, returns, and product questions.",
      },
    ],
    deliverables: [
      {
        id: "del-005",
        name: "Implementation Walkthrough",
        type: "video",
        date: "2024-01-20",
        url: "https://www.loom.com/share/example2",
        thumbnail: "/images/deliverables/video-thumb-2.jpg",
      },
      {
        id: "del-006",
        name: "Training Guide",
        type: "pdf",
        date: "2024-01-22",
        url: "/deliverables/training-guide.pdf",
      },
    ],
    messages: [
      {
        id: "msg-005",
        author: "Alex Chen",
        role: "Lead Engineer",
        content: "Your chatbot is now handling 80% of inquiries automatically! Check out the performance metrics.",
        date: "2024-02-01T11:00:00Z",
        type: "milestone",
      },
    ],
    invoices: [
      {
        id: "inv-004",
        number: "INV-2024-010",
        date: "2024-01-15",
        amount: 2800,
        status: "Paid",
        pdfUrl: "/invoices/INV-2024-010.pdf",
      },
    ],
    timeline: [
      {
        id: "tl-007",
        name: "Discovery",
        date: "2024-01-08",
        status: "Complete",
        description: "Requirements gathering",
      },
      {
        id: "tl-008",
        name: "Build & Training",
        date: "2024-01-20",
        status: "Complete",
        description: "AI model training",
      },
      {
        id: "tl-009",
        name: "Live Deployment",
        date: "2024-01-25",
        status: "Complete",
        description: "Production launch",
      },
    ],
  },
  "demo@example.com": {
    id: "demo-client",
    email: "demo@example.com",
    name: "Demo User",
    company: "Demo Company",
    projects: [
      {
        id: "proj-demo",
        name: "Sample Automation Project",
        phase: "Build",
        progress: 45,
        nextMilestone: "Workflow testing",
        nextMilestoneDate: "2024-04-01",
        description: "This is a demo project to showcase the client portal features.",
      },
    ],
    deliverables: [
      {
        id: "del-demo-1",
        name: "Demo Video",
        type: "video",
        date: "2024-03-15",
        url: "https://www.loom.com/share/demo",
      },
      {
        id: "del-demo-2",
        name: "Sample Document",
        type: "pdf",
        date: "2024-03-16",
        url: "#",
      },
    ],
    messages: [
      {
        id: "msg-demo-1",
        author: "Alex Chen",
        role: "Lead Engineer",
        content: "Welcome to the demo client portal! This is where you'll see all project updates and deliverables.",
        date: "2024-03-15T10:00:00Z",
        type: "update",
      },
    ],
    invoices: [
      {
        id: "inv-demo-1",
        number: "INV-DEMO-001",
        date: "2024-03-15",
        amount: 3500,
        status: "Paid",
        pdfUrl: "#",
      },
    ],
    timeline: [
      {
        id: "tl-demo-1",
        name: "Discovery",
        date: "2024-03-10",
        status: "Complete",
        description: "Initial workshop",
      },
      {
        id: "tl-demo-2",
        name: "Build Phase",
        date: "2024-03-25",
        status: "In Progress",
        description: "Core development",
      },
      {
        id: "tl-demo-3",
        name: "Testing",
        date: "2024-04-05",
        status: "Upcoming",
        description: "QA and UAT",
      },
    ],
  },
};

// Helper function to get client by email
export function getClientByEmail(email: string): ClientData | null {
  return clientsData[email.toLowerCase()] || null;
}

// List of allowed client emails for authentication
export const allowedClientEmails = Object.keys(clientsData);
