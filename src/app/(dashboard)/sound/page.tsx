'use client';

import React, { useState, useEffect } from 'react';
import { PixelPulse } from '@/lib/pixel-icons-extra';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

// Time-of-day labels for each hour block
const timeSlots: Record<number, { label: string; emoji: string; vibe: string }> = {
  0:  { label: 'Midnight',    emoji: '🌑', vibe: 'silent void' },
  1:  { label: 'Dead hour',   emoji: '🌑', vibe: 'ultra quiet' },
  2:  { label: 'Deep night',  emoji: '🌑', vibe: 'deep sleep' },
  3:  { label: 'Deep night',  emoji: '🌑', vibe: 'deep sleep' },
  4:  { label: 'Pre-dawn',    emoji: '🌒', vibe: 'still dark' },
  5:  { label: 'Early bird',  emoji: '🪶', vibe: 'whispers' },
  6:  { label: 'Morning',     emoji: '🌅', vibe: 'soft hum' },
  7:  { label: 'Rush',        emoji: '⚡', vibe: 'clatter' },
  8:  { label: 'Work hours',  emoji: '💼', vibe: 'steady rhythm' },
  9:  { label: 'Deep work',   emoji: '🎯', vibe: 'focused hum' },
  10: { label: 'Flow state',  emoji: '🌊', vibe: 'full flow' },
  11: { label: 'Flow state',  emoji: '🌊', vibe: 'full flow' },
  12: { label: 'Midday',      emoji: '☀️', vibe: 'bright buzz' },
  13: { label: 'Post-lunch',  emoji: '🍜', vibe: 'gentle drift' },
  14: { label: 'Afternoon',   emoji: '📋', vibe: 'steady hum' },
  15: { label: 'Late PM',     emoji: '🎯', vibe: 'crunch mode' },
  16: { label: 'Crush hour',  emoji: '⚡', vibe: 'high traffic' },
  17: { label: 'Wind down',   emoji: '🌇', vibe: 'traffic fades' },
  18: { label: 'Evening',     emoji: '🌆', vibe: 'evening calm' },
  19: { label: 'Dinner time', emoji: '🍽️', vibe: 'soft chatter' },
  20: { label: 'Night ops',   emoji: '🌙', vibe: 'light work' },
  21: { label: 'Night ops',   emoji: '🌙', vibe: 'zone time' },
  22: { label: 'Late night',  emoji: '🌑', vibe: 'quiet focus' },
  23: { label: 'Past midnight', emoji: '🌑', vibe: 'deep zone' },
};

// Simulated activity levels (would be real data in production)
// Based on typical agent/developer patterns
const activityLevels: Record<number, number> = {
  0: 2, 1: 1, 2: 1, 3: 1, 4: 2, 5: 3,
  6: 5, 7: 8, 8: 7, 9: 9, 10: 9, 11: 8,
  12: 6, 13: 5, 14: 7, 15: 8, 16: 9,
  17: 6, 18: 5, 19: 4, 20: 7, 21: 8, 22: 6, 23: 3,
};

// Pixel bar visualization for a single hour
function PixelBar({ level, hour }: { level: number; hour: number }) {
  const MAX_BARS = 12;
  const activeBars = Math.round((level / 10) * MAX_BARS);
  const isNight = hour < 6 || hour >= 22;
  const isActive = level >= 6;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-end gap-px">
        {Array.from({ length: MAX_BARS }, (_, i) => {
          const isLit = i < activeBars;
          const isTopHalf = i < MAX_BARS / 2;
          let color = 'bg-gray-200';
          if (isLit) {
            if (isNight) {
              color = isTopHalf ? 'bg-indigo-400' : 'bg-indigo-600';
            } else if (level >= 8) {
              color = isTopHalf ? 'bg-red-400' : 'bg-red-500';
            } else if (level >= 5) {
              color = isTopHalf ? 'bg-yellow-400' : 'bg-yellow-500';
            } else {
              color = isTopHalf ? 'bg-green-400' : 'bg-green-500';
            }
          }
          return (
            <div
              key={i}
              className={`w-1 rounded-sm transition-all ${color}`}
              style={{ height: `${Math.max(2, Math.floor(24 / MAX_BARS * (i + 1)))}px` }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Heatmap grid for the week
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// Simulated weekly data
const weekData = DAYS.map(day => ({
  day,
  hours: HOURS.map(h => ({
    level: Math.min(10, Math.max(0, activityLevels[h] + Math.floor(Math.random() * 3) - 1)),
  })),
}));

function HeatmapCell({ level, hour, day }: { level: number; hour: number; day: string }) {
  let bg = 'bg-gray-50';
  if (level >= 8) bg = 'bg-red-400';
  else if (level >= 6) bg = 'bg-yellow-400';
  else if (level >= 4) bg = 'bg-green-400';
  else if (level >= 2) bg = 'bg-green-200';
  else if (level >= 1) bg = 'bg-indigo-100';
  else bg = 'bg-gray-100';

  return (
    <div
      className={`w-full aspect-square rounded-sm ${bg} transition-colors cursor-default group relative`}
      title={`${day} ${hour.toString().padStart(2,'0')}:00 — Level ${level}`}
    >
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none transition-opacity">
        {day} {hour.toString().padStart(2,'0')}:00
      </div>
    </div>
  );
}

// Ambient sound categories
const soundCategories = [
  { label: 'Keyboard clatter', icon: '⌨️', count: 3, color: 'bg-yellow' },
  { label: 'Cron jobs firing', icon: '⏰', count: 1, color: 'bg-blue' },
  { label: 'Heartbeats pinging', icon: '💓', count: 2, color: 'bg-pink' },
  { label: 'Logs streaming', icon: '📜', count: 1, color: 'bg-green' },
];

export default function SoundPage() {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [ticking, setTicking] = useState(false);
  const [tickCount, setTickCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicking(true);
      setTickCount(c => c + 1);
      setCurrentHour(new Date().getHours());
      setTimeout(() => setTicking(false), 200);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentSlot = timeSlots[currentHour];
  const currentLevel = activityLevels[currentHour];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            Sound · Ambient Monitor
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Workspace pulse · 24-hour rhythm</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-mono bg-gray-100 px-2 py-1 rounded ${ticking ? 'text-green-600' : 'text-gray-400'}`}>
            {String(currentHour).padStart(2,'0')}:{String(new Date().getMinutes()).padStart(2,'0')}:{String(new Date().getSeconds()).padStart(2,'0')}
          </span>
          <div className={`w-2 h-2 rounded-full transition-colors ${currentLevel >= 7 ? 'bg-green-400 animate-pulse' : currentLevel >= 4 ? 'bg-yellow-400' : 'bg-indigo-300'}`} />
        </div>
      </div>

      {/* Current moment card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentSlot.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{currentSlot.label}</p>
              <p className="text-xs text-gray-500">{currentSlot.vibe} · Activity level {currentLevel}/10</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.ceil(currentLevel / 3) }, (_, i) => (
              <span key={i} className="text-sm">🔊</span>
            ))}
            {Array.from({ length: Math.max(0, 4 - Math.ceil(currentLevel / 3)) }, (_, i) => (
              <span key={i} className="text-sm opacity-20">🔇</span>
            ))}
          </div>
        </div>

        {/* 24-hour bar chart */}
        <div className="px-5 py-5">
          <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-3">24-hour activity waveform</p>
          <div className="flex items-end gap-1 h-24">
            {HOURS.map(h => (
              <div key={h} className="flex-1 flex flex-col items-center gap-0.5 group">
                <PixelBar level={activityLevels[h]} hour={h} />
                {h % 6 === 0 && (
                  <span className="text-[8px] text-gray-400 font-mono">{h.toString().padStart(2,'0')}</span>
                )}
                {h === currentHour && (
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="px-5 pb-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-green-400" />
            <span className="text-[9px] text-gray-400">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-yellow-400" />
            <span className="text-[9px] text-gray-400">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-red-400" />
            <span className="text-[9px] text-gray-400">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-indigo-400" />
            <span className="text-[9px] text-gray-400">Night</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] text-gray-400">Now</span>
          </div>
        </div>
      </div>

      {/* Weekly heatmap */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            Weekly heatmap · Activity by hour
          </p>
        </div>
        <div className="px-5 py-4">
          {/* Hour labels */}
          <div className="flex gap-px mb-1 ml-10">
            {HOURS.filter(h => h % 3 === 0).map(h => (
              <span key={h} className="flex-1 text-[8px] text-gray-300 font-mono text-center">{h}</span>
            ))}
          </div>
          {/* Grid */}
          <div className="space-y-1">
            {weekData.map(row => (
              <div key={row.day} className="flex items-center gap-2">
                <span className="text-[9px] text-gray-400 font-mono w-8">{row.day}</span>
                <div className="flex gap-px flex-1">
                  {row.hours.map((h, hi) => (
                    <div key={hi} className="flex-1">
                      <HeatmapCell level={h.level} hour={hi} day={row.day} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Color scale */}
          <div className="flex items-center gap-3 mt-3 ml-10">
            <span className="text-[8px] text-gray-300">Low</span>
            <div className="flex gap-px">
              <div className="w-3 h-3 rounded-sm bg-gray-100" />
              <div className="w-3 h-3 rounded-sm bg-indigo-100" />
              <div className="w-3 h-3 rounded-sm bg-green-200" />
              <div className="w-3 h-3 rounded-sm bg-green-400" />
              <div className="w-3 h-3 rounded-sm bg-yellow-400" />
              <div className="w-3 h-3 rounded-sm bg-red-400" />
            </div>
            <span className="text-[8px] text-gray-300">High</span>
          </div>
        </div>
      </div>

      {/* Sound sources */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span className="text-sm">🔊</span> Active sound sources
            </p>
          </div>
          <div className="px-5 py-4 space-y-3">
            {soundCategories.map(cat => (
              <div key={cat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{cat.icon}</span>
                  <span className="text-xs text-gray-700">{cat.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: cat.count }, (_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  ))}
                  {Array.from({ length: Math.max(0, 3 - cat.count) }, (_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <PixelPulse size={12} className="text-indigo-400" /> Ambient level
            </p>
          </div>
          <div className="px-5 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`text-3xl font-mono font-bold ${currentLevel >= 7 ? 'text-green-600' : currentLevel >= 4 ? 'text-yellow-600' : 'text-indigo-500'}`}>
                {currentLevel}
              </div>
              <div>
                <p className="text-xs text-gray-700">out of 10</p>
                <p className="text-[9px] text-gray-400">{currentSlot.label.toLowerCase()} · {currentSlot.vibe}</p>
              </div>
            </div>
            {/* Visual meter */}
            <div className="flex gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-5 rounded-sm transition-colors ${
                    i < currentLevel
                      ? currentLevel >= 7 ? 'bg-green-500' : currentLevel >= 4 ? 'bg-yellow-400' : 'bg-indigo-400'
                      : 'bg-gray-100'
                  }`}
                />
              ))}
            </div>
            <p className="text-[9px] text-gray-400 mt-2 text-center">
              {currentLevel >= 7 ? '🔥 Busy workspace' : currentLevel >= 4 ? '⚡ Moderate activity' : '🌙 Quiet hours'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}