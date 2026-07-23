'use client';

import React, { useEffect, useState } from 'react';

const GREETINGS = [
  { word: "வணக்கம்", lang: "Tamil" },
  { word: "നമസ്കാരം", lang: "Malayalam" },
  { word: "ನಮಸ್ಕಾರ", lang: "Kannada" },
  { word: "నమస్కారం", lang: "Telugu" },
  { word: "नमस्कार", lang: "Marathi" },
  { word: "नमस्ते", lang: "Hindi" },
  { word: "こんにちは", lang: "Japanese" },
  { word: "Hallo", lang: "German" },
  { word: "Bonjour", lang: "French" },
  { word: "Hello", lang: "English" },
];

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (index < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setIndex((prev) => prev + 1);
          setFade(true);
        }, 50);
      }, 220); // Smooth greeting switch
      return () => clearTimeout(timer);
    } else {
      // Hold on English briefly, then slide up cleanly
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [index, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        transform: isExiting ? 'translateY(-100vh)' : 'translateY(0)',
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: 'sans-serif',
            opacity: fade ? 1 : 0,
            transform: fade ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.15s ease, transform 0.15s ease',
          }}
        >
          • {GREETINGS[index].word}
        </p>
      </div>
    </div>
  );
}