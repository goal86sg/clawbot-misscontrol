'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PixelSparkle } from '@/lib/pixel-icons';

// ─── Pixel Art Campfire Icons ────────────────────────────────────────────────

function PixelFlame({
  size = 48,
  phase = 0,
  tier = 'small'
}: {
  size?: number;
  phase?: number;
  tier?: 'small' | 'mid' | 'tall';
}) {
  const flicker = [
    <g key="f0">
      <rect x="3" y="1" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="1" y="4" width="6" height="2" fill="currentColor" opacity="0.7" />
      <rect x="2" y="6" width="4" height="2" fill="currentColor" />
      <rect x="3" y="8" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="3" y="9" width="2" height="1" fill="currentColor" opacity="0.3" />
    </g>,
    <g key="f1">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.2" />
      <rect x="2" y="1" width="4" height="3" fill="currentColor" opacity="0.5" />
      <rect x="1" y="4" width="6" height="2" fill="currentColor" opacity="0.8" />
      <rect x="2" y="6" width="4" height="2" fill="currentColor" />
      <rect x="3" y="8" width="2" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="9" width="2" height="1" fill="currentColor" opacity="0.4" />
    </g>,
    <g key="f2">
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.2" />
      <rect x="3" y="2" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="1" y="6" width="6" height="2" fill="currentColor" opacity="0.9" />
      <rect x="2" y="8" width="4" height="1" fill="currentColor" />
      <rect x="3" y="9" width="2" height="1" fill="currentColor" opacity="0.5" />
    </g>,
    <g key="f3">
      <rect x="3" y="2" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="1" y="5" width="6" height="2" fill="currentColor" opacity="0.8" />
      <rect x="2" y="7" width="4" height="2" fill="currentColor" />
      <rect x="3" y="9" width="2" height="1" fill="currentColor" opacity="0.6" />
    </g>,
  ];

  const heights = { small: 10, mid: 12, tall: 14 };
  const h = heights[tier];
  const color = tier === 'tall' ? 'text-amber-400' : tier === 'mid' ? 'text-orange-400' : 'text-red-400';

  return (
    <svg
      width={size}
      height={(size / 8) * h}
      viewBox={`0 0 8 ${h}`}
      className={color}
      shapeRendering="crispEdges"
    >
      {flicker[phase % flicker.length]}
    </svg>
  );
}

function PixelEmber({
  size = 6,
  x,
  y,
  opacity,
  delay,
}: {
  size?: number;
  x: number;
  y: number;
  opacity: number;
  delay: number;
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        backgroundColor: `rgba(255, ${100 + Math.floor(Math.random() * 80)}, 0, ${opacity})`,
        boxShadow: `0 0 ${size * 2}px rgba(255, 150, 0, ${opacity * 0.5})`,
        animation: `emberRise ${3 + Math.random() * 2}s ease-out ${delay}s infinite`,
        transform: 'translateX(-50%)',
      }}
    />
  );
}

function PixelLog({
  size = 32,
  rotation = 0,
}: {
  size?: number;
  rotation?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 32 12"
      className="text-amber-700"
      shapeRendering="crispEdges"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <rect x="1" y="4" width="30" height="4" fill="currentColor" opacity="0.9" />
      <rect x="0" y="3" width="4" height="6" fill="currentColor" opacity="0.7" />
      <rect x="28" y="3" width="4" height="6" fill="currentColor" opacity="0.7" />
      <rect x="2" y="4" width="1" height="4" fill="currentColor" opacity="0.3" />
      <rect x="8" y="4" width="1" height="4" fill="currentColor" opacity="0.2" />
      <rect x="15" y="4" width="1" height="4" fill="currentColor" opacity="0.2" />
      <rect x="22" y="4" width="1" height="4" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelRock({
  size = 20,
  color = 'text-slate-600',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={color} shapeRendering="crispEdges">
      <rect x="1" y="3" width="6" height="4" fill="currentColor" opacity="0.8" />
      <rect x="0" y="4" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="4" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="3" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="1" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelStar({
  size = 8,
  twinkle = 0,
}: {
  size?: number;
  twinkle?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-100" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity={twinkle * 0.5 + 0.3} />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity={twinkle * 0.5 + 0.3} />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity={twinkle * 0.5 + 0.3} />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity={twinkle * 0.5 + 0.3} />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" opacity={twinkle * 0.3 + 0.2} />
      <rect x="5" y="2" width="1" height="1" fill="currentColor" opacity={twinkle * 0.3 + 0.2} />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity={twinkle * 0.3 + 0.2} />
      <rect x="5" y="5" width="1" height="1" fill="currentColor" opacity={twinkle * 0.3 + 0.2} />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      <rect x="2" y="3" width="1" height="1" fill="currentColor" opacity="0.7" />
      <rect x="4" y="4" width="1" height="1" fill="white" opacity="0.4" />
    </svg>
  );
}

function PixelPineTree({
  size = 40,
  color = 'text-green-800',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={color} shapeRendering="crispEdges">
      <rect x="7" y="13" width="2" height="3" fill="currentColor" opacity="0.6" />
      <rect x="4" y="9" width="8" height="4" fill="currentColor" />
      <rect x="3" y="6" width="10" height="3" fill="currentColor" />
      <rect x="2" y="3" width="12" height="3" fill="currentColor" opacity="0.9" />
      <rect x="3" y="1" width="10" height="2" fill="currentColor" opacity="0.7" />
      <rect x="5" y="0" width="6" height="1" fill="currentColor" opacity="0.4" />
      <rect x="6" y="10" width="1" height="1" fill="white" opacity="0.15" />
      <rect x="5" y="7" width="1" height="1" fill="white" opacity="0.15" />
      <rect x="9" y="4" width="1" height="1" fill="white" opacity="0.15" />
    </svg>
  );
}

function PixelMoonCrescent({
  size = 28,
}: {
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-100" shapeRendering="crispEdges">
      <rect x="2" y="1" width="5" height="5" fill="currentColor" opacity="0.2" />
      <rect x="3" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="4" y="3" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="5" y="4" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelSmokePuff({
  size = 16,
  x,
  y,
  opacity,
  delay,
}: {
  size?: number;
  x: number;
  y: number;
  opacity: number;
  delay: number;
}) {
  return (
    <div
      className="absolute rounded-full bg-slate-500"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        opacity: opacity,
        filter: 'blur(2px)',
        animation: `smokeRise ${4 + Math.random() * 3}s ease-out ${delay}s infinite`,
      }}
    />
  );
}

function PixelSpark({
  x,
  y,
  active,
  delay,
}: {
  x: number;
  y: number;
  active: boolean;
  delay: number;
}) {
  if (!active) return null;
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: 3,
        height: 3,
        backgroundColor: 'rgba(255, 255, 100, 0.9)',
        borderRadius: '50%',
        boxShadow: '0 0 6px 2px rgba(255, 200, 50, 0.8)',
        animation: `sparkPop 0.6s ease-out ${delay}s infinite`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useFlamePhase() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 150);
    return () => clearInterval(id);
  }, []);
  return phase;
}

function useTwinkle() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT(p => (p + 1) % 4), 800);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useCampfireState() {
  const [intensity, setIntensity] = useState(3);
  const [crackling, setCrackling] = useState(false);
  const [stories, setStories] = useState(false);

  const generateEmbers = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 45 + Math.random() * 10,
      y: 55 + Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.4,
      delay: Math.random() * 3,
      size: Math.random() * 5 + 3,
    }));
  };

  const [embers] = useState(generateEmbers);

  const generateSmoke = () => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 48 + Math.random() * 6,
      y: 40 + Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.05,
      delay: Math.random() * 4,
      size: Math.random() * 20 + 12,
    }));
  };

  const [smoke] = useState(generateSmoke);

  const generateSparks = () => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 46 + Math.random() * 8,
      y: 52,
      active: Math.random() > 0.5,
      delay: Math.random() * 2,
    }));
  };

  const [sparks, setSparks] = useState(generateSparks);

  useEffect(() => {
    const id = setInterval(() => {
      setSparks(generateSparks());
    }, 800);
    return () => clearInterval(id);
  }, []);

  return { intensity, setIntensity, crackling, setCrackling, stories, setStories, embers, smoke, sparks };
}

function useStarField() {
  const [stars] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 5 + 3,
      baseOpacity: Math.random() * 0.4 + 0.2,
    }))
  );
  return stars;
}

// ─── Campfire Scene ──────────────────────────────────────────────────────────

export default function CampfirePage() {
  const phase = useFlamePhase();
  const twinkle = useTwinkle();
  const { intensity, setIntensity, crackling, setCrackling, stories, setStories, embers, smoke, sparks } = useCampfireState();
  const stars = useStarField();
  const [quote, setQuote] = useState(0);
  const [voice, setVoice] = useState(false);

  const flameTiers: Array<'small' | 'mid' | 'tall'> = ['small', 'small', 'mid', 'mid', 'mid', 'tall'];
  const selectedTier = flameTiers[Math.min(intensity - 1, flameTiers.length - 1)];

  const quotes = [
    { text: '"The night is a canvas. The stars are your brush."', mood: '✨ contemplative' },
    { text: '"A fire does not concern itself with who watches it burn."', mood: '🔥 peaceful' },
    { text: '"Embers remember every song they once held."', mood: '🌙 nostalgic' },
    { text: '"Sit with the quiet. It has much to teach."', mood: '🍃 serene' },
    { text: '"The best stories are the ones told around flames."', mood: '📖 warm' },
  ];

  return (
    <div className="min-h-screen overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #0a0612 0%, #1a0a2e 40%, #2d1b3d 70%, #1a0f24 100%)' }}>
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.baseOpacity * (twinkle === (star.id % 4) ? 1.5 : 1),
            transition: 'opacity 0.8s ease',
            boxShadow: star.size > 5 ? `0 0 ${star.size}px rgba(255,255,255,0.3)` : undefined,
          }}
        />
      ))}

      {/* Moon */}
      <div className="absolute top-8 right-12">
        <PixelMoonCrescent size={36} />
      </div>

      {/* Pine trees silhouette - left */}
      <div className="absolute bottom-40 left-8 opacity-60">
        <PixelPineTree size={48} color="text-green-950" />
      </div>
      <div className="absolute bottom-40 left-24 opacity-40">
        <PixelPineTree size={64} color="text-green-950" />
      </div>
      <div className="absolute bottom-40 left-4 opacity-30">
        <PixelPineTree size={36} color="text-green-950" />
      </div>

      {/* Pine trees silhouette - right */}
      <div className="absolute bottom-40 right-8 opacity-60">
        <PixelPineTree size={52} color="text-green-950" />
      </div>
      <div className="absolute bottom-40 right-24 opacity-40">
        <PixelPineTree size={60} color="text-green-950" />
      </div>
      <div className="absolute bottom-40 right-0 opacity-30">
        <PixelPineTree size={40} color="text-green-950" />
      </div>

      {/* Ground glow */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '200px',
          background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255, 120, 20, 0.25) 0%, rgba(255, 80, 0, 0.1) 40%, transparent 70%)',
        }}
      />

      {/* Smoke */}
      {smoke.map(s => (
        <PixelSmokePuff
          key={s.id}
          x={s.x}
          y={s.y}
          opacity={s.opacity * (intensity / 3)}
          delay={s.delay}
          size={s.size}
        />
      ))}

      {/* Sparks */}
      {sparks.map(spark => (
        <PixelSpark
          key={spark.id}
          x={spark.x}
          y={spark.y}
          active={spark.active && intensity >= 2}
          delay={spark.delay}
        />
      ))}

      {/* Embers */}
      {embers.map(e => (
        <PixelEmber
          key={e.id}
          x={e.x}
          y={e.y}
          opacity={e.opacity * (intensity / 3)}
          delay={e.delay}
          size={e.size}
        />
      ))}

      {/* Campfire structure */}
      <div
        className="absolute bottom-36 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        style={{ filter: `brightness(${0.8 + intensity * 0.1})` }}
      >
        {/* Flames */}
        <div className="flex items-end gap-1 mb-[-4px]">
          {intensity >= 1 && (
            <PixelFlame size={28 + intensity * 4} phase={phase} tier="small" />
          )}
          {intensity >= 2 && (
            <PixelFlame size={36 + intensity * 4} phase={(phase + 1) % 4} tier="mid" />
          )}
          {intensity >= 3 && (
            <div className="relative">
              <PixelFlame size={44 + intensity * 5} phase={(phase + 2) % 4} tier="tall" />
              {/* Inner bright core */}
              <div
                className="absolute left-1/2 bottom-2 transform -translate-x-1/2"
                style={{
                  width: 8,
                  height: 12,
                  background: 'rgba(255, 255, 200, 0.7)',
                  borderRadius: '50%',
                  filter: 'blur(3px)',
                  animation: `corePulse 0.3s ease-in-out infinite`,
                }}
              />
            </div>
          )}
        </div>

        {/* Rocks */}
        <div className="flex items-end gap-0 relative" style={{ marginTop: -8 }}>
          <PixelRock size={20} color="text-slate-500" />
          <PixelRock size={18} color="text-slate-600" />
          <div className="-mt-2">
            <PixelRock size={22} color="text-slate-500" />
          </div>
          <PixelRock size={16} color="text-slate-600" />
          <PixelRock size={20} color="text-slate-500" />
        </div>

        {/* Logs */}
        <div className="flex flex-col items-center gap-0 mt-[-4px]">
          <PixelLog size={56} rotation={-15} />
          <PixelLog size={52} rotation={12} />
        </div>
      </div>

      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '140px',
          background: 'linear-gradient(180deg, #1a0a05 0%, #2d1a0a 50%, #1a0f06 100%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-3xl">🔥</span>
              Pixel Campfire
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              A quiet moment. The fire knows no hurry.
            </p>
          </div>

          {/* Intensity controls */}
          <div className="flex items-center gap-3 bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3">
            <span className="text-slate-400 text-xs">Intensity</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  onClick={() => setIntensity(n)}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-all ${
                    intensity === n
                      ? 'bg-orange-900/60 border-orange-500 text-orange-300'
                      : 'bg-slate-800 border-slate-600 text-slate-500 hover:border-slate-500'
                  }`}
                >
                  {n === 1 ? '🌱' : n === 2 ? '🔥' : '💥'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote card */}
      <div className="absolute bottom-48 left-6 right-6 z-10">
        <div
          className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-sm"
          style={{ boxShadow: '0 0 40px rgba(255, 100, 20, 0.1)' }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl mt-1">🌙</div>
            <div className="flex-1">
              <p className="text-white/90 text-base leading-relaxed italic">
                {quotes[quote].text}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-orange-400/70 text-xs">{quotes[quote].mood}</span>
                <button
                  onClick={() => setQuote(q => (q + 1) % quotes.length)}
                  className="text-slate-500 text-xs hover:text-slate-300 transition-colors flex items-center gap-1"
                >
                  Next <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient toggles */}
      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        <button
          onClick={() => setCrackling(c => !c)}
          className={`px-3 py-2 rounded-xl border text-xs flex items-center gap-2 transition-all ${
            crackling
              ? 'bg-amber-900/40 border-amber-600 text-amber-300'
              : 'bg-slate-800/70 border-slate-600 text-slate-400'
          }`}
        >
          <span>🔥</span>
          <span>Crackle</span>
        </button>
        <button
          onClick={() => setStories(s => !s)}
          className={`px-3 py-2 rounded-xl border text-xs flex items-center gap-2 transition-all ${
            stories
              ? 'bg-indigo-900/40 border-indigo-600 text-indigo-300'
              : 'bg-slate-800/70 border-slate-600 text-slate-400'
          }`}
        >
          <span>📖</span>
          <span>Stories</span>
        </button>
        <button
          onClick={() => setVoice(v => !v)}
          className={`px-3 py-2 rounded-xl border text-xs flex items-center gap-2 transition-all ${
            voice
              ? 'bg-cyan-900/40 border-cyan-600 text-cyan-300'
              : 'bg-slate-800/70 border-slate-600 text-slate-400'
          }`}
        >
          <span>🎙️</span>
          <span>Voice</span>
        </button>
      </div>

      {/* Intensity glow indicator */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <div
            className="h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300"
            style={{
              width: `${40 + intensity * 20}px`,
              opacity: 0.4 + intensity * 0.15,
              transition: 'all 0.5s ease',
            }}
          />
          <span>{['Low', 'Med', 'High'][intensity - 1]} ember</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes emberRise {
          0% {
            opacity: 0.8;
            transform: translateY(0) translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-100px) translateX(-50%) scale(0.6);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) translateX(-50%) scale(0.1);
          }
        }
        @keyframes smokeRise {
          0% {
            opacity: 0.15;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.08;
            transform: translateY(-80px) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translateY(-160px) scale(2);
          }
        }
        @keyframes sparkPop {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
        }
        @keyframes corePulse {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.9; transform: translateX(-50%) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
