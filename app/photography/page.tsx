'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, Environment } from '@react-three/drei';

/* --- Real-Time Liquid Fluid Trail (Hover Mask Effect) --- */
function LiquidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const points: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      maxAge: number;
      size: number;
    }> = [];

    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const vx = currentX - (lastX || currentX);
      const vy = currentY - (lastY || currentY);

      lastX = currentX;
      lastY = currentY;

      for (let i = 0; i < 2; i++) {
        points.push({
          x: currentX + (Math.random() - 0.5) * 20,
          y: currentY + (Math.random() - 0.5) * 20,
          vx: vx * 0.15 + (Math.random() - 0.5) * 2,
          vy: vy * 0.15 + (Math.random() - 0.5) * 2,
          age: 0,
          maxAge: Math.floor(Math.random() * 30 + 35),
          size: Math.random() * 70 + 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;

        if (p.age > p.maxAge) {
          points.splice(i, 1);
          continue;
        }

        const alpha = Math.sin((p.age / p.maxAge) * Math.PI);
        const currentSize = p.size * (1 - p.age / (p.maxAge * 1.5));

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
        gradient.addColorStop(0.6, `rgba(240, 240, 240, ${alpha * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, currentSize), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 mix-blend-difference"
    />
  );
}

/* --- 3D Phone Model Component --- */
function PhoneModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  // Adjusted scale to 18.5 (smaller) and position to -1.85 (shifted lower)
  return <primitive object={scene} scale={18.5} position={[0, -1.85, 0]} rotation={[0, Math.PI, 0]} />;
}

// Preload GLTF model
useGLTF.preload('/nothing3a.glb');

export default function PhotographyPage() {
  const [loading, setLoading] = useState(true);
  const [glyphMode, setGlyphMode] = useState<'off' | 'all' | 'torch'>('all');
  const counter3Ref = useRef<HTMLDivElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);

  // 1. Fast GSAP Preloader Animation
  useEffect(() => {
    const counter3 = counter3Ref.current;
    if (counter3) {
      counter3.innerHTML = '';
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          const div = document.createElement('div');
          div.className = 'num';
          div.textContent = j.toString();
          counter3.appendChild(div);
        }
      }
      const finalDiv = document.createElement('div');
      finalDiv.className = 'num';
      finalDiv.textContent = '0';
      counter3.appendChild(finalDiv);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      tl.to('.counter-3', { y: -1900, duration: 0.8, ease: 'power2.inOut' })
        .to('.counter-2', { y: -900, duration: 0.8, ease: 'power2.inOut' }, 0)
        .to('.counter-1', { y: -100, duration: 0.4, ease: 'power2.inOut' }, 0.3)
        .to('.digit', { top: '-150px', stagger: 0.04, duration: 0.25, ease: 'power4.inOut' })
        .fromTo('.loader-stem', { width: '0px' }, { width: '120px', duration: 0.5, ease: 'power2.inOut' }, 0)
        .fromTo('.loader-loop', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.25)
        .to('.loader-stem', {
          rotate: 90,
          width: '120px',
          height: '18px',
          x: -25,
          y: 0,
          borderRadius: '4px',
          duration: 0.25,
          ease: 'power3.inOut',
        })
        .to('.loader-loop', {
          x: 20,
          y: -28,
          width: '56px',
          height: '62px',
          borderWidth: '16px',
          borderLeftWidth: '0px',
          borderTopRightRadius: '32px',
          borderBottomRightRadius: '32px',
          opacity: 1,
          duration: 0.25,
          ease: 'power3.inOut',
        }, '<')
        .to('.loading-screen', { opacity: 0, duration: 0.25, ease: 'power1.inOut' }, '+=0.1');
    });

    return () => ctx.revert();
  }, []);

  // 2. 3D Horizontal Inertia Reel Slider
  useEffect(() => {
    if (loading) return;

    let target = 0;
    let current = 0;
    const ease = 0.075;
    let animationFrameId: number;

    const wrapper = sliderWrapperRef.current;
    if (!wrapper) return;

    let maxScroll = Math.max(0, wrapper.offsetWidth - window.innerWidth);

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateScaleAndPosition = () => {
      const slides = wrapper.querySelectorAll<HTMLElement>('.slide-card');
      slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const centerPosition = (rect.left + rect.right) / 2;
        const distanceFromCenter = centerPosition - window.innerWidth / 2;

        let scale: number;
        let offsetX: number;

        if (distanceFromCenter > 0) {
          scale = Math.min(1.4, 1 + distanceFromCenter / window.innerWidth);
          offsetX = (scale - 1) * 150;
        } else {
          scale = Math.max(0.65, 1 - Math.abs(distanceFromCenter) / window.innerWidth);
          offsetX = 0;
        }

        gsap.set(slide, { scale, x: offsetX });
      });
    };

    const update = () => {
      current = lerp(current, target, ease);
      gsap.set(wrapper, { x: -current });
      updateScaleAndPosition();
      animationFrameId = requestAnimationFrame(update);
    };

    const handleWheel = (e: WheelEvent) => {
      target += e.deltaY * 1.5;
      target = Math.max(0, Math.min(maxScroll, target));
    };

    const handleResize = () => {
      maxScroll = Math.max(0, wrapper.offsetWidth - window.innerWidth);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(wrapper);

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('resize', handleResize);
    update();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [loading]);

  return (
    <div className="bg-[#0a0a0a] text-[#e5e5e5] min-h-screen font-mono relative overflow-x-hidden select-none">
      
      {/* 1. GSAP PRELOADER */}
      {loading && (
        <div className="loading-screen fixed inset-0 z-[100] bg-black text-white flex items-center justify-center pointer-events-none">
          <div className="counter absolute bottom-12 left-12 flex h-[100px] text-[100px] leading-none overflow-hidden font-mono">
            <div className="counter-1 digit relative -top-[15px]">
              <div className="num">0</div>
              <div className="num">1</div>
            </div>
            <div className="counter-2 digit relative -top-[15px]">
              <div className="num">0</div>
              <div className="num">1</div>
              <div className="num">2</div>
              <div className="num">3</div>
              <div className="num">4</div>
              <div className="num">5</div>
              <div className="num">6</div>
              <div className="num">7</div>
              <div className="num">8</div>
              <div className="num">9</div>
              <div className="num">0</div>
            </div>
            <div ref={counter3Ref} className="counter-3 digit relative -top-[15px]" />
          </div>

          <div className="relative w-[180px] h-[140px] flex items-center justify-center">
            <div className="loader-stem absolute bg-white h-[18px] w-[120px] rounded-sm" />
            <div className="loader-loop absolute border-white border-solid border-[16px] border-l-0 rounded-r-full" />
          </div>
        </div>
      )}

      {/* 2. NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest mix-blend-difference">
        <a href="/" className="hover:opacity-60 transition-opacity">Home</a>
        <a href="/projects" className="hover:opacity-60 transition-opacity">Projects</a>
        <span className="px-3 py-1 bg-white text-black rounded-full">Photography</span>
        <a href="/timeline" className="hover:opacity-60 transition-opacity">Timeline</a>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative pt-32 pb-12 px-6 max-w-[1400px] mx-auto text-center flex flex-col items-center min-h-screen justify-center overflow-hidden">
        
        {/* Interactive Fluid Distortion Canvas */}
        <LiquidCanvas />

        {/* Heading Text */}
        <div className="mb-4 z-20 pointer-events-none">
          <span className="text-xs uppercase text-red-500 tracking-widest font-bold">
            [ NOTHING PHONE (3A) // GLYPH ENGINE 3.0 ]
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mt-3 uppercase leading-none text-white">
            SHOT ON<br />NOTHING (3A)
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-4 max-w-lg mx-auto font-mono">
            Captured with Dual 50 MP OIS Camera system, custom Monochrome color science, and active Glyph fill light.
          </p>
        </div>

        {/* FLOATING 3D PHONE MODEL (Slightly smaller, moved down) */}
        <div className="w-full max-w-3xl h-[420px] md:h-[480px] relative my-2 z-20 pointer-events-auto flex items-center justify-center bg-transparent">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={glyphMode === 'off' ? 0.6 : glyphMode === 'torch' ? 3.2 : 4.8} />
            <pointLight position={[0, 1, 2]} intensity={glyphMode === 'off' ? 2 : 15} color="#ffffff" />
            <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.25}>
                <PhoneModel path="/nothing3a.glb" />
              </Float>
              <Environment preset="studio" />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>

          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 uppercase tracking-widest bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 pointer-events-none">
            3D INTERACTIVE MODEL // DRAG TO ROTATE
          </span>
        </div>

        {/* Glyph Controls */}
        <div className="flex gap-3 mt-4 z-20">
          <button
            onClick={() => setGlyphMode('all')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all ${
              glyphMode === 'all'
                ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.7)]'
                : 'border-zinc-800 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            FLASH ALL
          </button>
          <button
            onClick={() => setGlyphMode('torch')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all ${
              glyphMode === 'torch'
                ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.7)]'
                : 'border-zinc-800 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            TORCH MODE
          </button>
          <button
            onClick={() => setGlyphMode('off')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border transition-all ${
              glyphMode === 'off'
                ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.7)]'
                : 'border-zinc-800 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            SYSTEM OFF
          </button>
        </div>
      </section>

      {/* 4. NOTHING BENTO SPEC GRID */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 bg-zinc-900/60 rounded-3xl p-8 border border-zinc-800 flex flex-col justify-between min-h-[300px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase text-yellow-500 font-bold">Nothing Phone (3a)</span>
              <span className="text-xs text-zinc-500">50 MP OIS Primary</span>
            </div>
            <div className="my-6">
              <h2 className="text-3xl font-extrabold tracking-tight">TRUE DEPTH SHADOWS</h2>
              <p className="text-zinc-400 text-xs mt-2 max-w-sm">
                Engineered for crisp contrast, raw texture preservation, and accurate exposure under dynamic lighting conditions.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">f/1.88 Aperture</span>
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">114° Ultra-Wide</span>
            </div>
          </div>

          <div className="bg-zinc-900/60 rounded-3xl p-3 border border-zinc-800 aspect-square relative group overflow-hidden">
            <img src="/photo1.jpg" alt="Shot 1" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute bottom-6 left-6 text-[10px] text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full">ISO 100 • 24mm</span>
          </div>

          <div className="bg-zinc-900/60 rounded-3xl p-3 border border-zinc-800 aspect-square relative group overflow-hidden">
            <img src="/photo2.jpg" alt="Shot 2" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute bottom-6 left-6 text-[10px] text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full">Monochrome Portrait</span>
          </div>
        </div>
      </section>

      {/* 5. 3D HORIZONTAL INERTIA SLIDER */}
      <section className="py-16 border-t border-zinc-800">
        <div className="px-12 mb-8 flex justify-between items-end max-w-[1400px] mx-auto">
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest">GALLERY EXHIBIT</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1 uppercase">SCROLL CATALOG</h2>
          </div>
          <p className="text-xs text-zinc-500">USE MOUSE WHEEL TO TRAVERSE ➔</p>
        </div>

        <div className="w-full h-[550px] overflow-hidden relative">
          <div ref={sliderWrapperRef} className="absolute top-0 h-full flex items-center gap-16 px-[400px] w-max">
            {['/photo1.jpg', '/photo2.jpg', '/photo3.jpg', '/photo4.jpg', '/photo1.jpg', '/photo2.jpg', '/photo3.jpg', '/photo4.jpg'].map((src, i) => (
              <div key={i} className="slide-card w-[360px] h-[460px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex-shrink-0">
                <img src={src} alt={`Gallery item ${i}`} className="w-full h-full object-cover grayscale contrast-125" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DARK FOOTER WITH VISIBLE LIGHT-GRAY WATERMARK */}
      <footer className="bg-black text-white pt-24 pb-12 px-8 relative overflow-hidden border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto flex flex-col justify-between min-h-[380px] relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-zinc-800 pb-12 gap-8">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-xl">
              Attribute driven.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm text-zinc-400">
              <div>
                <span className="block text-white font-bold mb-3">Lens</span>
                <p>50 MP Primary OIS</p>
                <p>50 MP Ultra-Wide</p>
              </div>
              <div>
                <span className="block text-white font-bold mb-3">System</span>
                <p>Glyph Interface 3.0</p>
                <p>TrueLens Engine</p>
              </div>
              <div>
                <span className="block text-white font-bold mb-3">Links</span>
                <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" className="block hover:text-white">Instagram ↗</a>
                <a href="/" className="block hover:text-white">Back Home</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-zinc-500 font-mono">
            <span>© CATGUYEDITZ • NOTHING PHONE (3A) GALLERY</span>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="px-4 py-2 rounded-full border border-zinc-800">Skill Hub</span>
              <span className="px-4 py-2 rounded-full border border-zinc-800">Dev Specs</span>
            </div>
          </div>
        </div>

        {/* Light Gray Watermark Text */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none">
          <h1 className="text-[20vw] leading-none font-black text-center text-zinc-600/30 uppercase tracking-tighter whitespace-nowrap translate-y-[22%]">
            HEISENBERGO
          </h1>
        </div>
      </footer>

    </div>
  );
}