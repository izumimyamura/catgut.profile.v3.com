'use client';

import React, { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS, Skill } from "../app/src/data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function KeyboardSection() {
  const [splineApp, setSplineApp] = useState<Application | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function onLoad(app: Application) {
    setSplineApp(app);

    // Unhide main 3D objects & keycaps inside Spline
    try {
      const kbd = app.findObjectByName("keyboard");
      if (kbd) kbd.visible = true;

      const allObjects = app.getAllObjects();
      allObjects.forEach((obj) => {
        if (obj.name.includes("keycap") || SKILLS[obj.name]) {
          obj.visible = true;
        }
      });
    } catch (e) {
      console.log("Spline initialization complete.");
    }
  }

  // Handle clicking keycaps on the 3D keyboard
  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp) return;
    const skill = SKILLS[e.target.name];
    if (skill) {
      setSelectedSkill(skill);
      try {
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      } catch (err) {}
    }
  };

  useEffect(() => {
    if (!splineApp || !containerRef.current) return;

    splineApp.addEventListener("mouseHover", handleMouseHover);

    const kbd = splineApp.findObjectByName("keyboard");
    if (kbd) {
      // 3D Scroll Rotation & Spin Animation
      gsap.to(kbd.rotation, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
        y: Math.PI * 2,
        x: Math.PI * 0.15,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [splineApp]);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative z-20 min-h-screen w-full bg-black py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="text-center mb-8 px-4">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
          My Software Stack
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl">
          Scroll to spin the keyboard — Click keycaps to inspect skills.
        </p>
      </div>

      {/* Full 3D Spline Canvas */}
      <div className="w-full max-w-6xl h-[600px] relative flex items-center justify-center">
        <Spline
          scene="/assets/skills-keyboard.spline"
          onLoad={onLoad}
          className="w-full h-full"
        />
      </div>

      {/* Selected Skill Information Popup */}
      {selectedSkill && (
        <div className="mt-6 px-8 py-5 bg-zinc-950 border border-zinc-800 rounded-2xl text-center max-w-lg shadow-2xl backdrop-blur-md">
          <h3 className="text-xl font-bold text-yellow-500 mb-1">
            {selectedSkill.label}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {selectedSkill.shortDescription}
          </p>
        </div>
      )}
    </section>
  );
}