'use client';

import React, { useState, useEffect } from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelSparkle, PixelClock } from '@/lib/pixel-icons';
import { PixelCalendar } from '@/lib/pixel-icons-extra';

// ─── Pixel Bar Chart (pixel art style) ───────────────────────────────────────

type BarChartProps = {
  data: { label: string; value: number; color?: string }[];
  max?: number;
  height?: number;
};

function PixelBarChart({ data, max, height = 72 }: BarChartProps) {
  const peak = max ?? Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1.5 h-18">
      {data.map((d, i) => {
        const pct = (d.value / peak) * 100;
        const filled = Math.max(1, Math.round((pct / 100) * 18));
        const color = d.color ?? (pct > 75 ? '#22c55e' : pct > 40 ? '#eab308' : '#94a3b8');
        return (
          <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
            <span className="text-[8px] font-mono text-gray-400">{d.value}</span>
            <div className="flex flex-col-reverse gap-px w-full">
              {Array.from({ length: 18 }, (_, r) => (
                <div
                  key={r}
                  className="w-full rounded-sm transition-colors"
                  style={{
                    height: 4,
                    backgroundColor: r < filled ? color : '#f1f5f9',
                  }}
                />
              ))}
            </div>
            <span className="text-[7px] text-gray-400 whitespace-nowrap">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface CategorySpending {
  category: string;
  icon: string;
  budget: number;
  spent: number;
  color: string;
  transactions: { name: string; amount: number; date: string }[];
}

const categories: CategorySpending[] = [
  {
    category: 'Food & Dining',
    icon: '🍜',
    budget: 600,
    spent: 387.50,
    color: '#f97316',
    transactions: [
      { name: 'Old Town White Coffee', amount: -14.50, date: 'May 18' },
      { name: 'Foodcourt Lunch', amount: -8.20, date: 'May 17' },
      { name: 'Bubble Tea', amount: -5.80, date: 'May 17' },
      { name: 'Dinner Delivery', amount: -32.00, date: 'May 16' },
    ],
  },
  {
    category: 'Transport',
    icon: '🚇',
    budget: 250,
    spent: 143.20,
    color: '#3b82f6',
    transactions: [
      { name: 'MRT Punggol→Suntec', amount: -2.10, date: 'May 18' },
      { name: 'MRT Punggol→Suntec', amount: -2.10, date: 'May 17' },
      { name: 'Bus 43', amount: -1.20, date: 'May 16' },
      { name: 'MRT Top-up', amount: -50.00, date: 'May 15' },
    ],
  },
  {
    category: 'Entertainment',
    icon: '🎮',
    budget: 150,
    spent: 89.90,
    color: '#8b5cf6',
    transactions: [
      { name: 'Steam Game', amount: -34.90, date: 'May 14' },
      { name: 'Cinema', amount: -55.00, date: 'May 10' },
    ],
  },
  {
    category: 'Shopping',
    icon: '🛍️',
    budget: 300,
    spent: 215.00,
    color: '#ec4899',
    transactions: [
      { name: 'Uniqlo Top', amount: -49.00, date: 'May 16' },
      { name: 'Amazon Order', amount: -89.00, date: 'May 13' },
      { name: 'Shopee Haul', amount: -77.00, date: 'May 10' },
    ],
  },
  {
    category: 'Bills & Subscriptions',
    icon: '📱',
    budget: 200,
    spent: 187.40,
    color: '#14b8a6',
    transactions: [
      { name: 'Starhub Plan', amount: -49.90, date: 'May 15' },
      { name: 'Spotify', amount: -11.50, date: 'May 13' },
      { name: 'AWS', amount: -86.00, date: 'May 12' },
      { name: 'Google One', amount: -10.00, date: 'May 10' },
    ],
  },
  {
    category: 'Health',
    icon: '💊',
    budget: 100,
    spent: 45.00,
    color: '#22c55e',
    transactions: [
      { name: 'Pharmacy', amount: -28.00, date: 'May 17' },
      { name: 'Gym', amount: -17.00, date: 'May 10' },
    ],
  },
];

const monthlySpend = [
  { label: 'Jan', value: 1240 },
  { label: 'Feb', value: 1180 },
  { label: 'Mar', value: 1420 },
  { label: 'Apr', value: 1350 },
  { label: 'May', value: 1083 },
];

const recentTransactions = [
  { name: 'Old Town White Coffee', amount: -14.50, date: 'Today, 8:22am', category: 'Food & Dining' },
  { name: 'MRT Punggol→Suntec', amount: -2.10, date: 'Today, 8:05am', category: 'Transport' },
  { name: 'Bubble Tea', amount: -5.80, date: 'May 17', category: 'Food & Dining' },
  { name: 'Uniqlo Top', amount: -49.00, date: 'May 16', category: 'Shopping' },
  { name: 'Steam Game', amount: -34.90, date: 'May 14', category: 'Entertainment' },
];

const totalBudget = categories.reduce((s, c) => s + c.budget, 0);
const totalSpent = categories.reduce((s, c) => s + c.spent, 0);
const remaining = totalBudget - totalSpent;

// ─── Budget Bar ───────────────────────────────────────────────────────────────

function BudgetBar({ spent, budget, color }: { spent: number; budget: number; color: string }) {
  const pct = Math.round((spent / budget) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] text-gray-400 font-mono">
        <span>{spent.toFixed(2)}</span>
        <span>{pct}% used</span>
      </div>
      <PixelProgress
        value={pct}
        max={100}
        variant={pct > 90 ? 'red' : pct > 70 ? 'yellow' : 'green'}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SpendingPage() {
  const [time, setTime] = useState('');
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Singapore',
      }));
    };
    update();
    const id = setInterval(update, 1000);
    const anim = setInterval(() => setFrame(f => f + 1), 600);
    return () => { clearInterval(id); clearInterval(anim); };
  }, []);

  const totalPct = Math.round((totalSpent / totalBudget) * 100);
  const daysLeft = 31 - 18; // May 18th

  return (
    <div className="max-w-6xl space-y-5">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Spending Tracker</h1>
          <p className="text-xs text-gray-500 mt-0.5">May 2026 · Personal Expenses</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
            <PixelClock size={11} />
            <span>{time}</span>
          </div>
          <span className="text-[10px] font-mono bg-green-100 text-green-700 px-2 py-1 rounded">
            Live
          </span>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-4 gap-3">
        {/* Total Budget */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Total Budget</p>
          <p className="text-xl font-bold text-gray-900 mt-1 font-mono">${totalBudget.toFixed(2)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{daysLeft} days remaining</p>
        </div>
        {/* Spent */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Spent So Far</p>
          <p className="text-xl font-bold text-orange-600 mt-1 font-mono">${totalSpent.toFixed(2)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{totalPct}% of budget used</p>
        </div>
        {/* Remaining */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Remaining</p>
          <p className="text-xl font-bold text-green-600 mt-1 font-mono">${remaining.toFixed(2)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            ${(remaining / daysLeft).toFixed(2)}/day avg
          </p>
        </div>
        {/* Daily Target */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Daily Target</p>
          <p className="text-xl font-bold text-blue-600 mt-1 font-mono">${(remaining / daysLeft).toFixed(2)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">stay under to save</p>
        </div>
      </div>

      {/* Monthly Trend + Recent Transactions */}
      <div className="grid grid-cols-3 gap-4">
        {/* Monthly Spending Trend */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Trend</h2>
          </div>
          <div className="px-5 py-4">
            <PixelBarChart data={monthlySpend} height={72} />
            <div className="flex justify-between mt-2 px-1">
              {monthlySpend.map(m => (
                <span key={m.label} className="text-[8px] text-gray-400">{m.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentTransactions.map((t, i) => (
              <div key={i} className="px-4 py-2.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-800 truncate">{t.name}</p>
                  <p className="text-[8px] text-gray-400">{t.date}</p>
                </div>
                <span className="text-[10px] font-mono text-red-500 shrink-0">
                  {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div
          className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
        >
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {categories.map(cat => {
            const pct = Math.round((cat.spent / cat.budget) * 100);
            const isOver = cat.spent > cat.budget;
            return (
              <div key={cat.category} className="px-5 py-3 flex items-start gap-4">
                {/* Category Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: cat.color + '18' }}
                >
                  {cat.icon}
                </div>

                {/* Category Info + Budget Bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-800">{cat.category}</span>
                    <div className="flex items-center gap-2">
                      {isOver && (
                        <span className="text-[9px] font-mono bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                          OVER
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-gray-500">
                        ${cat.spent.toFixed(2)} / ${cat.budget}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1.5">
                    <BudgetBar spent={cat.spent} budget={cat.budget} color={cat.color} />
                  </div>
                  {/* Recent transaction for this category */}
                  {cat.transactions.length > 0 && (
                    <p className="text-[9px] text-gray-400 mt-1.5">
                      Latest: {cat.transactions[0].name} · {cat.transactions[0].date}
                    </p>
                  )}
                </div>

                {/* Spending % */}
                <div className="text-right shrink-0 w-12">
                  <span
                    className={`text-lg font-bold font-mono ${isOver ? 'text-red-500' : pct > 70 ? 'text-yellow-600' : 'text-gray-700'}`}
                  >
                    {pct}%
                  </span>
                  <p className="text-[8px] text-gray-400">used</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pixel Art Footer Stats */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { label: 'Top Category', value: 'Food & Dining', sub: '$387.50' },
          { label: 'Biggest Transaction', value: 'Cinema', sub: '-$55.00' },
          { label: 'Avg Daily Spend', value: `$${(totalSpent / 18).toFixed(2)}`, sub: 'this month' },
          { label: 'Savings Rate', value: `${Math.round((remaining / totalBudget) * 100)}%`, sub: 'remaining' },
          { label: 'Transactions', value: '47', sub: 'this month' },
          { label: 'Category Budgets', value: '6/6', sub: 'all tracked' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-center">
            <p className="text-[8px] text-gray-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{s.value}</p>
            <p className="text-[9px] text-gray-400 font-mono">{s.sub}</p>
          </div>
        ))}
      </div>

    </div>
  );
}