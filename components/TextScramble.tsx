'use client';

import React, { useEffect, useState, useRef } from 'react';

const CHAR_SETS = {
  japanese: 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン',
  tamil: 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநபமயரலவஶஷஸஹளழறன',
};

interface TextScrambleProps {
  text: string;
  fromLang?: 'japanese' | 'tamil';
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TextScramble({
  text,
  fromLang = 'japanese',
  speed = 40,
  className = '',
  style = {},
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const glyphs = CHAR_SETS[fromLang] || CHAR_SETS.japanese;

  useEffect(() => {
    // Trigger animation when the element scrolls into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startScramble();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startScramble = () => {
    let frame = 0;
    const totalFrames = text.length * 4;

    const interval = setInterval(() => {
      let output = '';
      const progress = frame / totalFrames;

      for (let i = 0; i < text.length; i++) {
        // Leave spaces intact
        if (text[i] === ' ') {
          output += ' ';
          continue;
        }

        // Determine if this letter is already decoded
        const charProgress = i / text.length;
        if (progress > charProgress) {
          output += text[i];
        } else {
          // Random character from character set
          const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
          output += randomGlyph;
        }
      }

      setDisplayText(output);
      frame++;

      if (frame > totalFrames) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, speed);
  };

  return (
    <span ref={elementRef} className={className} style={style}>
      {displayText || text.replace(/[^\s]/g, glyphs[0])}
    </span>
  );
}