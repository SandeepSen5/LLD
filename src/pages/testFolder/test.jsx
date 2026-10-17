"use client";

import { useEffect, useState } from "react";

export default function Frog() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        transform: `
          translate(${mouse.x * 30}px, ${mouse.y * 20}px)
          rotateY(${mouse.x * 15}deg)
          rotateX(${-mouse.y * 10}deg)
        `,
        transition: "transform 0.15s ease-out",
      }}
    >
      🐸
    </div>
  );
}