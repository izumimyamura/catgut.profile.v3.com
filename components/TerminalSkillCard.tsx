'use client';

import React, { useState, useEffect } from 'react';

interface TerminalSkillCardProps {
  title: string;
  filename: string;
  language: string;
  codeSnippet: string;
  description: string;
}

export default function TerminalSkillCard({
  title,
  filename,
  language,
  codeSnippet,
  description,
}: TerminalSkillCardProps) {
  const [showCode, setShowCode] = useState(true);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect on code display
  useEffect(() => {
    if (showCode) {
      setDisplayedCode('');
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < codeSnippet.length) {
          setDisplayedCode((prev) => prev + codeSnippet.charAt(currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 25);

      return () => clearInterval(typingInterval);
    }
  }, [showCode, codeSnippet]);

  // Smooth auto-toggle every 10 seconds
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setShowCode((prev) => !prev);
    }, 10000);

    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '420px',
        backgroundColor: 'rgba(12, 12, 14, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(234, 179, 8, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* VS Code Window Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.8rem 1.2rem',
          backgroundColor: 'rgba(20, 20, 24, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }}></span>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#a1a1aa', fontFamily: 'monospace', fontWeight: 600 }}>
          {filename}
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            backgroundColor: 'rgba(234, 179, 8, 0.15)',
            color: '#EAB308',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '8px',
            padding: '0.3rem 0.8rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {showCode ? 'View Details' : 'View Terminal'}
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '2rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {showCode ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#38bdf8',
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              animation: 'fadeIn 0.5s ease',
            }}
          >
            <code>
              {displayedCode}
              {isTyping && <span style={{ color: '#EAB308', fontWeight: 'bold' }}>|</span>}
            </code>
          </div>
        ) : (
          <div
            style={{
              textAlign: 'left',
              width: '100%',
              animation: 'fadeIn 0.5s ease',
            }}
          >
            <span style={{ color: '#EAB308', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {language}
            </span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 1rem 0' }}>
              {title}
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '1.15rem', lineHeight: 1.7, margin: 0 }}>
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div
        style={{
          padding: '0.5rem 1.2rem',
          backgroundColor: 'rgba(15, 15, 18, 0.8)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: '#71717a',
          fontFamily: 'monospace',
        }}
      >
        <span>STATUS: ACTIVE</span>
        <span style={{ color: '#EAB308' }}>AUTO-SWITCHING (10s)</span>
      </div>
    </div>
  );
}