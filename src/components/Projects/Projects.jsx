import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import "./Projects.css";

// ─── Import your project images here ──────────────────────────────────────────
// Example structure — replace with actual imports:
// import ran1 from "../../Assets/Projects/ran-optimizer/ran1.png";
// import ran2 from "../../Assets/Projects/ran-optimizer/ran2.png";
// import pal1 from "../../Assets/Projects/spatialpal/pal1.png";
// ...etc

// For now we use placeholder arrays — swap in your real imports
const PROJECT_DATA = [
  {
    id: "ran-optimizer",
    title: "RAN Optimizer",
    subtitle: "Telecom Network Intelligence",
    description:
      "Enterprise-grade multi-agent system built for a major South Africa telecom client to automate Radio Access Network (RAN) optimization. Three specialized agents process live tower KPI data, perform deep parameter reasoning, and surface actionable optimization recommendations.",
    tags: ["Google ADK", "Multi-Agent", "Telecom"],
    images: [], // e.g. [ran1, ran2, ran3]
    isBlog: true,
    blogId: "ran-optimizer",
  },
  {
    id: "spatialpal",
    title: "SpatialPAL",
    subtitle: "Agentic Planner — GE SmallWorld",
    description:
      "Production-grade RAG agent built for GE SmallWorld users using Google ADK. The agent generates dynamic PostgreSQL queries, performs multi-model LLM benchmarking via LangFuse, and retrieves context through a Pinecone vector index.",
    tags: ["RAG", "LangFuse", "FastAPI"],
    images: [], // e.g. [pal1, pal2]
    isBlog: true,
    blogId: "spatialpal",
  },
  {
    id: "snowflow",
    title: "Snowflow",
    subtitle: "Intelligent JIRA Automation",
    description:
      "Agentic workflow engine connecting Atlassian and ServiceNow via MCP integrations. Automates incident creation, performs RAG-based risk analysis using a 15-question evaluation document, and incorporates human-in-the-loop for missing details.",
    tags: ["MCP", "JIRA", "HitL"],
    images: [],
    isBlog: true,
    blogId: "snowflow",
  },
  {
    id: "voice-poc",
    title: "Voice AI Pipeline",
    subtitle: "Multilingual Voice Bot",
    description:
      "End-to-end voice intelligence pipeline using WhisperX for transcription, Pyannote 3.1 for speaker diarization, and ElevenLabs for voice-matched multilingual translation. Deployed over SIP channels via 3SIP.",
    tags: ["ElevenLabs", "WhisperX", "SIP"],
    images: [],
    isBlog: true,
    blogId: "voice-poc",
  },
  {
    id: "youtube-finder",
    title: "YouTube Product Finder",
    subtitle: "Pause & Shop with Computer Vision",
    description:
      "Computer vision POC that detects on-screen products when a YouTube video is paused using a YOLOv model. Fetches real-time product links via SerpAPI and Google Shopping APIs.",
    tags: ["YOLOv", "CV", "SerpAPI"],
    images: [],
    isBlog: true,
    blogId: "youtube-finder",
  },
  {
    id: "mindpeers",
    title: "MindPeers Clone",
    subtitle: "AI Therapist App",
    description:
      "Full-stack clone of the Shark Tank-featured MindPeers app. Features an AI therapist agent, wearable-based stress analysis, gamification to drive engagement, and a complete React Native (Expo) frontend.",
    tags: ["React Native", "Google ADK", "Wearables"],
    images: [],
    isBlog: true,
    blogId: "mindpeers",
  },
];

// ─── Animated heading word ────────────────────────────────────────────────────
function AnimatedHeading() {
  const [active, setActive] = useState(0);
  const words = ["Built.", "Shipped.", "Deployed."];

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % words.length), 1800);
    return () => clearInterval(t);
  });

  return (
    <div className="proj-heading-wrap">
      <h1 className="proj-heading">
        AI Projects I&apos;ve{" "}
        <span className="proj-heading-cycle">
          {words.map((w, i) => (
            <span key={w} className={`proj-heading-word ${i === active ? "proj-heading-word--active" : ""}`}>
              {w}
            </span>
          ))}
        </span>
      </h1>
      <p className="proj-subheading">
        From RAG pipelines to voice bots — production-grade agentic systems built for real clients.
      </p>
    </div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "6", label: "AI Projects" },
    { value: "3+", label: "Enterprise Clients POCs" },
    { value: "5+", label: "Agent Architectures" },
    { value: "2yr", label: "ADK Experience" },
  ];
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold: 0.2 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`proj-stats ${vis ? "proj-stats--vis" : ""}`}>
      {stats.map((s, i) => (
        <div key={s.label} className="proj-stat" style={{ transitionDelay: `${i * 0.1}s` }}>
          <span className="proj-stat-val">{s.value}</span>
          <span className="proj-stat-lbl">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function Projects() {
  return (
    <div className="proj-page">
      {/* Background grid */}
      <div className="proj-bg-grid" />
      <div className="proj-bg-glow proj-bg-glow--left" />
      <div className="proj-bg-glow proj-bg-glow--right" />

      <Container className="proj-container">
        <AnimatedHeading />
        <StatsBar />

        <Row className="proj-grid" style={{ justifyContent: "center" }}>
          {PROJECT_DATA.map((project, i) => (
            <Col
              key={project.id}
              md={4}
              className="proj-col"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                images={project.images}
                tags={project.tags}
                isBlog={project.isBlog}
                blogId={project.blogId}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Projects;
