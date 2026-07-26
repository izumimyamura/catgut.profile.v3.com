'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

/* --- Procedural Meteor Shower Component --- */
function Meteors({ count = 25 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const meteorData = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 80,
      y: Math.random() * 40 + 10,
      z: (Math.random() - 0.5) * 80,
      speed: Math.random() * 0.4 + 0.2,
      length: Math.random() * 2.5 + 1,
    }))
  );

  useFrame(() => {
    if (!meshRef.current) return;
    meteorData.current.forEach((m, i) => {
      m.y -= m.speed;
      m.x -= m.speed * 0.6;

      if (m.y < -30) {
        m.y = Math.random() * 40 + 20;
        m.x = (Math.random() - 0.5) * 80;
      }

      dummy.current.position.set(m.x, m.y, m.z);
      dummy.current.rotation.z = Math.PI / 4;
      dummy.current.scale.set(0.08, m.length, 0.08);
      dummy.current.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.current.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.02, 0.1, 1, 8]} />
      <meshBasicMaterial color="#f87171" transparent opacity={0.8} />
    </instancedMesh>
  );
}

/* --- 3D GLTF Model Viewer --- */
function SpaceModel({ path, scale = 2.8 }: { path: string; scale?: number }) {
  const { scene } = useGLTF(path);
  // Clone scene to avoid shared state across different models
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  return <primitive object={clonedScene} scale={scale} position={[0, -0.2, 0]} />;
}

// Preload models
useGLTF.preload('/galaxy2.glb');
useGLTF.preload('/galaxy.glb');

// Separate model files mapped to each topic
const spaceTopics = [
  {
    id: 'milkyway',
    title: '1. Milky Way',
    modelPath: '/galaxy2.glb', // techinz open source galaxy
    scale: 1.8,
    color: '#f59e0b',
    facts: [
      'Contains over 100 to 400 billion stars.',
      'Spans roughly 100,000 light-years across.',
      'Houses a supermassive black hole named Sagittarius A* at its core.',
    ],
  },
  {
    id: 'galaxy',
    title: '2. Galaxies & Beyond',
    modelPath: '/galaxy.glb', // original particle galaxy model
    scale: 2.8,
    color: '#ef4444',
    facts: [
      'The observable universe contains an estimated 2 trillion galaxies.',
      'Andromeda is our closest major neighbor, colliding with us in ~4.5B years.',
      'Dark Matter makes up about 85% of total matter in the cosmos.',
    ],
  },
];

export default function SpacePage() {
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState(spaceTopics[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. GSAP Preloader Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      tl.fromTo('.space-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('.space-quote', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to('.space-preloader', { opacity: 0, duration: 0.6, delay: 1.0, ease: 'power2.inOut' });
    });

    return () => ctx.revert();
  }, []);

  // 2. Sound Toggle Handler
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch((err) => console.log('Audio playback blocked:', err));
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-mono relative overflow-hidden select-none">
      
      {/* Background Audio Stream */}
      <audio ref={audioRef} src="/space-ambient.mp3" loop preload="auto" />

      {/* 1. CUSTOM SPACE PRELOADER */}
      {loading && (
        <div className="space-preloader fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <h1 className="space-title text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400">
            SPACE
          </h1>
          <p className="space-quote text-zinc-400 text-sm md:text-lg mt-6 max-w-xl font-mono leading-relaxed">
            "Space is like a boundless ocean waiting for us to sail and chart new paths."
          </p>
        </div>
      )}

      {/* 2. NAVIGATION BAR WITH SOUND TOGGLE */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest mix-blend-difference">
        <a href="/" className="hover:opacity-60 transition-opacity">Home</a>
        <a href="/projects" className="hover:opacity-60 transition-opacity">Projects</a>
        <a href="/photography" className="hover:opacity-60 transition-opacity">Photography</a>
        <span className="px-3 py-1 bg-white text-black rounded-full">Space</span>
        <a href="/timeline" className="hover:opacity-60 transition-opacity">Timeline</a>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className="ml-2 px-3 py-1 rounded-full border border-amber-500/50 text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-2 text-[10px]"
        >
          <span>{isPlayingAudio ? '🔊 SOUND ON' : '🔇 SOUND OFF'}</span>
        </button>
      </nav>

      {/* 3. ATMOSPHERIC RED/AMBER BACKGROUND GRADIENT */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(180,83,9,0.18)_0%,_rgba(0,0,0,0.95)_75%)]" />

      {/* 4. FULL-SCREEN 3D CANVAS */}
      <div className="fixed inset-0 z-10 w-full h-full">
        <Canvas camera={{ position: [0, 2.5, 6], fov: 45 }}>
          <ambientLight intensity={2.0} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[0, 0, 0]} intensity={2.0} color="#ffaa00" />

          {/* Red and Amber Starfield Layers */}
          <Stars radius={100} depth={50} count={6000} factor={5} saturation={1} fade speed={1.2} />
          <Stars radius={120} depth={70} count={4000} factor={7} saturation={1} fade speed={1.8} />

          {/* Red Meteors */}
          <Meteors count={25} />

          {/* Floating Model - keyed by ID so canvas properly swaps objects */}
          <Suspense fallback={null}>
            <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.15}>
              <SpaceModel key={activeTopic.id} path={activeTopic.modelPath} scale={activeTopic.scale} />
            </Float>
          </Suspense>

          {/* Orbit Controls */}
          <OrbitControls enableZoom={true} autoRotate={false} enableRotate={true} />
        </Canvas>
      </div>

      {/* 5. OVERLAY CONTENT */}
      <div className="relative z-20 min-h-screen flex flex-col justify-between p-8 md:p-16 pointer-events-none">
        
        {/* Top Information Block */}
        <div className="mt-20 max-w-xl pointer-events-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">[ BOUNDLESS OCEAN ]</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-2" style={{ color: activeTopic.color }}>
            {activeTopic.title}
          </h1>
          <ul className="mt-4 space-y-2 text-xs md:text-sm text-zinc-300 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-amber-500/20 max-w-md font-mono leading-relaxed shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            {activeTopic.facts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Model Selector Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 pointer-events-auto">
          <div className="flex gap-4">
            {spaceTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full border backdrop-blur-md transition-all ${
                  activeTopic.id === topic.id
                    ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-[0_0_25px_rgba(245,158,11,0.7)]'
                    : 'bg-black/50 text-zinc-400 border-zinc-800 hover:border-amber-500/50'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>

          <span className="text-[10px] text-zinc-500 uppercase tracking-widest bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 font-mono">
            3D INTERACTIVE MODEL // DRAG TO ROTATE // SCROLL TO ZOOM
          </span>
        </div>

      </div>

    </div>
  );
}