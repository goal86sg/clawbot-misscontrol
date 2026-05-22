'use client';

import React from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelAgents, PixelCheck, PixelClock, PixelHeart, PixelAlert, PixelSparkle, PixelTerminal } from '@/lib/pixel-icons';
import { PixelBell } from '@/lib/pixel-icons-extra';
import Link from 'next/link';

const features = [
  {
    href: '/agents',
    label: 'Agents',
    desc: 'Manage your AI agents',
    icon: PixelAgents,
    color: 'from-blue-500 to-blue-600',
    badge: '2 active',
  },
  {
    href: '/missions',
    label: 'Missions',
    desc: 'Active missions & tasks',
    icon: PixelBell,
    color: 'from-red-500 to-red-600',
    badge: '3 pending',
  },
  {
    href: '/tasks',
    label: 'Tasks',
    desc: 'Track & complete tasks',
    icon: PixelCheck,
    color: 'from-green-500 to-green-600',
    badge: '1 due',
  },
  {
    href: '/activity',
    label: 'Activity',
    desc: 'System activity log',
    icon: PixelTerminal,
    color: 'from-purple-500 to-purple-600',
    badge: null,
  },
];

const stats = [
  { label: 'Active Agents', value: '2', sub: 'Running smoothly', color: 'text-green-600' },
  { label: 'Cron Jobs', value: '3', sub: '1 needs attention', color: 'text-blue-600' },
  { label: 'Builds Today', value: '1', sub: 'pixfetch v1.0', color: 'text-purple-600' },
  { label: 'Uptime', value: '99.9%', sub: 'Last 30 days', color: 'text-gray-900' },
];

const recentActivity = [
  { id: 'cron', title: 'Memory Dreaming Promotion', agent: 'system', time: '18m ago', status: 'ok' },
  { id: 'cron', title: 'Nightly: pixfetch v1.0 built', agent: 'main', time: '7h ago', status: 'completed' },
  { id: 'cron', title: 'healthcheck:daily-security-audit', agent: 'guarddog', time: '12h ago', status: 'error' },
  { id: 'cron', title: 'Nightly: Sovereign Cloud PPTX', agent: 'main', time: '2d ago', status: 'completed' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
        </div>
        
        {/* Content */}
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PixelSparkle size={18} className="text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400 tracking-wider uppercase">System Online</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Mission Control</h1>
            <p className="text-sm text-gray-400">Welcome back, Commander. All systems nominal.</p>
          </div>
          
          {/* Live Clock */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <PixelClock size={14} className="text-gray-400" />
              <span className="text-xs font-mono text-gray-400">SINGAPORE</span>
            </div>
            <p className="text-lg font-mono font-bold mt-1">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore' })}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Asia/Singapore' })}
            </p>
          </div>
        </div>
        
        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white/10 backdrop-blur rounded-lg p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{stat.label}</p>
              <p className={`text-xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-4 gap-4">
        {features.map(feature => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <feature.icon size={20} className="text-white" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-900">{feature.label}</h3>
              {feature.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {feature.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{feature.desc}</p>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Active Agents */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PixelAgents size={16} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Active Agents</h2>
            </div>
            <Link href="/agents" className="text-xs text-blue-500 hover:text-blue-600 font-medium">View all →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { name: 'Des_bot', id: 'main', type: 'cyber' as const, status: 'active', mission: 'All operations', hp: 100 },
              { name: 'guarddog', id: 'guarddog', type: 'guardian' as const, status: 'idle', mission: 'Nightly security audit', hp: 100 },
            ].map(agent => (
              <div key={agent.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <PixelAvatar agent={agent.type} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{agent.name}</p>
                    <span className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                    <span className="text-[10px] text-gray-400">{agent.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{agent.mission}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <PixelHeart size={14} className="text-red-400" />
                  <span className="text-xs font-mono text-gray-700">{agent.hp}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <PixelSparkle size={16} className="text-yellow-500" />
            <h2 className="text-sm font-semibold text-gray-900">System Status</h2>
          </div>
          <div className="px-6 py-4 space-y-3">
            {[
              { label: 'Main Agent', ok: true },
              { label: 'Guarddog Agent', ok: true },
              { label: 'Daily Security Audit', ok: false, note: '12h ago' },
              { label: 'Nightly Build', ok: true },
              { label: 'Memory Cron', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{item.label}</span>
                <span className={`text-xs font-medium ${item.ok ? 'text-green-600' : 'text-red-600'}`}>
                  ● {item.ok ? 'ok' : item.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PixelTerminal size={16} className="text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <Link href="/activity" className="text-xs text-blue-500 hover:text-blue-600 font-medium">View all →</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentActivity.map((entry, i) => (
            <div key={i} className="px-6 py-3 flex items-center gap-3">
              {entry.status === 'ok' || entry.status === 'completed'
                ? <PixelCheck size={14} className="text-green-500 shrink-0" />
                : <PixelAlert size={14} className="text-red-500 shrink-0" />
              }
              <span className="text-xs font-mono text-gray-400 w-16 shrink-0">{entry.agent}</span>
              <span className="text-sm text-gray-900 flex-1">{entry.title}</span>
              <span className="text-xs text-gray-400">{entry.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}