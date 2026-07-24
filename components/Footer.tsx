'use client';

import React, { useState } from 'react';

export default function Footer() {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <footer
      style={{
        width: '100vw',
        padding: '12px',
        backgroundColor: '#f0ebe6',
        color: '#fff',
        position: 'relative',
        zIndex: 30,
        boxSizing: 'border-box',
      }}
    >
      {/* Outer Blue Card Container */}
      <div
        style={{
          backgroundColor: '#4b69f0',
          borderRadius: '24px',
          padding: '80px 40px 40px 40px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Content Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '40px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Column 1: Hiring Status */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '20px',
                borderBottomLeftRadius: '2px',
                fontSize: '0.95rem',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              availability
            </span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-1px' }}>
              open for freelance projects & collabs :)
            </h3>
          </div>

          {/* Column 2: Location / Base */}
          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '20px',
                borderBottomLeftRadius: '2px',
                fontSize: '0.95rem',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              location
            </span>
            <address style={{ fontStyle: 'normal', fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2 }}>
              Tamil Nadu / India<br />
              Worldwide Remote
            </address>
          </div>

          {/* Column 3: Contact & Socials */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '20px',
                borderBottomLeftRadius: '2px',
                fontSize: '0.95rem',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              contact
            </span>

            <a
              href="mailto:kavin123kavinl123@gmail.com"
              style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: '#fff',
                textDecoration: 'none',
                letterSpacing: '-0.5px',
                wordBreak: 'break-all',
              }}
            >
              kavin123kavinl123@gmail.com
            </a>

            <a
              href="https://www.instagram.com/thecatguy.editz/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              @thecatguy.editz ↗
            </a>

            <p style={{ fontSize: '0.9rem', opacity: 0.85, margin: '0.5rem 0 0 0' }}>
              *millennials & gen-z workflow: response time usually under 2 hours.
            </p>
          </div>
        </div>

        {/* Decorative Playful Stickers */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
          <span
            style={{
              position: 'absolute',
              top: '48%',
              left: '12%',
              fontSize: '4.5rem',
              transform: 'rotate(-15deg)',
            }}
          >
            🔥
          </span>
          <span
            style={{
              position: 'absolute',
              top: '42%',
              left: '48%',
              fontSize: '4rem',
              transform: 'rotate(10deg)',
            }}
          >
            💖
          </span>
          <span
            style={{
              position: 'absolute',
              top: '55%',
              right: '18%',
              fontSize: '4.2rem',
              transform: 'rotate(-8deg)',
            }}
          >
            💯
          </span>
        </div>

        {/* Bottom Giant Wordmark */}
        <div style={{ position: 'relative', width: '100%', marginTop: '80px', zIndex: 10 }}>
          <h1
            style={{
              fontSize: 'clamp(4rem, 15vw, 16rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              textAlign: 'center',
              letterSpacing: '-0.05em',
              lineHeight: 0.85,
              margin: 0,
              color: '#fff',
              userSelect: 'none',
            }}
          >
            THE CAT GUY
          </h1>

          {/* Bottom Row Credits Button & Popup */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: '2rem',
              position: 'relative',
            }}
          >
            {/* Pop-out Box */}
            {showCredits && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '120%',
                  right: 0,
                  backgroundColor: '#000',
                  border: '3px solid #fff',
                  borderRadius: '16px',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  gap: '2.5rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  animation: 'fadeIn 0.3s ease',
                  zIndex: 20,
                  whiteSpace: 'nowrap',
                }}
              >
                <div>
                  <span style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                    Design & Edit
                  </span>
                  <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800 }}>Kavin</span>
                </div>
                <div>
                  <span style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                    3D & Dev
                  </span>
                  <span style={{ color: '#EAB308', fontSize: '1.1rem', fontWeight: 800 }}>The Cat Guy</span>
                </div>
              </div>
            )}

            {/* Interactive Credits Toggle */}
            <button
              onClick={() => setShowCredits(!showCredits)}
              onMouseEnter={() => setShowCredits(true)}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 1.2rem',
                borderRadius: '20px',
                borderBottomLeftRadius: '2px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              credits
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}