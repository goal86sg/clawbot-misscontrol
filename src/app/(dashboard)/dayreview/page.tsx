'use client';

import React, { useState, useEffect } from 'react';
import { PixelClock, PixelCheck, PixelSparkle, PixelHeart, PixelSunset } from '@/lib/pixel-icons';
import { PixelProgress } from '@/components/PixelProgress';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DaySummary {
  date: string;
  dayOfYear: number;
  weekday: string;
  energy: number; // 0-100, start-high
  mood: number;   // 0-100, end-of-day
  tasks: { done: number; total: number; labels: string[] };
  income: { amount: number; currency: string; streams: number };
  health: { steps: number; calories: number; water_ml: number; standing_hours: number };
  wins: string[];
  lessons: string[];
  grateful: string[];
  tomorrow: string[];
  focus: { minutes: number; sessions: number; deepFocus: boolean };
  sleep: { hours: number; quality: number; bedtime: string };
  reading: { pages: number; book: string };
  screenTime: { total_hours: number; top_apps: { name: string; hours: number }[] };
}

// ─── Realistic mock data ──────────────────────────────────────────────────────

const defaultSummary: DaySummary = {
  date: new Date().toISOString().substring(0, 10),
  dayOfYear: 156,
  weekday: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
  energy: 78,
  mood: 82,
  tasks: {
    done: 7,
    total: 9,
    labels: ['Review eBPF architecture', 'Update Mission Control sidebar', 'Sync with guarddog', 'Write standup notes', 'Deploy spending tracker v1.4', 'Review PR #47', 'Update AGENTS.md'],
  },
  income: { amount: 4.20, currency: 'SGD', streams: 3 },
  health: { steps: 6234, calories: 1847, water_ml: 2100, standing_hours: 6 },
  wins: [
    'Shipped the Workout Tracker screen ahead of schedule',
    'Resolved the Docker container memory leak on staging',
    'Got positive feedback on the Daily Briefing from teammates',
  ],
  lessons: [
    'Should have started the eBPF review earlier — rushed at 4PM',
    'Need to batch more meetings — context switching killed focus this afternoon',
  ],
  grateful: [
    'Morning coffee at The Pogg was perfect today',
    'Guarddog caught a misconfigured SSH rule before it caused issues',
    'Finished the day without any P0 incidents',
  ],
  tomorrow: [
    'Start eBPF work before noon — protect the morning',
    'Write the PostgreSQL DAM probe placement strategy doc',
    'Prepare for the sovereign cloud demo prep',
  ],
  focus: { minutes: 127, sessions: 4, deepFocus: true },
  sleep: { hours: 7.5, quality: 84, bedtime: '23:42' },
  reading: { pages: 24, book: 'Designing Data-Intensive Applications' },
  screenTime: {
    total_hours: 5.3,
    top_apps: [
      { name: 'VS Code', hours: 2.4 },
      { name: 'Slack', hours: 1.1 },
      { name: 'Chrome', hours: 0.8 },
      { name: 'Terminal', hours: 0.6 },
    ],
  },
};

// ─── Pixel Progress Pixel ─────────────────────────────────────────────────────

function PixelPill({ value, max = 100, height = 8 }: { value: number; max?: number; height?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  const filled = Math.round((pct / 100) * height);
  const color = pct > 70 ? 'bg-green-400' : pct > 40 ? 'bg-yellow-400' : 'bg-red-400';
  return (
    <div className="flex flex-col-reverse gap-px">
      {Array.from({ length: height }, (_, r) => (
        <div key={r} className={`w-3 rounded-sm transition-colors ${r < filled ? color : 'bg-gray-100'}`} />
      ))}
    </div>
  );
}

// ─── Pixel Sun/Moon decoration ───────────────────────────────────────────────

function PixelDayCycle({ energy, mood }: { energy: number; mood: number }) {
  // Sun rises with energy, sets with mood (evening transition)
  const sunY = Math.round((energy / 100) * 10);
  const moonY = 14 - Math.round((mood / 100) * 10);
  const isEvening = new Date().getHours() >= 18;

  return (
    <svg width="64" height="32" viewBox="0 0 16 8" shapeRendering="crispEdges" className="opacity-70">
      {/* Horizon line */}
      <rect x="0" y="7" width="16" height="1" fill="#e5e7eb" />

      {/* Sun */}
      {energy > 20 && (
        <g>
          {/* Sun body */}
          <rect x="2" y={14 - sunY} width="3" height="2" fill="#f59e0b" />
          <rect x="3" y={13 - sunY} width="1" height="1" fill="#fbbf24" />
          {/* Sun rays */}
          <rect x="3" y={12 - sunY} width="1" height="1" fill="#f59e0b" opacity="0.5" />
          <rect x="1" y={14 - sunY} width="1" height="1" fill="#f59e0b" opacity="0.5" />
          <rect x="5" y={14 - sunY} width="1" height="1" fill="#f59e0b" opacity="0.5" />
        </g>
      )}

      {/* Moon */}
      {mood > 30 && (
        <g>
          <rect x="11" y={moonY} width="3" height="2" fill="#94a3b8" />
          <rect x="12" y={moonY - 1} width="1" height="1" fill="#cbd5e1" />
          <rect x="10" y={moonY + 1} width="1" height="1" fill="#64748b" opacity="0.5" />
        </g>
      )}

      {/* Stars that appear with mood/evening */}
      {isEvening && mood > 50 && (
        <>
          <rect x="6" y="1" width="1" height="1" fill="#94a3b8" opacity="0.6" />
          <rect x="9" y="2" width="1" height="1" fill="#94a3b8" opacity="0.4" />
          <rect x="13" y="0" width="1" height="1" fill="#94a3b8" opacity="0.5" />
        </>
      )}

      {/* Ground / horizon */}
      <rect x="0" y="7" width="16" height="1" fill="#d1d5db" />
    </svg>
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

export default function DayReviewPage() {
  const [tick, setTick] = useState(0);
  const [summary] = useState<DaySummary>(defaultSummary);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  const taskPct = Math.round((summary.tasks.done / summary.tasks.total) * 100);
  const energyVariant = summary.energy > 70 ? 'green' : summary.energy > 40 ? 'yellow' : 'red';
  const moodVariant = summary.mood > 70 ? 'green' : summary.mood > 40 ? 'yellow' : 'red';
  const stepPct = Math.round((summary.health.steps / 10000) * 100);
  const waterPct = Math.round((summary.health.water_ml / 2500) * 100);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <PixelSunset size={24} className="text-orange-400" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Day in Review</h1>
            <p className="text-xs text-gray-500 mt-0.5">{dateStr}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
              Day {summary.dayOfYear} of 365 &nbsp;·&nbsp; {summary.weekday}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
            <PixelClock size={12} />
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' })}</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Session complete
          </div>
        </div>
      </div>

      {/* Pixel day cycle decoration */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-200 rounded-lg px-6 py-2 flex items-center gap-4">
          <PixelDayCycle energy={summary.energy} mood={summary.mood} />
          <div className="text-[9px] text-gray-400 font-mono">
            <div>sunrise · {Math.round((summary.energy / 100) * 100)}%</div>
            <div>moonrise · {Math.round((summary.mood / 100) * 100)}%</div>
          </div>
        </div>
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Energy */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Energy</span>
            <span className="text-lg font-bold font-mono text-gray-900">{summary.energy}<span className="text-xs text-gray-400">%</span></span>
          </div>
          <PixelProgress value={summary.energy} max={100} variant={energyVariant} />
          <p className="text-[9px] text-gray-400 mt-2">
            {summary.energy > 70 ? '⚡ High energy day' : summary.energy > 40 ? '↔ Moderate energy' : '🔋 Low — rest needed'}
          </p>
        </div>

        {/* Mood */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Mood</span>
            <span className="text-lg font-bold font-mono text-gray-900">{summary.mood}<span className="text-xs text-gray-400">%</span></span>
          </div>
          <PixelProgress value={summary.mood} max={100} variant={moodVariant} />
          <p className="text-[9px] text-gray-400 mt-2">
            {summary.mood > 70 ? '😊 Good end state' : summary.mood > 40 ? '😐 Okay' : '😔 Rough day'}
          </p>
        </div>

        {/* Tasks */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Tasks Done</span>
            <span className="text-lg font-bold font-mono text-gray-900">{summary.tasks.done}<span className="text-xs text-gray-400">/{summary.tasks.total}</span></span>
          </div>
          <PixelProgress value={taskPct} max={100} variant={taskPct >= 70 ? 'green' : taskPct >= 40 ? 'yellow' : 'red'} />
          <p className="text-[9px] text-gray-400 mt-2">
            {summary.tasks.done === summary.tasks.total ? '✅ All done!' : `${summary.tasks.total - summary.tasks.done} remaining`}
          </p>
        </div>

        {/* Sleep */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Sleep</span>
            <span className="text-lg font-bold font-mono text-gray-900">{summary.sleep.hours}<span className="text-xs text-gray-400">h</span></span>
          </div>
          <PixelProgress value={summary.sleep.hours} max={9} variant={summary.sleep.hours >= 7 ? 'green' : 'yellow'} />
          <p className="text-[9px] text-gray-400 mt-2">Bed {summary.sleep.bedtime} · Q={summary.sleep.quality}%</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Tasks Done */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <SectionHeader label="Tasks Completed" icon={<PixelCheck size={12} className="text-green-500" />} />
          </div>
          <div className="px-4 py-3 space-y-1.5">
            {summary.tasks.labels.map((label, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                <span className="text-[11px] text-gray-700 leading-tight">{label}</span>
              </div>
            ))}
            {summary.tasks.done < summary.tasks.total && (
              <div className="flex items-start gap-2 opacity-40">
                <span className="text-gray-300 mt-0.5 shrink-0">○</span>
                <span className="text-[11px] text-gray-400 leading-tight italic">
                  {summary.tasks.total - summary.tasks.done} tasks not completed
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Wins / Lessons */}
        <div className="space-y-4">
          {/* Wins */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Wins" icon={<PixelSparkle size={12} className="text-yellow-500" />} />
            </div>
            <div className="px-4 py-3 space-y-2">
              {summary.wins.map((win, i) => (
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
              {summary.lessons.map((lesson, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 shrink-0 mt-0.5">→</span>
                  <span className="text-[11px] text-gray-700 leading-tight">{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: health + gratitude + tomorrow */}
        <div className="space-y-4">
          {/* Health Summary */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Health" icon={<PixelHeart size={12} className="text-red-400" />} />
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Steps</span>
                <div className="flex items-center gap-2">
                  <PixelProgress value={summary.health.steps} max={10000} variant={stepPct > 60 ? 'green' : 'yellow'} />
                  <span className="text-[10px] font-mono text-gray-600 w-14 text-right">{summary.health.steps.toLocaleString()}/10k</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Calories</span>
                <span className="text-[10px] font-mono text-gray-600">{summary.health.calories} kcal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Water</span>
                <div className="flex items-center gap-2">
                  <PixelProgress value={summary.health.water_ml} max={2500} variant={waterPct > 60 ? 'green' : 'yellow'} />
                  <span className="text-[10px] font-mono text-gray-600 w-14 text-right">{summary.health.water_ml}ml</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Stand hours</span>
                <span className="text-[10px] font-mono text-gray-600">{summary.health.standing_hours}h</span>
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
              {summary.grateful.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-pink-400 shrink-0 mt-0.5">·</span>
                  <span className="text-[11px] text-gray-700 leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tomorrow */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Tomorrow" icon={<span className="text-xs">🎯</span>} />
            </div>
            <div className="px-4 py-3 space-y-1.5">
              {summary.tomorrow.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-mono text-[9px] shrink-0 mt-0.5 w-3">{i + 1}.</span>
                  <span className="text-[11px] text-gray-700 leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Focus Time */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <div>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Focus</p>
            <p className="text-xl font-bold font-mono text-gray-900">{summary.focus.minutes}<span className="text-xs text-gray-400">min</span></p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] text-gray-500">{summary.focus.sessions} sessions</p>
            {summary.focus.deepFocus && <span className="text-[8px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">Deep Focus</span>}
          </div>
        </div>

        {/* Income */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <div>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Income Today</p>
            <p className="text-xl font-bold font-mono text-green-600">+{summary.income.currency} {summary.income.amount.toFixed(2)}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] text-gray-500">{summary.income.streams} streams</p>
          </div>
        </div>

        {/* Reading */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <div>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Reading</p>
            <p className="text-xl font-bold font-mono text-gray-900">{summary.reading.pages}<span className="text-xs text-gray-400"> pages</span></p>
          </div>
          <div className="ml-auto text-right max-w-[120px]">
            <p className="text-[10px] text-gray-500 truncate">{summary.reading.book}</p>
          </div>
        </div>

        {/* Screen Time */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Screen Time</p>
            <p className="text-[10px] font-mono text-gray-600">{summary.screenTime.total_hours}h</p>
          </div>
          <div className="space-y-1">
            {summary.screenTime.top_apps.map((app, i) => (
              <div key={app.name} className="flex items-center gap-1.5">
                <span className="text-[9px] text-gray-400 w-14 truncate">{app.name}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-400 rounded-full"
                    style={{ width: `${(app.hours / summary.screenTime.top_apps[0].hours) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-gray-500 w-8 text-right">{app.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pixel sunset footer decoration */}
      <div className="flex justify-center gap-0.5 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => {
          const hues = ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981'];
          return (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: hues[i % hues.length],
                opacity: Math.sin((i / 50) * Math.PI + tick * 0.3) * 0.4 + 0.6,
                transform: `scale(${Math.sin((i / 50) * Math.PI * 2 + tick * 0.2) * 0.3 + 0.7})`,
              }}
            />
          );
        })}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Day in Review · Screen 38 · Mission Control · {summary.date}
      </p>
    </div>
  );
}