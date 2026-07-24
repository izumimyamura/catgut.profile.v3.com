'use client';

import dynamic from 'next/dynamic';

const TimelineCanvas = dynamic(() => import('./3d/TimelineCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EAB308', fontFamily: 'monospace' }}>
      LOADING 3D TIMELINE...
    </div>
  ),
});

export default function TimelinePage() {
  return <TimelineCanvas />;
}