'use client';

import React from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelCheck, PixelClock, PixelHeart, PixelAlert } from '@/lib/pixel-icons';
import Link from 'next/link';

const stats = [
  { label: 'Active Agents', value: '2', sub: '/ 2 registered', color: 'text-green-600' },
  { label: 'Cron Jobs', value: '3', sub: '1 error · 2 ok', color: 'text-blue-600' },
  { label: 'Builds Today', value: '1', sub: 'pixfetch v1.0', color: 'text-purple-600' },
  { label: 'Uptime', value: '99.9%', sub: 'Last 30 days', color: 'text-gray-900' },
];

const activeAgents = [
  { name: 'Des_bot', id: 'main', type: 'cyber' as const, status: 'active', mission: 'All operations', hp: 100 },
  { name: 'guarddog', id: 'guarddog', type: 'guardian' as const, status: 'idle', mission: 'Nightly security audit', hp: 100 },
];

const missionLog = [
  { id: 'cron', title: 'Memory Dreaming Promotion', agent: 'system', time: '18m ago', status: 'ok' },
  { id: 'cron', title: 'Nightly: pixfetch v1.0 built', agent: 'main', time: '7h ago', status: 'completed' },
  { id: 'cron', title: 'healthcheck:daily-security-audit', agent: 'guarddog', time: '12h ago', status: 'error' },
  { id: 'cron', title: 'Nightly: Sovereign Cloud PPTX', agent: 'main', time: '2d ago', status: 'completed' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">Welcome back, Commander</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
            <PixelClock size={12} />
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' })}</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Active Agents */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Agents</h2>
              <Link href="/agents" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">View all →</Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {activeAgents.map(agent => (
              <div key={agent.id} className="px-5 py-3 flex items-center gap-4">
                <PixelAvatar agent={agent.type} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-900">{agent.name}</p>
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                    <span className="text-[9px] text-gray-400">{agent.status}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5 truncate">{agent.mission}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <PixelHeart size={12} className="text-red-400" />
                  <span className="text-[10px] font-mono text-gray-700">{agent.hp}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">System</h2>
          </div>
          <div className="px-5 py-3 space-y-2.5">
            {[
              { label: 'Main Agent', ok: true },
              { label: 'Guarddog Agent', ok: true },
              { label: 'Daily Security Audit', ok: false, note: 'Last error: 12h ago' },
              { label: 'Nightly Build', ok: true },
              { label: 'Memory Cron', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[11px] text-gray-600">{item.label}</span>
                <span className={`text-[9px] font-medium ${item.ok ? 'text-green-600' : 'text-red-600'}`}>
                  {item.ok ? '● ok' : '● error'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Log */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {missionLog.map((entry, i) => (
            <div key={i} className="px-5 py-2.5 flex items-center gap-3">
              {entry.status === 'ok' || entry.status === 'completed'
                ? <PixelCheck size={12} className="text-green-500 shrink-0" />
                : <PixelAlert size={12} className="text-red-500 shrink-0" />
              }
              <span className="text-[10px] font-mono text-gray-400 w-16 shrink-0">{entry.agent}</span>
              <span className="text-[11px] text-gray-900 flex-1">{entry.title}</span>
              <span className="text-[9px] text-gray-400">{entry.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}