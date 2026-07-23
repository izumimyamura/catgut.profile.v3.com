'use client';

import React, { Suspense, useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS, Skill, SkillNames } from "../app/src/data/constants";
import { Section, getKeyboardState } from "./animated-background-config";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedBackground({ onLoaded }: { onLoaded?: () => void }) {
  const [splineApp, setSplineApp] = useState<Application | null>(null);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const bongoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Handle Keycap Clicks / Hovers
  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp) return;
    const skill = SKILLS[e.target.name as SkillNames];
    if (skill) {
      setSelectedSkill(skill);
      try {
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      } catch (err) {}
    }
  };

  // Bongo Cat Animation
  const startBongoCat = () => {
    if (!splineApp) return;
    const bongoCat = splineApp.findObjectByName("bongo-cat");
    const frame1 = splineApp.findObjectByName("frame-1");
    const frame2 = splineApp.findObjectByName("frame-2");

    if (!bongoCat || !frame1 || !frame2) return;
    bongoCat.visible = true;

    let i = 0;
    if (bongoIntervalRef.current) clearInterval(bongoIntervalRef.current);
    bongoIntervalRef.current = setInterval(() => {
      if (i % 2 === 0) {
        frame1.visible = true;
        frame2.visible = false;
      } else {
        frame1.visible = false;
        frame2.visible = true;
      }
      i++;
    }, 120);
  };

  const stopBongoCat = () => {
    if (bongoIntervalRef.current) clearInterval(bongoIntervalRef.current);
    if (!splineApp) return;
    const bongoCat = splineApp.findObjectByName("bongo-cat");
    if (bongoCat) bongoCat.visible = false;
  };

  // Floating Keycap Animation
  const startKeycapFloating = () => {
    if (!splineApp) return;
    Object.values(SKILLS).forEach((skill, idx) => {
      const keycap = splineApp.findObjectByName(skill.name);
      if (keycap) {
        gsap.to(keycap.position, {
          y: Math.random() * 120 + 120,
          duration: Math.random() * 2 + 1.5,
          delay: idx * 0.08,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
  };

  const stopKeycapFloating = () => {
    if (!splineApp) return;
    Object.values(SKILLS).forEach((skill) => {
      const keycap = splineApp.findObjectByName(skill.name);
      if (keycap) {
        gsap.to(keycap.position, { y: 0, duration: 1, ease: "power2.out" });
      }
    });
  };

  // ScrollTriggers: Only animate and position keyboard starting at #photos & #stack
  useEffect(() => {
    if (!splineApp) return;

    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Start keyboard behind #photos section
    const photosState = getKeyboardState({ section: "photos", isMobile });
    gsap.set(kbd.scale, photosState.scale);
    gsap.set(kbd.position, photosState.position);
    gsap.set(kbd.rotation, photosState.rotation);

    const triggerStack = ScrollTrigger.create({
      trigger: "#stack",
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => {
        setActiveSection("stack");
        const state = getKeyboardState({ section: "stack", isMobile });
        gsap.to(kbd.scale, { ...state.scale, duration: 1.2, ease: "power2.out" });
        gsap.to(kbd.position, { ...state.position, duration: 1.2, ease: "power2.out" });
        gsap.to(kbd.rotation, { ...state.rotation, duration: 1.2, ease: "power2.out" });
      },
      onLeaveBack: () => {
        setActiveSection("photos");
        const state = getKeyboardState({ section: "photos", isMobile });
        gsap.to(kbd.scale, { ...state.scale, duration: 1.2, ease: "power2.out" });
        gsap.to(kbd.position, { ...state.position, duration: 1.2, ease: "power2.out" });
        gsap.to(kbd.rotation, { ...state.rotation, duration: 1.2, ease: "power2.out" });
      },
    });

    splineApp.addEventListener("mouseHover", handleMouseHover);

    return () => {
      triggerStack.kill();
    };
  }, [splineApp, isMobile]);

  useEffect(() => {
    if (activeSection === "stack") {
      startBongoCat();
      startKeycapFloating();
    } else {
      stopBongoCat();
      stopKeycapFloating();
    }
  }, [activeSection, splineApp]);

  function onLoad(app: Application) {
    setSplineApp(app);
    if (onLoaded) onLoaded();

    try {
      const kbd = app.findObjectByName("keyboard");
      if (kbd) kbd.visible = true;

      const allObjects = app.getAllObjects();
      allObjects.forEach((obj) => {
        if (obj.name.includes("keycap") || SKILLS[obj.name]) {
          obj.visible = true;
        }
      });
    } catch (e) {}
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden">
      <Suspense fallback={null}>
        <Spline
          scene="/assets/skills-keyboard.spline"
          onLoad={onLoad}
          className="w-full h-full pointer-events-auto"
        />
      </Suspense>

      {selectedSkill && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-black/85 border border-white/10 rounded-2xl text-center backdrop-blur-md max-w-md pointer-events-none shadow-2xl">
          <h4 className="text-yellow-500 font-bold text-lg mb-1">{selectedSkill.label}</h4>
          <p className="text-zinc-300 text-sm">{selectedSkill.shortDescription}</p>
        </div>
      )}
    </div>
  );
}