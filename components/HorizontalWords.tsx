'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalWords() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = sectionRef.current;
      if (!container) return;

      const textRef = container.querySelector('.horizontal-words__relative');
      const letters = container.querySelectorAll('.letter');
      const stickers = container.querySelectorAll('.horizontal-sticker');

      // ScrollTween for horizontal movement of the text block
      const scrollTween = gsap.fromTo(
        textRef,
        { xPercent: 40 },
        {
          xPercent: -85,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=2500',
            scrub: 1,
            pin: true,
          },
        }
      );

      // Bounce each letter randomly
      letters.forEach((letter) => {
        gsap.from(letter, {
          yPercent: (Math.random() - 0.5) * 300,
          rotation: (Math.random() - 0.5) * 40,
          ease: 'elastic.out(1.2, 1)',
          scrollTrigger: {
            trigger: letter,
            containerAnimation: scrollTween,
            start: 'left 95%',
            end: 'left 15%',
            scrub: 0.5,
          },
        });
      });

      // Bounce stickers
      stickers.forEach((sticker) => {
        gsap.from(sticker, {
          scale: 0,
          yPercent: (Math.random() - 0.5) * 300,
          rotation: (Math.random() - 0.5) * 50,
          ease: 'elastic.out(1.2, 1)',
          scrollTrigger: {
            trigger: sticker,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'left 20%',
            scrub: 0.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0ebe6',
        color: '#1a1a1a',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
      }}
    >
      <div
        className="horizontal-words__relative"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10vw',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(4rem, 11vw, 12rem)',
            fontWeight: 900,
            lineHeight: 1,
            margin: 0,
            textTransform: 'lowercase',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            letterSpacing: '-0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25em',
          }}
        >
          {['we', 'wanna', 'be', 'where', 'the', 'people', 'are'].map((word, wordIdx) => (
            <span key={wordIdx} style={{ display: 'inline-flex', gap: '0.02em', position: 'relative' }}>
              {word.split('').map((char, charIdx) => (
                <span key={charIdx} className="letter" style={{ display: 'inline-block' }}>
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* Playful Decorative Badges */}
        <span
          className="horizontal-sticker"
          style={{
            marginLeft: '2rem',
            backgroundColor: '#f5693c',
            color: '#fff',
            padding: '0.8rem 1.8rem',
            borderRadius: '999px',
            fontSize: '1.8rem',
            fontWeight: 800,
            transform: 'rotate(-6deg)',
            boxShadow: '0 10px 25px rgba(245,105,60,0.3)',
          }}
        >
          ✦ motion suite
        </span>

        <span
          className="horizontal-sticker"
          style={{
            marginLeft: '1.5rem',
            backgroundColor: '#82a0ff',
            color: '#000',
            padding: '0.8rem 1.8rem',
            borderRadius: '999px',
            fontSize: '1.8rem',
            fontWeight: 800,
            transform: 'rotate(8deg)',
            boxShadow: '0 10px 25px rgba(130,160,255,0.3)',
          }}
        >
          editing magic ✂
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: '12vh',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          maxWidth: '600px',
          zIndex: 25,
        }}
      >
        <p
          style={{
            color: '#555',
            fontSize: '1.3rem',
            fontWeight: 500,
            lineHeight: 1.5,
            margin: 0,
            fontFamily: 'sans-serif',
          }}
        >
          High-retention video editing and motion graphics engineered for social platforms and digital screens.
        </p>
      </div>
    </section>
  );
}