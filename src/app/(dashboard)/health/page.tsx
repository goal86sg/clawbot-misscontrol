'use client';

import React, { useState } from 'react';
import { PixelClock, PixelHeart, PixelAlert, PixelSparkle, PixelCheck } from '@/lib/pixel-icons';
import { PixelHabits, PixelSleep, PixelActivity } from '@/lib/pixel-icons-extra';

// ─── Types ────────────────────────────────────────────────────────────────────

type VitalStatus = 'normal' | 'warning' | 'danger' | 'optimal';

interface Vital {
  id: string;
  label: string;
  value: string;
  unit: string;
  status: VitalStatus;
  trend: number; // +/- from last reading
  normalRange: string;
  icon: React.ReactNode;
}

interface LogEntry {
  id: string;
  type: 'water' | 'meal' | 'exercise' | 'medication' | 'sleep';
  label: string;
  value: string;
  calories?: number;
  time: string;
}

interface WeightEntry {
  date: string;
  weight: number; // kg
}

// ─── Pixel Icons ─────────────────────────────────────────────────────────────

function PixelHeartBPM({ size = 28, bpm = 72 }: { size?: number; bpm?: number }) {
  const color = bpm > 100 || bpm < 50 ? '#ef4444' : bpm > 80 || bpm < 60 ? '#eab308' : '#22c55e';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="pixel-heart-bpm" shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.2" />
      <rect x="2" y="0" width="4" height="2" fill="currentColor" opacity="0.3" />
      <rect x="0" y="2" width="2" height="2" fill="currentColor" opacity="0.2" />
      <rect x="6" y="2" width="2" height="2" fill="currentColor" opacity="0.2" />
      <rect x="1" y="3" width="2" height="1" fill="currentColor" />
      <rect x="6" y="3" width="1" height="1" fill="currentColor" />
      <rect x="0" y="4" width="8" height="3" fill="currentColor" opacity="0.3" />
      <rect x="1" y="4" width="1" height="3" fill={color} />
      <rect x="2" y="5" width="1" height="2" fill={color} />
      <rect x="3" y="6" width="3" height="1" fill="currentColor" opacity="0.7" />
      <rect x="6" y="5" width="1" height="2" fill="currentColor" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="8" y="1" width="2" height="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelWater({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="1" y="1" width="6" height="5" fill="currentColor" opacity="0.2" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="2" height="3" fill="currentColor" opacity="0.5" />
      <rect x="4" y="2" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelDumbbell({ size = 18 }: { size?: number }) {
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

function PixelPill({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-500" shapeRendering="crispEdges">
      <rect x="3" y="1" width="2" height="6" fill="currentColor" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="1" y="3" width="1" height="2" fill="currentColor" opacity="0.2" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelScale({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-gray-500" shapeRendering="crispEdges">
      <rect x="2" y="5" width="4" height="2" fill="currentColor" opacity="0.3" />
      <rect x="3" y="4" width="2" height="2" fill="currentColor" />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" opacity="0.2" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="4" height="2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function PixelTrendArrow({ trend, size = 12 }: { trend: number; size?: number }) {
  if (trend > 0) {
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
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-red-500" shapeRendering="crispEdges">
      <rect x="3" y="7" width="2" height="1" fill="currentColor" />
      <rect x="4" y="6" width="2" height="1" fill="currentColor" />
      <rect x="5" y="5" width="2" height="1" fill="currentColor" />
      <rect x="2" y="4" width="4" height="1" fill="currentColor" />
      <rect x="3" y="0" width="2" height="4" fill="currentColor" />
    </svg>
  );
}

function PixelDrop({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 6 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="2" y="0" width="2" height="1" fill="currentColor" />
      <rect x="1" y="1" width="4" height="5" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="2" height="4" fill="currentColor" opacity="0.5" />
      <rect x="3" y="1" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelCalories({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-red-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.8" />
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.3" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="4" width="2" height="2" fill="currentColor" />
      <rect x="2" y="6" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="4" y="6" width="1" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelBarChart({ values, max, height = 60, color = 'bg-blue-500' }: {
  values: number[]; max: number; height?: number; color?: string;
}) {
  const barW = 6;
  const gap = 3;
  return (
    <div className="flex items-end gap-1">
      {values.map((v, i) => {
        const filled = Math.round((v / max) * height);
        return (
          <div key={i} className="flex flex-col-reverse gap-0.5">
            <div className="w-[6px]" style={{ height }}>
              {Array.from({ length: height }, (_, r) => (
                <div
                  key={r}
                  className={`w-[6px] h-[3px] ${r < filled ? color : 'bg-gray-100'}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: VitalStatus }) {
  const config = {
    optimal: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', label: 'Optimal' },
    normal:  { bg: 'bg-blue-50',  border: 'border-blue-200',  text: 'text-blue-700',  label: 'Normal' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', label: 'Warning' },
    danger:  { bg: 'bg-red-50',   border: 'border-red-200',   text: 'text-red-700',   label: 'Alert' },
  };
  const c = config[status];
  return (
    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${c.bg} ${c.border} ${c.text}`}>
      {c.label}
    </span>
  );
}

// ─── Water Glass ────────────────────────────────────────────────────────────

function WaterGlass({ filled, total = 8 }: { filled: number; total?: number }) {
  return (
    <div className="flex items-end gap-0.5">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-3 h-5 rounded-sm transition-colors ${
            i < filled ? 'bg-blue-400' : 'bg-gray-100 border border-gray-100'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

const vitals: Vital[] = [
  {
    id: 'bpm',
    label: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    status: 'normal',
    trend: -2,
    normalRange: '60–100',
    icon: <PixelHeartBPM size={28} bpm={72} />,
  },
  {
    id: 'bp-sys',
    label: 'Blood Pressure',
    value: '118',
    unit: 'mmHg',
    status: 'optimal',
    trend: 0,
    normalRange: '<120 sys',
    icon: (
      <svg width={28} height={28} viewBox="0 0 16 16" className="text-pink-400" shapeRendering="crispEdges">
        <rect x="1" y="3" width="14" height="10" fill="currentColor" opacity="0.15" />
        <rect x="2" y="4" width="12" height="8" fill="currentColor" opacity="0.2" />
        <rect x="3" y="5" width="3" height="6" fill="currentColor" />
        <rect x="7" y="7" width="3" height="2" fill="currentColor" opacity="0.5" />
        <rect x="10" y="5" width="3" height="6" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'bp-dia',
    label: 'Diastolic',
    value: '78',
    unit: 'mmHg',
    status: 'normal',
    trend: 1,
    normalRange: '<80 dia',
    icon: (
      <svg width={28} height={28} viewBox="0 0 16 16" className="text-pink-300" shapeRendering="crispEdges">
        <rect x="1" y="6" width="14" height="4" fill="currentColor" opacity="0.3" />
        <rect x="3" y="7" width="3" height="2" fill="currentColor" opacity="0.5" />
        <rect x="10" y="7" width="3" height="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'spo2',
    label: 'SpO2',
    value: '98',
    unit: '%',
    status: 'optimal',
    trend: 0,
    normalRange: '95–100%',
    icon: (
      <svg width={28} height={28} viewBox="0 0 16 16" className="text-cyan-400" shapeRendering="crispEdges">
        <rect x="2" y="2" width="12" height="12" fill="currentColor" opacity="0.1" />
        <rect x="3" y="3" width="10" height="10" fill="currentColor" opacity="0.15" />
        <rect x="4" y="4" width="4" height="8" fill="currentColor" />
        <rect x="5" y="3" width="2" height="10" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'temp',
    label: 'Temperature',
    value: '36.6',
    unit: '°C',
    status: 'normal',
    trend: -0.1,
    normalRange: '36.1–37.2',
    icon: (
      <svg width={28} height={28} viewBox="0 0 16 16" className="text-orange-400" shapeRendering="crispEdges">
        <rect x="6" y="1" width="4" height="12" fill="currentColor" opacity="0.1" />
        <rect x="7" y="2" width="2" height="9" fill="currentColor" opacity="0.3" />
        <rect x="8" y="3" width="1" height="6" fill="currentColor" />
        <rect x="9" y="11" width="2" height="3" fill="currentColor" opacity="0.5" />
        <rect x="8" y="13" width="4" height="2" fill="currentColor" />
        <rect x="9" y="5" width="1" height="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'weight',
    label: 'Weight',
    value: '74.2',
    unit: 'kg',
    status: 'normal',
    trend: -0.3,
    normalRange: 'BMI 22.9',
    icon: <PixelScale size={28} />,
  },
];

const logEntries: LogEntry[] = [
  { id: 'l1', type: 'water', label: 'Glass of Water', value: '250ml', time: '07:32' },
  { id: 'l2', type: 'exercise', label: 'Morning Run', value: '3.2km', calories: 220, time: '07:00' },
  { id: 'l3', type: 'meal', label: 'Breakfast', value: 'Oats + banana', calories: 380, time: '08:15' },
  { id: 'l4', type: 'medication', label: 'Vitamin D', value: '1000 IU', time: '08:30' },
  { id: 'l5', type: 'water', label: 'Glass of Water', value: '250ml', time: '10:45' },
  { id: 'l6', type: 'meal', label: 'Lunch', value: 'Rice + chicken', calories: 520, time: '12:30' },
  { id: 'l7', type: 'water', label: 'Glass of Water', value: '250ml', time: '14:00' },
  { id: 'l8', type: 'sleep', label: 'Nap', value: '45min', time: '14:00' },
];

const weightHistory: WeightEntry[] = [
  { date: '2026-05-26', weight: 75.1 },
  { date: '2026-05-27', weight: 75.0 },
  { date: '2026-05-28', weight: 74.8 },
  { date: '2026-05-29', weight: 74.6 },
  { date: '2026-05-30', weight: 74.4 },
  { date: '2026-05-31', weight: 74.3 },
  { date: '2026-06-01', weight: 74.2 },
];

const weeklySteps = [6234, 8102, 5401, 7500, 9100, 4200, 3800];

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatTime(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function HealthPage() {
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [selectedTab, setSelectedTab] = useState<'today' | 'trends'>('today');
  const todayStr = new Date().toISOString().slice(0, 10);

  const calorieTotal = logEntries.filter(l => l.calories).reduce((s, l) => s + (l.calories || 0), 0);
  const stepsToday = weeklySteps[weeklySteps.length - 1];
  const maxSteps = Math.max(...weeklySteps);

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' }}>
            <PixelHeart size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Health & Vitals</h1>
            <p className="text-xs text-gray-500 mt-0.5">Track your body's signals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded">
            <PixelClock size={12} />
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore' })}</span>
          </div>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-3 gap-3">
        {vitals.map(vital => (
          <div key={vital.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              {vital.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{vital.label}</p>
                <StatusBadge status={vital.status} />
              </div>
              <div className="flex items-end gap-1.5">
                <span className="text-2xl font-bold font-mono text-gray-900">{vital.value}</span>
                <span className="text-[11px] text-gray-400 mb-0.5">{vital.unit}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[9px] text-gray-400">Normal: {vital.normalRange}</span>
                {vital.trend !== 0 && (
                  <div className="flex items-center gap-0.5">
                    <PixelTrendArrow trend={vital.trend} size={10} />
                    <span className="text-[9px] text-gray-400">{Math.abs(vital.trend)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid — two columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left column: water + nutrition + activity */}
        <div className="space-y-4">
          {/* Water Tracker */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelWater size={14} />
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Hydration</h2>
              <span className="ml-auto text-xs font-mono font-bold text-blue-500">{(waterGlasses * 250).toLocaleString()}ml</span>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <WaterGlass filled={waterGlasses} total={8} />
                <div className="text-right">
                  <p className="text-lg font-bold font-mono text-gray-900">{waterGlasses}</p>
                  <p className="text-[10px] text-gray-400">/ 8 glasses</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
                  className="flex-1 h-8 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded border border-gray-100 transition-colors"
                >
                  −
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <button
                    key={n}
                    onClick={() => setWaterGlasses(n)}
                    className={`w-8 h-8 rounded text-[10px] font-bold transition-all ${
                      waterGlasses >= n
                        ? 'bg-blue-400 text-white'
                        : 'bg-gray-50 text-gray-400 hover:bg-blue-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setWaterGlasses(Math.min(8, waterGlasses + 1))}
                  className="flex-1 h-8 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded border border-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <div className="mt-3 bg-blue-50 rounded px-3 py-2 flex items-center gap-2">
                <PixelSparkle size={10} className="text-blue-400" />
                <p className="text-[10px] text-blue-600">
                  {waterGlasses >= 8 ? '✅ Daily goal reached!' : `${8 - waterGlasses} more glasses to hit 2L target`}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelDumbbell size={14} />
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity</h2>
            </div>
            <div className="px-5 py-4 space-y-4">
              {/* Steps */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Today's Steps</p>
                  <p className="text-xl font-bold font-mono text-gray-900 mt-0.5">{stepsToday.toLocaleString()}</p>
                  <p className="text-[9px] text-gray-400">Goal: 7,500</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <PixelBarChart values={weeklySteps} max={maxSteps} height={48} color="bg-green-400" />
                  <div className="flex gap-1 mt-1">
                    {['M','T','W','T','F','S','S'].map((d, i) => (
                      <span key={i} className="text-[8px] text-gray-400">{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Minutes */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Active Minutes</p>
                  <p className="text-xl font-bold font-mono text-gray-900 mt-0.5">42</p>
                  <p className="text-[9px] text-gray-400">Goal: 30 min</p>
                </div>
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: `${Math.min(100, (42/30)*100)}%` }} />
                </div>
              </div>

              {/* Calories */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Calories Burned</p>
                  <p className="text-xl font-bold font-mono text-gray-900 mt-0.5">{calorieTotal}</p>
                  <p className="text-[9px] text-gray-400">Net: {calorieTotal - 220}</p>
                </div>
                <PixelCalories size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Middle column: today's log */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <PixelActivity size={14} className="text-indigo-400" />
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Today's Log</h2>
            <span className="ml-auto text-[9px] text-gray-400">{logEntries.length} entries</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {logEntries.map(entry => (
              <div key={entry.id} className="px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50/50 transition-colors">
                <div className={`shrink-0 w-7 h-7 rounded flex items-center justify-center ${
                  entry.type === 'water' ? 'bg-blue-50 text-blue-400' :
                  entry.type === 'exercise' ? 'bg-orange-50 text-orange-400' :
                  entry.type === 'meal' ? 'bg-green-50 text-green-500' :
                  entry.type === 'medication' ? 'bg-purple-50 text-purple-500' :
                  'bg-indigo-50 text-indigo-400'
                }`}>
                  {entry.type === 'water' && <PixelDrop size={12} />}
                  {entry.type === 'exercise' && <PixelDumbbell size={12} />}
                  {entry.type === 'meal' && <PixelCalories size={12} />}
                  {entry.type === 'medication' && <PixelPill size={12} />}
                  {entry.type === 'sleep' && <PixelSleep size={12} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">{entry.label}</p>
                  <p className="text-[10px] text-gray-400">
                    {entry.value}{entry.calories ? ` · ${entry.calories} kcal` : ''}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 font-mono shrink-0">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: weekly summary + streaks */}
        <div className="space-y-4">
          {/* Weekly Summary */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelSparkle size={12} className="text-yellow-400" />
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Week Summary</h2>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: 'Avg Sleep', value: '7h 12m', icon: <PixelSleep size={14} />, color: 'indigo' },
                { label: 'Workouts', value: '4 sessions', icon: <PixelDumbbell size={14} />, color: 'orange' },
                { label: 'Water Avg', value: '6.2 glasses', icon: <PixelWater size={14} />, color: 'blue' },
                { label: 'Active Days', value: '6 / 7', icon: <PixelActivity size={14} className="text-green-400" />, color: 'green' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded flex items-center justify-center ${
                    item.color === 'indigo' ? 'bg-indigo-50' :
                    item.color === 'orange' ? 'bg-orange-50' :
                    item.color === 'blue' ? 'bg-blue-50' :
                    'bg-green-50'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400">{item.label}</p>
                    <p className="text-sm font-bold font-mono text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Streaks */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelHabits size={14} />
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Streaks</h2>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: 'Water Goal', current: 3, target: 7, color: 'bg-blue-400' },
                { label: 'Workouts', current: 5, target: 7, color: 'bg-orange-400' },
                { label: 'Good Sleep', current: 4, target: 7, color: 'bg-indigo-400' },
                { label: 'Medication', current: 7, target: 7, color: 'bg-green-400' },
              ].map(streak => {
                const pct = (streak.current / streak.target) * 100;
                return (
                  <div key={streak.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-gray-500">{streak.label}</span>
                      <span className="text-[10px] font-mono font-bold text-gray-800">
                        {streak.current}/{streak.target}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex gap-0.5 p-0.5">
                      {Array.from({ length: streak.target }, (_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-colors ${i < streak.current ? streak.color : 'bg-white border border-gray-100'}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weight Trend */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelScale size={14} />
              <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Weight Trend</h2>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-[10px] text-gray-400">Current</p>
                  <p className="text-xl font-bold font-mono text-gray-900">{weightHistory[weightHistory.length - 1].weight} <span className="text-xs text-gray-400 font-normal">kg</span></p>
                </div>
                <div className="flex items-center gap-0.5">
                  <PixelTrendArrow trend={-1} size={10} />
                  <span className="text-[10px] text-green-500 font-semibold">−0.9kg</span>
                  <span className="text-[9px] text-gray-400">this week</span>
                </div>
              </div>
              <div className="mt-3">
                <PixelBarChartBarChart
                  data={weightHistory.map(w => w.weight)}
                  labels={weightHistory.map(w => w.date.slice(5))}
                  min={73}
                  max={76}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg px-4 py-3 flex items-start gap-3">
        <PixelSparkle size={12} className="text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] text-blue-600 font-semibold mb-0.5">Health Insight</p>
          <p className="text-xs text-blue-700 leading-relaxed">
            Great week! You hit your workout goal 5/7 days. Consider adding +2kg to your dumbbells for progressive overload. Your resting BPM has dropped 3 beats since last month — cardio is working.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Pixel Mini Bar Chart ────────────────────────────────────────────────────

function PixelBarChartBarChart({ data, labels, min, max }: {
  data: number[]; labels: string[]; min: number; max: number;[key: string]: unknown;
}) {
  const barW = 8;
  const gap = 2;
  const svgW = data.length * (barW + gap);
  const svgH = 50;

  return (
    <svg width={svgW} height={svgH} shapeRendering="crispEdges" className="block">
      {/* Y-axis guide lines */}
      {[min, (min + max) / 2, max].map((v, i) => {
        const y = Math.round(((max - v) / (max - min)) * svgH);
        return <rect key={i} x={0} y={y - 0.5} width={svgW} height={1} fill="#f3f4f6" />;
      })}

      {/* Bars */}
      {data.map((v, i) => {
        const barH = Math.max(4, Math.round(((max - v) / (max - min)) * svgH));
        const x = i * (barW + gap);
        const y = svgH - barH;
        return (
          <React.Fragment key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill="#6366f1" opacity="0.7" />
            <rect x={x} y={y} width={barW} height={2} fill="#6366f1" />
            <text
              x={x + barW / 2}
              y={svgH + 8}
              textAnchor="middle"
              fontSize={5}
              fill="#9ca3af"
              fontFamily="monospace"
            >
              {labels[i]}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
}
