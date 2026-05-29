'use client';

import React, { useState, useEffect } from 'react';
import { PixelClock, PixelSparkle } from '@/lib/pixel-icons';
import { PixelCalendar } from '@/lib/pixel-icons-extra';

// ─── Pixel Art Icons ───────────────────────────────────────────────────────────

function PixelMoon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Moon crescent */}
      <rect x="2" y="2" width="10" height="10" fill="currentColor" opacity="0.15" />
      <rect x="3" y="3" width="8" height="8" fill="currentColor" opacity="0.2" />
      <rect x="4" y="4" width="6" height="6" fill="currentColor" opacity="0.3" />
      <rect x="5" y="5" width="4" height="4" fill="currentColor" opacity="0.5" />
      {/* Stars */}
      <rect x="12" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="13" y="3" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="11" y="4" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="14" y="5" width="1" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelSun({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Sun center */}
      <rect x="6" y="6" width="4" height="4" fill="currentColor" />
      <rect x="5" y="5" width="6" height="6" fill="currentColor" opacity="0.4" />
      <rect x="4" y="4" width="8" height="8" fill="currentColor" opacity="0.2" />
      {/* Rays */}
      <rect x="7" y="2" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="7" y="12" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="7" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="12" y="7" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="11" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="4" y="11" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="11" y="11" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelBolt({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="7" y="0" width="2" height="6" fill="currentColor" opacity="0.7" />
      <rect x="8" y="2" width="2" height="6" fill="currentColor" />
      <rect x="3" y="6" width="8" height="2" fill="currentColor" />
      <rect x="4" y="8" width="6" height="2" fill="currentColor" opacity="0.6" />
      <rect x="5" y="10" width="4" height="2" fill="currentColor" opacity="0.4" />
      <rect x="6" y="12" width="3" height="2" fill="currentColor" opacity="0.3" />
      <rect x="7" y="14" width="2" height="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelBed({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Bed frame */}
      <rect x="1" y="9" width="14" height="4" fill="currentColor" opacity="0.2" />
      <rect x="1" y="11" width="14" height="2" fill="currentColor" opacity="0.15" />
      {/* Headboard */}
      <rect x="1" y="6" width="2" height="5" fill="currentColor" opacity="0.3" />
      {/* Pillow */}
      <rect x="2" y="7" width="4" height="3" fill="currentColor" opacity="0.25" />
      <rect x="3" y="7" width="2" height="2" fill="currentColor" opacity="0.35" />
      {/* Blanket */}
      <rect x="6" y="7" width="8" height="5" fill="currentColor" opacity="0.15" />
      <rect x="7" y="8" width="6" height="3" fill="currentColor" opacity="0.2" />
      {/* Legs */}
      <rect x="2" y="13" width="2" height="1" fill="currentColor" opacity="0.2" />
      <rect x="12" y="13" width="2" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelSleepGraph({ data, maxHours = 10, height = 80 }: {
  data: { label: string; value: number; quality?: number }[];
  maxHours?: number;
  height?: number;
}) {
  const bars = data.map((d, i) => {
    const filled = Math.round((d.value / maxHours) * 18);
    return { ...d, filled, index: i };
  });

  return (
    <div className="flex items-end gap-2">
      {bars.map(bar => (
        <div key={bar.index} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-[9px] font-mono text-gray-500">
            {bar.value.toFixed(1)}h
          </span>
          <div className="flex flex-col-reverse gap-px w-full">
            {Array.from({ length: 18 }, (_, r) => (
              <div
                key={r}
                className="w-full rounded-sm"
                style={{
                  height: 4,
                  backgroundColor: r < bar.filled
                    ? bar.quality === 3 ? '#22c55e'
                    : bar.quality === 2 ? '#eab308'
                    : '#94a3b8'
                    : '#f1f5f9',
                }}
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-400">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

function EnergyGauge({ level }: { level: number }) {
  const segments = 10;
  const filled = Math.round((level / 100) * segments);
  const color = level >= 70 ? '#22c55e' : level >= 40 ? '#eab308' : '#ef4444';

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: segments }, (_, i) => (
        <div
          key={i}
          className="w-4 h-6 rounded-sm transition-colors"
          style={{ backgroundColor: i < filled ? color : '#f1f5f9' }}
        />
      ))}
      <span className="text-sm font-bold font-mono ml-1" style={{ color }}>
        {level}%
      </span>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface SleepEntry {
  date: string;
  day: string;
  sleepTime: string;
  wakeTime: string;
  hours: number;
  quality: 1 | 2 | 3; // 1=poor, 2=fair, 3=good
  energy: number; // 0-100
  notes: string;
  tags: string[];
}

interface WeeklyStats {
  avgSleep: number;
  avgEnergy: number;
  bestDay: string;
  worstDay: string;
  totalHours: number;
  qualityScore: number;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const sleepData: SleepEntry[] = [
  { date: '2026-05-23', day: 'Sat', sleepTime: '12:30am', wakeTime: '9:00am', hours: 8.5, quality: 3, energy: 85, notes: 'Great sleep, felt refreshed', tags: ['weekend', 'deep-sleep'] },
  { date: '2026-05-24', day: 'Sun', sleepTime: '1:00am', wakeTime: '10:00am', hours: 9.0, quality: 3, energy: 90, notes: 'Long sleep, very restorative', tags: ['weekend'] },
  { date: '2026-05-25', day: 'Mon', sleepTime: '12:00am', wakeTime: '6:30am', hours: 6.5, quality: 2, energy: 60, notes: 'Monday blues, a bit groggy', tags: ['workday', 'short-sleep'] },
  { date: '2026-05-26', day: 'Tue', sleepTime: '11:30pm', wakeTime: '6:00am', hours: 6.5, quality: 2, energy: 65, notes: 'Pre-presentation anxiety', tags: ['workday'] },
  { date: '2026-05-27', day: 'Wed', sleepTime: '11:00pm', wakeTime: '6:30am', hours: 7.5, quality: 3, energy: 75, notes: 'Good productive day', tags: ['workday'] },
  { date: '2026-05-28', day: 'Thu', sleepTime: '12:30am', wakeTime: '7:00am', hours: 6.5, quality: 2, energy: 55, notes: 'Late night coding session', tags: ['late-night'] },
  { date: '2026-05-29', day: 'Fri', sleepTime: '11:30pm', wakeTime: '6:30am', hours: 7.0, quality: 2, energy: 70, notes: 'Normal work night', tags: ['workday'] },
];

const thisWeek: WeeklyStats = {
  avgSleep: 7.36,
  avgEnergy: 71.4,
  bestDay: 'Sunday',
  worstDay: 'Monday',
  totalHours: 51.5,
  qualityScore: 78,
};

const sleepGoalHours = 7.5;
const energyGoalLevel = 70;

const tips = [
  { label: 'Target sleep', value: '7h 30m', icon: '🎯' },
  { label: 'Avg this week', value: '7h 22m', icon: '📊' },
  { label: 'Energy goal', value: '70%', icon: '⚡' },
  { label: 'Avg energy', value: '71%', icon: '📈' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SleepPage() {
  const [time, setTime] = useState('');
  const [activeDay, setActiveDay] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore',
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const qualityLabel: Record<number, string> = { 1: 'Poor', 2: 'Fair', 3: 'Good' };
  const qualityColor: Record<number, string> = { 1: 'text-red-500', 2: 'text-yellow-500', 3: 'text-green-500' };

  const avgSleep = sleepData.reduce((s, d) => s + d.hours, 0) / sleepData.length;
  const avgEnergy = sleepData.reduce((s, d) => s + d.energy, 0) / sleepData.length;

  return (
    <div className="max-w-6xl space-y-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Sleep & Energy</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track rest, feel better, perform better</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded">
            <PixelClock size={11} />
            <span>{time}</span>
          </div>
          <span className="text-[10px] font-mono bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100">
            Fri, May 29
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Average Sleep */}
        <div className="bg-white border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelMoon size={18} className="text-indigo-400" />
            <p className="text-[10px] text-indigo-500 uppercase tracking-widest font-semibold">Avg Sleep</p>
          </div>
          <p className="text-2xl font-bold text-indigo-700 mt-1 font-mono">
            {avgSleep.toFixed(1)}<span className="text-sm text-indigo-400">hrs</span>
          </p>
          <p className="text-[10px] text-indigo-400 mt-0.5 flex items-center gap-1">
            {avgSleep >= sleepGoalHours ? '✅' : '⚠️'} {(avgSleep - sleepGoalHours).toFixed(1)}h vs goal
          </p>
        </div>

        {/* Average Energy */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelBolt size={18} className="text-amber-400" />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Avg Energy</p>
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-1 font-mono">
            {Math.round(avgEnergy)}<span className="text-sm text-amber-400">%</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
            {avgEnergy >= energyGoalLevel ? '✅' : '⚠️'} {(avgEnergy - energyGoalLevel).toFixed(0)}pp vs goal
          </p>
        </div>

        {/* Total Sleep This Week */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelBed size={18} className="text-slate-400" />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Total This Week</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1 font-mono">
            {thisWeek.totalHours.toFixed(0)}<span className="text-sm text-gray-400">hrs</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">7 nights tracked</p>
        </div>

        {/* Sleep Quality Score */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelSparkle size={18} className="text-green-500" />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Quality Score</p>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1 font-mono">
            {thisWeek.qualityScore}<span className="text-sm text-green-400">/100</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">Based on duration + consistency</p>
        </div>
      </div>

      {/* Weekly Sleep Graph + Energy Levels */}
      <div className="grid grid-cols-3 gap-4">
        {/* Weekly Sleep Chart */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Weekly Sleep Pattern</h2>
              <span className="text-[9px] text-gray-400">Mon → Fri · This Week</span>
            </div>
          </div>
          <div className="px-6 py-5">
            <PixelSleepGraph data={sleepData.map(d => ({ label: d.day, value: d.hours, quality: d.quality }))} maxHours={10} height={80} />
            {/* Sleep goal line */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-0.5 bg-indigo-300 rounded" />
                <span className="text-[9px] text-gray-400">Goal: 7h 30m</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-green-500" />
                <span className="text-[9px] text-gray-400">Good quality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-yellow-400" />
                <span className="text-[9px] text-gray-400">Fair quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Levels Today */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Energy Levels</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            {[
              { time: 'Morning (8am)', energy: 65 },
              { time: 'Midday (12pm)', energy: 72 },
              { time: 'Afternoon (3pm)', energy: 55 },
              { time: 'Evening (6pm)', energy: 68 },
              { time: 'Night (10pm)', energy: 45 },
            ].map(slot => (
              <div key={slot.time} className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">{slot.time}</span>
                <EnergyGauge level={slot.energy} />
              </div>
            ))}
            {/* Tonight's read */}
            <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-gray-700">Current Level</span>
              <div className="flex items-center gap-1">
                <PixelBolt size={14} className="text-amber-400" />
                <span className="text-sm font-bold text-amber-600 font-mono">70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Log */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div
          className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Daily Log</h2>
            <span className="text-[9px] text-gray-400">7 entries · May 23–29</span>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {sleepData.map(entry => (
            <div
              key={entry.date}
              onClick={() => setActiveDay(activeDay === entry.date ? null : entry.date)}
              className={`px-5 py-3.5 flex items-center gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors ${activeDay === entry.date ? 'bg-indigo-50/30' : ''}`}
            >
              {/* Day indicator */}
              <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center shrink-0 ${
                entry.day === 'Sat' || entry.day === 'Sun'
                  ? 'bg-purple-50 border border-purple-100'
                  : 'bg-gray-50 border border-gray-100'
              }`}>
                <span className="text-[9px] font-semibold text-gray-400">{entry.day}</span>
                <span className={`text-lg font-bold font-mono ${entry.day === 'Sat' || entry.day === 'Sun' ? 'text-purple-600' : 'text-gray-700'}`}>
                  {new Date(entry.date).getDate()}
                </span>
              </div>

              {/* Sleep info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-900">{entry.hours.toFixed(1)} hrs</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${qualityColor[entry.quality]} border-current`}>
                    {qualityLabel[entry.quality]}
                  </span>
                  {entry.hours >= sleepGoalHours && (
                    <span className="text-[9px] text-green-500">✓ met goal</span>
                  )}
                  {entry.hours < 6.5 && (
                    <span className="text-[9px] text-red-500">⚠️ short</span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {entry.sleepTime} → {entry.wakeTime}
                  {entry.tags.length > 0 && (
                    <span className="ml-2 text-gray-300">·</span>
                  )}
                  {entry.tags.map(tag => (
                    <span key={tag} className="ml-1 text-gray-300">{tag}</span>
                  ))}
                </p>
              </div>

              {/* Energy bar */}
              <div className="flex items-center gap-2 shrink-0">
                <PixelBolt size={12} className={entry.energy >= 70 ? 'text-green-500' : entry.energy >= 40 ? 'text-amber-400' : 'text-red-400'} />
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${entry.energy >= 70 ? 'bg-green-500' : entry.energy >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
                    style={{ width: `${entry.energy}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-gray-500 w-8 text-right">{entry.energy}%</span>
              </div>

              {/* Expand indicator */}
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                <span className={`text-[9px] text-gray-400 transition-transform ${activeDay === entry.date ? 'rotate-180' : ''}`}>▼</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Best Sleep', value: 'Sunday', sub: '9.0 hrs · 90% energy', color: 'text-purple-600', icon: '🌙' },
          { label: 'Worst Sleep', value: 'Monday', sub: '6.5 hrs · 60% energy', color: 'text-red-500', icon: '😴' },
          { label: 'Consistency', value: '71%', sub: '4/7 days met goal', color: 'text-blue-600', icon: '📊' },
          { label: 'Trend', value: '↑ improving', sub: '+0.4h vs last week', color: 'text-green-600', icon: '📈' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="text-base">{stat.icon}</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
            <p className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Tips Box */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3 flex items-start gap-3">
        <PixelSparkle size={14} className="text-indigo-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-indigo-700">Sleep Tip of the Day</p>
          <p className="text-[10px] text-indigo-500 mt-1 leading-relaxed">
            Your energy dips hardest at 3pm (avg 55%). Consider a 20-minute walk or a power nap — research shows this boosts afternoon productivity by up to 40%. Keep screens away after 11pm for better melatonin production.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 shrink-0">
          {tips.map(t => (
            <div key={t.label} className="bg-white border border-indigo-100 rounded px-2.5 py-1.5 text-center">
              <p className="text-[8px] text-indigo-400">{t.label}</p>
              <p className="text-[11px] font-bold text-indigo-700 font-mono">{t.value}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}