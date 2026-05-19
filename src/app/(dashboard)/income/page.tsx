'use client';

import React, { useState } from 'react';
import { PixelCheck, PixelAlert, PixelClock, PixelSparkle, PixelHeart } from '@/lib/pixel-icons';

// ─── Types ────────────────────────────────────────────────────────────────────

interface IncomeStream {
  id: string;
  name: string;
  source: string;
  category: 'dividend' | 'rental' | 'interest' | 'freelance' | 'passive' | 'royalties';
  amount_sgd: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  status: 'active' | 'paused' | 'pending';
  startDate: string;
  notes: string;
  color: string;
}

interface MonthlySnapshot {
  month: string;
  total_sgd: number;
}

// ─── Pixel Charts ─────────────────────────────────────────────────────────────

function PixelSparkleBar({ value, max, height = 80, color = 'bg-blue-500' }: {
  value: number; max: number; height?: number; color?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const filled = Math.round((pct / 100) * height);
  return (
    <div className="flex flex-col-reverse gap-px">
      {Array.from({ length: height }, (_, r) => (
        <div
          key={r}
          className={`w-3.5 rounded-sm transition-colors ${r < filled ? color : 'bg-gray-100'}`}
        />
      ))}
    </div>
  );
}

function PixelDonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const radius = 6;
  const pixels: { x: number; y: number; color: string }[] = [];

  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      const dist = Math.sqrt(x * x + y * y);
      if (dist <= radius && dist >= radius - 2.5) {
        let angle = Math.atan2(y, x);
        if (angle < 0) angle += 2 * Math.PI;
        let cumVal = 0;
        for (const seg of segments) {
          const segAngle = (seg.value / total) * 2 * Math.PI;
          if (angle < cumVal + segAngle) {
            pixels.push({ x: x + radius, y: y + radius, color: seg.color });
            break;
          }
          cumVal += segAngle;
        }
      }
    }
  }

  const size = radius * 2 + 1;
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill('transparent'));
  for (const p of pixels) {
    if (p.y >= 0 && p.y < size && p.x >= 0 && p.x < size) {
      grid[p.y][p.x] = p.color;
    }
  }

  return (
    <svg width={size * 8} height={size * 8} viewBox={`0 0 ${size * 8} ${size * 8}`} shapeRendering="crispEdges" className="pixel-donut">
      {grid.map((row, r) =>
        row.map((cell, c) =>
          cell !== 'transparent' ? (
            <rect key={`${r}-${c}`} x={c * 8} y={r * 8} width={8} height={8} fill={cell} />
          ) : null
        )
      )}
    </svg>
  );
}

function PixelTrendArrow({ value }: { value: number }) {
  if (value > 0) {
    return (
      <svg width="12" height="12" viewBox="0 0 8 8" shapeRendering="crispEdges" className="inline-block">
        <rect x="3" y="0" width="2" height="1" fill="#22c55e" />
        <rect x="2" y="1" width="2" height="1" fill="#22c55e" />
        <rect x="1" y="2" width="2" height="1" fill="#22c55e" />
        <rect x="2" y="3" width="4" height="1" fill="#22c55e" />
        <rect x="3" y="4" width="2" height="4" fill="#22c55e" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 8 8" shapeRendering="crispEdges" className="inline-block">
      <rect x="3" y="7" width="2" height="1" fill="#ef4444" />
      <rect x="4" y="6" width="2" height="1" fill="#ef4444" />
      <rect x="5" y="5" width="2" height="1" fill="#ef4444" />
      <rect x="2" y="4" width="4" height="1" fill="#ef4444" />
      <rect x="3" y="0" width="2" height="4" fill="#ef4444" />
    </svg>
  );
}

// ─── Pixel Income Icon ────────────────────────────────────────────────────────

function PixelIncome({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Coin stack */}
      <rect x="1" y="8" width="6" height="2" fill="currentColor" opacity="0.3" />
      <rect x="2" y="7" width="6" height="2" fill="currentColor" opacity="0.4" />
      <rect x="3" y="5" width="6" height="2" fill="currentColor" opacity="0.6" />
      <rect x="4" y="4" width="4" height="2" fill="currentColor" />
      {/* Arrow up */}
      <rect x="11" y="8" width="2" height="1" fill="currentColor" />
      <rect x="12" y="6" width="2" height="2" fill="currentColor" />
      <rect x="13" y="4" width="2" height="2" fill="currentColor" />
      <rect x="11" y="4" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="13" y="2" width="2" height="2" fill="currentColor" />
      <rect x="14" y="0" width="2" height="2" fill="currentColor" />
      <rect x="12" y="2" width="2" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Category Config ──────────────────────────────────────────────────────────

const categoryConfig: Record<string, { label: string; color: string }> = {
  dividend:  { label: 'Dividends',  color: 'bg-green-500' },
  rental:    { label: 'Rental',     color: 'bg-blue-500' },
  interest:  { label: 'Interest',  color: 'bg-yellow-400' },
  freelance: { label: 'Freelance', color: 'bg-purple-500' },
  passive:   { label: 'Passive',   color: 'bg-pink-500' },
  royalties: { label: 'Royalties', color: 'bg-orange-500' },
};

const frequencyLabels: Record<string, string> = {
  monthly: '/mo',
  quarterly: '/qtr',
  yearly: '/yr',
  'one-time': 'once',
};

// ─── Seed Data ────────────────────────────────────────────────────────────────

const incomeStreams: IncomeStream[] = [
  {
    id: 'IS-001',
    name: 'Endowus Cashback',
    source: 'Endowus',
    category: 'passive',
    amount_sgd: 80,
    frequency: 'monthly',
    status: 'active',
    startDate: '2026-01-01',
    notes: 'Auto-invested into SRS fund',
    color: '#ec4899',
  },
  {
    id: 'IS-002',
    name: 'Syfe REIT+ Dividends',
    source: 'Syfe',
    category: 'dividend',
    amount_sgd: 145,
    frequency: 'monthly',
    status: 'active',
    startDate: '2025-11-01',
    notes: 'Reinvested quarterly',
    color: '#22c55e',
  },
  {
    id: 'IS-003',
    name: 'Freelance Dev Work',
    source: 'Upwork',
    category: 'freelance',
    amount_sgd: 600,
    frequency: 'monthly',
    status: 'active',
    startDate: '2026-03-01',
    notes: 'Variable — avg of last 3 months',
    color: '#a855f7',
  },
  {
    id: 'IS-004',
    name: 'TBill Distributions',
    source: 'DBSG',
    category: 'interest',
    amount_sgd: 420,
    frequency: 'quarterly',
    status: 'active',
    startDate: '2026-02-01',
    notes: '4-week T-bills, rolled over',
    color: '#eab308',
  },
  {
    id: 'IS-005',
    name: 'Blog Ad Revenue',
    source: 'Google AdSense',
    category: 'royalties',
    amount_sgd: 25,
    frequency: 'monthly',
    status: 'paused',
    startDate: '2025-08-01',
    notes: 'Paused — low traffic',
    color: '#f97316',
  },
  {
    id: 'IS-006',
    name: 'Code Commissions',
    source: 'GitHub Sponsors',
    category: 'royalties',
    amount_sgd: 50,
    frequency: 'monthly',
    status: 'active',
    startDate: '2026-04-01',
    notes: 'Open source contributions',
    color: '#f97316',
  },
];

const monthlySnapshots: MonthlySnapshot[] = [
  { month: 'Nov', total_sgd: 560 },
  { month: 'Dec', total_sgd: 820 },
  { month: 'Jan', total_sgd: 900 },
  { month: 'Feb', total_sgd: 1340 },
  { month: 'Mar', total_sgd: 1220 },
  { month: 'Apr', total_sgd: 1480 },
  { month: 'May', total_sgd: 1320 },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function toMonthlyAmount(stream: IncomeStream): number {
  if (stream.status !== 'active') return 0;
  switch (stream.frequency) {
    case 'monthly': return stream.amount_sgd;
    case 'quarterly': return stream.amount_sgd / 3;
    case 'yearly': return stream.amount_sgd / 12;
    case 'one-time': return stream.amount_sgd;
    default: return 0;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function IncomePage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? incomeStreams
    : incomeStreams.filter(s => s.category === filter);

  const totalMonthly = incomeStreams
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + toMonthlyAmount(s), 0);

  const annualProjection = totalMonthly * 12;

  const categoryBreakdown = Object.entries(categoryConfig)
    .map(([cat, cfg]) => ({
      label: cfg.label,
      value: incomeStreams
        .filter(s => s.category === cat && s.status === 'active')
        .reduce((sum, s) => sum + toMonthlyAmount(s), 0),
      color: cfg.color.replace('bg-', '#'),
    }))
    .filter(c => c.value > 0)
    .sort((a, b) => b.value - a.value);

  const peakMonthly = Math.max(...monthlySnapshots.map(m => m.total_sgd));

  const activeCount = incomeStreams.filter(s => s.status === 'active').length;
  const pausedCount = incomeStreams.filter(s => s.status === 'paused').length;

  const passiveMonthly = incomeStreams
    .filter(s => s.status === 'active' && ['passive', 'dividend', 'interest', 'royalties'].includes(s.category))
    .reduce((sum, s) => sum + toMonthlyAmount(s), 0);

  const passiveRatio = totalMonthly > 0 ? Math.round((passiveMonthly / totalMonthly) * 100) : 0;

  return (
    <div className="max-w-6xl space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Passive Income</h1>
          <p className="text-xs text-gray-500 mt-0.5">Track your money-making machines</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded">
            <PixelClock size={12} />
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' })}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Monthly Total */}
        <div className="bg-white border-2 border-green-200 rounded-lg p-4">
          <p className="text-[10px] text-green-600 uppercase tracking-widest font-semibold">Monthly Income</p>
          <p className="text-2xl font-bold text-green-700 mt-1 font-mono">
            SGD {totalMonthly.toLocaleString()}
          </p>
          <p className="text-[10px] text-green-500 mt-0.5 flex items-center gap-1">
            <PixelTrendArrow value={1} /> +12% vs last month
          </p>
        </div>

        {/* Annual Projection */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Annual Projection</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 font-mono">
            SGD {(annualProjection / 1000).toFixed(1)}k
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">before taxes</p>
        </div>

        {/* Passive Ratio */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Passive Ratio</p>
          <p className="text-2xl font-bold text-blue-600 mt-1 font-mono">{passiveRatio}%</p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {incomeStreams.filter(s => s.status === 'active' && ['passive', 'dividend', 'interest', 'royalties'].includes(s.category)).length} truly passive streams
          </p>
        </div>

        {/* Streams Count */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Income Streams</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 font-mono">
            {activeCount} <span className="text-base text-gray-400">/ {incomeStreams.length}</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">{pausedCount} paused</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Income Streams Table */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Income Streams</h2>
              <div className="flex gap-1">
                {['all', 'passive', 'dividend', 'freelance'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-[9px] px-2 py-0.5 rounded transition-colors ${filter === f ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map(stream => (
              <div key={stream.id} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/50">
                <span className={`w-2 h-2 rounded-full shrink-0 ${stream.status === 'active' ? 'bg-green-500' : 'bg-yellow-400'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-gray-900">{stream.name}</p>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded border font-medium ${categoryConfig[stream.category]?.color || 'bg-gray-100'} text-white border-transparent`}>
                      {categoryConfig[stream.category]?.label}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-400 mt-0.5">{stream.source} · {stream.notes}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold font-mono text-gray-900">
                    SGD {stream.amount_sgd.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-gray-400">{frequencyLabels[stream.frequency]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">By Category</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div className="flex justify-center">
              <PixelDonutChart segments={categoryBreakdown.map(c => ({
                label: c.label,
                value: c.value,
                color: c.color,
              }))} />
            </div>
            <div className="space-y-2">
              {categoryBreakdown.map(cat => (
                <div key={cat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }} />
                    <span className="text-[11px] text-gray-600">{cat.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-medium text-gray-800">SGD {cat.value.toLocaleString()}</span>
                    <span className="text-[9px] text-gray-400">/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Income Trend</h2>
            <span className="text-[9px] text-gray-400">Nov 2025 → May 2026</span>
          </div>
        </div>
        <div className="px-8 py-5 flex items-end gap-3">
          {monthlySnapshots.map(snap => (
            <div key={snap.month} className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-mono text-gray-500">
                ${snap.total_sgd >= 1000 ? (snap.total_sgd / 1000).toFixed(1) + 'k' : snap.total_sgd}
              </span>
              <PixelSparkleBar value={snap.total_sgd} max={peakMonthly} height={80} color="bg-blue-500" />
              <span className="text-[9px] text-gray-400">{snap.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Note */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-start gap-2">
        <PixelSparkle size={12} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[10px] text-blue-600 leading-relaxed">
          Passive income tracked separately from salary. Goal: SGD 2,000/month in truly passive income (dividends + interest + royalties) by end of 2026.
          Currently tracking toward SGD {(passiveMonthly * 12 / 1000).toFixed(1)}k/yr.
        </p>
      </div>
    </div>
  );
}