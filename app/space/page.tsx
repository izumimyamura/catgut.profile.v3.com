'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, Stars } from '@react-three/drei';
import { gsap } from 'gsap';

// Generic 3D GLTF Model Viewer Component
function SpaceModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={2.5} position={[0, 0, 0]} />;
}

// Data mapping for Celestial Bodies & Facts
const spaceTopics = [
  {
    id: 'milkyway',
    title: '1. Milky Way',
    modelPath: '/milkyway.glb',
    color: '#8b5cf6',
    facts: [
      'Contains over 100 to 400 billion stars.',
      'Spans roughly 100,000 light-years across.',
      'Houses a supermassive black hole named Sagittarius A* at its center.',
    ],
  },
  {
    id: 'blackhole',
    title: '2. Black Hole',
    modelPath: '/blackhole.glb',
    color: '#ec4899',
    facts: [
      'Gravitational pull is so immense that even light cannot escape.',
      'Time significantly slows down near the Event Horizon.',
      'Spaghetti-fication occurs when object tidally stretches near the core.',
    ],
  },
  {
    id: 'saturn',
    title: '3. Saturn',
    modelPath: '/saturn.glb',
    color: '#eab308',
    facts: [
      'Famous for its prominent ring system composed mostly of ice and rock particles.',
      'It is a gas giant with an average density lower than water.',
      'Has over 140 confirmed moons, including Titan and Enceladus.',
    ],
  },
  {
    id: 'galaxy',
    title: '4. Galaxies & Beyond',
    modelPath: '/galaxy.glb',
    color: '#3b82f6',
    facts: [
      'The observable universe contains an estimated 2 trillion galaxies.',
      'Andromeda is our closest major neighbor, colliding with us in ~4.5 billion years.',
      'Dark Matter makes up about 85% of total matter in the cosmos.',
    ],
  },
];

export default function SpacePage() {
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState<typeof spaceTopics[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. GSAP Preloader Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      tl.fromTo('.space-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.space-quote', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to('.space-preloader', { opacity: 0, duration: 0.6, delay: 0.8, ease: 'power2.inOut' });
    });

    return () => ctx.revert();
  }, []);

  // 2. Play Background Audio
  useEffect(() => {
    if (!loading && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handle browser autoplay policy restrictions
        console.log('Autoplay deferred until user interaction');
      });
    }
  }, [loading]);

  return (
    <div className="bg-black text-white min-h-screen font-mono relative overflow-x-hidden select-none">
      
      {/* Background Audio */}
      <audio ref={audioRef} src="/space-ambient.mp3" loop preloader="auto" />

      {/* 1. CUSTOM SPACE PRELOADER */}
      {loading && (
        <div className="space-preloader fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center px-6">
          <h1 className="space-title text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-amber-400">
            SPACE
          </h1>
          <p className="space-quote text-zinc-400 text-sm md:text-lg mt-6 max-w-xl font-mono leading-relaxed">
            "Space is like a boundless ocean waiting for us to sail and chart new paths."
          </p>
        </div>
      )}

      {/* 2. NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest mix-blend-difference">
        <a href="/" className="hover:opacity-60 transition-opacity">Home</a>
        <a href="/projects" className="hover:opacity-60 transition-opacity">Projects</a>
        <a href="/photography" className="hover:opacity-60 transition-opacity">Photography</a>
        <span className="px-3 py-1 bg-white text-black rounded-full">Space</span>
        <a href="/timeline" className="hover:opacity-60 transition-opacity">Timeline</a>
      </nav>

      {/* 3. HERO CONTENT */}
      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto relative z-20">
        <div className="text-center mb-16">
          <span className="text-xs uppercase text-purple-400 font-bold tracking-widest">[ COSMIC EXPLORATION ]</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mt-3 uppercase">COSMIC ARCHIVE</h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-3 max-w-lg mx-auto">
            Click any entry below to inspect facts and load the interactive 3D celestial rendering.
          </p>
        </div>

        {/* FACT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaceTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setActiveTopic(topic)}
              className="group cursor-pointer bg-zinc-950/80 border border-zinc-800 hover:border-zinc-500 p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
            >
              <div>
                <h3 className="text-2xl font-black uppercase mb-4" style={{ color: topic.color }}>
                  {topic.title}
                </h3>
                <ul className="space-y-3 text-xs text-zinc-400 font-mono">
                  {topic.facts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-600">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex justify-between items-center text-[10px] uppercase font-bold text-zinc-500 group-hover:text-white transition-colors">
                <span>INSPECT 3D MODEL</span>
                <span>➔</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. MODAL 3D MODEL VIEWERS */}
      {activeTopic && (
        <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6">
          
          {/* Close Modal Button */}
          <button
            onClick={() => setActiveTopic(null)}
            className="absolute top-8 right-8 z-50 px-5 py-2.5 bg-white text-black text-xs font-bold uppercase rounded-full hover:bg-zinc-200 transition-colors"
          >
            ✕ CLOSE VIEWER
          </button>

          {/* Model Title */}
          <div className="absolute top-8 left-8 z-50">
            <span className="text-xs text-zinc-500 uppercase font-mono">ACTIVE MODEL</span>
            <h2 className="text-3xl font-black uppercase mt-1" style={{ color: activeTopic.color }}>
              {activeTopic.title}
            </h2>
          </div>

          {/* 3D Canvas */}
          <div className="w-full h-[70vh] max-w-5xl relative">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <SpaceModel path={activeTopic.modelPath} />
                </Float>
              </Suspense>
              <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
            </Canvas>
          </div>

          <span className="text-xs text-zinc-500 uppercase tracking-widest mt-4 font-mono">
            3D INTERACTIVE MODEL // DRAG TO ROTATE // SCROLL TO ZOOM
          </span>
        </div>
      )}

    </div>
  );
}
