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

  // Keycap Mouse Interaction
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

    try {
      const kbd = app.findObjectByName("keyboard");
      if (kbd) kbd.visible = true;

      // Hide Bongo Cat by default on load (appears only at #stack)
      const bongoCat = app.findObjectByName("bongo-cat");
      if (bongoCat) bongoCat.visible = false;
    } catch (e) {}
  }

  useEffect(() => {
    if (!splineApp) return;

    const kbd = splineApp.findObjectByName("keyboard");
    const bongoCat = splineApp.findObjectByName("bongo-cat");
    const frame1 = splineApp.findObjectByName("frame-1");
    const frame2 = splineApp.findObjectByName("frame-2");

    if (!kbd) return;

    // Control Bongo Cat Typing Loop
    const startBongoCat = () => {
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
      if (bongoCat) bongoCat.visible = false;
    };

    // Keycaps subtle float animation
    Object.values(SKILLS).forEach((skill, idx) => {
      const keycap = splineApp.findObjectByName(skill.name);
      if (keycap) {
        gsap.to(keycap.position, {
          y: Math.random() * 40 + 40,
          duration: Math.random() * 2 + 1.5,
          delay: idx * 0.05,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    const ctx = gsap.context(() => {
      // 1. Projects Section: Keyboard rotates slightly
      ScrollTrigger.create({
        trigger: "#projects",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.2,
        onUpdate: (self) => {
          kbd.rotation.y = self.progress * (Math.PI / 2);
          kbd.rotation.x = Math.sin(self.progress * Math.PI) * 0.2;
        },
      });

      // 2. Photos / Card Stack Section: Tilts isometric
      ScrollTrigger.create({
        trigger: "#photos",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.2,
        onUpdate: (self) => {
          kbd.rotation.y = (Math.PI / 2) + self.progress * (Math.PI / 2);
          kbd.rotation.x = 0.2 + Math.cos(self.progress * Math.PI) * 0.15;
        },
      });

      // 3. My Software Stack Section: Bongo Cat rotates into view!
      ScrollTrigger.create({
        trigger: "#stack",
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1.2,
        onEnter: () => {
          startBongoCat();
        },
        onLeaveBack: () => {
          stopBongoCat();
        },
        onUpdate: (self) => {
          kbd.rotation.y = Math.PI + self.progress * Math.PI;
          kbd.rotation.x = 0.28;
        },
      });

      // 4. Web Development Terminals Section
      ScrollTrigger.create({
        trigger: "#webdev",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          kbd.rotation.y = Math.PI * 2 + self.progress * (Math.PI / 2);
        },
      });
    });

    splineApp.addEventListener("mouseHover", handleMouseHover);

    return () => {
      ctx.revert();
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

      {selectedSkill && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-black/85 border border-white/10 rounded-2xl text-center backdrop-blur-md max-w-md pointer-events-none shadow-2xl">
          <h4 className="text-yellow-500 font-bold text-lg mb-1">{selectedSkill.label}</h4>
          <p className="text-zinc-300 text-sm">{selectedSkill.shortDescription}</p>
        </div>
      )}
    </div>
  );
}