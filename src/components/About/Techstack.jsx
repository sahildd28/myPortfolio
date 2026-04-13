import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DiJavascript1, DiReact, DiPython, DiJava } from "react-icons/di";
import {
  SiFastapi,
  SiDocker,
  SiTailwindcss,
  SiTypescript,
  SiMicrosoftazure,
  SiSpringboot,
  SiOpenai,
  SiPostgresql,
  SiNvidia,
  SiExpo,
  SiVite,
  SiGithub,
  SiVercel,
  SiPostman
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrain, TbWebhook, TbPhone, TbNetwork ,TbApi} from "react-icons/tb";
import { MdHub, MdSettingsInputComponent } from "react-icons/md";
import { BsRobot } from "react-icons/bs";
import { AiOutlineDatabase } from "react-icons/ai";
import "./Techstack.css";



const TECH_GROUPS = [
  {
    label: "Agentic Core",
    color: "#38bdf8",
    items: [
      { icon: GiArtificialIntelligence, label: "Google ADK" },
      { icon: BsRobot,                  label: "Agentic AI" },
      { icon: MdHub,                    label: "MCP" },
      { icon: TbNetwork,                label: "A2A" },
      { icon: TbBrain,                  label: "RAG" },
    ],
  },
  {
    label: "AI & Models",
    color: "#818cf8",
    items: [
      { icon: SiOpenai,        label: "OpenAI SDK" },
      { icon: SiNvidia,        label: "NVIDIA Infrastructure" },
      { icon: SiMicrosoftazure, label: "Azure AI" },
      { icon: TbWebhook,       label: "LangFuse" },
    ],
  },
  {
    label: "Backend & Data",
    color: "#34d399",
    items: [
      { icon: SiSpringboot,       label: "Spring Boot 3.x" },
      { icon: DiJava,             label: "Java" },
      { icon: SiFastapi,          label: "FastAPI" },
      { icon: DiPython,           label: "Python" },
      { icon: SiPostgresql,       label: "PostgreSQL" },
      { icon: AiOutlineDatabase,  label: "Pinecone" },
      { icon: AiOutlineDatabase,  label: "ChromaDB" },
    ],
  },
  {
    label: "Voice & Media",
    color: "#fb923c",
    items: [
      { icon: TbPhone, label: "ElevenLabs" },
      { icon: TbPhone, label: "WhisperX" },
      { icon: TbPhone, label: "Pyannote" },
    ],
  },
  {
    label: "Frontend",
    color: "#a78bfa",
    items: [
      { icon: DiReact,          label: "React.js" },
      { icon: SiExpo,           label: "React Native Expo" },
      { icon: SiVite,           label: "Vite" },
      { icon: SiTailwindcss,    label: "Tailwind CSS" },
      { icon: DiJavascript1,    label: "JavaScript" },
      { icon: SiTypescript,     label: "TypeScript" },
      { icon: DiReact,          label: "Next.js" },
    ],
  },
  {
    label: "Infrastructure & Foundation",
    color: "#64748b",
    items: [
      { icon: SiDocker,               label: "Docker" },
      { icon: SiMicrosoftazure,       label: "Azure Kubernetes Service (AKS)" },
      { icon: SiGithub,               label: "GitHub Actions CI/CD" },
      { icon: MdSettingsInputComponent, label: "Azure APIM & Entra ID" },
      { icon: MdSettingsInputComponent, label: "Helm & Nginx" },
      { icon: SiVercel,               label: "Vercel" },
    ],
  },
  {
    label: "Testing & Tools",
    color: "#facc15",
    items: [
      { icon: SiPostman, label: "Postman" },
      { icon: TbApi,     label: "Swagger/OpenAPI" },
      { icon: SiGithub,  label: "Git/GitHub" },
      { icon: TbApi,     label: "JUnit 5" },
      { icon: TbApi,     label: "Mockito" },
      { icon: TbApi,     label: "Testcontainers" },
      { icon: TbApi,     label: "Maven & Gradle" },
    ],
  },
];

function TechIcon({ icon: Icon, label, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Col xs={6} sm={4} md={3} lg={2} className="tech-icons" key={label}>
      <div
        ref={ref}
        className={`tech-icon-card tech-icon-card--enhanced ${vis ? "tech-icon-card--vis" : ""}`}
        style={{ transitionDelay: delay }}
      >
        <Icon className="tech-icon-symbol" aria-hidden="true" />
        <span className="tech-icon-label">{label}</span>
      </div>
    </Col>
  );
}

function Techstack() {
  return (
    <div className="ts-wrapper">
      {TECH_GROUPS.map((group) => (
        <div key={group.label} className="ts-group">
          <div className="ts-group-label" style={{ "--group-color": group.color }}>
            <span className="ts-group-dot" />
            {group.label}
          </div>
          <Row style={{ justifyContent: "center", paddingBottom: "16px" }}>
            {group.items.map((item, i) => (
              <TechIcon
                key={item.label}
                icon={item.icon}
                label={item.label}
                delay={`${i * 0.06}s`}
              />
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}

export default Techstack;
