'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PixelSparkle, PixelHeart } from '@/lib/pixel-icons';

// ─── Pixel Art Icons ───────────────────────────────────────────────────────────

function PixelLotus({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Center petal */}
      <rect x="6" y="2" width="4" height="5" fill="currentColor" opacity="0.4" />
      <rect x="7" y="1" width="2" height="2" fill="currentColor" />
      {/* Side petals */}
      <rect x="3" y="5" width="3" height="4" fill="currentColor" opacity="0.35" />
      <rect x="2" y="6" width="2" height="3" fill="currentColor" opacity="0.25" />
      <rect x="10" y="5" width="3" height="4" fill="currentColor" opacity="0.35" />
      <rect x="12" y="6" width="2" height="3" fill="currentColor" opacity="0.25" />
      {/* Base */}
      <rect x="5" y="9" width="6" height="3" fill="currentColor" opacity="0.2" />
      <rect x="4" y="11" width="8" height="2" fill="currentColor" opacity="0.15" />
      <rect x="3" y="13" width="10" height="2" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

function PixelBrain({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="5" y="1" width="6" height="2" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="4" height="5" fill="currentColor" opacity="0.5" />
      <rect x="9" y="3" width="4" height="5" fill="currentColor" opacity="0.5" />
      <rect x="4" y="4" width="3" height="3" fill="currentColor" />
      <rect x="9" y="4" width="3" height="3" fill="currentColor" />
      <rect x="4" y="8" width="8" height="4" fill="currentColor" opacity="0.4" />
      <rect x="6" y="9" width="4" height="2" fill="currentColor" opacity="0.3" />
      <rect x="7" y="12" width="2" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelLeaf({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="7" y="1" width="2" height="10" fill="currentColor" opacity="0.4" />
      <rect x="4" y="3" width="5" height="5" fill="currentColor" opacity="0.5" />
      <rect x="5" y="4" width="3" height="3" fill="currentColor" />
      <rect x="7" y="8" width="5" height="4" fill="currentColor" opacity="0.3" />
      <rect x="8" y="9" width="3" height="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelBreathe({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="7" y="2" width="2" height="2" fill="currentColor" />
      <rect x="6" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="4" y="6" width="8" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="8" width="10" height="2" fill="currentColor" opacity="0.35" />
      <rect x="4" y="10" width="8" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="12" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="7" y="14" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelDrop({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="6" y="1" width="4" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="3" width="6" height="4" fill="currentColor" opacity="0.5" />
      <rect x="4" y="7" width="8" height="4" fill="currentColor" />
      <rect x="5" y="11" width="6" height="3" fill="currentColor" opacity="0.6" />
      <rect x="6" y="14" width="4" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelStar({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="7" y="0" width="2" height="4" fill="currentColor" opacity="0.5" />
      <rect x="7" y="12" width="2" height="4" fill="currentColor" opacity="0.5" />
      <rect x="0" y="7" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="12" y="7" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="6" width="4" height="4" fill="currentColor" />
      <rect x="5" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="10" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="10" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="10" y="10" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelFlame({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="7" y="0" width="2" height="3" fill="currentColor" opacity="0.5" />
      <rect x="6" y="2" width="4" height="3" fill="currentColor" opacity="0.7" />
      <rect x="5" y="5" width="6" height="5" fill="currentColor" />
      <rect x="6" y="10" width="4" height="3" fill="currentColor" opacity="0.6" />
      <rect x="7" y="13" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="4" y="8" width="2" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MOODS = [
  { label: 'Anxious', color: 'text-red-400', bg: 'bg-red-50', dot: 'bg-red-400', value: 1 },
  { label: 'Stressed', color: 'text-orange-400', bg: 'bg-orange-50', dot: 'bg-orange-400', value: 2 },
  { label: 'Neutral', color: 'text-gray-400', bg: 'bg-gray-50', dot: 'bg-gray-400', value: 3 },
  { label: 'Calm', color: 'text-teal-400', bg: 'bg-teal-50', dot: 'bg-teal-400', value: 4 },
  { label: 'Blissful', color: 'text-emerald-400', bg: 'bg-emerald-50', dot: 'bg-emerald-400', value: 5 },
];

const BREATH_PATTERNS = [
  { name: '4-7-8 Calm', inhale: 4, hold: 7, exhale: 8, color: 'text-teal-500', bg: 'bg-teal-50' },
  { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Deep Rest', inhale: 4, hold: 2, exhale: 6, color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

const AFFIRMATIONS = [
  'I am calm, capable, and completely in control of my responses.',
  'My mind is clear. My body is relaxed. I am at peace.',
  'I release what I cannot control and embrace what I can.',
  'This moment is all there is. I am fully here.',
  'I choose peace over perfection, presence over performance.',
];

const GRATEFUL_PROMPTS = [
  'One person I appreciate…',
  'One simple pleasure today…',
  'One thing my body did for me…',
  'One challenge that made me grow…',
];

const MINDFULNESS_ACTIVITIES = [
  { label: 'Meditation', icon: <PixelLotus size={14} />, color: 'text-teal-500', streak: 12 },
  { label: 'Breathing', icon: <PixelBreathe size={14} />, color: 'text-blue-500', streak: 8 },
  { label: 'Gratitude', icon: <PixelHeart size={14} />, color: 'text-rose-400', streak: 21 },
  { label: 'Mindful Walk', icon: <PixelLeaf size={14} />, color: 'text-emerald-500', streak: 4 },
];

const WEEKLY_MINDFULNESS = [
  { day: 'Mon', minutes: 20, done: true },
  { day: 'Tue', minutes: 15, done: true },
  { day: 'Wed', minutes: 30, done: true },
  { day: 'Thu', minutes: 10, done: true },
  { day: 'Fri', minutes: 25, done: true },
  { day: 'Sat', minutes: 0, done: false },
  { day: 'Sun', minutes: 0, done: false },
];

const now = new Date();
const sgtOffset = 8 * 60;
const sgtDate = new Date(now.getTime() + (sgtOffset - now.getTimezoneOffset()) * 60000);
const sgtStr = sgtDate.toISOString().replace('T', ' ').substring(0, 10);

// ─── Breathing Component ──────────────────────────────────────────────────────

function BreathingExercise() {
  const [active, setActive] = useState<typeof BREATH_PATTERNS[0] | null>(null);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'idle'>('idle');
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const runCycle = useCallback((pattern: typeof BREATH_PATTERNS[0]) => {
    const { inhale, hold, exhale } = pattern;
    let step = 0;
    setPhase('inhale');
    setCount(inhale);
    const timer = setInterval(() => {
      step++;
      if (step < inhale) {
        setCount(inhale - step);
      } else if (step === inhale) {
        setPhase('hold');
        setCount(hold);
      } else if (step < inhale + hold) {
        setCount(inhale + hold - step);
      } else if (step === inhale + hold) {
        setPhase('exhale');
        setCount(exhale);
      } else if (step < inhale + hold + exhale) {
        setCount(inhale + hold + exhale - step);
      } else {
        setPhase('idle');
        setCount(0);
        setIsActive(false);
        clearInterval(timer);
      }
    }, 1000);
    return timer;
  }, []);

  const handleStart = (pattern: typeof BREATH_PATTERNS[0]) => {
    if (isActive) return;
    setActive(pattern);
    setIsActive(true);
    runCycle(pattern);
  };

  const ringSize = 80;
  const maxDim = 160;
  const progress = isActive
    ? phase === 'inhale'
      ? 0.3 + (0.5 * (active!.inhale - count)) / active!.inhale
      : phase === 'hold'
      ? 0.8
      : 0.3 + (0.5 * count) / active!.exhale
    : 0.3;

  const ringW = Math.round(progress * maxDim);

  const phaseLabel = isActive
    ? phase === 'inhale'
      ? `Breathe in…`
      : phase === 'hold'
      ? `Hold…`
      : `Breathe out…`
    : 'Select a pattern';

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <div
          className="relative flex items-center justify-center"
          style={{ width: ringSize, height: ringSize }}
        >
          {/* Outer ring background */}
          <div
            className="absolute rounded-full border-4 border-gray-200"
            style={{ width: ringSize, height: ringSize }}
          />
          {/* Animated ring */}
          <div
            className={`absolute rounded-full transition-all duration-1000 ${
              phase === 'inhale'
                ? 'border-4 border-teal-400'
                : phase === 'hold'
                ? 'border-4 border-blue-400'
                : phase === 'exhale'
                ? 'border-4 border-indigo-400'
                : 'border-4 border-gray-200'
            }`}
            style={{
              width: ringSize,
              height: ringSize,
              opacity: isActive ? 0.8 : 0.2,
              boxShadow:
                phase === 'inhale'
                  ? '0 0 12px rgba(45, 212, 191, 0.4)'
                  : phase === 'hold'
                  ? '0 0 12px rgba(96, 165, 250, 0.4)'
                  : phase === 'exhale'
                  ? '0 0 12px rgba(129, 140, 248, 0.4)'
                  : 'none',
            }}
          />
          {/* Inner content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {isActive ? (
              <span className="text-2xl font-bold font-mono text-gray-700">{count}</span>
            ) : (
              <PixelBreathe size={20} className="text-gray-400 mb-1" />
            )}
            <span className="text-[9px] font-medium text-gray-400 mt-1">
              {isActive ? phase.toUpperCase() : 'READY'}
            </span>
          </div>
        </div>
      </div>

      {/* Phase label */}
      <p
        className={`text-center text-xs font-medium mb-3 transition-colors ${
          phase === 'inhale'
            ? 'text-teal-500'
            : phase === 'hold'
            ? 'text-blue-500'
            : phase === 'exhale'
            ? 'text-indigo-500'
            : 'text-gray-400'
        }`}
      >
        {phaseLabel}
      </p>

      {/* Pattern buttons */}
      <div className="grid grid-cols-3 gap-2">
        {BREATH_PATTERNS.map((p) => (
          <button
            key={p.name}
            onClick={() => handleStart(p)}
            disabled={isActive}
            className={`px-2 py-1.5 rounded text-[9px] font-semibold border transition-all ${
              active?.name === p.name
                ? `${p.bg} ${p.color} border-current`
                : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
            } ${isActive && active?.name !== p.name ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Mood Selector ─────────────────────────────────────────────────────────────

function MoodRing() {
  const [selected, setSelected] = useState<typeof MOODS[number] | null>(MOODS[3]);
  const [noted, setNoted] = useState('');

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <PixelBrain size={14} className="text-purple-400" />
          <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
            How are you feeling?
          </span>
        </div>
        {selected && (
          <span className="text-[9px] font-mono text-gray-400">
            {sgtStr}
          </span>
        )}
      </div>

      {/* Mood options */}
      <div className="grid grid-cols-5 gap-1 mb-3">
        {MOODS.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelected(mood)}
            className={`flex flex-col items-center p-1.5 rounded-lg border-2 transition-all ${
              selected?.label === mood.label
                ? `${mood.bg} ${mood.color} border-current`
                : 'border-transparent hover:border-gray-200'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${mood.dot} mb-1 ${selected?.label === mood.label ? 'ring-2 ring-offset-1' : ''}`}
                 style={{ boxShadow: selected?.label === mood.label ? `0 0 6px ${mood.dot.replace('bg-','')}` : 'none' }} />
            <span className="text-[8px] font-medium">{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Quick note */}
      <textarea
        value={noted}
        onChange={(e) => setNoted(e.target.value)}
        placeholder="Quick mood note… (optional)"
        className="w-full text-[10px] text-gray-600 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 resize-none focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-200"
        rows={2}
      />
    </div>
  );
}

// ─── Gratitude Journal ─────────────────────────────────────────────────────────

function GratitudeJournal() {
  const [entries, setEntries] = useState<Record<string, string>>({
    'One person I appreciate…': '',
    'One simple pleasure today…': '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const filled = Object.values(entries).some((v) => v.trim());
    if (filled) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        <PixelHeart size={14} className="text-rose-400" />
        <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
          Gratitude Journal
        </span>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <PixelSparkle size={20} className="text-amber-400 mb-2 animate-pulse" />
          <p className="text-xs font-semibold text-teal-600">Gratitude logged!</p>
          <p className="text-[9px] text-gray-400 mt-1">Your heart thanks you 💜</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {GRATEFUL_PROMPTS.map((prompt) => (
              <div key={prompt}>
                <p className="text-[9px] text-gray-400 mb-0.5 italic">{prompt}</p>
                <input
                  type="text"
                  placeholder="Type here…"
                  value={entries[prompt] || ''}
                  onChange={(e) => setEntries({ ...entries, [prompt]: e.target.value })}
                  className="w-full text-[10px] text-gray-700 placeholder-gray-300 bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-100"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-3 w-full py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-[10px] font-semibold text-rose-500 hover:bg-rose-100 transition-colors"
          >
            Log Gratitude ✨
          </button>
        </>
      )}
    </div>
  );
}

// ─── Mindfulness Stats ─────────────────────────────────────────────────────────

function MindStats() {
  const stats = [
    { label: 'Meditation\nStreak', value: '12', unit: 'days', icon: <PixelLotus size={14} />, color: 'text-teal-500', bg: 'bg-teal-50' },
    { label: 'Total\nSessions', value: '48', unit: 'sessions', icon: <PixelBrain size={14} />, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Mindful\nMinutes', value: '640', unit: 'min', icon: <PixelBreathe size={14} />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Gratitude\nEntries', value: '91', unit: 'entries', icon: <PixelHeart size={14} />, color: 'text-rose-400', bg: 'bg-rose-50' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bg} rounded-lg p-2 text-center border border-gray-100`}
        >
          <div className="flex justify-center mb-1">{stat.icon}</div>
          <p className="text-lg font-bold font-mono text-gray-800 leading-tight">{stat.value}</p>
          <p className="text-[8px] text-gray-400 leading-tight">{stat.label}</p>
          <p className="text-[8px] font-medium text-gray-400">{stat.unit}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Weekly Mindfulness Calendar ─────────────────────────────────────────────

function WeeklyMindfulness() {
  const totalMin = WEEKLY_MINDFULNESS.reduce((s, d) => s + d.minutes, 0);
  const daysDone = WEEKLY_MINDFULNESS.filter((d) => d.done).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold text-gray-600">This Week</span>
        <span className="text-[9px] font-mono text-gray-400">
          {totalMin}m total · {daysDone}/7 days
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-16">
        {WEEKLY_MINDFULNESS.map((day) => (
          <div key={day.day} className="flex flex-col items-center flex-1 gap-0.5">
            {/* Bar */}
            <div className="w-full flex items-end justify-center" style={{ height: 40 }}>
              <div
                className={`w-full rounded-sm transition-all ${
                  day.done
                    ? day.minutes >= 20
                      ? 'bg-emerald-400'
                      : day.minutes >= 10
                      ? 'bg-teal-400'
                      : 'bg-teal-300'
                    : 'bg-gray-100'
                }`}
                style={{
                  height: day.done
                    ? `${Math.round((day.minutes / 30) * 40)}px`
                    : '4px',
                  minHeight: day.done ? '4px' : '4px',
                }}
              />
            </div>
            {/* Day label */}
            <span className="text-[8px] font-medium text-gray-400">{day.day}</span>
            {/* Minutes */}
            <span className="text-[7px] font-mono text-gray-300">
              {day.done ? `${day.minutes}m` : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Affirmation of the Day ───────────────────────────────────────────────────

function AffirmationCard() {
  const [idx] = useState(() => Math.floor(Math.random() * AFFIRMATIONS.length));
  const aff = AFFIRMATIONS[idx];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 border border-purple-100">
      <div className="flex items-center gap-1.5 mb-2">
        <PixelStar size={12} className="text-amber-400" />
        <span className="text-[9px] font-semibold text-purple-500 uppercase tracking-wider">
          Affirmation of the Day
        </span>
      </div>
      <p className="text-[11px] text-gray-700 leading-relaxed italic">"{aff}"</p>
      <div className="flex items-center gap-1 mt-2">
        <div className="flex-1 h-px bg-purple-200" />
        <PixelSparkle size={8} className="text-amber-400" />
      </div>
    </div>
  );
}

// ─── Activity Streaks ─────────────────────────────────────────────────────────

function ActivityStreaks() {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        <PixelFlame size={14} className="text-orange-400" />
        <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
          Mind Garden Streaks
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {MINDFULNESS_ACTIVITIES.map((act) => (
          <div
            key={act.label}
            className={`${act.color} bg-opacity-10 rounded-lg p-2 text-center border border-gray-100`}
          >
            <div className="flex justify-center mb-1">{act.icon}</div>
            <p className="text-[9px] font-semibold text-gray-700 mb-1">{act.label}</p>
            <div className="flex items-center justify-center gap-0.5">
              <PixelFlame size={8} className="text-orange-400" />
              <span className="text-[10px] font-bold font-mono text-orange-500">{act.streak}</span>
            </div>
            <p className="text-[7px] text-gray-400 mt-0.5">day streak</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MindGardenPage() {
  const [gratefulCount, setGratefulCount] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-teal-400 to-purple-400 p-2 rounded-xl shadow-sm">
            <PixelLotus size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Mind Garden</h1>
            <p className="text-[10px] text-gray-400 font-mono">
              Cultivate inner peace · {sgtStr}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
          <PixelBrain size={14} className="text-purple-400" />
          <span className="text-[10px] font-semibold text-gray-600">Screen 51</span>
        </div>
      </div>

      {/* Top row: Mood + Breathing */}
      <div className="grid grid-cols-3 gap-5">
        {/* Mood Ring */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div
            className="px-4 pt-4 pb-3 border-b border-gray-100"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <MoodRing />
          </div>
        </div>

        {/* Breathing Exercise */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div
            className="px-4 pt-4 pb-3 border-b border-gray-100"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              <PixelBreathe size={14} className="text-teal-500" />
              <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                Breathing Exercise
              </span>
            </div>
            <BreathingExercise />
          </div>
        </div>

        {/* Gratitude Journal */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div
            className="px-4 pt-4 pb-3 border-b border-gray-100"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <GratitudeJournal />
          </div>
        </div>
      </div>

      {/* Mind Stats */}
      <MindStats />

      {/* Bottom row: Weekly + Affirmation + Activity */}
      <div className="grid grid-cols-3 gap-5">
        {/* Weekly Mindfulness Calendar */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div
            className="px-4 pt-4 pb-3 border-b border-gray-100"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <WeeklyMindfulness />
          </div>
        </div>

        {/* Affirmation */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div
            className="px-4 pt-4 pb-3 border-b border-gray-100"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <AffirmationCard />
          </div>
        </div>

        {/* Activity Streaks */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div
            className="px-4 pt-4 pb-3 border-b border-gray-100"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <ActivityStreaks />
          </div>
        </div>
      </div>

      {/* Philosophy footer */}
      <div className="flex items-center gap-2 justify-center">
        <PixelSparkle size={10} className="text-gray-300" />
        <p className="text-[9px] text-gray-300 font-mono text-center">
          "Almost everything will work again if you unplug it for a few minutes — including you." — Anne Lamott
        </p>
        <PixelSparkle size={10} className="text-gray-300" />
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Mind Garden · Screen 51 · Des_bot
      </p>
    </div>
  );
}
