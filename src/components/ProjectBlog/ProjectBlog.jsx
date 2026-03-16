import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { BsArrowLeft, BsGithub, BsRobot } from "react-icons/bs";
import { SiGooglecloud, SiFastapi, SiPostgresql, SiSupabase, SiNetlify, SiWhatsapp } from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrain, TbNetwork, TbPhone, TbChartBar, TbWorldWww, TbDeviceMobile, TbQrcode, TbTool } from "react-icons/tb";
import { MdHub, MdPayment } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import "./ProjectBlog.css";

// ─── Blog Data ────────────────────────────────────────────────────────────────
const BLOG_DATA = {
  "ran-optimizer": {
    id: "ran-optimizer",
    title: "RAN Optimizer",
    subtitle: "Telecom Network Intelligence",
    client: "Major South Africa Telecom",
    duration: "Ongoing Production",
    role: "AI Engineer",
    tags: ["Google ADK", "FastAPI", "Multi-Agent", "RAG", "Telecom"],
    overview:
      "Enterprise-grade multi-agent system built for a major South Africa telecom client to automate Radio Access Network (RAN) optimization. Three specialized agents process live tower KPI data, perform deep parameter reasoning, and surface actionable optimization recommendations.",
    sections: [
      {
        type: "challenge",
        heading: "The Challenge",
        body: "Managing thousands of cell towers across South Africa's network meant engineers were manually sifting through mountains of KPI data to detect degradation, plan optimizations, and report outcomes — a process costing hundreds of engineer-hours weekly with high margin for error.",
      },
      {
        type: "architecture",
        heading: "Agent Architecture",
        body: "We designed three specialized agents working in concert: a Data Fetcher agent that pulls live KPI streams from UI services and tower site addresses, a Reasoning agent that cross-references parameters against optimization thresholds, and an Action agent that generates and logs recommendations. All orchestrated via Google ADK.",
        chips: [
          { icon: BsRobot, label: "Data Fetcher Agent" },
          { icon: TbBrain, label: "Reasoning Agent" },
          { icon: GiArtificialIntelligence, label: "Action Agent" },
          { icon: MdHub, label: "Google ADK Orchestration" },
          { icon: SiFastapi, label: "FastAPI Backend" },
          { icon: SiPostgresql, label: "PostgreSQL" },
        ],
      },
      {
        type: "feature",
        heading: "Map-Based Dashboard",
        body: "Engineers interact with a real-time map overlay showing all tower sites colour-coded by health status. Clicking any site loads its full KPI breakdown, agent recommendations, and historical trend data — reducing the time to diagnose a degraded site from hours to seconds.",
      },
      {
        type: "impact",
        heading: "Impact & Savings",
        body: "The platform quantifies savings in real time — showing engineers exactly how many hours of manual analysis were automated and how much data processing overhead was eliminated. Early deployments showed over 60% reduction in optimization cycle time.",
        stats: [
          { value: "3", label: "Specialized Agents" },
          { value: "60%+", label: "Cycle Time Saved" },
          { value: "Live", label: "KPI Data Streams" },
          { value: "1000s", label: "Tower Sites" },
        ],
      },
      {
        type: "stack",
        heading: "Tech Stack",
        chips: [
          { icon: GiArtificialIntelligence, label: "Google ADK" },
          { icon: SiFastapi, label: "FastAPI" },
          { icon: SiPostgresql, label: "PostgreSQL" },
          { icon: TbBrain, label: "RAG Pipeline" },
          { icon: SiGooglecloud, label: "Google Cloud" },
          { icon: TbNetwork, label: "Live UI Services" },
        ],
      },
    ],
    ghLink: null,
  },

  spatialpal: {
    id: "spatialpal",
    title: "spatialpal",
    subtitle: "Agentic Planner for GE SmallWorld",
    client: "GE SmallWorld",
    duration: "Prototype → Production",
    role: "AI Engineer",
    tags: ["Google ADK", "RAG", "Pinecone", "LangFuse", "FastAPI"],
    overview:
      "Production-grade RAG agent built for GE SmallWorld users. The agent generates dynamic PostgreSQL queries, performs multi-model LLM benchmarking via LangFuse, and retrieves context through a Pinecone vector index — all orchestrated with Google ADK.",
    sections: [
      {
        type: "challenge",
        heading: "The Problem",
        body: "GE SmallWorld planners needed to query complex geospatial and network planning data without writing SQL. The challenge was building an agent that could reason over documentation, generate accurate queries, and benchmark itself across multiple LLMs.",
      },
      {
        type: "architecture",
        heading: "RAG + Agent Pipeline",
        body: "Documents are chunked and indexed into Pinecone. At query time, the agent retrieves relevant context, reasons over it, and generates PostgreSQL queries dynamically. LangFuse tracks every inference across models — enabling true apples-to-apples evaluation.",
        chips: [
          { icon: TbBrain, label: "RAG Retrieval" },
          { icon: GiArtificialIntelligence, label: "Google ADK Agent" },
          { icon: TbChartBar, label: "LangFuse Evals" },
          { icon: SiPostgresql, label: "PostgreSQL" },
          { icon: SiFastapi, label: "FastAPI" },
          { icon: SiGooglecloud, label: "Pinecone Index" },
        ],
      },
      {
        type: "impact",
        heading: "Results",
        body: "Multi-model benchmarking revealed clear performance deltas across LLMs on the SmallWorld domain. The agent reduced planner query time from manual SQL authoring to natural language in seconds.",
        stats: [
          { value: "RAG", label: "Retrieval Engine" },
          { value: "Multi", label: "Model Benchmarks" },
          { value: "Live", label: "PostgreSQL Queries" },
          { value: "React", label: "Tailwind Frontend" },
        ],
      },
    ],
    ghLink: null,
  },

  snowflow: {
    id: "snowflow",
    title: "Snowflow",
    subtitle: "Intelligent JIRA & ServiceNow Automation",
    client: "Internal / Enterprise",
    duration: "Prototype",
    role: "AI Engineer",
    tags: ["Google ADK", "MCP", "JIRA", "ServiceNow", "RAG", "HitL"],
    overview:
      "Agentic workflow engine connecting Atlassian and ServiceNow via MCP integrations. Automates incident creation, performs RAG-based risk analysis using a 15-question evaluation document, and incorporates human-in-the-loop for missing details.",
    sections: [
      {
        type: "challenge",
        heading: "The Problem",
        body: "JIRA tickets were being manually triaged, ServiceNow incidents created by hand, and risk assessments done ad-hoc. The goal was a fully automated pipeline that could reason over ticket data and flag gaps to humans intelligently.",
      },
      {
        type: "architecture",
        heading: "MCP + RAG + HitL",
        body: "Snowflow connects to Atlassian MCP and a community ServiceNow MCP from GitHub. When a JIRA event fires, the agent runs a 15-question RAG evaluation against the ticket. If answers are missing, it pauses and prompts the user — human-in-the-loop via Google ADK's interrupt mechanism.",
        chips: [
          { icon: MdHub, label: "Atlassian MCP" },
          { icon: MdHub, label: "ServiceNow MCP" },
          { icon: TbBrain, label: "RAG Risk Analysis" },
          { icon: GiArtificialIntelligence, label: "Google ADK" },
          { icon: TbNetwork, label: "Human-in-the-Loop" },
          { icon: SiFastapi, label: "FastAPI" },
        ],
      },
      {
        type: "impact",
        heading: "Impact",
        body: "End-to-end JIRA-to-ServiceNow incident automation with intelligent risk scoring. Engineers stopped doing manual triage entirely for standard incident patterns.",
        stats: [
          { value: "15Q", label: "RAG Evaluation" },
          { value: "2x", label: "MCP Integrations" },
          { value: "HitL", label: "Smart Interrupts" },
          { value: "Auto", label: "Incident Creation" },
        ],
      },
    ],
    ghLink: null,
  },

  "voice-poc": {
    id: "voice-poc",
    title: "Voice AI Pipeline",
    subtitle: "Multilingual Human-Like Voice Bot",
    client: "Internal POC → Client Demos",
    duration: "POC",
    role: "AI Engineer",
    tags: ["ElevenLabs", "WhisperX", "Pyannote", "SIP", "Google ADK"],
    overview:
      "End-to-end voice intelligence pipeline using WhisperX for transcription, Pyannote 3.1 for speaker diarization, and ElevenLabs for voice-matched multilingual translation. Deployed over SIP channels via 3SIP.",
    sections: [
      {
        type: "challenge",
        heading: "The Challenge",
        body: "Building a voice bot that could handle multi-speaker audio, identify who is speaking, match voices, and translate — all in a reusable, production-ready pipeline for SIP, customer care, and transcription use cases.",
      },
      {
        type: "architecture",
        heading: "The Pipeline",
        body: "Audio flows through WhisperX for transcription, then Pyannote 3.1 diarizes the clip to identify unique speakers. The agent maps each speaker to a saved ElevenLabs voice ID, then generates translated audio in the matched voice — preserving speaker identity across languages.",
        chips: [
          { icon: TbPhone, label: "WhisperX Transcription" },
          { icon: TbBrain, label: "Pyannote 3.1 Diarization" },
          { icon: TbPhone, label: "ElevenLabs TTS" },
          { icon: TbNetwork, label: "3SIP Channels" },
          { icon: GiArtificialIntelligence, label: "Google ADK" },
          { icon: SiFastapi, label: "FastAPI Backend" },
        ],
      },
      {
        type: "impact",
        heading: "Reusability & Impact",
        body: "The pipeline is fully modular — reused for SIP deployments, customer care bots, translation POCs, and transcription services. Currently in active client discussions for production deployment.",
        stats: [
          { value: "3.1", label: "Pyannote Model" },
          { value: "SIP", label: "Channel Support" },
          { value: "Multi", label: "Speaker Diarization" },
          { value: "11Labs", label: "Voice Matching" },
        ],
      },
    ],
    ghLink: null,
  },

  "youtube-finder": {
    id: "youtube-finder",
    title: "YouTube Product Finder",
    subtitle: "Pause & Shop with Computer Vision",
    client: "Personal POC",
    duration: "POC",
    role: "ML Engineer",
    tags: ["YOLOv", "SerpAPI", "Google Shopping", "Computer Vision"],
    overview:
      "Computer vision POC that detects on-screen products when a YouTube video is paused using a YOLOv model. Fetches real-time product links via SerpAPI and Google Shopping APIs.",
    sections: [
      {
        type: "challenge",
        heading: "The Idea",
        body: "What if you could pause any YouTube video and instantly shop every product on screen? The challenge was combining real-time object detection with product search in a seamless browser experience.",
      },
      {
        type: "architecture",
        heading: "How It Works",
        body: "On video pause, a YOLOv model runs inference on the current frame, detecting and bounding all visible products. Each detected object is passed as a search query to SerpAPI configured with Google Shopping — returning live product links and prices.",
        chips: [
          { icon: GiArtificialIntelligence, label: "YOLOv Detection" },
          { icon: TbNetwork, label: "SerpAPI" },
          { icon: SiGooglecloud, label: "Google Shopping" },
          { icon: TbBrain, label: "Frame Inference" },
        ],
      },
      {
        type: "impact",
        heading: "Outcome",
        body: "A working POC that demonstrates seamless integration between computer vision and product search — a strong foundation for shoppable video experiences.",
        stats: [
          { value: "YOLO", label: "Object Detection" },
          { value: "Live", label: "Product Links" },
          { value: "Pause", label: "Trigger Mechanism" },
          { value: "CV", label: "Computer Vision" },
        ],
      },
    ],
    ghLink: null,
  },

  mindpeers: {
    id: "mindpeers",
    title: "MindPeers Clone",
    subtitle: "AI Therapist App",
    client: "Pitching to Enterprise Clients",
    duration: "Full Build",
    role: "Full Stack AI Engineer",
    tags: ["React Native", "Expo", "Google ADK", "FastAPI", "Wearables"],
    overview:
      "Full-stack clone of the Shark Tank-featured MindPeers app. Features an AI therapist agent, wearable-based stress analysis, gamification to drive engagement, and a complete React Native (Expo) frontend.",
    sections: [
      {
        type: "challenge",
        heading: "The Vision",
        body: "Clone and extend MindPeers — a Shark Tank-featured mental wellness app — with a real AI therapist agent, wearable integration for stress detection, and gamification that keeps users engaged long-term.",
      },
      {
        type: "architecture",
        heading: "Architecture",
        body: "React Native (Expo) frontend connects to a FastAPI backend powered by a Google ADK therapist agent. Wearable data (stress metrics, heart rate) is ingested and logged to trigger agent responses. Gamification layers reward streaks and milestones.",
        chips: [
          { icon: GiArtificialIntelligence, label: "AI Therapist Agent" },
          { icon: TbPhone, label: "React Native Expo" },
          { icon: SiFastapi, label: "FastAPI Backend" },
          { icon: TbBrain, label: "Google ADK" },
          { icon: TbNetwork, label: "Wearable Integration" },
          { icon: TbChartBar, label: "Gamification Engine" },
        ],
      },
      {
        type: "impact",
        heading: "Status",
        body: "Fully functional application currently being pitched to enterprise wellness clients. Demonstrates end-to-end AI product development from concept to client-ready delivery.",
        stats: [
          { value: "AI", label: "Therapist Agent" },
          { value: "Watch", label: "Stress Analysis" },
          { value: "Expo", label: "Mobile Frontend" },
          { value: "Live", label: "Client Pitches" },
        ],
      },
    ],
    ghLink: null,
  },

  "getyourkarigar": {
    id: "getyourkarigar",
    title: "GetYourKarigar",
    subtitle: "Furniture Repair & Carpentry Marketplace",
    client: "Personal Venture — Live on Netlify",
    duration: "Shipped & Live",
    role: "Full Stack Developer & Founder",
    tags: ["React", "Node.js", "NeonDB", "WhatsApp API", "Google OAuth"],
    demoLink: "https://getyourkarigar.netlify.app",
    overview:
      "A full-stack marketplace solving a real family problem — connecting homeowners with trusted carpenters for furniture repair, carpentry, and interior work. My father has been a carpenter for 30 years. I built the platform he never had. Currently live with WhatsApp lead delivery, Google Sign-In, inquiry management, and a mobile app for carpenters.",
    sections: [
      {
        type: "challenge",
        heading: "The Problem Worth Solving",
        body: "Finding a reliable carpenter for small furniture repairs is surprisingly hard. Platforms like UrbanClap are expensive and impersonal. My father runs a 30-year carpentry business that still relies on word of mouth. I built GetYourKarigar to give skilled carpenters a digital presence and give homeowners a fast, trusted way to find them.",
      },
      {
        type: "architecture",
        heading: "How It Works",
        body: "Users browse service configurations on the web app, select their requirement, and raise an inquiry. Each new inquiry instantly triggers a WhatsApp notification to us via the WhatsApp Business API using a pre-built template. Users log in with Google OAuth — their Google user ID, name, and email are stored in the database. A user can only have one active inquiry at a time, keeping the workflow clean.",
        chips: [
          { icon: SiWhatsapp, label: "WhatsApp Lead Delivery" },
          { icon: GiArtificialIntelligence, label: "Google OAuth Sign-In" },
          { icon: SiPostgresql, label: "NeonDB (PostgreSQL)" },
          { icon: SiFastapi, label: "Node.js Backend" },
          { icon: SiNetlify, label: "Netlify Frontend" },
          { icon: TbDeviceMobile, label: "Carpenter Mobile App" },
        ],
      },
      {
        type: "feature",
        heading: "Carpenter Mobile App",
        body: "I built a companion mobile app for carpenters to manage live leads. The workflow: carpenter visits the site → marks the lead as 'currently visiting' → uploads a quotation with a diagram, labour breakdown, and materials list. We review, negotiate, and either approve or assign to another carpenter. If unresolved in 90 days, the lead auto-closes.",
      },
      {
        type: "feature",
        heading: "Services & Projects Showcase",
        body: "The platform lists all services we offer — furniture repair, interiors, custom carpentry — as well as an enterprise solutions section. A Projects tab shows completed work in a block format with timelines and customer requirements, building trust before the first inquiry.",
      },
      {
        type: "impact",
        heading: "Status & Traction",
        body: "Frontend live on Netlify, backend on Render, database on NeonDB. The platform is fully functional and actively receiving inquiries. Still adding project images and videos to complete the showcase section.",
        stats: [
          { value: "Live", label: "Deployed & Active" },
          { value: "30yr", label: "Family Business" },
          { value: "WA", label: "Instant Lead Alerts" },
          { value: "90d", label: "Lead Lifecycle" },
        ],
      },
      {
        type: "stack",
        heading: "Tech Stack",
        chips: [
          { icon: TbWorldWww, label: "React Frontend" },
          { icon: SiFastapi, label: "Node.js Backend" },
          { icon: SiPostgresql, label: "NeonDB" },
          { icon: SiNetlify, label: "Netlify + Render" },
          { icon: SiWhatsapp, label: "WhatsApp API" },
          { icon: TbDeviceMobile, label: "Mobile App" },
        ],
      },
    ],
    ghLink: null,
  },

  "pos-system": {
    id: "pos-system",
    title: "Restaurant POS",
    subtitle: "Digital Menu & Order Management System",
    client: "Personal Project — Pitched to Restaurants",
    duration: "Prototype",
    role: "Frontend Developer & Product Designer",
    tags: ["React", "Supabase", "QR Menus", "Real-time", "POS"],
    demoLink: "",
    overview:
      "A fully frontend-driven Point of Sale system for restaurants — built with Supabase for real-time data, zero backend infrastructure. Features multi-screen kitchen and waiter views, QR-code digital menus per table, and dynamic table-based order management. Pitched to multiple restaurants as an affordable alternative to expensive POS incumbents.",
    sections: [
      {
        type: "challenge",
        heading: "The Problem",
        body: "Restaurant POS systems are expensive, complex to deploy, and overkill for small establishments. I wanted to prove you could build a competitive system with just a frontend and Supabase — no backend, no heavy infra, no license fees.",
      },
      {
        type: "architecture",
        heading: "Multi-Screen Architecture",
        body: "The system runs on multiple screens simultaneously — a kitchen display showing incoming orders, a waiter tablet for adding and modifying orders, and a manager view for table overview. All screens sync in real-time via Supabase's live subscriptions. Every table gets a unique QR code that opens a digital menu — customers can browse the full menu before ordering.",
        chips: [
          { icon: SiSupabase, label: "Supabase Real-time" },
          { icon: TbQrcode, label: "QR Digital Menus" },
          { icon: TbDeviceMobile, label: "Kitchen Display" },
          { icon: TbDeviceMobile, label: "Waiter Tablet View" },
          { icon: MdPayment, label: "Order Management" },
          { icon: TbTool, label: "Menu Builder" },
        ],
      },
      {
        type: "feature",
        heading: "QR-Based Digital Menu",
        body: "Each physical table has a unique QR code. Scanning it opens a live digital menu for that table — customers can see items, descriptions, and prices. Tables are numbered 1 to N based on restaurant configuration. Orders placed at the table flow directly into the kitchen display.",
      },
      {
        type: "feature",
        heading: "Menu & Dish Management",
        body: "Restaurant managers can add, remove, and update dishes from a simple admin interface. Changes reflect immediately across all screens and QR menus — no app updates, no cache clearing. Built for non-technical restaurant owners to manage themselves.",
      },
      {
        type: "impact",
        heading: "Outcome",
        body: "Pitched to multiple restaurants but couldn't displace established POS systems already in use. However, the project proved a full POS workflow is achievable with pure frontend + Supabase — a strong technical POC with real business validation attempts.",
        stats: [
          { value: "0", label: "Backend Required" },
          { value: "Live", label: "Real-time Sync" },
          { value: "QR", label: "Per-Table Menus" },
          { value: "Multi", label: "Screen Views" },
        ],
      },
      {
        type: "stack",
        heading: "Tech Stack",
        chips: [
          { icon: TbWorldWww, label: "React Frontend" },
          { icon: SiSupabase, label: "Supabase" },
          { icon: TbQrcode, label: "QR Generation" },
          { icon: TbDeviceMobile, label: "Multi-Screen UI" },
        ],
      },
    ],
    ghLink: null,
  },
};

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, delay }) {
  return (
    <div className="blog-stat-card reveal" style={{ animationDelay: delay }}>
      <span className="blog-stat-value">{value}</span>
      <span className="blog-stat-label">{label}</span>
    </div>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ icon: Icon, label }) {
  return (
    <span className="blog-chip">
      <Icon className="blog-chip-icon" />
      {label}
    </span>
  );
}

// ─── Section Renderer ─────────────────────────────────────────────────────────
function BlogSection({ section, index }) {
  const delay = `${index * 0.08}s`;
  return (
    <div className={`blog-section blog-section--${section.type} reveal`} style={{ animationDelay: delay }}>
      {section.heading && (
        <h3 className="blog-section-heading">
          <span className="blog-section-accent" />
          {section.heading}
        </h3>
      )}
      {section.body && <p className="blog-section-body">{section.body}</p>}
      {section.chips && (
        <div className="blog-chips">
          {section.chips.map((c, i) => (
            <Chip key={i} icon={c.icon} label={c.label} />
          ))}
        </div>
      )}
      {section.stats && (
        <div className="blog-stats">
          {section.stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} delay={`${i * 0.1}s`} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function ProjectBlog({ blogId: propBlogId }) {
  const { blogId: paramBlogId } = useParams() || {};
  const blogId = propBlogId || paramBlogId;
  const navigate = useNavigate();
  const blog = BLOG_DATA[blogId];
  const heroRef = useRef(null);
  const [scrolled, setScrolled] = useState(0);

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return (
      <div className="blog-not-found">
        <h2>Blog not found.</h2>
        <button className="blog-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  const parallaxStyle = {
    transform: `translateY(${scrolled * 0.28}px)`,
    opacity: Math.max(0, 1 - scrolled / 420),
  };

  const isPersonal = blog.id === "getyourkarigar" || blog.id === "pos-system";

  return (
    <div className={`blog-page ${isPersonal ? "blog-page--personal" : ""}`}>
      {/* ── Hero ── */}
      <div className={`blog-hero ${isPersonal ? "blog-hero--personal" : ""}`} ref={heroRef}>
        <div className="blog-hero-grid" />
        <div className="blog-hero-glow" />
        <div className="blog-hero-content" style={parallaxStyle}>
          <div className="blog-hero-tags">
            {blog.tags.map((t) => (
              <span key={t} className="blog-tag">{t}</span>
            ))}
          </div>
          <h1 className="blog-hero-title">
            {blog.title}
            <span className="blog-hero-dot">.</span>
          </h1>
          <p className="blog-hero-subtitle">{blog.subtitle}</p>
          <div className="blog-hero-meta">
            <span>📍 {blog.client}</span>
            <span className="blog-meta-divider">·</span>
            <span>⏱ {blog.duration}</span>
            <span className="blog-meta-divider">·</span>
            <span>🧑‍💻 {blog.role}</span>
          </div>
        </div>
        <div className="blog-hero-scroll-hint">
          <span />
        </div>
      </div>

      {/* ── Body ── */}
      <Container className="blog-body">
        {/* Overview */}
        <div className="blog-overview reveal">
          <p>{blog.overview}</p>
        </div>

        {/* Sections */}
        <div className="blog-sections">
          {blog.sections.map((section, i) => (
            <BlogSection key={i} section={section} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="blog-cta reveal">
          {blog.ghLink && (
            <a href={blog.ghLink} target="_blank" rel="noreferrer" className="blog-cta-btn blog-cta-btn--primary">
              <BsGithub /> View on GitHub
            </a>
          )}
          {blog.demoLink && (
            <a href={blog.demoLink} target="_blank" rel="noreferrer" className="blog-cta-btn blog-cta-btn--demo">
              <CgWebsite /> View Live Site
            </a>
          )}
          <button className="blog-cta-btn blog-cta-btn--ghost" onClick={() => navigate(-1)}>
            <BsArrowLeft /> Back to Projects
          </button>
        </div>
      </Container>
    </div>
  );
}

export default ProjectBlog;
export { BLOG_DATA };