'use client';

import React, { useEffect, useState } from 'react';

const WELCOME_WORDS = [
  { text: 'வணக்கம்', lang: 'Tamil' },
  { text: 'நமஸ்காரம்', lang: 'Malayalam' },
  { text: 'ನಮಸ್ಕಾರ', lang: 'Kannada' },
  { text: 'నమస్కారం', lang: 'Telugu' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Welcome', lang: 'English' },
];

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Cycle through languages
    const wordInterval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < WELCOME_WORDS.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(wordInterval);
          // Initiate smooth slide-up exit animation after the last word
          setTimeout(() => {
            setIsExit(true);
            // Re-enable scrolling & trigger onComplete
            setTimeout(() => {
              document.body.style.overflow = '';
              if (onComplete) onComplete();
            }, 800);
          }, 400);
          return prevIndex;
        }
      });
    }, 180); // Speed per word (180ms)

    return () => {
      clearInterval(wordInterval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#050505',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isExit ? 'translateY(-100%)' : 'translateY(0%)',
        opacity: isExit ? 0 : 1,
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
        pointerEvents: isExit ? 'none' : 'auto',
      }}
    >
      {/* Centered Welcome Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#EAB308',
            display: 'inline-block',
          }}
        ></span>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#ffffff',
            minWidth: '220px',
            textAlign: 'left',
          }}
        >
          {WELCOME_WORDS[index].text}
        </h1>
      </div>

      {/* Language Indicator */}
      <p
        style={{
          position: 'absolute',
          bottom: '3rem',
          fontSize: '0.85rem',
          color: '#71717a',
          fontFamily: 'monospace',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {WELCOME_WORDS[index].lang}
      </p>
    </div>
  );
}
