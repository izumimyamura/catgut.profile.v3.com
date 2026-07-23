'use client';
import { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function KeyboardSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const splineRef = useRef<any>(null);

  const SKILL_DETAILS: Record<string, { title: string; desc: string }> = {
    ae: { title: "Adobe After Effects", desc: "Complex motion graphics, visual effects, and animated text." },
    davinci: { title: "DaVinci Resolve", desc: "High-end color grading nodes and audio soundscapes." },
    motion: { title: "Apple Motion", desc: "Streamlined Mac motion graphics templates for FCP." },
    premiere: { title: "Adobe Premiere Pro", desc: "Industry standard non-linear timeline video editing." },
    capcut: { title: "CapCut", desc: "Rapid social media content and AI toolsets." },
  };

  function onLoad(splineApp: any) {
    splineRef.current = splineApp;
  }

  function onMouseDown(e: any) {
    const targetName = e.target.name?.toLowerCase();
    if (SKILL_DETAILS[targetName]) {
      setActiveSkill(targetName);
    }
  }

  return (
    <section id="stack" style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#000', position: 'relative', zIndex: 20, padding: '8vh 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
          My Software Stack
        </h2>
        <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginTop: '0.8rem' }}>
          Click keycaps on the interactive 3D keyboard below.
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '1100px', height: '550px', position: 'relative' }}>
        <Spline
          scene="/assets/skills-keyboard.spline"
          onLoad={onLoad}
          onMouseDown={onMouseDown}
        />
      </div>

      {activeSkill && SKILL_DETAILS[activeSkill] && (
        <div style={{ marginTop: '2rem', padding: '1.5rem 2.5rem', backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', textAlign: 'center', maxWidth: '500px' }}>
          <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#EAB308' }}>
            {SKILL_DETAILS[activeSkill].title}
          </h3>
          <p style={{ color: '#a1a1aa', marginTop: '0.5rem', marginBottom: 0 }}>
            {SKILL_DETAILS[activeSkill].desc}
          </p>
        </div>
      )}
    </section>
  );
}