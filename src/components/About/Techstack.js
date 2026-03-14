import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiJavascript1, DiReact, DiPython, DiJava } from "react-icons/di";
import {
  SiSalesforce,
  SiSpringboot,
  SiFastapi,
  SiDocker,
  SiTailwindcss,
  SiTypescript,
  SiMicrosoftazure,
  SiOpenai,
  SiPostgresql,
  SiSqlite,
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBolt } from "react-icons/tb";

const TECH_STACK = [
  { icon: SiSalesforce, label: "Salesforce" },
  { icon: TbBolt, label: "Lightning Web" },
  { icon: DiReact, label: "React" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: DiJava, label: "Java" },
  { icon: SiSpringboot, label: "Spring Boot" },
  { icon: SiFastapi, label: "FastAPI" },
  { icon: DiPython, label: "Python" },
  { icon: SiDocker, label: "Docker" },
  { icon: DiJavascript1, label: "JavaScript" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiMicrosoftazure, label: "Azure" },
  { icon: SiOpenai, label: "OpenAI" },
  { icon: SiPostgresql, label: "PostgreSQL" },
  { icon: SiSqlite, label: "SQLite" },
  { icon: GiArtificialIntelligence, label: "AI/ML" },
];

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {TECH_STACK.map(({ icon: Icon, label }) => (
        <Col xs={6} sm={4} md={3} lg={2} className="tech-icons" key={label}>
          <div className="tech-icon-card">
            <Icon className="tech-icon-symbol" aria-hidden="true" />
            <span className="tech-icon-label">{label}</span>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
