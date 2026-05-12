'use client';

import React, { useState } from 'react';
import { PixelProgress } from '@/components/PixelProgress';

// ─── Pixel Bar Chart Component ───────────────────────────────────────────────

type BarChartProps = {
  data: { label: string; value: number; color?: string }[];
  max?: number;
  barWidth?: number;
  height?: number;
};

function PixelBarChart({ data, max, barWidth = 24, height = 80 }: BarChartProps) {
  const peak = max ?? Math.max(...data.map(d => d.value));

  return (
    <div className="flex items-end gap-2 h-20">
      {data.map((d, i) => {
        const pct = (d.value / peak) * 100;
        const filled = Math.round((pct / 100) * 16); // 16 pixel rows
        const segColor = d.color ?? (pct > 70 ? 'bg-green-500' : pct > 35 ? 'bg-yellow-400' : 'bg-gray-300');
        return (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="text-[8px] font-mono text-gray-400">{d.value}%</span>
            <div className="flex flex-col-reverse gap-px">
              {Array.from({ length: 16 }, (_, r) => (
                <div
                  key={r}
                  className={`w-4 h-3 rounded-sm transition-colors ${r < filled ? segColor : 'bg-gray-100'}`}
                />
              ))}
            </div>
            <span className="text-[8px] text-gray-400 mt-0.5 whitespace-nowrap">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Donut Chart (ASCII pixel style) ─────────────────────────────────────────

function PixelDonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const radius = 5;

  // We'll render as a set of pixel rings
  const pixels: { x: number; y: number; color: string }[] = [];

  // Simple pixel circle approximation
  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      const dist = Math.sqrt(x * x + y * y);
      if (dist <= radius && dist >= radius - 2) {
        // Determine sector by angle
        let angle = Math.atan2(y, x); // -π to π
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

  const size = radius * 2 + 2;
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill('transparent'));

  for (const p of pixels) {
    if (p.y >= 0 && p.y < size && p.x >= 0 && p.x < size) {
      grid[p.y][p.x] = p.color;
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative" style={{ width: 96, height: 96 }}>
        {/* Outer ring rendered as SVG */}
        <svg width="96" height="96" viewBox="0 0 12 12" shapeRendering="crispEdges" className="absolute inset-0">
          {segments.map((seg, i) => {
            const startAngle = (segments.slice(0, i).reduce((s, x) => s + x.value, 0) / total) * 360;
            const endAngle = startAngle + (seg.value / total) * 360;
            const large = seg.value / total > 0.5 ? 1 : 0;
            const r = 5;
            const cx = 6, cy = 6;
            const toRad = (a: number) => (a * Math.PI) / 180;
            const x1 = cx + r * Math.cos(toRad(startAngle - 90));
            const y1 = cy + r * Math.sin(toRad(startAngle - 90));
            const x2 = cx + r * Math.cos(toRad(endAngle - 90));
            const y2 = cy + r * Math.sin(toRad(endAngle - 90));
            const inner = 3;
            const ix1 = cx + inner * Math.cos(toRad(startAngle - 90));
            const iy1 = cy + inner * Math.sin(toRad(startAngle - 90));
            const ix2 = cx + inner * Math.cos(toRad(endAngle - 90));
            const iy2 = cy + inner * Math.sin(toRad(endAngle - 90));
            const d = [
              `M ${x1.toFixed(1)} ${y1.toFixed(1)}`,
              `A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`,
              `L ${ix2.toFixed(1)} ${iy2.toFixed(1)}`,
              `A ${inner} ${inner} 0 ${large} 0 ${ix1.toFixed(1)} ${iy1.toFixed(1)}`,
              'Z',
            ].join(' ');
            return <path key={i} d={d} fill={seg.color} />;
          })}
          {/* Center hole */}
          <circle cx="6" cy="6" r="3" fill="white" />
        </svg>
      </div>
      <div className="space-y-1.5">
        {segments.map(seg => (
          <div key={seg.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
            <span className="text-[10px] text-gray-600">{seg.label}</span>
            <span className="text-[10px] font-mono text-gray-400 ml-auto">{Math.round((seg.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Holding {
  ticker: string;
  name: string;
  shares: number;
  avgCost: number;
  current: number;
  marketValue: number;
  gain: number;
  gainPct: number;
  sector: string;
  color: string;
}

interface Dividend {
  ticker: string;
  exDate: string;
  amount: number;
  paid: boolean;
}

interface Transaction {
  date: string;
  ticker: string;
  type: 'BUY' | 'SELL';
  shares: number;
  price: number;
}

const holdings: Holding[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', shares: 20, avgCost: 155.00, current: 197.50, marketValue: 3950, gain: 850, gainPct: 27.4, sector: 'Technology', color: '#3b82f6' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', shares: 8, avgCost: 310.00, current: 425.00, marketValue: 3400, gain: 920, gainPct: 37.1, sector: 'Technology', color: '#3b82f6' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 5, avgCost: 125.00, current: 172.00, marketValue: 860, gain: 235, gainPct: 37.6, sector: 'Technology', color: '#3b82f6' },
  { ticker: 'JPM', name: 'JPMorgan Chase', shares: 12, avgCost: 148.00, current: 203.00, marketValue: 2436, gain: 660, gainPct: 37.2, sector: 'Financials', color: '#10b981' },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway', shares: 6, avgCost: 290.00, current: 365.00, marketValue: 2190, gain: 450, gainPct: 25.9, sector: 'Financials', color: '#10b981' },
  { ticker: 'JNJ', name: 'Johnson & Johnson', shares: 10, avgCost: 162.00, current: 155.00, marketValue: 1550, gain: -70, gainPct: -4.3, sector: 'Healthcare', color: '#f59e0b' },
  { ticker: 'UNH', name: 'UnitedHealth Group', shares: 4, avgCost: 480.00, current: 525.00, marketValue: 2100, gain: 180, gainPct: 9.4, sector: 'Healthcare', color: '#f59e0b' },
  { ticker: 'PG', name: 'Procter & Gamble', shares: 10, avgCost: 140.00, current: 168.00, marketValue: 1680, gain: 280, gainPct: 20.0, sector: 'Consumer Staples', color: '#8b5cf6' },
  { ticker: 'HD', name: 'Home Depot', shares: 6, avgCost: 310.00, current: 355.00, marketValue: 2130, gain: 270, gainPct: 14.5, sector: 'Consumer Discretionary', color: '#ec4899' },
  { ticker: 'VTI', name: 'Vanguard Total Market ETF', shares: 30, avgCost: 210.00, current: 258.00, marketValue: 7740, gain: 1440, gainPct: 22.9, sector: 'ETF', color: '#6366f1' },
];

const sectorSegments = [
  { label: 'Technology', value: 8210, color: '#3b82f6' },
  { label: 'Financials', value: 4626, color: '#10b981' },
  { label: 'ETF', value: 7740, color: '#6366f1' },
  { label: 'Healthcare', value: 3650, color: '#f59e0b' },
  { label: 'Consumer', value: 3810, color: '#ec4899' },
];

const upcomingDividends: Dividend[] = [
  { ticker: 'AAPL', exDate: 'May 15', amount: 0.25, paid: false },
  { ticker: 'MSFT', exDate: 'May 20', amount: 0.75, paid: false },
  { ticker: 'JNJ', exDate: 'May 22', amount: 1.24, paid: false },
  { ticker: 'PG', exDate: 'May 25', amount: 1.01, paid: false },
  { ticker: 'JPM', exDate: 'May 28', amount: 1.15, paid: false },
  { ticker: 'HD', exDate: 'Jun 1', amount: 2.00, paid: false },
  { ticker: 'VTI', exDate: 'Jun 5', amount: 1.82, paid: false },
];

const recentTransactions: Transaction[] = [
  { date: '2026-05-10', ticker: 'VTI', type: 'BUY', shares: 5, price: 257.50 },
  { date: '2026-05-08', ticker: 'PG', type: 'BUY', shares: 10, price: 166.20 },
  { date: '2026-05-05', ticker: 'HD', type: 'BUY', shares: 6, price: 352.00 },
  { date: '2026-05-02', ticker: 'GOOGL', type: 'BUY', shares: 5, price: 168.50 },
  { date: '2026-04-28', ticker: 'AAPL', type: 'BUY', shares: 5, price: 191.30 },
  { date: '2026-04-22', ticker: 'MSFT', type: 'BUY', shares: 3, price: 418.00 },
];

const SECTOR_COLORS: Record<string, string> = {
  'Technology': '#3b82f6',
  'Financials': '#10b981',
  'Healthcare': '#f59e0b',
  'Consumer Staples': '#8b5cf6',
  'Consumer Discretionary': '#ec4899',
  'ETF': '#6366f1',
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [tab, setTab] = useState<'holdings' | 'dividends' | 'transactions'>('holdings');
  const [selected, setSelected] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const totalValue = holdings.reduce((s, h) => s + h.marketValue, 0);
  const totalCost = holdings.reduce((s, h) => s + h.avgCost * h.shares, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPct = (totalGain / totalCost) * 100;
  const monthlyDividend = upcomingDividends.reduce((s, d) => s + d.amount * (holdings.find(h => h.ticker === d.ticker)?.shares ?? 0), 0);

  const sectorData = sectorSegments.map(s => ({
    ...s,
    pct: Math.round((s.value / totalValue) * 100),
  }));

  const performanceData = [
    { label: 'Jan', value: 78 },
    { label: 'Feb', value: 82 },
    { label: 'Mar', value: 79 },
    { label: 'Apr', value: 88 },
    { label: 'May', value: 92 },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Portfolio</h1>
          <p className="text-xs text-gray-500 mt-0.5">Investment dashboard · live tracking</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
          <div className={`w-1.5 h-1.5 rounded-full ${tick % 3 === 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span>{(typeof window !== 'undefined' ? new Date().toLocaleTimeString('en-US', { hour12: false }) : '--:--:--')} SGT</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 font-mono mt-1">${totalValue.toLocaleString('en-US')}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">across {holdings.length} positions</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Total Cost</p>
          <p className="text-2xl font-bold text-gray-900 font-mono mt-1">${totalCost.toLocaleString('en-US')}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">${totalCost.toLocaleString('en-US')} invested</p>
        </div>
        <div className={`bg-white border rounded-lg p-4 ${totalGain >= 0 ? 'border-green-200' : 'border-red-200'}`}>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Total Gain/Loss</p>
          <p className={`text-2xl font-bold font-mono mt-1 ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalGain >= 0 ? '+' : ''}{totalGain.toLocaleString('en-US')}
          </p>
          <p className={`text-[10px] mt-0.5 ${totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalGain >= 0 ? '+' : ''}{totalGainPct.toFixed(1)}% all-time
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">Monthly Income</p>
          <p className="text-2xl font-bold text-yellow-600 font-mono mt-1">${monthlyDividend.toFixed(2)}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">est. dividend income</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Performance bar chart */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">YTD Performance</p>
          </div>
          <div className="px-5 py-4">
            <PixelBarChart data={performanceData} height={80} />
          </div>
          <div className="px-5 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-gray-400">Jan — May 2026</span>
              <span className="text-[9px] text-green-600 font-medium">+{performanceData[performanceData.length - 1].value - performanceData[0].value}%</span>
            </div>
          </div>
        </div>

        {/* Sector allocation donut */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden col-span-2">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Sector Allocation</p>
          </div>
          <div className="px-5 py-4 flex items-center gap-6">
            <PixelDonutChart segments={sectorSegments} />
            <div className="text-[9px] text-gray-400 mt-2">
              Total: ${totalValue.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Holdings / Dividends / Transactions tabs */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Tab bar */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-1"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          {(['holdings', 'dividends', 'transactions'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[10px] px-3 py-1.5 rounded font-medium transition-colors capitalize ${
                tab === t ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {t}
              {t === 'holdings' && <span className="ml-1.5 text-[9px] opacity-60">({holdings.length})</span>}
              {t === 'dividends' && <span className="ml-1.5 text-[9px] opacity-60">({upcomingDividends.length})</span>}
              {t === 'transactions' && <span className="ml-1.5 text-[9px] opacity-60">({recentTransactions.length})</span>}
            </button>
          ))}
        </div>

        {/* Holdings table */}
        {tab === 'holdings' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[9px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="text-left px-5 py-2 font-medium">Ticker</th>
                  <th className="text-left px-3 py-2 font-medium">Name</th>
                  <th className="text-right px-3 py-2 font-medium">Shares</th>
                  <th className="text-right px-3 py-2 font-medium">Avg Cost</th>
                  <th className="text-right px-3 py-2 font-medium">Current</th>
                  <th className="text-right px-3 py-2 font-medium">Mkt Value</th>
                  <th className="text-right px-3 py-2 font-medium">Gain/Loss</th>
                  <th className="text-right px-5 py-2 font-medium">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {holdings.map(h => (
                  <tr
                    key={h.ticker}
                    onClick={() => setSelected(selected === h.ticker ? null : h.ticker)}
                    className={`cursor-pointer transition-colors ${selected === h.ticker ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                  >
                    <td className="px-5 py-2.5">
                      <span className="text-xs font-mono font-bold text-gray-900">{h.ticker}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: SECTOR_COLORS[h.sector] ?? '#9ca3af' }} />
                        <span className="text-[11px] text-gray-700">{h.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-[11px] font-mono text-gray-700">{h.shares}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-[11px] font-mono text-gray-500">${h.avgCost.toFixed(2)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-[11px] font-mono text-gray-900">${h.current.toFixed(2)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className="text-[11px] font-mono font-medium text-gray-900">${h.marketValue.toLocaleString('en-US')}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <span className={`text-[11px] font-mono ${h.gain >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {h.gain >= 0 ? '+' : ''}${h.gain.toLocaleString('en-US')}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${h.gain >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
                            style={{ width: `${Math.min(100, Math.abs(h.gainPct) * 2)}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-mono w-10 text-right ${h.gain >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {h.gain >= 0 ? '+' : ''}{h.gainPct.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Totals row */}
              <tfoot>
                <tr className="border-t border-gray-200 bg-gray-50/50">
                  <td className="px-5 py-2.5" colSpan={5}>
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total</span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="text-xs font-mono font-bold text-gray-900">${totalValue.toLocaleString('en-US')}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className={`text-xs font-mono font-bold ${totalGain >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {totalGain >= 0 ? '+' : ''}${totalGain.toLocaleString('en-US')}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <span className={`text-[10px] font-mono font-bold ${totalGain >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {totalGain >= 0 ? '+' : ''}{totalGainPct.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Dividends tab */}
        {tab === 'dividends' && (
          <div className="divide-y divide-gray-50">
            {upcomingDividends.map(d => {
              const holding = holdings.find(h => h.ticker === d.ticker);
              const est = d.amount * (holding?.shares ?? 0);
              return (
                <div key={`${d.ticker}-${d.exDate}`} className="px-5 py-3 flex items-center gap-4">
                  <div className="w-14 text-center">
                    <p className="text-xs font-mono font-bold text-gray-900">{d.ticker}</p>
                    <p className="text-[8px] text-gray-400">{holding?.name.split(' ')[0] ?? d.ticker}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${d.paid ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                        {d.paid ? '✓ Paid' : 'Upcoming'}
                      </span>
                      <span className="text-[10px] text-gray-500">Ex-date: {d.exDate}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400">${d.amount.toFixed(2)}/share × {holding?.shares ?? 0} shares</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-600 font-mono">${est.toFixed(2)}</p>
                    <p className="text-[8px] text-gray-400">estimated</p>
                  </div>
                </div>
              );
            })}
            <div className="px-5 py-3 bg-gray-50/50 flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-medium">Total upcoming (month)</span>
              <span className="text-sm font-bold text-yellow-600 font-mono">${monthlyDividend.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Transactions tab */}
        {tab === 'transactions' && (
          <div className="divide-y divide-gray-50">
            {recentTransactions.map((tx, i) => {
              const holding = holdings.find(h => h.ticker === tx.ticker);
              const total = tx.shares * tx.price;
              return (
                <div key={i} className="px-5 py-3 flex items-center gap-4">
                  <div className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${tx.type === 'BUY' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                    {tx.type}
                  </div>
                  <div className="w-14 text-center">
                    <p className="text-xs font-mono font-bold text-gray-900">{tx.ticker}</p>
                    <p className="text-[8px] text-gray-400">{holding?.name.split(' ')[0] ?? tx.ticker}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-700">
                      {tx.shares} share{tx.shares > 1 ? 's' : ''} @ ${tx.price.toFixed(2)}
                    </p>
                    <p className="text-[9px] text-gray-400">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono font-bold text-gray-900">${total.toLocaleString('en-US')}</p>
                    <p className="text-[8px] text-gray-400">total</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-2">Top Performer</p>
          {(() => {
            const best = holdings.reduce((a, b) => a.gainPct > b.gainPct ? a : b);
            return (
              <div>
                <p className="text-sm font-bold text-green-600">{best.ticker}</p>
                <p className="text-[10px] text-gray-500">+{best.gainPct.toFixed(1)}% · ${best.gain.toLocaleString()}</p>
              </div>
            );
          })()}
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-2">Worst Performer</p>
          {(() => {
            const worst = holdings.reduce((a, b) => a.gainPct < b.gainPct ? a : b);
            return (
              <div>
                <p className="text-sm font-bold text-red-500">{worst.ticker}</p>
                <p className="text-[10px] text-gray-500">{worst.gainPct.toFixed(1)}% · ${worst.gain.toLocaleString()}</p>
              </div>
            );
          })()}
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-2">Yield Estimate</p>
          <p className="text-sm font-bold text-yellow-600">{(monthlyDividend * 12 / totalValue * 100).toFixed(2)}%</p>
          <p className="text-[10px] text-gray-500">annualized</p>
        </div>
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Portfolio · Screen 20 · Des_bot
      </p>
    </div>
  );
}