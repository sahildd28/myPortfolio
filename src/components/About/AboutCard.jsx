import React, { useState } from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrain, TbCode } from "react-icons/tb";
import { BsRobot, BsMortarboard } from "react-icons/bs";
import { MdHub } from "react-icons/md";
import "./AboutCard.css";

const HIGHLIGHTS = [
  { icon: BsRobot,                label: "Agentic AI Systems",    desc: "Multi-agent pipelines, Google ADK" },
  { icon: TbBrain,                label: "RAG Platforms",          desc: "Pinecone, LangFuse, PostgreSQL" },
  { icon: MdHub,                  label: "MCP Integrations",       desc: "Atlassian, ServiceNow, A2A" },
  { icon: GiArtificialIntelligence, label: "Voice AI",             desc: "ElevenLabs, WhisperX, SIP" },
  { icon: TbCode,                 label: "Full-Stack APIs",        desc: "FastAPI, React, Tailwind" },
  { icon: BsMortarboard,          label: "Certifications",         desc: "Google ADK · Azure AI (ongoing)" },
];

const HOBBIES = [
  { emoji: "🎬", label: "Content Creation" },
  { emoji: "⚽", label: "Outdoor Sports" },
  { emoji: "✈️", label: "Travelling" },
];

function AboutCard() {
  const [hoveredHighlight, setHoveredHighlight] = useState(null);

  return (
    <div className="ac-card">
      {/* Bio */}
      <div className="ac-bio">
        <p>
          Hi Everyone, I am{" "}
          <span className="ac-accent">Sahil Dhamnaskar</span> from{" "}
          <span className="ac-accent">Maharashtra, India.</span>
        </p>
        <p>
          I&apos;m an <span className="ac-accent">AI Engineer</span> at{" "}
          <span className="ac-accent">Tata Consultancy Services</span>, where I
          design and ship production-grade{" "}
          <span className="ac-accent">agentic AI systems</span> — multi-agent
          pipelines, RAG platforms, voice bots, and MCP integrations that drive
          measurable impact for enterprise clients.
        </p>
        <p>
          I build end-to-end intelligent solutions using Google ADK, FastAPI,
          React, and cloud-native infrastructure — grounded in{" "}
          <span className="ac-accent">2.5 years</span> of enterprise software
          experience that keeps my code clean, scalable, and production-ready.
        </p>
        <p>
          I earned my B.Tech in{" "}
          <span className="ac-accent">Computer Science</span> from RAIT DY
          Patil, Navi Mumbai, and actively explore emerging AI capabilities
          through hands-on <span className="ac-accent">R&amp;D POCs</span> and
          certifications.
        </p>
      </div>

      {/* Highlights grid */}
      <div className="ac-highlights">
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={h.label}
            className={`ac-highlight ${hoveredHighlight === i ? "ac-highlight--active" : ""}`}
            onMouseEnter={() => setHoveredHighlight(i)}
            onMouseLeave={() => setHoveredHighlight(null)}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <h.icon className="ac-highlight-icon" />
            <div className="ac-highlight-text">
              <span className="ac-highlight-label">{h.label}</span>
              <span className="ac-highlight-desc">{h.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hobbies */}
      <div className="ac-hobbies">
        <p className="ac-hobbies-label">Apart from coding —</p>
        <div className="ac-hobbies-list">
          {HOBBIES.map((h) => (
            <span key={h.label} className="ac-hobby">
              {h.emoji} {h.label}
            </span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="ac-quote">
        <span className="ac-quote-mark">"</span>
        <p className="ac-quote-text">Strive to build things that make a difference!</p>
        <footer className="ac-quote-footer">— Sahil</footer>
      </div>
    </div>
  );
}

export default AboutCard;
