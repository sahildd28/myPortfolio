import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrain, TbNetwork } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { MdHub } from "react-icons/md";
import "./Home2.css";
import { SiSalesforce } from "react-icons/si";

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

// ── Floating capability pills around avatar ────────────
const CAPS = [
  { icon: GiArtificialIntelligence, label: "Google ADK",  pos: "cap--tl" },
  { icon: TbBrain,                  label: "RAG",          pos: "cap--tr" },
  { icon: MdHub,                    label: "MCP",          pos: "cap--bl" },
  { icon: TbNetwork,                label: "A2A",          pos: "cap--br" },
  { icon: BsRobot,                  label: "Agentic AI",   pos: "cap--top" },
  { icon: SiSalesforce,             label: "Salesforce",   pos: "cap--bottom" },
];

// ── Core principle cards ───────────────────────────────
const PRINCIPLES = [
  { emoji: "⚡", title: "Production-grade",  desc: "Clean, scalable, enterprise-ready code from day one." },
  { emoji: "🔗", title: "MCP & A2A native",  desc: "Multi-agent pipelines wired with real integrations." },
  { emoji: "🎙️", title: "Voice AI",          desc: "SIP-deployable, diarized, voice-matched pipelines." },
  { emoji: "📊", title: "Eval-driven",       desc: "LangFuse benchmarking across models, every project." },
];

function Home2() {
  const [textRef, textVis] = useReveal(0.1);
  const [imgRef, imgVis]   = useReveal(0.1);
  const [cardsRef, cardsVis] = useReveal(0.1);
  const [socialRef, socialVis] = useReveal(0.15);

  return (
    <Container fluid className="home-about-section" id="about">
      <div className="h2-bg-glow h2-bg-glow--left" />
      <div className="h2-bg-glow h2-bg-glow--right" />

      <Container>

        {/* ── Intro row ── */}
        <Row className="h2-intro-row">

          {/* Text */}
          <Col md={7} className="home-about-description">
            <div
              ref={textRef}
              className={`h2-text-block ${textVis ? "h2-text-block--vis" : ""}`}
            >
              <div className="h2-eyebrow">Let me introduce myself</div>
              <h1 className="h2-heading">
                Building the <span className="h2-accent">next layer</span> of<br />
                intelligent software.
              </h1>
              <p className="home-about-body">
                  I&apos;m an <strong className="h2-strong">AI Engineer</strong> specializing
                  in agentic systems — building production-grade, multi-agent platforms that
                  automate complex workflows and deliver real business impact.
                  <br /><br />
                  My journey started in <strong className="h2-strong">Salesforce</strong> —
                  where I shipped enterprise-grade solutions like a Bulk Feasibility Portal
                  handling 1,000+ simultaneous checks, Azure–Salesforce integrations, and
                  Cloud-Sense migrations with zero downtime. I then moved up the stack into{" "}
                  <strong className="h2-strong">Einstein AI</strong> — implementing Forecasting
                  and Lead Scoring — and into{" "}
                  <strong className="h2-strong">Agentforce</strong>, designing agent-to-agent
                  communication flows with OAuth 2.0. Each step was a deliberate climb toward
                  one thing: intelligent, autonomous systems.
                  <br /><br />
                  Today I architect those systems full-time using{" "}
                  <strong className="h2-strong">Google ADK</strong> — building multi-agent
                  pipelines with RAG reasoning, MCP integrations, human-in-the-loop flows,
                  and voice AI, from prototype to client-ready delivery at scale.
                  <br /><br />
                  My stack spans{" "}
                  <strong className="h2-strong">
                    FastAPI, React, Python, PostgreSQL, Pinecone, LangFuse
                  </strong>{" "}
                  and <strong className="h2-strong">NVIDIA infrastructure</strong> — backed
                  by the clean OOP discipline and enterprise instincts I built over 2.5 years
                  of Salesforce development. The foundation is Salesforce. The destination
                  is agentic AI.
                </p>
            </div>
          </Col>

          {/* Avatar */}
          <Col md={4} className="myAvtar">
            <div
              ref={imgRef}
              className={`h2-avatar-wrap ${imgVis ? "h2-avatar-wrap--vis" : ""}`}
            >
              {CAPS.map((c, i) => (
                <div
                  key={c.label}
                  className={`h2-cap ${c.pos}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <c.icon className="h2-cap-icon" />
                  <span>{c.label}</span>
                </div>
              ))}
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={false}>
                <div className="h2-avatar-inner">
                  <img src={myImg} className="img-fluid" alt="Sahil Dhamnaskar" />
                  <div className="h2-avatar-ring" />
                  <div className="h2-avatar-ring h2-avatar-ring--outer" />
                </div>
              </Tilt>
            </div>
          </Col>
        </Row>

        {/* ── Principles row ── */}
        <div
          ref={cardsRef}
          className={`h2-principles ${cardsVis ? "h2-principles--vis" : ""}`}
        >
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              className="h2-principle-card"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="h2-principle-emoji">{p.emoji}</span>
              <strong className="h2-principle-title">{p.title}</strong>
              <p className="h2-principle-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Social row ── */}
        <Row>
          <Col
            md={12}
            ref={socialRef}
            className={`home-about-social h2-social ${socialVis ? "h2-social--vis" : ""}`}
          >
            <h1 className="h2-find-heading">Find Me On</h1>
            <p>
              Feel free to <span className="purple">connect</span> with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/sahildd28"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="GitHub"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/sahil-dhamnaskar-94264817a/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/sahildd"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="Instagram"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>

      </Container>
    </Container>
  );
}

export default Home2;
