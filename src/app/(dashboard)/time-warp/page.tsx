'use client';

import React, { useState, useEffect } from 'react';
import { PixelClock, PixelSparkle } from '@/lib/pixel-icons';

// ─── Pixel Art Icons ─────────────────────────────────────────────────────────

function PixelClockIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-500" shapeRendering="crispEdges">
      <rect x="3" y="1" width="2" height="1" fill="currentColor" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="3" y="2" width="2" height="3" fill="currentColor" />
      <rect x="4" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.2" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.2" />
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.2" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelHourGlass({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-400" shapeRendering="crispEdges">
      <rect x="1" y="0" width="6" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="1" width="8" height="1" fill="currentColor" />
      <rect x="2" y="2" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="2" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="4" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="1" y="5" width="6" height="1" fill="currentColor" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelStar({ size = 12 }: { size?: number }) {
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

function PixelBolt({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-400" shapeRendering="crispEdges">
      <rect x="4" y="0" width="2" height="2" fill="currentColor" />
      <rect x="2" y="2" width="4" height="2" fill="currentColor" />
      <rect x="0" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="1" y="6" width="3" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelFlame({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelMoon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-400" shapeRendering="crispEdges">
      <rect x="2" y="1" width="5" height="5" fill="currentColor" opacity="0.2" />
      <rect x="3" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="4" y="3" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="5" y="4" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelDumbbell({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="0" y="3" width="1" height="2" fill="currentColor" />
      <rect x="1" y="2" width="1" height="4" fill="currentColor" opacity="0.6" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" />
      <rect x="6" y="2" width="1" height="4" fill="currentColor" opacity="0.6" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelCup({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-300" shapeRendering="crispEdges">
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="3" y="2" width="2" height="2" fill="currentColor" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelBus({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.3" />
      <rect x="0" y="3" width="8" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" />
      <rect x="5" y="2" width="1" height="1" fill="currentColor" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="6" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type ActivityType =
  | 'sleep'
  | 'deep-sleep'
  | 'rem'
  | 'work'
  | 'focus'
  | 'commute'
  | 'exercise'
  | 'meal'
  | 'coffee'
  | 'meeting'
  | 'standup'
  | 'break'
  | 'social'
  | 'idle'
  | 'focused'
  | 'learning'
  | 'coding'
  | 'review'
  | 'admin'
  | 'leisure'
  | 'reading'
  | 'snack';

interface TimeBlock {
  type: ActivityType;
  label: string;
  startHour: number;
  startMin?: number;
  endHour: number;
  endMin?: number;
  intensity?: 1 | 2 | 3; // for variable intensity
}

interface ActivityStat {
  type: ActivityType;
  label: string;
  totalMinutes: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  count: number;
}

// ─── Color Config ─────────────────────────────────────────────────────────────

const activityColors: Record<ActivityType, { color: string; bg: string; label: string }> = {
  'sleep': { color: 'text-indigo-400', bg: 'bg-indigo-100 border-indigo-200', label: 'Sleep' },
  'deep-sleep': { color: 'text-violet-500', bg: 'bg-violet-100 border-violet-200', label: 'Deep Sleep' },
  'rem': { color: 'text-purple-400', bg: 'bg-purple-100 border-purple-200', label: 'REM' },
  'work': { color: 'text-gray-700', bg: 'bg-gray-100 border-gray-300', label: 'Work' },
  'focus': { color: 'text-blue-600', bg: 'bg-blue-100 border-blue-200', label: 'Deep Focus' },
  'focused': { color: 'text-blue-700', bg: 'bg-blue-200 border-blue-300', label: 'Focused' },
  'commute': { color: 'text-cyan-600', bg: 'bg-cyan-100 border-cyan-200', label: 'Commute' },
  'exercise': { color: 'text-orange-500', bg: 'bg-orange-100 border-orange-200', label: 'Exercise' },
  'meal': { color: 'text-amber-500', bg: 'bg-amber-100 border-amber-200', label: 'Meal' },
  'coffee': { color: 'text-amber-400', bg: 'bg-amber-50 border-amber-200', label: 'Coffee' },
  'meeting': { color: 'text-teal-500', bg: 'bg-teal-100 border-teal-200', label: 'Meeting' },
  'standup': { color: 'text-teal-400', bg: 'bg-teal-50 border-teal-200', label: 'Standup' },
  'break': { color: 'text-green-500', bg: 'bg-green-100 border-green-200', label: 'Break' },
  'social': { color: 'text-pink-500', bg: 'bg-pink-100 border-pink-200', label: 'Social' },
  'idle': { color: 'text-gray-400', bg: 'bg-gray-50 border-gray-200', label: 'Idle' },
  'learning': { color: 'text-emerald-600', bg: 'bg-emerald-100 border-emerald-200', label: 'Learning' },
  'coding': { color: 'text-sky-600', bg: 'bg-sky-100 border-sky-200', label: 'Coding' },
  'review': { color: 'text-amber-600', bg: 'bg-amber-100 border-amber-300', label: 'Review' },
  'admin': { color: 'text-stone-500', bg: 'bg-stone-100 border-stone-200', label: 'Admin' },
  'leisure': { color: 'text-rose-400', bg: 'bg-rose-100 border-rose-200', label: 'Leisure' },
  'reading': { color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-200', label: 'Reading' },
  'snack': { color: 'text-yellow-600', bg: 'bg-yellow-100 border-yellow-200', label: 'Snack' },
};

// ─── Pixel Hour Marker ─────────────────────────────────────────────────────────

function PixelHourMarker({ hour, isCurrentHour }: {
  hour: number;
  isCurrentHour: boolean;
}) {
  const label = hour === 0 ? '12a' : hour < 12 ? `${hour}a` : hour === 12 ? '12p' : `${hour - 12}p`;
  return (
    <div className={`flex flex-col items-center gap-0.5 ${isCurrentHour ? '' : 'opacity-40'}`}>
      <span className={`text-[9px] font-mono font-medium ${isCurrentHour ? 'text-blue-600' : 'text-gray-400'}`}>
        {label}
      </span>
      <div className={`w-2 h-2 rounded-sm ${isCurrentHour ? 'bg-blue-500' : 'bg-gray-300'}`}
           style={{ imageRendering: 'pixelated' }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TimeWarpPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<'today' | 'yesterday' | 'this-week'>('today');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMin = currentTime.getMinutes();

  // Sample day data — in production this would come from actual tracking
  const timeBlocks: TimeBlock[] = [
    // Sleep (10:30pm - 7:00am = 23:30 - 07:00)
    { type: 'sleep', label: 'Sleep', startHour: 0, endHour: 7, intensity: 2 },
    // Morning routine
    { type: 'coffee', label: 'Morning coffee', startHour: 7, startMin: 0, endHour: 7, endMin: 30 },
    { type: 'meal', label: 'Breakfast', startHour: 7, startMin: 30, endHour: 8, endMin: 0 },
    // Commute
    { type: 'commute', label: 'Bus to office', startHour: 8, startMin: 15, endHour: 9, endMin: 0 },
    // Work block 1
    { type: 'work', label: 'Deep work — eBPF DAM', startHour: 9, endHour: 10, intensity: 1 },
    { type: 'focused', label: 'Focused coding', startHour: 10, endHour: 11, intensity: 3 },
    { type: 'meeting', label: 'Team sync', startHour: 11, endHour: 11, endMin: 30 },
    // Snack
    { type: 'snack', label: 'Snack', startHour: 11, startMin: 30, endHour: 11, endMin: 45 },
    // Work block 2
    { type: 'focused', label: 'Postgres query analysis', startHour: 12, endHour: 13, intensity: 2 },
    { type: 'meal', label: 'Lunch', startHour: 13, endHour: 14 },
    // Afternoon
    { type: 'coding', label: 'Mission Control features', startHour: 14, endHour: 15, intensity: 3 },
    { type: 'coffee', label: 'Coffee break', startHour: 15, startMin: 0, endHour: 15, endMin: 20 },
    { type: 'review', label: 'PR review', startHour: 15, startMin: 20, endHour: 16, intensity: 2 },
    { type: 'standup', label: 'Standup prep', startHour: 16, endHour: 16, endMin: 30 },
    { type: 'meeting', label: 'Team standup', startHour: 16, startMin: 30, endHour: 17 },
    // Evening
    { type: 'commute', label: 'Commute home', startHour: 17, endHour: 18 },
    { type: 'exercise', label: 'Workout', startHour: 18, endHour: 19 },
    { type: 'meal', label: 'Dinner', startHour: 19, endHour: 20 },
    { type: 'learning', label: 'Reading / learning', startHour: 20, endHour: 21, intensity: 2 },
    { type: 'leisure', label: 'Evening leisure', startHour: 21, endHour: 22, intensity: 1 },
    { type: 'idle', label: 'Wind down', startHour: 22, endHour: 23, intensity: 1 },
  ];

  // Build 24-hour grid (1440 minutes = 1 pixel per minute at full width)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Assign blocks to minutes
  const minuteMap: (TimeBlock | null)[] = Array(1440).fill(null);

  timeBlocks.forEach(block => {
    const startMin = (block.startHour * 60) + (block.startMin || 0);
    const endMin = (block.endHour * 60) + (block.endMin || 0);
    for (let m = startMin; m < endMin && m < 1440; m++) {
      minuteMap[m] = block;
    }
  });

  // Now build hour segments for the pixel row
  const hourPixels: { block: TimeBlock | null; minWithinHour: number }[][] = hours.map(hour => {
    return Array.from({ length: 60 }, (_, min) => ({
      block: minuteMap[hour * 60 + min],
      minWithinHour: min,
    }));
  });

  // Stats computation
  const stats: ActivityStat[] = [
    {
      type: 'sleep',
      label: 'Sleep',
      totalMinutes: 450,
      icon: <PixelMoon size={14} />,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 border-indigo-200',
      count: 1,
    },
    {
      type: 'focused',
      label: 'Deep Focus',
      totalMinutes: 240,
      icon: <PixelBolt size={14} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      count: 3,
    },
    {
      type: 'work',
      label: 'Work',
      totalMinutes: 300,
      icon: <PixelClockIcon size={16} />,
      color: 'text-gray-700',
      bgColor: 'bg-gray-100 border-gray-300',
      count: 1,
    },
    {
      type: 'exercise',
      label: 'Exercise',
      totalMinutes: 60,
      icon: <PixelDumbbell size={14} />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 border-orange-200',
      count: 1,
    },
    {
      type: 'learning',
      label: 'Learning',
      totalMinutes: 60,
      icon: <PixelStar size={12} />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      count: 1,
    },
    {
      type: 'commute',
      label: 'Commute',
      totalMinutes: 120,
      icon: <PixelBus size={14} />,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 border-cyan-200',
      count: 2,
    },
  ];

  // Focused time = sessions with intensity >= 2
  const totalFocusMinutes = stats.find(s => s.type === 'focused')?.totalMinutes || 0;
  const sleepMinutes = stats.find(s => s.type === 'sleep')?.totalMinutes || 0;
  const workMinutes = stats.find(s => s.type === 'work')?.totalMinutes || 0;
  const commuteMinutes = stats.find(s => s.type === 'commute')?.totalMinutes || 0;
  const exerciseMinutes = stats.find(s => s.type === 'exercise')?.totalMinutes || 0;
  const totalTracked = stats.reduce((sum, s) => sum + s.totalMinutes, 0);
  const dayRating = totalFocusMinutes >= 180 ? 5 : totalFocusMinutes >= 120 ? 4 : totalFocusMinutes >= 60 ? 3 : 2;

  const formatHours = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PixelClockIcon size={28} />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Time Warp</h1>
            <p className="text-xs text-gray-500 mt-0.5">Your day, pixel by pixel</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {(['today', 'yesterday', 'this-week'] as const).map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-all ${
                  selectedDay === day
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {day === 'today' ? 'Today' : day === 'yesterday' ? 'Yesterday' : 'This Week'}
              </button>
            ))}
          </div>
          <div className="text-xs font-mono text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-lg">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
          <div className="text-blue-500"><PixelBolt size={18} /></div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Deep Focus</p>
            <p className="text-lg font-bold text-blue-600">{formatHours(totalFocusMinutes)}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
          <div className="text-indigo-500"><PixelMoon size={18} /></div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Sleep</p>
            <p className="text-lg font-bold text-indigo-600">{formatHours(sleepMinutes)}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
          <div className="text-gray-700"><PixelClockIcon size={18} /></div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Work</p>
            <p className="text-lg font-bold text-gray-700">{formatHours(workMinutes)}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
          <div className="text-orange-500"><PixelDumbbell size={18} /></div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Exercise</p>
            <p className="text-lg font-bold text-orange-600">{formatHours(exerciseMinutes)}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
          <div className="text-cyan-600"><PixelBus size={18} /></div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Commute</p>
            <p className="text-lg font-bold text-cyan-600">{formatHours(commuteMinutes)}</p>
          </div>
        </div>
      </div>

      {/* Main Time Warp Grid */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Hour Labels */}
        <div className="flex border-b border-gray-100 px-4 pt-2">
          {hours.map(hour => (
            <div key={hour} className="flex-1 flex justify-center">
              <PixelHourMarker hour={hour} isCurrentHour={hour === currentHour} />
            </div>
          ))}
        </div>

        {/* Pixel Row — 24 hours as continuous pixel blocks */}
        <div className="relative px-4 py-3">
          <div className="flex gap-px">
            {hours.map(hour => (
              <div key={hour} className="flex-1 flex flex-col gap-px">
                {hourPixels[hour].map(({ block, minWithinHour }, idx) => {
                  const cfg = block ? activityColors[block.type] : { bg: 'bg-gray-50' };
                  const isCurrent = hour === currentHour && minWithinHour <= currentMin;
                  const isNight = hour >= 22 || hour < 6;
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-sm transition-all ${
                        block ? cfg.bg : isNight ? 'bg-indigo-50' : 'bg-gray-50'
                      } ${isCurrent && hour === currentHour ? 'ring-1 ring-blue-400 ring-opacity-60' : ''}`}
                      title={block ? `${block.label} — ${hour}:${minWithinHour.toString().padStart(2, '0')}` : ''}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Current time indicator */}
          <div
            className="absolute top-2 bottom-3 w-0.5 bg-blue-500 z-10 pointer-events-none"
            style={{
              left: `${((currentHour * 60 + currentMin) / 1440) * 100}%`,
            }}
          />
        </div>

        {/* Activity Legend Strip */}
        <div className="flex flex-wrap gap-2 px-4 py-2.5 bg-gray-50 border-t border-gray-100">
          {Object.entries(activityColors).slice(0, 12).map(([type, cfg]) => (
            <div key={type} className={`flex items-center gap-1 text-[10px] ${cfg.color}`}>
              <div className={`w-3 h-3 rounded-sm ${cfg.bg}`} style={{ imageRendering: 'pixelated' }} />
              <span>{cfg.label}</span>
            </div>
          ))}
          <span className="text-[10px] text-gray-400">+ more</span>
        </div>
      </div>

      {/* Activity Breakdown + Day Rating */}
      <div className="grid grid-cols-3 gap-4">
        {/* Day Rating */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Day Rating</p>
          <div className="flex gap-1.5 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-sm flex items-center justify-center ${
                  i < dayRating ? 'bg-amber-100' : 'bg-gray-100'
                }`}
                style={{ imageRendering: 'pixelated' }}
              >
                {i < dayRating ? (
                  <PixelStar size={14} />
                ) : (
                  <span className="text-gray-300 text-[10px]">☆</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 font-medium">
            {dayRating === 5 ? 'Legendary productivity' :
             dayRating === 4 ? 'Great focus day' :
             dayRating === 3 ? 'Solid day' : 'Recovery mode'}
          </p>
          <div className="mt-3 text-[10px] text-gray-400">
            {totalTracked / 60}h tracked of 24h
          </div>
        </div>

        {/* Activity Breakdown */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Activity Breakdown</p>
          <div className="space-y-2">
            {stats.map(stat => {
              const pct = Math.round((stat.totalMinutes / 1440) * 100);
              return (
                <div key={stat.type} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-gray-700">{stat.label}</span>
                      <span className="text-[10px] text-gray-400">{formatHours(stat.totalMinutes)}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`}
                        style={{ width: `${pct * 4}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pixel Art Timeline — Vertical Timeline View */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <PixelHourGlass size={16} />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Pixel Timeline</p>
        </div>
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-200 via-blue-200 to-amber-200" />

          <div className="space-y-1">
            {timeBlocks.filter(b => b.label !== 'Sleep').slice(0, 8).map((block, i) => {
              const cfg = activityColors[block.type];
              const startTime = `${block.startHour.toString().padStart(2, '0')}:${(block.startMin || 0).toString().padStart(2, '0')}`;
              const endTime = `${block.endHour.toString().padStart(2, '0')}:${(block.endMin || 0).toString().padStart(2, '0')}`;
              const duration = (block.endHour * 60 + (block.endMin || 0)) - (block.startHour * 60 + (block.startMin || 0));

              return (
                <div key={i} className="flex items-center gap-3 pl-0.5 group">
                  {/* Pixel dot on timeline */}
                  <div className={`w-5 h-5 rounded-sm flex items-center justify-center z-10 ${cfg.bg} group-hover:scale-110 transition-transform`}
                       style={{ imageRendering: 'pixelated' }}>
                    <div className={`w-2 h-2 rounded-sm ${cfg.color.replace('text-', 'bg-')}`} />
                  </div>
                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 group-hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${cfg.color}`}>{block.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-gray-400">{startTime} – {endTime}</span>
                      <span className="text-[10px] text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                        {duration}m
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pixel Clock Footer */}
      <div className="flex items-center justify-between text-[10px] text-gray-400">
        <div className="flex items-center gap-1">
          <PixelClockIcon size={12} />
          <span>Last updated: {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center gap-1">
          <PixelSparkle size={10} />
          <span>{totalTracked / 60}h of your day tracked</span>
        </div>
      </div>
    </div>
  );
}
