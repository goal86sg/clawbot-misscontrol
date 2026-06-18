'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PixelSparkle, PixelCheck } from '@/lib/pixel-icons';

// ─── Pixel Art Sound Icons ───────────────────────────────────────────────────

function PixelLeaf({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="6" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="7" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelWave({ size = 14, phase = 0 }: { size?: number; phase?: number }) {
  const colors = ['text-cyan-400', 'text-blue-400', 'text-indigo-400'];
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-cyan-400" shapeRendering="crispEdges">
      {[0,1,2,3,4,5,6,7].map(i => {
        const h = Math.sin((i / 7) * Math.PI * 2 + phase) * 2 + 3;
        return <rect key={i} x={i} y={4 - h/2 + 2} width="1" height={Math.max(1, Math.round(h))} fill="currentColor" opacity={0.4 + (i/7) * 0.5} />;
      })}
    </svg>
  );
}

function PixelRain({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-300" shapeRendering="crispEdges">
      <rect x="1" y="0" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="0" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="3" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="4" y="2" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="6" y="3" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="4" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="4" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="7" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="7" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="6" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelCloud({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-gray-300" shapeRendering="crispEdges">
      <rect x="2" y="2" width="4" height="3" fill="currentColor" opacity="0.3" />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" opacity="0.4" />
      <rect x="0" y="4" width="8" height="1" fill="currentColor" opacity="0.2" />
      <rect x="3" y="1" width="2" height="1" fill="currentColor" opacity="0.2" />
      <rect x="1" y="2" width="1" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelFire({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="2" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelWind({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-slate-300" shapeRendering="crispEdges">
      <rect x="0" y="2" width="5" height="1" fill="currentColor" opacity="0.3" />
      <rect x="1" y="3" width="6" height="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="4" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelBird({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-300" shapeRendering="crispEdges">
      <rect x="4" y="2" width="3" height="2" fill="currentColor" />
      <rect x="2" y="3" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="7" y="2" width="1" height="1" fill="currentColor" />
      <rect x="3" y="4" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelDrop({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelMusicNote({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-pink-400" shapeRendering="crispEdges">
      <rect x="2" y="0" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="0" width="1" height="1" fill="currentColor" />
      <rect x="4" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="2" width="1" height="1" fill="currentColor" />
      <rect x="1" y="3" width="1" height="3" fill="currentColor" opacity="0.6" />
      <rect x="1" y="6" width="3" height="1" fill="currentColor" />
      <rect x="3" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelMoon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-300" shapeRendering="crispEdges">
      <rect x="2" y="1" width="5" height="5" fill="currentColor" opacity="0.2" />
      <rect x="3" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="4" y="3" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="5" y="4" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelStar({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-300" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="8" height="1" fill="currentColor" />
      <rect x="1" y="5" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelTree({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-emerald-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelHeart({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-rose-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="5" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="2" width="3" height="2" fill="currentColor" />
      <rect x="5" y="2" width="3" height="2" fill="currentColor" />
      <rect x="1" y="4" width="6" height="1" fill="currentColor" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelBolt({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-400" shapeRendering="crispEdges">
      <rect x="4" y="0" width="2" height="2" fill="currentColor" />
      <rect x="2" y="2" width="4" height="2" fill="currentColor" />
      <rect x="0" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="1" y="6" width="3" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Sound {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  volume: number; // 0-100
  isPlaying: boolean;
  category: 'nature' | 'ambient' | 'weather' | 'creative';
}

interface Preset {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  sounds: Record<string, number>; // sound id -> volume
}

// ─── Pixel Waveform Visualizer ────────────────────────────────────────────────

function PixelWaveform({ isPlaying, color, bars = 20 }: { isPlaying: boolean; color: string; bars?: number }) {
  const [phases, setPhases] = useState<number[]>(Array(bars).fill(0).map(() => Math.random() * Math.PI * 2));
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setFrame(f => f + 1);
      setPhases(phases => phases.map((p, i) => p + (0.15 + i * 0.03)));
    }, 120);
    return () => clearInterval(id);
  }, [isPlaying]);

  return (
    <div className="flex items-end gap-0.5 h-8">
      {phases.map((phase, i) => {
        const h = isPlaying
          ? Math.max(2, Math.round((Math.sin(phase + frame * 0.3) * 0.5 + 0.5) * 8))
          : 1;
        return (
          <div
            key={i}
            className={`w-1 rounded-sm transition-all ${color}`}
            style={{
              height: h * 3,
              opacity: isPlaying ? 0.4 + (i / bars) * 0.5 : 0.2,
              imageRendering: 'pixelated',
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Master Volume ────────────────────────────────────────────────────────────

function MasterVolume({ volume, onChange }: { volume: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
      <div className="text-cyan-500"><PixelBolt size={18} /></div>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest w-16">Master</p>
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all"
            style={{ width: `${volume}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={e => onChange(Number(e.target.value))}
          className="w-20 h-1 accent-cyan-500"
        />
        <span className="text-[11px] font-mono text-gray-500 w-8 text-right">{volume}%</span>
      </div>
    </div>
  );
}

// ─── Sound Tile ───────────────────────────────────────────────────────────────

function SoundTile({ sound, onToggle, onVolume }: {
  sound: Sound;
  onToggle: (id: string) => void;
  onVolume: (id: string, vol: number) => void;
}) {
  const isOn = sound.isPlaying && sound.volume > 0;

  return (
    <div
      className={`relative rounded-xl border-2 transition-all cursor-pointer group overflow-hidden ${
        isOn ? `${sound.borderColor} ${sound.bgColor}` : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={() => onToggle(sound.id)}
    >
      {/* Background glow when active */}
      {isOn && (
        <div className="absolute inset-0 opacity-20">
          <PixelWaveform isPlaying={isOn} color={sound.color} bars={12} />
        </div>
      )}

      <div className="relative p-4 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isOn ? sound.bgColor.replace('bg-', 'bg-').replace('-100', '-200') : 'bg-gray-50'
          }`}>
            <div className={isOn ? sound.color : 'text-gray-300'}>
              {sound.icon}
            </div>
          </div>
          {/* Toggle indicator */}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold transition-all ${
            isOn ? 'bg-cyan-500' : 'bg-gray-200'
          }`}>
            {isOn ? 'ON' : '—'}
          </div>
        </div>

        {/* Sound name */}
        <div>
          <p className={`text-sm font-semibold ${isOn ? 'text-gray-900' : 'text-gray-500'}`}>
            {sound.name}
          </p>
          <p className={`text-[10px] mt-0.5 ${isOn ? 'text-gray-500' : 'text-gray-400'}`}>
            {sound.category}
          </p>
        </div>

        {/* Volume slider — only show when active */}
        <div className={`transition-all ${isOn ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400">🔈</span>
            <input
              type="range"
              min={0}
              max={100}
              value={sound.volume}
              onChange={e => {
                e.stopPropagation();
                onVolume(sound.id, Number(e.target.value));
              }}
              onClick={e => e.stopPropagation()}
              className="flex-1 h-1 accent-cyan-500"
            />
            <span className="text-[9px] font-mono text-gray-400 w-7 text-right">{sound.volume}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Preset Card ──────────────────────────────────────────────────────────────

function PresetCard({ preset, isActive, onApply }: {
  preset: Preset;
  isActive: boolean;
  onApply: () => void;
}) {
  return (
    <button
      onClick={onApply}
      className={`text-left w-full rounded-xl border-2 px-4 py-3 transition-all ${
        isActive
          ? 'border-cyan-300 bg-cyan-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div className={isActive ? 'text-cyan-500' : 'text-gray-400'}>
          {preset.icon}
        </div>
        <p className={`text-xs font-semibold ${isActive ? 'text-cyan-900' : 'text-gray-700'}`}>
          {preset.name}
        </p>
        {isActive && (
          <div className="ml-auto">
            <PixelCheck size={12} className="text-cyan-500" />
          </div>
        )}
      </div>
      <p className={`text-[10px] ${isActive ? 'text-cyan-700' : 'text-gray-400'}`}>
        {preset.description}
      </p>
    </button>
  );
}

// ─── Pixel Stars Background ───────────────────────────────────────────────────

function PixelStarsField({ count = 30, tick }: { count?: number; tick: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {Array.from({ length: count }, (_, i) => {
        const x = ((i * 73 + 17) % 100);
        const y = ((i * 47 + 11) % 100);
        const twinkle = Math.sin((tick * 0.05) + i * 0.7) > 0.3;
        return (
          <div
            key={i}
            className={`absolute rounded-sm bg-white transition-opacity ${
              twinkle ? 'opacity-80' : 'opacity-20'
            }`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
              imageRendering: 'pixelated',
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_SOUNDS: Sound[] = [
  { id: 'rain', name: 'Gentle Rain', icon: <PixelRain size={20} />, color: 'text-blue-400', bgColor: 'bg-blue-100', borderColor: 'border-blue-300', volume: 70, isPlaying: false, category: 'weather' },
  { id: 'forest', name: 'Forest', icon: <PixelTree size={20} />, color: 'text-emerald-500', bgColor: 'bg-emerald-100', borderColor: 'border-emerald-300', volume: 50, isPlaying: false, category: 'nature' },
  { id: 'fire', name: 'Crackling Fire', icon: <PixelFire size={20} />, color: 'text-orange-400', bgColor: 'bg-orange-100', borderColor: 'border-orange-300', volume: 60, isPlaying: false, category: 'ambient' },
  { id: 'birds', name: 'Birdsong', icon: <PixelBird size={20} />, color: 'text-amber-400', bgColor: 'bg-amber-100', borderColor: 'border-amber-300', volume: 40, isPlaying: false, category: 'nature' },
  { id: 'wind', name: 'Wind', icon: <PixelWind size={20} />, color: 'text-slate-400', bgColor: 'bg-slate-100', borderColor: 'border-slate-300', volume: 30, isPlaying: false, category: 'weather' },
  { id: 'thunder', name: 'Thunder', icon: <PixelCloud size={20} />, color: 'text-gray-500', bgColor: 'bg-gray-100', borderColor: 'border-gray-400', volume: 0, isPlaying: false, category: 'weather' },
  { id: 'ocean', name: 'Ocean Waves', icon: <PixelWave size={20} />, color: 'text-cyan-400', bgColor: 'bg-cyan-100', borderColor: 'border-cyan-300', volume: 80, isPlaying: false, category: 'nature' },
  { id: 'night', name: 'Night Crickets', icon: <PixelMoon size={20} />, color: 'text-indigo-400', bgColor: 'bg-indigo-100', borderColor: 'border-indigo-300', volume: 50, isPlaying: false, category: 'nature' },
  { id: 'cafe', name: 'Cafe Murmur', icon: <PixelMusicNote size={20} />, color: 'text-pink-400', bgColor: 'bg-pink-100', borderColor: 'border-pink-300', volume: 0, isPlaying: false, category: 'ambient' },
  { id: 'stream', name: 'Stream', icon: <PixelDrop size={20} />, color: 'text-blue-300', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', volume: 65, isPlaying: false, category: 'nature' },
  { id: 'leaves', name: 'Rustling Leaves', icon: <PixelLeaf size={20} />, color: 'text-green-500', bgColor: 'bg-green-100', borderColor: 'border-green-300', volume: 35, isPlaying: false, category: 'nature' },
  { id: 'heartbeat', name: 'Heartbeat', icon: <PixelHeart size={20} />, color: 'text-rose-400', bgColor: 'bg-rose-100', borderColor: 'border-rose-300', volume: 0, isPlaying: false, category: 'ambient' },
];

const PRESETS: Preset[] = [
  {
    id: 'focus',
    name: 'Deep Focus',
    description: 'Gentle rain + fire crackling',
    icon: <PixelBolt size={14} />,
    sounds: { rain: 60, fire: 40, forest: 0, birds: 0, wind: 0, thunder: 0, ocean: 0, night: 0, cafe: 0, stream: 0, leaves: 0, heartbeat: 0 },
  },
  {
    id: 'nature',
    name: 'Forest Morning',
    description: 'Birds, stream, rustling leaves',
    icon: <PixelTree size={14} />,
    sounds: { rain: 0, fire: 0, forest: 70, birds: 80, wind: 20, thunder: 0, ocean: 0, night: 0, cafe: 0, stream: 60, leaves: 50, heartbeat: 0 },
  },
  {
    id: 'storm',
    name: 'Stormy Night',
    description: 'Rain, thunder, wind',
    icon: <PixelCloud size={14} />,
    sounds: { rain: 90, fire: 0, forest: 0, birds: 0, wind: 70, thunder: 80, ocean: 0, night: 0, cafe: 0, stream: 0, leaves: 0, heartbeat: 0 },
  },
  {
    id: 'ocean',
    name: 'Beach Vibes',
    description: 'Ocean waves + birds',
    icon: <PixelWave size={14} />,
    sounds: { rain: 0, fire: 0, forest: 0, birds: 50, wind: 30, thunder: 0, ocean: 85, night: 0, cafe: 0, stream: 0, leaves: 0, heartbeat: 0 },
  },
  {
    id: 'zen',
    name: 'Zen Garden',
    description: 'Stream, leaves, distant wind',
    icon: <PixelLeaf size={14} />,
    sounds: { rain: 0, fire: 0, forest: 30, birds: 20, wind: 40, thunder: 0, ocean: 0, night: 0, cafe: 0, stream: 70, leaves: 80, heartbeat: 0 },
  },
];

export default function SoundGardenPage() {
  const [sounds, setSounds] = useState<Sound[]>(INITIAL_SOUNDS);
  const [masterVolume, setMasterVolume] = useState(80);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'nature' | 'weather' | 'ambient'>('all');

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  const toggleSound = (id: string) => {
    setSounds(prev => prev.map(s =>
      s.id === id ? { ...s, isPlaying: !s.isPlaying } : s
    ));
    setActivePreset(null);
  };

  const setVolume = (id: string, vol: number) => {
    setSounds(prev => prev.map(s =>
      s.id === id ? { ...s, volume: vol, isPlaying: vol > 0 } : s
    ));
    setActivePreset(null);
  };

  const applyPreset = (preset: Preset) => {
    setSounds(prev => prev.map(s => ({
      ...s,
      volume: preset.sounds[s.id] ?? 0,
      isPlaying: (preset.sounds[s.id] ?? 0) > 0,
    })));
    setActivePreset(preset.id);
  };

  const activeSounds = sounds.filter(s => s.isPlaying && s.volume > 0);
  const categories: Array<{ key: 'all' | 'nature' | 'weather' | 'ambient'; label: string }> = [
    { key: 'all', label: 'All Sounds' },
    { key: 'nature', label: 'Nature' },
    { key: 'weather', label: 'Weather' },
    { key: 'ambient', label: 'Ambient' },
  ];

  const filteredSounds = selectedCategory === 'all'
    ? sounds
    : sounds.filter(s => s.category === selectedCategory);

  const natureSounds = sounds.filter(s => s.category === 'nature' && s.isPlaying && s.volume > 0);
  const weatherSounds = sounds.filter(s => s.category === 'weather' && s.isPlaying && s.volume > 0);
  const ambientSounds = sounds.filter(s => s.category === 'ambient' && s.isPlaying && s.volume > 0);

  return (
    <div className="max-w-5xl space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-emerald-500"><PixelLeaf size={28} /></div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Sound Garden</h1>
            <p className="text-xs text-gray-500 mt-0.5">Cultivate your perfect soundscape</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Active sounds indicator */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <div className={`flex gap-0.5 ${activeSounds.length > 0 ? 'text-emerald-500' : 'text-gray-300'}`}>
              <PixelWave size={12} phase={tick * 0.1} />
            </div>
            <span className="text-[11px] font-mono text-gray-600">
              {activeSounds.length > 0
                ? `${activeSounds.length} sound${activeSounds.length > 1 ? 's' : ''} active`
                : 'Silent'}
            </span>
          </div>
        </div>
      </div>

      {/* Master Volume */}
      <MasterVolume volume={masterVolume} onChange={setMasterVolume} />

      {/* Presets */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-amber-400"><PixelStar size={14} /></div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Soundscape Presets</p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {PRESETS.map(preset => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isActive={activePreset === preset.id}
              onApply={() => applyPreset(preset)}
            />
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-lg border-2 transition-all ${
              selectedCategory === cat.key
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sound Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filteredSounds.map(sound => (
          <SoundTile
            key={sound.id}
            sound={sound}
            onToggle={toggleSound}
            onVolume={setVolume}
          />
        ))}
      </div>

      {/* Active Sounds Mixer Strip */}
      {activeSounds.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-cyan-500"><PixelWave size={14} phase={tick * 0.1} /></div>
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Live Mixer
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {natureSounds.length > 0 && (
                  <span className="text-[10px] text-emerald-500 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    🌿 {natureSounds.length} nature
                  </span>
                )}
                {weatherSounds.length > 0 && (
                  <span className="text-[10px] text-blue-500 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    ☁️ {weatherSounds.length} weather
                  </span>
                )}
                {ambientSounds.length > 0 && (
                  <span className="text-[10px] text-pink-500 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-full">
                    🎵 {ambientSounds.length} ambient
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="space-y-3">
              {activeSounds.map(sound => (
                <div key={sound.id} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${sound.bgColor}`}>
                    <div className={sound.color}>{sound.icon}</div>
                  </div>
                  <p className="text-xs font-medium text-gray-700 w-28 truncate">{sound.name}</p>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${sound.color.replace('text-', 'bg-')}`}
                      style={{
                        width: `${(sound.volume / 100) * 100}%`,
                        filter: 'brightness(0.9)',
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 w-8 text-right">
                    {sound.volume}%
                  </span>
                  <button
                    onClick={() => toggleSound(sound.id)}
                    className="text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ambient Visual — pixel stars field */}
      <div className="relative h-24 bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 rounded-xl overflow-hidden border border-indigo-900">
        <PixelStarsField count={40} tick={tick} />

        {/* Ground silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-emerald-950 to-transparent" />

        {/* Active nature element */}
        {activeSounds.filter(s => s.category === 'nature').length > 0 && (
          <div className="absolute bottom-4 left-8">
            <PixelTree size={32} />
          </div>
        )}
        {activeSounds.filter(s => s.id === 'rain' || s.id === 'thunder').length > 0 && (
          <div className="absolute top-3 left-10">
            <PixelCloud size={28} />
          </div>
        )}
        {activeSounds.filter(s => s.id === 'ocean').length > 0 && (
          <div className="absolute bottom-3 left-1/2">
            <PixelWave size={40} phase={tick * 0.08} />
          </div>
        )}

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white text-opacity-40 text-[10px] font-mono tracking-widest uppercase">
              {activeSounds.length > 0
                ? `🌿 ${activeSounds.map(s => s.name).join(' · ')}`
                : 'Sound Garden — Select sounds to begin'}
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy footer */}
      <div className="flex items-center gap-2 justify-center">
        <PixelSparkle size={10} className="text-gray-300" />
        <p className="text-[9px] text-gray-300 font-mono text-center">
          &quot;Almost everything will work again if you unplug it for a few minutes, including you.&quot; — Anne Lamott
        </p>
        <PixelSparkle size={10} className="text-gray-300" />
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Sound Garden · Screen 53 · Des_bot
      </p>
    </div>
  );
}
