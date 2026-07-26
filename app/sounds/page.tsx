'use client';

import React, { useState, useEffect, useRef } from 'react';

// Your 5 custom video/audio tracks placed in /public
const tracks = [
  { id: 'song1', title: 'Track 01', src: '/song1.mp4' },
  { id: 'song2', title: 'Track 02', src: '/song2.mp4' },
  { id: 'song3', title: 'Track 03', src: '/song3.mp4' },
  { id: 'song4', title: 'Track 04', src: '/song4.mp4' },
  { id: 'song5', title: 'Track 05', src: '/song5.mp4' },
];

export default function SoundsPage() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [powerMain, setPowerMain] = useState(true);
  const [speedMode, setSpeedMode] = useState<'fast' | 'slow' | 'auto'>('fast');

  // Audio Processing Parameters
  const [level, setLevel] = useState(80);
  const [width, setWidth] = useState(50);
  const [eqLow, setEqLow] = useState(0);
  const [eqMid, setEqMid] = useState(0);
  const [eqHigh, setEqHigh] = useState(0);
  const [eqAir, setEqAir] = useState(0);
  const [drive, setDrive] = useState(20);
  const [output, setOutput] = useState(80);
  const [bias, setBias] = useState(30);
  const [tone, setTone] = useState(50);
  const [mix, setMix] = useState(100);

  // Web Audio Node References
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lowFilterRef = useRef<BiquadFilterNode | null>(null);
  const midFilterRef = useRef<BiquadFilterNode | null>(null);
  const highFilterRef = useRef<BiquadFilterNode | null>(null);
  const airFilterRef = useRef<BiquadFilterNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize Web Audio API Pipeline
  const initAudioCtx = () => {
    if (audioCtxRef.current) return;

    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioCtxRef.current = ctx;

    if (!mediaRef.current) return;
    const source = ctx.createMediaElementSource(mediaRef.current);

    const low = ctx.createBiquadFilter();
    low.type = 'lowshelf';
    low.frequency.value = 250;

    const mid = ctx.createBiquadFilter();
    mid.type = 'peaking';
    mid.frequency.value = 1000;
    mid.Q.value = 1;

    const high = ctx.createBiquadFilter();
    high.type = 'highshelf';
    high.frequency.value = 4000;

    const air = ctx.createBiquadFilter();
    air.type = 'highshelf';
    air.frequency.value = 10000;

    const masterGain = ctx.createGain();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;

    source.connect(low);
    low.connect(mid);
    mid.connect(high);
    high.connect(air);
    air.connect(masterGain);
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    lowFilterRef.current = low;
    midFilterRef.current = mid;
    highFilterRef.current = high;
    airFilterRef.current = air;
    gainNodeRef.current = masterGain;
    analyserRef.current = analyser;
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!mediaRef.current) return;
    initAudioCtx();

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      mediaRef.current.pause();
      setIsPlaying(false);
    } else {
      mediaRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay blocked:', err));
    }
  };

  // Switch Track Handler
  const switchTrack = (index: number) => {
    const wasPlaying = isPlaying;
    setCurrentTrackIndex(index);
    
    setTimeout(() => {
      if (mediaRef.current) {
        mediaRef.current.currentTime = 0;
        if (wasPlaying) {
          mediaRef.current.play().then(() => setIsPlaying(true));
        }
      }
    }, 50);
  };

  // Synchronize Audio Filter Values
  useEffect(() => {
    if (lowFilterRef.current) lowFilterRef.current.gain.value = powerMain ? eqLow : 0;
    if (midFilterRef.current) midFilterRef.current.gain.value = powerMain ? eqMid : 0;
    if (highFilterRef.current) highFilterRef.current.gain.value = powerMain ? eqHigh : 0;
    if (airFilterRef.current) airFilterRef.current.gain.value = powerMain ? eqAir : 0;
    if (gainNodeRef.current) gainNodeRef.current.gain.value = powerMain ? (level / 100) * (output / 100) : 0;
  }, [eqLow, eqMid, eqHigh, eqAir, level, output, powerMain]);

  // Real-time Visualizer Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(120, 120, 120, 0.2)';
      ctx.lineWidth = 1;

      // dB horizontal lines
      [20, 50, 80, 110].forEach((y) => {
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      });

      // Frequency vertical lines
      [60, 120, 180, 240].forEach((x) => {
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      });

      if (analyserRef.current && isPlaying && powerMain) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Fill background curve
        ctx.fillStyle = 'rgba(180, 180, 180, 0.25)';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let i = 0; i < bufferLength; i++) {
          const x = (i / bufferLength) * canvas.width;
          const y = canvas.height - (dataArray[i] / 255) * (canvas.height - 20);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Red active frequency curve
        ctx.setLineDash([]);
        ctx.strokeStyle = '#e04f33';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        for (let i = 0; i < bufferLength; i++) {
          const x = (i / bufferLength) * canvas.width;
          const eqBoost = ((i < 8 ? eqLow : i < 32 ? eqMid : i < 80 ? eqHigh : eqAir) / 12) * 15;
          const y = Math.max(10, Math.min(canvas.height - 10, 50 - (dataArray[i] / 255) * 35 - eqBoost));
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else {
        ctx.setLineDash([]);
        ctx.strokeStyle = '#e04f33';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 50);
        ctx.lineTo(canvas.width, 50);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, powerMain, eqLow, eqMid, eqHigh, eqAir]);

  // Rotatable Knob Sub-component
  const Knob = ({
    label,
    value,
    min = 0,
    max = 100,
    onChange,
    size = 'md',
  }: {
    label: string;
    value: number;
    min?: number;
    max?: number;
    onChange: (val: number) => void;
    size?: 'sm' | 'md' | 'lg';
  }) => {
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startVal = useRef(value);

    const rotation = ((value - min) / (max - min)) * 270 - 135;

    const handleMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true;
      startY.current = e.clientY;
      startVal.current = value;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaY = startY.current - e.clientY;
      const range = max - min;
      const newVal = Math.min(max, Math.max(min, startVal.current + (deltaY / 100) * range));
      onChange(Math.round(newVal));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    const dimension = size === 'lg' ? 'w-24 h-24' : size === 'md' ? 'w-16 h-16' : 'w-12 h-12';

    return (
      <div className="flex flex-col items-center select-none cursor-ns-resize">
        <div
          onMouseDown={handleMouseDown}
          className={`${dimension} rounded-full bg-gradient-to-b from-[#f2f2f2] to-[#d6d6d6] border border-[#c4c4c4] shadow-[4px_6px_15px_rgba(0,0,0,0.12),-4px_-4px_10px_rgba(255,255,255,0.9),inset_0_2px_2px_rgba(255,255,255,0.8)] relative flex items-center justify-center transition-transform active:scale-95`}
        >
          <div className="w-full h-full rounded-full relative" style={{ transform: `rotate(${rotation}deg)` }}>
            <div className="w-1.5 h-1.5 bg-[#222] rounded-full absolute top-2 left-1/2 -translate-x-1/2" />
          </div>
        </div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-600 mt-3">{label}</span>
      </div>
    );
  };

  return (
    <div className="bg-[#e4e4e6] text-zinc-800 min-h-screen font-sans relative overflow-x-hidden select-none flex flex-col items-center justify-center py-20 px-4">
      
      {/* Active Video/Audio Media Player */}
      <video
        ref={mediaRef}
        src={tracks[currentTrackIndex].src}
        loop
        playsInline
        className="hidden"
      />

      {/* NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 bg-zinc-900/90 text-white backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest shadow-2xl">
        <a href="/" className="hover:opacity-60 transition-opacity">Home</a>
        <a href="/projects" className="hover:opacity-60 transition-opacity">Projects</a>
        <a href="/photography" className="hover:opacity-60 transition-opacity">Photography</a>
        <a href="/space" className="hover:opacity-60 transition-opacity">Space</a>
        <a href="/timeline" className="hover:opacity-60 transition-opacity">Timeline</a>
        <span className="px-3 py-1 bg-white text-black rounded-full">Sounds</span>
      </nav>

      {/* APPLE-STYLE ANIMATED TRACK SELECTOR */}
      <div className="w-full max-w-4xl mb-8 mt-12 flex flex-col items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">[ SELECT TRACK ]</span>
        <div className="flex gap-4 overflow-x-auto p-2 scrollbar-none w-full justify-center">
          {tracks.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => switchTrack(idx)}
              className={`px-6 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 transform backdrop-blur-md border ${
                currentTrackIndex === idx
                  ? 'bg-zinc-900 text-white border-zinc-900 scale-105 shadow-xl shadow-zinc-900/20'
                  : 'bg-white/60 text-zinc-600 border-zinc-300 hover:bg-white hover:scale-102'
              }`}
            >
              {track.title}
            </button>
          ))}
        </div>
      </div>

      {/* AUDIO PLUGIN INTERFACE RACK */}
      <div className="w-full max-w-5xl bg-[#ececed] p-8 md:p-12 rounded-[40px] border border-white/80 shadow-[20px_20px_60px_rgba(0,0,0,0.12),-20px_-20px_60px_rgba(255,255,255,0.9)] grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        
        {/* Play/Pause Control Switch */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={togglePlay}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg transition-all ${
              isPlaying ? 'bg-[#e04f33] text-white shadow-red-500/30' : 'bg-zinc-900 text-white hover:bg-black'
            }`}
          >
            {isPlaying ? '⏸ PAUSE AUDIO' : '▶ PLAY SOUND ENGINE'}
          </button>
        </div>

        {/* --- LEFT PANEL --- */}
        <div className="bg-[#f0f0f2] rounded-3xl p-6 border border-white/70 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),4px_6px_15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between min-h-[460px]">
          <button
            onClick={() => setPowerMain(!powerMain)}
            className={`w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center transition-all ${
              powerMain ? 'shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15)] text-[#e04f33]' : 'text-zinc-400'
            }`}
          >
            ⏻
          </button>

          <div className="flex flex-col items-center gap-8 my-auto">
            <Knob label="LEVEL" value={level} onChange={setLevel} size="lg" />
            <Knob label="WIDTH" value={width} onChange={setWidth} size="md" />
          </div>

          <div className="w-full flex items-center justify-between pt-4 border-t border-zinc-300/60">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">ADV</span>
            <div className="w-10 h-5 bg-zinc-300 rounded-full p-0.5 cursor-pointer shadow-inner">
              <div className="w-4 h-4 bg-zinc-800 rounded-full transition-transform translate-x-5" />
            </div>
          </div>
        </div>

        {/* --- CENTER PANEL (GRAPH & EQ SLIDERS) --- */}
        <div className="bg-[#f0f0f2] rounded-3xl p-6 border border-white/70 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),4px_6px_15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between min-h-[460px]">
          <button
            onClick={() => setPowerMain(!powerMain)}
            className={`w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center transition-all ${
              powerMain ? 'shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15)] text-[#e04f33]' : 'text-zinc-400'
            }`}
          >
            ⏻
          </button>

          <div className="w-full bg-[#dcdcdc] rounded-2xl p-2 border border-zinc-300 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12)] relative overflow-hidden my-4">
            <canvas ref={canvasRef} width={280} height={130} className="w-full h-[130px] rounded-lg" />
            <span className="absolute top-2 left-3 text-[9px] font-bold text-zinc-500">+12</span>
            <span className="absolute top-1/2 -translate-y-1/2 left-3 text-[9px] font-bold text-zinc-500">0</span>
            <span className="absolute bottom-6 left-3 text-[9px] font-bold text-zinc-500">-12</span>
            <span className="absolute bottom-2 left-3 text-[9px] font-bold text-zinc-500">-24</span>

            <div className="w-full flex justify-between px-6 absolute bottom-1 left-0 text-[8px] font-bold text-zinc-500">
              <span>100Hz</span>
              <span>500Hz</span>
              <span>2kHz</span>
              <span>10kHz</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 w-full px-2 my-2">
            {[
              { label: 'Low', val: eqLow, set: setEqLow },
              { label: 'Mid', val: eqMid, set: setEqMid },
              { label: 'High', val: eqHigh, set: setEqHigh },
              { label: 'Air', val: eqAir, set: setEqAir },
            ].map((fader, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="h-28 w-2 bg-zinc-300 rounded-full relative flex items-center justify-center shadow-inner">
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    value={fader.val}
                    onChange={(e) => fader.set(Number(e.target.value))}
                    className="absolute w-28 h-8 opacity-0 cursor-pointer -rotate-90"
                  />
                  <div
                    className="w-6 h-3 bg-gradient-to-b from-white to-zinc-300 rounded border border-zinc-400 shadow-md absolute pointer-events-none transition-all"
                    style={{ bottom: `${((fader.val + 12) / 24) * 80}%` }}
                  />
                </div>
                <span className="text-[10px] font-extrabold uppercase text-zinc-600 mt-3">{fader.label}</span>
              </div>
            ))}
          </div>

          <div className="flex bg-zinc-300/70 p-1 rounded-full text-[10px] font-bold text-zinc-600 gap-1 my-2">
            {(['fast', 'slow', 'auto'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSpeedMode(mode)}
                className={`px-3 py-1 rounded-full uppercase transition-all ${
                  speedMode === mode ? 'bg-white text-zinc-900 shadow-sm' : 'hover:text-zinc-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="w-full flex items-center justify-between pt-4 border-t border-zinc-300/60">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">ADV</span>
            <div className="w-10 h-5 bg-zinc-300 rounded-full p-0.5 cursor-pointer shadow-inner">
              <div className="w-4 h-4 bg-zinc-800 rounded-full transition-transform translate-x-5" />
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL --- */}
        <div className="bg-[#f0f0f2] rounded-3xl p-6 border border-white/70 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),4px_6px_15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between min-h-[460px]">
          <button
            onClick={() => setPowerMain(!powerMain)}
            className={`w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center transition-all ${
              powerMain ? 'shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15)] text-[#e04f33]' : 'text-zinc-400'
            }`}
          >
            ⏻
          </button>

          <div className="flex justify-around w-full relative my-2">
            <Knob label="DRIVE" value={drive} onChange={setDrive} size="md" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-zinc-200 border border-zinc-300 shadow-sm text-zinc-600 text-xs">
              🔗
            </div>
            <Knob label="OUTPUT" value={output} onChange={setOutput} size="md" />
          </div>

          <div className="flex justify-around w-full my-2">
            <Knob label="BIAS" value={bias} onChange={setBias} size="sm" />
            <Knob label="TONE" value={tone} onChange={setTone} size="sm" />
          </div>

          <div className="my-2">
            <Knob label="MIX" value={mix} onChange={setMix} size="sm" />
          </div>

          <div className="w-full flex items-center justify-between pt-4 border-t border-zinc-300/60">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">ADV</span>
            <div className="w-10 h-5 bg-zinc-300 rounded-full p-0.5 cursor-pointer shadow-inner">
              <div className="w-4 h-4 bg-zinc-800 rounded-full transition-transform translate-x-5" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}