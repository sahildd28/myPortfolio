import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiWindows,
  SiAndroidstudio,
  SiNvidia,
  SiMicrosoftazure,
  SiGithub,
  SiGooglecloud,
  SiJira,
} from "react-icons/si";
import { TbChartBar, TbApi, TbDatabase } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { MdManageSearch } from "react-icons/md";

const TOOL_GROUPS = [
  {
    label: "AI Dev Tools",
    items: [
      { icon: SiGooglecloud, label: "Google Cloud" },
      { icon: BsRobot,       label: "Google ADK CLI" },
      { icon: TbChartBar,    label: "LangFuse" },
      { icon: TbDatabase,    label: "Pinecone Console" },
    ],
  },
  {
    label: "APIs & Testing",
    items: [
      { icon: SiPostman, label: "Postman" },
      { icon: TbApi,     label: "3SIP" },
    ],
  },
  {
    label: "Cloud & Infra",
    items: [
      { icon: SiNvidia,        label: "NVIDIA CUDA" },
      { icon: SiMicrosoftazure, label: "Azure Dev Tools" },
      { icon: SiVercel,        label: "Vercel" },
    ],
  },
  {
    label: "Dev Environment",
    items: [
      { icon: SiVisualstudiocode, label: "VS Code" },
      { icon: SiGithub,          label: "GitHub" },
      { icon: SiWindows,         label: "Windows" },
    ],
  },
  {
    label: "Integrations",
    items: [
      { icon: SiJira,       label: "Jira" },
      { icon: MdManageSearch, label: "ServiceNow" },
      { icon: SiAndroidstudio, label: "Android Studio" },
    ],
  },
];

function ToolIcon({ icon: Icon, label, delay }) {
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
    <Col xs={6} sm={4} md={3} lg={2} className="tech-icons">
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

function Toolstack() {
  return (
    <div className="ts-wrapper">
      {TOOL_GROUPS.map((group) => (
        <div key={group.label} className="ts-group">
          <div className="ts-group-label" style={{ "--group-color": "#38bdf8" }}>
            <span className="ts-group-dot" />
            {group.label}
          </div>
          <Row style={{ justifyContent: "center", paddingBottom: "16px" }}>
            {group.items.map((item, i) => (
              <ToolIcon key={item.label} icon={item.icon} label={item.label} delay={`${i * 0.07}s`} />
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}

export default Toolstack;
