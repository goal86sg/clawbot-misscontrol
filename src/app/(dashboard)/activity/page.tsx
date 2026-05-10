'use client';

import React, { useState, useEffect } from 'react';
import { PixelSparkle, PixelClock } from '@/lib/pixel-icons';
import { PixelActivity as PixelAct } from '@/lib/pixel-icons-extra';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_INDEX = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

// Activity levels: 0=none, 1=low, 2=medium, 3=high, 4=peak
function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const levelColors: Record<number, string> = {
  0: 'bg-gray-100',
  1: 'bg-green-200',
  2: 'bg-green-400',
  3: 'bg-green-500',
  4: 'bg-green-700',
};

// Generate realistic activity data anchored to today
function generateActivityData(): Record<string, number> {
  const data: Record<string, number> = {};
  const today = new Date('2026-05-10'); // anchored to today
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364); // ~52 weeks back

  for (let i = 0; i < 365; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().substring(0, 10);
    const dayOfWeek = d.getDay(); // 0=Sun, 1=Mon...
    const weekOfYear = Math.floor(i / 7);

    // Base activity pattern
    let base = 0;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekends: lower activity
      base = Math.random() < 0.3 ? Math.floor(Math.random() * 3) : 0;
    } else {
      // Weekdays: higher activity
      base = Math.floor(Math.random() * 10);
    }

    // Boost for known build days (recent days have more activity)
    if (i > 330) base = Math.floor(Math.random() * 12) + 2; // last month: heavy
    if (i > 350) base = Math.floor(Math.random() * 15) + 4; // last 2 weeks: very heavy

    // Simulate known events
    // May 7: MC v2 built (many commits)
    if (key === '2026-05-07') base = 14;
    if (key === '2026-05-06') base = 8;
    if (key === '2026-05-08') base = 7;
    if (key === '2026-05-09') base = 5;
    if (key === '2026-05-10') base = 6; // today: still active
    if (key === '2026-04-25') base = 9; // bootstrap day
    if (key === '2026-04-28') base = 6;
    if (key === '2026-05-02') base = 7;
    if (key === '2026-05-03') base = 10;

    data[key] = base;
  }
  return data;
}

// Build a 52-week grid from activity data
interface DayCell {
  date: string;
  count: number;
  level: number;
  dayOfWeek: number; // 0=Mon
}

function buildGrid(data: Record<string, number>): DayCell[][] {
  const today = new Date('2026-05-10');
  const weeks: DayCell[][] = [];
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);

  let currentWeek: DayCell[] = [];
  const startDow = (startDate.getDay() + 6) % 7; // Mon=0

  // Pad the first week with null cells before startDate
  for (let i = 0; i < startDow; i++) {
    currentWeek.push({ date: '', count: 0, level: 0, dayOfWeek: i });
  }

  for (let i = 0; i < 365; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().substring(0, 10);
    const dow = (d.getDay() + 6) % 7; // Mon=0
    const count = data[key] || 0;
    currentWeek.push({ date: key, count, level: getLevel(count), dayOfWeek: dow });

    if (dow === 6) {
      // Sunday = end of week
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  return weeks;
}

// Stats from activity data
function computeStats(data: Record<string, number>) {
  const today = new Date('2026-05-10');
  const yearAgo = new Date(today);
  yearAgo.setDate(yearAgo.getDate() - 364);

  let totalContribs = 0;
  let activeDays = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const last365: string[] = [];

  for (let i = 0; i < 365; i++) {
    const d = new Date(yearAgo);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().substring(0, 10);
    const count = data[key] || 0;
    last365.push(key);
    totalContribs += count;
    if (count > 0) {
      activeDays++;
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Compute current streak (backwards from today)
  for (let i = 364; i >= 0; i--) {
    const key = last365[i];
    if (data[key] > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Peak day
  let peakDay = '';
  let peakCount = 0;
  for (const [k, v] of Object.entries(data)) {
    if (v > peakCount) {
      peakCount = v;
      peakDay = k;
    }
  }

  return { totalContribs, activeDays, currentStreak, longestStreak, peakDay, peakCount };
}

const CELL_SIZE = 12;
const CELL_GAP = 3;
const WEEK_COUNT = 53;
const GRID_WIDTH = WEEK_COUNT * (CELL_SIZE + CELL_GAP);

export default function ActivityPage() {
  const [data] = useState<Record<string, number>>(() => generateActivityData());
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const grid = buildGrid(data);
  const stats = computeStats(data);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  // Month labels — compute which column each month starts in
  const monthLabels: { label: string; col: number }[] = [];
  if (grid.length > 0) {
    const firstDay = grid[0].find(c => c.date !== '');
    if (firstDay) {
      const firstDate = new Date(firstDay.date);
      let lastMonth = firstDate.getMonth();
      for (let w = 0; w < grid.length; w++) {
        const cell = grid[w].find(c => c.date !== '');
        if (cell) {
          const d = new Date(cell.date);
          if (d.getMonth() !== lastMonth) {
            monthLabels.push({ label: MONTHS[d.getMonth()], col: w });
            lastMonth = d.getMonth();
          }
        }
      }
    }
  }

  const selectedData = selected ? { date: selected, count: data[selected] || 0 } : null;

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <PixelAct size={18} className="text-green-600" />
            Activity History
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">365-day contribution heatmap · workspace activity</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
          <PixelClock size={12} />
          <span>Year ending May 10, 2026</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 font-mono">{stats.totalContribs.toLocaleString()}</p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">contributions</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600 font-mono">{stats.activeDays}</p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">active days</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className={`text-2xl font-bold font-mono ${stats.currentStreak >= 3 ? 'text-green-600' : 'text-gray-900'}`}>
            {stats.currentStreak}
          </p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">current streak</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600 font-mono">{stats.longestStreak}</p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">longest streak</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-purple-600 font-mono">{stats.peakCount}</p>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">peak day ({stats.peakDay ? new Date(stats.peakDay).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'})</p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contribution Activity</h2>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400">Less</span>
            {[0, 1, 2, 3, 4].map(l => (
              <div key={l} className={`w-3 h-3 rounded-sm ${levelColors[l]}`} />
            ))}
            <span className="text-[9px] text-gray-400">More</span>
          </div>
        </div>

        <div className="px-6 py-5 overflow-x-auto">
          {/* Month labels */}
          <div className="flex gap-0 mb-1 ml-[30px]">
            {monthLabels.map((m, i) => (
              <div key={i} style={{ marginLeft: i === 0 ? m.col * (CELL_SIZE + CELL_GAP) : (i > 0 ? (m.col - monthLabels[i - 1].col) * (CELL_SIZE + CELL_GAP) : 0) }} className="text-[9px] text-gray-400 font-mono whitespace-nowrap">
                {m.label}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-2 mt-0.5">
              {DAYS.map((d, i) => (
                <div key={d} className="h-3 flex items-center">
                  {i % 2 === 1 ? (
                    <span className="text-[8px] text-gray-400 font-mono leading-none">{d}</span>
                  ) : (
                    <span className="text-[8px] text-transparent leading-none">xxx</span>
                  )}
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-[3px]">
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((cell, di) => {
                    if (cell.date === '') {
                      return <div key={di} className="w-3 h-3" />;
                    }
                    const isSelected = selected === cell.date;
                    return (
                      <div
                        key={di}
                        className={`w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125 ${levelColors[cell.level]} ${isSelected ? 'ring-2 ring-gray-500 ring-offset-0' : ''}`}
                        onClick={() => setSelected(isSelected ? null : cell.date)}
                        onMouseEnter={e => {
                          const rect = (e.target as HTMLElement).getBoundingClientRect();
                          setTooltip({ date: cell.date, count: cell.count, x: rect.left + rect.width / 2, y: rect.top });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected day detail */}
        {selectedData && (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <PixelSparkle size={12} className="text-green-500" />
              <span className="text-xs font-medium text-gray-700">
                {new Date(selectedData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="text-xs text-gray-400">—</span>
              <span className="text-xs font-mono text-gray-600">
                {selectedData.count === 0 ? 'No activity' : `${selectedData.count} contribution${selectedData.count === 1 ? '' : 's'}`}
              </span>
              {selectedData.count >= 10 && (
                <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">🔥 Big day</span>
              )}
              {selectedData.count >= 5 && selectedData.count < 10 && (
                <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">⚡ Active</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Weekly summary + type breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {/* This week breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">This Week by Type</h2>
          </div>
          <div className="px-5 py-4 space-y-2.5">
            {[
              { label: 'Builds & Scripts', value: 12, color: 'bg-green-500', icon: '⚡' },
              { label: 'Cron Jobs', value: 8, color: 'bg-blue-500', icon: '⏰' },
              { label: 'Memory Writes', value: 5, color: 'bg-purple-500', icon: '📝' },
              { label: 'Heartbeats', value: 3, color: 'bg-pink-500', icon: '💓' },
              { label: 'Docs & Config', value: 2, color: 'bg-yellow-500', icon: '📋' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-sm">{item.icon}</span>
                <span className="text-[11px] text-gray-700 flex-1">{item.label}</span>
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(100, (item.value / 12) * 100)}%` }} />
                </div>
                <span className="text-[10px] font-mono text-gray-500 w-5 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day-of-week pattern */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity by Day</h2>
          </div>
          <div className="px-5 py-4 space-y-2">
            {DAYS.map((day, i) => {
              const isWeekend = i === 5 || i === 6;
              const baseActivity = isWeekend ? 3 : 8;
              const variance = Math.floor(Math.random() * 5);
              return (
                <div key={day} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-8">{day}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isWeekend ? 'bg-indigo-300' : 'bg-green-400'}`}
                      style={{ width: `${Math.min(100, ((baseActivity + variance) / 12) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-gray-400 w-10 text-right">
                    {baseActivity + variance} avg
                  </span>
                </div>
              );
            })}
          </div>
          <div className="px-5 pb-4">
            <p className="text-[9px] text-gray-400">
              <span className="text-green-500">■</span> Weekdays &nbsp; <span className="text-indigo-300">■</span> Weekends
            </p>
          </div>
        </div>

        {/* Monthly summary */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Totals</h2>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              { month: 'May 2026', count: 47 },
              { month: 'Apr 2026', count: 31 },
              { month: 'Mar 2026', count: 18 },
              { month: 'Feb 2026', count: 12 },
              { month: 'Jan 2026', count: 8 },
            ].map((row, i) => (
              <div key={row.month} className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 w-16">{row.month}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${Math.min(100, (row.count / 50) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-gray-600 w-8 text-right">{row.count}</span>
              </div>
            ))}
          </div>
          <div className="px-5 pb-4">
            <p className="text-[9px] text-gray-400">YTD: <span className="text-green-600 font-medium">116 contributions</span></p>
          </div>
        </div>
      </div>

      {/* Pixel art footer */}
      <div className="flex justify-center gap-1 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{ opacity: Math.sin(i * 0.6 + tick * 0.4) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Activity History · Screen 15 · Des_bot
      </p>
    </div>
  );
}
