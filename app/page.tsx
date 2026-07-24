'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Preloader = dynamic(() => import('../components/Preloader'), { ssr: false });
const SideRays = dynamic(() => import('../components/SideRays'), { ssr: false });
const BlurText = dynamic(() => import('../components/BlurText'), { ssr: false });
const CardSwap = dynamic(() => import('../components/CardSwap'), { ssr: false });
const Card = dynamic(() => import('../components/CardSwap').then(mod => mod.Card), { ssr: false });
const AnimatedBackground = dynamic(() => import('../components/AnimatedBackground'), { ssr: false });
const TerminalSkillCard = dynamic(() => import('../components/TerminalSkillCard'), { ssr: false });
const TextScramble = dynamic(() => import('../components/TextScramble'), { ssr: false });
const EditingShowcaseTunnel = dynamic(() => import('../components/EditingShowcaseTunnel'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. Multi-language Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Fixed 3D Keyboard Background Layer */}
      <AnimatedBackground onLoaded={() => setLoading(false)} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .apple-slider-container {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 1rem 5vw 2rem 5vw;
          -webkit-overflow-scrolling: touch;
        }
        
        .apple-slider-container::-webkit-scrollbar {
          display: none;
        }
        
        .apple-slider-card {
          flex: 0 0 85vw;
          max-width: 950px;
          scroll-snap-align: center;
          display: flex;
          flex-direction: row;
          background-color: rgba(12, 12, 16, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 36px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          transition: transform 0.3s ease;
        }

        .apple-slider-left {
          flex: 0 0 45%;
          position: relative;
          min-height: 480px;
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        .apple-slider-right {
          flex: 1;
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .slider-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
        }
        .slider-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        @media (max-width: 900px) {
          .apple-slider-card { flex-direction: column; flex: 0 0 90vw; }
          .apple-slider-left { flex: 0 0 350px; min-height: 350px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .apple-slider-right { padding: 2rem; }
          .split-container { flex-direction: column; text-align: center; }
          .split-text { padding: 4rem 2rem 2rem 2rem !important; align-items: center; }
          .split-cards { padding-bottom: 4rem; width: 100%; }
        }
      `}} />

      {/* Navigation Header */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2.5rem', backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.15em' }}>THE CAT GUY</div>
        <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <a href="#hero" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Home</a>
          <a href="#projects" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Projects</a>
          <a href="#photos" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Photography</a>
          <a href="#stack" style={{ color: '#e5e5e5', textDecoration: 'none' }}>My Stack</a>
          <a href="#webdev" style={{ color: '#EAB308', textDecoration: 'none' }}>Web Dev</a>
          <a href="#motion-skills" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Motion Suite</a>
        </div>
        <a href="mailto:kavin123kavinl123@gmail.com" style={{ backgroundColor: '#fff', color: '#000', padding: '0.6rem 1.5rem', borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>Hire Me</a>
      </nav>

      {/* HERO SECTION Anchor */}
      <section id="hero" style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <SideRays speed={2.5} rayColor1="#EAB308" rayColor2="#96c8ff" intensity={3.0} spread={2.5} origin="top-right" />
        </div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <div style={{ fontSize: 'clamp(4rem, 12vw, 13rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, textShadow: '0px 10px 40px rgba(0,0,0,0.5)' }}>
            <BlurText text="THE CAT GUY" delay={50} />
          </div>
          <div style={{ fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', fontWeight: 600, color: '#a1a1aa', marginTop: '1.5rem', letterSpacing: '-0.02em' }}>
            <BlurText text="Cinematic Video Editor" delay={100} />
          </div>
        </div>
      </section>

      {/* REELS / PROJECTS SECTION (Japanese to English Decipher) */}
      <section id="projects" style={{ width: '100vw', position: 'relative', zIndex: 10, paddingTop: '12vh', paddingBottom: '12vh' }}>
        <div style={{ textAlign: 'center', paddingBottom: '4vh' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
            <TextScramble text="Some of my projects." fromLang="japanese" speed={18} />
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginTop: '1rem', fontWeight: 500 }}>Retention-focused edits. Swipe or click to explore.</p>
        </div>

        {/* Apple Style Smooth Horizontal Side Slider */}
        <div ref={sliderRef} className="apple-slider-container">
          
          <div className="apple-slider-card">
            <div className="apple-slider-left">
              <video src="/reel1.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="apple-slider-right">
              <h3 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 1rem 0' }}>High-Velocity Hooks</h3>
              <p style={{ color: '#a1a1aa', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>Micro-cut editing designed specifically for the algorithm. Fast pacing and aggressive sound design.</p>
              <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' }}>Watch on Instagram ↗</a>
            </div>
          </div>

          <div className="apple-slider-card">
            <div className="apple-slider-left">
              <video src="/reel2.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="apple-slider-right">
              <h3 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Cinematic Atmosphere</h3>
              <p style={{ color: '#a1a1aa', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>Transforming raw footage into a moody, cinematic experience. Advanced color grading nodes mixed with environmental soundscapes.</p>
              <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' }}>Watch on Instagram ↗</a>
            </div>
          </div>

          <div className="apple-slider-card">
            <div className="apple-slider-left">
              <video src="/reel3.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="apple-slider-right">
              <h3 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Seamless Transitions</h3>
              <p style={{ color: '#a1a1aa', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>Fluid movement masking and precision keyframing to make every cut feel invisible and completely natural to the viewer.</p>
              <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' }}>Watch on Instagram ↗</a>
            </div>
          </div>

        </div>

        {/* Navigation Buttons for Slider */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
          <button onClick={() => scrollSlider('left')} className="slider-btn" aria-label="Previous Project">‹</button>
          <button onClick={() => scrollSlider('right')} className="slider-btn" aria-label="Next Project">›</button>
        </div>
      </section>

      {/* PHOTO CARD STACK SECTION (Tamil to English Decipher) */}
      <section id="photos" style={{ width: '100vw', position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '15vh 0' }}>
        <div className="split-container" style={{ display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', alignItems: 'center' }}>
          <div className="split-text" style={{ flex: '1 1 400px', paddingLeft: '5vw', zIndex: 30 }}>
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1 }}>
              <TextScramble text="Card stacks have never looked so good" fromLang="tamil" speed={18} />
            </h2>
            <p style={{ color: '#71717a', fontSize: '1.5rem', marginTop: '1.5rem', fontWeight: 400 }}>
              <TextScramble text="Just look at it go!" fromLang="tamil" speed={18} />
            </p>
          </div>

          <div className="split-cards" style={{ flex: '1 1 700px', display: 'flex', justifyContent: 'center', position: 'relative', height: '600px' }}>
            <CardSwap width={700} height={450} cardDistance={60} verticalDistance={70} delay={3000} skewAmount={6}>
              <Card>
                <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src="/photo1.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Photo 1" />
                </div>
              </Card>
              <Card>
                <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src="/photo2.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Photo 2" />
                </div>
              </Card>
              <Card>
                <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src="/photo3.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Photo 3" />
                </div>
              </Card>
              <Card>
                <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src="/photo4.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Photo 4" />
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* MY STACK SECTION Anchor */}
      <section id="stack" style={{ width: '100vw', height: '100vh', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 900, textAlign: 'center', margin: 0 }}>My Software Stack</h2>
        <p style={{ color: '#a1a1aa', fontSize: '1.3rem', marginTop: '1rem', textAlign: 'center' }}>Click keycaps directly on the 3D keyboard to view details.</p>
      </section>

      {/* WEB DEVELOPMENT SKILLS SECTION (Stacked Terminal Windows with 20s auto-switch) */}
      <section id="webdev" style={{ width: '100vw', backgroundColor: 'rgba(0,0,0,0.85)', position: 'relative', zIndex: 10, padding: '15vh 2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          <span style={{ color: '#EAB308', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Full Stack Capabilities</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, margin: '0.8rem 0 0 0' }}>Web Development Skills</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginTop: '1rem', lineHeight: 1.6 }}>Interactive VS Code terminal workspaces displaying language syntax switching to descriptions every 20 seconds.</p>
        </div>

        {/* Stacked Terminal Windows for All Languages */}
        <TerminalSkillCard />
      </section>

      {/* 3D TUNNEL SHOWCASE FOR VIDEO EDITING & MOTION DESIGN */}
      <EditingShowcaseTunnel />

      {/* FOOTER */}
      <footer style={{ width: '100vw', padding: '10vh 0', backgroundColor: '#000', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '2rem' }}>Ready to cut?</h2>
        <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'block', color: '#EAB308', fontSize: '1.2rem', textDecoration: 'none', marginBottom: '1rem', fontWeight: 600 }}>@thecatguy.editz</a>
      </footer>

    </main>
  );
}