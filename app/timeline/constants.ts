export interface WorkTimelinePoint {
  point: [number, number, number];
  year: string;
  title: string;
  subtitle: string;
  position: 'left' | 'right';
}

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: [1.5, 0, 0],
    year: '2015',
    title: 'YouTube Gaming Content',
    subtitle: 'Started video editing & content creation for gaming channels',
    position: 'right',
  },
  {
    point: [-2.0, -1.5, -8],
    year: '2017',
    title: 'Short Film Editor',
    subtitle: 'Joined narrative productions handling timeline cuts & audio balance',
    position: 'left',
  },
  {
    point: [2.0, -0.5, -16],
    year: '2019',
    title: 'CapCut & Instagram Edits',
    subtitle: 'Mastered CapCut, mobile speed ramping, memes & viral gaming hooks',
    position: 'right',
  },
  {
    point: [-1.8, 1.0, -24],
    year: '2025',
    title: 'Heisenbergo Studio',
    subtitle: 'Choreographer & Editor for college short films; founded Heisenbergo Studio',
    position: 'left',
  },
  {
    point: [1.8, 0.5, -32],
    year: '2026',
    title: 'CATGUYEDITS',
    subtitle: 'Launched official editing firm & CATGUYEDITS under Heisenbergo Studio',
    position: 'right',
  },
];