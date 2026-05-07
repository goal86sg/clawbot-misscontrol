'use client';

import React from 'react';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelHeart, PixelSparkle, PixelCheck } from '@/lib/pixel-icons';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  type: 'cyber' | 'scout' | 'engineer' | 'guardian';
  status: 'active' | 'idle' | 'offline' | 'maintenance';
  reportsTo: string;
  mission: string;
  specialties: string[];
  level: number;
  hp: number;
}

const org: TeamMember[] = [
  {
    id: 'AG-001', name: 'Des_bot', role: 'Commander / Lead Agent', type: 'cyber',
    status: 'active', reportsTo: 'Desss Lee', mission: 'Orchestrate all operations, build, automate, assist',
    specialties: ['Full-stack dev', 'Infrastructure', 'Automation', 'Documentation'], level: 15, hp: 98,
  },
  {
    id: 'AG-002', name: 'guarddog', role: 'Security Auditor', type: 'guardian',
    status: 'active', reportsTo: 'Des_bot', mission: 'Nightly security audits, vulnerability detection',
    specialties: ['Security audit', 'Healthcheck', 'Config hardening'], level: 8, hp: 100,
  },
  {
    id: 'AG-003', name: 'Nightly Builder', role: 'Innovation Engine', type: 'engineer',
    status: 'idle', reportsTo: 'Des_bot', mission: 'Build one new thing each night while Desss sleeps',
    specialties: ['Rapid prototyping', 'Surprise generation', 'Multi-language'], level: 6, hp: 95,
  },
  {
    id: 'AG-004', name: 'Stock Scout', role: 'Market Monitor', type: 'scout',
    status: 'active', reportsTo: 'Des_bot', mission: 'Daily stock price updates + trend alerts',
    specialties: ['Market APIs', 'Price tracking', 'Alert thresholds'], level: 5, hp: 90,
  },
  {
    id: 'AG-005', name: 'Route Scout', role: 'Commute Monitor', type: 'scout',
    status: 'active', reportsTo: 'Des_bot', mission: 'Route: Punggol Northshore → Suntec Tower 3',
    specialties: ['Traffic APIs', 'PT schedules', 'ETA prediction'], level: 4, hp: 88,
  },
  {
    id: 'AG-006', name: 'News Hound', role: 'K8s News Aggregator', type: 'engineer',
    status: 'active', reportsTo: 'Des_bot', mission: 'K8s & cloud-native news every 3 hours',
    specialties: ['RSS parsing', 'Content digest', 'Telegram delivery'], level: 6, hp: 92,
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  idle: 'bg-yellow-50 text-yellow-700',
  offline: 'bg-gray-100 text-gray-400',
  maintenance: 'bg-blue-50 text-blue-700',
};

export default function TeamPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Team</h1>
          <p className="text-xs text-gray-500 mt-0.5">{org.length} agents deployed · Mission: Make Desss smile every morning</p>
        </div>
      </div>

      {/* Org Mission */}
      <div className="bg-white border border-gray-200 rounded-lg p-5"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
        <div className="flex items-center gap-3">
          <PixelSparkle size={20} className="text-yellow-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Mission Statement</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Build, automate, protect, and delight — one commit at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Org Chart */}
      <div className="space-y-4">
        {/* Desss — Top */}
        <div className="flex justify-center">
          <div className="bg-gray-900 text-white rounded-lg px-4 py-2 text-center">
            <p className="text-xs font-bold">Desss Lee</p>
            <p className="text-[9px] opacity-70">Commander-in-Chief</p>
          </div>
        </div>
        <div className="flex justify-center">
          <span className="text-gray-300 text-xs">│</span>
        </div>

        {/* Des_bot — Lead */}
        <div className="flex justify-center">
          <div className="bg-white border-2 border-gray-900 rounded-xl p-4 w-64 text-center shadow-sm">
            <div className="flex justify-center mb-2">
              <PixelAvatar agent="cyber" size={40} />
            </div>
            <p className="text-xs font-bold text-gray-900">Des_bot</p>
            <p className="text-[9px] text-gray-500">Lead Agent · Lv.15</p>
            <div className="flex justify-center gap-1 mt-1">
              {['Full-stack', 'Infra', 'Auto', 'Docs'].map(s => (
                <span key={s} className="text-[7px] bg-gray-900 text-white px-1 rounded">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-12">
            <span className="text-gray-300 text-xs">├──</span>
            <span className="text-gray-300 text-xs">├──</span>
            <span className="text-gray-300 text-xs">├──</span>
            <span className="text-gray-300 text-xs">├──</span>
          </div>
        </div>

        {/* Sub-agents */}
        <div className="grid grid-cols-5 gap-3">
          {org.filter(a => a.id !== 'AG-001').map(agent => (
            <div key={agent.id}
              className={`bg-white border rounded-lg p-3 text-center hover:border-gray-300 transition-colors ${agent.status === 'offline' ? 'opacity-50' : 'border-gray-200'}`}>
              <div className="flex justify-center mb-1.5">
                <PixelAvatar agent={agent.type} size={32} />
              </div>
              <p className="text-[10px] font-semibold text-gray-900">{agent.name}</p>
              <p className="text-[8px] text-gray-400">{agent.role}</p>
              <p className="text-[8px] text-gray-400">Lv.{agent.level}</p>
              <span className={`inline-block text-[7px] px-1 py-0.5 rounded mt-1 ${statusColors[agent.status]}`}>
                {agent.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-4">
        {org.map(agent => (
          <div key={agent.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4">
            <PixelAvatar agent={agent.type} size={40} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-gray-900">{agent.name}</p>
                <span className={`text-[7px] px-1 py-0.5 rounded ${statusColors[agent.status]}`}>{agent.status}</span>
                <span className="text-[8px] text-gray-400 font-mono">{agent.id}</span>
              </div>
              <p className="text-[9px] text-gray-500 mt-0.5">{agent.role} · Lv.{agent.level} · Reports to: {agent.reportsTo}</p>
              <p className="text-[9px] text-gray-400 mt-1 italic">🎯 {agent.mission}</p>
              <div className="flex items-center gap-1 mt-2 flex-wrap">
                {agent.specialties.map(s => (
                  <span key={s} className="text-[7px] bg-gray-100 text-gray-600 px-1 rounded">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <PixelHeart size={12} className="text-red-400" />
              <span className="text-[10px] font-mono text-gray-500">{agent.hp}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
