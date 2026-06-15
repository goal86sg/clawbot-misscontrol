'use client';

import React, { useState, useEffect } from 'react';
import { PixelSparkle, PixelCheck } from '@/lib/pixel-icons';
import { PixelHabits } from '@/lib/pixel-icons-extra';

// ─── Pixel Art Ritual Icons ───────────────────────────────────────────────────

function PixelSun({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.6" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="1" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="6" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelMoon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-400" shapeRendering="crispEdges">
      <rect x="2" y="1" width="5" height="5" fill="currentColor" opacity="0.2" />
      <rect x="3" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="4" y="3" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="5" y="4" width="2" height="2" fill="currentColor" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="7" y="3" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="6" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelWater({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-cyan-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
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

function PixelDumbbell({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-400" shapeRendering="crispEdges">
      <rect x="0" y="3" width="1" height="2" fill="currentColor" />
      <rect x="1" y="2" width="1" height="4" fill="currentColor" opacity="0.6" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" />
      <rect x="6" y="2" width="1" height="4" fill="currentColor" opacity="0.6" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelPencil({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-emerald-400" shapeRendering="crispEdges">
      <rect x="5" y="0" width="2" height="1" fill="currentColor" />
      <rect x="4" y="1" width="3" height="1" fill="currentColor" />
      <rect x="2" y="3" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="0" y="5" width="2" height="3" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="1" height="1" fill="white" opacity="0.3" />
    </svg>
  );
}

function PixelBook({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.15" />
      <rect x="0" y="0" width="2" height="8" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="4" width="3" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelBed({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-slate-400" shapeRendering="crispEdges">
      <rect x="0" y="4" width="8" height="2" fill="currentColor" opacity="0.2" />
      <rect x="0" y="2" width="2" height="4" fill="currentColor" opacity="0.3" />
      <rect x="2" y="3" width="4" height="3" fill="currentColor" opacity="0.15" />
      <rect x="6" y="3" width="2" height="3" fill="currentColor" opacity="0.1" />
      <rect x="0" y="6" width="1" height="2" fill="currentColor" opacity="0.2" />
      <rect x="7" y="6" width="1" height="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelMeditate({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-violet-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="2" fill="currentColor" />
      <rect x="2" y="2" width="4" height="3" fill="currentColor" opacity="0.5" />
      <rect x="1" y="5" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="5" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="2" y="7" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="7" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelChecklist({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-teal-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="7" fill="currentColor" opacity="0.1" />
      <rect x="1" y="0" width="6" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" />
      <rect x="4" y="2" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" />
      <rect x="4" y="4" width="3" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" />
      <rect x="4" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelFlame({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelStar({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
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

// ─── Types ────────────────────────────────────────────────────────────────────

type RitualCategory = 'morning' | 'evening';

interface Ritual {
  id: string;
  label: string;
  description: string;
  category: RitualCategory;
  icon: React.ReactNode;
  streak: number; // current streak in days
  bestStreak: number;
  color: string;
}

interface DayCompletion {
  date: string; // YYYY-MM-DD
  completed: string[]; // ritual ids
  score: number; // percentage
}

interface WeeklyData {
  label: string;
  date: string;
  score: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RITUALS: Ritual[] = [
  {
    id: 'wake-early',
    label: 'Wake by 6:30am',
    description: 'No snooze. Out of bed within 5 minutes of alarm',
    category: 'morning',
    icon: <PixelSun size={20} />,
    streak: 12,
    bestStreak: 21,
    color: 'text-amber-500',
  },
  {
    id: 'hydrate',
    label: 'Hydrate first',
    description: '500ml water before coffee or breakfast',
    category: 'morning',
    icon: <PixelWater size={18} />,
    streak: 8,
    bestStreak: 15,
    color: 'text-cyan-500',
  },
  {
    id: 'exercise',
    label: 'Exercise 30 min',
    description: 'Gym, run, yoga, or home workout',
    category: 'morning',
    icon: <PixelDumbbell size={18} />,
    streak: 5,
    bestStreak: 12,
    color: 'text-orange-500',
  },
  {
    id: 'meditate',
    label: 'Meditate 10 min',
    description: 'Morning mindfulness or breathing exercise',
    category: 'morning',
    icon: <PixelMeditate size={18} />,
    streak: 14,
    bestStreak: 30,
    color: 'text-violet-500',
  },
  {
    id: 'plan-day',
    label: 'Plan the day',
    description: 'Review calendar, set 3 priorities, clear inbox',
    category: 'morning',
    icon: <PixelChecklist size={18} />,
    streak: 6,
    bestStreak: 18,
    color: 'text-teal-500',
  },
  {
    id: 'journal-am',
    label: 'Morning journal',
    description: 'Gratitude, intentions, or stream of consciousness',
    category: 'morning',
    icon: <PixelPencil size={16} />,
    streak: 3,
    bestStreak: 9,
    color: 'text-emerald-500',
  },
  {
    id: 'reflect',
    label: 'Evening reflection',
    description: 'What went well? What could improve? Key learnings',
    category: 'evening',
    icon: <PixelMoon size={18} />,
    streak: 7,
    bestStreak: 14,
    color: 'text-indigo-500',
  },
  {
    id: 'journal-pm',
    label: 'Evening journal',
    description: 'Day recap, wins, lessons, tomorrow prep notes',
    category: 'evening',
    icon: <PixelPencil size={16} />,
    streak: 4,
    bestStreak: 11,
    color: 'text-emerald-500',
  },
  {
    id: 'read',
    label: 'Read 20 min',
    description: 'Books, articles, or technical reading before bed',
    category: 'evening',
    icon: <PixelBook size={16} />,
    streak: 9,
    bestStreak: 20,
    color: 'text-blue-500',
  },
  {
    id: 'wind-down',
    label: 'Wind down by 10pm',
    description: 'Screens off, dim lights, prepare for sleep',
    category: 'evening',
    icon: <PixelBed size={18} />,
    streak: 2,
    bestStreak: 8,
    color: 'text-slate-500',
  },
];

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Seed today's completion (some done, some not)
const todayCompleted = new Set(['wake-early', 'hydrate', 'meditate', 'plan-day', 'reflect', 'read']);

// Past 7 days
const weeklyData: WeeklyData[] = [
  { label: 'Mon', date: '2026-06-09', score: 80 },
  { label: 'Tue', date: '2026-06-10', score: 100 },
  { label: 'Wed', date: '2026-06-11', score: 70 },
  { label: 'Thu', date: '2026-06-12', score: 90 },
  { label: 'Fri', date: '2026-06-13', score: 60 },
  { label: 'Sat', date: '2026-06-14', score: 85 },
  { label: 'Today', date: todayKey(), score: Math.round((todayCompleted.size / RITUALS.length) * 100) },
];

// ─── Pixel Week Heatmap ───────────────────────────────────────────────────────

function PixelWeekHeatmap({ data }: { data: WeeklyData[] }) {
  const maxScore = 100;
  return (
    <div className="flex items-end gap-2">
      {data.map((d, i) => {
        const filled = Math.round((d.score / maxScore) * 14);
        const color =
          d.score >= 80 ? '#22c55e' :
          d.score >= 60 ? '#eab308' :
          d.score >= 40 ? '#f97316' :
          '#ef4444';
        return (
          <div key={d.date} className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-[9px] font-mono text-gray-500">{d.score}%</span>
            <div className="flex flex-col-reverse gap-px w-full">
              {Array.from({ length: 14 }, (_, r) => (
                <div
                  key={r}
                  className="w-full rounded-sm transition-colors"
                  style={{ height: 4, backgroundColor: r < filled ? color : '#f1f5f9' }}
                />
              ))}
            </div>
            <span className={`text-[9px] font-medium ${d.label === 'Today' ? 'text-gray-900' : 'text-gray-400'}`}>
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Streak Badge ─────────────────────────────────────────────────────────────

function StreakBadge({ streak, best, colorClass }: { streak: number; best: number; colorClass: string }) {
  const isBest = streak >= best;
  return (
    <div className="flex items-center gap-1">
      <PixelFlame size={10} />
      <span className={`text-[11px] font-mono font-bold ${colorClass}`}>{streak}</span>
      {isBest && streak > 1 && (
        <PixelStar size={9} />
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RitualsPage() {
  const [completed, setCompleted] = useState<Set<string>>(todayCompleted);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1500);
    return () => clearInterval(id);
  }, []);

  const morningRituals = RITUALS.filter(r => r.category === 'morning');
  const eveningRituals = RITUALS.filter(r => r.category === 'evening');

  const todayScore = Math.round((completed.size / RITUALS.length) * 100);
  const morningDone = morningRituals.filter(r => completed.has(r.id)).length;
  const eveningDone = eveningRituals.filter(r => completed.has(r.id)).length;

  const overallStreak = Math.min(...RITUALS.map(r => r.streak));
  const longestStreak = Math.max(...RITUALS.map(r => r.bestStreak));

  const toggleRitual = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sparkles = ['✦', '✧', '⋆', '✶'];
  const animSparkle = sparkles[tick % 4];

  const RitualRow = ({ ritual }: { ritual: Ritual }) => {
    const isDone = completed.has(ritual.id);
    return (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer group ${
          isDone ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
        }`}
        onClick={() => toggleRitual(ritual.id)}
      >
        {/* Completion checkbox */}
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
            isDone
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 group-hover:border-gray-400'
          }`}
        >
          {isDone && <PixelCheck size={10} className="text-white" />}
        </div>

        {/* Icon */}
        <div className={`shrink-0 ${isDone ? 'opacity-50' : ''}`}>
          {ritual.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${isDone ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
            {ritual.label}
          </p>
          <p className={`text-[9px] mt-0.5 ${isDone ? 'text-gray-300' : 'text-gray-400'}`}>
            {ritual.description}
          </p>
        </div>

        {/* Streak */}
        <div className="shrink-0">
          <StreakBadge streak={ritual.streak} best={ritual.bestStreak} colorClass={isDone ? 'text-gray-400' : ritual.color.replace('text-', 'text-')} />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Rituals</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Build atomic habits · track streaks · compound over time
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Today's score */}
          <div className={`text-2xl font-bold font-mono ${todayScore >= 80 ? 'text-green-600' : todayScore >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
            {todayScore}%
          </div>
          <div className="text-[10px] text-gray-400 text-right leading-tight">
            <div>Today&apos;s Score</div>
            <div>{completed.size}/{RITUALS.length} done</div>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelSun size={16} />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Morning</p>
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-1 font-mono">
            {morningDone}<span className="text-sm text-amber-300">/{morningRituals.length}</span>
          </p>
          <p className="text-[9px] text-gray-400 mt-0.5">rituals complete</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelMoon size={16} />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Evening</p>
          </div>
          <p className="text-2xl font-bold text-indigo-600 mt-1 font-mono">
            {eveningDone}<span className="text-sm text-indigo-300">/{eveningRituals.length}</span>
          </p>
          <p className="text-[9px] text-gray-400 mt-0.5">rituals complete</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelFlame size={14} />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Overall Streak</p>
          </div>
          <p className="text-2xl font-bold text-orange-500 mt-1 font-mono">
            {overallStreak}<span className="text-sm text-orange-300">days</span>
          </p>
          <p className="text-[9px] text-gray-400 mt-0.5">minimum ritual streak</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelStar size={14} />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Best Ever</p>
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-1 font-mono">
            {longestStreak}<span className="text-sm text-yellow-300">days</span>
          </p>
          <p className="text-[9px] text-gray-400 mt-0.5">personal best streak</p>
        </div>
      </div>

      {/* Weekly Heatmap */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div
          className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {animSparkle} Weekly Completion Rate
            </h2>
            <div className="flex items-center gap-3 text-[9px] text-gray-400">
              <span>Low → High:</span>
              <div className="flex gap-0.5">
                {['#ef4444', '#f97316', '#eab308', '#22c55e'].map(c => (
                  <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-5">
          <PixelWeekHeatmap data={weeklyData} />
        </div>
      </div>

      {/* Morning + Evening Rituals */}
      <div className="grid grid-cols-2 gap-5">
        {/* Morning */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PixelSun size={16} />
            <h2 className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Morning Rituals</h2>
            <span className="text-[10px] font-mono text-gray-400 ml-auto">
              {morningDone}/{morningRituals.length}
            </span>
          </div>
          <div className="space-y-2">
            {morningRituals.map(r => (
              <RitualRow key={r.id} ritual={r} />
            ))}
          </div>
        </div>

        {/* Evening */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PixelMoon size={16} />
            <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Evening Rituals</h2>
            <span className="text-[10px] font-mono text-gray-400 ml-auto">
              {eveningDone}/{eveningRituals.length}
            </span>
          </div>
          <div className="space-y-2">
            {eveningRituals.map(r => (
              <RitualRow key={r.id} ritual={r} />
            ))}
          </div>
        </div>
      </div>

      {/* All-time Streak Champions */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div
          className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
        >
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Streak Champions</h2>
        </div>
        <div className="px-5 py-4 grid grid-cols-5 gap-3">
          {RITUALS.sort((a, b) => b.streak - a.streak).slice(0, 5).map((ritual, i) => (
            <div key={ritual.id} className="text-center">
              <div className="text-2xl mb-1">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </div>
              <div className="flex justify-center mb-1">{ritual.icon}</div>
              <p className="text-[10px] font-medium text-gray-800 truncate">{ritual.label}</p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                <PixelFlame size={9} />
                <span className="text-[11px] font-bold font-mono text-orange-500">{ritual.streak}</span>
              </div>
              <p className="text-[8px] text-gray-400">best: {ritual.bestStreak}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy footer */}
      <div className="flex items-center gap-2 justify-center">
        <PixelSparkle size={10} className="text-gray-300" />
        <p className="text-[9px] text-gray-300 font-mono text-center">
          Compound growth · Atomic habits · &quot;You do not rise to the level of your goals. You fall to the level of your systems.&quot; — James Clear
        </p>
        <PixelSparkle size={10} className="text-gray-300" />
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Rituals · Screen 50 · Des_bot
      </p>
    </div>
  );
}