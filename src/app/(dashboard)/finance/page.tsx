'use client';

import React, { useState, useEffect } from 'react';
import { PixelSparkle, PixelHeart, PixelCheck, PixelAlert, PixelClock } from '@/lib/pixel-icons';
import { PixelProgress } from '@/components/PixelProgress';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

interface IncomeStream {
  name: string;
  source: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  status: 'active' | 'paused';
  color: string;
}

interface MonthlyFlow {
  month: string;
  income: number;
  expenses: number;
}

interface FinancialGoal {
  name: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
}

// ─── Pixel Icons ───────────────────────────────────────────────────────────────

function PixelWallet({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-emerald-600">
      <rect x="0" y="2" width="8" height="5" fill="currentColor" opacity="0.2" />
      <rect x="0" y="2" width="7" height="4" fill="currentColor" />
      <rect x="5" y="3" width="2" height="2" fill="white" opacity="0.6" />
      <rect x="0" y="1" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelChart({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-blue-500">
      <rect x="0" y="5" width="2" height="3" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="2" height="5" fill="currentColor" opacity="0.6" />
      <rect x="6" y="1" width="2" height="7" fill="currentColor" />
    </svg>
  );
}

function PixelTarget({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-red-500">
      <rect x="2" y="2" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      <rect x="0" y="0" width="1" height="8" fill="currentColor" opacity="0.3" />
      <rect x="7" y="0" width="1" height="8" fill="currentColor" opacity="0.3" />
      <rect x="0" y="0" width="8" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="7" width="8" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelPiggy({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-pink-500">
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.4" />
      <rect x="2" y="1" width="4" height="2" fill="currentColor" />
      <rect x="0" y="3" width="2" height="2" fill="currentColor" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="5" width="2" height="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Sparkle Line Chart ───────────────────────────────────────────────────────

function SparkleChart({ data, height = 80 }: { data: { label: string; value: number; value2?: number }[]; height?: number }) {
  const max = Math.max(...data.map(d => Math.max(d.value, d.value2 ?? 0)));
  const allValues = data.flatMap(d => [d.value, d.value2 ?? 0]);
  const peak = max || 1;

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (d.value / peak) * 100,
    y2: d.value2 !== undefined ? 100 - (d.value2 / peak) * 100 : undefined,
    label: d.label,
    value: d.value,
    value2: d.value2,
  }));

  return (
    <div className="relative" style={{ height }}>
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] text-gray-300 font-mono -translate-x-1">
        <span>{max.toLocaleString()}</span>
        <span>{Math.round(max / 2).toLocaleString()}</span>
        <span>0</span>
      </div>

      {/* Chart area */}
      <div className="ml-8 h-full relative">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="border-b border-dashed border-gray-100 w-full" />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 flex items-end gap-1">
          {data.map((d, i) => {
            const h1 = Math.round((d.value / peak) * height);
            const h2 = d.value2 !== undefined ? Math.round((d.value2 / peak) * height) : 0;
            return (
              <div key={i} className="flex-1 flex items-end gap-px">
                <div
                  className="flex-1 bg-blue-400 rounded-t-sm transition-colors"
                  style={{ height: h1 }}
                />
                {d.value2 !== undefined && (
                  <div
                    className="flex-1 bg-emerald-400 rounded-t-sm transition-colors"
                    style={{ height: h2 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* X labels */}
        <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[7px] text-gray-400 font-mono">
          {data.map((d, i) => (
            <span key={i} className={i === 0 || i === data.length - 1 ? '' : 'invisible'}>{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Savings Rate Gauge ────────────────────────────────────────────────────────

function SavingsGauge({ rate }: { rate: number }) {
  const segments = 20;
  const filled = Math.round((rate / 100) * segments);
  const color = rate >= 50 ? '#22c55e' : rate >= 20 ? '#eab308' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-end gap-0.5">
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className="w-3 rounded-t-sm transition-colors"
            style={{
              height: 8 + (i / segments) * 16,
              backgroundColor: i < filled ? color : '#f1f5f9',
            }}
          />
        ))}
      </div>
      <span className="text-lg font-bold" style={{ color }}>{rate}%</span>
      <span className="text-[10px] text-gray-400">Savings Rate</span>
    </div>
  );
}

// ─── Fire Metric ──────────────────────────────────────────────────────────────

function FIREBadge({ years, months }: { years: number; months: number }) {
  const progress = Math.max(0, Math.min(100, 100 - ((years * 12 + months) / 120) * 100));
  const color = years < 5 ? '#22c55e' : years < 10 ? '#eab308' : '#ef4444';

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 text-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 8 8" shapeRendering="crispEdges">
            <rect x="3" y="0" width="2" height="2" fill="#f97316" />
            <rect x="2" y="2" width="4" height="3" fill="#f97316" opacity="0.8" />
            <rect x="1" y="4" width="6" height="3" fill="#f97316" />
            <rect x="2" y="5" width="1" height="1" fill="#fbbf24" opacity="0.8" />
            <rect x="5" y="5" width="1" height="1" fill="#fbbf24" opacity="0.8" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">FI Progress</p>
          <p className="text-sm font-bold">{years < 1 ? `< 1 yr` : `${years}y ${months}m`} to FIRE</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <PixelProgress value={progress} max={100} variant={years < 5 ? 'green' : years < 10 ? 'yellow' : 'red'} />
        <span className="text-[10px] text-gray-400">{Math.round(progress)}%</span>
      </div>
      <p className="text-[9px] text-gray-500 mt-2">Based on 4% safe withdrawal rate</p>
    </div>
  );
}

// ─── Asset Allocation ─────────────────────────────────────────────────────────

function AssetAllocation({ assets }: { assets: { label: string; value: number; color: string }[] }) {
  const total = assets.reduce((s, a) => s + a.value, 0);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {assets.map((a) => (
          <div key={a.label} className="flex items-center gap-1.5 bg-gray-50 rounded px-2 py-1">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: a.color }} />
            <span className="text-[9px] text-gray-600">{a.label}</span>
            <span className="text-[9px] font-mono text-gray-400">{Math.round((a.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
      <div className="h-2 rounded-full overflow-hidden flex">
        {assets.map((a) => (
          <div
            key={a.label}
            className="h-full"
            style={{ width: `${(a.value / total) * 100}%`, backgroundColor: a.color }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {assets.map((a) => (
          <div key={a.label} className="flex justify-between items-center bg-gray-50 rounded px-2 py-1">
            <span className="text-[9px] text-gray-500">{a.label}</span>
            <span className="text-[10px] font-mono text-gray-700">${a.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const incomeStreams: IncomeStream[] = [
  { name: 'Salary', source: 'Full-time', amount: 8500, frequency: 'monthly', status: 'active', color: '#3b82f6' },
  { name: 'Dividends', source: 'SGD ETF', amount: 420, frequency: 'monthly', status: 'active', color: '#22c55e' },
  { name: 'Rental', source: 'Property A', amount: 2400, frequency: 'monthly', status: 'active', color: '#8b5cf6' },
  { name: 'Interest', source: 'T-Bills/Savings', amount: 180, frequency: 'monthly', status: 'active', color: '#f59e0b' },
  { name: 'Freelance', source: 'Contract work', amount: 600, frequency: 'monthly', status: 'active', color: '#ec4899' },
  { name: 'Royalties', source: 'Side projects', amount: 150, frequency: 'monthly', status: 'active', color: '#14b8a6' },
];

const monthlyFlow: MonthlyFlow[] = [
  { month: 'Jan', income: 12050, expenses: 6200 },
  { month: 'Feb', income: 12180, expenses: 5800 },
  { month: 'Mar', income: 12050, expenses: 7100 },
  { month: 'Apr', income: 12200, expenses: 5900 },
  { month: 'May', income: 12050, expenses: 6400 },
  { month: 'Jun', income: 12150, expenses: 6100 },
];

const financialGoals: FinancialGoal[] = [
  { name: 'Emergency Fund', target: 30000, current: 28500, deadline: '2026-08', color: '#22c55e' },
  { name: 'Property Downpayment', target: 120000, current: 67000, deadline: '2028-06', color: '#3b82f6' },
  { name: 'Investment Portfolio', target: 100000, current: 48500, deadline: '2027-12', color: '#8b5cf6' },
  { name: 'Passive Income Goal', target: 5000, current: 3750, deadline: '2026-12', color: '#f59e0b' },
];

const assets = [
  { label: 'Equities', value: 42000, color: '#3b82f6' },
  { label: 'Property', value: 180000, color: '#8b5cf6' },
  { label: 'Cash', value: 28500, color: '#22c55e' },
  { label: 'CPF', value: 95000, color: '#f59e0b' },
  { label: 'Bonds', value: 15000, color: '#14b8a6' },
];

export default function FinancePage() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' }));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalIncome = incomeStreams.reduce((s, i) => s + i.amount, 0);
  const totalPassive = incomeStreams.filter(i => i.frequency !== 'one-time' && i.name !== 'Salary').reduce((s, i) => s + i.amount, 0);
  const monthlyExpenses = 6250;
  const savingsRate = Math.round(((totalIncome - monthlyExpenses) / totalIncome) * 100);
  const netWorth = assets.reduce((s, a) => s + a.value, 0);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Financial Command</h1>
          <p className="text-xs text-gray-500 mt-0.5">Net worth · cash flow · passive income · goals</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
            <PixelClock size={12} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Markets Open</span>
          </div>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelWallet size={14} />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Net Worth</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${netWorth.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-600 mt-0.5">+2.4% this month</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelChart size={14} />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Monthly Income</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">${totalIncome.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{incomeStreams.length} streams active</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelSparkle size={14} />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Passive Income</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${totalPassive.toLocaleString()}<span className="text-xs font-normal text-gray-400">/mo</span></p>
          <p className="text-[10px] text-gray-400 mt-0.5">{Math.round((totalPassive / totalIncome) * 100)}% of total income</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelTarget size={14} />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Savings Rate</span>
          </div>
          <SavingsGauge rate={savingsRate} />
        </div>
      </div>

      {/* Cash Flow Chart + FIRE */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Cash Flow</h2>
              <div className="flex items-center gap-3 text-[9px] text-gray-400">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-blue-400" />
                  Income
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-emerald-400" />
                  Expenses
                </span>
              </div>
            </div>
          </div>
          <div className="p-5">
            <SparkleChart
              data={monthlyFlow.map(m => ({ label: m.month, value: m.income, value2: m.expenses }))}
              height={100}
            />
            <div className="flex justify-between mt-6 text-[9px] text-gray-400">
              <div className="text-center">
                <p className="font-bold text-gray-700">${monthlyFlow.reduce((s, m) => s + m.income, 0) / monthlyFlow.length | 0}</p>
                <p>Avg Income/mo</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-700">${monthlyFlow.reduce((s, m) => s + m.expenses, 0) / monthlyFlow.length | 0}</p>
                <p>Avg Expenses/mo</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-emerald-600">${(monthlyFlow.reduce((s, m) => s + m.income, 0) - monthlyFlow.reduce((s, m) => s + m.expenses, 0)) / monthlyFlow.length | 0}</p>
                <p>Avg Savings/mo</p>
              </div>
            </div>
          </div>
        </div>

        <FIREBadge years={7} months={4} />
      </div>

      {/* Income Streams + Asset Allocation */}
      <div className="grid grid-cols-3 gap-4">
        {/* Income Streams */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Income Streams</h2>
              <Link href="/income" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">Details →</Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {incomeStreams.map((stream) => (
              <div key={stream.name} className="px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50/50 transition-colors">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: stream.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">{stream.name}</p>
                  <p className="text-[9px] text-gray-400">{stream.source}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono font-medium text-gray-900">${stream.amount.toLocaleString()}</p>
                  <p className="text-[9px] text-gray-400">{stream.frequency}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 font-medium">Total Monthly</span>
              <span className="text-sm font-bold text-gray-900">${totalIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Asset Allocation</h2>
          </div>
          <div className="p-5">
            <AssetAllocation assets={assets} />
          </div>
        </div>

        {/* Financial Goals */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Financial Goals</h2>
              <Link href="/goals" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">View all →</Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {financialGoals.map((goal) => {
              const pct = Math.round((goal.current / goal.target) * 100);
              return (
                <div key={goal.name} className="px-5 py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-900">{goal.name}</span>
                    <span className="text-[10px] font-mono text-gray-400">{pct}%</span>
                  </div>
                  <PixelProgress
                    value={goal.current}
                    max={goal.target}
                    variant={pct >= 80 ? 'green' : pct >= 50 ? 'blue' : pct >= 25 ? 'yellow' : 'red'}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-gray-400">${goal.current.toLocaleString()}</span>
                    <span className="text-[9px] text-gray-400">${goal.target.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3">
        <Link href="/spending" className="text-[10px] px-3 py-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors">
          View Spending →
        </Link>
        <Link href="/income" className="text-[10px] px-3 py-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors">
          Manage Income →
        </Link>
        <Link href="/goals" className="text-[10px] px-3 py-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors">
          Goals Tracker →
        </Link>
        <div className="ml-auto text-[9px] text-gray-400">
          Last updated: {new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
}