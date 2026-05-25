'use client';

import React from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelCheck, PixelClock, PixelHeart } from '@/lib/pixel-icons';
import Link from 'next/link';

const stats = [
  { label: 'Active Agents', value: '8', sub: '/ 12 online', color: 'text-green-600' },
  { label: 'Missions', value: '24', sub: '3 in progress', color: 'text-blue-600' },
  { label: 'Success Rate', value: '97.2%', sub: '+2.1% this week', color: 'text-emerald-600' },
  { label: 'Uptime', value: '99.9%', sub: 'Last 30 days', color: 'text-gray-900' },
];

const activeAgents = [
  { name: 'Cyber-7', agent: 'cyber' as const, status: 'active', mission: 'Network Scan', hp: 92 },
  { name: 'Scout-2', agent: 'scout' as const, status: 'active', mission: 'Recon Delta', hp: 88 },
  { name: 'Engi-4', agent: 'engineer' as const, status: 'idle', mission: '—', hp: 100 },
  { name: 'Guard-1', agent: 'guardian' as const, status: 'active', mission: 'Perimeter Watch', hp: 76 },
];

const missionLog = [
  { id: 'M-042', title: 'Database Audit', agent: 'Cyber-7', time: '2m ago', status: 'completed' },
  { id: 'M-041', title: 'API Endpoint Scan', agent: 'Scout-2', time: '8m ago', status: 'completed' },
  { id: 'M-040', title: 'Config Validation', agent: 'Engi-4', time: '15m ago', status: 'completed' },
  { id: 'M-039', title: 'Log Analysis', agent: 'Guard-1', time: '23m ago', status: 'failed' },
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
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Active Agents */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Active Agents
              </h2>
              <Link href="/agents" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {activeAgents.map((agent) => (
              <div key={agent.name} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                <PixelAvatar agent={agent.agent} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{agent.name}</span>
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-400'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">{agent.mission}</p>
                </div>
                <div className="flex items-center gap-2">
                  <PixelHeart size={12} className="text-red-400" />
                  <PixelProgress value={agent.hp} max={100} variant={agent.hp > 90 ? 'green' : agent.hp > 70 ? 'yellow' : 'red'} />
                  <span className="text-[10px] text-gray-400 w-7 text-right">{agent.hp}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Mission Log */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Mission Log
              </h2>
              <Link href="/missions" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {missionLog.map((log) => (
              <div key={log.id} className="px-5 py-2.5 flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-sm flex items-center justify-center shrink-0 ${
                    log.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  <PixelCheck size={10} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{log.title}</p>
                  <p className="text-[10px] text-gray-400">
                    {log.id} · {log.agent}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
