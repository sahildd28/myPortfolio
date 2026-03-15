import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import about from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import "./About.css";

// ── Scroll reveal hook ────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Section divider with label ─────────────────────────
function SectionLabel({ label }) {
  const [ref, vis] = useReveal(0.2);
  return (
    <div ref={ref} className={`about-section-label ${vis ? "about-section-label--vis" : ""}`}>
      <span className="about-section-label-line" />
      <span className="about-section-label-text">{label}</span>
      <span className="about-section-label-line" />
    </div>
  );
}

// ── Animated counter ───────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, vis] = useReveal(0.3);
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [vis, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Identity card (left hero panel) ───────────────────
function IdentityPanel() {
  const [ref, vis] = useReveal(0.1);
  return (
    <div ref={ref} className={`about-identity ${vis ? "about-identity--vis" : ""}`}>
      <div className="about-identity-img-wrap">
        <img src={about} alt="Sahil Dhamnaskar" className="about-identity-img" />
        <div className="about-identity-img-ring" />
        <div className="about-identity-img-ring about-identity-img-ring--outer" />
      </div>

      <div className="about-identity-meta">
        <div className="about-identity-badge">
          <span className="about-identity-badge-dot" />
          Available for AI projects
        </div>
        <h2 className="about-identity-name">Sahil Dhamnaskar</h2>
        <p className="about-identity-role">AI Engineer · TCS</p>
        <p className="about-identity-location">📍 Maharashtra, India</p>
      </div>

      <div className="about-identity-stats">
        {[
          { val: 1.5, suffix: "yr+", label: "AI Dev" },
          { val: 2, suffix: ".5yr", label: "Industry" },
          { val: 6, suffix: "", label: "AI Projects" },
        ].map((s) => (
          <div key={s.label} className="about-identity-stat">
            <span className="about-identity-stat-val">
              <Counter target={s.val} suffix={s.suffix} />
            </span>
            <span className="about-identity-stat-lbl">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────
function About() {
  return (
    <div className="about-page">
      <Particle />
      <div className="about-bg-grid" />
      <div className="about-bg-glow about-bg-glow--tl" />
      <div className="about-bg-glow about-bg-glow--br" />

      <Container className="about-inner">

        {/* ── Hero Row ── */}
        <Row className="about-hero-row">
          <Col md={5} className="about-hero-left">
            <IdentityPanel />
          </Col>
          <Col md={7} className="about-hero-right">
            <div className="about-hero-label">WHO I AM</div>
            <h1 className="about-hero-heading">
              Know <span className="about-accent">Who</span> I&apos;m
            </h1>
            <Aboutcard />
          </Col>
        </Row>

        {/* ── Skills Section ── */}
        <SectionLabel label="Professional Skillset" />
        <Techstack />

        {/* ── Tools Section ── */}
        <SectionLabel label="Tools I Use" />
        <Toolstack />

      </Container>
    </div>
  );
}

export default About;
