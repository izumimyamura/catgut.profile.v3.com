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
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const bongoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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

  const startKeycapFloating = () => {
    if (!splineApp) return;
    Object.values(SKILLS).forEach((skill, idx) => {
      const keycap = splineApp.findObjectByName(skill.name);
      if (keycap) {
        gsap.to(keycap.position, {
          y: Math.random() * 150 + 150,
          duration: Math.random() * 2 + 1.5,
          delay: idx * 0.1,
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
        gsap.to(keycap.position, {
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
    });
  };

  useEffect(() => {
    if (!splineApp) return;

    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);
    gsap.set(kbd.rotation, heroState.rotation);

    const createTrigger = (id: string, targetSection: Section, prevSection: Section) => {
      return ScrollTrigger.create({
        trigger: id,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1.2, ease: "power2.out" });
          gsap.to(kbd.position, { ...state.position, duration: 1.2, ease: "power2.out" });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1.2, ease: "power2.out" });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1.2, ease: "power2.out" });
          gsap.to(kbd.position, { ...state.position, duration: 1.2, ease: "power2.out" });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1.2, ease: "power2.out" });
        },
      });
    };

    const triggers = [
      createTrigger("#projects", "projects", "hero"),
      createTrigger("#photos", "photos", "projects"),
      createTrigger("#stack", "stack", "photos"),
    ];

    splineApp.addEventListener("mouseHover", handleMouseHover);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [splineApp, isMobile]);

  useEffect(() => {
    if (activeSection === "projects") {
      startBongoCat();
    } else {
      stopBongoCat();
    }

    if (activeSection === "stack") {
      startKeycapFloating();
    } else {
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-black/80 border border-white/10 rounded-2xl text-center backdrop-blur-md max-w-md pointer-events-none">
          <h4 className="text-yellow-500 font-bold text-lg mb-1">{selectedSkill.label}</h4>
          <p className="text-zinc-300 text-sm">{selectedSkill.shortDescription}</p>
        </div>
      )}
    </div>
  );
}