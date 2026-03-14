import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Google ADK Developer",
          "Microsoft Certified AI Developer",
          "Agentic AI Developer",
          "Salesforce Developer",
          "Full Stack Developer"
          
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;