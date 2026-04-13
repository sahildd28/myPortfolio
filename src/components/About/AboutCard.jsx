import React, { useState } from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrain, TbCode } from "react-icons/tb";
import { BsRobot, BsMortarboard } from "react-icons/bs";
import { MdHub } from "react-icons/md";
import "./AboutCard.css";
import { FaJava } from "react-icons/fa";



const HIGHLIGHTS = [
  { icon: BsRobot,                label: "Agentic AI Systems",    desc: "Multi-agent pipelines, Google ADK" },
  { icon: FaJava,                label: "Java Full Stack Development",    desc: "Advance level Java Full Stack Solutions" },
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
        I&apos;m a <span className="ac-accent">Java Full Stack Developer & AI Engineer</span> at{" "}
        <span className="ac-accent">Tata Consultancy Services</span>, with 2.7 years building 
        enterprise-grade systems and 1.5 years architecting{" "}
        <span className="ac-accent">agentic AI solutions</span>. My work spans{" "}
        <span className="ac-accent">Spring Boot microservices</span>,{" "}
        <span className="ac-accent">React portals</span>,{" "}
        <span className="ac-accent">cloud-native deployments</span>, and{" "}
        <span className="ac-accent">multi-agent AI pipelines</span> that drive measurable impact 
        across telecom, healthcare, and automation domains.
      </p>

      <p>
        At <span className="ac-accent">TCS</span>, I&apos;ve engineered secure, scalable applications 
        with Spring Boot 3.x, React.js, and PostgreSQL, containerized with Docker and deployed on{" "}
        <span className="ac-accent">Azure Kubernetes Service</span> via GitHub Actions CI/CD. 
        I&apos;ve built 5+ microservices with OAuth2/JWT authentication, 4 React-powered portals 
        with reusable components, and optimized CI pipelines to cut build times by 66%.
      </p>

      <p>
        In parallel, I&apos;ve co-built 6 production-ready AI projects — from{" "}
        <span className="ac-accent">RAG platforms</span> and{" "}
        <span className="ac-accent">voice AI pipelines</span> to{" "}
        <span className="ac-accent">multi-agent systems</span> using Google ADK, Pinecone, LangFuse, 
        and NVIDIA infrastructure. These solutions integrate{" "}
        <span className="ac-accent">human-in-the-loop flows</span>, contextual MCP servers, and 
        real-time dashboards, delivering automation and productivity gains at scale.
      </p>

      <p>
        My stack spans <span className="ac-accent">Spring Boot, FastAPI, React, Python, PostgreSQL, Docker, AKS</span>, 
        and <span className="ac-accent">NVIDIA AI infrastructure</span> — backed by strong foundations in{" "}
        <span className="ac-accent">DSA</span>,{" "}
        <span className="ac-accent">System Design</span>, and{" "}
        <span className="ac-accent">cloud-native architecture</span>. I thrive at the intersection of{" "}
        <span className="ac-accent">enterprise engineering</span> and{" "}
        <span className="ac-accent">agentic AI</span>.
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
