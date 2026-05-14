'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PixelClock, PixelCheck, PixelAlert, PixelSparkle, PixelHeart, PixelPlay } from '@/lib/pixel-icons';
import { PixelCalendar, PixelTasks } from '@/lib/pixel-icons-extra';

// ─── Pixel Progress Bar ───────────────────────────────────────────────────────

function PixelProgress({ value, max = 100, height = 16, color = 'bg-blue-500', style }: {
  value: number; max?: number; height?: number; color?: string; style?: React.CSSProperties;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const filled = Math.round((pct / 100) * height);
  return (
    <div className="flex items-center gap-2">
      <div className={`flex flex-col-reverse gap-px`} style={{ height }}>
        {Array.from({ length: height }, (_, r) => (
          <div
            key={r}
            className={`w-3 rounded-sm transition-colors ${r < filled ? color : 'bg-gray-100'}`}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono text-gray-500">{Math.round(pct)}%</span>
    </div>
  );
}

// ─── Countdown Timer ──────────────────────────────────────────────────────────

function Countdown({ target }: { target: string }) {
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    const update = () => setDiff(new Date(target).getTime() - Date.now());
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [target]);

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const label = days > 0 ? `${days}d ${hours}h` : `${hours}h`;
  const urgent = days < 3;

  return (
    <span className={`text-[10px] font-mono ${urgent ? 'text-red-500' : 'text-gray-500'}`}>
      {label}
    </span>
  );
}

// ─── Pixel Fire (streak indicator) ───────────────────────────────────────────

function PixelFire({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="inline-block" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="#f59e0b" />
      <rect x="2" y="1" width="4" height="1" fill="#f59e0b" />
      <rect x="1" y="2" width="6" height="1" fill="#ef4444" />
      <rect x="1" y="3" width="6" height="2" fill="#f59e0b" />
      <rect x="2" y="5" width="4" height="2" fill="#ef4444" />
      <rect x="3" y="7" width="2" height="1" fill="#fbbf24" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Goal {
  id: string;
  title: string;
  category: 'tech' | 'finance' | 'health' | 'learning' | 'creative';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  progress: number; // 0-100
  milestones: Milestone[];
  status: 'active' | 'completed' | 'paused';
  color: string;
  target: string;
  description: string;
}

interface Milestone {
  id: string;
  text: string;
  done: boolean;
  date?: string;
}

const goals: Goal[] = [
  {
    id: 'g1',
    title: 'eBPF DAM — Production Ready',
    category: 'tech',
    quarter: 'Q2',
    progress: 65,
    color: '#3b82f6',
    target: '2026-06-30',
    description: 'Deploy eBPF PostgreSQL DAM to production with full coverage',
    status: 'active',
    milestones: [
      { id: 'm1', text: 'Architecture review complete', done: true, date: '2026-04-15' },
      { id: 'm2', text: 'Core BPF program written', done: true, date: '2026-04-28' },
      { id: 'm3', text: 'Userspace agent prototyped', done: true, date: '2026-05-10' },
      { id: 'm4', text: 'Integration tests passing', done: false },
      { id: 'm5', text: 'Load testing at 10k qps', done: false },
      { id: 'm6', text: 'Production deployment', done: false },
    ],
  },
  {
    id: 'g2',
    title: 'Mission Control — 30 Screens',
    category: 'creative',
    quarter: 'Q2',
    progress: 70,
    color: '#8b5cf6',
    target: '2026-06-30',
    description: 'Complete 30-screen pixel art dashboard milestone',
    status: 'active',
    milestones: [
      { id: 'm1', text: 'Core 13 screens shipped', done: true, date: '2026-05-07' },
      { id: 'm2', text: 'Portfolio + Notifications', done: true, date: '2026-05-12' },
      { id: 'm3', text: 'Standup screen', done: true, date: '2026-05-14' },
      { id: 'm4', text: 'Goals screen', done: false },
      { id: 'm5', text: 'Weather + News screen', done: false },
      { id: 'm6', text: 'Settings & theming', done: false },
    ],
  },
  {
    id: 'g3',
    title: 'Passive Income — $1k/mo',
    category: 'finance',
    quarter: 'Q3',
    progress: 35,
    color: '#10b981',
    target: '2026-09-30',
    description: 'Reach $1,000/month passive income target',
    status: 'active',
    milestones: [
      { id: 'm1', text: 'Portfolio dividends setup', done: true, date: '2026-04-20' },
      { id: 'm2', text: 'SaaS prototype v1', done: false },
      { id: 'm3', text: 'First paying customer', done: false },
      { id: 'm4', text: '$500/mo recurring', done: false },
      { id: 'm5', text: '$1k/mo recurring', done: false },
    ],
  },
  {
    id: 'g4',
    title: 'Blog — 12 Technical Posts',
    category: 'learning',
    quarter: 'Q2',
    progress: 50,
    color: '#f59e0b',
    target: '2026-06-30',
    description: 'Write and publish 12 technical blog posts',
    status: 'active',
    milestones: [
      { id: 'm1', text: 'eBPF internals deep-dive', done: true, date: '2026-03-15' },
      { id: 'm2', text: 'Linux tracing tools guide', done: true, date: '2026-04-01' },
      { id: 'm3', text: 'Postgres monitoring with eBPF', done: true, date: '2026-04-20' },
      { id: 'm4', text: 'Observability patterns', done: false },
      { id: 'm5', text: 'Performance tuning series', done: false },
    ],
  },
  {
    id: 'g5',
    title: 'Run 500km in 2026',
    category: 'health',
    quarter: 'Q4',
    progress: 38,
    color: '#ec4899',
    target: '2026-12-31',
    description: 'Run 500km total distance this year',
    status: 'active',
    milestones: [
      { id: 'm1', text: 'Jan: 45km', done: true, date: '2026-01-31' },
      { id: 'm2', text: 'Feb: 52km', done: true, date: '2026-02-28' },
      { id: 'm3', text: 'Mar: 48km', done: true, date: '2026-03-31' },
      { id: 'm4', text: 'Apr: 41km', done: true, date: '2026-04-30' },
      { id: 'm5', text: 'May: goal 45km', done: false },
      { id: 'm6', text: 'Jun–Dec: 269km remaining', done: false },
    ],
  },
  {
    id: 'g6',
    title: 'Launch pixfetch v2.0',
    category: 'tech',
    quarter: 'Q2',
    progress: 80,
    color: '#6366f1',
    target: '2026-05-31',
    description: 'Ship pixfetch v2.0 with full feature set',
    status: 'active',
    milestones: [
      { id: 'm1', text: 'API design doc', done: true, date: '2026-04-10' },
      { id: 'm2', text: 'Core image processing', done: true, date: '2026-04-20' },
      { id: 'm3', text: 'CLI tool shipped', done: true, date: '2026-05-01' },
      { id: 'm4', text: 'Docs + examples', done: true, date: '2026-05-10' },
      { id: 'm5', text: 'Public launch', done: false },
    ],
  },
];

// Quarterly roadmap
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
const quarterMonths: Record<string, string[]> = {
  Q1: ['Jan', 'Feb', 'Mar'],
  Q2: ['Apr', 'May', 'Jun'],
  Q3: ['Jul', 'Aug', 'Sep'],
  Q4: ['Oct', 'Nov', 'Dec'],
};

// Habits (streaks)
const habits = [
  { name: 'Morning standup', streak: 21, icon: '📋', done: true },
  { name: 'Read 30 min', streak: 14, icon: '📚', done: true },
  { name: 'Exercise', streak: 8, icon: '🏃', done: true },
  { name: 'Code review', streak: 12, icon: '💻', done: false },
  { name: 'Memory write', streak: 5, icon: '📝', done: true },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  tech: '🛠 Tech',
  finance: '💰 Finance',
  health: '❤️ Health',
  learning: '📖 Learning',
  creative: '🎨 Creative',
};

const QUARTER_COLORS: Record<string, string> = {
  Q1: '#94a3b8',
  Q2: '#3b82f6',
  Q3: '#8b5cf6',
  Q4: '#f59e0b',
};

function getDaysUntil(target: string) {
  return Math.max(0, Math.ceil((new Date(target).getTime() - Date.now()) / 86400000));
}

function getQuarterProgress(quarter: string) {
  const qGoals = goals.filter(g => g.quarter === quarter && g.status === 'active');
  if (qGoals.length === 0) return 0;
  return Math.round(qGoals.reduce((s, g) => s + g.progress, 0) / qGoals.length);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GoalsPage() {
  const [tab, setTab] = useState<'active' | 'completed' | 'all'>('active');
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState('');

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Singapore',
    }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const filtered = tab === 'all' ? goals : goals.filter(g => tab === 'completed' ? g.status === 'completed' : g.status === 'active');

  const activeGoals = goals.filter(g => g.status === 'active');
  const avgProgress = Math.round(activeGoals.reduce((s, g) => s + g.progress, 0) / activeGoals.length);
  const totalMilestones = activeGoals.flatMap(g => g.milestones).length;
  const doneMilestones = activeGoals.flatMap(g => g.milestones).filter(m => m.done).length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;

  return (
    <div className="max-w-6xl space-y-5">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded">
            GOALS v1.0
          </div>
          <div className="text-xs font-mono text-gray-400">
            2026 · Mission Control
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="text-gray-400">
            <span className="text-[9px] uppercase text-gray-300">SGT</span>{' '}
            <span className="text-gray-700">{time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded">
            <PixelSparkle size={10} className="text-yellow-500" />
            <span>Day {Math.ceil((new Date().getTime() - new Date('2026-01-01').getTime()) / 86400000)} / 365</span>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Active Goals</p>
          <p className="text-2xl font-bold text-gray-900 font-mono mt-1">{activeGoals.length}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">across {quarters.filter(q => activeGoals.some(g => g.quarter === q)).length} quarters</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Avg Progress</p>
          <p className="text-2xl font-bold text-blue-600 font-mono mt-1">{avgProgress}%</p>
          <PixelProgress value={avgProgress} height={8} color="bg-blue-500" />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Milestones</p>
          <p className="text-2xl font-bold text-green-600 font-mono mt-1">{doneMilestones}<span className="text-gray-300">/{totalMilestones}</span></p>
          <p className="text-[10px] text-gray-400 mt-0.5">{Math.round((doneMilestones / totalMilestones) * 100)}% complete</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Completed</p>
          <p className="text-2xl font-bold text-purple-600 font-mono mt-1">{completedGoals}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">goals archived</p>
        </div>
      </div>

      {/* Quarterly Roadmap */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">2026 Quarterly Roadmap</h2>
        </div>
        <div className="px-5 py-4">
          <div className="grid grid-cols-4 gap-3">
            {quarters.map(q => {
              const qGoals = activeGoals.filter(g => g.quarter === q);
              const prog = getQuarterProgress(q);
              const done = qGoals.filter(g => g.status === 'completed').length;
              return (
                <div key={q} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold font-mono" style={{ color: QUARTER_COLORS[q] }}>{q} 2026</span>
                    <span className="text-[9px] text-gray-400">{qGoals.length} goals</span>
                  </div>
                  <div className="space-y-1.5">
                    {qGoals.length === 0 ? (
                      <p className="text-[9px] text-gray-300 italic">No active goals</p>
                    ) : (
                      qGoals.slice(0, 3).map(g => (
                        <div key={g.id} className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ backgroundColor: g.color }} />
                          <span className="text-[10px] text-gray-600 truncate flex-1">{g.title.split('—')[0].trim()}</span>
                          <span className="text-[9px] font-mono text-gray-400">{g.progress}%</span>
                        </div>
                      ))
                    )}
                  </div>
                  {/* Quarter progress bar */}
                  <div className="mt-3 flex flex-col-reverse gap-px" style={{ height: 12 }}>
                    {Array.from({ length: 12 }, (_, r) => (
                      <div
                        key={r}
                        className={`w-full rounded-sm ${r < Math.round((prog / 100) * 12) ? '' : 'bg-gray-100'}`}
                        style={{ backgroundColor: r < Math.round((prog / 100) * 12) ? QUARTER_COLORS[q] : undefined }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] text-gray-400">Progress</span>
                    <span className="text-[9px] font-mono font-medium" style={{ color: QUARTER_COLORS[q] }}>{prog}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Tab bar */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-1"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          {(['active', 'completed', 'all'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[10px] px-3 py-1.5 rounded font-medium transition-colors capitalize ${
                tab === t ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {t}
              {t === 'active' && <span className="ml-1.5 text-[9px] opacity-60">({activeGoals.length})</span>}
              {t === 'completed' && <span className="ml-1.5 text-[9px] opacity-60">({completedGoals})</span>}
              {t === 'all' && <span className="ml-1.5 text-[9px] opacity-60">({goals.length})</span>}
            </button>
          ))}
        </div>

        {/* Goal cards */}
        <div className="divide-y divide-gray-50">
          {filtered.map(goal => (
            <div key={goal.id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50/30 transition-colors">
              {/* Color bar */}
              <div className="w-1 h-full rounded-full shrink-0" style={{ backgroundColor: goal.color, minHeight: 60 }} />

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[12px] font-semibold text-gray-900">{goal.title}</h3>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${
                        goal.status === 'active' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                        goal.status === 'completed' ? 'bg-green-50 text-green-600 border-green-200' :
                        'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-gray-400">{CATEGORY_LABELS[goal.category]}</span>
                      <span className="text-[9px] text-gray-200">·</span>
                      <span className="text-[9px] font-mono" style={{ color: QUARTER_COLORS[goal.quarter] }}>{goal.quarter} 2026</span>
                      <span className="text-[9px] text-gray-200">·</span>
                      <span className="text-[9px] text-gray-400">{goal.description}</span>
                    </div>
                  </div>

                  {/* Countdown + progress */}
                  <div className="shrink-0 text-right">
                    {goal.status === 'active' && (
                      <div className="flex items-center gap-2">
                        <Countdown target={goal.target} />
                        <span className="text-[9px] text-gray-400">→ {new Date(goal.target).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 flex items-center gap-3">
                  <PixelProgress value={goal.progress} height={10} color="" />
                  <div className="flex items-center gap-1.5 ml-auto">
                    {goal.milestones.slice(0, 6).map(m => (
                      <div
                        key={m.id}
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center ${m.done ? '' : 'border-gray-200 bg-gray-50'}`}
                        style={m.done ? { backgroundColor: goal.color } : undefined}
                      >
                        {m.done && <PixelCheck size={8} className="text-white" />}
                      </div>
                    ))}
                    {goal.milestones.length > 6 && (
                      <span className="text-[9px] text-gray-400">+{goal.milestones.length - 6}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: Habits + Upcoming Deadlines */}
      <div className="grid grid-cols-2 gap-4">
        {/* Habit Streaks */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelFire size={12} />
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Daily Habits</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {habits.map((h, i) => (
              <div key={i} className="px-5 py-2.5 flex items-center gap-3">
                <span className="text-sm">{h.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] ${h.done ? 'text-gray-800' : 'text-gray-400'}`}>{h.name}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <PixelFire size={12} />
                  <span className="text-[10px] font-mono font-bold text-orange-500">{h.streak}d</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${h.done ? 'bg-green-500 border-green-500' : 'border-gray-200'}`}>
                  {h.done && <PixelCheck size={8} className="text-white" />}
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-2 bg-gray-50/50 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">
              <span className="text-green-500 font-medium">🔥</span> Longest streak: <span className="font-mono">21 days</span> (Morning standup)
            </p>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelClock size={12} className="text-red-400" />
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Upcoming Deadlines</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {activeGoals
              .filter(g => getDaysUntil(g.target) <= 60)
              .sort((a, b) => new Date(a.target).getTime() - new Date(b.target).getTime())
              .slice(0, 5)
              .map(goal => {
                const days = getDaysUntil(goal.target);
                return (
                  <div key={goal.id} className="px-5 py-2.5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: goal.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-gray-800 truncate">{goal.title}</p>
                      <span className="text-[9px] text-gray-400">{new Date(goal.target).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {QUARTER_COLORS[goal.quarter]}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${days <= 7 ? 'text-red-500' : days <= 30 ? 'text-yellow-600' : 'text-gray-500'}`}>
                      {days === 0 ? 'Today!' : `${days}d`
                    }</span>
                  </div>
                );
              })}
          </div>
          {activeGoals.filter(g => getDaysUntil(g.target) <= 60).length === 0 && (
            <div className="px-5 py-4 text-center">
              <p className="text-[10px] text-gray-400">No deadlines within 60 days</p>
            </div>
          )}
        </div>
      </div>

      {/* Animated pixel footer */}
      <div className="flex justify-center gap-1 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{ opacity: Math.sin(i * 0.6 + tick * 0.3) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Goals & Milestones · Screen 22 · Des_bot
      </p>
    </div>
  );
}