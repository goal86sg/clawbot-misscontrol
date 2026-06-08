'use client';

import React, { useState, useEffect } from 'react';
import { PixelHeart, PixelCheck, PixelClock, PixelSparkle, PixelAlert } from '@/lib/pixel-icons';
import {
  PixelSleep,
  PixelDumbbell,
  PixelHabits,
  PixelGoals,
  PixelFocus,
  PixelVitals,
} from '@/lib/pixel-icons-extra';

// ─── Pixel Icons ──────────────────────────────────────────────────────────────

function PixelLungs({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-cyan-500">
      <rect x="1" y="2" width="2" height="4" fill="currentColor" opacity="0.3" />
      <rect x="2" y="3" width="1" height="2" fill="currentColor" />
      <rect x="3" y="1" width="1" height="6" fill="currentColor" opacity="0.5" />
      <rect x="4" y="1" width="1" height="6" fill="currentColor" opacity="0.5" />
      <rect x="5" y="2" width="2" height="4" fill="currentColor" opacity="0.3" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelBrain({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-pink-400">
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.2" />
      <rect x="2" y="1" width="4" height="2" fill="currentColor" opacity="0.3" />
      <rect x="3" y="2" width="2" height="4" fill="currentColor" opacity="0.4" />
      <rect x="2" y="3" width="1" height="1" fill="currentColor" />
      <rect x="5" y="3" width="1" height="1" fill="currentColor" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="3" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="6" y="3" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelBone({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-amber-400">
      <rect x="0" y="3" width="8" height="2" fill="currentColor" />
      <rect x="1" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="6" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="6" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelDrop({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-blue-400">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.3" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="7" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="7" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─── Pixel Radar Chart ────────────────────────────────────────────────────────

function PixelRadarChart({ scores }: { scores: { label: string; value: number; color: string }[] }) {
  const cx = 80;
  const cy = 80;
  const maxR = 65;
  const n = scores.length;
  const angleStep = (2 * Math.PI) / n;

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  const getPoint = (i: number, r: number) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * maxR * r,
      y: cy + Math.sin(angle) * maxR * r,
    };
  };

  // Data polygon points
  const dataPoints = scores.map((s, i) => {
    const p = getPoint(i, s.value / 100);
    return `${p.x},${p.y}`;
  });

  // Grid polygon points for each ring
  const gridPolygons = rings.map(r => {
    return scores.map((_, i) => {
      const p = getPoint(i, r);
      return `${p.x},${p.y}`;
    }).join(' ');
  });

  // Axis lines
  const axes = scores.map((_, i) => {
    const p = getPoint(i, 1);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  // Data point positions
  const dataPos = scores.map((s, i) => getPoint(i, s.value / 100));

  return (
    <svg width={180} height={180} viewBox="0 0 160 160" shapeRendering="crispEdges">
      {/* Grid rings */}
      {gridPolygons.map((pts, ri) => (
        <polygon key={ri} points={pts} fill="none" stroke="#e5e7eb" strokeWidth={1} opacity={0.6} />
      ))}

      {/* Axis lines */}
      {axes.map((a, i) => (
        <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#f3f4f6" strokeWidth={1} />
      ))}

      {/* Data fill */}
      <polygon
        points={dataPoints.join(' ')}
        fill="currentColor"
        opacity={0.1}
      />

      {/* Data stroke */}
      <polygon
        points={dataPoints.join(' ')}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="4 2"
      />

      {/* Data points */}
      {dataPos.map((p, i) => (
        <rect
          key={i}
          x={p.x - 4}
          y={p.y - 4}
          width={8}
          height={8}
          fill={scores[i].color}
          shapeRendering="crispEdges"
        />
      ))}

      {/* Labels */}
      {scores.map((s, i) => {
        const p = getPoint(i, 1.18);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={7}
            fill={s.value >= 70 ? '#374151' : '#9ca3af'}
            fontFamily="monospace"
          >
            {s.label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Pixel Score Gauge ────────────────────────────────────────────────────────

function PixelScoreGauge({ score, label }: { score: number; label: string }) {
  const segments = 20;
  const filled = Math.round((score / 100) * segments);
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex flex-col-reverse gap-px" style={{ height: 60 }}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="w-4 rounded-sm transition-colors"
            style={{
              backgroundColor: i < filled ? color : '#f3f4f6',
              opacity: i < filled ? 0.5 + (i / segments) * 0.5 : 1,
            }}
          />
        ))}
      </div>
      <span className="text-lg font-bold font-mono" style={{ color }}>
        {score}
      </span>
      <span className="text-[8px] text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

// ─── Pixel Spark Trend ────────────────────────────────────────────────────────

function PixelSparkTrend({ data, color = 'currentColor' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 24;
  const width = data.length;

  return (
    <svg width={width * 6} height={height} viewBox={`0 0 ${width * 6} ${height}`} shapeRendering="crispEdges">
      {data.map((v, i) => {
        const barH = Math.max(2, Math.round(((v - min) / range) * height));
        const y = height - barH;
        return (
          <rect
            key={i}
            x={i * 6}
            y={y}
            width={4}
            height={barH}
            fill={color}
            opacity={0.4 + (i / data.length) * 0.6}
            shapeRendering="crispEdges"
          />
        );
      })}
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'alert';
  trend: number[];
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface DailyLog {
  date: string;
  score: number;
  sleep: number;
  workout: boolean;
  habits: number;
  energy: number;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const healthMetrics: HealthMetric[] = [
  {
    id: 'HR',
    name: 'Resting HR',
    value: 62,
    unit: 'bpm',
    status: 'good',
    trend: [68, 65, 64, 63, 61, 62],
    color: '#ef4444',
    description: 'Last 7 days avg',
    icon: <PixelHeart size={14} className="text-red-500" />,
  },
  {
    id: 'BP',
    name: 'Blood Pressure',
    value: 118,
    unit: '/76',
    status: 'good',
    trend: [122, 120, 119, 118, 117, 118],
    color: '#f97316',
    description: 'Systolic / Diastolic',
    icon: <PixelHeart size={14} className="text-orange-500" />,
  },
  {
    id: 'SPO2',
    name: 'SpO2',
    value: 98,
    unit: '%',
    status: 'good',
    trend: [97, 98, 97, 98, 98, 98],
    color: '#06b6d4',
    description: 'Blood oxygen',
    icon: <PixelLungs size={14} />,
  },
  {
    id: 'HRV',
    name: 'HRV',
    value: 45,
    unit: 'ms',
    status: 'good',
    trend: [38, 41, 40, 44, 43, 45],
    color: '#a855f7',
    description: 'Heart rate variability',
    icon: <PixelBrain size={14} />,
  },
  {
    id: 'VO2',
    name: 'Est. VO2 Max',
    value: 42,
    unit: 'ml/kg',
    status: 'good',
    trend: [40, 40, 41, 41, 42, 42],
    color: '#3b82f6',
    description: 'Cardiovascular fitness',
    icon: <PixelDumbbell size={14} className="text-blue-500" />,
  },
  {
    id: 'STEPS',
    name: 'Steps',
    value: 7842,
    unit: '/day',
    status: 'warning',
    trend: [6200, 8100, 5400, 9200, 7800, 7842],
    color: '#22c55e',
    description: 'Today vs 10k goal',
    icon: <PixelBone size={14} />,
  },
  {
    id: 'SLEEP',
    name: 'Sleep Score',
    value: 84,
    unit: '%',
    status: 'good',
    trend: [78, 82, 85, 81, 83, 84],
    color: '#6366f1',
    description: 'Last 7 days avg',
    icon: <PixelSleep size={14} className="text-indigo-500" />,
  },
  {
    id: 'HYDRATION',
    name: 'Hydration',
    value: 1.8,
    unit: 'L',
    status: 'warning',
    trend: [1.5, 2.0, 1.2, 1.9, 2.1, 1.8],
    color: '#0ea5e9',
    description: 'Today vs 2.5L goal',
    icon: <PixelDrop size={14} />,
  },
];

const radarScores = [
  { label: 'Cardio', value: 82, color: '#ef4444' },
  { label: 'Sleep', value: 84, color: '#6366f1' },
  { label: 'Nutrition', value: 68, color: '#22c55e' },
  { label: 'Fitness', value: 76, color: '#3b82f6' },
  { label: 'Mental', value: 79, color: '#a855f7' },
  { label: 'Habits', value: 88, color: '#f59e0b' },
];

const dailyLogs: DailyLog[] = [
  { date: 'Mon', score: 72, sleep: 6.2, workout: true, habits: 3, energy: 3 },
  { date: 'Tue', score: 78, sleep: 7.0, workout: true, habits: 4, energy: 4 },
  { date: 'Wed', score: 65, sleep: 5.5, workout: false, habits: 2, energy: 2 },
  { date: 'Thu', score: 81, sleep: 7.5, workout: true, habits: 5, energy: 4 },
  { date: 'Fri', score: 85, sleep: 7.8, workout: true, habits: 5, energy: 5 },
  { date: 'Sat', score: 90, sleep: 8.2, workout: true, habits: 5, energy: 5 },
  { date: 'Sun', score: 87, sleep: 7.9, workout: false, habits: 4, energy: 4 },
];

const weeklyScoreAvg = Math.round(dailyLogs.reduce((s, d) => s + d.score, 0) / dailyLogs.length);
const overallHealthScore = Math.round(
  (weeklyScoreAvg * 0.4) +
  (healthMetrics.find(m => m.id === 'SLEEP')!.value * 0.25) +
  (healthMetrics.find(m => m.id === 'HR')!.value > 65 ? 50 : 85) * 0.15 +
  (healthMetrics.find(m => m.id === 'VO2')!.value / 50 * 100) * 0.2
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HealthPage() {
  const [time, setTime] = useState('');
  const [tick, setTick] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Singapore',
      }));
    };
    update();
    const id = setInterval(update, 1000);
    const tickId = setInterval(() => setTick(t => t + 1), 2000);
    return () => { clearInterval(id); clearInterval(tickId); };
  }, []);

  const metricStatusColor: Record<string, string> = {
    good: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    alert: 'text-red-600 bg-red-50 border-red-200',
  };

  const sparkColors: Record<string, string> = {
    HR: '#ef4444',
    BP: '#f97316',
    SPO2: '#06b6d4',
    HRV: '#a855f7',
    VO2: '#3b82f6',
    STEPS: '#22c55e',
    SLEEP: '#6366f1',
    HYDRATION: '#0ea5e9',
  };

  return (
    <div className="max-w-6xl space-y-5">
      {/* ── Title Bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1.5">
            <PixelHeart size={12} />
            <span>HEALTH METRICS</span>
          </div>
          <div className="text-xs font-mono text-gray-400">
            <span className="text-gray-500">Screen 40</span>
            <span className="mx-2 text-gray-300">·</span>
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded">
            <PixelClock size={12} />
            <span>{time}</span>
            <span className="text-[8px] text-gray-300">SGT</span>
          </div>
        </div>
      </div>

      {/* ── Top Row: Health Score + Radar + Energy ───────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Health Score Card */}
        <div className="bg-white border-2 border-green-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelSparkle size={12} className="text-yellow-500" />
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Health Score</h2>
            </div>
          </div>
          <div className="px-5 py-4 flex flex-col items-center">
            {/* Big score */}
            <div className="relative">
              <div
                className="text-6xl font-bold font-mono transition-all duration-1000"
                style={{
                  color: overallHealthScore >= 80 ? '#22c55e' : overallHealthScore >= 65 ? '#eab308' : '#ef4444',
                  textShadow: `0 0 20px ${overallHealthScore >= 80 ? 'rgba(34,197,94,0.3)' : overallHealthScore >= 65 ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)'}`,
                }}
              >
                {overallHealthScore}
              </div>
              <div className="text-[10px] text-gray-400 text-center mt-1">out of 100</div>
              {/* Animated ring */}
              <svg width={120} height={120} className="absolute -top-2 -right-2 -z-10" viewBox="0 0 120 120" shapeRendering="crispEdges">
                {Array.from({ length: 36 }).map((_, i) => {
                  const angle = (i / 36) * Math.PI * 2 - Math.PI / 2;
                  const filled = i < Math.round((overallHealthScore / 100) * 36);
                  const x1 = 60 + Math.cos(angle) * 50;
                  const y1 = 60 + Math.sin(angle) * 50;
                  const x2 = 60 + Math.cos(angle) * 58;
                  const y2 = 60 + Math.sin(angle) * 58;
                  return (
                    <line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={filled ? (overallHealthScore >= 80 ? '#22c55e' : overallHealthScore >= 65 ? '#eab308' : '#ef4444') : '#f3f4f6'}
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {overallHealthScore >= 80 ? (
                <>
                  <span className="text-green-500">●●</span>
                  <span className="text-[10px] text-green-600 font-medium">Excellent</span>
                </>
              ) : overallHealthScore >= 65 ? (
                <>
                  <span className="text-yellow-500">●●</span>
                  <span className="text-[10px] text-yellow-600 font-medium">Good</span>
                </>
              ) : (
                <>
                  <span className="text-red-500">●●</span>
                  <span className="text-[10px] text-red-600 font-medium">Needs Attention</span>
                </>
              )}
            </div>
            {/* Mini trend bars */}
            <div className="mt-4 w-full">
              <p className="text-[9px] text-gray-400 mb-2">Weekly scores</p>
              <div className="flex items-end gap-1 justify-center">
                {dailyLogs.map((d, i) => (
                  <div key={d.date} className="flex flex-col items-center gap-1">
                    <div
                      className="w-5 rounded-sm transition-all"
                      style={{
                        height: Math.round(d.score / 3),
                        backgroundColor: d.score >= 80 ? '#22c55e' : d.score >= 65 ? '#eab308' : '#ef4444',
                        opacity: 0.3 + (i / dailyLogs.length) * 0.7,
                      }}
                    />
                    <span className="text-[7px] text-gray-400">{d.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-5 py-2 bg-green-50/50 border-t border-green-100 flex items-center justify-between">
            <span className="text-[9px] text-green-600">7-day avg: {weeklyScoreAvg}</span>
            <span className="text-[9px] text-green-500">+8 vs last week</span>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelGoals size={12} className="text-purple-500" />
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Health Radar</h2>
            </div>
          </div>
          <div className="px-5 py-4 flex justify-center">
            <PixelRadarChart scores={radarScores} />
          </div>
          <div className="px-5 py-2 bg-gray-50/50 border-t border-gray-100 grid grid-cols-3 gap-2">
            {radarScores.map(s => (
              <div key={s.label} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: s.color }} />
                <span className="text-[8px] text-gray-500">{s.label}</span>
                <span className="text-[8px] font-mono font-bold ml-auto" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Energy & Habits */}
        <div className="space-y-4">
          {/* Energy Level */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <div className="flex items-center gap-2">
                <PixelSparkle size={12} className="text-yellow-400" />
                <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Energy Level</h2>
                <span className="ml-auto text-[9px] text-gray-400">Today</span>
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button key={level} className="w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: level <= 4 ? '#f59e0b' : 'transparent',
                        borderColor: level <= 4 ? '#f59e0b' : '#e5e7eb',
                      }}>
                      {level <= 4 && <span className="text-[8px] text-white font-bold">{level}</span>}
                    </button>
                  ))}
                </div>
                <span className="text-sm font-bold text-amber-500">4/5</span>
              </div>
              <p className="text-[9px] text-gray-400">Peak energy at 10:30 AM · Afternoon dip expected</p>
              {/* Energy curve */}
              <div className="mt-3 flex items-center gap-1">
                {['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map((t, i) => (
                  <div key={t} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm"
                      style={{
                        height: [20, 65, 45, 30, 55, 35][i],
                        backgroundColor: [20, 65, 45, 30, 55, 35][i] > 50 ? '#f59e0b' : '#e5e7eb',
                        opacity: [20, 65, 45, 30, 55, 35][i] > 50 ? 0.6 : 0.3,
                      }}
                    />
                    <span className="text-[7px] text-gray-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Habits Today */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <div className="flex items-center gap-2">
                <PixelHabits size={12} className="text-green-500" />
                <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Today&apos;s Habits</h2>
                <span className="ml-auto text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">4/5</span>
              </div>
            </div>
            <div className="px-4 py-3 space-y-2">
              {[
                { name: 'Morning standup', done: true, emoji: '📋' },
                { name: 'Read 30 min', done: true, emoji: '📚' },
                { name: 'Exercise', done: true, emoji: '💪' },
                { name: 'Memory write', done: false, emoji: '🧠' },
                { name: 'No screens after 10PM', done: true, emoji: '📵' },
              ].map((habit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    habit.done ? 'bg-green-500 border-green-500' : 'border-gray-200'
                  }`}>
                    {habit.done && <PixelCheck size={6} className="text-white" />}
                  </div>
                  <span className="text-sm">{habit.emoji}</span>
                  <span className={`text-[10px] ${habit.done ? 'text-gray-700' : 'text-gray-400'}`}>{habit.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Metrics Grid ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PixelVitals size={14} className="text-red-500" />
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Vital Signs</h2>
            </div>
            <div className="flex items-center gap-3 text-[9px] text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Normal
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400" /> Attention
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Alert
              </span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {healthMetrics.map(metric => (
            <div
              key={metric.id}
              className={`px-5 py-3 flex items-center gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer ${selectedMetric === metric.id ? 'bg-gray-50/50' : ''}`}
              onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
            >
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                {metric.icon}
              </div>

              {/* Name + description */}
              <div className="w-28 shrink-0">
                <p className="text-[11px] font-semibold text-gray-800">{metric.name}</p>
                <p className="text-[9px] text-gray-400">{metric.description}</p>
              </div>

              {/* Value */}
              <div className="w-20 shrink-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold font-mono text-gray-900">{metric.value}</span>
                  <span className="text-[10px] text-gray-400">{metric.unit}</span>
                </div>
              </div>

              {/* Spark trend */}
              <div className="flex-1 flex items-center gap-2">
                <PixelSparkTrend data={metric.trend} color={sparkColors[metric.id]} />
                <div className="flex flex-col gap-0.5">
                  {metric.trend.slice(-3).map((v, i) => (
                    <span key={i} className="text-[8px] font-mono text-gray-400">{v}</span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className={`px-2 py-1 rounded border text-[9px] font-medium uppercase tracking-wider shrink-0 ${metricStatusColor[metric.status]}`}>
                {metric.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Row: Workout + Sleep Summary ───────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        {/* This Week's Workouts */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelDumbbell size={14} className="text-blue-500" />
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">This Week</h2>
              <span className="ml-auto text-[9px] text-gray-400">Workouts</span>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dailyLogs.map((d, i) => (
                <div key={d.date} className="flex flex-col items-center gap-1.5">
                  <span className="text-[9px] text-gray-400">{d.date}</span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-colors ${
                      d.workout
                        ? 'bg-blue-500 border-blue-500'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    {d.workout ? (
                      <PixelDumbbell size={12} className="text-white" />
                    ) : (
                      <span className="text-[9px] text-gray-300">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <span>5/7 workouts completed</span>
              <span className="font-medium text-blue-600">71% adherence</span>
            </div>
          </div>
        </div>

        {/* Sleep Summary */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center gap-2">
              <PixelSleep size={14} className="text-indigo-500" />
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sleep This Week</h2>
              <span className="ml-auto text-[9px] text-gray-400">7.0h avg</span>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="flex items-end gap-2 mb-4" style={{ height: 60 }}>
              {dailyLogs.map((d, i) => {
                const barH = Math.round((d.sleep / 9) * 60);
                const qualityColor = d.sleep >= 7.5 ? '#22c55e' : d.sleep >= 6 ? '#eab308' : '#ef4444';
                return (
                  <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm transition-all"
                      style={{
                        height: barH,
                        backgroundColor: qualityColor,
                        opacity: 0.3 + (i / dailyLogs.length) * 0.7,
                      }}
                    />
                    <span className="text-[8px] text-gray-400">{d.sleep}h</span>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[10px] font-mono font-bold text-indigo-600">7.9h</p>
                <p className="text-[8px] text-gray-400">Best night</p>
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold text-gray-600">5.5h</p>
                <p className="text-[8px] text-gray-400">Lowest</p>
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold text-green-600">88%</p>
                <p className="text-[8px] text-gray-400">Sleep quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pixel footer decoration ───────────────────────────────────── */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{ opacity: Math.sin(i * 0.5 + tick * 0.3) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Health Metrics · Screen 40 · Des_bot · {new Date().getFullYear()}
      </p>
    </div>
  );
}