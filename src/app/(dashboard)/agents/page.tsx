'use client';

import React from 'react';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelHeart, PixelSparkle, PixelPlay } from '@/lib/pixel-icons';

const agents = [
  {
    name: 'Cyber-7',
    type: 'cyber' as const,
    role: 'Network Scanner',
    status: 'active',
    hp: 92,
    mission: 'Port sweep on subnet 10.0.1.0/24',
    level: 12,
    xp: 78,
    spec: 'Vulnerability Detection',
    online: '3h 42m',
  },
  {
    name: 'Scout-2',
    type: 'scout' as const,
    role: 'Recon Unit',
    status: 'active',
    hp: 88,
    mission: 'OSINT gathering - target profile Delta',
    level: 9,
    xp: 45,
    spec: 'OSINT Collection',
    online: '6h 15m',
  },
  {
    name: 'Engi-4',
    type: 'engineer' as const,
    role: 'Systems Engineer',
    status: 'idle',
    hp: 100,
    mission: '—',
    level: 15,
    xp: 92,
    spec: 'Infrastructure',
    online: '0h 2m',
  },
  {
    name: 'Guard-1',
    type: 'guardian' as const,
    role: 'Security Watchdog',
    status: 'active',
    hp: 76,
    mission: 'Perimeter breach monitoring',
    level: 11,
    xp: 63,
    spec: 'Threat Detection',
    online: '12h 08m',
  },
  {
    name: 'Byte-9',
    type: 'cyber' as const,
    role: 'Data Miner',
    status: 'offline',
    hp: 0,
    mission: '—',
    level: 8,
    xp: 31,
    spec: 'Pattern Recognition',
    online: '—',
  },
  {
    name: 'Echo-3',
    type: 'scout' as const,
    role: 'Signal Interceptor',
    status: 'maintenance',
    hp: 45,
    mission: '—',
    level: 7,
    xp: 18,
    spec: 'Signal Analysis',
    online: '0h 0m',
  },
  {
    name: 'Forge-5',
    type: 'engineer' as const,
    role: 'Build Specialist',
    status: 'active',
    hp: 95,
    mission: 'CI/CD pipeline audit',
    level: 14,
    xp: 87,
    spec: 'DevOps',
    online: '2h 20m',
  },
];

const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  idle: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  offline: 'bg-gray-100 text-gray-400 border-gray-200',
  maintenance: 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function AgentsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Agents</h1>
          <p className="text-xs text-gray-500 mt-0.5">7 agents deployed · 5 active</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md font-medium hover:bg-gray-800 transition-colors">
          <PixelSparkle size={12} />
          DEPLOY AGENT
        </button>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${
              agent.status === 'offline' ? 'opacity-50' : ''
            }`}
          >
            <div className="px-5 py-4 flex items-start gap-4">
              <PixelAvatar agent={agent.type} size={48} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">{agent.name}</h3>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded border font-medium uppercase ${statusStyles[agent.status]}`}
                  >
                    {agent.status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {agent.role} · Lv.{agent.level} · {agent.spec}
                </p>

                {/* HP Bar */}
                {agent.status !== 'offline' && (
                  <div className="flex items-center gap-2 mt-3">
                    <PixelHeart size={12} className="text-red-400" />
                    <PixelProgress
                      value={agent.hp}
                      max={100}
                      variant={agent.hp > 90 ? 'green' : agent.hp > 70 ? 'yellow' : 'red'}
                    />
                    <span className="text-[10px] text-gray-400">{agent.hp}%</span>
                  </div>
                )}

                {/* XP Bar */}
                {agent.status !== 'offline' && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <PixelSparkle size={12} className="text-blue-400" />
                    <PixelProgress value={agent.xp} max={100} variant="blue" />
                    <span className="text-[10px] text-gray-400">XP {agent.xp}%</span>
                  </div>
                )}

                {/* Mission */}
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <PixelPlay size={10} className="text-gray-400" />
                    <span className="text-[10px] text-gray-500">
                      {agent.status === 'active' ? agent.mission : 'No active mission'}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">Online: {agent.online}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
