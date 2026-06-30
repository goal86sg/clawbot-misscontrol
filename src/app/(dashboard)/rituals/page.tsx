'use client';

import React, { useState } from 'react';
import { PixelCheck, PixelSparkle, PixelClock, PixelHeart } from '@/lib/pixel-icons';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Ritual {
  id: string;
  name: string;
  icon: 'sun' | 'moon' | 'coffee' | 'book' | 'dumbbell' | 'meditate' | 'write' | 'stretch' | 'walk' | 'water';
  time: 'morning' | 'evening' | 'anytime';
  completed: boolean;
  streak: number;
  bestStreak: number;
  lastDone: string | null;
}

interface DayLog {
  date: string;
  completed: string[]; // ritual ids
  mood: 'great' | 'good' | 'okay' | 'bad' | null;
  notes: string;
}

// ─── Pixel Art Icons ───────────────────────────────────────────────────────────

function PixelSunrise({ size = 48, completed = false }: { size?: number; completed?: boolean }) {
  const color = completed ? '#fbbf24' : '#d1d5db';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="transition-colors" shapeRendering="crispEdges">
      {/* Horizon line */}
      <rect x="0" y="12" width="16" height="2" fill={completed ? '#86efac' : '#e5e7eb'} opacity="0.4" />
      {/* Sun rising */}
      <rect x="6" y="9" width="4" height="4" fill={color} opacity="0.3" />
      <rect x="5" y="8" width="6" height="2" fill={color} opacity="0.4" />
      <rect x="6" y="7" width="4" height="2" fill={color} />
      {/* Sun rays */}
      <rect x="7" y="4" width="2" height="2" fill={color} opacity="0.5" />
      <rect x="3" y="6" width="2" height="1" fill={color} opacity="0.4" />
      <rect x="11" y="6" width="2" height="1" fill={color} opacity="0.4" />
      <rect x="2" y="10" width="1" height="2" fill={color} opacity="0.3" />
      <rect x="13" y="10" width="1" height="2" fill={color} opacity="0.3" />
      {/* Hills */}
      <rect x="0" y="13" width="5" height="3" fill={completed ? '#4ade80' : '#d1d5db'} opacity="0.3" />
      <rect x="11" y="14" width="5" height="2" fill={completed ? '#22c55e' : '#d1d5db'} opacity="0.3" />
    </svg>
  );
}

function PixelMoonPhase({ size = 36, phase = 0 }: { size?: number; phase?: number }) {
  const phases = [
    { dark: 0, label: 'new' },
    { dark: 25, label: 'wax-cres' },
    { dark: 50, label: 'first-q' },
    { dark: 75, label: 'wax-gib' },
    { dark: 100, label: 'full' },
    { dark: 75, label: 'wan-gib' },
    { dark: 50, label: 'last-q' },
    { dark: 25, label: 'wan-cres' },
  ];
  const p = phases[phase % phases.length];
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-indigo-300">
      <rect x="0" y="0" width="8" height="8" fill="currentColor" opacity={p.dark / 200} />
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity={p.dark / 150} />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity={0.3} />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" opacity={0.5} />
    </svg>
  );
}

function PixelCoffee({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-600" shapeRendering="crispEdges">
      <rect x="1" y="2" width="5" height="5" fill="currentColor" opacity="0.3" />
      <rect x="2" y="1" width="4" height="2" fill="currentColor" />
      <rect x="0" y="3" width="1" height="3" fill="currentColor" opacity="0.4" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="7" y="4" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="2" y="0" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="4" y="0" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelBook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-600" shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.2" />
      <rect x="0" y="2" width="1" height="4" fill="currentColor" opacity="0.4" />
      <rect x="1" y="2" width="6" height="1" fill="currentColor" opacity="0.6" />
      <rect x="3" y="1" width="2" height="1" fill="currentColor" />
      <rect x="2" y="3" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelDumbbell({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="0" y="3" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      <rect x="6" y="3" width="2" height="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelMeditate({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-500" shapeRendering="crispEdges">
      <rect x="3" y="1" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="4" height="2" fill="currentColor" />
      <rect x="1" y="4" width="6" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="1" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelWrite({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-emerald-600" shapeRendering="crispEdges">
      <rect x="1" y="0" width="5" height="7" fill="currentColor" opacity="0.2" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.6" />
      <rect x="2" y="3" width="3" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="6" width="1" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelStretch({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-teal-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="4" width="2" height="2" fill="currentColor" />
      <rect x="2" y="6" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="1" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelWalk({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-green-600" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="1" width="2" height="2" fill="currentColor" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="5" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="5" width="1" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelWater({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-sky-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="1" width="4" height="2" fill="currentColor" opacity="0.4" />
      <rect x="1" y="3" width="6" height="3" fill="currentColor" opacity="0.5" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" />
      <rect x="3" y="4" width="2" height="1" fill="white" opacity="0.3" />
    </svg>
  );
}

function PixelFlame({ size = 12 }: { size?: number }) {
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

// ─── Ritual Item ───────────────────────────────────────────────────────────────

const iconMap = { sun: PixelSunrise, moon: PixelMoonPhase, coffee: PixelCoffee, book: PixelBook, dumbbell: PixelDumbbell, meditate: PixelMeditate, write: PixelWrite, stretch: PixelStretch, walk: PixelWalk, water: PixelWater };

function RitualItem({ ritual, onToggle }: { ritual: Ritual; onToggle: (id: string) => void }) {
  const Icon = iconMap[ritual.icon];
  return (
    <button
      onClick={() => onToggle(ritual.id)}
      className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
        ritual.completed
          ? 'border-green-300 bg-green-50 opacity-80'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {/* Pixel icon */}
      <div className="flex-shrink-0">
        <Icon size={36} completed={ritual.completed} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${ritual.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {ritual.name}
          </span>
          {ritual.completed && <PixelCheck size={12} className="text-green-500 flex-shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-gray-400 font-mono">{ritual.time}</span>
          {ritual.streak > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] text-orange-500 font-mono">
              <PixelFlame size={10} /> {ritual.streak}d
            </span>
          )}
          {ritual.bestStreak > 0 && (
            <span className="text-[10px] text-gray-300 font-mono">best: {ritual.bestStreak}</span>
          )}
        </div>
      </div>

      {/* Completion indicator */}
      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
        ritual.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
      }`}>
        {ritual.completed && <span className="text-white text-[10px]">✓</span>}
      </div>
    </button>
  );
}

// ─── Weekly Grid ──────────────────────────────────────────────────────────────

function WeekGrid({ logs }: { logs: DayLog[] }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const log = logs.find(l => l.date === dateStr);
        const isToday = dateStr === today.toISOString().split('T')[0];
        const completedCount = log?.completed.length ?? 0;

        return (
          <div key={day} className="flex flex-col items-center gap-1">
            <span className="text-[9px] text-gray-400 font-mono">{day}</span>
            <div
              className={`w-8 h-8 rounded border-2 flex items-center justify-center ${
                isToday ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <span className="text-[10px] font-mono text-gray-600">{d.getDate()}</span>
            </div>
            {/* Pixel fill dots */}
            <div className="flex gap-0.5 flex-wrap justify-center max-w-[40px]">
              {[0, 1, 2].map(level => (
                <div
                  key={level}
                  className="w-1.5 h-1.5 rounded-sm"
                  style={{
                    backgroundColor: completedCount >= (level + 1) * 3
                      ? '#22c55e'
                      : completedCount >= level * 3
                        ? '#86efac'
                        : '#f1f5f9',
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function RitualsPage() {
  const [rituals, setRituals] = useState<Ritual[]>([
    { id: '1', name: 'Morning stretch', icon: 'stretch', time: 'morning', completed: false, streak: 4, bestStreak: 12, lastDone: '2026-06-29' },
    { id: '2', name: 'Drink water', icon: 'water', time: 'morning', completed: true, streak: 7, bestStreak: 14, lastDone: '2026-06-30' },
    { id: '3', name: 'Journal entry', icon: 'write', time: 'morning', completed: false, streak: 2, bestStreak: 9, lastDone: '2026-06-28' },
    { id: '4', name: 'Meditate', icon: 'meditate', time: 'morning', completed: false, streak: 0, bestStreak: 21, lastDone: '2026-06-24' },
    { id: '5', name: 'Read 10 pages', icon: 'book', time: 'anytime', completed: true, streak: 6, bestStreak: 10, lastDone: '2026-06-30' },
    { id: '6', name: 'Evening walk', icon: 'walk', time: 'evening', completed: false, streak: 3, bestStreak: 8, lastDone: '2026-06-29' },
    { id: '7', name: 'Gratitude note', icon: 'write', time: 'evening', completed: false, streak: 1, bestStreak: 15, lastDone: '2026-06-29' },
    { id: '8', name: 'Workout', icon: 'dumbbell', time: 'anytime', completed: false, streak: 0, bestStreak: 30, lastDone: '2026-06-26' },
  ]);

  const [logs, setLogs] = useState<DayLog[]>([
    { date: '2026-06-24', completed: ['1', '2', '4', '5'], mood: 'great', notes: '' },
    { date: '2026-06-25', completed: ['1', '2', '4', '5', '6'], mood: 'good', notes: '' },
    { date: '2026-06-26', completed: ['1', '2', '5', '8'], mood: 'good', notes: '' },
    { date: '2026-06-27', completed: ['1', '2', '3', '5'], mood: 'okay', notes: '' },
    { date: '2026-06-28', completed: ['1', '2', '3', '5', '6'], mood: 'good', notes: '' },
    { date: '2026-06-29', completed: ['1', '2', '6', '7'], mood: 'good', notes: '' },
    { date: '2026-06-30', completed: ['2', '5'], mood: null, notes: '' },
  ]);

  const [moodFilter, setMoodFilter] = useState<'all' | 'great' | 'good' | 'okay'>('all');

  const today = new Date().toISOString().split('T')[0];
  const todayLog = logs.find(l => l.date === today);
  const todayCompleted = todayLog?.completed ?? [];
  const completedCount = rituals.filter(r => r.completed).length;
  const totalCount = rituals.length;
  const pctComplete = Math.round((completedCount / totalCount) * 100);

  const filteredRituals = rituals.filter(r => {
    if (moodFilter === 'all') return true;
    return true; // mood filter applies to logs view
  });

  const handleToggle = (id: string) => {
    setRituals(prev => prev.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
    const todayLogIdx = logs.findIndex(l => l.date === today);
    if (todayLogIdx >= 0) {
      setLogs(prev => prev.map((log, i) => {
        if (i !== todayLogIdx) return log;
        const has = log.completed.includes(id);
        return { ...log, completed: has ? log.completed.filter(c => c !== id) : [...log.completed, id] };
      }));
    } else {
      setLogs(prev => [...prev, { date: today, completed: [id], mood: null, notes: '' }]);
    }
  };

  const morningRituals = rituals.filter(r => r.time === 'morning');
  const eveningRituals = rituals.filter(r => r.time === 'evening');
  const anytimeRituals = rituals.filter(r => r.time === 'anytime');

  const overallStreak = Math.min(...rituals.map(r => r.streak));

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Daily Rituals</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'Asia/Singapore' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
            <PixelClock size={12} />
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' })}</span>
          </div>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Today&apos;s progress</span>
          <span className="text-xs font-mono text-gray-700">{completedCount}/{totalCount} ({pctComplete}%)</span>
        </div>
        {/* Pixel fill bar */}
        <div className="flex gap-0.5 h-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-colors"
              style={{ backgroundColor: i < Math.round((pctComplete / 100) * 20) ? (pctComplete === 100 ? '#22c55e' : '#3b82f6') : '#f1f5f9' }}
            />
          ))}
        </div>
        {pctComplete === 100 && (
          <div className="flex items-center gap-1 mt-2 text-green-600">
            <PixelSparkle size={12} />
            <span className="text-xs font-medium">All rituals complete! 🌟</span>
          </div>
        )}
      </div>

      {/* Week Overview */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
        <h2 className="text-xs font-medium text-gray-500 mb-3">This Week</h2>
        <WeekGrid logs={logs} />
      </div>

      {/* Morning Rituals */}
      {morningRituals.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PixelSunrise size={20} completed={morningRituals.every(r => r.completed)} />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Morning</h2>
          </div>
          <div className="space-y-1.5">
            {morningRituals.map(r => (
              <RitualItem key={r.id} ritual={r} onToggle={handleToggle} />
            ))}
          </div>
        </div>
      )}

      {/* Anytime Rituals */}
      {anytimeRituals.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PixelCoffee size={16} />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Anytime</h2>
          </div>
          <div className="space-y-1.5">
            {anytimeRituals.map(r => (
              <RitualItem key={r.id} ritual={r} onToggle={handleToggle} />
            ))}
          </div>
        </div>
      )}

      {/* Evening Rituals */}
      {eveningRituals.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PixelMoonPhase size={20} phase={Math.floor(new Date().getDate() % 8)} />
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Evening</h2>
          </div>
          <div className="space-y-1.5">
            {eveningRituals.map(r => (
              <RitualItem key={r.id} ritual={r} onToggle={handleToggle} />
            ))}
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="text-center py-2">
        <p className="text-[10px] text-gray-400">
          {overallStreak > 0 ? `Your shortest streak is ${overallStreak} day${overallStreak !== 1 ? 's' : ''} — keep going!` : 'Start a streak today!'}
        </p>
      </div>
    </div>
  );
}
