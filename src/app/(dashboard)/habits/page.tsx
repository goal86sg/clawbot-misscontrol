'use client';

import React, { useState } from 'react';
import { PixelCheck, PixelClock, PixelHeart, PixelSparkle } from '@/lib/pixel-icons';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Habit {
  id: string;
  name: string;
  icon: string;
  target: number;
  unit: string;
  color: string;
  history: { date: string; value: number }[];
}

interface DailyLog {
  date: string;
  mood: 'great' | 'good' | 'okay' | 'bad';
  energy: 1 | 2 | 3 | 4 | 5;
  notes: string;
}

// ─── Pixel Progress Bar ───────────────────────────────────────────────────────

function PixelFillBar({ value, max, height = 20, color = 'bg-blue-500' }: {
  value: number; max: number; height?: number; color?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const filled = Math.round((pct / 100) * height);
  return (
    <div className="flex flex-col-reverse gap-px">
      {Array.from({ length: height }, (_, r) => (
        <div
          key={r}
          className={`w-3.5 rounded-sm transition-colors ${r < filled ? color : 'bg-gray-100'}`}
        />
      ))}
    </div>
  );
}

// ─── Pixel Flame (streak) ─────────────────────────────────────────────────────

function PixelFlame({ size = 16 }: { size?: number }) {
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

// ─── Pixel Droplet (water) ────────────────────────────────────────────────────

function PixelDroplet({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="3" fill="currentColor" />
      <rect x="0" y="5" width="8" height="2" fill="currentColor" />
      <rect x="1" y="3" width="2" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

// ─── Pixel Moon (sleep) ───────────────────────────────────────────────────────

function PixelMoon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="5" height="5" fill="currentColor" opacity="0.5" />
      <rect x="2" y="0" width="2" height="1" fill="currentColor" />
      <rect x="0" y="2" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" />
      <rect x="5" y="3" width="1" height="1" fill="currentColor" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// ─── Pixel Footsteps (steps) ──────────────────────────────────────────────────

function PixelSteps({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-green-500" shapeRendering="crispEdges">
      <rect x="1" y="6" width="2" height="1" fill="currentColor" />
      <rect x="0" y="5" width="1" height="2" fill="currentColor" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="5" y="2" width="2" height="1" fill="currentColor" />
      <rect x="4" y="1" width="1" height="2" fill="currentColor" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// ─── Pixel Brain (focus/meditation) ──────────────────────────────────────────

function PixelBrain({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-500" shapeRendering="crispEdges">
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.3" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="3" width="1" height="1" fill="currentColor" />
      <rect x="5" y="3" width="1" height="1" fill="currentColor" />
      <rect x="3" y="4" width="2" height="1" fill="currentColor" />
      <rect x="1" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Pixel Sun (outdoor/sunlight) ────────────────────────────────────────────

function PixelSun({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-500" shapeRendering="crispEdges">
      <rect x="3" y="1" width="2" height="2" fill="currentColor" />
      <rect x="2" y="0" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="0" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Emoji Map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  droplet: <PixelDroplet size={16} />,
  moon: <PixelMoon size={16} />,
  steps: <PixelSteps size={16} />,
  brain: <PixelBrain size={16} />,
  sun: <PixelSun size={16} />,
  flame: <PixelFlame size={14} />,
  check: <PixelCheck size={14} className="text-green-500" />,
};

const moodEmoji: Record<string, string> = {
  great: '😄',
  good: '🙂',
  okay: '😐',
  bad: '😔',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return d.toLocaleDateString('en-US', { weekday: 'short' });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function computeStreak(history: { date: string; value: number }[], target: number): number {
  const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const entry = sorted.find(h => h.date === ds);
    if (entry && entry.value >= target) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

// ─── Generate fake history ───────────────────────────────────────────────────

function generateHistory(target: number, variance: number, completedPct: number): { date: string; value: number }[] {
  const result: { date: string; value: number }[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const base = Math.random() < completedPct ? target + (Math.random() - 0.5) * variance : Math.random() * target * 0.7;
    result.push({ date: ds, value: Math.round(base) });
  }
  return result;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HabitsPage() {
  const today = getTodayStr();

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 'water',
      name: 'Water',
      icon: 'droplet',
      target: 8,
      unit: 'glasses',
      color: 'bg-sky-400',
      history: generateHistory(8, 3, 0.75),
    },
    {
      id: 'sleep',
      name: 'Sleep',
      icon: 'moon',
      target: 7,
      unit: 'hours',
      color: 'bg-indigo-400',
      history: generateHistory(7, 2, 0.65),
    },
    {
      id: 'steps',
      name: 'Steps',
      icon: 'steps',
      target: 8000,
      unit: 'steps',
      color: 'bg-green-500',
      history: generateHistory(8000, 4000, 0.7),
    },
    {
      id: 'focus',
      name: 'Focus',
      icon: 'brain',
      target: 30,
      unit: 'mins',
      color: 'bg-purple-500',
      history: generateHistory(30, 20, 0.6),
    },
    {
      id: 'sun',
      name: 'Outdoor',
      icon: 'sun',
      target: 30,
      unit: 'mins',
      color: 'bg-yellow-500',
      history: generateHistory(30, 25, 0.55),
    },
  ]);

  const [log, setLog] = useState<DailyLog>({
    date: today,
    mood: 'good',
    energy: 3,
    notes: '',
  });

  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'log'>('today');

  const todayData = habits.map(h => {
    const entry = h.history.find(e => e.date === today);
    return {
      ...h,
      todayValue: entry?.value ?? 0,
      pct: Math.min(100, ((entry?.value ?? 0) / h.target) * 100),
    };
  });

  const completedToday = todayData.filter(h => h.todayValue >= h.target).length;

  // Week view: last 7 days
  const weekDays: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    weekDays.push(d.toISOString().slice(0, 10));
  }

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Habits</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {completedToday}/{habits.length} complete today
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Tab switcher */}
          <div className="flex items-center bg-gray-100 rounded-md p-0.5 gap-0.5">
            {(['today', 'week', 'log'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] px-3 py-1 rounded transition-colors font-medium uppercase tracking-wider ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Streak Banner */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 grid grid-cols-5 gap-4"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          {todayData.map((h, i) => (
            <div key={h.id} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {iconMap[h.icon]}
                <span className="text-[9px] text-gray-500">{h.name}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <PixelFlame size={10} />
                <span className="text-xs font-bold text-gray-900">{computeStreak(h.history, h.target)}</span>
                <span className="text-[9px] text-gray-400">d</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'today' && (
        <div className="space-y-3">
          {todayData.map(habit => {
            const done = habit.todayValue >= habit.target;
            return (
              <div key={habit.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  {/* Icon + fill bar */}
                  <div className="flex items-center gap-3 w-36 shrink-0">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${habit.color} bg-opacity-10`}
                      style={{ backgroundColor: `${habit.color.replace('bg-', '')}15` }}>
                      <span className={habit.color.replace('bg-', 'text-')}>{iconMap[habit.icon]}</span>
                    </div>
                    <PixelFillBar value={habit.todayValue} max={habit.target} height={20} color={habit.color.replace('bg-', 'bg-')} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{habit.name}</span>
                      {done && <PixelCheck size={12} className="text-green-500" />}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-500">
                        <span className={`font-bold ${done ? 'text-green-600' : 'text-gray-900'}`}>{habit.todayValue}</span>
                        <span className="text-gray-400"> / {habit.target} {habit.unit}</span>
                      </span>
                      <span className={`text-[10px] font-mono ${done ? 'text-green-600' : 'text-gray-400'}`}>
                        {Math.round(habit.pct)}%
                      </span>
                    </div>
                  </div>

                  {/* Quick adjust */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const newVal = Math.max(0, habit.todayValue - 1);
                        setHabits(prev => prev.map(h => h.id === habit.id ? {
                          ...h,
                          history: [...h.history.filter(e => e.date !== today), { date: today, value: newVal }]
                        } : h));
                      }}
                      className="w-7 h-7 rounded border border-gray-200 text-xs text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-xs font-mono font-bold text-gray-900 w-8 text-center">
                      {habit.todayValue}
                    </span>
                    <button
                      onClick={() => {
                        const newVal = habit.todayValue + 1;
                        setHabits(prev => prev.map(h => h.id === habit.id ? {
                          ...h,
                          history: [...h.history.filter(e => e.date !== today), { date: today, value: newVal }]
                        } : h));
                      }}
                      className="w-7 h-7 rounded border border-gray-200 text-xs text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Mini history sparkline (last 7 days) */}
                <div className="mt-3 flex items-center gap-1 h-8">
                  {weekDays.map(day => {
                    const entry = habit.history.find(h => h.date === day);
                    const val = entry?.value ?? 0;
                    const reached = val >= habit.target;
                    const barH = Math.max(2, Math.round((val / habit.target) * 24));
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                        <div
                          className={`w-full rounded-sm ${reached ? habit.color : 'bg-gray-100'}`}
                          style={{ height: `${barH}px` }}
                        />
                        <span className="text-[8px] text-gray-400">{getDayLabel(day)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'week' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Week header */}
          <div className="px-5 py-3 border-b border-gray-100 grid grid-cols-8 gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider col-span-1">Habit</div>
            {weekDays.map(day => (
              <div key={day} className="text-center">
                <span className="text-[9px] text-gray-400">{getDayLabel(day)}</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {habits.map(habit => (
              <div key={habit.id} className="px-5 py-3 grid grid-cols-8 gap-2 items-center hover:bg-gray-50/50">
                <div className="flex items-center gap-2 col-span-1">
                  <span className={habit.color.replace('bg-', 'text-')}>{iconMap[habit.icon]}</span>
                  <span className="text-xs font-medium text-gray-800">{habit.name}</span>
                </div>
                {weekDays.map(day => {
                  const entry = habit.history.find(h => h.date === day);
                  const val = entry?.value ?? 0;
                  const reached = val >= habit.target;
                  const pct = Math.min(100, (val / habit.target) * 100);
                  return (
                    <div key={day} className="flex flex-col items-center gap-0.5">
                      <div className={`text-[9px] font-mono font-bold ${reached ? 'text-green-600' : 'text-gray-500'}`}>
                        {val}
                      </div>
                      <div className="w-5 flex flex-col-reverse gap-px">
                        {Array.from({ length: 8 }, (_, r) => (
                          <div
                            key={r}
                            className={`w-full rounded-sm transition-colors ${r < Math.round((pct / 100) * 8) ? (reached ? habit.color : 'bg-blue-200') : 'bg-gray-50'}`}
                            style={{ height: '4px' }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-4">
            <span className="text-[9px] text-gray-400 uppercase tracking-wider">Legend:</span>
            {habits.map(h => (
              <div key={h.id} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-sm ${h.color}`} />
                <span className="text-[9px] text-gray-500">{h.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'log' && (
        <div className="max-w-lg space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Daily Check-in</h3>
            <p className="text-xs text-gray-500 mb-4">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>

            {/* Mood */}
            <div className="mb-4">
              <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 block">Mood</label>
              <div className="flex items-center gap-2">
                {(['great', 'good', 'okay', 'bad'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setLog(prev => ({ ...prev, mood: m }))}
                    className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                      log.mood === m ? 'border-blue-400 bg-blue-50 scale-110' : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    {moodEmoji[m]}
                  </button>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div className="mb-4">
              <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 block">Energy Level</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setLog(prev => ({ ...prev, energy: n as 1 | 2 | 3 | 4 | 5 }))}
                    className="w-8 h-8 rounded border transition-all flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: log.energy >= n ? (n >= 4 ? '#22c55e20' : n >= 2 ? '#3b82f620' : '#ef444420') : '#f9f9f9',
                      borderColor: log.energy >= n ? (n >= 4 ? '#22c55e' : n >= 2 ? '#3b82f6' : '#ef4444') : '#e5e7eb',
                      color: log.energy >= n ? (n >= 4 ? '#16a34a' : n >= 2 ? '#2563eb' : '#dc2626') : '#d1d5db',
                    }}
                  >
                    {n}
                  </button>
                ))}
                <span className="text-[9px] text-gray-400 ml-2">
                  {log.energy <= 2 ? 'Low' : log.energy <= 3 ? 'Medium' : 'High'}
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 block">Notes</label>
              <textarea
                value={log.notes}
                onChange={e => setLog(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="How's it going? Win, fail, lesson..."
                className="w-full text-xs border border-gray-200 rounded-md p-3 h-24 resize-none outline-none focus:border-gray-400 font-mono"
              />
            </div>

            <button className="text-xs bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Save Check-in
            </button>
          </div>

          {/* Weekly summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">This Week</h3>
            <div className="space-y-2">
              {todayData.map(h => {
                const weekVals = h.history.filter(e => weekDays.includes(e.date));
                const avg = weekVals.length ? Math.round(weekVals.reduce((s, e) => s + e.value, 0) / weekVals.length) : 0;
                const reached = weekVals.filter(e => e.value >= h.target).length;
                return (
                  <div key={h.id} className="flex items-center gap-3">
                    <span className="w-16 text-xs text-gray-600">{h.name}</span>
                    <div className="flex-1 bg-gray-50 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${h.color}`}
                        style={{ width: `${(reached / 7) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 w-24 text-right">
                      {reached}/7 days · avg {avg} {h.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}