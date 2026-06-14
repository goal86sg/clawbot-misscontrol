'use client';

import React, { useState } from 'react';
import { PixelSparkle, PixelCheck, PixelHeart } from '@/lib/pixel-icons';
import { PixelStar } from '@/lib/pixel-icons-extra';

// ─── Pixel Art Icons ─────────────────────────────────────────────────────────

function PixelMedal({ size = 16, color = 'text-amber-400' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={color} shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="1" fill="currentColor" />
      <rect x="1" y="1" width="6" height="2" fill="currentColor" />
      <rect x="0" y="3" width="8" height="3" fill="currentColor" opacity="0.8" />
      <rect x="1" y="6" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelCrown({ size = 16, className = 'text-yellow-500' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="2" width="6" height="1" fill="currentColor" />
      <rect x="0" y="3" width="8" height="1" fill="currentColor" />
      <rect x="0" y="4" width="2" height="3" fill="currentColor" />
      <rect x="6" y="4" width="2" height="3" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="0" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="1" width="2" height="1" fill="currentColor" />
      <rect x="7" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelRocket({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-violet-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="2" fill="currentColor" />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" opacity="0.7" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="1" width="2" height="1" fill="currentColor" opacity="0.3" />
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

function PixelFlame({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelDiamond({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-cyan-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelBadge({ type, size = 20 }: { type: string; size?: number }) {
  switch (type) {
    case 'crown': return <PixelCrown size={size} />;
    case 'medal': return <PixelMedal size={size} />;
    case 'rocket': return <PixelRocket size={size} />;
    case 'bolt': return <PixelBolt size={size} />;
    case 'flame': return <PixelFlame size={size} />;
    case 'diamond': return <PixelDiamond size={size} />;
    default: return <PixelStar size={size} />;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

type WinCategory = 'milestone' | 'habit' | 'learning' | 'health' | 'work' | 'personal' | 'streak';

interface Win {
  id: string;
  title: string;
  description: string;
  category: WinCategory;
  date: string;
  badge: string;
  points: number;
  reactions: number;
  featured: boolean;
}

interface Milestone {
  id: string;
  label: string;
  type: string;
  count: number;
  total: number;
  unit: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, string> = {
  crown: 'text-yellow-500',
  medal: 'text-amber-400',
  rocket: 'text-violet-400',
  bolt: 'text-amber-400',
  flame: 'text-orange-400',
  diamond: 'text-cyan-400',
  star: 'text-yellow-500',
};

const BADGE_BG: Record<string, string> = {
  milestone: 'bg-amber-50 border-amber-200',
  habit: 'bg-emerald-50 border-emerald-200',
  learning: 'bg-blue-50 border-blue-200',
  health: 'bg-rose-50 border-rose-200',
  work: 'bg-violet-50 border-violet-200',
  personal: 'bg-pink-50 border-pink-200',
  streak: 'bg-orange-50 border-orange-200',
};

const CATEGORY_LABEL: Record<WinCategory, string> = {
  milestone: 'Milestone',
  habit: 'Habit',
  learning: 'Learning',
  health: 'Health',
  work: 'Work',
  personal: 'Personal',
  streak: 'Streak',
};

const INITIAL_WINS: Win[] = [
  { id: 'w1', title: 'Shipped eBPF DAM module', description: 'Core PostgreSQL audit log parsing working end-to-end', category: 'work', badge: 'rocket', date: '2026-06-14', points: 150, reactions: 8, featured: true },
  { id: 'w2', title: '30-day coding streak', description: 'Consecutive days of writing code — new personal record!', category: 'streak', badge: 'flame', date: '2026-06-13', points: 100, reactions: 12, featured: true },
  { id: 'w3', title: 'First 100 commits', description: 'Hit the triple-digit milestone on the mission-control repo', category: 'milestone', badge: 'medal', date: '2026-06-12', points: 80, reactions: 6, featured: false },
  { id: 'w4', title: 'Morning routine 14 days', description: 'Two weeks straight — journal, exercise, then work', category: 'habit', badge: 'crown', date: '2026-06-11', points: 70, reactions: 5, featured: false },
  { id: 'w5', title: 'Finished SRE book ch. 1-5', description: 'Deep-dived into error budgets and SLIs', category: 'learning', badge: 'diamond', date: '2026-06-10', points: 60, reactions: 3, featured: false },
  { id: 'w6', title: '5km personal best', description: 'Shaved 2 min off my run time — 24:30 total', category: 'health', badge: 'bolt', date: '2026-06-09', points: 90, reactions: 9, featured: false },
  { id: 'w7', title: 'Launched passive income blog', description: 'First post published — "My eBPF Journey"', category: 'personal', badge: 'star', date: '2026-06-08', points: 120, reactions: 15, featured: true },
  { id: 'w8', title: 'eBPF Summit talk submitted', description: 'Proposal accepted for the August virtual event', category: 'milestone', badge: 'medal', date: '2026-06-07', points: 200, reactions: 22, featured: false },
];

const MILESTONES: Milestone[] = [
  { id: 'm1', label: 'Total Wins', type: 'crown', count: 47, total: 100, unit: 'wins' },
  { id: 'm2', label: 'Points Earned', type: 'star', count: 3420, total: 5000, unit: 'pts' },
  { id: 'm3', label: 'Day Streak', type: 'flame', count: 30, total: 100, unit: 'days' },
  { id: 'm4', label: 'Badges Earned', type: 'medal', count: 18, total: 30, unit: 'badges' },
];

// ─── Pixel Progress ───────────────────────────────────────────────────────────

function PixelRowBar({ pct, color = 'bg-violet-500', height = 6 }: { pct: number; color?: string; height?: number }) {
  const filled = Math.round((pct / 100) * height);
  return (
    <div className="flex flex-col-reverse gap-px">
      {Array.from({ length: height }, (_, r) => (
        <div key={r} className={`w-3 rounded-sm ${r < filled ? color : 'bg-gray-100'}`} />
      ))}
    </div>
  );
}

// ─── Win Card ─────────────────────────────────────────────────────────────────

function WinCard({ win, onReact }: { win: Win; onReact: (id: string) => void }) {
  const [tick, setTick] = useState(0);
  const [pressed, setPressed] = useState(false);

  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const isNew = (Date.now() - new Date(win.date).getTime()) < 2 * 24 * 60 * 60 * 1000;

  return (
    <div
      className={`relative bg-white border rounded-xl overflow-hidden transition-all hover:shadow-md group ${
        win.featured ? 'border-amber-200 ring-1 ring-amber-100' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Featured glow strip */}
      {win.featured && (
        <div className="h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300" />
      )}

      <div className="p-4 space-y-3">
        {/* Header row */}
        <div className="flex items-start gap-3">
          {/* Badge */}
          <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border ${
            win.featured ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'
          }`}>
            <PixelBadge type={win.badge} size={18} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-gray-900 leading-tight">{win.title}</h3>
              {isNew && (
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-600 font-semibold uppercase tracking-wider">
                  NEW
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{win.description}</p>
          </div>

          {/* Points */}
          <div className="shrink-0 text-right">
            <div className="text-sm font-bold text-violet-600">+{win.points}</div>
            <div className="text-[9px] text-gray-400">pts</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-50">
          {/* Category + date */}
          <div className="flex items-center gap-2">
            <span className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${
              BADGE_BG[win.category]
            }`}>
              {CATEGORY_LABEL[win.category]}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">{win.date}</span>
          </div>

          {/* Reactions */}
          <button
            onClick={() => onReact(win.id)}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            className={`flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border transition-all ${
              pressed
                ? 'bg-rose-50 border-rose-200 text-rose-500 scale-95'
                : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-rose-200 hover:text-rose-400'
            }`}
          >
            <PixelHeart size={10} className={pressed ? 'text-rose-500' : 'text-gray-300'} />
            <span className={pressed ? 'text-rose-500' : ''}>{win.reactions + (pressed ? 1 : 0)}</span>
          </button>
        </div>
      </div>

      {/* Pixel decoration */}
      {win.featured && (
        <div className="absolute bottom-2 right-2 opacity-10">
          <PixelSparkle size={12} />
        </div>
      )}
    </div>
  );
}

// ─── Milestone Bar ────────────────────────────────────────────────────────────

function MilestoneBar({ milestone }: { milestone: Milestone }) {
  const pct = Math.round((milestone.count / milestone.total) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PixelBadge type={milestone.type} size={14} />
          <span className="text-xs font-medium text-gray-700">{milestone.label}</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-gray-900">{milestone.count}</span>
          <span className="text-[10px] text-gray-400"> / {milestone.total}</span>
        </div>
      </div>
      <div className="relative h-3 bg-gray-50 rounded overflow-hidden border border-gray-100">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-bold text-white drop-shadow-sm">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WinWallPage() {
  const [wins, setWins] = useState<Win[]>(INITIAL_WINS);
  const [filter, setFilter] = useState<WinCategory | 'all'>('all');
  const [tick, setTick] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const handleReact = (id: string) => {
    setWins(prev => prev.map(w => w.id === id ? { ...w, reactions: w.reactions + 1 } : w));
  };

  const filteredWins = filter === 'all' ? wins : wins.filter(w => w.category === filter);

  const totalPoints = wins.reduce((sum, w) => sum + w.points, 0);
  const featuredWins = wins.filter(w => w.featured);
  const categories: (WinCategory | 'all')[] = ['all', 'milestone', 'work', 'streak', 'habit', 'learning', 'health', 'personal'];

  return (
    <div className="max-w-5xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 8 8" className="text-white" shapeRendering="crispEdges">
              <rect x="2" y="0" width="4" height="1" fill="currentColor" />
              <rect x="1" y="1" width="6" height="2" fill="currentColor" />
              <rect x="0" y="3" width="8" height="3" fill="currentColor" opacity="0.8" />
              <rect x="1" y="6" width="6" height="1" fill="currentColor" opacity="0.5" />
              <rect x="3" y="3" width="2" height="2" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Win Wall</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Celebrate every win — big and small
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Points total */}
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
            <PixelStar size={12} className="text-amber-500" />
            <span className="text-sm font-bold text-amber-700">{totalPoints.toLocaleString()}</span>
            <span className="text-[10px] text-amber-500">lifetime pts</span>
          </div>
        </div>
      </div>

      {/* Milestone Progress */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {MILESTONES.map(m => (
          <MilestoneBar key={m.id} milestone={m} />
        ))}
      </div>

      {/* Featured Wins */}
      {featuredWins.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <PixelCrown size={12} className="text-yellow-500" />
            <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Featured Wins</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredWins.map(win => (
              <div key={win.id} className="relative">
                <WinCard win={win} onReact={handleReact} />
                <div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shadow-sm"
                  style={{
                    boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
                  }}
                >
                  <PixelCrown size={10} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Bar + Wins Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 px-1">
            <PixelSparkle size={12} className="text-violet-400" />
            <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">All Wins</h2>
            <span className="text-[10px] text-gray-400">({filteredWins.length})</span>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all font-medium ${
                  filter === cat
                    ? 'bg-violet-500 border-violet-500 text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-violet-200 hover:text-violet-500'
                }`}
              >
                {cat === 'all' ? 'All' : CATEGORY_LABEL[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Wins grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredWins.map(win => (
            <WinCard key={win.id} win={win} onReact={handleReact} />
          ))}
        </div>

        {filteredWins.length === 0 && (
          <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-xl">
            <PixelSparkle size={24} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No wins in this category yet</p>
            <p className="text-[11px] text-gray-300 mt-1">Keep going — your next win is waiting</p>
          </div>
        )}
      </div>

      {/* Pixel Art Footer */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-amber-400 rounded-sm"
            style={{ opacity: Math.sin(i * 0.8 + tick * 0.4) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Win Wall · Screen 49
      </p>
    </div>
  );
}