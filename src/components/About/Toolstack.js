import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiWindows,
  SiAndroidstudio,
  SiNvidia,
  SiMicrosoftazure,
} from "react-icons/si";

const TOOL_STACK = [
  { icon: SiWindows, label: "Windows" },
  { icon: SiVisualstudiocode, label: "VS Code" },
  { icon: SiPostman, label: "Postman" },
  { icon: SiAndroidstudio, label: "Android Studio" },
  { icon: SiVercel, label: "Vercel" },
  { icon: SiMicrosoftazure, label: "Azure Dev Tools" },
  { icon: SiNvidia, label: "NVIDIA CUDA" },
];

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {TOOL_STACK.map(({ icon: Icon, label }) => (
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

export default Toolstack;
