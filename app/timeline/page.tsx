'use client';

import dynamic from 'next/dynamic';

const TimelineCanvas = dynamic(() => import('./3d/TimelineCanvas'), { ssr: false });

export default function TimelinePage() {
  return <TimelineCanvas />;
}