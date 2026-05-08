'use client';

import React from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelCheck, PixelAlert, PixelClock, PixelHeart } from '@/lib/pixel-icons';

interface Mission {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'failed' | 'queued';
  agent: string;
  agentType: 'cyber' | 'guardian' | 'scout' | 'engineer';
  priority: 'critical' | 'high' | 'medium' | 'low';
  progress: number;
  schedule: string;
  sgtTime: string;
  lastRun: string;
  nextRun: string;
  description: string;
}

const missions: Mission[] = [
  {
    id: 'cron-001',
    title: 'Nightly Build Automation',
    status: 'queued',
    agent: 'main',
    agentType: 'cyber',
    priority: 'critical',
    progress: 0,
    schedule: '0 20 * * *',
    sgtTime: '04:00',
    lastRun: '7h ago',
    nextRun: 'in 17h',
    description: 'Spawns isolated agent to build something delightful while Desss sleeps',
  },
  {
    id: 'cron-002',
    title: 'Daily Security Audit',
    status: 'queued',
    agent: 'guarddog',
    agentType: 'guardian',
    priority: 'critical',
    progress: 0,
    schedule: '0 15 * * *',
    sgtTime: '23:00',
    lastRun: '12h ago',
    nextRun: 'Tonight 23:00',
    description: 'Runs openclaw security audit --deep and reports findings to Telegram',
  },
  {
    id: 'cron-003',
    title: 'Memory Dreaming Promotion',
    status: 'active',
    agent: 'system',
    agentType: 'scout',
    priority: 'medium',
    progress: 88,
    schedule: '0 3 * * *',
    sgtTime: '11:00',
    lastRun: '24h ago',
    nextRun: 'in 18m',
    description: 'Memory compaction + long-term truth extraction from daily logs',
  },
  {
    id: 'build-001',
    title: 'pixfetch v1.0 — workspace inspector CLI',
    status: 'completed',
    agent: 'main',
    agentType: 'cyber',
    priority: 'high',
    progress: 100,
    schedule: '—',
    sgtTime: '—',
    lastRun: '7h ago',
    nextRun: '—',
    description: 'Neofetch-style workspace inspector in Python, built by nightly builder',
  },
  {
    id: 'build-002',
    title: 'Mission Control v2.0 — 13 screens',
    status: 'completed',
    agent: 'main',
    agentType: 'cyber',
    priority: 'high',
    progress: 100,
    schedule: '—',
    sgtTime: '—',
    lastRun: '5h ago',
    nextRun: '—',
    description: '7 new screens added: Tasks, Calendar, Projects, Memory, Docs, Team, Office',
  },
  {
    id: 'build-003',
    title: 'Sovereign Cloud PPTX automation',
    status: 'completed',
    agent: 'main',
    agentType: 'engineer',
    priority: 'medium',
    progress: 100,
    schedule: '—',
    sgtTime: '—',
    lastRun: '2d ago',
    nextRun: '—',
    description: 'Node.js pipeline that generates a 6-slide Sovereign Cloud deck',
  },
];

const priorityStyles: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  medium: 'bg-blue-50 text-blue-700 border-blue-200',
  low: 'bg-gray-100 text-gray-500 border-gray-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  active: <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />,
  completed: <PixelCheck size={12} className="text-green-500" />,
  failed: <PixelAlert size={12} className="text-red-500" />,
  queued: <PixelClock size={12} className="text-gray-400" />,
};

const statusColors: Record<string, string> = {
  active: 'text-blue-600',
  completed: 'text-green-600',
  failed: 'text-red-600',
  queued: 'text-gray-500',
};

export default function MissionsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Missions</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {missions.length} missions · {missions.filter(m => m.status === 'active').length} active · {missions.filter(m => m.status === 'completed').length} completed
          </p>
        </div>
      </div>

      {/* Cron Schedule Info */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cron Schedule (SGT)</h2>
        </div>
        <div className="grid grid-cols-3 gap-0">
          {[
            { time: '04:00', job: 'Nightly Build', agent: 'main', color: 'text-purple-600 bg-purple-50' },
            { time: '11:00', job: 'Memory Dreaming', agent: 'system', color: 'text-blue-600 bg-blue-50' },
            { time: '23:00', job: 'Security Audit', agent: 'guarddog', color: 'text-red-600 bg-red-50' },
          ].map(slot => (
            <div key={slot.time} className="px-5 py-4 border-r border-gray-100 last:border-0">
              <p className="text-lg font-bold font-mono text-gray-900">{slot.time}</p>
              <p className="text-[10px] font-medium text-gray-500 mt-0.5">{slot.job}</p>
              <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${slot.color}`}>{slot.agent}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 grid grid-cols-12 gap-4"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-1">ID</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-4">Mission</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Agent</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-1">Priority</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Schedule</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Status</span>
        </div>
        <div className="divide-y divide-gray-50">
          {missions.map(mission => (
            <div key={mission.id} className={`px-5 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-50/50 ${mission.status === 'failed' ? 'bg-red-50/30' : ''}`}>
              <span className="text-[11px] font-mono text-gray-400 col-span-1">{mission.id}</span>
              <div className="col-span-4 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{mission.title}</p>
                <p className="text-[9px] text-gray-400 truncate mt-0.5">{mission.description}</p>
              </div>
              <div className="col-span-2 flex items-center gap-1.5">
                <PixelAvatar agent={mission.agentType} size={20} />
                <span className="text-[10px] text-gray-600">{mission.agent}</span>
              </div>
              <span className={`col-span-1 text-[9px] px-1.5 py-0.5 rounded border font-medium ${priorityStyles[mission.priority]}`}>
                {mission.priority}
              </span>
              <div className="col-span-2">
                <p className="text-[10px] font-mono text-gray-700">{mission.sgtTime !== '—' ? mission.sgtTime : 'ad-hoc'}</p>
                <p className="text-[8px] text-gray-400">{mission.schedule !== '—' ? mission.schedule : ''}</p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-1.5">
                  {statusIcons[mission.status]}
                  <span className={`text-[9px] font-medium uppercase ${statusColors[mission.status]}`}>{mission.status}</span>
                </div>
                {mission.status === 'active' && (
                  <div className="mt-1">
                    <PixelProgress value={mission.progress} max={100} variant="blue" />
                  </div>
                )}
                {mission.status === 'completed' && <span className="text-[8px] text-gray-400">Next: {mission.nextRun}</span>}
                {mission.status === 'queued' && <span className="text-[8px] text-gray-400">in {mission.nextRun}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}