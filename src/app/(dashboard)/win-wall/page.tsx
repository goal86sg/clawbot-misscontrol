'use client';

import React, { useState, useEffect } from 'react';

// ─── Pixel Art Icons ───────────────────────────────────────────────────────────

function PixelTrophy({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" />
      <rect x="1" y="6" width="6" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelStar({ size = 14, color = 'text-yellow-400' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={color} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="8" height="2" fill="currentColor" />
      <rect x="1" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelMedal({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="2" width="6" height="4" fill="currentColor" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelRibbon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-red-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" />
      <rect x="1" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelHeart({ size = 12, color = 'text-rose-400' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={color} shapeRendering="crispEdges">
      <rect x="1" y="1" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="1" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="0" y="2" width="8" height="2" fill="currentColor" opacity="0.5" />
      <rect x="1" y="4" width="6" height="2" fill="currentColor" opacity="0.7" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelBolt({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
      <rect x="4" y="0" width="2" height="2" fill="currentColor" opacity="0.7" />
      <rect x="3" y="2" width="3" height="1" fill="currentColor" />
      <rect x="5" y="3" width="2" height="2" fill="currentColor" />
      <rect x="2" y="5" width="3" height="1" fill="currentColor" opacity="0.6" />
      <rect x="3" y="6" width="3" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="7" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelFlag({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-emerald-500" shapeRendering="crispEdges">
      <rect x="1" y="0" width="6" height="4" fill="currentColor" opacity="0.6" />
      <rect x="2" y="1" width="4" height="2" fill="currentColor" />
      <rect x="1" y="4" width="1" height="4" fill="currentColor" opacity="0.5" />
      <rect x="1" y="7" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelCheck({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-green-500" shapeRendering="crispEdges">
      <rect x="1" y="3" width="2" height="1" fill="currentColor" />
      <rect x="0" y="4" width="1" height="1" fill="currentColor" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" />
      <rect x="5" y="2" width="2" height="1" fill="currentColor" />
      <rect x="4" y="3" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelSparkle({ size = 14, color = 'text-yellow-300' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={color} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="4" y="1" width="1" height="1" fill="currentColor" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" />
      <rect x="6" y="2" width="1" height="1" fill="currentColor" />
      <rect x="1" y="3" width="1" height="2" fill="currentColor" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" />
      <rect x="0" y="4" width="1" height="1" fill="currentColor" />
      <rect x="7" y="4" width="1" height="1" fill="currentColor" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" />
      <rect x="6" y="5" width="1" height="1" fill="currentColor" />
      <rect x="4" y="6" width="1" height="1" fill="currentColor" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelFire({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelRocket({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-slate-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.6" />
      <rect x="2" y="2" width="4" height="3" fill="currentColor" opacity="0.8" />
      <rect x="3" y="2" width="2" height="3" fill="currentColor" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="6" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="5" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="7" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="7" width="2" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Confetti System ──────────────────────────────────────────────────────────

interface Confetto {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  drift: number;
  speed: number;
}

const CONFETTI_COLORS = [
  '#fbbf24', '#f59e0b', '#ef4444', '#ec4899',
  '#8b5cf6', '#3b82f6', '#10b981', '#22c55e',
];

function Confetti({ count = 30, active }: { count?: number; active: boolean }) {
  const [pieces, setPieces] = useState<Confetto[]>([]);

  useEffect(() => {
    if (!active) { setPieces([]); return; }
    const initial = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 4 + Math.floor(Math.random() * 5),
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 0.5,
      speed: 0.3 + Math.random() * 0.4,
    }));
    setPieces(initial);

    const interval = setInterval(() => {
      setPieces(prev =>
        prev
          .map(p => ({ ...p, y: p.y + p.speed, x: p.x + p.drift, rotation: p.rotation + 2 }))
          .filter(p => p.y < 110)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [active, count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.85,
            borderRadius: Math.random() > 0.5 ? '2px' : '50%',
          }}
        />
      ))}
    </div>
  );
}

// ─── Pixel Progress Bar ───────────────────────────────────────────────────────

function PixelBar({ value, max = 100, color = 'bg-amber-400', segments = 20 }: {
  value: number; max?: number; color?: string; segments?: number;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const filled = Math.round((pct / 100) * segments);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: segments }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-3 rounded-sm transition-colors ${i < filled ? color : 'bg-gray-100'}`}
        />
      ))}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Win {
  id: string;
  title: string;
  description: string;
  category: 'build' | 'ship' | 'learn' | 'help' | 'health' | 'milestone';
  date: string;
  mood: 'amazing' | 'great' | 'good' | 'okay';
  energy: 1 | 2 | 3 | 4 | 5;
  impact: 'big' | 'medium' | 'small';
  stars: number;
}

interface WeeklyStats {
  totalWins: number;
  biggestWin: string;
  winStreak: number;
  categoryBreakdown: Record<string, number>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const wins: Win[] = [
  { id: 'w1', title: 'Mission Control v2.0 launched', description: '13 new screens shipped including Tasks, Calendar, Projects, Memory, Docs', category: 'build', date: 'Today', mood: 'amazing', energy: 5, impact: 'big', stars: 5 },
  { id: 'w2', title: 'eBPF DAM architecture doc reviewed', description: 'Deep dive into kernel-level database activity monitoring', category: 'learn', date: 'Today', mood: 'great', energy: 4, impact: 'medium', stars: 4 },
  { id: 'w3', title: 'pixfetch CLI shipped', description: 'Neofetch-style workspace inspector built and published', category: 'ship', date: 'Yesterday', mood: 'great', energy: 4, impact: 'medium', stars: 4 },
  { id: 'w4', title: 'Nightly build streak: 5 days', description: 'Consistently shipping something delightful every night', category: 'milestone', date: 'Yesterday', mood: 'amazing', energy: 5, impact: 'big', stars: 5 },
  { id: 'w5', title: 'Helped Desss debug GitHub auth', description: 'Solved a tricky OAuth flow issue with pixel-art browser automation', category: 'help', date: 'Jun 20', mood: 'good', energy: 3, impact: 'small', stars: 3 },
  { id: 'w6', title: 'Portfolio screen shipped', description: 'Full investment portfolio tracker with live-ish market data', category: 'build', date: 'Jun 20', mood: 'great', energy: 4, impact: 'medium', stars: 4 },
  { id: 'w7', title: 'Completed 45-min focus block', description: 'Deep work session on Sovereign Cloud automation pipeline', category: 'health', date: 'Jun 19', mood: 'good', energy: 3, impact: 'small', stars: 3 },
  { id: 'w8', title: 'Weather Station screen shipped', description: 'Pixel art weather dashboard with clothing suggestions', category: 'build', date: 'Jun 19', mood: 'great', energy: 4, impact: 'medium', stars: 4 },
  { id: 'w9', title: 'Meditation Timer shipped', description: 'Animated breathing circle with streak tracking', category: 'build', date: 'Jun 18', mood: 'great', energy: 4, impact: 'medium', stars: 4 },
  { id: 'w10', title: 'Memory dreaming pipeline improved', description: 'Compaction now extracts long-term truth with 40% better accuracy', category: 'learn', date: 'Jun 18', mood: 'okay', energy: 3, impact: 'medium', stars: 3 },
];

const stats: WeeklyStats = {
  totalWins: wins.length,
  biggestWin: 'Mission Control v2.0 launched',
  winStreak: 5,
  categoryBreakdown: { build: 4, learn: 2, ship: 1, milestone: 1, help: 1, health: 1 },
};

const categoryMeta: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  build:   { icon: <PixelRocket size={12} />, label: 'Build', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  ship:    { icon: <PixelFlag size={12} />, label: 'Ship', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
  learn:   { icon: <PixelBolt size={12} />, label: 'Learn', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  help:    { icon: <PixelHeart size={12} />, label: 'Help', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200' },
  health:  { icon: <PixelSparkle size={12} />, label: 'Health', color: 'text-teal-600', bg: 'bg-teal-50 border-teal-200' },
  milestone:{ icon: <PixelMedal size={12} />, label: 'Milestone', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
};

const moodMeta: Record<string, { label: string; color: string }> = {
  amazing: { label: '✨ Amazing', color: 'text-amber-500' },
  great:   { label: '😊 Great', color: 'text-green-500' },
  good:    { label: '🙂 Good', color: 'text-blue-500' },
  okay:    { label: '😐 Okay', color: 'text-gray-400' },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WinWallPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedWin, setSelectedWin] = useState<Win | null>(null);
  const [tick, setTick] = useState(0);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1200);
    return () => clearInterval(id);
  }, []);

  // Auto-confetti when viewing today's wins
  useEffect(() => {
    const todayWins = wins.filter(w => w.date === 'Today');
    if (todayWins.length > 0) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, []);

  const filteredWins = filter ? wins.filter(w => w.category === filter) : wins;
  const sparkles = ['✦', '✧', '⋆', '✶', '⁕'];
  const sparkle = sparkles[tick % sparkles.length];

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="max-w-6xl space-y-6">
      <Confetti active={showConfetti} count={40} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 border-2 border-amber-200 rounded-lg flex items-center justify-center">
            <PixelTrophy size={24} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Win Wall</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {sparkle} {stats.totalWins} wins recorded · {stats.winStreak}-day streak
            </p>
          </div>
        </div>
        <button
          onClick={triggerConfetti}
          className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
        >
          🎉 Celebrate!
        </button>
      </div>

      {/* Weekly Stats Hero */}
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 rounded-xl overflow-hidden relative">
        <div className="absolute top-2 right-3 opacity-10">
          <PixelTrophy size={80} />
        </div>
        <div className="relative z-10 p-6 grid grid-cols-4 gap-6">
          {/* Total Wins */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2 border border-amber-100">
              <span className="text-2xl font-bold text-amber-600">{stats.totalWins}</span>
            </div>
            <p className="text-[10px] text-amber-600 uppercase tracking-widest font-semibold">Total Wins</p>
          </div>

          {/* Biggest Win */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2 border border-amber-100">
              <PixelMedal size={28} />
            </div>
            <p className="text-[10px] text-amber-600 uppercase tracking-widest font-semibold">Biggest Win</p>
            <p className="text-[10px] text-amber-700 mt-1 truncate max-w-[120px]">{stats.biggestWin}</p>
          </div>

          {/* Win Streak */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2 border border-amber-100">
              <div className="flex">
                {Array.from({ length: Math.min(stats.winStreak, 5) }).map((_, i) => (
                  <PixelFire key={i} size={10} />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-amber-600 uppercase tracking-widest font-semibold">Day Streak</p>
            <p className="text-[11px] font-bold text-amber-700 mt-1">{stats.winStreak} days</p>
          </div>

          {/* This Week */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2 border border-amber-100">
              <PixelStar size={28} />
            </div>
            <p className="text-[10px] text-amber-600 uppercase tracking-widest font-semibold">Avg Stars</p>
            <p className="text-[11px] font-bold text-amber-700 mt-1">
              {(wins.reduce((a, w) => a + w.stars, 0) / wins.length).toFixed(1)} / 5
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-6 gap-3">
        {Object.entries(stats.categoryBreakdown).map(([cat, count]) => {
          const meta = categoryMeta[cat];
          const maxCount = Math.max(...Object.values(stats.categoryBreakdown));
          return (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? null : cat)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all ${
                filter === cat
                  ? `${meta.bg} border-current ${meta.color} shadow-sm`
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={filter === cat ? meta.color : 'text-gray-400'}>{meta.icon}</div>
              <span className={`text-[10px] font-semibold ${filter === cat ? meta.color : 'text-gray-500'}`}>{meta.label}</span>
              <span className={`text-lg font-bold ${filter === cat ? meta.color : 'text-gray-700'}`}>{count}</span>
              <div className="w-full">
                <PixelBar value={count} max={maxCount} color={`${meta.color.replace('text-', 'bg-')}`} segments={6} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Win Feed */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center gap-2">
            <PixelStar size={12} />
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Win Feed</h2>
          </div>
          {filter && (
            <button
              onClick={() => setFilter(null)}
              className="text-[9px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              Clear filter ✕
            </button>
          )}
        </div>

        <div className="divide-y divide-gray-50">
          {filteredWins.map(win => {
            const meta = categoryMeta[win.category];
            const mood = moodMeta[win.mood];
            const isSelected = selectedWin?.id === win.id;

            return (
              <div
                key={win.id}
                onClick={() => setSelectedWin(isSelected ? null : win)}
                className={`px-5 py-4 cursor-pointer transition-all hover:bg-gray-50/50 ${
                  isSelected ? 'bg-blue-50/30' : ''
                } ${win.date === 'Today' ? 'border-l-2 border-amber-400' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {/* Trophy Icon */}
                  <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
                    win.impact === 'big' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'
                  }`}>
                    {win.impact === 'big'
                      ? <PixelTrophy size={18} />
                      : win.impact === 'medium'
                        ? <PixelMedal size={16} />
                        : <PixelRibbon size={14} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-gray-900">{win.title}</h3>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${meta.bg} ${meta.color}`}>
                        {meta.icon} {meta.label}
                      </span>
                      {win.date === 'Today' && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-600 font-medium">
                          Today ✨
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{win.description}</p>

                    {/* Expanded details */}
                    {isSelected && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-gray-600">{win.description}</p>
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] font-medium ${mood.color}`}>{mood.label}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-400">Energy:</span>
                            {[1,2,3,4,5].map(i => (
                              <div key={i} className={`w-2 h-2 rounded-sm ${i <= win.energy ? 'bg-green-400' : 'bg-gray-100'}`} />
                            ))}
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <PixelStar key={i} size={8} color={i < win.stars ? 'text-yellow-400' : 'text-gray-200'} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer meta */}
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[9px] text-gray-400">{win.date}</span>
                      <span className="text-[9px] text-gray-300">·</span>
                      <span className={`text-[9px] font-medium ${mood.color}`}>{mood.label}</span>
                      <span className="text-[9px] text-gray-300">·</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: win.stars }).map((_, i) => (
                          <PixelStar key={i} size={8} color="text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Win Section */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PixelSparkle size={16} color="text-amber-400" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Log a Win</p>
            <p className="text-[10px] text-gray-500">Capture something good that happened</p>
          </div>
        </div>
        <button
          onClick={triggerConfetti}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          + Add Win
        </button>
      </div>

      {/* Pixel decoration */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-amber-400"
            style={{ opacity: Math.sin(i * 0.8 + tick * 0.2) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Win Wall · Screen 59 · Des_bot
      </p>
    </div>
  );
}
