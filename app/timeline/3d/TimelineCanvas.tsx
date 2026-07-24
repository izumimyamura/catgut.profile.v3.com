'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';
import { WORK_TIMELINE, WorkTimelinePoint } from '../constants';

function TimelinePointItem({ point }: { point: WorkTimelinePoint }) {
  const groupRef = useRef<THREE.Group>(null);
  const isLeft = point.position === 'left';
  const textAlign = isLeft ? 'right' : 'left';
  const textX = isLeft ? -0.6 : 0.6;

  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Calculate distance between camera and point for smooth distance fading
      const dist = camera.position.distanceTo(groupRef.current.position);
      const opacity = THREE.MathUtils.clamp(1 - Math.abs(dist - 6) / 10, 0, 1);
      
      groupRef.current.children.forEach((child) => {
        if ('material' in child && child.material) {
          (child.material as THREE.Material).transparent = true;
          (child.material as THREE.Material).opacity = opacity;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={point.point}>
      {/* 3D Wireframe Indicator Box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#EAB308" wireframe />
      </mesh>

      {/* Year (Positioned above title) */}
      <Text
        font="/Vercetti-Regular.woff"
        fontSize={0.3}
        color="#ffffff"
        anchorX={textAlign}
        anchorY="bottom"
        position={[textX, 0.65, 0]}
      >
        {point.year}
      </Text>

      {/* Title (Centered vertically relative to the point) */}
      <Text
        font="/soria-font.ttf"
        fontSize={0.5}
        color="#EAB308"
        maxWidth={3.5}
        anchorX={textAlign}
        anchorY="middle"
        lineHeight={1.1}
        position={[textX, 0.1, 0]}
      >
        {point.title}
      </Text>

      {/* Subtitle (Positioned below title with top anchoring) */}
      <Text
        font="/Vercetti-Regular.woff"
        fontSize={0.2}
        color="#a1a1aa"
        maxWidth={3.5}
        anchorX={textAlign}
        anchorY="top"
        lineHeight={1.3}
        position={[textX, -0.45, 0]}
      >
        {point.subtitle}
      </Text>
    </group>
  );
}

function NativeLine({ points }: { points: THREE.Vector3[] }) {
  const lineObject = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#EAB308', linewidth: 3, transparent: true, opacity: 0.8 });
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

  const curvePoints = useMemo(() => curve.getPoints(300), [curve]);

  useFrame(({ camera }, delta) => {
    if (!scrollData) return;
    const rawVal = scrollData.range(0, 1);
    if (isNaN(rawVal)) return;

    const p = Math.min(Math.max(rawVal, 0), 1);
    const targetPos = curve.getPoint(p);

    if (targetPos && !isNaN(targetPos.x) && !isNaN(targetPos.y) && !isNaN(targetPos.z)) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, 3, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y + 0.5, 3, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z + 6, 3, delta);
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
      <Canvas camera={{ position: [1.5, 0.5, 6], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <ScrollControls pages={6} damping={0.25}>
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