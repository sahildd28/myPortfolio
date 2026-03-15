import React, { useState } from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrain, TbCode } from "react-icons/tb";
import { BsRobot, BsMortarboard } from "react-icons/bs";
import { MdHub } from "react-icons/md";
import "./AboutCard.css";
import { SiSalesforce } from "react-icons/si";

const HIGHLIGHTS = [
  { icon: BsRobot,                label: "Agentic AI Systems",    desc: "Multi-agent pipelines, Google ADK" },
  { icon: SiSalesforce,                label: "Salesforce Development",    desc: "Advance level salesforce solutions" },
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
          My path here was intentional. I started as a{" "}
          <span className="ac-accent">Salesforce Developer</span> — building
          enterprise portals, Azure integrations, and zero-downtime migrations —
          then moved into <span className="ac-accent">Einstein AI</span> for
          forecasting and lead scoring, and then into{" "}
          <span className="ac-accent">Agentforce</span>, designing secure
          agent-to-agent communication flows. Every step was a deliberate move
          toward autonomous, intelligent systems.
        </p>

        <p>
          Today that&apos;s all I do — full-time AI development using{" "}
          <span className="ac-accent">Google ADK</span>, grounded in the clean
          OOP discipline and enterprise instincts built over 2.5 years of
          Salesforce work. I earned my B.Tech in{" "}
          <span className="ac-accent">Computer Science</span> from RAIT DY Patil,
          Navi Mumbai, and stay sharp through hands-on{" "}
          <span className="ac-accent">R&amp;D POCs</span> and certifications
          including <span className="ac-accent">Google ADK</span> and{" "}
          <span className="ac-accent">Microsoft Azure AI</span>.
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
