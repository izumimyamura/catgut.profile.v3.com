'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Preloader = dynamic(() => import('../components/Preloader'), { ssr: false });
const SideRays = dynamic(() => import('../components/SideRays'), { ssr: false });
const BlurText = dynamic(() => import('../components/BlurText'), { ssr: false });
const CardSwap = dynamic(() => import('../components/CardSwap'), { ssr: false });
const Card = dynamic(() => import('../components/CardSwap').then(mod => mod.Card), { ssr: false });
const AnimatedBackground = dynamic(() => import('../components/AnimatedBackground'), { ssr: false });
const TerminalSkillCard = dynamic(() => import('../components/TerminalSkillCard'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Fixed 3D Keyboard Background Layer */}
      <AnimatedBackground onLoaded={() => setLoading(false)} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .standard-video-card { display: flex; flex-direction: row; width: 100%; max-width: 1200px; margin: 0 auto; background-color: #050505; border: 1px solid rgba(255,255,255,0.08); border-radius: 40px; overflow: hidden; margin-bottom: 4rem; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        .standard-video-left { flex: 0 0 45%; position: relative; border-right: 1px solid rgba(255,255,255,0.08); }
        .standard-video-right { flex: 1; padding: 4rem; display: flex; flex-direction: column; justify-content: center; }
        
        .software-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: 3rem auto 0 auto; padding: 0 2rem; }
        .software-card { background: rgba(15, 15, 15, 0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 2rem; text-align: center; backdrop-filter: blur(10px); }

        .terminal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 2.5rem; max-width: 1250px; margin: 3.5rem auto 0 auto; padding: 0 2rem; }

        @media (max-width: 900px) {
          .standard-video-card { flex-direction: column; border-radius: 24px; }
          .standard-video-left { flex: 0 0 400px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .standard-video-right { padding: 2rem; }
          .terminal-grid { grid-template-columns: 1fr; }
          .split-container { flex-direction: column; text-align: center; }
          .split-text { padding: 4rem 2rem 2rem 2rem !important; align-items: center; }
          .split-cards { padding-bottom: 4rem; width: 100%; }
        }
      `}} />

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2.5rem', backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.15em' }}>THE CAT GUY</div>
        <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <a href="#hero" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Home</a>
          <a href="#editing-tools" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Editing Suite</a>
          <a href="#projects" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Reels</a>
          <a href="#photos" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Photography</a>
          <a href="#stack" style={{ color: '#e5e5e5', textDecoration: 'none' }}>3D Stack</a>
          <a href="#webdev" style={{ color: '#EAB308', textDecoration: 'none' }}>Web Dev</a>
        </div>
        <a href="mailto:kavin123kavinl123@gmail.com" style={{ backgroundColor: '#fff', color: '#000', padding: '0.6rem 1.5rem', borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>Hire Me</a>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="hero" style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, backgroundColor: '#000' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <SideRays speed={2.5} rayColor1="#EAB308" rayColor2="#96c8ff" intensity={3.0} spread={2.5} origin="top-right" />
        </div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <div style={{ fontSize: 'clamp(3.5rem, 10vw, 11rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, textShadow: '0px 10px 40px rgba(0,0,0,0.5)' }}>
            <BlurText text="THE CAT GUY" delay={50} />
          </div>
          <div style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', fontWeight: 600, color: '#a1a1aa', marginTop: '1.5rem', letterSpacing: '-0.02em' }}>
            <BlurText text="Cinematic Video & Motion Designer" delay={100} />
          </div>
        </div>
      </section>

      {/* 2. VIDEO EDITING SOFTWARE SHOWCASE */}
      <section id="editing-tools" style={{ width: '100vw', backgroundColor: '#000', position: 'relative', zIndex: 10, padding: '10vh 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#EAB308', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Core Editing Toolkit</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, margin: '0.8rem 0 0 0' }}>Video & Motion Design Suite</h2>
        </div>

        <div className="software-grid">
          <div className="software-card">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#EAB308', marginBottom: '0.5rem' }}>Adobe After Effects</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Advanced motion graphics, custom kinetic typography, visual effects, and expressions.</p>
          </div>
          <div className="software-card">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#EAB308', marginBottom: '0.5rem' }}>DaVinci Resolve</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>High-end node-based color grading, LUT mapping, cinematic atmosphere, and Fairlight audio design.</p>
          </div>
          <div className="software-card">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#EAB308', marginBottom: '0.5rem' }}>Adobe Premiere Pro</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Non-linear timeline editing, multi-cam sync, retention-focused pacing, and fast-cut social edits.</p>
          </div>
          <div className="software-card">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#EAB308', marginBottom: '0.5rem' }}>Apple Motion</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>Streamlined Mac vector animation, 3D titles, and real-time generator templates.</p>
          </div>
        </div>
      </section>

      {/* 3. REELS / VIDEO PROJECTS SECTION */}
      <section id="projects" style={{ width: '100vw', backgroundColor: '#000', position: 'relative', zIndex: 10, paddingTop: '12vh', paddingBottom: '12vh' }}>
        <div style={{ textAlign: 'center', paddingBottom: '8vh' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>Some of my projects.</h2>
          <p style={{ color: '#a1a1aa', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', marginTop: '1rem', fontWeight: 500 }}>Retention-focused edits. Proof in the pacing.</p>
        </div>

        <div style={{ padding: '0 2rem' }}>
          <div className="standard-video-card">
            <div className="standard-video-left"><video src="/reel1.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="standard-video-right">
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>High-Velocity Hooks</h3>
              <p style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>Micro-cut editing designed specifically for the algorithm. Fast pacing and aggressive sound design.</p>
              <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' }}>Watch on Instagram ↗</a>
            </div>
          </div>

          <div className="standard-video-card">
            <div className="standard-video-left"><video src="/reel2.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="standard-video-right">
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Cinematic Atmosphere</h3>
              <p style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>Transforming raw footage into a moody, cinematic experience. Advanced color grading nodes mixed with environmental soundscapes.</p>
              <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' }}>Watch on Instagram ↗</a>
            </div>
          </div>

          <div className="standard-video-card">
            <div className="standard-video-left"><video src="/reel3.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="standard-video-right">
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Seamless Transitions</h3>
              <p style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>Fluid movement masking and precision keyframing to make every cut feel invisible and completely natural to the viewer.</p>
              <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' }}>Watch on Instagram ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHOTO CARD STACK SECTION */}
      <section id="photos" style={{ width: '100vw', backgroundColor: '#000', position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '15vh 0' }}>
        <div className="split-container" style={{ display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', alignItems: 'center' }}>
          <div className="split-text" style={{ flex: '1 1 400px', paddingLeft: '5vw', zIndex: 30 }}>
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1 }}>
              Card stacks have never looked so good
            </h2>
            <p style={{ color: '#71717a', fontSize: '1.5rem', marginTop: '1.5rem', fontWeight: 400 }}>
              Just look at it go!
            </p>
          </div>

          <div className="split-cards" style={{ flex: '1 1 700px', display: 'flex', justifyContent: 'center', position: 'relative', height: '600px' }}>
            <div style={{ position: 'relative', transform: 'translateX(-10%)' }}>
              <CardSwap width={700} height={450} cardDistance={60} verticalDistance={70} delay={3000} skewAmount={6} easing="power1.inOut">
                <Card>
                  <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                    <img src="/photo1.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Photo 1" />
                    <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', color: '#fff' }}>&lt;/&gt;</span><span style={{ fontSize: '1rem', color: '#e5e5e5' }}>Reliable</span>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                    <img src="/photo2.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Photo 2" />
                    <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fff' }}></span><span style={{ fontSize: '1rem', color: '#e5e5e5' }}>Smooth</span>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                    <img src="/photo3.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Photo 3" />
                    <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', color: '#fff' }}>⚙</span><span style={{ fontSize: '1rem', color: '#e5e5e5' }}>Customizable</span>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                    <img src="/photo4.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Photo 4" />
                    <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', color: '#EAB308' }}>✦</span><span style={{ fontSize: '1rem', color: '#e5e5e5' }}>Cinematic</span>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MY SOFTWARE STACK SECTION (3D Keyboard Starts Here) */}
      <section id="stack" style={{ width: '100vw', height: '100vh', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, textAlign: 'center', margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
          My Software Stack
        </h2>
        <p style={{ color: '#a1a1aa', fontSize: '1.3rem', marginTop: '1rem', textAlign: 'center' }}>
          Interactive 3D Keyboard — Click keycaps to inspect editing software.
        </p>
      </section>

      {/* 6. WEB DEVELOPMENT SKILLS SECTION (VS Code Terminal Cards) */}
      <section id="webdev" style={{ width: '100vw', backgroundColor: 'rgba(0,0,0,0.88)', position: 'relative', zIndex: 10, padding: '15vh 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#EAB308', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Full Stack Capabilities</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, margin: '0.8rem 0 0 0' }}>Web Development Skills</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginTop: '1rem', lineHeight: 1.6 }}>Interactive terminals displaying live code syntax switching to descriptions every 10s.</p>
        </div>

        <div className="terminal-grid">
          <TerminalSkillCard
            title="HTML5 & Modern CSS"
            filename="layout.styles.css"
            language="CSS3 & HTML5"
            codeSnippet={`/* Responsive Fluid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}`}
            description="Clean semantic markups, CSS Grid & Flexbox architecture, fluid typography, and custom responsive layouts."
          />

          <TerminalSkillCard
            title="JavaScript & TypeScript"
            filename="state.manager.ts"
            language="TypeScript"
            codeSnippet={`interface DeveloperSkills {
  languages: string[];
  typeSafe: boolean;
}

const catGuy: DeveloperSkills = {
  languages: ["JavaScript", "TypeScript", "Python"],
  typeSafe: true
};`}
            description="Strong ES6+ fundamentals, DOM manipulation, state management, asynchronous data fetching, and type-safe codebases."
          />

          <TerminalSkillCard
            title="React & Next.js"
            filename="App.tsx"
            language="React / Next.js"
            codeSnippet={`export default function Portfolio() {
  return (
    <React.Suspense fallback={<Preloader />}>
      <Animated3DCanvas />
    </React.Suspense>
  );
}`}
            description="Building modern server-rendered applications, dynamic routing, component reusability, and WebGL 3D canvas integrations."
          />

          <TerminalSkillCard
            title="Tailwind CSS & Animations"
            filename="animations.config.js"
            language="Tailwind & GSAP"
            codeSnippet={`gsap.to(".keyboard", {
  scrollTrigger: { scrub: 1 },
  rotationY: Math.PI * 4,
  ease: "power2.out"
});`}
            description="Utility-first styling mixed with GSAP, Framer Motion, and Smooth Scroll engines for immersive user experiences."
          />
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer style={{ width: '100vw', padding: '10vh 0', backgroundColor: '#000', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '2rem' }}>Ready to cut?</h2>
        <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'block', color: '#EAB308', fontSize: '1.2rem', textDecoration: 'none', marginBottom: '1rem', fontWeight: 600 }}>@thecatguy.editz</a>
      </footer>

    </main>
  );
}