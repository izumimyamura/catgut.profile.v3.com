'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function PhotographyPage() {
  const [loading, setLoading] = useState(true);
  const counter3Ref = useRef<HTMLDivElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);

  // Preloader Logic
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

      tl.to('.counter-3', { y: -1900, duration: 2.5, ease: 'power2.inOut' })
        .to('.counter-2', { y: -900, duration: 2.5, ease: 'power2.inOut' }, 0)
        .to('.counter-1', { y: -100, duration: 1, ease: 'power2.inOut' }, 1.5)
        .to('.digit', { top: '-150px', stagger: 0.1, duration: 0.6, ease: 'power4.inOut' })
        .from('.loader-1', { width: 0, duration: 1.5, ease: 'power2.inOut' }, 0)
        .from('.loader-2', { width: 0, duration: 1, ease: 'power2.inOut' }, 0.5)
        // Transition bars to form "P" shape
        .to('.loader-1', { rotate: 90, y: -30, x: -20, duration: 0.5 })
        .to('.loader-2', { x: 30, y: -10, borderRadius: '50%', duration: 0.5 }, '<')
        .to('.loading-screen', { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, '+=0.2');
    });

    return () => ctx.revert();
  }, []);

  // Slider Wheel & Inertia Animation
  useEffect(() => {
    if (loading) return;

    let target = 0;
    let current = 0;
    const ease = 0.075;
    let animationFrameId: number;

    const wrapper = sliderWrapperRef.current;
    if (!wrapper) return;

    const slides = wrapper.querySelectorAll<HTMLElement>('.slide-card');
    let maxScroll = wrapper.offsetWidth - window.innerWidth;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateScaleAndPosition = () => {
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
      maxScroll = wrapper.offsetWidth - window.innerWidth;
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('resize', handleResize);
    update();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loading]);

  return (
    <div className="bg-[#e5e5e5] text-[#111] min-h-screen font-sans relative overflow-x-hidden">
      
      {/* 1. PRELOADER INTRO */}
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

          {/* Loader bar forming P */}
          <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[40px] flex bg-zinc-800">
            <div className="loader-1 bg-white w-[160px] h-full" />
            <div className="loader-2 bg-white w-[80px] h-full" />
          </div>
        </div>
      )}

      {/* 2. NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full border border-black/10 shadow-lg text-xs font-semibold uppercase tracking-wider">
        <a href="/" className="hover:opacity-60 transition-opacity">Home</a>
        <a href="/projects" className="hover:opacity-60 transition-opacity">Projects</a>
        <span className="px-3 py-1 bg-black text-white rounded-full">Photography</span>
        <a href="/timeline" className="hover:opacity-60 transition-opacity">Timeline</a>
      </nav>

      {/* 3. NOTHING PHONE BENTO GRID HERO */}
      <section className="pt-28 pb-16 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Main Hero Card */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-black/5 shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[380px]">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono uppercase bg-zinc-100 px-3 py-1 rounded-full">Nothing Phone (2a)</span>
              <span className="text-xs font-mono text-zinc-400">50 MP OIS Camera</span>
            </div>
            <div className="my-8">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                RAW SHOTS.<br />PURE LIGHT.
              </h1>
              <p className="text-zinc-500 text-sm mt-3 max-w-sm">
                Captured on Nothing Phone with custom color science, true depth shadows, and minimal post-processing.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-zinc-100 rounded-full text-xs font-mono">f/1.88 Aperture</span>
              <span className="px-4 py-2 bg-zinc-100 rounded-full text-xs font-mono">114° Ultra-Wide</span>
            </div>
          </div>

          {/* Sample Photo Card 1 */}
          <div className="bg-white rounded-3xl p-3 border border-black/5 shadow-sm overflow-hidden aspect-square relative group">
            <img src="/photo1.jpg" alt="Shot 1" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute bottom-6 left-6 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-mono">ISO 100 • 24mm</span>
          </div>

          {/* Sample Photo Card 2 */}
          <div className="bg-white rounded-3xl p-3 border border-black/5 shadow-sm overflow-hidden aspect-square relative group">
            <img src="/photo2.jpg" alt="Shot 2" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute bottom-6 left-6 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-mono">Portrait Mode</span>
          </div>

        </div>
      </section>

      {/* 4. HORIZONTAL INERTIA SLIDER */}
      <section className="py-12 border-t border-black/10">
        <div className="px-12 mb-8 flex justify-between items-end">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">GALLERY EXHIBIT</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1 uppercase">SCROLL CATALOG</h2>
          </div>
          <p className="text-xs font-mono text-zinc-500">USE MOUSE WHEEL TO TRAVERSE ➔</p>
        </div>

        <div className="w-full h-[550px] overflow-hidden relative">
          <div ref={sliderWrapperRef} className="absolute top-0 h-full flex items-center gap-16 px-[400px] w-max">
            {['/photo1.jpg', '/photo2.jpg', '/photo3.jpg', '/photo4.jpg', '/photo1.jpg', '/photo2.jpg', '/photo3.jpg', '/photo4.jpg'].map((src, i) => (
              <div key={i} className="slide-card w-[360px] h-[460px] bg-zinc-200 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
                <img src={src} alt={`Gallery item ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FIDDLE-STYLE DARK FOOTER */}
      <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 px-8 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col justify-between min-h-[400px] relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-12 gap-8">
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
                <span className="block text-white font-bold mb-3">Modes</span>
                <p>Night Mode</p>
                <p>Action Mode</p>
              </div>
              <div>
                <span className="block text-white font-bold mb-3">Links</span>
                <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noreferrer" className="block hover:text-white">Instagram ↗</a>
                <a href="/" className="block hover:text-white">Back Home</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-zinc-500 font-mono">
            <span>© CATGUYEDITZ • NOTHING PHONE GALLERY</span>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="px-4 py-2 rounded-full border border-white/10">Skill Hub</span>
              <span className="px-4 py-2 rounded-full border border-white/10">Dev Specs</span>
            </div>
          </div>
        </div>

        {/* Inverted Watermark */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.05] select-none">
          <h1 className="text-[20vw] leading-none font-black text-center text-white uppercase tracking-tighter whitespace-nowrap translate-y-[20%]">
            HEISENBERGO
          </h1>
        </div>
      </footer>

    </div>
  );
}