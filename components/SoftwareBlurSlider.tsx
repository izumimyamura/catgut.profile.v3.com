'use client';

import React, { useEffect, useRef } from 'react';

interface SoftwareItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  features: string[];
  icon: string;
  accentColor: string;
}

const SOFTWARE_LIST: SoftwareItem[] = [
  {
    id: 'ae',
    name: 'Adobe After Effects',
    category: 'Motion Graphics & VFX',
    description: 'Industry-standard motion design suite for kinetic typography, complex 2D/3D compositing, expressions, speed ramping, and visual effects.',
    badge: 'Primary Motion Tool',
    features: ['Kinetic Typography', '3D Camera Tracking', 'Custom Expressions', 'Rotoscoping & VFX'],
    icon: '✦',
    accentColor: '#9999FF',
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    category: 'Color Grading & Audio',
    description: 'High-end node-based color grading, color space transform, atmospheric film grain, and Fairlight audio mixing for cinema and digital content.',
    badge: 'Color Engine',
    features: ['Node-Based Color Space', 'Skin Tone Qualification', 'Fairlight Audio Polish', 'Cinematic LUT Mapping'],
    icon: '🎨',
    accentColor: '#FF6B4A',
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere Pro',
    category: 'Timeline Video Editing',
    description: 'Professional timeline editing for multi-cam sync, precision micro-cuts, dynamic audio ducking, and retention-engineered pacing.',
    badge: 'Core NLE Editor',
    features: ['Multi-Cam Sync', 'Micro-Cut Pacing', 'Dynamic Masking', 'Retention Editing'],
    icon: '✂',
    accentColor: '#EA77FF',
  },
  {
    id: 'motion',
    name: 'Apple Motion',
    category: 'Mac Motion Engine',
    description: 'Mac-optimized real-time motion graphics engine built for lightning-fast title generation and Final Cut Pro template creation.',
    badge: 'Mac Specialization',
    features: ['Real-Time Rendering', 'Title Generators', 'Vector Masking', 'Fast FX Export'],
    icon: '⚡',
    accentColor: '#38BDF8',
  },
  {
    id: 'capcut',
    name: 'CapCut Pro',
    category: 'Viral Social Editing',
    description: 'Rapid social media editing packed with AI background removal, auto-caption styling, and algorithm-focused hook assembly.',
    badge: 'Shorts & Reels',
    features: ['AI Background Keying', 'Auto Captions', 'Algorithm Hooks', 'Viral Sound FX'],
    icon: '🔥',
    accentColor: '#22C55E',
  },
];

export default function SoftwareBlurSlider() {
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Swiper 11 dynamically to match the GitHub template
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).Swiper && swiperContainerRef.current) {
        new (window as any).Swiper(swiperContainerRef.current, {
          loop: true,
          mousewheel: true,
          slidesPerView: 3,
          speed: 1200,
          spaceBetween: 0,
          centeredSlides: false,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="software-slider"
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        color: '#111111',
        position: 'relative',
        zIndex: 20,
        padding: '10vh 0',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --transition-duration: 1.2s;
          --transition-timing: ease;
          --base-scale: 0.6;
          --active-scale: 1.8;
          --next-scale: 1.3;
          --next-plus-scale: 0.85;
          --base-blur: 16px;
          --next-blur: 0px;
          --next-plus-blur: 8px;
          --blur-effect: 40px;
        }

        .software-swiper {
          width: 100%;
          height: 70vh;
          overflow: hidden;
          position: relative;
        }

        .software-swiper .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* Slide image container base styles */
        .software-swiper .slide-img {
          width: 260px;
          height: 260px;
          border-radius: 32px;
          background: #f4f4f5;
          border: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          filter: blur(var(--base-blur));
          transition: all var(--transition-duration) var(--transition-timing);
          scale: var(--base-scale);
          opacity: 1;
          transform: translateX(40%);
        }

        .software-swiper .slide-img-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem;
        }

        /* Blur glow background behind active item */
        .software-swiper .slide-img-blur {
          opacity: 0;
          position: absolute;
          transition: all var(--transition-duration) ease;
        }

        /* Active slide styles */
        .software-swiper .swiper-slide-active .slide-img {
          scale: var(--active-scale);
          transform: translateX(-50%);
          opacity: 0;
        }

        /* Next slide styles (FOCUSED ACTIVE PRODUCT) */
        .software-swiper .swiper-slide-next .slide-img {
          filter: blur(var(--next-blur));
          scale: var(--next-scale);
          transform: translateX(10%);
          opacity: 1;
          background: #ffffff;
          border-color: rgba(0,0,0,0.12);
          box-shadow: 0 30px 60px rgba(0,0,0,0.12);
        }

        .software-swiper .swiper-slide-next .slide-img-blur {
          opacity: 0.35;
          filter: blur(var(--blur-effect));
          z-index: -1;
          transform: translate(80%);
        }

        /* Next + 1 slide styles */
        .software-swiper .swiper-slide-next + .swiper-slide .slide-img {
          filter: blur(var(--next-plus-blur));
          scale: var(--next-plus-scale);
          opacity: 0.85;
        }

        .software-swiper .swiper-slide-next {
          transform: translateX(40%);
        }

        .software-swiper .swiper-slide-next + .swiper-slide {
          transform: translateX(25%);
        }

        /* Slide Content (Info block) */
        .software-swiper .slide-content {
          position: absolute;
          opacity: 0;
          filter: blur(20px);
          transition: opacity 1.2s ease, filter 1.2s ease, transform 1.2s ease;
          width: 38vw;
          max-width: 520px;
          pointer-events: none;
        }

        .software-swiper .swiper-slide-next .slide-content {
          transform: translateX(-75%);
          opacity: 1;
          filter: blur(0);
          pointer-events: auto;
        }

        .software-badge {
          display: inline-block;
          padding: 0.3rem 1rem;
          background: #f4f4f5;
          color: #111;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 1rem;
        }

        .software-title {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #000;
          margin-bottom: 0.8rem;
        }

        .software-desc {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1.05rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .features-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .feature-chip {
          background: #f4f4f6;
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #222;
          padding: 0.4rem 0.9rem;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 700;
        }
      ` }} />

      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto', padding: '0 2rem' }}>
        <span
          style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '0.4rem 1.2rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Production Software
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, margin: '0.8rem 0 0 0', color: '#000', letterSpacing: '-0.03em' }}>
          Software & Tools
        </h2>
        <p style={{ color: '#666', fontSize: '1.2rem', marginTop: '0.8rem', fontWeight: 500 }}>
          Scroll or swipe through to inspect editing capabilities and features.
        </p>
      </div>

      {/* Swiper Blur Slider Container */}
      <div ref={swiperContainerRef} className="swiper software-swiper">
        <div className="swiper-wrapper">
          {SOFTWARE_LIST.map((item) => (
            <div key={item.id} className="swiper-slide">
              {/* Content Panel (Left) */}
              <div className="slide-content">
                <span className="software-badge" style={{ borderLeft: `4px solid ${item.accentColor}` }}>
                  {item.badge}
                </span>
                <h2 className="software-title">{item.name}</h2>
                <p className="software-desc">{item.description}</p>

                <div className="features-grid">
                  {item.features.map((feat, fIdx) => (
                    <span key={fIdx} className="feature-chip">
                      ✦ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Software Image Box (Right) */}
              <div className="slide-img">
                <div className="slide-img-inner">
                  <span style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#000' }}>{item.name}</span>
                  <span style={{ fontSize: '0.78rem', color: '#777', fontWeight: 700, marginTop: '0.2rem' }}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Blurred Glow behind image */}
              <div className="slide-img-blur">
                <div
                  style={{
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    backgroundColor: item.accentColor,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}