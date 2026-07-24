'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const TimelineCanvas = dynamic(() => import('./3d/TimelineCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EAB308', fontFamily: 'monospace', fontWeight: 'bold' }}>
      LOADING 3D TIMELINE...
    </div>
  ),
});

export default function TimelinePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EAB308', fontFamily: 'monospace' }}>
        INITIALIZING WEBGL...
      </div>
    );
  }

  return <TimelineCanvas />;
}