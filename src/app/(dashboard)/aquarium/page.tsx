'use client';

import React, { useState, useEffect } from 'react';
import { PixelSparkle } from '@/lib/pixel-icons';

// ─── Pixel Art Aquarium Icons ───────────────────────────────────────────────

function PixelFish({ size = 24, color = 'text-orange-400', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`${color} ${className}`} shapeRendering="crispEdges">
      <rect x="1" y="3" width="5" height="2" fill="currentColor" />
      <rect x="0" y="4" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="6" y="3" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="6" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="3" width="1" height="1" fill="white" opacity="0.8" />
    </svg>
  );
}

function PixelGoldfish({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`text-amber-300 ${className}`} shapeRendering="crispEdges">
      <rect x="1" y="3" width="4" height="2" fill="currentColor" />
      <rect x="5" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="3" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="4" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="2" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="1" height="1" fill="white" opacity="0.9" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelAngelfish({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`text-purple-400 ${className}`} shapeRendering="crispEdges">
      <rect x="2" y="1" width="3" height="1" fill="currentColor" />
      <rect x="1" y="2" width="5" height="1" fill="currentColor" />
      <rect x="1" y="3" width="4" height="3" fill="currentColor" />
      <rect x="5" y="2" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="3" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="3" width="1" height="1" fill="white" opacity="0.8" />
      <rect x="2" y="2" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelSeaweed({ size = 64, sway = 0 }: { size?: number; sway?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 16" className="text-green-500" shapeRendering="crispEdges" style={{ transform: `rotate(${sway}deg)` }}>
      <rect x="3" y="0" width="2" height="16" fill="currentColor" opacity="0.3" />
      <rect x="2" y="1" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="2" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="3" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="4" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="7" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="8" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="9" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="10" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="11" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="2" y="12" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="12" width="1" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelStarfish({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="6" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="3" width="8" height="2" fill="currentColor" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="6" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" />
      <rect x="3" y="3" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="4" y="3" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="3" y="4" width="1" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelShell({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-pink-300" shapeRendering="crispEdges">
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="2" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="3" width="1" height="1" fill="white" opacity="0.2" />
      <rect x="4" y="3" width="1" height="1" fill="white" opacity="0.2" />
    </svg>
  );
}

function PixelChest({ size = 24, open = false }: { size?: number; open?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-700" shapeRendering="crispEdges">
      <rect x="1" y="4" width="6" height="3" fill="currentColor" />
      <rect x="0" y="5" width="8" height="2" fill="currentColor" opacity="0.8" />
      <rect x="2" y="4" width="4" height="1" fill="currentColor" opacity="0.3" />
      {open ? (
        <>
          <rect x="1" y="1" width="6" height="3" fill="currentColor" opacity="0.5" />
          <rect x="2" y="0" width="4" height="1" fill="currentColor" opacity="0.3" />
          <rect x="3" y="1" width="2" height="1" fill="yellow" opacity="0.8" />
          <rect x="3" y="2" width="1" height="1" fill="yellow" opacity="0.5" />
        </>
      ) : (
        <rect x="3" y="5" width="2" height="1" fill="currentColor" opacity="0.3" />
      )}
    </svg>
  );
}

function PixelCastle({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="text-slate-400" shapeRendering="crispEdges">
      <rect x="1" y="4" width="2" height="4" fill="currentColor" opacity="0.3" />
      <rect x="4" y="2" width="2" height="6" fill="currentColor" opacity="0.3" />
      <rect x="7" y="1" width="2" height="7" fill="currentColor" opacity="0.3" />
      <rect x="10" y="2" width="2" height="6" fill="currentColor" opacity="0.3" />
      <rect x="13" y="4" width="2" height="4" fill="currentColor" opacity="0.3" />
      <rect x="0" y="8" width="16" height="6" fill="currentColor" opacity="0.4" />
      <rect x="1" y="8" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="3" y="8" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="5" y="8" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="7" y="8" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="9" y="8" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="11" y="8" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="13" y="8" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="15" y="8" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="6" y="10" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="7" y="10" width="2" height="1" fill="currentColor" opacity="0.2" />
      <rect x="5" y="12" width="2" height="2" fill="currentColor" opacity="0.2" />
      <rect x="9" y="12" width="2" height="2" fill="currentColor" opacity="0.2" />
      <rect x="3" y="4" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="12" y="4" width="1" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelCoral({ size = 20, color = 'text-rose-400' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={color} shapeRendering="crispEdges">
      <rect x="3" y="2" width="2" height="5" fill="currentColor" opacity="0.4" />
      <rect x="1" y="3" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="5" y="3" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="0" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="7" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="1" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="5" y="1" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.2" />
      <rect x="2" y="5" width="4" height="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// ─── Animated Fish Types ─────────────────────────────────────────────────────

interface Fish {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'fish' | 'goldfish' | 'angelfish';
  direction: 1 | -1;
  color: string;
  size: number;
  wobble: number;
  wobbleSpeed: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const FISH_COLORS = [
  'text-orange-400',
  'text-amber-300',
  'text-purple-400',
  'text-blue-400',
  'text-green-400',
  'text-teal-400',
  'text-rose-400',
  'text-indigo-300',
];

function useAnimatedFish(count: number) {
  const [fish, setFish] = useState<Fish[]>([]);

  useEffect(() => {
    const types: Fish['type'][] = ['fish', 'goldfish', 'angelfish'];
    const newFish: Fish[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 5,
      y: Math.random() * 55 + 15,
      speed: Math.random() * 0.4 + 0.15,
      type: types[Math.floor(Math.random() * types.length)],
      direction: Math.random() > 0.5 ? 1 : -1,
      color: FISH_COLORS[Math.floor(Math.random() * FISH_COLORS.length)],
      size: Math.random() * 10 + 16,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.05 + 0.02,
    }));
    setFish(newFish);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFish(prev =>
        prev.map(f => {
          let newX = f.x + f.speed * f.direction;
          let newDirection = f.direction;
          if (newX > 92) newDirection = -1;
          if (newX < 3) newDirection = 1;
          if (newX > 95 || newX < 0) newX = newDirection === 1 ? -5 : 95;
          return {
            ...f,
            x: newX,
            direction: newDirection as 1 | -1,
            wobble: f.wobble + f.wobbleSpeed,
          };
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return fish;
}

function useBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => {
        const moved = prev
          .map(b => ({ ...b, y: b.y - b.speed }))
          .filter(b => b.y > -10);
        if (Math.random() > 0.7 && moved.length < 12) {
          moved.push({
            id: Date.now(),
            x: Math.random() * 85 + 5,
            y: 95,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 0.5 + 0.3,
            opacity: Math.random() * 0.4 + 0.3,
          });
        }
        return moved;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return bubbles;
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AquariumPage() {
  const [fishCount, setFishCount] = useState(6);
  const [chestOpen, setChestOpen] = useState(false);
  const [sparkleActive, setSparkleActive] = useState(false);
  const [sway1, setSway1] = useState(0);
  const [sway2, setSway2] = useState(0);
  const [sway3, setSway3] = useState(0);
  const fish = useAnimatedFish(fishCount);
  const bubbles = useBubbles();

  useEffect(() => {
    const t1 = setInterval(() => setSway1(() => Math.sin(Date.now() / 1200) * 4), 50);
    const t2 = setInterval(() => setSway2(() => Math.sin(Date.now() / 900 + 1) * 3), 60);
    const t3 = setInterval(() => setSway3(() => Math.sin(Date.now() / 1500 + 2) * 5), 70);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  const FishComponent = ({ f }: { f: Fish }) => {
    if (f.type === 'goldfish') return <PixelGoldfish size={f.size} className={f.color} />;
    if (f.type === 'angelfish') return <PixelAngelfish size={f.size} className={f.color} />;
    return <PixelFish size={f.size} className={f.color} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-3xl">🐠</span>
            Pixel Aquarium
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            A little living world. {fishCount} fish swimming in your desktop ocean.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFishCount(c => Math.max(1, c - 1))}
            className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
          >
            − Fish
          </button>
          <span className="text-cyan-400 font-mono text-sm bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            {fishCount} fish
          </span>
          <button
            onClick={() => setFishCount(c => Math.min(12, c + 1))}
            className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
          >
            + Fish
          </button>
        </div>
      </div>

      {/* Aquarium */}
      <div className="relative rounded-2xl overflow-hidden border-4 border-cyan-900 shadow-2xl"
        style={{
          height: '480px',
          background: 'linear-gradient(180deg, #0c1929 0%, #0e3a5c 40%, #0a4a6e 70%, #0d5c7a 100%)',
          boxShadow: '0 0 60px rgba(6, 182, 212, 0.15), inset 0 0 80px rgba(6, 182, 212, 0.05)',
        }}
      >
        {/* Water surface shimmer */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyan-400/10 to-transparent pointer-events-none z-10" />

        {/* Animated light rays */}
        <div className="absolute top-0 left-1/4 w-24 h-full bg-gradient-to-b from-cyan-300/5 via-transparent to-transparent pointer-events-none"
          style={{ transform: 'rotate(15deg)', transformOrigin: 'top' }} />
        <div className="absolute top-0 left-1/2 w-16 h-full bg-gradient-to-b from-blue-300/5 via-transparent to-transparent pointer-events-none"
          style={{ transform: 'rotate(-10deg)', transformOrigin: 'top' }} />
        <div className="absolute top-0 left-3/4 w-20 h-full bg-gradient-to-b from-indigo-300/4 via-transparent to-transparent pointer-events-none"
          style={{ transform: 'rotate(8deg)', transformOrigin: 'top' }} />

        {/* Sand floor */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-800/40 via-amber-700/30 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 h-12 rounded-t-[50%] bg-amber-900/30" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-500/20"
              style={{
                bottom: 4 + (i % 5) * 2,
                left: `${5 + i * 5}%`,
                width: 3 + (i % 3),
                height: 2,
              }}
            />
          ))}
        </div>

        {/* Seaweed left */}
        <div className="absolute bottom-14 left-8">
          <div style={{ transform: `rotate(${sway1}deg)`, transformOrigin: 'bottom center', transition: 'transform 0.1s' }}>
            <PixelSeaweed size={72} />
          </div>
        </div>
        <div className="absolute bottom-14 left-20">
          <div style={{ transform: `rotate(${sway2}deg)`, transformOrigin: 'bottom center', transition: 'transform 0.1s' }}>
            <PixelSeaweed size={56} />
          </div>
        </div>

        {/* Seaweed right */}
        <div className="absolute bottom-14 right-12">
          <div style={{ transform: `rotate(${sway3}deg)`, transformOrigin: 'bottom center', transition: 'transform 0.1s' }}>
            <PixelSeaweed size={64} />
          </div>
        </div>
        <div className="absolute bottom-14 right-24">
          <div style={{ transform: `rotate(${-sway1}deg)`, transformOrigin: 'bottom center', transition: 'transform 0.1s' }}>
            <PixelSeaweed size={48} />
          </div>
        </div>

        {/* Castle */}
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2">
          <PixelCastle size={56} />
        </div>

        {/* Treasure chest */}
        <div
          className="absolute bottom-16 right-16 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setChestOpen(o => !o)}
        >
          <PixelChest size={28} open={chestOpen} />
        </div>

        {/* Coral */}
        <div className="absolute bottom-14 left-36">
          <PixelCoral size={22} color="text-rose-400" />
        </div>
        <div className="absolute bottom-14 right-36">
          <PixelCoral size={18} color="text-orange-400" />
        </div>

        {/* Starfish */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <PixelStarfish size={18} />
        </div>
        <div className="absolute bottom-16 right-32">
          <PixelShell size={16} />
        </div>

        {/* Bubbles */}
        {bubbles.map(b => (
          <div
            key={b.id}
            className="absolute rounded-full border border-cyan-300/40 bg-cyan-200/10 animate-bubble"
            style={{
              left: `${b.x}%`,
              bottom: `${100 - b.y}%`,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
            }}
          />
        ))}

        {/* Fish */}
        {fish.map(f => (
          <div
            key={f.id}
            className="absolute transition-none"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              transform: `scaleX(${f.direction}) translateY(${Math.sin(f.wobble) * 3}px)`,
              transition: 'none',
            }}
          >
            <FishComponent f={f} />
          </div>
        ))}

        {/* Depth guide */}
        <div className="absolute right-4 top-4 bottom-20 flex flex-col justify-between text-cyan-300/20 text-[9px] font-mono">
          <span>▲ surface</span>
          <span>● mid</span>
          <span>▼ deep</span>
        </div>

        {/* Sparkle effect */}
        {sparkleActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <PixelSparkle size={32} className="text-yellow-300 animate-ping" />
          </div>
        )}
      </div>

      {/* Controls & Info */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelFish size={16} className="text-orange-400" />
            <h3 className="text-white font-medium text-sm">Fish Population</h3>
          </div>
          <p className="text-slate-400 text-xs">
            {fishCount} {fishCount === 1 ? 'fish' : 'fish'} swimming freely. Click the treasure chest for a surprise.
          </p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            {[4, 6, 8].map(s => (
              <div key={s} className="rounded-full border border-cyan-300/40 bg-cyan-200/10"
                style={{ width: s, height: s }} />
            ))}
            <h3 className="text-white font-medium text-sm ml-1">Bubble System</h3>
          </div>
          <p className="text-slate-400 text-xs">
            Bubbles rise naturally from the seaweed and castle. The more fish, the more bubbles!
          </p>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-lg">🏰</div>
            <h3 className="text-white font-medium text-sm">Pixel Castle</h3>
          </div>
          <p className="text-slate-400 text-xs">
            Click the treasure chest to open or close it. The seaweed sways with gentle ocean currents.
          </p>
        </div>
      </div>

      {/* Fish types legend */}
      <div className="mt-4 bg-slate-800/40 border border-slate-700 rounded-xl p-4">
        <h3 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
          <span className="text-lg">🐟</span> Fish Collection
        </h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <PixelFish size={18} className="text-orange-400" />
            <span className="text-slate-400 text-xs">Classic Fish</span>
          </div>
          <div className="flex items-center gap-2">
            <PixelGoldfish size={16} className="text-amber-300" />
            <span className="text-slate-400 text-xs">Goldfish</span>
          </div>
          <div className="flex items-center gap-2">
            <PixelAngelfish size={18} className="text-purple-400" />
            <span className="text-slate-400 text-xs">Angelfish</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="text-cyan-400/50 text-xs">Click chest → {chestOpen ? '✨ open' : '📦 closed'}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-480px) scale(0.5); opacity: 0; }
        }
        .animate-bubble {
          animation: bubble linear forwards;
        }
      `}</style>
    </div>
  );
}
