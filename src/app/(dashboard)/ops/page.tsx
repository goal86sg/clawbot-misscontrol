'use client';

import React, { useState, useEffect } from 'react';
import { PixelClock, PixelCheck, PixelAlert, PixelSparkle, PixelHeart, PixelPlay, PixelTerminal } from '@/lib/pixel-icons';
import { PixelOpsCenter, PixelAgents, PixelMission, PixelMonitor } from '@/lib/pixel-icons-extra';

// ─── Pixel Icons ─────────────────────────────────────────────────────────────

function PixelCpu({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-indigo-500">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.15" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      {/* Pins */}
      <rect x="0" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="4" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="7" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="7" y="4" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="0" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="0" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="7" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="7" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelMemory({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-green-500">
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.15" />
      <rect x="1" y="2" width="1" height="4" fill="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelDisk({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-yellow-500">
      <rect x="0" y="1" width="8" height="6" fill="currentColor" opacity="0.1" />
      <rect x="0" y="1" width="8" height="1" fill="currentColor" opacity="0.3" />
      <rect x="0" y="6" width="8" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="2" width="2" height="4" fill="currentColor" opacity="0.2" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelNetwork({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-cyan-500">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="2" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="2" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="3" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="1" y="4" width="1" height="2" fill="currentColor" />
      <rect x="6" y="4" width="1" height="2" fill="currentColor" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" />
      <rect x="3" y="6" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelUptime({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-pink-400">
      <rect x="3" y="0" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="4" height="3" fill="currentColor" opacity="0.3" />
      <rect x="0" y="3" width="2" height="1" fill="currentColor" />
      <rect x="6" y="3" width="2" height="1" fill="currentColor" />
      <rect x="2" y="5" width="4" height="2" fill="currentColor" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'sleep';
  tasks: number;
  load: number;
  color: string;
}

interface Mission {
  id: string;
  title: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'running' | 'queued' | 'done' | 'blocked';
  progress: number;
  agent: string;
  eta: string;
}

interface LogEntry {
  time: string;
  type: 'info' | 'warn' | 'error' | 'success';
  message: string;
  agent?: string;
}

interface SystemMetric {
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
  icon: React.ReactNode;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const agents: Agent[] = [
  { id: 'nightly-builder', name: 'Nightly Builder', role: 'Agent', status: 'active', tasks: 2, load: 78, color: '#8b5cf6' },
  { id: 'healthcheck', name: 'Healthcheck', role: 'Agent', status: 'active', tasks: 1, load: 12, color: '#10b981' },
  { id: 'heartbeat', name: 'Heartbeat', role: 'Agent', status: 'idle', tasks: 0, load: 2, color: '#6366f1' },
  { id: 'deploy-bot', name: 'Deploy Bot', role: 'Bot', status: 'sleep', tasks: 0, load: 0, color: '#f59e0b' },
  { id: 'guarddog', name: 'Guarddog', role: 'Security', status: 'active', tasks: 3, load: 45, color: '#ef4444' },
  { id: 'desss-assist', name: 'Desss Assist', role: 'Assistant', status: 'active', tasks: 7, load: 92, color: '#3b82f6' },
];

const missions: Mission[] = [
  { id: 'mc-048', title: 'eBPF PostgreSQL DAM — probe placement strategy', priority: 'P0', status: 'running', progress: 65, agent: 'nightly-builder', eta: '2h' },
  { id: 'mc-047', title: 'Sovereign cloud demo — Thursday stakeholder review', priority: 'P1', status: 'running', progress: 40, agent: 'desss-assist', eta: '4h' },
  { id: 'mc-046', title: 'eBPF integration tests — blocked on Monday PM', priority: 'P1', status: 'blocked', progress: 15, agent: 'deploy-bot', eta: '—' },
  { id: 'mc-045', title: 'PostgreSQL DAM architecture review doc', priority: 'P1', status: 'queued', progress: 0, agent: 'none', eta: '8h' },
  { id: 'mc-044', title: 'Mission Control v2.15 — screen 41 planning', priority: 'P2', status: 'done', progress: 100, agent: 'nightly-builder', eta: '—' },
  { id: 'mc-043', title: 'Weekly Review screen (39) — shipped', priority: 'P2', status: 'done', progress: 100, agent: 'nightly-builder', eta: '—' },
];

const activityLog: LogEntry[] = [
  { time: '19:58', type: 'success', message: 'Nightly build completed — Weekly Review screen shipped', agent: 'nightly-builder' },
  { time: '19:42', type: 'info', message: 'Healthcheck passed — all systems nominal', agent: 'healthcheck' },
  { time: '19:30', type: 'info', message: 'Deploy Bot went to sleep — no active deployments', agent: 'deploy-bot' },
  { time: '19:15', type: 'warn', message: 'Desss Assist load at 92% — consider batching tasks', agent: 'desss-assist' },
  { time: '18:55', type: 'info', message: 'Nightly build started — Weekly Review screen', agent: 'nightly-builder' },
  { time: '18:40', type: 'success', message: 'Day Review screen (38) committed and deployed', agent: 'nightly-builder' },
  { time: '18:20', type: 'info', message: 'Guarddog monitoring — SSH rules clean, no anomalies', agent: 'guarddog' },
  { time: '17:55', type: 'info', message: 'Heartbeat check-in — all clear', agent: 'heartbeat' },
  { time: '17:30', type: 'error', message: 'Docker container on staging restarted — memory spike resolved', agent: 'deploy-bot' },
  { time: '16:45', type: 'success', message: 'Workout Tracker screen (37) shipped', agent: 'nightly-builder' },
];

// ─── System Metrics (animated) ──────────────────────────────────────────────

function getSystemMetrics(): SystemMetric[] {
  const tick = Date.now();
  return [
    { label: 'CPU', value: 23 + Math.sin(tick / 3000) * 8, unit: '%', max: 100, color: '#6366f1', icon: <PixelCpu size={14} /> },
    { label: 'Memory', value: 61 + Math.sin(tick / 5000) * 4, unit: '%', max: 100, color: '#10b981', icon: <PixelMemory size={14} /> },
    { label: 'Disk', value: 43, unit: '%', max: 100, color: '#f59e0b', icon: <PixelDisk size={14} /> },
    { label: 'Network', value: 12 + Math.sin(tick / 2000) * 6, unit: 'MB/s', max: 100, color: '#06b6d4', icon: <PixelNetwork size={14} /> },
    { label: 'Uptime', value: 99.97 + Math.sin(tick / 7000) * 0.02, unit: '%', max: 100, color: '#ec4899', icon: <PixelUptime size={14} /> },
  ];
}

// ─── Pixel Progress Bar ──────────────────────────────────────────────────────

function PixelBar({ value, max = 100, color = '#3b82f6', height = 8 }: { value: number; max?: number; color?: string; height?: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const filled = Math.round((pct / 100) * height);
  return (
    <div className="flex flex-col-reverse gap-px">
      {Array.from({ length: height }, (_, i) => (
        <div key={i} className={`w-full rounded-sm ${i < filled ? '' : 'bg-gray-100'}`} style={i < filled ? { backgroundColor: color } : {}} />
      ))}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Agent['status'] }) {
  const cfg = {
    active: { dot: 'bg-green-500', label: 'Active', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    idle: { dot: 'bg-yellow-400', label: 'Idle', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    sleep: { dot: 'bg-gray-400', label: 'Sleep', bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[9px] font-medium ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === 'active' ? 'animate-pulse' : ''}`} />
      {cfg.label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Mission['priority'] }) {
  const cfg = {
    P0: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
    P1: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    P2: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  }[priority];
  return (
    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {priority}
    </span>
  );
}

function MissionStatusBadge({ status }: { status: Mission['status'] }) {
  const cfg = {
    running: { dot: 'bg-blue-500 animate-pulse', label: 'Running', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    queued: { dot: 'bg-yellow-400', label: 'Queued', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    done: { dot: 'bg-green-500', label: 'Done', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    blocked: { dot: 'bg-red-500', label: 'Blocked', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[9px] font-medium ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────

function SectionHeader({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{label}</h3>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function OpsPage() {
  const [tick, setTick] = useState(0);
  const [metrics, setMetrics] = useState<SystemMetric[]>(getSystemMetrics);
  const [expandedMission, setExpandedMission] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
      setMetrics(getSystemMetrics());
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const activeAgents = agents.filter(a => a.status === 'active');
  const runningMissions = missions.filter(m => m.status === 'running');
  const recentLog = activityLog.slice(0, 6);

  const logTypeColor: Record<LogEntry['type'], string> = {
    info: 'text-blue-400',
    warn: 'text-yellow-500',
    error: 'text-red-500',
    success: 'text-green-500',
  };

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <PixelOpsCenter size={24} className="text-indigo-500" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Operations Center</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Mission Control · Real-time systems overview
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
            <PixelClock size={12} />
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' })}</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {activeAgents.length} agents active
          </div>
        </div>
      </div>

      {/* System Health Strip */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 rounded-lg px-6 py-4">
        <div className="flex items-center gap-1 mb-3">
          <PixelOpsCenter size={14} className="text-indigo-400" />
          <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-widest">System Health</span>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {metrics.map(m => {
            const pct = m.value / m.max;
            return (
              <div key={m.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {m.icon}
                    <span className="text-[9px] text-gray-500 font-medium">{m.label}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700">
                    {typeof m.value === 'number' && m.value > 10 ? m.value.toFixed(0) : m.value.toFixed(2)}{m.unit}
                  </span>
                </div>
                <PixelBar value={pct * 100} max={100} color={m.color} height={6} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left column — Agents Panel */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Active Agents" icon={<PixelAgents size={12} className="text-purple-500" />} />
              <span className="text-[9px] font-mono text-gray-400">{activeAgents.length}/{agents.length}</span>
            </div>
            <div className="divide-y divide-gray-50">
              {agents.map(agent => (
                <div key={agent.id} className="px-4 py-2.5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: agent.color }} />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-gray-900 truncate">{agent.name}</p>
                        <p className="text-[9px] text-gray-400">{agent.role}</p>
                      </div>
                    </div>
                    <StatusBadge status={agent.status} />
                  </div>
                  {agent.status === 'active' && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[8px] text-gray-400">Load</span>
                          <span className="text-[8px] font-mono text-gray-500">{agent.load}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${agent.load}%`,
                              backgroundColor: agent.load > 80 ? '#ef4444' : agent.load > 50 ? '#f59e0b' : '#10b981',
                            }}
                          />
                        </div>
                      </div>
                      {agent.tasks > 0 && (
                        <span className="text-[8px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                          {agent.tasks}t
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Quick Stats" icon={<PixelMonitor size={12} className="text-cyan-500" />} />
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Total Agents</span>
                <span className="text-[11px] font-mono font-bold text-gray-900">{agents.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Active</span>
                <span className="text-[11px] font-mono font-bold text-green-600">{activeAgents.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Running Missions</span>
                <span className="text-[11px] font-mono font-bold text-blue-600">{runningMissions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Completed Today</span>
                <span className="text-[11px] font-mono font-bold text-purple-600">{missions.filter(m => m.status === 'done').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Blocked</span>
                <span className="text-[11px] font-mono font-bold text-red-500">{missions.filter(m => m.status === 'blocked').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle column — Missions */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Missions" icon={<PixelMission size={12} className="text-orange-500" />} />
              <span className="text-[9px] font-mono text-gray-400">{missions.length} total</span>
            </div>
            <div className="divide-y divide-gray-50">
              {missions.map(mission => {
                const isExpanded = expandedMission === mission.id;
                const agent = agents.find(a => a.id === mission.agent);
                return (
                  <div
                    key={mission.id}
                    className={`px-4 py-2.5 cursor-pointer hover:bg-gray-50/50 transition-colors ${mission.status === 'blocked' ? 'bg-red-50/30' : ''}`}
                    onClick={() => setExpandedMission(isExpanded ? null : mission.id)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[9px] font-mono text-gray-400 shrink-0">{mission.id}</span>
                        <PriorityBadge priority={mission.priority} />
                      </div>
                      <MissionStatusBadge status={mission.status} />
                    </div>
                    <p className="text-[11px] text-gray-700 leading-tight mb-1.5">{mission.title}</p>
                    <div className="flex items-center gap-3">
                      {agent && (
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: agent.color }} />
                          <span className="text-[9px] text-gray-400">{agent.name}</span>
                        </div>
                      )}
                      {mission.status === 'running' && (
                        <>
                          <div className="flex-1 flex items-center gap-1.5">
                            <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                                style={{ width: `${mission.progress}%` }}
                              />
                            </div>
                            <span className="text-[8px] font-mono text-gray-400">{mission.progress}%</span>
                          </div>
                          <span className="text-[8px] text-gray-400">ETA: {mission.eta}</span>
                        </>
                      )}
                      {mission.status === 'done' && (
                        <span className="text-[8px] text-green-600">✓ Complete</span>
                      )}
                      {mission.status === 'blocked' && (
                        <span className="text-[8px] text-red-500">⟳ Blocked</span>
                      )}
                      {mission.status === 'queued' && (
                        <span className="text-[8px] text-yellow-600">⏳ Queued · ETA: {mission.eta}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column — Activity Log + Actions */}
        <div className="space-y-4">
          {/* Activity Log */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Activity Feed" icon={<PixelTerminal size={12} className="text-gray-500" />} />
              <span className="text-[9px] font-mono text-gray-400">live</span>
            </div>
            <div className="px-4 py-2">
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {recentLog.map((entry, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[9px] font-mono text-gray-300 shrink-0 w-6">{entry.time}</span>
                    <span className={`text-[9px] ${logTypeColor[entry.type]} shrink-0`}>
                      {entry.type === 'success' ? '✓' : entry.type === 'error' ? '✗' : entry.type === 'warn' ? '⚠' : '·'}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-600 leading-tight">{entry.message}</p>
                      {entry.agent && (
                        <p className="text-[8px] text-gray-300 mt-0.5">
                          <span className="text-gray-400">→</span> {agents.find(a => a.id === entry.agent)?.name ?? entry.agent}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <SectionHeader label="Quick Actions" icon={<PixelSparkle size={12} className="text-yellow-500" />} />
            </div>
            <div className="px-4 py-3 space-y-1.5">
              {[
                { icon: <PixelPlay size={12} />, label: 'Trigger Healthcheck', color: 'text-green-600', bg: 'bg-green-50 hover:bg-green-100' },
                { icon: <PixelMission size={12} />, label: 'New Mission', color: 'text-orange-600', bg: 'bg-orange-50 hover:bg-orange-100' },
                { icon: <PixelAgents size={12} />, label: 'Spawn Agent', color: 'text-purple-600', bg: 'bg-purple-50 hover:bg-purple-100' },
                { icon: <PixelAlert size={12} />, label: 'Run Diagnostics', color: 'text-red-600', bg: 'bg-red-50 hover:bg-red-100' },
              ].map((action, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left ${action.bg}`}
                >
                  <span className={action.color}>{action.icon}</span>
                  <span className="text-[11px] text-gray-700 font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pixel footer decoration */}
      <div className="flex justify-center gap-0.5 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => {
          const hues = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981', '#06b6d4', '#0ea5e9', '#3b82f6'];
          return (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: hues[i % hues.length],
                opacity: Math.sin((i / 50) * Math.PI + tick * 0.2) * 0.4 + 0.6,
                transform: `scale(${Math.sin((i / 50) * Math.PI * 2 + tick * 0.15) * 0.3 + 0.7})`,
              }}
            />
          );
        })}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Operations Center · Screen 40 · Mission Control · {agents.length} agents tracked
      </p>
    </div>
  );
}