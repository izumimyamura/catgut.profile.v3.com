'use client';

import React, { Suspense, useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS, Skill, SkillNames } from "../app/src/data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedBackground({ onLoaded }: { onLoaded?: () => void }) {
  const [splineApp, setSplineApp] = useState<Application | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const bongoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    if (!splineApp) return;

    const kbd = splineApp.findObjectByName("keyboard");
    const bongoCat = splineApp.findObjectByName("bongo-cat");
    const frame1 = splineApp.findObjectByName("frame-1");
    const frame2 = splineApp.findObjectByName("frame-2");

    if (!kbd) return;

    // Start hidden until reaching #stack
    kbd.visible = false;

    if (bongoCat && frame1 && frame2) {
      bongoCat.visible = false;
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
    }

    // Scroll Trigger: Starts at #stack and continuously rotates through the rest of the page
    const st = ScrollTrigger.create({
      trigger: "#stack",
      start: "top bottom",
      end: "max",
      scrub: 1,
      onEnter: () => {
        if (kbd) kbd.visible = true;
        if (bongoCat) bongoCat.visible = true;
      },
      onLeaveBack: () => {
        if (kbd) kbd.visible = false;
        if (bongoCat) bongoCat.visible = false;
      },
      onUpdate: (self) => {
        kbd.rotation.y = self.progress * Math.PI * 4;
        kbd.rotation.x = Math.sin(self.progress * Math.PI * 2) * 0.35 + 0.2;
        kbd.rotation.z = Math.cos(self.progress * Math.PI * 2) * 0.15;
      },
    });

    splineApp.addEventListener("mouseHover", handleMouseHover);

    return () => {
      st.kill();
      if (bongoIntervalRef.current) clearInterval(bongoIntervalRef.current);
    };
  }, [splineApp]);

  function onLoad(app: Application) {
    setSplineApp(app);
    if (onLoaded) onLoaded();
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