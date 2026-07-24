'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (index < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        if (textRef.current) {
          gsap.fromTo(
            textRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.18, ease: "power2.out" }
          );
        }
        setIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            y: "-100vh",
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        }
      }, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [index, onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          ref={textRef}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: 'sans-serif',
          }}
        >
          • {GREETINGS[index].word}
        </p>
      </div>
    </div>
  );
}