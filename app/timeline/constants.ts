export interface WorkTimelinePoint {
  point: [number, number, number];
  year: string;
  title: string;
  subtitle: string;
  position: 'left' | 'right';
}

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: [0, 0, 0],
    year: '2015',
    title: 'YouTube Gaming Content',
    subtitle: 'Started video editing & content creation for gaming channels',
    position: 'right',
  },
  {
    point: [-4, -4, -3],
    year: '2017',
    title: 'Short Film Editor',
    subtitle: 'Joined narrative productions handling timeline cuts & audio balance',
    position: 'left',
  },
  {
    point: [-3, -1, -6],
    year: '2019',
    title: 'CapCut & Instagram Edits',
    subtitle: 'Mastered CapCut, mobile speed ramping, memes & viral gaming hooks',
    position: 'left',
  },
  {
    point: [0, -1, -10],
    year: '2025',
    title: 'Heisenbergo Studio',
    subtitle: 'Choreographer & Editor for college short films; founded Heisenbergo Studio',
    position: 'right',
  },
  {
    point: [1, 1, -12],
    year: '2026',
    title: 'CATGUYEDITS',
    subtitle: 'Launched official editing firm & CATGUYEDITS under Heisenbergo Studio',
    position: 'right',
  },
];