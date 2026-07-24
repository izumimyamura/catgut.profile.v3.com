'use client';

import React, { useState, useEffect } from 'react';

interface TechItem {
  id: string;
  title: string;
  filename: string;
  language: string;
  codeSnippet: string;
  description: string;
}

const TECH_STACK: TechItem[] = [
  {
    id: 'css-html',
    title: 'HTML5 & Modern CSS3',
    filename: 'layout.styles.css',
    language: 'HTML5 / CSS3',
    codeSnippet: `/* Modern Responsive Architecture */
.keyboard-viewport {
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 32px;
}`,
    description: 'Clean semantic markups, CSS Grid & Flexbox architecture, fluid typography, glassmorphism UI, and responsive layouts.',
  },
  {
    id: 'js-ts',
    title: 'JavaScript & TypeScript',
    filename: 'state.manager.ts',
    language: 'TypeScript / ES6+',
    codeSnippet: `interface SkillStack {
  core: string[];
  typeSafe: boolean;
  performanceScore: number;
}

const developer: SkillStack = {
  core: ["JavaScript", "TypeScript", "Node.js"],
  typeSafe: true,
  performanceScore: 100,
};`,
    description: 'Strong ES6+ fundamentals, DOM manipulation, asynchronous state management, and strict type-safe codebases.',
  },
  {
    id: 'react-next',
    title: 'React & Next.js Framework',
    filename: 'PortfolioApp.tsx',
    language: 'React 19 / Next.js',
    codeSnippet: `export default function PortfolioApp() {
  return (
    <React.Suspense fallback={<Preloader />}>
      <Animated3DCanvas scene="/assets/skills-keyboard.spline" />
    </React.Suspense>
  );
}`,
    description: 'Building modern server-rendered applications, dynamic routing, component reusability, and WebGL 3D canvas integrations.',
  },
  {
    id: 'tailwind-gsap',
    title: 'Tailwind CSS & Motion',
    filename: 'animations.config.ts',
    language: 'Tailwind / GSAP',
    codeSnippet: `gsap.to("#keyboard", {
  scrollTrigger: {
    trigger: "#webdev",
    scrub: 1.2,
  },
  rotationY: Math.PI * 2,
  ease: "power2.out",
});`,
    description: 'Utility-first styling mixed with GSAP ScrollTrigger, Framer Motion, and Smooth Scroll engines for interactive experiences.',
  },
];

export default function TerminalSkillCard() {
  const [activeTab, setActiveTab] = useState(0);
  const [showCode, setShowCode] = useState(true);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const currentTech = TECH_STACK[activeTab];

  // Write-on typewriter effect when changing tabs or views
  useEffect(() => {
    if (showCode) {
      setDisplayedCode('');
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < currentTech.codeSnippet.length) {
          setDisplayedCode((prev) => prev + currentTech.codeSnippet.charAt(currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 20);

      return () => clearInterval(typingInterval);
    }
  }, [showCode, activeTab, currentTech.codeSnippet]);

  // Smooth auto-cycling through technologies every 10 seconds
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TECH_STACK.length);
    }, 10000);

    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1100px',
        minHeight: '520px',
        margin: '0 auto',
        backgroundColor: 'rgba(10, 10, 14, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(234, 179, 8, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* VS Code Window Header with Interactive Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.8rem 1.5rem',
          backgroundColor: 'rgba(18, 18, 22, 0.98)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Window Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></span>
        </div>

        {/* Editor File Tabs */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {TECH_STACK.map((tech, index) => (
            <button
              key={tech.id}
              onClick={() => setActiveTab(index)}
              style={{
                backgroundColor: activeTab === index ? 'rgba(234, 179, 8, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                color: activeTab === index ? '#EAB308' : '#a1a1aa',
                border: activeTab === index ? '1px solid rgba(234, 179, 8, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '0.4rem 1rem',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tech.filename}
            </button>
          ))}
        </div>

        {/* View Switch Button */}
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '999px',
            padding: '0.4rem 1.2rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {showCode ? 'View Details' : 'View Code'}
        </button>
      </div>

      {/* Main Terminal Body */}
      <div style={{ flex: 1, padding: '3rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {showCode ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: '#38bdf8',
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              animation: 'fadeIn 0.4s ease',
            }}
          >
            <code>
              {displayedCode}
              {isTyping && <span style={{ color: '#EAB308', fontWeight: 'bold' }}>|</span>}
            </code>
          </div>
        ) : (
          <div style={{ textAlign: 'left', width: '100%', animation: 'fadeIn 0.4s ease' }}>
            <span style={{ color: '#EAB308', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {currentTech.language}
            </span>
            <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', margin: '0.6rem 0 1.2rem 0' }}>
              {currentTech.title}
            </h3>
            <p style={{ color: '#d4d4d8', fontSize: '1.3rem', lineHeight: 1.7, maxWidth: '800px', margin: 0 }}>
              {currentTech.description}
            </p>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div
        style={{
          padding: '0.6rem 1.5rem',
          backgroundColor: 'rgba(15, 15, 18, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: '#71717a',
          fontFamily: 'monospace',
        }}
      >
        <span>FILE: {currentTech.filename}</span>
        <span style={{ color: '#EAB308', fontWeight: 600 }}>AUTO-ROTATING (10s)</span>
      </div>
    </div>
  );
}