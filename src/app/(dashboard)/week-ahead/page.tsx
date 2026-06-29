'use client';

import React, { useState } from 'react';
import { PixelClock, PixelSparkle, PixelCheck, PixelAlert, PixelHeart } from '@/lib/pixel-icons';
import { PixelCalendar, PixelGoals, PixelTasks } from '@/lib/pixel-icons-extra';

// ─── Pixel Week Grid Icons ────────────────────────────────────────────────────

function PixelStar({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="1" fill="currentColor" />
      <rect x="0" y="3" width="8" height="1" fill="currentColor" />
      <rect x="1" y="4" width="6" height="1" fill="currentColor" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" />
      <rect x="0" y="3" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="7" y="3" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelFlag({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-red-500" shapeRendering="crispEdges">
      <rect x="2" y="0" width="1" height="7" fill="currentColor" />
      <rect x="3" y="0" width="4" height="3" fill="currentColor" />
      <rect x="3" y="3" width="3" height="1" fill="currentColor" opacity="0.6" />
      <rect x="3" y="4" width="2" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelTarget({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="1" y="1" width="6" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="2" width="8" height="4" fill="currentColor" opacity="0.1" />
      <rect x="3" y="1" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" />
      <rect x="3" y="4" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelMoonSmall({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-400" shapeRendering="crispEdges">
      <rect x="2" y="1" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="4" height="2" fill="currentColor" opacity="0.3" />
      <rect x="5" y="0" width="1" height="1" fill="currentColor" />
      <rect x="6" y="2" width="1" height="1" fill="currentColor" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelSunSmall({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-500" shapeRendering="crispEdges">
      <rect x="3" y="1" width="2" height="2" fill="currentColor" />
      <rect x="2" y="0" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="0" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Pixel Weather Icons ────────────────────────────────────────────────────────

function PixelSunWeather({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
      <rect x="3" y="1" width="2" height="2" fill="currentColor" />
      <rect x="2" y="0" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="0" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelCloudWeather({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-gray-300" shapeRendering="crispEdges">
      <rect x="1" y="4" width="6" height="2" fill="currentColor" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" />
      <rect x="3" y="2" width="2" height="2" fill="currentColor" />
      <rect x="0" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="7" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelRain({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="1" y="2" width="6" height="2" fill="#94a3b8" opacity="0.9" />
      <rect x="2" y="1" width="4" height="2" fill="#94a3b8" />
      <rect x="3" y="0" width="2" height="2" fill="#94a3b8" opacity="0.6" />
      <rect x="1" y="5" width="1" height="2" fill="#60a5fa" opacity="0.8" />
      <rect x="3" y="6" width="1" height="2" fill="#60a5fa" opacity="0.6" />
      <rect x="5" y="5" width="1" height="2" fill="#60a5fa" opacity="0.7" />
    </svg>
  );
}

function PixelStorm({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="1" y="2" width="6" height="2" fill="#64748b" opacity="0.9" />
      <rect x="2" y="1" width="4" height="2" fill="#64748b" />
      <rect x="3" y="0" width="2" height="2" fill="#64748b" opacity="0.6" />
      <rect x="3" y="4" width="2" height="2" fill="#fbbf24" />
      <rect x="3" y="6" width="1" height="1" fill="#fbbf24" opacity="0.5" />
      <rect x="1" y="5" width="1" height="2" fill="#60a5fa" opacity="0.6" />
      <rect x="6" y="5" width="1" height="2" fill="#60a5fa" opacity="0.6" />
    </svg>
  );
}

function PixelPartCloud({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="2" fill="#fbbf24" opacity="0.8" />
      <rect x="4" y="1" width="1" height="1" fill="#fbbf24" opacity="0.5" />
      <rect x="1" y="3" width="6" height="2" fill="#cbd5e1" opacity="0.9" />
      <rect x="2" y="2" width="4" height="2" fill="#cbd5e1" />
      <rect x="3" y="1" width="2" height="2" fill="#cbd5e1" opacity="0.6" />
      <rect x="0" y="4" width="1" height="1" fill="#cbd5e1" opacity="0.5" />
    </svg>
  );
}

type WeatherType = 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy' | 'stormy';

function WeatherIcon({ type, size = 14 }: { type: WeatherType; size?: number }) {
  switch (type) {
    case 'sunny':          return <PixelSunWeather size={size} />;
    case 'partly-cloudy': return <PixelPartCloud size={size} />;
    case 'cloudy':        return <PixelCloudWeather size={size} />;
    case 'rainy':         return <PixelRain size={size} />;
    case 'stormy':        return <PixelStorm size={size} />;
  }
}

const WEATHER_COLORS: Record<WeatherType, string> = {
  'sunny':          'text-yellow-400',
  'partly-cloudy': 'text-amber-400',
  'cloudy':        'text-gray-300',
  'rainy':         'text-blue-300',
  'stormy':        'text-slate-400',
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface WeekGoal {
  id: string;
  title: string;
  type: 'deep-work' | 'habit' | 'milestone' | 'learning' | 'health';
  priority: 1 | 2 | 3;
  days: number[]; // 0=Mon ... 6=Sun
  done: boolean;
  color: string;
}

interface DayPlan {
  date: string;
  dayName: string;
  dayNum: number;
  label: string;
  theme: string;
  weather: WeatherType;
  temp: number;
  rainChance: number;
  tasks: { id: string; text: string; done: boolean; type: 'task' | 'meeting' | 'focus' }[];
  energy: 1 | 2 | 3;
  notes: string;
  highlight: boolean;
}

interface FocusBlock {
  id: string;
  start: string;
  end: string;
  label: string;
  type: 'deep' | 'creative' | 'review' | 'learning' | 'admin';
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getWeekDays(baseDate: Date = new Date()): DayPlan[] {
  const monday = new Date(baseDate);
  const day = monday.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  monday.setDate(monday.getDate() + diff);

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const themes = [
    'Deep Work Day',
    'Execute Day',
    'Learning Day',
    'Build Day',
    'Ship Day',
    'Rest & Reflect',
    'Rest & Create',
  ];
  const energyLevels: (1 | 2 | 3)[] = [3, 2, 2, 3, 2, 1, 1];

  const weatherTypes: WeatherType[] = ['sunny', 'partly-cloudy', 'rainy', 'cloudy', 'sunny', 'partly-cloudy', 'cloudy'];
  const temps: number[] = [31, 30, 27, 28, 31, 29, 27];
  const rainPct: number[] = [10, 30, 80, 60, 5, 45, 55];

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    const isToday = d.toDateString() === new Date().toDateString();
    return {
      date: d.toISOString().slice(0, 10),
      dayName: dayNames[i],
      dayNum: d.getDate(),
      label: isToday ? `${labels[i]} · Today` : labels[i],
      theme: themes[i],
      weather: weatherTypes[i],
      temp: temps[i],
      rainChance: rainPct[i],
      tasks: [
        { id: `t${i}a`, text: 'Morning review & priorities', done: false, type: 'task' as const },
        { id: `t${i}b`, text: 'Inbox zero', done: false, type: 'task' as const },
        { id: `t${i}c`, text: 'End-of-day wrap-up', done: false, type: 'task' as const },
      ],
      energy: energyLevels[i],
      notes: '',
      highlight: isToday,
    };
  });
}

const FOCUS_BLOCKS: FocusBlock[] = [
  { id: 'f1', start: '09:00', end: '12:00', label: 'Deep Work Block', type: 'deep' },
  { id: 'f2', start: '14:00', end: '16:00', label: 'Creative Work', type: 'creative' },
  { id: 'f3', start: '16:30', end: '17:30', label: 'Admin & Planning', type: 'admin' },
];

const TYPE_COLORS: Record<string, string> = {
  'deep-work': 'bg-violet-500',
  habit: 'bg-emerald-500',
  milestone: 'bg-amber-500',
  learning: 'bg-blue-500',
  health: 'bg-rose-500',
};

const TYPE_TEXT: Record<string, string> = {
  'deep-work': 'Deep Work',
  habit: 'Habit',
  milestone: 'Milestone',
  learning: 'Learning',
  health: 'Health',
};

const TYPE_BG: Record<string, string> = {
  'deep-work': 'bg-violet-50 border-violet-200',
  habit: 'bg-emerald-50 border-emerald-200',
  milestone: 'bg-amber-50 border-amber-200',
  learning: 'bg-blue-50 border-blue-200',
  health: 'bg-rose-50 border-rose-200',
};

const FOCUS_COLORS: Record<string, string> = {
  deep: 'bg-violet-500',
  creative: 'bg-pink-500',
  review: 'bg-amber-500',
  learning: 'bg-blue-500',
  admin: 'bg-gray-400',
};

const ENERGY_LABEL: Record<number, string> = { 1: 'Rest', 2: 'Moderate', 3: 'High Energy' };
const ENERGY_COLOR: Record<number, string> = { 1: 'text-slate-400', 2: 'text-amber-500', 3: 'text-emerald-500' };

const INITIAL_GOALS: WeekGoal[] = [
  { id: 'g1', title: 'Complete eBPF DAM module', type: 'deep-work', priority: 1, days: [0, 1, 2, 3], done: false, color: 'bg-violet-500' },
  { id: 'g2', title: 'Publish passive income blog post', type: 'milestone', priority: 2, days: [4], done: false, color: 'bg-amber-500' },
  { id: 'g3', title: 'Read 5 chapters of SRE book', type: 'learning', priority: 2, days: [0, 2, 4, 6], done: false, color: 'bg-blue-500' },
  { id: 'g4', title: 'Exercise 4x this week', type: 'health', priority: 1, days: [1, 3, 5], done: false, color: 'bg-rose-500' },
  { id: 'g5', title: 'Daily journaling habit', type: 'habit', priority: 3, days: [0, 1, 2, 3, 4, 5, 6], done: false, color: 'bg-emerald-500' },
];

// ─── Pixel Progress Bar ───────────────────────────────────────────────────────

function PixelRowBar({ pct, color = 'bg-violet-500', height = 8 }: { pct: number; color?: string; height?: number }) {
  const filled = Math.round((pct / 100) * height);
  return (
    <div className="flex flex-col-reverse gap-px">
      {Array.from({ length: height }, (_, r) => (
        <div key={r} className={`w-4 rounded-sm ${r < filled ? color : 'bg-gray-100'}`} />
      ))}
    </div>
  );
}

// ─── Focus Block Row ─────────────────────────────────────────────────────────

function FocusBlockRow({ block }: { block: FocusBlock }) {
  const [h, m] = block.start.split(':').map(Number);
  const [h2, m2] = block.end.split(':').map(Number);
  const startMins = h * 60 + m;
  const endMins = h2 * 60 + m2;
  const duration = endMins - startMins;
  const leftPct = (startMins / (24 * 60)) * 100;
  const widthPct = (duration / (24 * 60)) * 100;

  return (
    <div className="relative h-8 rounded overflow-hidden">
      <div className="absolute inset-y-0 left-0 right-0 bg-gray-50 rounded border border-gray-100" />
      <div
        className={`absolute inset-y-1 rounded-sm ${FOCUS_COLORS[block.type]} opacity-80`}
        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      >
        <div className="px-2 h-full flex items-center overflow-hidden">
          <span className="text-[9px] font-semibold text-white truncate">{block.label}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Day Detail ───────────────────────────────────────────────────────────────

function DayDetail({ day, onClose, onToggleTask }: {
  day: DayPlan;
  onClose: () => void;
  onToggleTask: (taskId: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-sm">
            {day.dayNum}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{day.label}</h3>
            <p className="text-[10px] text-gray-400">{day.theme}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 8 8" shapeRendering="crispEdges">
            <rect x="1" y="1" width="6" height="1" fill="currentColor" />
            <rect x="0" y="2" width="8" height="4" fill="currentColor" opacity="0.5" />
            <rect x="1" y="6" width="6" height="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Energy */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-gray-400 uppercase tracking-wider">Energy:</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map(n => (
            <div key={n} className={`w-4 h-4 rounded-sm flex items-center justify-center ${n <= day.energy ? (n === 3 ? 'bg-emerald-100' : n === 2 ? 'bg-amber-100' : 'bg-slate-100') : 'bg-gray-50'}`}>
              <div className={`w-2 h-2 rounded-sm ${n <= day.energy ? (n === 3 ? 'bg-emerald-500' : n === 2 ? 'bg-amber-500' : 'bg-slate-400') : 'bg-gray-200'}`} />
            </div>
          ))}
        </div>
        <span className={`text-[10px] font-medium ${ENERGY_COLOR[day.energy]}`}>{ENERGY_LABEL[day.energy]}</span>
      </div>

      {/* Tasks */}
      <div className="space-y-1.5">
        <span className="text-[9px] text-gray-400 uppercase tracking-wider">Tasks</span>
        {day.tasks.map(task => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors group"
          >
            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-colors ${
              task.done ? 'bg-violet-500 border-violet-500' : 'border-gray-200 group-hover:border-violet-300'
            }`}>
              {task.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" shapeRendering="crispEdges">
                  <rect x="1" y="4" width="1" height="2" fill="white" />
                  <rect x="2" y="5" width="1" height="2" fill="white" />
                  <rect x="3" y="3" width="1" height="2" fill="white" />
                  <rect x="4" y="1" width="1" height="2" fill="white" />
                  <rect x="5" y="2" width="2" height="1" fill="white" />
                </svg>
              )}
            </div>
            <span className={`text-xs flex-1 ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
              {task.text}
            </span>
            {task.type === 'focus' && <span className="text-[8px] text-violet-400 font-mono">FOCUS</span>}
            {task.type === 'meeting' && <span className="text-[8px] text-amber-400 font-mono">MTG</span>}
          </div>
        ))}
      </div>

      {/* Notes */}
      <div>
        <span className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5">Notes</span>
        <textarea
          className="w-full text-xs border border-gray-100 rounded-md p-2 h-20 resize-none outline-none focus:border-violet-200 font-mono bg-gray-50"
          placeholder="What do you want to accomplish this day?"
          defaultValue={day.notes}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function WeekAheadPage() {
  const [days, setDays] = useState<DayPlan[]>(() => getWeekDays());
  const [goals, setGoals] = useState<WeekGoal[]>(INITIAL_GOALS);
  const [selectedDay, setSelectedDay] = useState<DayPlan | null>(null);
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState('');
  const [planningMode, setPlanningMode] = useState<'preview' | 'plan'>('preview');

  // Real-time clock
  useState(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Singapore' }));
    update();
  });

  // Ticker for animated decorations
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const completedGoals = goals.filter(g => g.done).length;
  const completedTasks = days.reduce((sum, d) => sum + d.tasks.filter(t => t.done).length, 0);
  const totalTasks = days.reduce((sum, d) => sum + d.tasks.length, 0);

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const toggleTask = (taskId: string) => {
    setDays(prev => prev.map(d => ({
      ...d,
      tasks: d.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t),
    })));
    // Keep selected day in sync
    setSelectedDay(prev => prev ? { ...prev, tasks: prev.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) } : prev);
  };

  return (
    <div className="max-w-7xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
            <PixelCalendar size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Week Ahead</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {days[0]?.date} — {days[6]?.date}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Mode switcher */}
          <div className="flex items-center bg-gray-100 rounded-md p-0.5 gap-0.5">
            {(['preview', 'plan'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setPlanningMode(mode)}
                className={`text-[10px] px-3 py-1 rounded transition-colors font-medium uppercase tracking-wider flex items-center gap-1.5 ${
                  planningMode === mode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {mode === 'preview' ? (
                  <PixelSparkle size={10} className={planningMode === mode ? 'text-violet-500' : 'text-gray-400'} />
                ) : (
                  <PixelTasks size={10} className={planningMode === mode ? 'text-violet-500' : 'text-gray-400'} />
                )}
                {mode}
              </button>
            ))}
          </div>
          {/* Summary pill */}
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono bg-white border border-gray-200 px-2.5 py-1.5 rounded">
            <div className="flex items-center gap-1">
              <PixelStar size={10} />
              <span>{completedGoals}/{goals.length} goals</span>
            </div>
            <div className="w-px h-3 bg-gray-200" />
            <div className="flex items-center gap-1">
              <PixelCheck size={10} className="text-emerald-500" />
              <span>{completedTasks}/{totalTasks} tasks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Week Overview Strip */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <PixelTarget size={14} />
          <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Week at a Glance</h2>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[9px] text-gray-400">
              {days.filter(d => d.highlight).length > 0 ? '← Today' : ''}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-7 divide-x divide-gray-50">
          {days.map(day => (
            <div
              key={day.date}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-3 text-center cursor-pointer transition-all hover:bg-gray-50 ${
                day.highlight ? 'bg-violet-50' : ''
              } ${selectedDay?.date === day.date ? 'bg-violet-50 ring-1 ring-violet-200' : ''}`}
            >
              <div className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">{day.dayName}</div>
              <div className={`text-lg font-bold mt-0.5 ${day.highlight ? 'text-violet-600' : 'text-gray-900'}`}>
                {day.dayNum}
              </div>
              <div className="text-[9px] text-gray-400 mt-1">{day.theme}</div>
              {/* Task progress dots */}
              <div className="flex justify-center gap-0.5 mt-2">
                {day.tasks.map(task => (
                  <div key={task.id} className={`w-1.5 h-1.5 rounded-full ${task.done ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                ))}
              </div>
              {/* Energy indicator */}
              <div className="flex justify-center gap-px mt-1.5">
                {[1, 2, 3].map(n => (
                  <div key={n} className={`w-2 h-1 rounded-sm ${n <= day.energy ? (n === 3 ? 'bg-emerald-400' : n === 2 ? 'bg-amber-400' : 'bg-slate-300') : 'bg-gray-100'}`} />
                ))}
              </div>
              {day.highlight && (
                <div className="text-[8px] text-violet-500 font-semibold mt-1 uppercase tracking-wider">Today</div>
              )}
              {/* Weather strip */}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-center gap-1">
                  <WeatherIcon type={day.weather} size={12} />
                  <span className={`text-[10px] font-bold ${WEATHER_COLORS[day.weather]}`}>
                    {day.temp}°
                  </span>
                </div>
                {/* Rain chance bar */}
                <div className="mt-0.5 mx-1 h-1 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      day.rainChance > 70 ? 'bg-blue-400' :
                      day.rainChance > 40 ? 'bg-sky-300' :
                      'bg-slate-200'
                    }`}
                    style={{ width: `${day.rainChance}%` }}
                  />
                </div>
                <div className="flex items-center justify-center gap-0.5 mt-0.5">
                  <span className={`text-[8px] font-mono ${
                    day.rainChance > 70 ? 'text-blue-500' :
                    day.rainChance > 40 ? 'text-sky-400' :
                    'text-gray-400'
                  }`}>
                    {day.rainChance > 70 ? '💧' : day.rainChance > 40 ? '💦' : '✨'} {day.rainChance}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-4">
        {/* Left: Goals + Focus Blocks */}
        <div className="col-span-3 space-y-4">
          {/* Week Goals */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelFlag size={12} />
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Week Goals</h2>
              <span className="ml-auto text-[9px] text-gray-400">{completedGoals}/{goals.length} done</span>
            </div>
            <div className="divide-y divide-gray-50">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`px-5 py-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors ${goal.done ? 'opacity-60' : ''}`}
                >
                  {/* Checkbox */}
                  <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${
                    goal.done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-200 hover:border-violet-300'
                  }`}>
                    {goal.done && (
                      <svg width="8" height="8" viewBox="0 0 8 8" shapeRendering="crispEdges">
                        <rect x="1" y="4" width="1" height="2" fill="white" />
                        <rect x="2" y="5" width="1" height="2" fill="white" />
                        <rect x="3" y="3" width="1" height="2" fill="white" />
                        <rect x="4" y="1" width="1" height="2" fill="white" />
                        <rect x="5" y="2" width="2" height="1" fill="white" />
                      </svg>
                    )}
                  </div>

                  {/* Priority */}
                  <div className="flex gap-0.5 shrink-0">
                    {[1, 2, 3].map(p => (
                      <div key={p} className={`w-1.5 h-3 rounded-sm ${p <= goal.priority ? goal.color : 'bg-gray-100'}`} />
                    ))}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${goal.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {goal.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono ${TYPE_BG[goal.type]}`}>
                        {TYPE_TEXT[goal.type]}
                      </span>
                      <span className="text-[9px] text-gray-400">
                        {goal.days.map(d => ['M', 'T', 'W', 'T', 'F', 'S', 'S'][d]).join(' · ')}
                      </span>
                    </div>
                  </div>

                  {/* Day bar */}
                  <div className="hidden md:flex items-end gap-0.5 h-6 shrink-0">
                    {[0, 1, 2, 3, 4, 5, 6].map(d => (
                      <div key={d} className={`w-3 rounded-sm ${goal.days.includes(d) ? goal.color : 'bg-gray-50'}`} style={{ height: '8px' }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Focus Blocks */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelClock size={12} className="text-violet-400" />
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Focus Blocks</h2>
              <span className="ml-auto text-[9px] text-gray-400 font-mono">09:00 — 17:30</span>
            </div>
            <div className="px-5 py-3 space-y-2">
              {/* Time axis */}
              <div className="flex items-center gap-1 mb-1">
                {['06', '09', '12', '15', '18', '21'].map(h => (
                  <span key={h} className="text-[8px] text-gray-300 font-mono" style={{ width: `${100/6}%` }}>{h}:00</span>
                ))}
              </div>
              {/* Focus bars */}
              <div className="space-y-1.5">
                {FOCUS_BLOCKS.map(block => (
                  <div key={block.id} className="flex items-center gap-3">
                    <span className="text-[9px] text-gray-400 font-mono w-10 shrink-0">{block.start}</span>
                    <FocusBlockRow block={block} />
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                {Object.entries(FOCUS_COLORS).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-sm ${color} opacity-70`} />
                    <span className="text-[9px] text-gray-400 capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Day Detail / Planning */}
        <div className="col-span-2">
          {planningMode === 'preview' ? (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
                style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
                <PixelHeart size={12} className="text-rose-400" />
                <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Day Detail</h2>
              </div>
              <div className="p-5">
                {selectedDay ? (
                  <DayDetail day={selectedDay} onClose={() => setSelectedDay(null)} onToggleTask={toggleTask} />
                ) : (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
                      <PixelCalendar size={20} className="text-gray-300" />
                    </div>
                    <p className="text-xs text-gray-400">Click a day to see details</p>
                    <p className="text-[10px] text-gray-300 mt-1">View tasks · Track energy · Plan notes</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
                style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
                <PixelGoals size={12} className="text-emerald-500" />
                <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Planning Mode</h2>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-xs text-gray-500">
                  In planning mode, click any goal or task to toggle it. Track your week as you go.
                </p>
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-violet-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-violet-600">{completedGoals}</div>
                    <div className="text-[9px] text-violet-400 uppercase tracking-wider mt-0.5">Goals Done</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-emerald-600">{completedTasks}</div>
                    <div className="text-[9px] text-emerald-400 uppercase tracking-wider mt-0.5">Tasks Done</div>
                  </div>
                </div>
                {/* Priority focus */}
                <div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider block mb-2">Priority Focus Today</span>
                  <div className="space-y-1.5">
                    {goals.filter(g => g.priority === 1 && !g.done).slice(0, 3).map(g => (
                      <div key={g.id} className={`flex items-center gap-2 px-3 py-2 rounded-md border ${TYPE_BG[g.type]}`}>
                        <div className={`w-2 h-2 rounded-sm ${g.color}`} />
                        <span className="text-xs font-medium text-gray-700">{g.title}</span>
                      </div>
                    ))}
                    {goals.filter(g => g.priority === 1 && !g.done).length === 0 && (
                      <p className="text-[10px] text-gray-400 italic">All priority goals complete!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pixel Art Footer */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-sm"
            style={{ opacity: Math.sin(i * 0.6 + tick * 0.3) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Week Ahead · Screen 48
      </p>
    </div>
  );
}