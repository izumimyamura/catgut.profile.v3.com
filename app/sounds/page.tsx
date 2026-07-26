'use client';

import React, { useState, useEffect, useRef } from 'react';

const tracks = [
  { id: 'song1', title: 'Track 01', src: '/song1.mp3' },
  { id: 'song2', title: 'Track 02', src: '/song2.mp3' },
  { id: 'song3', title: 'Track 03', src: '/song3.mp3' },
  { id: 'song4', title: 'Track 04', src: '/song4.mp3' },
  { id: 'song5', title: 'Track 05', src: '/song5.mp3' },
];

export default function SoundsPage() {
  const [loading, setLoading] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [powerMain, setPowerMain] = useState(true);
  const [advMode, setAdvMode] = useState(false);
  const [speedMode, setSpeedMode] = useState<'fast' | 'slow' | 'auto'>('fast');

  // Active Preset Selectors for ADV View
  const [preset1, setPreset1] = useState(0);
  const [preset2, setPreset2] = useState(0);
  const [preset3, setPreset3] = useState(0);
  const [preset4, setPreset4] = useState(0);

  const presetsList = {
    p1: ['CLEAN', 'VOCAL', 'DYNAMIC'],
    p2: ['ROOM', 'HALL', 'PLATE'],
    p3: ['TAPE', 'TUBE', 'WARM'],
    p4: ['ANALOG', 'VINTAGE', 'MODERN'],
  };

  // Processing Parameters
  const [level, setLevel] = useState(80);
  const [inLevel, setInLevel] = useState(85);
  const [outLevel, setOutLevel] = useState(80);
  const [width, setWidth] = useState(50);
  const [eqLow, setEqLow] = useState(0);
  const [eqMid, setEqMid] = useState(4);
  const [eqHigh, setEqHigh] = useState(-2);
  const [eqAir, setEqAir] = useState(2);
  const [lowCut, setLowCut] = useState(263);
  const [drive, setDrive] = useState(20);
  const [output, setOutput] = useState(80);
  const [bias, setBias] = useState(30);
  const [tone, setTone] = useState(50);
  const [mix, setMix] = useState(100);

  // ADV Extra Parameters
  const [dsFreq, setDsFreq] = useState(60);
  const [dsVal, setDsVal] = useState(50);
  const [threshold, setThreshold] = useState(40);
  const [reverbVal, setReverbVal] = useState(45);
  const [delayVal, setDelayVal] = useState(30);

  // References
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const memeVideoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lowFilterRef = useRef<BiquadFilterNode | null>(null);
  const midFilterRef = useRef<BiquadFilterNode | null>(null);
  const highFilterRef = useRef<BiquadFilterNode | null>(null);
  const airFilterRef = useRef<BiquadFilterNode | null>(null);
  const lowCutFilterRef = useRef<BiquadFilterNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const advCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const initAudioCtx = () => {
    if (audioCtxRef.current) return;

    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioCtxRef.current = ctx;

    if (!audioRef.current) return;
    const source = ctx.createMediaElementSource(audioRef.current);

    const lowCutF = ctx.createBiquadFilter();
    lowCutF.type = 'highpass';
    lowCutF.frequency.value = lowCut;

    const low = ctx.createBiquadFilter();
    low.type = 'lowshelf';
    low.frequency.value = 250;

    const mid = ctx.createBiquadFilter();
    mid.type = 'peaking';
    mid.frequency.value = 1000;

    const high = ctx.createBiquadFilter();
    high.type = 'highshelf';
    high.frequency.value = 4000;

    const air = ctx.createBiquadFilter();
    air.type = 'highshelf';
    air.frequency.value = 10000;

    const masterGain = ctx.createGain();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;

    source.connect(lowCutF);
    lowCutF.connect(low);
    low.connect(mid);
    mid.connect(high);
    high.connect(air);
    air.connect(masterGain);
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    lowCutFilterRef.current = lowCutF;
    lowFilterRef.current = low;
    midFilterRef.current = mid;
    highFilterRef.current = high;
    airFilterRef.current = air;
    gainNodeRef.current = masterGain;
    analyserRef.current = analyser;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    initAudioCtx();

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      if (memeVideoRef.current) memeVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        if (memeVideoRef.current) memeVideoRef.current.play();
      }).catch((err) => console.log(err));
    }
  };

  const switchTrack = (index: number) => {
    const wasPlaying = isPlaying;
    setCurrentTrackIndex(index);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        if (wasPlaying) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            if (memeVideoRef.current) memeVideoRef.current.play();
          });
        }
      }
    }, 50);
  };

  useEffect(() => {
    if (lowCutFilterRef.current) lowCutFilterRef.current.frequency.value = lowCut;
    if (lowFilterRef.current) lowFilterRef.current.gain.value = powerMain ? eqLow : 0;
    if (midFilterRef.current) midFilterRef.current.gain.value = powerMain ? eqMid : 0;
    if (highFilterRef.current) highFilterRef.current.gain.value = powerMain ? eqHigh : 0;
    if (airFilterRef.current) airFilterRef.current.gain.value = powerMain ? eqAir : 0;
    if (gainNodeRef.current) gainNodeRef.current.gain.value = powerMain ? (level / 100) * (output / 100) : 0;
  }, [eqLow, eqMid, eqHigh, eqAir, lowCut, level, output, powerMain]);

  // Visualizer Canvas Renderer
  useEffect(() => {
    const drawGraph = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(120, 120, 120, 0.25)';
      ctx.lineWidth = 1;

      [20, 50, 80, 110].forEach((y) => {
        ctx.beginPath();
        ctx.setLineDash([2, 2]);
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      });

      [60, 120, 180, 240].forEach((x) => {
        ctx.beginPath();
        ctx.setLineDash([2, 2]);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      });

      if (analyserRef.current && isPlaying && powerMain) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(180, 180, 180, 0.2)';
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
    };

    const render = () => {
      drawGraph(canvasRef.current);
      drawGraph(advCanvasRef.current);
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, powerMain, eqLow, eqMid, eqHigh, eqAir]);

  // Rotatable Knob
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

    const dimension = size === 'lg' ? 'w-24 h-24' : size === 'md' ? 'w-14 h-14' : 'w-10 h-10';

    return (
      <div className="flex flex-col items-center select-none cursor-ns-resize">
        <div
          onMouseDown={handleMouseDown}
          className={`${dimension} rounded-full bg-gradient-to-b from-[#f5f5f7] to-[#d8d8dc] border border-[#c4c4c8] shadow-[3px_5px_12px_rgba(0,0,0,0.12),-3px_-3px_8px_rgba(255,255,255,0.9)] relative flex items-center justify-center transition-transform active:scale-95`}
        >
          <div className="w-full h-full rounded-full relative" style={{ transform: `rotate(${rotation}deg)` }}>
            <div className="w-1.5 h-1.5 bg-[#222] rounded-full absolute top-1.5 left-1/2 -translate-x-1/2" />
          </div>
        </div>
        {label && <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-600 mt-2">{label}</span>}
      </div>
    );
  };

  return (
    <div className="bg-[#e2e2e4] text-zinc-800 min-h-screen font-sans relative overflow-x-hidden select-none flex flex-col items-center justify-center py-16 px-4">
      
      {/* 1. SOUND WAVE PRELOADER */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-[#111115] text-white flex flex-col items-center justify-center gap-6 transition-opacity duration-500">
          <div className="flex items-end gap-1.5 h-16">
            {[0.4, 0.8, 1.2, 0.6, 1.0, 0.5, 0.9, 0.3, 0.7, 1.1].map((delay, idx) => (
              <div
                key={idx}
                className="w-2 bg-[#e04f33] rounded-full animate-bounce"
                style={{
                  height: '100%',
                  animationDuration: `${0.6 + delay * 0.4}s`,
                  animationIterationCount: 'infinite',
                }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center font-mono">
            <h2 className="text-xl font-black uppercase tracking-widest text-white">SOUND ENGINE</h2>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">CALIBRATING AUDIO FREQUENCIES...</p>
          </div>
        </div>
      )}

      {/* Main Track Audio File */}
      <audio ref={audioRef} src={tracks[currentTrackIndex].src} loop preload="auto" />

      {/* 2. APPLE-STYLE FLOATING SOUND MEME VIDEO WIDGET */}
      <div
        className={`fixed bottom-8 right-8 z-40 w-64 md:w-80 rounded-3xl overflow-hidden border border-white/40 bg-black/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          isPlaying
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-75 translate-y-12 pointer-events-none'
        }`}
      >
        <video
          ref={memeVideoRef}
          src="/soundmeme.mp4"
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute bottom-2 left-3 text-[10px] font-black uppercase tracking-widest text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          NOW PLAYING // {tracks[currentTrackIndex].title}
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 bg-zinc-900/90 text-white backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest shadow-2xl">
        <a href="/" className="hover:opacity-60 transition-opacity">Home</a>
        <a href="/projects" className="hover:opacity-60 transition-opacity">Projects</a>
        <a href="/photography" className="hover:opacity-60 transition-opacity">Photography</a>
        <a href="/space" className="hover:opacity-60 transition-opacity">Space</a>
        <a href="/timeline" className="hover:opacity-60 transition-opacity">Timeline</a>
        <span className="px-3 py-1 bg-white text-black rounded-full">Sounds</span>
      </nav>

      {/* TRACK SELECTOR & GLOBAL ADV SWITCH */}
      <div className="w-full max-w-5xl mb-6 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-3 overflow-x-auto p-1 scrollbar-none">
          {tracks.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => switchTrack(idx)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all backdrop-blur-md border ${
                currentTrackIndex === idx
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg scale-105'
                  : 'bg-white/70 text-zinc-600 border-zinc-300 hover:bg-white'
              }`}
            >
              {track.title}
            </button>
          ))}
        </div>

        {/* SINGLE MASTER ADV SWITCH */}
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-300 shadow-sm">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-700">ADV CONSOLE</span>
          <button
            onClick={() => setAdvMode(!advMode)}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors relative shadow-inner ${
              advMode ? 'bg-[#e04f33]' : 'bg-zinc-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                advMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* RACK MAIN CONTAINER */}
      {!advMode ? (
        /* --- STANDARD 3-PANEL RACK VIEW --- */
        <div className="w-full max-w-5xl bg-[#ececed] p-8 md:p-12 rounded-[40px] border border-white/80 shadow-[20px_20px_60px_rgba(0,0,0,0.12),-20px_-20px_60px_rgba(255,255,255,0.9)] grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
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

          {/* Left Panel */}
          <div className="bg-[#f0f0f2] rounded-3xl p-6 border border-white/70 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),4px_6px_15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between min-h-[440px]">
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
          </div>

          {/* Center Panel */}
          <div className="bg-[#f0f0f2] rounded-3xl p-6 border border-white/70 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),4px_6px_15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between min-h-[440px]">
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
          </div>

          {/* Right Panel */}
          <div className="bg-[#f0f0f2] rounded-3xl p-6 border border-white/70 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.7),4px_6px_15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between min-h-[440px]">
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
          </div>

        </div>
      ) : (
        /* --- FULL ADVANCED (ADV) EXPANDED CONSOLE VIEW --- */
        <div className="w-full max-w-6xl bg-[#ececed] p-6 md:p-8 rounded-[40px] border border-white/80 shadow-[20px_20px_60px_rgba(0,0,0,0.12),-20px_-20px_60px_rgba(255,255,255,0.9)] grid grid-cols-1 md:grid-cols-5 gap-4 relative animate-fadeIn">
          
          {/* Panel 1: De-Esser / Dynamic Comp */}
          <div className="bg-[#f0f0f2] rounded-3xl p-4 border border-white/70 shadow-sm flex flex-col justify-between items-center text-center">
            <div className="w-full flex justify-between items-center mb-2">
              <button className="text-xs text-zinc-400">⏻</button>
              <button className="text-xs text-zinc-400">↺</button>
            </div>

            <div className="w-full bg-[#1e1e24] text-white p-3 rounded-2xl flex items-center justify-between shadow-inner">
              <button onClick={() => setPreset1((preset1 + 2) % 3)} className="text-xs">‹</button>
              <span className="text-xs font-black tracking-widest">{presetsList.p1[preset1]}</span>
              <button onClick={() => setPreset1((preset1 + 1) % 3)} className="text-xs">›</button>
            </div>

            <div className="w-full bg-zinc-200 rounded-xl h-16 my-3 border border-zinc-300 relative flex items-center justify-center">
              <svg className="w-full h-full p-1" viewBox="0 0 100 50">
                <path d="M 10 40 Q 50 40 80 15" fill="none" stroke="#333" strokeWidth="2" />
                <line x1="10" y1="25" x2="90" y2="25" stroke="#888" strokeDasharray="2,2" strokeWidth="1" />
              </svg>
            </div>

            <div className="w-full space-y-3 my-2">
              <div className="flex justify-around items-center">
                <Knob label="Freq" value={dsFreq} onChange={setDsFreq} size="sm" />
                <div className="flex flex-col items-center gap-1">
                  <Knob label="Thresh" value={threshold} onChange={setThreshold} size="sm" />
                  <Knob label="Makeup" value={40} onChange={() => {}} size="sm" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 my-2">
                <span className="text-[9px] font-bold">DS</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={dsVal}
                  onChange={(e) => setDsVal(Number(e.target.value))}
                  className="w-24 h-1.5 bg-zinc-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex bg-zinc-300/70 p-1 rounded-full text-[9px] font-bold text-zinc-600 gap-1 justify-center">
                {(['fast', 'slow', 'auto'] as const).map((m) => (
                  <button key={m} onClick={() => setSpeedMode(m)} className={`px-2 py-0.5 rounded-full ${speedMode === m ? 'bg-white text-black' : ''}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 2: Reverb / Delay */}
          <div className="bg-[#f0f0f2] rounded-3xl p-4 border border-white/70 shadow-sm flex flex-col justify-between items-center text-center">
            <div className="w-full flex justify-between items-center mb-2">
              <button className="text-xs text-zinc-400">⏻</button>
              <button className="text-xs text-zinc-400">↺</button>
            </div>

            <div className="w-full bg-[#1e1e24] text-white p-3 rounded-2xl flex items-center justify-between shadow-inner">
              <button onClick={() => setPreset2((preset2 + 2) % 3)} className="text-xs">‹</button>
              <span className="text-xs font-black tracking-widest">{presetsList.p2[preset2]}</span>
              <button onClick={() => setPreset2((preset2 + 1) % 3)} className="text-xs">›</button>
            </div>

            <div className="w-full bg-zinc-200/80 rounded-xl p-3 my-3 border border-zinc-300 grid grid-cols-2 gap-2 text-[8px] font-bold">
              <div className="flex flex-col items-center">
                <span>REVERB</span>
                <div className="h-20 w-1.5 bg-zinc-400 rounded-full my-1" />
                <span>DUCK 0dB</span>
              </div>
              <div className="flex flex-col items-center">
                <span>DELAY</span>
                <div className="h-20 w-1.5 bg-zinc-400 rounded-full my-1" />
                <span>DUCK 0dB</span>
              </div>
            </div>

            <div className="w-full flex justify-around my-2">
              <Knob label="REVERB" value={reverbVal} onChange={setReverbVal} size="sm" />
              <Knob label="DELAY" value={delayVal} onChange={setDelayVal} size="sm" />
            </div>
          </div>

          {/* Panel 3: Master Center Section */}
          <div className="bg-[#f0f0f2] rounded-3xl p-4 border border-white/70 shadow-sm flex flex-col justify-between items-center text-center">
            <button onClick={() => setPowerMain(!powerMain)} className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center my-2 text-red-500">
              ⏻
            </button>

            <Knob label="LEVEL" value={level} onChange={setLevel} size="lg" />

            <div className="w-full flex justify-center gap-6 my-4">
              <div className="flex flex-col items-center">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={inLevel}
                  onChange={(e) => setInLevel(Number(e.target.value))}
                  className="h-28 w-2 bg-zinc-300 rounded-full appearance-none -rotate-90"
                />
                <span className="text-[9px] font-bold text-zinc-600 mt-2">IN</span>
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={outLevel}
                  onChange={(e) => setOutLevel(Number(e.target.value))}
                  className="h-28 w-2 bg-zinc-300 rounded-full appearance-none -rotate-90"
                />
                <span className="text-[9px] font-bold text-zinc-600 mt-2">OUT</span>
              </div>
            </div>
          </div>

          {/* Panel 4: Saturation / Tape */}
          <div className="bg-[#f0f0f2] rounded-3xl p-4 border border-white/70 shadow-sm flex flex-col justify-between items-center text-center">
            <div className="w-full flex justify-between items-center mb-2">
              <button className="text-xs text-zinc-400">⏻</button>
              <button className="text-xs text-zinc-400">↺</button>
            </div>

            <div className="w-full bg-[#1e1e24] text-white p-3 rounded-2xl flex items-center justify-between shadow-inner">
              <button onClick={() => setPreset3((preset3 + 2) % 3)} className="text-xs">‹</button>
              <span className="text-xs font-black tracking-widest">{presetsList.p3[preset3]}</span>
              <button onClick={() => setPreset3((preset3 + 1) % 3)} className="text-xs">›</button>
            </div>

            <div className="w-full flex justify-around my-4">
              <Knob label="DRIVE" value={drive} onChange={setDrive} size="sm" />
              <Knob label="OUTPUT" value={output} onChange={setOutput} size="sm" />
            </div>

            <div className="w-full flex justify-around my-2">
              <Knob label="BIAS" value={bias} onChange={setBias} size="sm" />
              <Knob label="TONE" value={tone} onChange={setTone} size="sm" />
            </div>

            <Knob label="MIX" value={mix} onChange={setMix} size="sm" />
          </div>

          {/* Panel 5: Analog EQ */}
          <div className="bg-[#f0f0f2] rounded-3xl p-4 border border-white/70 shadow-sm flex flex-col justify-between items-center text-center">
            <div className="w-full flex justify-between items-center mb-2">
              <button className="text-xs text-zinc-400">⏻</button>
              <button className="text-xs text-zinc-400">↺</button>
            </div>

            <div className="w-full bg-[#1e1e24] text-white p-3 rounded-2xl flex items-center justify-between shadow-inner">
              <button onClick={() => setPreset4((preset4 + 2) % 3)} className="text-xs">‹</button>
              <span className="text-xs font-black tracking-widest">{presetsList.p4[preset4]}</span>
              <button onClick={() => setPreset4((preset4 + 1) % 3)} className="text-xs">›</button>
            </div>

            <div className="w-full bg-[#dcdcdc] rounded-xl p-1 my-3 border border-zinc-300">
              <canvas ref={advCanvasRef} width={200} height={80} className="w-full h-[80px]" />
            </div>

            <div className="grid grid-cols-4 gap-2 w-full my-2">
              {[
                { label: 'Low', val: eqLow, set: setEqLow },
                { label: 'Mid', val: eqMid, set: setEqMid },
                { label: 'High', val: eqHigh, set: setEqHigh },
                { label: 'Air', val: eqAir, set: setEqAir },
              ].map((fader, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    value={fader.val}
                    onChange={(e) => fader.set(Number(e.target.value))}
                    className="h-20 w-1.5 bg-zinc-300 rounded-full appearance-none -rotate-90"
                  />
                  <span className="text-[8px] font-extrabold uppercase mt-1">{fader.label}</span>
                </div>
              ))}
            </div>

            <div className="w-full mt-2">
              <span className="text-xs font-bold text-zinc-700">{lowCut} Hz</span>
              <input
                type="range"
                min={20}
                max={500}
                value={lowCut}
                onChange={(e) => setLowCut(Number(e.target.value))}
                className="w-full h-1 bg-zinc-300 rounded-lg appearance-none cursor-pointer mt-1"
              />
              <span className="text-[8px] font-extrabold text-zinc-500 uppercase">Low-Cut</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}