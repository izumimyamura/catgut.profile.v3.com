'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCardProps {
  title: string;
  category: string;
  description: string;
  software: string[];
  icon: string;
}

const EDITING_SKILLS: SkillCardProps[] = [
  {
    title: 'Kinetic Typography & Motion Graphics',
    category: 'Motion Design',
    description: 'Dynamic text animation, custom expressions, speed ramping, and retention-engineered visual overlays.',
    software: ['After Effects', 'Apple Motion'],
    icon: '✦',
  },
  {
    title: 'Node-Based Color Grading & Moods',
    category: 'Color & Atmosphere',
    description: 'Cinematic LUT mapping, color space conversion, skin tone qualification, and atmospheric film grain.',
    software: ['DaVinci Resolve', 'Premiere Pro'],
    icon: '🎨',
  },
  {
    title: 'Precision Pacing & Micro-Cuts',
    category: 'Video Editing',
    description: 'Pacing designed for algorithm retention, seamless invisible transitions, and high-energy multi-cam sync.',
    software: ['Premiere Pro', 'CapCut Pro'],
    icon: '✂',
  },
  {
    title: 'Immersive Sound Design & Mixing',
    category: 'Audio Architecture',
    description: 'Impact swooshes, dynamic equalizer ducking, ambient environmental soundscapes, and Fairlight audio polish.',
    software: ['DaVinci Fairlight', 'Premiere Pro'],
    icon: '🔊',
  },
  {
    title: 'Visual Tracking & Rotoscoping',
    category: 'VFX & Compositing',
    description: '3D camera tracking, AI rotoscoping, spatial background removal, and object replacement overlays.',
    software: ['After Effects', 'Mocha Pro'],
    icon: '🎯',
  },
];

export default function EditingShowcaseTunnel() {
  const tunnelRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!tunnelRef.current || !roomRef.current) return;

    const ctx = gsap.context(() => {
      // 3D Room zoom depth effect on scroll
      gsap.fromTo(
        roomRef.current,
        { translateZ: -1200, rotateX: 10, rotateY: -10 },
        {
          translateZ: 200,
          rotateX: 0,
          rotateY: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: tunnelRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={tunnelRef}
      id="motion-skills"
      style={{
        position: 'relative',
        width: '100vw',
        height: '220vh',
        backgroundColor: '#000',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Sticky 3D Perspective Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px',
          overflow: 'hidden',
        }}
      >
        {/* Header Title Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '8vh',
            zIndex: 30,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              color: '#EAB308',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Post-Production Arsenal
          </span>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              margin: '0.5rem 0 0 0',
              color: '#fff',
              letterSpacing: '-0.03em',
            }}
          >
            Motion Design & Editing Suite
          </h2>
        </div>

        {/* 3D Room / Hallway Container */}
        <div
          ref={roomRef}
          style={{
            width: '100%',
            maxWidth: '1200px',
            height: '600px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 3D Wall Grids */}
          <div
            style={{
              position: 'absolute',
              inset: '-100px',
              border: '1px solid rgba(234, 179, 8, 0.15)',
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              borderRadius: '40px',
              pointerEvents: 'none',
            }}
          />

          {/* Active Skill Focus Card */}
          <div
            style={{
              position: 'relative',
              zIndex: 20,
              width: '90%',
              maxWidth: '850px',
              backgroundColor: 'rgba(12, 12, 16, 0.92)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              borderRadius: '32px',
              padding: '3rem',
              boxShadow:
                '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(234, 179, 8, 0.15)',
              transition: 'all 0.4s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '2.5rem',
                  lineHeight: 1,
                }}
              >
                {EDITING_SKILLS[activeIndex].icon}
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(234, 179, 8, 0.12)',
                  color: '#EAB308',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {EDITING_SKILLS[activeIndex].category}
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              {EDITING_SKILLS[activeIndex].title}
            </h3>

            <p
              style={{
                color: '#a1a1aa',
                fontSize: '1.2rem',
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              {EDITING_SKILLS[activeIndex].description}
            </p>

            {/* Software Badge Stack */}
            <div>
              <span
                style={{
                  display: 'block',
                  color: '#71717a',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '0.8rem',
                }}
              >
                Primary Software
              </span>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                {EDITING_SKILLS[activeIndex].software.map((sw, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      padding: '0.5rem 1.2rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Navigation Selector */}
        <div
          style={{
            position: 'absolute',
            bottom: '6vh',
            zIndex: 30,
            display: 'flex',
            gap: '0.8rem',
            overflowX: 'auto',
            maxWidth: '90vw',
            padding: '0.5rem',
          }}
        >
          {EDITING_SKILLS.map((skill, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                backgroundColor:
                  activeIndex === index
                    ? '#EAB308'
                    : 'rgba(255, 255, 255, 0.08)',
                color: activeIndex === index ? '#000' : '#a1a1aa',
                border:
                  activeIndex === index
                    ? '1px solid #EAB308'
                    : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '14px',
                padding: '0.6rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25 ease',
                whiteSpace: 'nowrap',
              }}
            >
              {skill.icon} {skill.category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}