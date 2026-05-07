'use client';

import React from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelCheck, PixelAlert, PixelPlay, PixelClock, PixelSparkle } from '@/lib/pixel-icons';

const missions = [
  {
    id: 'M-044',
    title: 'Network Vulnerability Scan',
    status: 'in-progress',
    agent: 'Cyber-7',
    priority: 'high',
    progress: 64,
    started: 'Today 10:23',
    eta: '~18 min',
  },
  {
    id: 'M-043',
    title: 'Recon: Target Delta Profile',
    status: 'in-progress',
    agent: 'Scout-2',
    priority: 'critical',
    progress: 31,
    started: 'Today 09:45',
    eta: '~45 min',
  },
  {
    id: 'M-042',
    title: 'Database Audit',
    status: 'completed',
    agent: 'Cyber-7',
    priority: 'medium',
    progress: 100,
    started: 'Yesterday 14:20',
    eta: '—',
  },
  {
    id: 'M-041',
    title: 'API Endpoint Security Scan',
    status: 'completed',
    agent: 'Scout-2',
    priority: 'medium',
    progress: 100,
    started: 'Yesterday 11:05',
    eta: '—',
  },
  {
    id: 'M-040',
    title: 'Config Drift Validation',
    status: 'completed',
    agent: 'Engi-4',
    priority: 'low',
    progress: 100,
    started: 'May 5',
    eta: '—',
  },
  {
    id: 'M-039',
    title: 'Log Anomaly Analysis',
    status: 'failed',
    agent: 'Guard-1',
    priority: 'high',
    progress: 42,
    started: 'May 5',
    eta: '—',
  },
  {
    id: 'M-038',
    title: 'SSL Certificate Audit',
    status: 'completed',
    agent: 'Forge-5',
    priority: 'medium',
    progress: 100,
    started: 'May 4',
    eta: '—',
  },
  {
    id: 'M-045',
    title: 'Perimeter Defense Check',
    status: 'queued',
    agent: 'Guard-1',
    priority: 'high',
    progress: 0,
    started: '—',
    eta: '~12 min',
  },
];

const priorityStyles: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  medium: 'bg-blue-50 text-blue-700 border-blue-200',
  low: 'bg-gray-100 text-gray-500 border-gray-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  'in-progress': <PixelPlay size={12} className="text-blue-500" />,
  completed: <PixelCheck size={12} className="text-green-500" />,
  failed: <PixelAlert size={12} className="text-red-500" />,
  queued: <PixelClock size={12} className="text-gray-400" />,
};

const statusLabels: Record<string, string> = {
  'in-progress': 'IN PROGRESS',
  completed: 'COMPLETED',
  failed: 'FAILED',
  queued: 'QUEUED',
};

export default function MissionsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Missions</h1>
          <p className="text-xs text-gray-500 mt-0.5">8 missions · 2 active · 3 queued</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-600">
            <option>All Missions</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md font-medium hover:bg-gray-800 transition-colors">
            <PixelSparkle size={12} />
            NEW MISSION
          </button>
        </div>
      </div>

      {/* Mission Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div
          className="px-5 py-3 border-b border-gray-100 grid grid-cols-12 gap-4"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
            backgroundSize: '8px 100%',
          }}
        >
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-1">ID</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-4">Mission</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Agent</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-1">Priority</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Progress</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">ETA</span>
        </div>
        <div className="divide-y divide-gray-50">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`px-5 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-50/50 transition-colors ${
                mission.status === 'failed' ? 'bg-red-50/30' : ''
              } ${mission.status === 'completed' ? 'opacity-70' : ''}`}
            >
              {/* ID */}
              <span className="text-[11px] font-mono text-gray-400 col-span-1">{mission.id}</span>

              {/* Mission Title */}
              <div className="col-span-4 flex items-center gap-2 min-w-0">
                <span className="shrink-0">{statusIcons[mission.status]}</span>
                <span className="text-xs font-medium text-gray-900 truncate">{mission.title}</span>
              </div>

              {/* Agent */}
              <span className="text-[11px] text-gray-600 col-span-2">{mission.agent}</span>

              {/* Priority */}
              <span
                className={`col-span-1 text-[9px] px-1.5 py-0.5 rounded border font-medium uppercase ${priorityStyles[mission.priority]}`}
              >
                {mission.priority}
              </span>

              {/* Progress */}
              <div className="col-span-2 flex items-center gap-2">
                <PixelProgress
                  value={mission.progress}
                  max={100}
                  variant={
                    mission.status === 'failed'
                      ? 'red'
                      : mission.progress === 100
                      ? 'green'
                      : 'blue'
                  }
                />
                <span className="text-[10px] text-gray-400 w-7">{mission.progress}%</span>
              </div>

              {/* ETA / Status */}
              <div className="col-span-2 flex items-center gap-1.5">
                {mission.status === 'in-progress' ? (
                  <>
                    <PixelClock size={10} className="text-gray-400" />
                    <span className="text-[10px] text-gray-500">{mission.eta}</span>
                  </>
                ) : (
                  <span className="text-[10px] text-gray-400 uppercase font-medium">
                    {statusLabels[mission.status]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
