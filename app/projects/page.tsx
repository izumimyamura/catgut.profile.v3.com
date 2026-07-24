'use client';

import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* --- Hero Section --- */
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-char', {
        yPercent: 120,
        rotateZ: 10,
        stagger: 0.05,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from('.hero-fade', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const title = "PROJECTS";

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505] text-[#e1e1e1] flex flex-col justify-between p-6 md:p-12">
      <div className="flex justify-between items-start hero-fade pt-16">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-mono uppercase tracking-widest text-yellow-500">
            ( EST. 2026 )
          </div>
          <div className="text-xs font-mono uppercase tracking-wider opacity-60">
            CATGUYEDITS <br />
            <span className="text-white/80">Cinematic Video Production</span>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider opacity-60">Available for edits</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider opacity-40">Heisenbergo Studio</span>
        </div>
      </div>

      <div className="relative mb-8">
        <h1 className="text-[12vw] sm:text-[10vw] font-black tracking-tight text-white leading-none">
          <div className="flex flex-wrap">
            {title.split("").map((char, i) => (
              <span key={i} className="hero-char inline-block origin-bottom">{char}</span>
            ))}
          </div>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between mt-6 border-t border-white/20 pt-6 hero-fade gap-4">
          <p className="text-lg md:text-2xl italic text-gray-300 max-w-2xl">
            "Crafting high-octane cuts, seamless speed ramping, and story-driven cinematic reels."
          </p>
          <div className="flex-shrink-0">
            <span className="inline-block px-8 py-3 border border-yellow-500/50 text-yellow-500 rounded-full uppercase text-xs tracking-widest">
              Scroll To Explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Intro Section --- */
function Intro() {
  return (
    <section className="py-28 bg-[#0a0a0a] text-[#f4f4f4] px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col text-[6vw] md:text-[5vw] leading-tight font-black uppercase tracking-tight">
          <div className="flex flex-wrap items-baseline gap-4">
            <span>We</span>
            <span className="italic font-serif text-gray-400 lowercase font-normal">don't just</span>
            <span>cut</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-4 pl-[4vw]">
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Raw</span>
            <span>Footage.</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-4">
            <span>We</span>
            <span className="italic font-serif text-yellow-500 lowercase font-normal">engineer</span>
            <span>Rhythm.</span>
          </div>
        </div>
        <div className="mt-20 flex justify-end">
          <p className="w-full md:w-1/2 text-lg font-mono text-gray-400 border-l border-yellow-500/40 pl-6">
            In the era of short-form noise, pacing is currency. Every frame is trimmed with surgical precision to maximize retention and emotion.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --- Selected Works (Vertical & Horizontal Video Grid) --- */
const verticalProjects = [
  { id: 1, title: 'Vertical Edit 01', cat: 'Short Form Reel', year: '2026', src: '/project1.mp4' },
  { id: 2, title: 'Vertical Edit 02', cat: 'Speed Ramping', year: '2026', src: '/project2.mp4' },
  { id: 3, title: 'Vertical Edit 03', cat: 'High Retention Cut', year: '2025', src: '/project3.mp4' },
];

const horizontalProjects = [
  { id: 4, title: 'Horizontal Edit 04', cat: 'Cinematic Narrative', year: '2026', src: '/project4.mp4' },
  { id: 5, title: 'Horizontal Edit 05', cat: 'Commercial Promo', year: '2025', src: '/project5.mp4' },
  { id: 6, title: 'Horizontal Edit 06', cat: 'Film Production Cut', year: '2025', src: '/project6.mp4' },
  { id: 7, title: 'Horizontal Edit 07', cat: 'Showcase Feature', year: '2026', src: '/project7.mp4' },
];

function WorkGallery() {
  return (
    <section className="bg-[#050505] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="mb-24 text-center">
          <h2 className="text-[10vw] font-black leading-none uppercase">SELECTED</h2>
          <h2 className="text-[10vw] font-black leading-none uppercase text-transparent" style={{ WebkitTextStroke: '1px #EAB308' }}>
            WORKS
          </h2>
        </div>

        {/* 1. Vertical Videos Section (project1 - project3) */}
        <div className="mb-28">
          <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
            <span className="text-yellow-500 font-mono text-sm tracking-widest font-bold">01 /</span>
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider">Vertical Reels (9:16)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {verticalProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[9/16] bg-zinc-900 mb-4 rounded-xl border border-zinc-800 shadow-2xl">
                  <video
                    src={project.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-end border-b border-zinc-800 pb-3">
                  <div>
                    <h4 className="text-lg font-bold text-yellow-500 flex items-center gap-1">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-yellow-500 transition-colors" />
                    </h4>
                    <span className="text-xs font-mono text-gray-400">{project.cat}</span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Horizontal Videos Section (project4 - project7) */}
        <div>
          <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
            <span className="text-yellow-500 font-mono text-sm tracking-widest font-bold">02 /</span>
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider">Cinematic Widescreen (16:9)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {horizontalProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-video bg-zinc-900 mb-4 rounded-xl border border-zinc-800 shadow-2xl">
                  <video
                    src={project.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-end border-b border-zinc-800 pb-3">
                  <div>
                    <h4 className="text-xl font-bold text-yellow-500 flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" />
                    </h4>
                    <span className="text-xs font-mono text-gray-400">{project.cat}</span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* --- Editing Process --- */
const processSteps = [
  { num: "01", title: "Assembly & Story Cut", desc: "Selecting the best takes, laying down narrative structure, and establishing timing before touch-ups." },
  { num: "02", title: "Rhythm & Speed Ramping", desc: "Blending clips smoothly with keyframe velocity ramps and dynamic whip transitions for high energy." },
  { num: "03", title: "Sound Design & SFX", desc: "Adding layered bass drops, hit impacts, risers, and vocal clarity so audio drives the visual punch." },
  { num: "04", title: "Color Grading & FX", desc: "Custom cinematic LUTs, light leaks, motion blurs, and film grain to unify the aesthetic." },
];

function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#e1e1e1] text-[#050505] px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row mb-16 justify-between items-start md:items-end">
          <h2 className="text-[8vw] font-black leading-none">THE<br />PROCESS</h2>
          <p className="max-w-md text-base mt-4 md:mt-0 font-medium text-zinc-700">
            Our video editing workflow balances narrative discipline with visual impact.
          </p>
        </div>

        <div className="border-t border-black">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="border-b border-black cursor-pointer py-8"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm opacity-50">({step.num})</span>
                  <h3 className="text-2xl md:text-5xl font-bold italic">{step.title}</h3>
                </div>
                {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              </div>

              {openIndex === index && (
                <p className="mt-4 md:pl-16 text-lg text-zinc-800 max-w-2xl leading-relaxed">
                  {step.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Manifesto --- */
const statements = [
  "Editing is invisible storytelling.",
  "Rhythm dictates emotion.",
  "Chaos needs control.",
  "Sound is 50% of visual impact.",
  "Creating timeless edits."
];

function Manifesto() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % statements.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-[70vh] bg-[#050505] text-[#e1e1e1] flex flex-col items-center justify-center px-6 text-center">
      <span className="text-xs font-mono uppercase tracking-widest text-yellow-500 mb-8">( THE MANIFESTO )</span>
      <h2 className="text-3xl md:text-6xl font-black uppercase text-yellow-400 max-w-4xl transition-all duration-500">
        "{statements[index]}"
      </h2>
    </section>
  );
}

/* --- End Marquee --- */
function Marquee() {
  return (
    <div className="py-16 overflow-hidden bg-white text-black border-y border-zinc-300">
      <div className="flex whitespace-nowrap items-center gap-8 justify-center font-black text-4xl md:text-7xl uppercase tracking-tighter">
        <span>•</span>
        <span>DESIGN</span>
        <span>•</span>
        <span>MOTION</span>
        <span>•</span>
        <span>STORY</span>
        <span>•</span>
        <span>CINEMATICS</span>
        <span>•</span>
      </div>
    </div>
  );
}

/* --- Custom Neo-Brutalist Footer --- */
function Footer() {
  return (
    <footer className="bg-[#050505] text-[#e1e1e1] relative overflow-hidden pt-24 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Call to Action Callout */}
        <div className="mb-28 flex flex-col items-center text-center">
          <h3 className="text-[5vw] leading-none mb-6 font-serif italic text-gray-300 font-normal">
            Have an idea?
          </h3>
          <a
            href="mailto:kavin123kavinl123@gmail.com"
            className="text-[8vw] md:text-[10vw] font-black leading-none text-transparent transition-colors duration-300 hover:text-yellow-500"
            style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)' }}
          >
            LET'S TALK
          </a>
        </div>

        {/* Sitemap & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-black tracking-tight block mb-6 text-white uppercase">
              CATGUYEDITZ
            </span>
            <p className="max-w-sm text-gray-400 text-sm leading-relaxed font-mono">
              Cinematic video editing firm under Heisenbergo Studio. Specializing in retention editing, color grading, and high-velocity motion visuals.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-6 font-mono">
              Sitemap
            </h4>
            <ul className="space-y-3 text-gray-400 font-medium">
              {['Projects', 'Process', 'Timeline', 'Services'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-6 font-mono">
              Connect
            </h4>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li>
                <a href="https://www.instagram.com/thecatguy.editz/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-base">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://github.com/izumimyamura" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-base">
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:kavin123kavinl123@gmail.com" className="hover:text-white transition-colors text-base">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits Line */}
        <div className="mt-28 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest border-t border-white/10 pt-8 font-mono">
          <span>© 2026 CATGUYEDITZ • HEISENBERGO STUDIO</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Giant Background Wordmark Watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.04] select-none">
        <h1 className="text-[18vw] leading-[0.75] font-black text-center text-white uppercase tracking-tighter whitespace-nowrap translate-y-[15%]">
          HEISENBERGO STUDIO
        </h1>
      </div>
    </footer>
  );
}

/* --- Main Page Export --- */
export default function ProjectsPage() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e1e1e1]">
      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-6 px-8 bg-black/60 backdrop-blur-md text-white border-b border-white/10">
        <a href="/" className="text-xl font-black tracking-tight text-yellow-500 uppercase">
          THE CAT GUY
        </a>
        <a
          href="/"
          className="px-5 py-2 text-xs font-bold uppercase rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
        >
          ← Home
        </a>
      </header>

      <main className="pt-16">
        <Hero />
        <Intro />
        <WorkGallery />
        <Process />
        <Manifesto />
        <Marquee />
      </main>

      <Footer />
    </div>
  );
}