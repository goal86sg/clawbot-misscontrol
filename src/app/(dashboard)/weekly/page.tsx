'use client';

import React, { useState, useEffect } from 'react';
import { PixelClock, PixelCheck, PixelSparkle, PixelHeart, PixelSunset } from '@/lib/pixel-icons';
import { PixelProgress } from '@/components/PixelProgress';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DayData {
  date: string;
  label: string;
  energy: number;
  mood: number;
  tasksDone: number;
  tasksTotal: number;
  focusMinutes: number;
  steps: number;
}

interface WeeklyData {
  weekNumber: number;
  startDate: string;
  endDate: string;
  year: number;
  days: DayData[];
  wins: string[];
  lessons: string[];
  grateful: string[];
  nextWeek: string[];
  focus: { totalMinutes: number; sessions: number; bestDay: string; deepFocusHours: number };
  income: { amount: number; currency: string; streams: number };
  spending: { amount: number; currency: string; topCategory: string };
  health: { totalSteps: number; avgSleep: number; totalWater: number; workouts: number };
  reading: { pagesRead: number; booksFinished: number; currentlyReading: string };
}

// ─── Generate mock week data ──────────────────────────────────────────────────

function generateWeekData(): WeeklyData {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const days: DayData[] = [];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Realistic data: Mon-Fri have tasks, weekends less
  const taskPattern = [2, 7, 9, 6, 8, 5, 1]; // Sun through Sat
  const energyPattern = [60, 78, 82, 75, 88, 70, 55];
  const moodPattern = [65, 80, 85, 72, 88, 75, 60];
  const focusPattern = [0, 120, 90, 150, 80, 45, 0];
  const stepsPattern = [2100, 6200, 8100, 5400, 9200, 3800, 3200];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const isToday = dateStr === now.toISOString().slice(0, 10);
    const total = taskPattern[i];

    days.push({
      date: dateStr,
      label: dayLabels[i],
      energy: energyPattern[i],
      mood: moodPattern[i],
      tasksDone: isToday ? Math.min(taskPattern[i], Math.round(taskPattern[i] * 0.7)) : taskPattern[i],
      tasksTotal: total,
      focusMinutes: focusPattern[i],
      steps: stepsPattern[i],
    });
  }

  const weekNum = Math.ceil((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 604800000);

  return {
    weekNumber: weekNum,
    startDate: days[0].date,
    endDate: days[6].date,
    year: now.getFullYear(),
    days,
    wins: [
      'Shipped the Daily Briefing screen ahead of schedule',
      'Resolved the Docker container memory leak on staging',
      'eBPF architecture review completed with positive feedback',
      'Ran 42km across the week — new weekly record',
      'Got positive feedback on the Mission Control UI from two colleagues',
    ],
    lessons: [
      'Should have started the eBPF review earlier in the week — rushed Thursday',
      'Need to batch more meetings — context switching killed focus Tuesday afternoon',
      'Thursday energy crash was from poor sleep — need to protect sleep window before big days',
    ],
    grateful: [
      'The morning coffee at The Pogg was perfect every day this week',
      'Guarddog caught a misconfigured SSH rule before it caused issues',
      'Finished the week without any P0 incidents',
      'Two colleagues offered help on the sovereign cloud demo without being asked',
    ],
    nextWeek: [
      'Start eBPF integration tests — blocked until Monday PM',
      'Write PostgreSQL DAM probe placement strategy doc',
      'Prepare sovereign cloud demo for Thursday stakeholder review',
      'Morning focus block every day — protect 9-11am window',
    ],
    focus: {
      totalMinutes: days.reduce((s, d) => s + d.focusMinutes, 0),
      sessions: Math.round(days.reduce((s, d) => s + d.focusMinutes, 0) / 25),
      bestDay: days.reduce((best, d) => d.focusMinutes > best.focusMinutes ? d : best, days[0]).label,
      deepFocusHours: Math.round(days.reduce((s, d) => s + d.focusMinutes, 0) / 60 * 10) / 10,
    },
    income: { amount: 842.50, currency: 'SGD', streams: 5 },
    spending: { amount: 387.20, currency: 'SGD', topCategory: 'Food & Dining' },
    health: {
      totalSteps: days.reduce((s, d) => s + d.steps, 0),
      avgSleep: 7.2,
      totalWater: 14700,
      workouts: 4,
    },
    reading: {
      pagesRead: 87,
      booksFinished: 0,
      currentlyReading: 'Designing Data-Intensive Applications',
    },
  };
}

// ─── Pixel Icons ───────────────────────────────────────────────────────────────

function PixelWeeklyIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      {/* Calendar / week view */}
      <rect x="0" y="1" width="8" height="7" fill="currentColor" opacity="0.1" />
      <rect x="0" y="1" width="8" height="2" fill="currentColor" opacity="0.3" />
      <rect x="0" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="6" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      {/* Day columns */}
      <rect x="0" y="3" width="1" height="4" fill="currentColor" opacity="0.3" />
      <rect x="2" y="3" width="1" height="4" fill="currentColor" opacity="0.5" />
      <rect x="4" y="3" width="1" height="4" fill="currentColor" opacity="0.5" />
      <rect x="6" y="3" width="1" height="4" fill="currentColor" opacity="0.3" />
      {/* Checkmarks */}
      <rect x="0" y="5" width="1" height="1" fill="currentColor" opacity="0.8" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" />
      <rect x="6" y="4" width="1" height="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function PixelTrendUp({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-green-500" shapeRendering="crispEdges">
      <rect x="0" y="6" width="2" height="1" fill="currentColor" />
      <rect x="2" y="4" width="2" height="2" fill="currentColor" />
      <rect x="4" y="2" width="2" height="2" fill="currentColor" />
      <rect x="6" y="0" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelTrendDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-red-400" shapeRendering="crispEdges">
      <rect x="0" y="0" width="2" height="2" fill="currentColor" />
      <rect x="2" y="2" width="2" height="2" fill="currentColor" />
      <rect x="4" y="4" width="2" height="2" fill="currentColor" />
      <rect x="6" y="6" width="2" height="2" fill="currentColor" />
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
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function PixelMoon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="5" height="5" fill="currentColor" opacity="0.4" />
      <rect x="2" y="0" width="2" height="1" fill="currentColor" />
      <rect x="0" y="2" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" />
      <rect x="5" y="3" width="1" height="1" fill="currentColor" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Mini Sparkline ────────────────────────────────────────────────────────────

function Sparkline({ values, color = '#3b82f6', height = 24 }: { values: number[]; color?: string; height?: number }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 64;
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * w,
    y: height - ((v - min) / range) * height,
  }));

  return (
    <svg width={w + 4} height={height + 4} viewBox="-2 -2 68 28" shapeRendering="crispEdges">
      {pts.slice(0, -1).map((p, i) => {
        const next = pts[i + 1];
        const dx = next.x - p.x;
        const dy = next.y - p.y;
        const steps = Math.max(Math.abs(dx), Math.abs(dy));
        return Array.from({ length: steps }, (_, s) => {
          const t = s / steps;
          const x = Math.round(p.x + dx * t);
          const y = Math.round(p.y + dy * t);
          return <rect key={`${i}-${s}`} x={x} y={y} width="1" height="1" fill={color} opacity={0.4 + s * 0.05} />;
        });
      })}
      {pts.map((p, i) => (
        <rect key={i} x={p.x - 1} y={p.y - 1} width="3" height="3" fill={color} opacity={i === pts.length - 1 ? 1 : 0.5} />
      ))}
    </svg>
  );
}

// ─── Task Heatmap Cell ────────────────────────────────────────────────────────

function HeatCell({ done, total, label }: { done: number; total: number; label: string }) {
  const pct = total > 0 ? done / total : 0;
  const color = pct === 1 ? 'bg-green-400' : pct >= 0.7 ? 'bg-blue-400' : pct >= 0.4 ? 'bg-yellow-400' : 'bg-gray-200';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-mono font-bold ${color}`}
        title={`${done}/${total} tasks`}>
        {done}
      </div>
      <span className="text-[8px] text-gray-400">{label}</span>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────

function SectionHeader({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{label}</h3>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function WeeklyPage() {
  const [tick, setTick] = useState(0);
  const [data] = useState<WeeklyData>(generateWeekData);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const totalTasksDone = data.days.reduce((s, d) => s + d.tasksDone, 0);
  const totalTasks = data.days.reduce((s, d) => s + d.tasksTotal, 0);
  const taskPct = Math.round((totalTasksDone / totalTasks) * 100);
  const avgEnergy = Math.round(data.days.reduce((s, d) => s + d.energy, 0) / 7);
  const avgMood = Math.round(data.days.reduce((s, d) => s + d.mood, 0) / 7);
  const energyTrend = data.days[6].energy - data.days[0].energy;
  const moodTrend = data.days[6].mood - data.days[0].mood;

  const startLabel = new Date(data.startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endLabel = new Date(data.endDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <PixelWeeklyIcon size={24} className="text-indigo-500" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Weekly Review</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Week {data.weekNumber} of {data.year} · {startLabel} – {endLabel}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
            <PixelClock size={12} />
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' })}</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Week {data.weekNumber} complete
          </div>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 rounded-lg px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <PixelWeeklyIcon size={16} className="text-indigo-400" />
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Tasks</span>
            <span className="text-lg font-bold font-mono text-gray-900">{totalTasksDone}<span className="text-xs text-gray-400">/{totalTasks}</span></span>
          </div>
          <div className="w-px h-6 bg-indigo-200" />
          <div className="flex items-center gap-2">
            <PixelHeart size={14} className="text-red-400" />
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Avg Energy</span>
            <span className="text-lg font-bold font-mono text-gray-900">{avgEnergy}<span className="text-xs text-gray-400">%</span></span>
            {energyTrend !== 0 && (
              energyTrend > 0 ? <PixelTrendUp size={12} /> : <PixelTrendDown size={12} />
            )}
          </div>
          <div className="w-px h-6 bg-indigo-200" />
          <div className="flex items-center gap-2">
            <PixelMoon size={14} />
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Avg Mood</span>
            <span className="text-lg font-bold font-mono text-gray-900">{avgMood}<span className="text-xs text-gray-400">%</span></span>
            {moodTrend !== 0 && (
              moodTrend > 0 ? <PixelTrendUp size={12} /> : <PixelTrendDown size={12} />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PixelFire size={14} />
          <span className="text-[10px] font-mono text-orange-600 font-semibold">{data.focus.totalMinutes} min focus</span>
          <span className="text-[9px] text-gray-400">· best: {data.focus.bestDay}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          {/* Energy & Mood Trends */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Energy & Mood" icon={<PixelHeart size={12} className="text-red-400" />} />
            </div>
            <div className="px-4 py-3 space-y-4">
              {/* Energy trend */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest">Energy</span>
                  <span className="text-[10px] font-mono text-gray-600">{avgEnergy}% avg</span>
                </div>
                <div className="flex items-end gap-2">
                  <Sparkline values={data.days.map(d => d.energy)} color="#ef4444" height={28} />
                  <div className="flex gap-1">
                    {data.days.map(d => (
                      <div key={d.date} className="flex flex-col items-center gap-0.5">
                        <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-[8px] font-mono font-bold ${
                          d.energy > 70 ? 'bg-red-100 text-red-600' : d.energy > 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {d.energy}
                        </div>
                        <span className="text-[7px] text-gray-300">{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mood trend */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest">Mood</span>
                  <span className="text-[10px] font-mono text-gray-600">{avgMood}% avg</span>
                </div>
                <div className="flex items-end gap-2">
                  <Sparkline values={data.days.map(d => d.mood)} color="#8b5cf6" height={28} />
                  <div className="flex gap-1">
                    {data.days.map(d => (
                      <div key={d.date} className="flex flex-col items-center gap-0.5">
                        <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-[8px] font-mono font-bold ${
                          d.mood > 70 ? 'bg-purple-100 text-purple-600' : d.mood > 40 ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {d.mood}
                        </div>
                        <span className="text-[7px] text-gray-300">{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Recap */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Focus Recap" icon={<PixelSparkle size={12} className="text-yellow-500" />} />
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest">Total Minutes</p>
                  <p className="text-xl font-bold font-mono text-indigo-600 mt-0.5">{data.focus.totalMinutes}<span className="text-xs text-gray-400">min</span></p>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest">Sessions</p>
                  <p className="text-xl font-bold font-mono text-blue-600 mt-0.5">{data.focus.sessions}</p>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest">Deep Focus</p>
                  <p className="text-xl font-bold font-mono text-purple-600 mt-0.5">{data.focus.deepFocusHours}<span className="text-xs text-gray-400">h</span></p>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest">Best Day</p>
                  <p className="text-xl font-bold font-mono text-orange-600 mt-0.5">{data.focus.bestDay}</p>
                </div>
              </div>

              {/* Focus heatmap by day */}
              <div>
                <p className="text-[9px] text-gray-400 mb-2">Daily focus minutes</p>
                <div className="flex items-end gap-1 h-12">
                  {data.days.map(d => {
                    const maxMin = Math.max(...data.days.map(dd => dd.focusMinutes));
                    const h = maxMin > 0 ? Math.round((d.focusMinutes / maxMin) * 44) : 2;
                    return (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="w-full bg-indigo-100 rounded-sm" style={{ height: `${Math.max(2, h)}px` }}>
                          {d.focusMinutes > 0 && (
                            <div className="w-full bg-indigo-400 rounded-sm" style={{ height: '100%' }} />
                          )}
                        </div>
                        <span className="text-[7px] text-gray-400">{d.label}</span>
                        <span className="text-[7px] font-mono text-gray-500">{d.focusMinutes > 0 ? `${d.focusMinutes}m` : '—'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle column */}
        <div className="space-y-4">
          {/* Task Heatmap */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Task Completion" icon={<PixelCheck size={12} className="text-green-500" />} />
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-gray-600 font-medium">
                  {totalTasksDone} of {totalTasks} tasks completed
                </span>
                <span className="text-[10px] font-mono font-bold" style={{ color: taskPct >= 70 ? '#22c55e' : taskPct >= 40 ? '#eab308' : '#6b7280' }}>
                  {taskPct}%
                </span>
              </div>
              <div className="flex justify-center gap-2 mb-4">
                {data.days.map(d => (
                  <HeatCell key={d.date} done={d.tasksDone} total={d.tasksTotal} label={d.label} />
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex flex-col-reverse gap-px" style={{ height: 12 }}>
                {Array.from({ length: 12 }, (_, r) => (
                  <div
                    key={r}
                    className={`w-full rounded-sm ${r < Math.round((taskPct / 100) * 12) ? 'bg-green-400' : 'bg-gray-100'}`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-green-400" />
                  <span className="text-[8px] text-gray-400">All done</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-blue-400" />
                  <span className="text-[8px] text-gray-400">70%+</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-yellow-400" />
                  <span className="text-[8px] text-gray-400">40-70%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-gray-200" />
                  <span className="text-[8px] text-gray-400">&lt;40%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wins */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Wins This Week" icon={<PixelSparkle size={12} className="text-yellow-500" />} />
            </div>
            <div className="px-4 py-3 space-y-2">
              {data.wins.map((win, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-yellow-500 shrink-0 mt-0.5">✦</span>
                  <span className="text-[11px] text-gray-700 leading-tight">{win}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Lessons" icon={<span className="text-xs">📝</span>} />
            </div>
            <div className="px-4 py-3 space-y-2">
              {data.lessons.map((lesson, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 shrink-0 mt-0.5">→</span>
                  <span className="text-[11px] text-gray-700 leading-tight">{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Health Summary */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Health" icon={<PixelHeart size={12} className="text-red-400" />} />
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Total Steps</span>
                <span className="text-[11px] font-mono font-bold text-gray-900">{data.health.totalSteps.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Avg Sleep</span>
                <span className="text-[11px] font-mono font-bold text-indigo-600">{data.health.avgSleep}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Total Water</span>
                <span className="text-[11px] font-mono font-bold text-sky-600">{data.health.totalWater}ml</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Workouts</span>
                <span className="text-[11px] font-mono font-bold text-green-600">{data.health.workouts}</span>
              </div>
            </div>
          </div>

          {/* Financial Snapshot */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Finance" icon={<span className="text-xs">💰</span>} />
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Income</span>
                <span className="text-[11px] font-mono font-bold text-green-600">+{data.income.currency} {data.income.amount.toFixed(2)}</span>
              </div>
              <div className="text-[9px] text-gray-400 ml-auto">{data.income.streams} streams</div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Spending</span>
                <span className="text-[11px] font-mono font-bold text-red-500">-{data.spending.currency} {data.spending.amount.toFixed(2)}</span>
              </div>
              <div className="text-[9px] text-gray-400 ml-auto">Top: {data.spending.topCategory}</div>
              <div className="border-t border-gray-100 pt-2 mt-1 flex items-center justify-between">
                <span className="text-[10px] text-gray-600 font-medium">Net</span>
                <span className="text-[12px] font-mono font-bold text-gray-900">
                  {data.income.currency} {(data.income.amount - data.spending.amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Reading */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Reading" icon={<span className="text-xs">📚</span>} />
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Pages read</span>
                <span className="text-[11px] font-mono font-bold text-indigo-600">{data.reading.pagesRead}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Books finished</span>
                <span className="text-[11px] font-mono font-bold text-green-600">{data.reading.booksFinished}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-[9px] text-gray-400 mb-1">Currently reading</p>
                <p className="text-[11px] text-gray-700 font-medium">{data.reading.currentlyReading}</p>
              </div>
            </div>
          </div>

          {/* Gratitude */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Grateful For" icon={<span className="text-xs">🙏</span>} />
            </div>
            <div className="px-4 py-3 space-y-2">
              {data.grateful.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-pink-400 shrink-0 mt-0.5">·</span>
                  <span className="text-[11px] text-gray-700 leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Week Ahead */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <PixelSparkle size={12} className="text-yellow-500" />
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Next Week — Intentions</h2>
          <span className="ml-auto text-[9px] text-gray-400 font-mono">Week {data.weekNumber + 1}</span>
        </div>
        <div className="px-5 py-4 grid grid-cols-2 gap-6">
          {data.nextWeek.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-indigo-400 font-mono text-[9px] shrink-0 mt-0.5 w-4">{i + 1}.</span>
              <span className="text-[12px] text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pixel footer decoration */}
      <div className="flex justify-center gap-0.5 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => {
          const hues = ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
          return (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: hues[i % hues.length],
                opacity: Math.sin((i / 50) * Math.PI + tick * 0.2) * 0.4 + 0.6,
                transform: `scale(${Math.sin((i / 50) * Math.PI * 2 + tick * 0.15) * 0.3 + 0.7})`,
              }}
            />
          );
        })}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Weekly Review · Screen 39 · Mission Control · Week {data.weekNumber}, {data.year}
      </p>
    </div>
  );
}
