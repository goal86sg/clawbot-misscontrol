'use client';

import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface JournalEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'amazing';
  energy: 1 | 2 | 3 | 4 | 5;
  wins: string[];
  lessons: string[];
  gratitude: string[];
  tomorrowFocus: string;
  tags: string[];
}

// ─── Pixel Icons ─────────────────────────────────────────────────────────────

function PixelPen({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="5" y="0" width="3" height="1" fill="currentColor" />
      <rect x="4" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="7" y="0" width="1" height="1" fill="currentColor" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" />
      <rect x="5" y="2" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="4" width="4" height="2" fill="currentColor" />
      <rect x="2" y="6" width="3" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="7" width="2" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelStar({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="8" height="2" fill="currentColor" />
      <rect x="1" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelHeart({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="4" fill="currentColor" opacity="0.4" />
      <rect x="2" y="0" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="2" width="2" height="2" fill="currentColor" opacity="0.3" />
      <rect x="6" y="2" width="2" height="2" fill="currentColor" opacity="0.3" />
      <rect x="1" y="3" width="1" height="1" fill="currentColor" />
      <rect x="6" y="3" width="1" height="1" fill="currentColor" />
      <rect x="0" y="5" width="8" height="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelBook({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="0" width="6" height="8" fill="currentColor" opacity="0.1" />
      <rect x="0" y="1" width="2" height="6" fill="currentColor" opacity="0.15" />
      <rect x="2" y="2" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="4" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="3" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelSparkle({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="4" y="1" width="1" height="1" fill="currentColor" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" />
      <rect x="1" y="4" width="1" height="1" fill="currentColor" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" />
      <rect x="5" y="4" width="1" height="1" fill="currentColor" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" />
      <rect x="6" y="2" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelArrowUp({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-green-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="2" height="1" fill="currentColor" />
      <rect x="1" y="2" width="2" height="1" fill="currentColor" />
      <rect x="2" y="3" width="4" height="1" fill="currentColor" />
      <rect x="3" y="4" width="2" height="4" fill="currentColor" />
    </svg>
  );
}

function PixelTag({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.1" />
      <rect x="1" y="2" width="2" height="2" fill="currentColor" />
      <rect x="3" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="1" width="1" height="1" fill="currentColor" />
      <rect x="5" y="3" width="2" height="2" fill="currentColor" opacity="0.3" />
      <rect x="6" y="5" width="1" height="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

// ─── Mood Config ─────────────────────────────────────────────────────────────

const moodConfig: Record<string, { emoji: string; label: string; color: string; bg: string; text: string }> = {
  amazing: { emoji: '🤩', label: 'Amazing', color: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  great:   { emoji: '😄', label: 'Great',   color: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700' },
  good:    { emoji: '🙂', label: 'Good',    color: 'bg-blue-500',   bg: 'bg-blue-50',   text: 'text-blue-700' },
  okay:    { emoji: '😐', label: 'Okay',    color: 'bg-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700' },
  bad:     { emoji: '😔', label: 'Bad',     color: 'bg-red-500',    bg: 'bg-red-50',    text: 'text-red-700' },
};

const energyLabels = ['Dead', 'Tired', 'Okay', 'Energized', 'Unstoppable'];

// ─── Fake seed data ──────────────────────────────────────────────────────────

function generateSeedEntries(): JournalEntry[] {
  const now = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const moods: JournalEntry['mood'][] = ['amazing', 'great', 'good', 'okay', 'bad'];
    const mood = moods[Math.floor(Math.random() * moods.length)];
    const energy = (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5;
    return {
      id: `entry-${i}`,
      date: dateStr,
      mood,
      energy,
      wins: i === 0 ? [] : [
        ['Shipped the login screen', 'Fixed the auth bug', 'Deployed to staging'][i % 3],
        ['Hit the gym 3x this week', 'Completed the proposal', 'Reviewed all PRs'][i % 3],
      ],
      lessons: i === 0 ? [] : [
        ['Always read the changelog first', 'Trust the process, not the timeline', 'Document before you code'][i % 3],
      ],
      gratitude: i === 0 ? [] : [
        ['Morning coffee hits different', 'Got feedback that actually helped', 'Sunny weather this week'][i % 3],
        ['Team shipped on time', 'Clear requirements for once', 'Good night sleep'][i % 3],
      ],
      tomorrowFocus: i === 0 ? '' : ['Review PRs', 'Write docs', 'Team sync'][i % 3],
      tags: i % 3 === 0 ? ['work'] : i % 3 === 1 ? ['health', 'fitness'] : ['personal'],
    };
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function getDayOfWeek(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' });
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function JournalPage() {
  const todayStr = new Date().toISOString().slice(0, 10);

  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const seed = generateSeedEntries();
    // Ensure today has an empty entry ready
    if (!seed.find(e => e.date === todayStr)) {
      seed.unshift({ id: 'today', date: todayStr, mood: 'good', energy: 3, wins: [], lessons: [], gratitude: [], tomorrowFocus: '', tags: [] });
    }
    return seed;
  });

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [viewMode, setViewMode] = useState<'today' | 'history'>('today');

  const todayEntry = entries.find(e => e.date === todayStr)!;

  const updateEntry = (date: string, updates: Partial<JournalEntry>) => {
    setEntries(prev => prev.map(e => e.date === date ? { ...e, ...updates } : e));
  };

  const currentEntry = entries.find(e => e.date === selectedDate)!;

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10);
  });

  const tags = ['work', 'health', 'fitness', 'personal', 'learning', 'creative', 'social'];

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <PixelBook size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Daily Journal</h1>
            <p className="text-xs text-gray-500 mt-0.5">Reflect · Record · Grow</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-md p-0.5 gap-0.5">
            {(['today', 'history'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`text-[10px] px-3 py-1 rounded transition-colors font-medium uppercase tracking-wider ${
                  viewMode === mode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Today Mode — Full Journal Editor */}
      {viewMode === 'today' && (
        <div className="space-y-4">
          {/* Mood + Energy + Date Banner */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <div className="flex items-center gap-3">
                <PixelSparkle size={14} className="text-yellow-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{formatDate(todayStr)}</p>
                  <p className="text-[10px] text-gray-400">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              {/* Quick mood label */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">{moodConfig[todayEntry.mood].emoji}</span>
                <span className={`text-sm font-semibold ${moodConfig[todayEntry.mood].text}`}>
                  {moodConfig[todayEntry.mood].label}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 flex items-center gap-6">
              {/* Mood selector */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider mr-1">Mood</span>
                {(Object.keys(moodConfig) as JournalEntry['mood'][]).map(m => (
                  <button
                    key={m}
                    onClick={() => updateEntry(todayStr, { mood: m })}
                    className={`text-xl p-1.5 rounded-lg border-2 transition-all ${
                      todayEntry.mood === m
                        ? `border-2 ${moodConfig[m].color} bg-opacity-10 scale-110`
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                    style={todayEntry.mood === m ? { borderColor: moodConfig[m].color.replace('bg-', '#') } : {}}
                  >
                    {moodConfig[m].emoji}
                  </button>
                ))}
              </div>

              <div className="h-8 w-px bg-gray-100" />

              {/* Energy selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Energy</span>
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => updateEntry(todayStr, { energy: n as 1 | 2 | 3 | 4 | 5 })}
                    className="w-7 h-7 rounded border text-xs font-bold transition-all flex items-center justify-center"
                    style={{
                      backgroundColor: todayEntry.energy >= n
                        ? (n >= 4 ? '#22c55e20' : n >= 2 ? '#3b82f620' : '#ef444420')
                        : '#f9f9f9',
                      borderColor: todayEntry.energy >= n
                        ? (n >= 4 ? '#22c55e' : n >= 2 ? '#3b82f6' : '#ef4444')
                        : '#e5e7eb',
                      color: todayEntry.energy >= n
                        ? (n >= 4 ? '#16a34a' : n >= 2 ? '#2563eb' : '#dc2626')
                        : '#d1d5db',
                    }}
                  >
                    {n}
                  </button>
                ))}
                <span className="text-[10px] text-gray-400 ml-1">{energyLabels[todayEntry.energy - 1]}</span>
              </div>

              <div className="h-8 w-px bg-gray-100" />

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <PixelTag size={12} />
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      const current = todayEntry.tags;
                      const has = current.includes(tag);
                      updateEntry(todayStr, { tags: has ? current.filter(t => t !== tag) : [...current, tag] });
                    }}
                    className={`text-[9px] px-2 py-0.5 rounded-full border transition-colors ${
                      todayEntry.tags.includes(tag)
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'text-gray-400 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main 3-column journal grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Wins */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2"
                style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
                <PixelArrowUp size={12} />
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Wins</h3>
                <span className="ml-auto text-[9px] text-gray-400">{todayEntry.wins.length}</span>
              </div>
              <div className="p-3 flex-1">
                <div className="space-y-2">
                  {todayEntry.wins.map((win, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <PixelStar size={10} />
                      <span className="text-xs text-gray-700 leading-relaxed">{win}</span>
                    </div>
                  ))}
                  <WinsInput
                    onAdd={(win) => updateEntry(todayStr, { wins: [...todayEntry.wins, win] })}
                    onRemove={(i) => updateEntry(todayStr, { wins: todayEntry.wins.filter((_, idx) => idx !== i) })}
                  />
                </div>
              </div>
            </div>

            {/* Lessons */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2"
                style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
                <PixelPen size={12} className="text-indigo-500" />
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Lessons</h3>
                <span className="ml-auto text-[9px] text-gray-400">{todayEntry.lessons.length}</span>
              </div>
              <div className="p-3 flex-1">
                <div className="space-y-2">
                  {todayEntry.lessons.map((lesson, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <PixelHeart size={10} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 leading-relaxed">{lesson}</span>
                    </div>
                  ))}
                  <TextInput
                    placeholder="What did you learn today?"
                    onAdd={(val) => updateEntry(todayStr, { lessons: [...todayEntry.lessons, val] })}
                    onRemove={(i) => updateEntry(todayStr, { lessons: todayEntry.lessons.filter((_, idx) => idx !== i) })}
                    accentColor="indigo"
                  />
                </div>
              </div>
            </div>

            {/* Gratitude */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2"
                style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
                <PixelHeart size={12} className="text-red-400" />
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Gratitude</h3>
                <span className="ml-auto text-[9px] text-gray-400">{todayEntry.gratitude.length}</span>
              </div>
              <div className="p-3 flex-1">
                <div className="space-y-2">
                  {todayEntry.gratitude.map((g, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <PixelSparkle size={10} className="text-yellow-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 leading-relaxed">{g}</span>
                    </div>
                  ))}
                  <TextInput
                    placeholder="What are you grateful for?"
                    onAdd={(val) => updateEntry(todayStr, { gratitude: [...todayEntry.gratitude, val] })}
                    onRemove={(i) => updateEntry(todayStr, { gratitude: todayEntry.gratitude.filter((_, idx) => idx !== i) })}
                    accentColor="yellow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tomorrow's Focus */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelArrowUp size={12} />
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Tomorrow&apos;s Focus</h3>
            </div>
            <div className="p-4">
              <input
                type="text"
                value={todayEntry.tomorrowFocus}
                onChange={e => updateEntry(todayStr, { tomorrowFocus: e.target.value })}
                placeholder="What's the one thing you want to accomplish tomorrow?"
                className="w-full text-sm text-gray-800 placeholder-gray-300 outline-none font-medium"
              />
            </div>
          </div>

          {/* Week at a glance */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelSparkle size={12} className="text-yellow-400" />
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">This Week</h3>
            </div>
            <div className="px-5 py-4">
              <div className="grid grid-cols-7 gap-3">
                {last7Days.map(date => {
                  const entry = entries.find(e => e.date === date);
                  return (
                    <button
                      key={date}
                      onClick={() => { setSelectedDate(date); setViewMode('history'); }}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all hover:border-gray-400 ${
                        date === todayStr ? 'border-indigo-300 bg-indigo-50' : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <span className="text-[9px] text-gray-400 font-medium">{getDayOfWeek(date)}</span>
                      <span className="text-xl">{entry ? moodConfig[entry.mood].emoji : '·'}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(n => (
                          <div
                            key={n}
                            className={`w-1.5 h-1.5 rounded-sm ${
                              entry && entry.energy >= n
                                ? (n >= 4 ? 'bg-green-400' : n >= 2 ? 'bg-blue-400' : 'bg-red-400')
                                : 'bg-gray-100'
                            }`}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Mode */}
      {viewMode === 'history' && (
        <div className="space-y-4">
          {/* Date picker row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {entries.slice(0, 30).map(entry => (
              <button
                key={entry.date}
                onClick={() => setSelectedDate(entry.date)}
                className={`shrink-0 px-3 py-2 rounded-lg border text-center transition-all ${
                  selectedDate === entry.date
                    ? 'border-indigo-400 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-[9px] text-gray-400">{getDayOfWeek(entry.date)}</div>
                <div className="text-lg">{moodConfig[entry.mood].emoji}</div>
                <div className="text-[8px] text-gray-400 mt-0.5">
                  {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </button>
            ))}
          </div>

          {/* Selected entry detail */}
          {currentEntry && (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4"
                style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
                <span className="text-3xl">{moodConfig[currentEntry.mood].emoji}</span>
                <div>
                  <p className="text-base font-semibold text-gray-900">{formatDate(currentEntry.date)}</p>
                  <p className="text-xs text-gray-500">
                    {moodConfig[currentEntry.mood].label} · Energy {currentEntry.energy}/5 ({energyLabels[currentEntry.energy - 1]})
                    {currentEntry.tags.length > 0 && ` · ${currentEntry.tags.join(', ')}`}
                  </p>
                </div>
              </div>

              <div className="px-6 py-5 grid grid-cols-3 gap-6">
                {/* Wins */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <PixelArrowUp size={12} />
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Wins</span>
                  </div>
                  <div className="space-y-2">
                    {currentEntry.wins.length === 0 ? (
                      <p className="text-xs text-gray-300 italic">No wins recorded</p>
                    ) : (
                      currentEntry.wins.map((w, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <PixelStar size={10} />
                          <span className="text-xs text-gray-700 leading-relaxed">{w}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Lessons */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <PixelPen size={12} className="text-indigo-500" />
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Lessons</span>
                  </div>
                  <div className="space-y-2">
                    {currentEntry.lessons.length === 0 ? (
                      <p className="text-xs text-gray-300 italic">No lessons recorded</p>
                    ) : (
                      currentEntry.lessons.map((l, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <PixelHeart size={10} className="text-red-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-700 leading-relaxed">{l}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Gratitude */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <PixelHeart size={12} className="text-red-400" />
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Gratitude</span>
                  </div>
                  <div className="space-y-2">
                    {currentEntry.gratitude.length === 0 ? (
                      <p className="text-xs text-gray-300 italic">No gratitude recorded</p>
                    ) : (
                      currentEntry.gratitude.map((g, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <PixelSparkle size={10} className="text-yellow-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-700 leading-relaxed">{g}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Tomorrow focus */}
              {currentEntry.tomorrowFocus && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <PixelArrowUp size={12} />
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Tomorrow&apos;s Focus</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{currentEntry.tomorrowFocus}</p>
                </div>
              )}
            </div>
          )}

          {/* Streak / Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Entries', value: entries.length, icon: <PixelBook size={14} /> },
              { label: 'Best Mood Streak', value: '3 days', icon: <PixelStar size={14} /> },
              { label: 'Avg Energy', value: '3.4 / 5', icon: <PixelSparkle size={14} className="text-blue-400" /> },
            ].map(stat => (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
                <div className="text-gray-400">{stat.icon}</div>
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-sm font-bold font-mono text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function WinsInput({ onAdd, onRemove }: { onAdd: (s: string) => void; onRemove?: (i: number) => void }) {
  const [val, setVal] = useState('');
  return (
    <div className="flex items-center gap-1.5">
      <PixelStar size={10} className="text-gray-300 shrink-0" />
      <input
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && val.trim()) {
            onAdd(val.trim());
            setVal('');
          }
          if (e.key === 'Backspace' && !val) {
            // placeholder for delete-last-item behavior
          }
        }}
        placeholder="Add a win..."
        className="flex-1 text-xs text-gray-700 placeholder-gray-300 outline-none"
      />
    </div>
  );
}

function TextInput({ placeholder, onAdd, onRemove, accentColor = 'gray' }: {
  placeholder: string;
  onAdd: (s: string) => void;
  onRemove?: (i: number) => void;
  accentColor?: string;
}) {
  const [val, setVal] = useState('');
  const colorClass = accentColor === 'indigo' ? 'text-indigo-400' : accentColor === 'yellow' ? 'text-yellow-400' : 'text-gray-300';
  return (
    <div className="flex items-center gap-1.5">
      <div className={`shrink-0 ${colorClass}`}>
        <svg width="10" height="10" viewBox="0 0 8 8" shapeRendering="crispEdges">
          <rect x="3" y="0" width="2" height="8" fill="currentColor" />
        </svg>
      </div>
      <input
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && val.trim()) {
            onAdd(val.trim());
            setVal('');
          }
        }}
        placeholder={placeholder}
        className="flex-1 text-xs text-gray-700 placeholder-gray-300 outline-none"
      />
    </div>
  );
}