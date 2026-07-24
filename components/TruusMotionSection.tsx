'use client';

import React from 'react';

const CARDS_DATA = [
  {
    color: '#29725f',
    textColor: '#ffffff',
    title: 'Motion Design',
    badge: 'After Effects & Motion',
    services: [
      'Kinetic Typography',
      '2D/3D Title Animation',
      'Speed Ramping & FX',
      'Custom Expressions',
      'Logo Motion Packs',
    ],
    rotate: '-3deg',
  },
  {
    color: '#82a0ff',
    textColor: '#000000',
    title: 'Color Grading',
    badge: 'DaVinci Resolve',
    services: [
      'Node-Based Color Space',
      'Cinematic LUT Mapping',
      'Skin Tone Qualification',
      'Atmospheric Film Grain',
      'Fairlight Audio Polish',
    ],
    rotate: '4deg',
  },
  {
    color: '#f5693c',
    textColor: '#000000',
    title: 'Video Editing',
    badge: 'Premiere Pro',
    services: [
      'Algorithm Pacing & Hooks',
      'Micro-Cut Pacing',
      'Multi-Cam Sync',
      'Seamless Mask Cuts',
      'Retention Editing',
    ],
    rotate: '-2deg',
  },
  {
    color: '#a0325a',
    textColor: '#ffffff',
    title: 'Fast Socials',
    badge: 'CapCut Pro & AI',
    services: [
      'Trending Audio Ducking',
      'Auto Caption Styling',
      'Background Removal',
      'Viral Format Hooks',
      'Rapid Turnaround',
    ],
    rotate: '5deg',
  },
];

export default function TruusMotionSection() {
  return (
    <section
      id="motion-skills"
      style={{
        width: '100vw',
        backgroundColor: '#f0ebe6',
        color: '#1a1a1a',
        padding: '12vh 2rem 15vh 2rem',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Playful Section Title */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 5rem auto' }}>
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#f0befa',
            color: '#000',
            padding: '0.4rem 1.4rem',
            borderRadius: '999px',
            fontSize: '0.9rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            transform: 'rotate(-2deg)',
          }}
        >
          Post-Production Toolkit
        </span>

        <h2
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            margin: 0,
            color: '#000',
          }}
        >
          Motion Design & Editing <span style={{ fontStyle: 'italic', fontFamily: 'serif', fontWeight: 400 }}>Suite</span>
        </h2>

        <p style={{ color: '#666', fontSize: '1.25rem', marginTop: '1.2rem', fontWeight: 500 }}>
          Everything needed to make cuts feel alive, punchy, and retention-engineered.
        </p>
      </div>

      {/* Goofy/Pookie Interactive Cards Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          maxWidth: '1300px',
          margin: '0 auto',
        }}
      >
        {CARDS_DATA.map((card, idx) => (
          <div
            key={idx}
            style={{
              flex: '1 1 270px',
              maxWidth: '310px',
              minHeight: '420px',
              backgroundColor: card.color,
              color: card.textColor,
              borderRadius: '24px',
              padding: '2.5rem 1.8rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              transform: `rotate(${card.rotate})`,
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06) rotate(0deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `scale(1) rotate(${card.rotate})`;
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  opacity: 0.85,
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                {card.badge}
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 1.5rem 0', letterSpacing: '-0.02em' }}>
                {card.title}
              </h3>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {card.services.map((service, sIdx) => (
                  <li
                    key={sIdx}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginBottom: '0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>✦</span> {service}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '2rem', fontSize: '0.85rem', fontWeight: 800, opacity: 0.7 }}>
              0{idx + 1} // TOOLKIT
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}