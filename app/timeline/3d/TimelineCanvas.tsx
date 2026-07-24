'use client';

import React, { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Html } from '@react-three/drei';
import * as THREE from 'three';
import { WORK_TIMELINE, WorkTimelinePoint } from '../constants';

function TimelinePointItem({ point }: { point: WorkTimelinePoint }) {
  const isLeft = point.position === 'left';

  return (
    <group position={point.point}>
      {/* 3D Glowing Wireframe Box */}
      <mesh scale={0.25}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#EAB308" wireframe />
      </mesh>

      {/* HTML Overlay Label (100% crash-proof across all browsers/devices) */}
      <Html
        position={isLeft ? [-0.4, 0, 0] : [0.4, 0, 0]}
        center
        style={{
          pointerEvents: 'none',
          width: '280px',
          textAlign: isLeft ? 'right' : 'left',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ transform: isLeft ? 'translateX(-50%)' : 'translateX(50%)' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.1em',
              display: 'block',
            }}
          >
            {point.year}
          </span>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              color: '#EAB308',
              margin: '0.2rem 0',
              lineHeight: 1.2,
            }}
          >
            {point.title}
          </h3>
          <p
            style={{
              fontSize: '0.8rem',
              color: '#a1a1aa',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {point.subtitle}
          </p>
        </div>
      </Html>
    </group>
  );
}

function NativeLine({ points }: { points: THREE.Vector3[] }) {
  const lineObject = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#EAB308', linewidth: 3 });
    return new THREE.Line(geometry, material);
  }, [points]);

  return <primitive object={lineObject} />;
}

function Track3D() {
  const scrollData = useScroll();
  const timeline = useMemo(() => WORK_TIMELINE, []);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(timeline.map((p) => new THREE.Vector3(...p.point)), false),
    [timeline]
  );

  const curvePoints = useMemo(() => curve.getPoints(200), [curve]);

  useFrame(({ camera }, delta) => {
    if (scrollData) {
      const p = Math.min(Math.max(scrollData.range(0, 1), 0), 1);
      const targetPos = curve.getPoint(p);

      // Smooth camera dampening
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y + 1, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z + 5, 4, delta);
      camera.lookAt(targetPos.x, targetPos.y, targetPos.z - 2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <NativeLine points={curvePoints} />
      {timeline.map((point, i) => (
        <TimelinePointItem key={i} point={point} />
      ))}
    </group>
  );
}

export default function TimelineCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505', position: 'relative', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 1, 6], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <ScrollControls pages={5} damping={0.3}>
          <Track3D />
        </ScrollControls>
      </Canvas>

      {/* Header Overlay */}
      <div style={{ position: 'absolute', top: '2rem', left: '2.5rem', zIndex: 20, pointerEvents: 'none' }}>
        <span style={{ color: '#EAB308', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Career Evolution
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0 0 0' }}>
          My Timeline
        </h1>
      </div>

      {/* Back Button */}
      <a
        href="/"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2.5rem',
          zIndex: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '0.6rem 1.4rem',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none',
          backdropFilter: 'blur(10px)',
        }}
      >
        ← Back Home
      </a>

      {/* Scroll Hint */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: '#71717a', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', pointerEvents: 'none' }}>
        SCROLL TO TRAVERSE TIMELINE
      </div>
    </div>
  );
}