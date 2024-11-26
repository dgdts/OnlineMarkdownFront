import React from 'react';
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: "#6c5ce7",
          },
          links: {
            color: "#a29bfe",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
          number: {
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground; 