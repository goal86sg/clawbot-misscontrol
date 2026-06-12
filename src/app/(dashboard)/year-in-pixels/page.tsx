'use client';

import React, { useState, useEffect } from 'react';
import { PixelSparkle, PixelClock, PixelHeart } from '@/lib/pixel-icons';

// ─── Pixel Icons ─────────────────────────────────────────────────────────────

function PixelCalendar({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="1" width="8" height="7" fill="currentColor" opacity="0.15" />
      <rect x="0" y="1" width="8" height="2" fill="currentColor" opacity="0.4" />
      <rect x="1" y="0" width="1" height="3" fill="currentColor" opacity="0.3" />
      <rect x="6" y="0" width="1" height="3" fill="currentColor" opacity="0.3" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="5" width="1" height="1" fill="currentColor" opacity="0.2" />
      <rect x="3" y="6" width="1" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelGrid({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-500" shapeRendering="crispEdges">
      <rect x="0" y="0" width="3" height="3" fill="currentColor" opacity="0.2" />
      <rect x="4" y="0" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="0" y="4" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="4" y="4" width="3" height="3" fill="currentColor" opacity="0.2" />
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
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelStar({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="8" height="2" fill="currentColor" />
      <rect x="1" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelMoonSmall({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="1" width="5" height="5" fill="currentColor" opacity="0.4" />
      <rect x="2" y="0" width="2" height="1" fill="currentColor" />
      <rect x="0" y="2" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface DayEntry {
  date: string;
  day: number;
  month: number;
  year: number;
  score: 0 | 1 | 2 | 3 | 4 | 5;
  mood: 'great' | 'good' | 'okay' | 'rough' | 'tough';
  energy: number; // 0-100
  productivity: number; // 0-100
  highlight?: string;
  tags: string[];
}

interface MonthData {
  name: string;
  short: string;
  days: number;
  startWeekday: number; // 0=Sun
}

// ─── Color Palette for Scores ─────────────────────────────────────────────────

const scoreColors: Record<number, string> = {
  0: '#f1f5f9', // empty/no data
  1: '#fecaca', // tough
  2: '#fed7aa', // rough
  3: '#fef08a', // okay
  4: '#bbf7d0', // good
  5: '#86efac', // great
};

const moodLabels: Record<string, string> = {
  great: '😄 Great',
  good: '🙂 Good',
  okay: '😐 Okay',
  rough: '😔 Rough',
  tough: '😤 Tough',
};

const tagColors: Record<string, string> = {
  workout: 'bg-green-100 text-green-700',
  deepwork: 'bg-blue-100 text-blue-700',
  social: 'bg-pink-100 text-pink-700',
  learning: 'bg-purple-100 text-purple-700',
  travel: 'bg-amber-100 text-amber-700',
  creative: 'bg-cyan-100 text-cyan-700',
  sick: 'bg-red-100 text-red-700',
  rest: 'bg-gray-100 text-gray-600',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMonthData(year: number): MonthData[] {
  return [
    { name: 'January', short: 'Jan', days: 31, startWeekday: new Date(year, 0, 1).getDay() },
    { name: 'February', short: 'Feb', days: 28, startWeekday: new Date(year, 1, 1).getDay() },
    { name: 'March', short: 'Mar', days: 31, startWeekday: new Date(year, 2, 1).getDay() },
    { name: 'April', short: 'Apr', days: 30, startWeekday: new Date(year, 3, 1).getDay() },
    { name: 'May', short: 'May', days: 31, startWeekday: new Date(year, 4, 1).getDay() },
    { name: 'June', short: 'Jun', days: 30, startWeekday: new Date(year, 5, 1).getDay() },
    { name: 'July', short: 'Jul', days: 31, startWeekday: new Date(year, 6, 1).getDay() },
    { name: 'August', short: 'Aug', days: 31, startWeekday: new Date(year, 7, 1).getDay() },
    { name: 'September', short: 'Sep', days: 30, startWeekday: new Date(year, 8, 1).getDay() },
    { name: 'October', short: 'Oct', days: 31, startWeekday: new Date(year, 9, 1).getDay() },
    { name: 'November', short: 'Nov', days: 30, startWeekday: new Date(year, 10, 1).getDay() },
    { name: 'December', short: 'Dec', days: 31, startWeekday: new Date(year, 11, 1).getDay() },
  ];
}

function generateYearData(year: number): DayEntry[] {
  const moods: DayEntry['mood'][] = ['great', 'good', 'good', 'good', 'okay', 'okay', 'rough', 'tough'];
  const allTags = Object.keys(tagColors);
  const result: DayEntry[] = [];

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const moodIndex = Math.floor(Math.random() * moods.length);
      const mood = moods[moodIndex];
      const score = (moodIndex >= 6 ? 1 : moodIndex >= 4 ? 2 : moodIndex >= 3 ? 3 : moodIndex >= 1 ? 4 : 5) as DayEntry['score'];
      const energy = Math.round(40 + Math.random() * 55 + (score - 3) * 10);
      const productivity = Math.round(30 + Math.random() * 65 + (score - 3) * 12);

      // Add tags probabilistically
      const tags: string[] = [];
      if (Math.random() > 0.7) tags.push(allTags[Math.floor(Math.random() * allTags.length)]);
      if (Math.random() > 0.8) tags.push(allTags[Math.floor(Math.random() * allTags.length)]);

      const highlights = [
        'Shipped the eBPF probe v0.3',
        'Morning run + cold shower',
        'Deep work on PostgreSQL DAM',
        'Team sync — blockers resolved',
        'Read "Designing Data-Intensive Applications"',
        'K8s cluster upgrade complete',
        'Weekend hike at MacRitchie',
        'Code review session with team',
        '',
        '',
        '',
      ];

      result.push({
        date: dateStr,
        day,
        month,
        year,
        score,
        mood,
        energy: Math.min(100, Math.max(0, energy)),
        productivity: Math.min(100, Math.max(0, productivity)),
        highlight: highlights[Math.floor(Math.random() * highlights.length)] || undefined,
        tags,
      });
    }
  }
  return result;
}

// ─── Year Grid ───────────────────────────────────────────────────────────────

function YearGrid({ data, selected, onSelect }: {
  data: DayEntry[];
  selected: DayEntry | null;
  onSelect: (d: DayEntry) => void;
}) {
  const months = getMonthData(2026);
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Find entry by date
  const getEntry = (date: string) => data.find(d => d.date === date);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div
        className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
      >
        <PixelGrid size={14} />
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">2026 at a Glance</h2>
        <span className="ml-auto text-[9px] text-gray-400">{data.filter(d => d.score > 0).length} days logged</span>
      </div>

      <div className="p-5 overflow-x-auto">
        {/* Day labels */}
        <div className="flex mb-1 ml-8">
          {dayLabels.map((l, i) => (
            <div key={i} className="w-[14px] mr-[2px] text-center text-[8px] text-gray-300 font-mono">{l}</div>
          ))}
        </div>

        <div className="flex flex-col gap-0.5">
          {months.map((month, mi) => (
            <div key={mi} className="flex items-center gap-1">
              {/* Month label */}
              <div className="w-7 text-[8px] text-gray-400 font-mono shrink-0 text-right pr-1">
                {month.short}
              </div>

              {/* Empty offset for first week */}
              <div className="flex gap-[2px]" style={{ width: month.startWeekday * 16 }}>
                {Array.from({ length: month.startWeekday }, (_, i) => (
                  <div key={i} className="w-3 h-3" />
                ))}
              </div>

              {/* Day pixels */}
              <div className="flex gap-[2px] flex-wrap">
                {Array.from({ length: month.days }, (_, di) => {
                  const dateStr = `${month.short.toUpperCase().slice(0, 3)} ${di + 1}`;
                  const actualDate = `${2026}-${String(mi + 1).padStart(2, '0')}-${String(di + 1).padStart(2, '0')}`;
                  const entry = getEntry(actualDate);
                  const score = entry?.score ?? 0;
                  const isSelected = selected?.date === actualDate;

                  return (
                    <button
                      key={di}
                      onClick={() => entry && onSelect(entry)}
                      className="w-3 h-3 rounded-sm transition-all hover:scale-125 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      style={{
                        backgroundColor: scoreColors[score],
                        boxShadow: isSelected ? `0 0 0 2px #6366f1` : 'none',
                      }}
                      title={`${actualDate}: ${entry ? moodLabels[entry.mood] : 'no data'}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
          <span className="text-[9px] text-gray-400 uppercase tracking-wider">Score:</span>
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: scoreColors[s] }} />
              <span className="text-[8px] text-gray-400">
                {s === 1 ? 'Tough' : s === 2 ? 'Rough' : s === 3 ? 'Okay' : s === 4 ? 'Good' : 'Great'}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1 ml-4">
            <div className="w-3 h-3 rounded-sm border border-dashed border-gray-300" style={{ backgroundColor: '#f9f9f9' }} />
            <span className="text-[8px] text-gray-400">No data</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Month Stats Card ─────────────────────────────────────────────────────────

function MonthStat({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <p className="text-[9px] text-gray-400 uppercase tracking-widest">{label}</p>
      <p className={`text-xl font-bold font-mono mt-0.5 ${color}`}>{value}</p>
      <p className="text-[9px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

// ─── Day Detail Panel ─────────────────────────────────────────────────────────

function DayDetail({ entry, onClose }: { entry: DayEntry; onClose: () => void }) {
  const scoreColor = scoreColors[entry.score];
  const date = new Date(entry.date + 'T00:00:00');
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const moodColor: Record<string, string> = {
    great: 'text-green-600',
    good: 'text-blue-600',
    okay: 'text-yellow-600',
    rough: 'text-orange-500',
    tough: 'text-red-500',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: scoreColor, boxShadow: `0 0 0 2px ${scoreColor}40` }}
          />
          <div>
            <h3 className="text-xs font-semibold text-gray-900">{dayName}</h3>
            <p className="text-[9px] text-gray-400">{dateStr}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[10px] text-gray-400 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          ✕ Close
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Mood + Score */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Mood</p>
            <p className={`text-lg font-bold ${moodColor[entry.mood]}`}>{moodLabels[entry.mood]}</p>
          </div>
          <div className="text-center px-4 py-2 rounded-lg" style={{ backgroundColor: `${scoreColor}50` }}>
            <p className="text-[9px] text-gray-500">Score</p>
            <p className="text-2xl font-bold font-mono" style={{ color: scoreColor === '#f1f5f9' ? '#94a3b8' : scoreColor === '#86efac' ? '#16a34a' : scoreColor === '#bbf7d0' ? '#15803d' : scoreColor === '#fef08a' ? '#ca8a04' : scoreColor === '#fed7aa' ? '#c2410c' : '#dc2626' }}>
              {entry.score}/5
            </p>
          </div>
        </div>

        {/* Energy + Productivity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <PixelFire size={12} />
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Energy</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${entry.energy}%`,
                    backgroundColor: entry.energy >= 70 ? '#22c55e' : entry.energy >= 40 ? '#eab308' : '#ef4444',
                  }}
                />
              </div>
              <span className="text-xs font-bold font-mono text-gray-700">{entry.energy}%</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <PixelSparkle size={12} className="text-blue-500" />
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Productivity</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${entry.productivity}%`,
                    backgroundColor: entry.productivity >= 70 ? '#3b82f6' : entry.productivity >= 40 ? '#8b5cf6' : '#ef4444',
                  }}
                />
              </div>
              <span className="text-xs font-bold font-mono text-gray-700">{entry.productivity}%</span>
            </div>
          </div>
        </div>

        {/* Highlight */}
        {entry.highlight && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-3">
            <div className="flex items-center gap-1.5 mb-1">
              <PixelStar size={10} />
              <p className="text-[9px] text-indigo-500 uppercase tracking-widest font-semibold">Highlight</p>
            </div>
            <p className="text-xs text-indigo-700 leading-relaxed">{entry.highlight}</p>
          </div>
        )}

        {/* Tags */}
        {entry.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest w-full mb-1">Tags</p>
            {entry.tags.map(tag => (
              <span
                key={tag}
                className={`text-[9px] px-2 py-1 rounded-full font-medium ${tagColors[tag] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Monthly Summary Grid ─────────────────────────────────────────────────────

function MonthlySummary({ data }: { data: DayEntry[] }) {
  const months = getMonthData(2026);

  const monthStats = months.map((month, mi) => {
    const monthData = data.filter(d => d.month === mi);
    const loggedDays = monthData.filter(d => d.score > 0);
    const avgScore = loggedDays.length
      ? loggedDays.reduce((s, d) => s + d.score, 0) / loggedDays.length
      : 0;
    const avgEnergy = loggedDays.length
      ? loggedDays.reduce((s, d) => s + d.energy, 0) / loggedDays.length
      : 0;
    const avgProductivity = loggedDays.length
      ? loggedDays.reduce((s, d) => s + d.productivity, 0) / loggedDays.length
      : 0;
    const greatDays = loggedDays.filter(d => d.score === 5).length;
    const roughDays = loggedDays.filter(d => d.score <= 2).length;
    const topTags = loggedDays.flatMap(d => d.tags);
    const tagCounts = topTags.reduce((acc: Record<string, number>, t) => { acc[t] = (acc[t] || 0) + 1; return acc; }, {});
    const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

    return {
      ...month,
      index: mi,
      loggedDays: loggedDays.length,
      avgScore,
      avgEnergy,
      avgProductivity,
      greatDays,
      roughDays,
      topTag,
    };
  });

  const monthColor = (avg: number) =>
    avg >= 4.5 ? '#22c55e' : avg >= 3.5 ? '#3b82f6' : avg >= 2.5 ? '#eab308' : avg >= 1.5 ? '#f97316' : '#ef4444';

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div
        className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
      >
        <PixelCalendar size={14} />
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Breakdown</h2>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {monthStats.slice(0, 4).map(m => (
            <MonthStat
              key={m.index}
              label={m.short}
              value={m.avgScore > 0 ? m.avgScore.toFixed(1) : '—'}
              sub={`${m.loggedDays}d logged · ${m.greatDays} great`}
              color={m.avgScore > 0 ? monthColor(m.avgScore) : 'text-gray-300'}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {monthStats.slice(4, 8).map(m => (
            <MonthStat
              key={m.index}
              label={m.short}
              value={m.avgScore > 0 ? m.avgScore.toFixed(1) : '—'}
              sub={`${m.loggedDays}d logged · ${m.greatDays} great`}
              color={m.avgScore > 0 ? monthColor(m.avgScore) : 'text-gray-300'}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {monthStats.slice(8, 12).map(m => (
            <MonthStat
              key={m.index}
              label={m.short}
              value={m.avgScore > 0 ? m.avgScore.toFixed(1) : '—'}
              sub={`${m.loggedDays}d logged · ${m.greatDays} great`}
              color={m.avgScore > 0 ? monthColor(m.avgScore) : 'text-gray-300'}
            />
          ))}
        </div>
      </div>

      {/* Tag frequency */}
      <div className="px-5 py-3 border-t border-gray-100">
        <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-2">Most Common Tags</p>
        <div className="flex flex-wrap gap-1.5">
          {(() => {
            const tagCounts: Record<string, number> = {};
            data.forEach(d => d.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
            return Object.entries(tagCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 8)
              .map(([tag, count]) => (
                <span key={tag} className={`text-[9px] px-2 py-1 rounded-full font-medium ${tagColors[tag] ?? 'bg-gray-100 text-gray-600'}`}>
                  {tag} <span className="opacity-60">{count}x</span>
                </span>
              ));
          })()}
        </div>
      </div>
    </div>
  );
}

// ─── Annual Stats Strip ───────────────────────────────────────────────────────

function AnnualStats({ data }: { data: DayEntry[] }) {
  const loggedDays = data.filter(d => d.score > 0);
  const avgScore = loggedDays.length ? loggedDays.reduce((s, d) => s + d.score, 0) / loggedDays.length : 0;
  const avgEnergy = loggedDays.length ? loggedDays.reduce((s, d) => s + d.energy, 0) / loggedDays.length : 0;
  const avgProductivity = loggedDays.length ? loggedDays.reduce((s, d) => s + d.productivity, 0) / loggedDays.length : 0;
  const greatDays = loggedDays.filter(d => d.score === 5).length;
  const toughDays = loggedDays.filter(d => d.score === 1).length;
  const streak = (() => {
    let s = 0;
    const sorted = [...loggedDays].sort((a, b) => b.date.localeCompare(a.date));
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].score >= 4) s++;
      else break;
    }
    return s;
  })();

  const stats = [
    { label: 'Days Logged', value: loggedDays.length.toString(), sub: 'of 365', color: 'text-indigo-600' },
    { label: 'Avg Score', value: avgScore.toFixed(2), sub: '/ 5.0', color: 'text-purple-600' },
    { label: 'Avg Energy', value: `${Math.round(avgEnergy)}%`, sub: 'all year', color: 'text-orange-500' },
    { label: 'Avg Productivity', value: `${Math.round(avgProductivity)}%`, sub: 'all year', color: 'text-blue-600' },
    { label: 'Great Days', value: greatDays.toString(), sub: 'score 5/5', color: 'text-green-600' },
    { label: 'Tough Days', value: toughDays.toString(), sub: 'score 1/5', color: 'text-red-500' },
    { label: 'Current Streak', value: `${streak}d`, sub: '≥ good days', color: 'text-yellow-600' },
  ];

  return (
    <div className="grid grid-cols-7 gap-3">
      {stats.map(stat => (
        <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">{stat.label}</p>
          <p className={`text-xl font-bold font-mono mt-1 ${stat.color}`}>{stat.value}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Quarter View ─────────────────────────────────────────────────────────────

function QuarterView({ data, quarter }: { data: DayEntry[]; quarter: 1 | 2 | 3 | 4 }) {
  const months = getMonthData(2026);
  const qRanges: [number, number][] = [[0, 2], [3, 5], [6, 8], [9, 11]];
  const [startM, endM] = qRanges[quarter - 1];
  const qMonths = months.slice(startM, endM + 1);
  const qData = data.filter(d => d.month >= startM && d.month <= endM);

  const avgScore = qData.filter(d => d.score > 0).length
    ? qData.filter(d => d.score > 0).reduce((s, d) => s + d.score, 0) / qData.filter(d => d.score > 0).length
    : 0;
  const avgEnergy = qData.filter(d => d.score > 0).length
    ? qData.filter(d => d.score > 0).reduce((s, d) => s + d.energy, 0) / qData.filter(d => d.score > 0).length
    : 0;

  const getEntry = (date: string) => qData.find(d => d.date === date);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div
        className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
      >
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Q{quarter} {quarter === 1 ? 'Jan – Mar' : quarter === 2 ? 'Apr – Jun' : quarter === 3 ? 'Jul – Sep' : 'Oct – Dec'}
        </h2>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-gray-400">Avg: <span className="font-bold text-gray-700">{avgScore.toFixed(1)}</span></span>
          <span className="text-gray-400">Energy: <span className="font-bold text-gray-700">{Math.round(avgEnergy)}%</span></span>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        {qMonths.map((month, mi) => (
          <div key={mi} className="mb-3 last:mb-0">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{month.name}</p>
            <div className="flex flex-wrap gap-[2px]">
              {/* Offset for first week */}
              {Array.from({ length: month.startWeekday }, (_, i) => (
                <div key={`empty-${i}`} className="w-3 h-3" />
              ))}
              {Array.from({ length: month.days }, (_, di) => {
                const actualDate = `${2026}-${String(startM + mi + 1).padStart(2, '0')}-${String(di + 1).padStart(2, '0')}`;
                const entry = getEntry(actualDate);
                const score = entry?.score ?? 0;
                return (
                  <div
                    key={di}
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: scoreColors[score] }}
                    title={`${actualDate}: ${entry ? moodLabels[entry.mood] : 'no data'}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function YearInPixelsPage() {
  const yearData = generateYearData(2026);
  const [selectedDay, setSelectedDay] = useState<DayEntry | null>(null);
  const [activeView, setActiveView] = useState<'year' | 'quarters'>('year');
  const [time, setTime] = useState('');

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

  const loggedDays = yearData.filter(d => d.score > 0).length;
  const greatDays = yearData.filter(d => d.score === 5).length;
  const yearAvg = yearData.filter(d => d.score > 0).length
    ? yearData.filter(d => d.score > 0).reduce((s, d) => s + d.score, 0) / yearData.filter(d => d.score > 0).length
    : 0;

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <PixelCalendar size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Year in Pixels</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {loggedDays} days logged · {greatDays} great days · avg {yearAvg.toFixed(1)}/5
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded">
            <PixelClock size={11} />
            <span>{time}</span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-md p-0.5 gap-0.5">
            {(['year', 'quarters'] as const).map(view => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`text-[10px] px-3 py-1 rounded transition-colors font-medium uppercase tracking-wider ${
                  activeView === view ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Annual Stats */}
      <AnnualStats data={yearData} />

      {/* Main View */}
      {activeView === 'year' ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <YearGrid data={yearData} selected={selectedDay} onSelect={setSelectedDay} />
          </div>
          <div>
            {selectedDay ? (
              <DayDetail entry={selectedDay} onClose={() => setSelectedDay(null)} />
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full">
                <div
                  className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
                  style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
                >
                  <PixelHeart size={12} className="text-pink-400" />
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Day Detail</h3>
                </div>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
                    <PixelMoonSmall size={24} />
                  </div>
                  <p className="text-xs text-gray-400">Click any pixel to see day details</p>
                  <p className="text-[10px] text-gray-300 mt-1">Mood · Energy · Productivity · Tags</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <QuarterView data={yearData} quarter={1} />
          <QuarterView data={yearData} quarter={2} />
          <QuarterView data={yearData} quarter={3} />
          <QuarterView data={yearData} quarter={4} />
        </div>
      )}

      {/* Monthly Summary */}
      <MonthlySummary data={yearData} />

      {/* Pixel Art Footer */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2"
            style={{
              backgroundColor: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'][i % 5],
              borderRadius: i % 3 === 0 ? '50%' : '2px',
              opacity: Math.sin(i * 0.5) * 0.3 + 0.7,
            }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Year in Pixels · Screen 42
      </p>
    </div>
  );
}