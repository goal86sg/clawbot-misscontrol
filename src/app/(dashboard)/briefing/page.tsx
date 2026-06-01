'use client';

import React, { useState, useEffect } from 'react';
import { PixelSparkle, PixelClock, PixelCheck, PixelHeart } from '@/lib/pixel-icons';
import {
  PixelWeather,
  PixelCalendar,
  PixelTasks,
  PixelGoals,
  PixelHabits,
  PixelCommute,
  PixelSpending,
  PixelIncome,
} from '@/lib/pixel-icons-extra';

// ─── Pixel Icons ──────────────────────────────────────────────────────────────

function PixelSun({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
      <rect x="3" y="1" width="2" height="2" fill="currentColor" />
      <rect x="2" y="0" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="0" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelCoffee({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-600" shapeRendering="crispEdges">
      <rect x="1" y="2" width="5" height="5" fill="currentColor" opacity="0.15" />
      <rect x="2" y="3" width="4" height="3" fill="currentColor" />
      <rect x="6" y="3" width="2" height="1" fill="currentColor" />
      <rect x="7" y="4" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="0" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelFlame({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="2" width="2" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" opacity="0.7" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  done: boolean;
  project: string;
}

interface Event {
  time: string;
  title: string;
  type: 'meeting' | '1on1' | 'review' | 'focus' | 'break';
}

interface Goal {
  title: string;
  progress: number;
  daysLeft: number;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const todayTasks: Task[] = [
  { id: 'T-001', text: 'Review eBPF DAM architecture doc', priority: 'high', done: false, project: 'eBPF' },
  { id: 'T-002', text: 'Sync with guarddog on nightly audit', priority: 'medium', done: false, project: 'Agents' },
  { id: 'T-003', text: 'Update Mission Control sidebar', priority: 'medium', done: true, project: 'MC' },
  { id: 'T-004', text: 'Write spending tracker release notes', priority: 'low', done: false, project: 'Spending' },
  { id: 'T-005', text: 'Deploy spending tracker to Vercel', priority: 'high', done: true, project: 'Spending' },
];

const upcomingEvents: Event[] = [
  { time: '09:00', title: 'Team standup', type: 'meeting' },
  { time: '14:00', title: '1:1 with manager', type: '1on1' },
  { time: '17:00', title: 'Sovereign Cloud review', type: 'review' },
];

const topGoals: Goal[] = [
  { title: 'eBPF DAM — Production', progress: 65, daysLeft: 29, color: '#3b82f6' },
  { title: 'Mission Control — 36 screens', progress: 97, daysLeft: 29, color: '#8b5cf6' },
  { title: 'Passive Income $1k/mo', progress: 35, daysLeft: 121, color: '#10b981' },
];

const habits = [
  { name: 'Morning standup', streak: 21, done: true },
  { name: 'Read 30 min', streak: 14, done: true },
  { name: 'Exercise', streak: 8, done: false },
  { name: 'Memory write', streak: 5, done: true },
  { name: 'Code review', streak: 12, done: false },
];

const commuteInfo = {
  route: 'Punggol → Suntec Tower 3',
  line: 'North South Line',
  eta: '47 min',
  crowd: 'Light',
  crowdColor: 'text-green-600',
  tips: 'Board front cars for lighter crowds',
};

const quotes = [
  { text: 'Ship it, then make it better.', author: 'Anonymous' },
  { text: 'Automate the boring stuff.', author: 'Des_bot' },
  { text: 'Make it work, make it right, make it fast.', author: 'Anonymous' },
  { text: 'The best error message is the one that never shows up.', author: 'Daniel H. H.' },
  { text: 'Write code as if the next person to maintain it is a violent psychopath who knows where you live.', author: 'Unknown' },
];

const priorityBadge: Record<string, string> = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-yellow-50 text-yellow-700',
  low: 'bg-gray-100 text-gray-400',
};

const eventColors: Record<string, string> = {
  meeting: 'bg-blue-100 text-blue-700',
  '1on1': 'bg-purple-100 text-purple-700',
  review: 'bg-amber-100 text-amber-700',
  focus: 'bg-green-100 text-green-700',
  break: 'bg-gray-100 text-gray-500',
};

function getDayLabel(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.ceil((now.getTime() - start.getTime()) / 86400000);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BriefingPage() {
  const [time, setTime] = useState('');
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Singapore',
      }));
    };
    update();
    const id = setInterval(update, 1000);
    const anim = setInterval(() => setAnimFrame(f => f + 1), 2000);
    return () => { clearInterval(id); clearInterval(anim); };
  }, []);

  const highPriorityTasks = todayTasks.filter(t => t.priority === 'high' && !t.done);
  const completedToday = todayTasks.filter(t => t.done).length;
  const totalTasks = todayTasks.length;
  const totalHabits = habits.length;
  const doneHabits = habits.filter(h => h.done).length;
  const dayOfYear = getDayOfYear();

  return (
    <div className="max-w-6xl space-y-5">
      {/* ── Title Bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1.5">
            <PixelSun size={12} />
            <span>DAILY BRIEFING</span>
          </div>
          <div className="text-xs font-mono text-gray-400">
            <span className="uppercase">{getDayLabel(new Date())}</span>
            <span className="text-gray-300 ml-2">·</span>
            <span className="ml-2 text-gray-500">Day {dayOfYear}/365</span>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="text-gray-400">
            <span className="text-[9px] uppercase text-gray-300">SGT</span>{' '}
            <span className="text-gray-900 font-bold">{time}</span>
          </div>
          <PixelCoffee size={14} />
        </div>
      </div>

      {/* ── Top Row: Greeting + Commute + Weather ──────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Greeting */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-6 py-5 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                  Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, Commander
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <PixelSparkle size={10} className="text-yellow-500 animate-pulse" />
                  <p className="text-xs text-gray-500 italic">{quote.text}</p>
                  <span className="text-[9px] text-gray-300">— {quote.author}</span>
                </div>
              </div>
              {/* Animated pixel decoration */}
              <div className="flex items-end gap-0.5">
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded-sm transition-all duration-1000"
                    style={{
                      width: 6,
                      height: 6 + Math.sin(animFrame * 0.5 + i * 0.8) * 4,
                      opacity: 0.3 + Math.sin(animFrame * 0.5 + i * 0.8) * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="px-6 py-3 grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 font-mono">{highPriorityTasks.length}</p>
              <p className="text-[9px] text-red-500 uppercase tracking-widest">High Priority</p>
            </div>
            <div className="text-center border-l border-gray-100">
              <p className="text-lg font-bold text-gray-900 font-mono">{completedToday}/{totalTasks}</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Tasks Done</p>
            </div>
            <div className="text-center border-l border-gray-100">
              <p className="text-lg font-bold text-gray-900 font-mono">{doneHabits}/{totalHabits}</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Habits Done</p>
            </div>
            <div className="text-center border-l border-gray-100">
              <p className="text-lg font-bold text-gray-900 font-mono">{upcomingEvents.length}</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">Events Today</p>
            </div>
          </div>
        </div>

        {/* Commute card */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 py-2.5 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelCommute size={14} className="text-blue-500" />
              <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Commute</h2>
              <span className={`ml-auto text-[9px] font-medium ${commuteInfo.crowdColor}`}>
                {commuteInfo.crowd} crowds
              </span>
            </div>
          </div>
          <div className="px-4 py-3 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span className="font-medium">🚆</span>
                <span className="text-[10px]">{commuteInfo.line}</span>
              </div>
              <span className="text-[9px] text-gray-400 ml-auto font-mono">{commuteInfo.eta} ETA</span>
            </div>
            <p className="text-[10px] text-gray-500 mb-2">{commuteInfo.route}</p>
            <p className="text-[9px] text-gray-400 italic">💡 {commuteInfo.tips}</p>
            {/* Pixel train visualization */}
            <div className="mt-2 flex items-center gap-0.5">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <div key={i} className={`h-4 rounded-sm flex-1 ${i < 3 ? 'bg-blue-300' : i < 7 ? 'bg-gray-200' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Second Row: Tasks + Events ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* High Priority Tasks */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <PixelTasks size={14} className="text-blue-500" />
            <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Priority Tasks</h2>
            <span className="ml-1 text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {highPriorityTasks.length} remaining
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {todayTasks.map(task => (
              <div key={task.id} className="px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50/50 transition-colors">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  task.done ? 'bg-green-500 border-green-500' : 'border-gray-200'
                }`}>
                  {task.done && <PixelCheck size={8} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs ${task.done ? 'text-gray-400 line-through' : 'text-gray-900 font-medium'}`}>
                    {task.text}
                  </p>
                </div>
                <span className={`text-[8px] px-1.5 py-0.5 rounded border ${priorityBadge[task.priority]}`}>
                  {task.priority}
                </span>
                <span className="text-[9px] text-gray-400 font-mono">{task.id}</span>
                <span className="text-[9px] text-gray-300">{task.project}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-2 bg-gray-50/50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-gray-400">Progress</span>
              <div className="flex items-center gap-2">
                <div className="flex flex-col-reverse gap-px" style={{ height: 8 }}>
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 rounded-sm ${i < Math.round((completedToday / totalTasks) * 20) ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-gray-500">{Math.round((completedToday / totalTasks) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Events */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <PixelCalendar size={14} className="text-violet-500" />
            <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Today&apos;s Events</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className="text-center shrink-0 w-10">
                  <span className="text-[11px] font-mono font-bold text-gray-900">{ev.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-800">{ev.title}</p>
                </div>
                <span className={`text-[7px] px-1.5 py-0.5 rounded font-medium ${eventColors[ev.type]}`}>
                  {ev.type}
                </span>
              </div>
            ))}
          </div>
          {upcomingEvents.length === 0 && (
            <div className="px-4 py-6 text-center">
              <p className="text-[10px] text-gray-400">Clear day — no scheduled meetings</p>
            </div>
          )}
          <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex items-center gap-2">
            <PixelClock size={10} className="text-gray-400" />
            <span className="text-[9px] text-gray-400">Suntec Tower 3</span>
          </div>
        </div>
      </div>

      {/* ── Third Row: Goals + Habits ──────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Top Goals Progress */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <PixelGoals size={14} className="text-purple-500" />
            <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Active Goals</h2>
            <span className="ml-auto text-[9px] text-gray-400">Q2 2026</span>
          </div>
          <div className="divide-y divide-gray-50">
            {topGoals.map((goal, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4">
                <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: goal.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-gray-800">{goal.title}</span>
                    <span className="text-[9px] font-mono text-gray-400">{goal.daysLeft}d left</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex flex-col-reverse gap-px" style={{ height: 10 }}>
                      {Array.from({ length: 20 }, (_, r) => (
                        <div
                          key={r}
                          className={`rounded-sm transition-colors ${r < Math.round((goal.progress / 100) * 20) ? '' : 'bg-gray-100'}`}
                          style={{ backgroundColor: r < Math.round((goal.progress / 100) * 20) ? goal.color : undefined }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold" style={{ color: goal.color }}>
                      {goal.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Habits */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <PixelHabits size={14} className="text-green-500" />
            <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Today&apos;s Habits</h2>
            <span className="ml-auto text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {doneHabits}/{totalHabits}
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {habits.map((habit, i) => (
              <div key={i} className="px-4 py-2.5 flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  habit.done ? 'bg-green-500 border-green-500' : 'border-gray-200'
                }`}>
                  {habit.done && <PixelCheck size={8} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] ${habit.done ? 'text-gray-800' : 'text-gray-400'}`}>{habit.name}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <PixelFlame size={10} />
                  <span className="text-[9px] font-mono font-bold text-orange-500">{habit.streak}d</span>
                </div>
              </div>
            ))}
          </div>
          {/* Animated streak indicator */}
          <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-gray-400">Longest streak</span>
              <div className="flex items-center gap-1">
                <PixelFlame size={10} />
                <span className="text-[10px] font-mono font-bold text-orange-500">21d</span>
                <span className="text-[9px] text-gray-400">(Morning standup)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pixel footer decoration ───────────────────────────────────────── */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{ opacity: Math.sin(i * 0.4 + animFrame * 0.3) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Daily Briefing · Screen 36 · Des_bot · {new Date().getFullYear()}
      </p>
    </div>
  );
}