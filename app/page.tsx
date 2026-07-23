'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import client components to prevent SSR hydration errors
const Preloader = dynamic(() => import('../components/Preloader'), { ssr: false });
const SideRays = dynamic(() => import('../components/SideRays'), { ssr: false });
const BlurText = dynamic(() => import('../components/BlurText'), { ssr: false });
const CardSwap = dynamic(() => import('../components/CardSwap'), { ssr: false });
const Card = dynamic(() => import('../components/CardSwap').then(mod => mod.Card), { ssr: false });
const KeyboardSection = dynamic(() => import('../components/KeyboardSection'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. Multi-language Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <style dangerouslySetInnerHTML={{__html: `
        .standard-video-card { display: flex; flex-direction: row; width: 100%; max-width: 1200px; margin: 0 auto; background-color: #050505; border: 1px solid rgba(255,255,255,0.08); border-radius: 40px; overflow: hidden; margin-bottom: 4rem; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
        .standard-video-left { flex: 0 0 45%; position: relative; border-right: 1px solid rgba(255,255,255,0.08); }
        .standard-video-right { flex: 1; padding: 4rem; display: flex; flex-direction: column; justify-content: center; }
        
        @media (max-width: 900px) {
          .standard-video-card { flex-direction: column; border-radius: 24px; }
          .standard-video-left { flex: 0 0 400px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .standard-video-right { padding: 2rem; }
          .split-container { flex-direction: column; text-align: center; }
          .split-text { padding: 4rem 2rem 2rem 2rem !important; align-items: center; }
          .split-cards { padding-bottom: 4rem; width: 100%; }
        }
      `}} />

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2.5rem', backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.15em' }}>THE CAT GUY</div>
        <div style={{ display: 'flex', gap: '3rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <a href="#hero" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Home</a>
          <a href="#projects" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Projects</a>
          <a href="#photos" style={{ color: '#e5e5e5', textDecoration: 'none' }}>Photography</a>
          <a href="#stack" style={{ color: '#e5e5e5', textDecoration: 'none' }}>My Stack</a>
          <Link href="https://kavin-portfolio-v2-4mowan065-catguy.vercel.app/#hero" target="_blank" style={{ color: '#EAB308', textDecoration: 'none' }}>Portfolio ↗</Link>
        </div>
        <a href="mailto:kavin123kavinl123@gmail.com" style={{ backgroundColor: '#fff', color: '#000', padding: '0.6rem 1.5rem', borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none' }}>Hire Me</a>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="hero" style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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

      {/* 3. REELS / PROJECTS SECTION */}
      <section id="projects" style={{ width: '100vw', backgroundColor: '#000', position: 'relative', zIndex: 20, paddingTop: '15vh', paddingBottom: '15vh' }}>
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
              <h3 style={{ fontSize: '2.5rem', fontWeight 800, margin: '0 0 1rem 0' }}>Cinematic Atmosphere</h3>
              <p style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>Transforming raw footage into a moody, cinematic experience. Advanced color grading nodes mixed with environmental soundscapes.</p>
              <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight 600, textDecoration: 'none', alignSelf: 'flex-start' }}>Watch on Instagram ↗</a>
            </div>
          </div>

          <div className="standard-video-card">
            <div className="standard-video-left"><video src="/reel3.mp4" autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <div className="standard-video-right">
              <h3 style={{ fontSize: '2.5rem', fontWeight 800, margin: '0 0 1rem 0' }}>Seamless Transitions</h3>
              <p style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>Fluid movement masking and precision keyframing to make every cut feel invisible and completely natural to the viewer.</p>
              <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight 600, textDecoration: 'none', alignSelf: 'flex-start' }}>Watch on Instagram ↗</a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PHOTO CARD STACK SECTION */}
      <section id="photos" style={{ width: '100vw', backgroundColor: '#050505', position: 'relative', zIndex: 20, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '15vh 0' }}>
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

      {/* 5. 3D INTERACTIVE KEYBOARD SECTION (AFTER CARD STACKS) */}
      <KeyboardSection />

      {/* 6. FOOTER */}
      <footer style={{ width: '100vw', padding: '10vh 0', backgroundColor: '#000', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', zIndex: 20 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '2rem' }}>Ready to cut?</h2>
        <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" style={{ display: 'block', color: '#EAB308', fontSize: '1.2rem', textDecoration: 'none', marginBottom: '1rem', fontWeight: 600 }}>@thecatguy.editz</a>
      </footer>

    </main>
  );
}