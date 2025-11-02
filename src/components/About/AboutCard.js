import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Sahil Dhamnaskar </span>
            from <span className="purple"> Maharashtra, India.</span>
            <br />
            I&apos;m a dynamic, results-driven{" "}
            <span className="purple">Software Developer</span> at
            <span className="purple"> Tata Consultancy Services</span>, where I
            lead end-to-end Salesforce, cloud, and agentic AI solutions that
            improve performance and efficiency by well over{" "}
            <span className="purple">50%</span>.
            <br />
            I architect scalable products across Apex, Lightning Web Components,
            FastAPI, React, and intelligent automation to unlock measurable
            business impact.
            <br />I earned my B.Tech in{" "}
            <span className="purple">Computer Science </span> from RAIT DY
            Patil, Navi Mumbai, and continue to explore emerging technologies
            through R&amp;D POCs.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Outdoor Sports
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Sahil</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
