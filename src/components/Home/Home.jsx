import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type.js";
import NeuralCanvas from "./NeuralCanvas.js";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import "./Home.css";

// ── Terminal letter-by-letter reveal ──────────────────
function TerminalName({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, 55);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);

  useEffect(() => {
    if (done) return;
    const iv = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(iv);
  }, [done]);

  return (
    <span className="home-terminal-name">
      {displayed}
      {!done && <span className="home-cursor" style={{ opacity: cursor ? 1 : 0 }}>|</span>}
    </span>
  );
}

// ── Floating stat pill ─────────────────────────────────
function StatPill({ value, label, delay }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={`home-stat-pill ${vis ? "home-stat-pill--vis" : ""}`}>
      <span className="home-stat-val">{value}</span>
      <span className="home-stat-lbl">{label}</span>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────
function Home() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="home-wrapper">
      <div className="home-section" id="home">
        <Particle />
        <NeuralCanvas />
        <div className="home-glow home-glow--hero" />
        <div className="home-glow home-glow--left" />

        <Container className="home-content home-content--z">
          <Row className="home-row align-items-center">

            {/* ── Left ── */}
            <Col md={7} className={`home-header ${vis ? "home-header--vis" : ""}`}>

              <div className="home-status-chip">
                <span className="home-status-dot" />
                Open to AI / Agentic roles
              </div>

              <h1 className="heading home-greeting">
                Hi There!{" "}
                <span className="wave" role="img" aria-label="wave">👋🏻</span>
              </h1>

              <h1 className="heading-name">
                I&apos;M
                <strong className="main-name">
                  {" "}<TerminalName text="Sahil Dhamnaskar" delay={700} />
                </strong>
              </h1>

              <div className="home-type-wrap">
                <Type />
              </div>

              <div className="home-badges">
                {["Google ADK", "RAG", "MCP", "Voice AI", "FastAPI", "A2A"].map((b, i) => (
                  <span key={b} className="home-badge" style={{ animationDelay: `${0.6 + i * 0.07}s` }}>
                    {b}
                  </span>
                ))}
              </div>

              <div className="home-cta-row">
                <button className="home-cta-btn home-cta-btn--primary" onClick={scrollToAbout}>
                  Explore My Work ↓
                </button>
                <a href="https://github.com/sahildd28" target="_blank" rel="noreferrer" className="home-cta-btn home-cta-btn--ghost">
                  <AiFillGithub /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/sahil-dhamnaskar-94264817a/" target="_blank" rel="noreferrer" className="home-cta-btn home-cta-btn--linkedin">
                  <FaLinkedinIn /> LinkedIn
                </a>
              </div>
            </Col>

            {/* ── Right ── */}
            <Col md={5} className="home-logo-col">
              <div className="home-logo-wrap">
                <div className="home-orbit home-orbit--1" />
                <div className="home-orbit home-orbit--2" />
                <div className="home-orbit home-orbit--3" />
                <div className="home-orbit-dot home-orbit-dot--1">ADK</div>
                <div className="home-orbit-dot home-orbit-dot--2">RAG</div>
                <div className="home-orbit-dot home-orbit-dot--3">MCP</div>
                <div className="home-orbit-dot home-orbit-dot--4">A2A</div>
                <img src={homeLogo} alt="Sahil" className="img-fluid home-logo-img" style={{ maxHeight: "400px" }} />
              </div>
              <div className="home-stats-float">
                <StatPill value="6+" label="AI Projects"        delay={1000} />
                <StatPill value="3+" label="Enterprise Clients" delay={1200} />
                <StatPill value="2.6yr" label="Total Experience"          delay={1400} />
              </div>
            </Col>
          </Row>
        </Container>

        <div className="home-scroll-hint">
          <span className="home-scroll-line" />
          <span className="home-scroll-label">scroll</span>
        </div>
      </div>

      <Home2 />
    </section>
  );
}

export default Home;