'use client';

import React, { useEffect, useState, useRef } from 'react';

const CHAR_SETS = {
  japanese: 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン',
  tamil: 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநபமயரலவஶஷஸஹளழறன',
};

export interface TextScrambleProps {
  text: string;
  fromLang?: 'japanese' | 'tamil';
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TextScramble({
  text,
  fromLang = 'japanese',
  speed = 18, // Decreased interval for a faster decoding tick
  className = '',
  style = {},
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const glyphs = CHAR_SETS[fromLang] || CHAR_SETS.japanese;

  useEffect(() => {
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
    // Reduced from length * 4 to length * 2 for double speed reveal
    const totalFrames = Math.max(text.length * 2, 20);

    const interval = setInterval(() => {
      let output = '';
      const progress = frame / totalFrames;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          output += ' ';
          continue;
        }

        const charProgress = i / text.length;
        if (progress > charProgress) {
          output += text[i];
        } else {
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