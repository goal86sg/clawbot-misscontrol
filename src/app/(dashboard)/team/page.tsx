'use client';

import React from 'react';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelHeart, PixelSparkle, PixelCheck } from '@/lib/pixel-icons';
import { PixelPulse } from '@/lib/pixel-icons-extra';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  type: 'cyber' | 'scout' | 'engineer' | 'guardian';
  status: 'active' | 'idle' | 'sleeping' | 'error';
  reportsTo: string;
  mission: string;
  specialties: string[];
  level: number;
  hp: number;
  model: string;
  runtime: string;
}

const org: TeamMember[] = [
  {
    id: 'main',
    name: 'Des_bot',
    role: 'Lead Agent / Commander',
    type: 'cyber',
    status: 'active',
    reportsTo: 'Desss Lee',
    mission: 'Orchestrate all operations — build, automate, assist, document',
    specialties: ['Full-stack dev', 'Infrastructure', 'Automation', 'Documentation'],
    level: 15,
    hp: 100,
    model: 'minimax-m2.7:cloud',
    runtime: 'main session (always on)',
  },
  {
    id: 'guarddog',
    name: 'guarddog',
    role: 'Security Auditor',
    type: 'guardian',
    status: 'idle',
    reportsTo: 'Des_bot',
    mission: 'Nightly security audit — runs openclaw security audit --deep',
    specialties: ['Security audit', 'Healthcheck', 'Config hardening'],
    level: 8,
    hp: 100,
    model: 'deepseek-v4-pro:cloud',
    runtime: 'isolated cron (fires at 23:00 SGT)',
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  idle: 'bg-yellow-50 text-yellow-700',
  sleeping: 'bg-blue-50 text-blue-600',
  error: 'bg-red-100 text-red-700',
};

export default function TeamPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Team</h1>
          <p className="text-xs text-gray-500 mt-0.5">{org.length} agents deployed</p>
        </div>
      </div>

      {/* Org Mission */}
      <div className="bg-white border border-gray-200 rounded-lg p-5"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
        <div className="flex items-center gap-3">
          <PixelSparkle size={20} className="text-yellow-500" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Mission Statement</p>
            <p className="text-xs text-gray-500 mt-0.5">Build, automate, protect, and delight — one commit at a time.</p>
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
            <p className="text-[8px] text-gray-400 font-mono mt-0.5">minimax-m2.7:cloud</p>
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
          </div>
        </div>

        {/* Sub-agents */}
        <div className="flex justify-center">
          {org.filter(a => a.id !== 'main').map(agent => (
            <div key={agent.id}
              className={`bg-white border rounded-lg p-3 text-center hover:border-gray-300 transition-colors ${agent.status === 'error' ? 'opacity-50' : 'border-gray-200'}`}
              style={{ minWidth: 160 }}>
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

      {/* Detail cards */}
      <div className="grid grid-cols-2 gap-4">
        {org.map(agent => (
          <div key={agent.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4">
            <PixelAvatar agent={agent.type} size={40} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-gray-900">{agent.name}</p>
                <span className={`text-[7px] px-1.5 py-0.5 rounded ${statusColors[agent.status]}`}>{agent.status}</span>
                <span className="text-[8px] text-gray-400 font-mono">#{agent.id}</span>
              </div>
              <p className="text-[9px] text-gray-500 mt-0.5">{agent.role} · Lv.{agent.level}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">Reports to: {agent.reportsTo}</p>
              <p className="text-[9px] text-gray-400 mt-0.5 italic">🎯 {agent.mission}</p>
              <div className="flex items-center gap-1 mt-2 flex-wrap">
                {agent.specialties.map(s => (
                  <span key={s} className="text-[7px] bg-gray-100 text-gray-600 px-1 rounded">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <PixelHeart size={10} className="text-red-400" />
                  <span className="text-[9px] font-mono text-gray-600">{agent.hp}%</span>
                </div>
                <span className="text-[8px] text-gray-400 font-mono">{agent.model}</span>
                <span className="text-[8px] text-gray-400">{agent.runtime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time agent sessions */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Live Agent Sessions</p>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { id: 'main', session: 'main session (this chat)', status: '● active now', color: 'text-green-600' },
            { id: 'guarddog', session: 'isolated cron', status: '○ idle (fires 23:00 SGT)', color: 'text-yellow-600' },
          ].map(s => (
            <div key={s.id} className="px-5 py-3 flex items-center gap-4">
              <span className="text-[10px] font-mono text-gray-400 w-20">#{s.id}</span>
              <span className="text-[11px] text-gray-700 flex-1">{s.session}</span>
              <span className={`text-[9px] font-medium ${s.color}`}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}