'use client';

import React from 'react';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelHeart, PixelSparkle, PixelCheck, PixelAlert } from '@/lib/pixel-icons';
import { PixelPulse as PixPulse } from '@/lib/pixel-icons-extra';

interface Agent {
  id: string;
  name: string;
  type: 'cyber' | 'scout' | 'engineer' | 'guardian';
  role: string;
  status: 'active' | 'idle' | 'sleeping' | 'error';
  hp: number;
  mission: string;
  level: number;
  xp: number;
  spec: string;
  model: string;
  runtime: string;
}

const agents: Agent[] = [
  {
    id: 'main',
    name: 'Des_bot',
    type: 'cyber',
    role: 'Lead Agent / Commander',
    status: 'active',
    hp: 100,
    mission: 'Building, automating, assisting — all operations',
    level: 15,
    xp: 95,
    spec: 'Full-stack · Infra · Automation · Docs',
    model: 'minimax-m2.7:cloud',
    runtime: 'main session',
  },
  {
    id: 'guarddog',
    name: 'guarddog',
    type: 'guardian',
    role: 'Security Auditor',
    status: 'idle',
    hp: 100,
    mission: 'Nightly security audit — runs --deep, reports to Telegram',
    level: 8,
    xp: 60,
    spec: 'Security audit · Healthcheck · Config hardening',
    model: 'deepseek-v4-pro:cloud',
    runtime: 'isolated cron',
  },
  {
    id: 'daily_briefing',
    name: 'Daily Briefing',
    type: 'scout',
    role: 'Calendar Intelligence',
    status: 'idle',
    hp: 100,
    mission: 'Mon-Fri 8AM · iCloud CalDAV · Today + 2-day lookahead',
    level: 5,
    xp: 45,
    spec: 'iCloud CalDAV · Apple Calendar · Telegram delivery',
    model: 'deepseek-v4-pro:cloud',
    runtime: 'isolated cron',
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  idle: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  sleeping: 'bg-blue-50 text-blue-600 border-blue-200',
  error: 'bg-red-100 text-red-700 border-red-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  active: <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />,
  idle: <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />,
  sleeping: <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />,
  error: <PixelAlert size={10} className="text-red-500" />,
};

export default function AgentsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Agents</h1>
          <p className="text-xs text-gray-500 mt-0.5">{agents.length} agents registered · {agents.filter(a => a.status === 'active').length} active</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {agents.map(agent => (
          <div key={agent.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 flex items-start gap-4 bg-gray-50/50 border-b border-gray-100">
              <PixelAvatar agent={agent.type} size={48} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{agent.name}</h3>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium inline-flex items-center gap-1 ${statusColors[agent.status]}`}>
                    {statusIcons[agent.status]} {agent.status}
                  </span>
                  <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">#{agent.id}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">{agent.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[8px] bg-gray-900 text-white px-1.5 py-0.5 rounded font-mono">Lv.{agent.level}</span>
                  <span className="text-[8px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded font-mono">{agent.model}</span>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="px-5 py-3 border-b border-gray-100">
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">🎯 Current Mission</p>
              <p className="text-xs text-gray-700">{agent.mission}</p>
            </div>

            {/* HP + XP */}
            <div className="px-5 py-3 border-b border-gray-100 grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider">HP</span>
                  <span className="text-[10px] font-mono text-gray-700 flex items-center gap-1">
                    <PixelHeart size={10} className="text-red-400" /> {agent.hp}%
                  </span>
                </div>
                <PixelProgress value={agent.hp} max={100} variant="green" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider">XP</span>
                  <span className="text-[10px] font-mono text-gray-700">{agent.xp}%</span>
                </div>
                <PixelProgress value={agent.xp} max={100} variant="blue" />
              </div>
            </div>

            {/* Spec + Runtime */}
            <div className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-1 flex-wrap">
                {agent.spec.split(' · ').map(s => (
                  <span key={s} className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{s}</span>
                ))}
              </div>
              <span className="text-[9px] text-gray-400 font-mono">{agent.runtime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Agent schema */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Agent Schema</p>
        </div>
        <div className="px-5 py-3 grid grid-cols-12 gap-4 text-[10px]">
          <span className="col-span-1 font-mono text-gray-400">ID</span>
          <span className="col-span-3 font-semibold text-gray-700">Name + Role</span>
          <span className="col-span-2 text-gray-400">Type</span>
          <span className="col-span-2 text-gray-400">Model</span>
          <span className="col-span-2 text-gray-400">Runtime</span>
          <span className="col-span-2 text-gray-400">Status</span>
        </div>
        {agents.map(a => (
          <div key={a.id} className="px-5 py-2.5 grid grid-cols-12 gap-4 items-center border-t border-gray-50 hover:bg-gray-50/50 text-[11px]">
            <span className="col-span-1 font-mono text-gray-400">#{a.id}</span>
            <span className="col-span-3 font-medium text-gray-900">{a.name} <span className="text-gray-400 font-normal">— {a.role}</span></span>
            <span className="col-span-2 text-gray-600 capitalize">{a.type}</span>
            <span className="col-span-2 font-mono text-gray-500 text-[10px]">{a.model}</span>
            <span className="col-span-2 text-[10px] text-gray-400">{a.runtime}</span>
            <span className={`col-span-2 text-[9px] px-1.5 py-0.5 rounded border font-medium inline-flex items-center gap-1 ${statusColors[a.status]}`}>
              {statusIcons[a.status]} {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}