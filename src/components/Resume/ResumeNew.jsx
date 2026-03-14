import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrain, TbNetwork, TbPhone, TbCode } from "react-icons/tb";
import { BsRobot, BsMortarboard, BsBuilding } from "react-icons/bs";
import { MdHub } from "react-icons/md";
import { SiFastapi, SiGooglecloud } from "react-icons/si";
import "./ResumeNew.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// ── Data ───────────────────────────────────────────────
const EXPERIENCE = [
  {
    period: "2024 – Present",
    role: "AI Engineer",
    company: "Tata Consultancy Services",
    type: "ai",
    icon: GiArtificialIntelligence,
    color: "#38bdf8",
    highlights: [
      "Architected 6 production-grade agentic AI systems using Google ADK",
      "Built RAN Optimizer for major South Africa telecom — 3-agent multi-agent system with live KPI data",
      "Developed SpatialPAL (RAG + LangFuse eval) for GE SmallWorld users",
      "Created Snowflow — JIRA & ServiceNow automation via MCP integrations",
      "Built multilingual Voice AI pipeline: WhisperX + Pyannote + ElevenLabs",
    ],
  },
  {
    period: "2022 – 2024",
    role: "Salesforce Developer",
    company: "Tata Consultancy Services",
    type: "salesforce",
    icon: BsBuilding,
    color: "#818cf8",
    highlights: [
      "End-to-end Salesforce ecosystem design and implementation",
      "Apex, Lightning Web Components, and Agentforce architecture",
      "Delivered integrations accelerating client performance by 50%+",
      "Developed clean, OOP-driven code praised by client architects",
    ],
  },
];

const EDUCATION = [
  {
    period: "2018 – 2022",
    degree: "B.Tech — Computer Science",
    institution: "RAIT DY Patil, Navi Mumbai",
    icon: BsMortarboard,
    color: "#34d399",
  },
];

const CERTS = [
  { label: "Google ADK Certified",     icon: SiGooglecloud,           color: "#38bdf8", status: "earned" },
  { label: "Microsoft Azure AI Dev",   icon: GiArtificialIntelligence, color: "#818cf8", status: "in-progress" },
];

const SKILLS_FEATURED = [
  { icon: GiArtificialIntelligence, label: "Google ADK" },
  { icon: BsRobot,   label: "Agentic AI" },
  { icon: MdHub,     label: "MCP / A2A" },
  { icon: TbBrain,   label: "RAG" },
  { icon: SiFastapi, label: "FastAPI" },
  { icon: TbPhone,   label: "Voice AI" },
  { icon: TbNetwork, label: "Multi-Agent" },
  { icon: TbCode,    label: "FastAPI" },
];

// ── Scroll reveal hook ─────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ── Timeline item ──────────────────────────────────────
function TimelineItem({ item, index }) {
  const [ref, vis] = useReveal(0.1);
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`rv-timeline-item ${vis ? "rv-timeline-item--vis" : ""}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Line + dot */}
      <div className="rv-tl-spine">
        <div className="rv-tl-dot" style={{ background: item.color, boxShadow: `0 0 12px ${item.color}55` }} />
        <div className="rv-tl-line" />
      </div>

      {/* Card */}
      <div
        className={`rv-tl-card ${expanded ? "rv-tl-card--open" : ""}`}
        onClick={() => setExpanded(!expanded)}
        style={{ "--item-color": item.color }}
      >
        <div className="rv-tl-card-header">
          <div className="rv-tl-icon-wrap" style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}>
            <Icon className="rv-tl-icon" style={{ color: item.color }} />
          </div>
          <div className="rv-tl-meta">
            <span className="rv-tl-period">{item.period}</span>
            <strong className="rv-tl-role">{item.role || item.degree}</strong>
            <span className="rv-tl-company">{item.company || item.institution}</span>
          </div>
          <div className={`rv-tl-chevron ${expanded ? "rv-tl-chevron--open" : ""}`}>›</div>
        </div>

        {expanded && item.highlights && (
          <ul className="rv-tl-highlights">
            {item.highlights.map((h, i) => (
              <li key={i} className="rv-tl-highlight-item" style={{ animationDelay: `${i * 0.06}s` }}>
                <span className="rv-tl-bullet" style={{ background: item.color }} />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────
function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "pdf"
  const [headerRef, headerVis] = useReveal(0.1);
  const [certsRef, certsVis] = useReveal(0.1);
  const [skillsRef, skillsVis] = useReveal(0.1);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return (
    <div className="rv-page">
      <Container fluid className="resume-section rv-section">
        <Particle />
        <div className="rv-bg-grid" />
        <div className="rv-bg-glow rv-bg-glow--tl" />
        <div className="rv-bg-glow rv-bg-glow--br" />

        <Container className="rv-inner">

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className={`rv-header ${headerVis ? "rv-header--vis" : ""}`}
          >
            <div className="rv-header-text">
              <span className="rv-eyebrow">Career Profile</span>
              <h1 className="rv-title">
                Sahil <span className="rv-accent">Dhamnaskar</span>
              </h1>
              <p className="rv-subtitle">AI Engineer · Salesforce Developer · Tata Consultancy Services · Maharashtra, India</p>
            </div>

            {/* Tab switcher */}
            <div className="rv-tabs">
              <button
                className={`rv-tab ${activeTab === "overview" ? "rv-tab--active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                📋 Overview
              </button>
              <button
                className={`rv-tab ${activeTab === "pdf" ? "rv-tab--active" : ""}`}
                onClick={() => setActiveTab("pdf")}
              >
                📄 Full Resume
              </button>
            </div>

            <a
              href={pdf}
              target="_blank"
              rel="noreferrer"
              className="rv-download-btn"
            >
              <AiOutlineDownload /> Download CV
            </a>
          </div>

          {/* ── Overview tab ── */}
          {activeTab === "overview" && (
            <div className="rv-overview">
              <Row>
                <Col md={7}>

                  {/* Experience timeline */}
                  <h2 className="rv-section-heading">
                    <span className="rv-section-dot rv-section-dot--blue" /> Experience
                  </h2>
                  <div className="rv-timeline">
                    {EXPERIENCE.map((item, i) => (
                      <TimelineItem key={i} item={item} index={i} />
                    ))}
                  </div>

                  {/* Education */}
                  <h2 className="rv-section-heading" style={{ marginTop: 48 }}>
                    <span className="rv-section-dot rv-section-dot--green" /> Education
                  </h2>
                  <div className="rv-timeline">
                    {EDUCATION.map((item, i) => (
                      <TimelineItem key={i} item={item} index={i} />
                    ))}
                  </div>

                </Col>

                <Col md={5}>

                  {/* Certifications */}
                  <div ref={certsRef} className={`rv-certs ${certsVis ? "rv-certs--vis" : ""}`}>
                    <h2 className="rv-section-heading">
                      <span className="rv-section-dot rv-section-dot--indigo" /> Certifications
                    </h2>
                    <div className="rv-cert-list">
                      {CERTS.map((c, i) => (
                        <div
                          key={c.label}
                          className="rv-cert-card"
                          style={{ transitionDelay: `${i * 0.12}s`, "--cert-color": c.color }}
                        >
                          <c.icon className="rv-cert-icon" style={{ color: c.color }} />
                          <div className="rv-cert-text">
                            <strong>{c.label}</strong>
                            <span className={`rv-cert-badge rv-cert-badge--${c.status}`}>
                              {c.status === "earned" ? "✓ Earned" : "⏳ In Progress"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured skills */}
                  <div ref={skillsRef} className={`rv-skills-panel ${skillsVis ? "rv-skills-panel--vis" : ""}`}>
                    <h2 className="rv-section-heading">
                      <span className="rv-section-dot rv-section-dot--blue" /> Core Skills
                    </h2>
                    <div className="rv-skills-grid">
                      {SKILLS_FEATURED.map((s, i) => (
                        <div
                          key={s.label}
                          className="rv-skill-chip"
                          style={{ transitionDelay: `${i * 0.07}s` }}
                        >
                          <s.icon className="rv-skill-icon" />
                          <span>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact callout */}
                  <div className="rv-callout">
                    <div className="rv-callout-inner">
                      <span className="rv-callout-number">6</span>
                      <div>
                        <strong>AI Projects Shipped</strong>
                        <p>From telecom RAN optimization to AI therapist apps — all production-grade.</p>
                      </div>
                    </div>
                  </div>

                </Col>
              </Row>
            </div>
          )}

          {/* ── PDF tab ── */}
          {activeTab === "pdf" && (
            <div className="rv-pdf-view">
              <div className="rv-pdf-wrap">
                <Document
                  file={pdf}
                  className="d-flex justify-content-center flex-column align-items-center"
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                  {Array.from(new Array(numPages), (_, i) => (
                    <div key={`page_${i + 1}`} className="rv-pdf-page-wrap">
                      <Page
                        pageNumber={i + 1}
                        scale={width > 786 ? 1.7 : 0.6}
                        renderTextLayer={false}
                      />
                    </div>
                  ))}
                </Document>
              </div>
              <div className="rv-pdf-footer">
                <a href={pdf} target="_blank" rel="noreferrer" className="rv-download-btn">
                  <AiOutlineDownload /> Download CV
                </a>
              </div>
            </div>
          )}

        </Container>
      </Container>
    </div>
  );
}

export default ResumeNew;
