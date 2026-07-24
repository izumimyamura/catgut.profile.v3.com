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

  // Keycap Hover / Click Info
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

  function onLoad(app: Application) {
    setSplineApp(app);
    if (onLoaded) onLoaded();

    // Ensure all 3D mesh components stay visible
    try {
      const allObjects = app.getAllObjects();
      allObjects.forEach((obj) => {
        obj.visible = true;
      });
    } catch (e) {}
  }

  useEffect(() => {
    if (!splineApp) return;

    const kbd = splineApp.findObjectByName("keyboard");
    const bongoCat = splineApp.findObjectByName("bongo-cat");
    const frame1 = splineApp.findObjectByName("frame-1");
    const frame2 = splineApp.findObjectByName("frame-2");

    if (!kbd) return;

    // Start position: Hide keyboard above #stack
    gsap.set(kbd.position, { y: -1200 });

    // Bongo Cat typing loop
    if (bongoCat && frame1 && frame2) {
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
    }

    // Floating keycaps animation (from video)
    Object.values(SKILLS).forEach((skill, idx) => {
      const keycap = splineApp.findObjectByName(skill.name);
      if (keycap) {
        gsap.to(keycap.position, {
          y: Math.random() * 60 + 60,
          duration: Math.random() * 2 + 1.5,
          delay: idx * 0.05,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    // 1. Enter "My Software Stack" (#stack): Slide into center & rotate
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#stack",
        start: "top bottom",
        end: "bottom center",
        scrub: 1.2,
      },
    });

    tl.to(kbd.position, { x: 0, y: -40, z: 0, ease: "power2.out" }, 0)
      .to(kbd.rotation, { x: 0.35, y: Math.PI / 4, z: 0, ease: "power2.out" }, 0);

    // 2. Scroll into "Web Dev" (#webdev): Move to side & tilt
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#webdev",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    tl2.to(kbd.position, { x: -300, y: 0, z: 0, ease: "power2.out" }, 0)
       .to(kbd.rotation, { x: 0.1, y: -Math.PI / 3, z: 0.1, ease: "power2.out" }, 0);

    splineApp.addEventListener("mouseHover", handleMouseHover);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (bongoIntervalRef.current) clearInterval(bongoIntervalRef.current);
    };
  }, [splineApp]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden">
      <Suspense fallback={null}>
        <Spline
          scene="/assets/skills-keyboard.spline"
          onLoad={onLoad}
          className="w-full h-full pointer-events-auto"
        />
      </Suspense>

      {/* Selected Skill Toast */}
      {selectedSkill && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-black/85 border border-white/10 rounded-2xl text-center backdrop-blur-md max-w-md pointer-events-none shadow-2xl">
          <h4 className="text-yellow-500 font-bold text-lg mb-1">{selectedSkill.label}</h4>
          <p className="text-zinc-300 text-sm">{selectedSkill.shortDescription}</p>
        </div>
      )}
    </div>
  );
}