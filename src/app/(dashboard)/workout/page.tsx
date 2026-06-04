'use client';

import React, { useState, useEffect } from 'react';
import { PixelHeart, PixelCheck, PixelAlert } from '@/lib/pixel-icons';
import { PixelDumbbell, PixelGoals, PixelCalendar } from '@/lib/pixel-icons-extra';

// ─── Pixel Fire ───────────────────────────────────────────────────────────────

function PixelFire({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="#f59e0b" />
      <rect x="2" y="1" width="4" height="1" fill="#f59e0b" />
      <rect x="1" y="2" width="6" height="2" fill="#ef4444" />
      <rect x="2" y="4" width="4" height="2" fill="#f59e0b" />
      <rect x="3" y="6" width="2" height="1" fill="#fbbf24" />
    </svg>
  );
}

// ─── Pixel Trophy ─────────────────────────────────────────────────────────────

function PixelTrophy({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="1" fill="currentColor" />
      <rect x="2" y="5" width="1" height="2" fill="currentColor" opacity="0.6" />
      <rect x="5" y="5" width="1" height="2" fill="currentColor" opacity="0.6" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="6" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface WorkoutSession {
  id: string;
  date: string;
  type: 'run' | 'gym' | 'hiit' | 'rest';
  duration: number; // minutes
  distance?: number; // km (for runs)
  intensity: 'low' | 'medium' | 'high';
  energyBefore: number;
  energyAfter: number;
  mood: string;
  exercises?: string[];
  notes?: string;
}

interface PersonalRecord {
  exercise: string;
  value: string;
  date: string;
  previous: string;
}

interface WeeklyStats {
  day: string;
  minutes: number;
  type: 'run' | 'gym' | 'hiit' | 'rest';
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weeklyData: WeeklyStats[] = [
  { day: 'Mon', minutes: 45, type: 'gym' },
  { day: 'Tue', minutes: 30, type: 'run' },
  { day: 'Wed', minutes: 0, type: 'rest' },
  { day: 'Thu', minutes: 50, type: 'gym' },
  { day: 'Fri', minutes: 25, type: 'hiit' },
  { day: 'Sat', minutes: 60, type: 'run' },
  { day: 'Sun', minutes: 0, type: 'rest' },
];

const recentSessions: WorkoutSession[] = [
  { id: 'w1', date: '2026-06-04', type: 'run', duration: 30, distance: 4.2, intensity: 'medium', energyBefore: 6, energyAfter: 8, mood: '😊', notes: 'Morning run, nice weather' },
  { id: 'w2', date: '2026-06-03', type: 'gym', duration: 50, intensity: 'high', energyBefore: 5, energyAfter: 7, mood: '💪', exercises: ['Squat', 'Bench Press', 'Deadlift', 'Pull-ups'] },
  { id: 'w3', date: '2026-06-01', type: 'hiit', duration: 25, intensity: 'high', energyBefore: 4, energyAfter: 8, mood: '🔥' },
  { id: 'w4', date: '2026-05-31', type: 'run', duration: 45, distance: 5.8, intensity: 'medium', energyBefore: 6, energyAfter: 9, mood: '😊', notes: 'Long run, felt strong' },
  { id: 'w5', date: '2026-05-30', type: 'gym', duration: 50, intensity: 'medium', energyBefore: 5, energyAfter: 7, mood: '💪', exercises: ['OHP', 'Rows', 'Lunges', 'Core'] },
  { id: 'w6', date: '2026-05-28', type: 'rest', duration: 0, intensity: 'low', energyBefore: 3, energyAfter: 4, mood: '😴' },
  { id: 'w7', date: '2026-05-27', type: 'run', duration: 40, distance: 5.2, intensity: 'medium', energyBefore: 7, energyAfter: 8, mood: '😊' },
];

const personalRecords: PersonalRecord[] = [
  { exercise: '5K Run', value: '22:45', date: '2026-04-12', previous: '23:30' },
  { exercise: 'Deadlift', value: '140kg', date: '2026-05-18', previous: '130kg' },
  { exercise: 'Bench Press', value: '90kg', date: '2026-05-03', previous: '85kg' },
  { exercise: 'Squat', value: '110kg', date: '2026-05-25', previous: '100kg' },
  { exercise: 'Longest Run', value: '8.3km', date: '2026-03-22', previous: '7.5km' },
];

const monthlyChallenge = {
  name: 'June Movement Challenge',
  goal: 20,
  current: 12,
  participants: 1,
  daysLeft: 26,
};

const runGoalProgress = {
  year: 2026,
  target: 500,
  current: 188,
  monthlyTarget: 41.7,
  avgPace: '5:32/km',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, string> = {
  run: 'text-blue-500',
  gym: 'text-purple-500',
  hiit: 'text-orange-500',
  rest: 'text-gray-400',
};

const TYPE_BG: Record<string, string> = {
  run: 'bg-blue-50',
  gym: 'bg-purple-50',
  hiit: 'bg-orange-50',
  rest: 'bg-gray-50',
};

const INTENSITY_DOT: Record<string, string> = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
};

const intensityBadge: Record<string, string> = {
  low: 'bg-green-50 text-green-600 border-green-100',
  medium: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  high: 'bg-red-50 text-red-600 border-red-100',
};

function formatDuration(minutes: number) {
  if (minutes === 0) return '—';
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getWeekTotal() {
  return weeklyData.reduce((s, d) => s + d.minutes, 0);
}

function getDaysWorkedOut() {
  return weeklyData.filter(d => d.minutes > 0).length;
}

function getRunTotal() {
  return recentSessions
    .filter(s => s.type === 'run' && s.distance)
    .reduce((sum, session) => sum + (session.distance || 0), 0);
}

function getGymSessions() {
  return recentSessions.filter(s => s.type === 'gym').length;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function WorkoutPage() {
  const [tab, setTab] = useState<'overview' | 'history' | 'records'>('overview');
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState('');
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const anim = setInterval(() => setAnimFrame(f => f + 1), 3000);
    return () => clearInterval(anim);
  }, []);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Singapore',
    }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const totalWeekMinutes = getWeekTotal();
  const daysWorkedOut = getDaysWorkedOut();
  const maxDayMinutes = Math.max(...weeklyData.map(d => d.minutes), 1);
  const totalRunKm = getRunTotal();
  const totalGym = getGymSessions();
  const avgEnergyGain = Math.round(
    recentSessions.reduce((s, w) => s + (w.energyAfter - w.energyBefore), 0) / recentSessions.filter(w => w.energyAfter > 0).length
  );

  return (
    <div className="max-w-6xl space-y-5">
      {/* ── Title Bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1.5">
            <PixelDumbbell size={12} />
            <span>WORKOUT TRACKER</span>
          </div>
          <div className="text-xs font-mono text-gray-400">
            Mission Control · v1.0
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="text-gray-400">
            <span className="text-[9px] uppercase text-gray-300">SGT</span>{' '}
            <span className="text-gray-900 font-bold">{time}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded">
            <PixelFire size={10} />
            <span>Day {Math.ceil((new Date().getTime() - new Date('2026-01-01').getTime()) / 86400000)}/365</span>
          </div>
        </div>
      </div>

      {/* ── Top Stats Row ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">This Week</p>
          <p className="text-2xl font-bold text-gray-900 font-mono mt-1">{formatDuration(totalWeekMinutes)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{daysWorkedOut}/7 days active</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Run Distance</p>
          <p className="text-2xl font-bold text-blue-600 font-mono mt-1">{totalRunKm}<span className="text-gray-300 text-sm">km</span></p>
          <p className="text-[10px] text-gray-400 mt-0.5">avg {formatDuration(Math.round(totalWeekMinutes * 0.4))} running</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Gym Sessions</p>
          <p className="text-2xl font-bold text-purple-600 font-mono mt-1">{totalGym}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">sessions this week</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Energy Boost</p>
          <p className="text-2xl font-bold text-green-600 font-mono mt-1">+{avgEnergyGain}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">avg energy gain/post-workout</p>
        </div>
      </div>

      {/* ── Weekly Chart ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <PixelCalendar size={14} className="text-blue-500" />
          <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Weekly Activity</h2>
          <span className="ml-auto text-[9px] text-gray-400">{totalWeekMinutes} min total</span>
        </div>
        <div className="px-6 py-4">
          {/* Pixel bar chart */}
          <div className="flex items-end gap-3" style={{ height: 80 }}>
            {weeklyData.map((day, i) => {
              const heightPct = day.minutes > 0 ? (day.minutes / maxDayMinutes) * 100 : 0;
              const barColor = day.type === 'run' ? 'bg-blue-400' : day.type === 'gym' ? 'bg-purple-400' : day.type === 'hiit' ? 'bg-orange-400' : 'bg-gray-100';
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[8px] font-mono text-gray-400">{formatDuration(day.minutes)}</span>
                  <div
                    className={`w-full rounded-sm transition-all ${barColor}`}
                    style={{ height: `${heightPct}%`, minHeight: day.minutes === 0 ? 4 : undefined }}
                  />
                  <span className={`text-[9px] font-mono font-bold ${i === new Date().getDay() - 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
            {[
              { label: 'Run', color: 'bg-blue-400' },
              { label: 'Gym', color: 'bg-purple-400' },
              { label: 'HIIT', color: 'bg-orange-400' },
              { label: 'Rest', color: 'bg-gray-100' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${color}`} />
                <span className="text-[9px] text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Second Row: Monthly Challenge + Run Goal ─────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Monthly Challenge */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelTrophy size={12} />
              <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Monthly Challenge</h2>
            </div>
          </div>
          <div className="px-4 py-3">
            <h3 className="text-[11px] font-semibold text-gray-900">{monthlyChallenge.name}</h3>
            <p className="text-[9px] text-gray-400 mt-0.5">{monthlyChallenge.daysLeft} days left · {monthlyChallenge.current}/{monthlyChallenge.goal} workouts</p>
            {/* Pixel progress */}
            <div className="mt-3 flex flex-col-reverse gap-px" style={{ height: 32 }}>
              {Array.from({ length: 32 }, (_, r) => (
                <div
                  key={r}
                  className={`rounded-sm transition-all ${r < monthlyChallenge.current ? 'bg-yellow-400' : 'bg-gray-100'}`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[9px] text-gray-400">Progress</span>
              <span className="text-[10px] font-mono font-bold text-yellow-600">
                {Math.round((monthlyChallenge.current / monthlyChallenge.goal) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* 2026 Run Goal */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelGoals size={14} className="text-pink-500" />
              <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">2026 Running Goal</h2>
              <span className="ml-auto text-[9px] text-gray-400">188/500 km</span>
            </div>
          </div>
          <div className="px-4 py-3 flex items-center gap-4">
            {/* Circular pixel progress */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full border-4 border-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900 font-mono">{runGoalProgress.current}</p>
                  <p className="text-[8px] text-gray-400">/500 km</p>
                </div>
                {/* Animated ring segments */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80" width="80" height="80">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <circle
                    cx="40" cy="40" r="35" fill="none"
                    stroke="#ec4899" strokeWidth="4"
                    strokeDasharray={`${(runGoalProgress.current / runGoalProgress.target) * 220} 220`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center border border-gray-100 rounded p-1.5">
                  <p className="text-[10px] font-bold text-gray-900 font-mono">{runGoalProgress.target - runGoalProgress.current}</p>
                  <p className="text-[8px] text-gray-400">km left</p>
                </div>
                <div className="text-center border border-gray-100 rounded p-1.5">
                  <p className="text-[10px] font-bold text-gray-900 font-mono">{runGoalProgress.avgPace}</p>
                  <p className="text-[8px] text-gray-400">avg pace</p>
                </div>
                <div className="text-center border border-gray-100 rounded p-1.5">
                  <p className="text-[10px] font-bold text-gray-900 font-mono">{(runGoalProgress.current / runGoalProgress.target * 100).toFixed(0)}%</p>
                  <p className="text-[8px] text-gray-400">complete</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex flex-col-reverse gap-px" style={{ height: 12 }}>
                  {Array.from({ length: 24 }, (_, r) => (
                    <div
                      key={r}
                      className={`rounded-sm ${r < Math.round((runGoalProgress.current / runGoalProgress.target) * 24) ? 'bg-pink-400' : 'bg-gray-100'}`}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-pink-600 font-bold">
                  {runGoalProgress.current}km
                </span>
              </div>
              <p className="text-[9px] text-gray-400">Year goal · On track for December 31</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Sessions ─────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center gap-2">
            <PixelDumbbell size={14} className="text-purple-500" />
            <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Recent Sessions</h2>
            <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full ml-1">{recentSessions.length} sessions</span>
          </div>
          {/* Tab filter */}
          <div className="flex items-center gap-1">
            {(['overview', 'history', 'records'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-[9px] px-2 py-1 rounded font-medium capitalize transition-colors ${
                  tab === t ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === 'overview' && (
          <div className="divide-y divide-gray-50">
            {recentSessions.map(session => (
              <div key={session.id} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                {/* Date + type badge */}
                <div className="w-16 shrink-0 text-center">
                  <p className="text-[10px] font-semibold text-gray-700">{formatDate(session.date)}</p>
                  <span className={`text-[7px] px-1.5 py-0.5 rounded border mt-0.5 inline-block ${TYPE_BG[session.type]} ${TYPE_COLORS[session.type].replace('text-', 'border-')}`}>
                    {session.type}
                  </span>
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-medium text-gray-800">
                      {session.type === 'run' && `${session.distance}km run`}
                      {session.type === 'gym' && `${session.exercises?.join(', ').substring(0, 40)}...`}
                      {session.type === 'hiit' && 'HIIT session'}
                      {session.type === 'rest' && 'Rest day'}
                    </p>
                    {session.notes && (
                      <span className="text-[9px] text-gray-400 italic">· {session.notes}</span>
                    )}
                  </div>
                  {/* Energy bars */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-gray-400">Energy</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className={`w-1.5 h-2 rounded-sm ${i < session.energyBefore ? 'bg-gray-200' : 'bg-gray-50'}`} />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-gray-500">{session.energyBefore}</span>
                    <span className="text-[9px] text-gray-300">→</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className={`w-1.5 h-2 rounded-sm ${i < session.energyAfter ? 'bg-green-400' : 'bg-green-50'}`} />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono font-bold text-green-600">{session.energyAfter}</span>
                    <span className={`ml-1 text-sm ${session.mood.includes('😊') ? 'opacity-100' : session.mood.includes('💪') ? 'opacity-100' : 'opacity-60'}`}>
                      {session.mood}
                    </span>
                  </div>
                </div>

                {/* Duration */}
                <div className="text-right shrink-0">
                  <p className="text-[11px] font-mono font-bold text-gray-700">{formatDuration(session.duration)}</p>
                  <div className="flex items-center gap-1 mt-0.5 justify-end">
                    <div className={`w-1.5 h-1.5 rounded-full ${INTENSITY_DOT[session.intensity]}`} />
                    <span className={`text-[7px] px-1 py-0.5 rounded border ${intensityBadge[session.intensity]}`}>
                      {session.intensity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'history' && (
          <div className="divide-y divide-gray-50">
            {recentSessions.filter(s => s.type !== 'rest').map(session => (
              <div key={session.id} className="px-5 py-3 flex items-center gap-3">
                <div className="text-[10px] font-mono text-gray-500 w-20 shrink-0">{session.date}</div>
                <div className={`w-8 h-8 rounded flex items-center justify-center ${TYPE_BG[session.type]}`}>
                  <span className="text-sm">{session.type === 'run' ? '🏃' : session.type === 'gym' ? '🏋️' : '🔥'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-800 capitalize">{session.type}</p>
                  <p className="text-[9px] text-gray-400">
                    {session.distance ? `${session.distance}km · ` : ''}{formatDuration(session.duration)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-gray-700">{formatDuration(session.duration)}</p>
                  <p className="text-[9px] text-gray-400">{session.intensity}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'records' && (
          <div className="divide-y divide-gray-50">
            {personalRecords.map((pr, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4">
                <PixelTrophy size={14} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800">{pr.exercise}</p>
                  <p className="text-[9px] text-gray-400">Previous: {pr.previous} · {pr.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-mono font-bold text-yellow-600">{pr.value}</p>
                  <p className="text-[9px] text-gray-400">{pr.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <PixelFire size={10} />
                  <span className="text-[9px] font-mono text-orange-500">PR</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Animated footer ─────────────────────────────────────────────── */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{ opacity: Math.sin(i * 0.5 + animFrame * 0.4) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Workout Tracker · Screen 37 · Des_bot · {new Date().getFullYear()}
      </p>
    </div>
  );
}