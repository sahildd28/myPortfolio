import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { BsRobot } from "react-icons/bs";
import { MdHub } from "react-icons/md";
import "./Home2.css";
import { FaJava } from "react-icons/fa";
import { SiSpringboot  } from "react-icons/si";

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
  { icon: FaJava,                  label: "Java",          pos: "cap--tr" },
  { icon: MdHub,                    label: "MCP",          pos: "cap--bl" },
  { icon: SiSpringboot,                label: "Springboot",          pos: "cap--br" },
  { icon: BsRobot,                  label: "Agentic AI",   pos: "cap--top" },
  { icon: FaJava,             label: "RAG",   pos: "cap--bottom" },
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
                I&apos;m a <strong className="h2-strong">Java Full Stack Developer & AI Engineer</strong> 
                with 2.7 years of experience building enterprise-grade systems and 1.5 years architecting 
                agentic AI solutions. I specialize in <strong className="h2-strong">Spring Boot microservices</strong>, 
                <strong className="h2-strong">React portals</strong>, and <strong className="h2-strong">cloud-native deployments</strong> 
                while simultaneously designing <strong className="h2-strong">multi-agent AI pipelines</strong> that automate 
                workflows and deliver measurable business impact.
                <br /><br />
                At <strong className="h2-strong">TCS</strong>, I&apos;ve engineered secure, scalable applications with 
                Spring Boot 3.x, React.js, and PostgreSQL, containerized with Docker and deployed on 
                Azure Kubernetes Service via GitHub Actions CI/CD. My work includes building 5+ microservices 
                with OAuth2/JWT authentication, 4 React-powered portals with reusable components, and optimizing 
                CI pipelines to cut build times by 66%.
                <br /><br />
                In parallel, I&apos;ve co-built 6 production-ready AI projects — from 
                <strong className="h2-strong">RAG platforms</strong> and <strong className="h2-strong">voice AI pipelines</strong> 
                to <strong className="h2-strong">multi-agent systems</strong> using Google ADK, Pinecone, LangFuse, and NVIDIA 
                infrastructure. These solutions integrate human-in-the-loop flows, contextual MCP servers, and 
                real-time dashboards, driving automation and productivity gains across telecom, healthcare, and automation domains.
                <br /><br />
                My stack spans <strong className="h2-strong">Spring Boot, FastAPI, React, Python, PostgreSQL, Docker, AKS</strong>, 
                and <strong className="h2-strong">NVIDIA AI infrastructure</strong> — backed by strong foundations in 
                <strong className="h2-strong">DSA</strong>, <strong className="h2-strong">System Design</strong>, and 
                <strong className="h2-strong">cloud-native architecture</strong>. I thrive at the intersection of 
                enterprise engineering and agentic AI.
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
