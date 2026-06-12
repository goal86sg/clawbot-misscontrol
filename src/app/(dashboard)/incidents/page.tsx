'use client';

import React, { useState } from 'react';
import { PixelAlert, PixelClock, PixelCheck, PixelSparkle } from '@/lib/pixel-icons';

// ─── Types ────────────────────────────────────────────────────────────────────

type Severity = 'p0' | 'p1' | 'p2' | 'p3';
type Status = 'active' | 'mitigated' | 'resolved' | 'postmortem';

interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: Status;
  startedAt: string;
  duration: string;
  impacted: string[];
  assignee: string;
  summary: string;
  blamelessNotes: string;
  nextSteps: string[];
  tags: string[];
}

// ─── Pixel Icons ──────────────────────────────────────────────────────────────

function PixelFire({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`inline-block ${className}`} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelSkull({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`inline-block ${className}`} shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="2" fill="currentColor" />
      <rect x="1" y="2" width="6" height="4" fill="currentColor" />
      <rect x="2" y="3" width="1" height="1" fill="white" />
      <rect x="5" y="3" width="1" height="1" fill="white" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" />
      <rect x="2" y="6" width="1" height="2" fill="currentColor" />
      <rect x="5" y="6" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelWarning({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`inline-block ${className}`} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="1" y="1" width="6" height="2" fill="currentColor" />
      <rect x="2" y="3" width="4" height="3" fill="currentColor" />
      <rect x="2" y="6" width="1" height="2" fill="currentColor" />
      <rect x="5" y="6" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelInfo({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`inline-block ${className}`} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="5" fill="currentColor" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelLightning({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`inline-block ${className}`} shapeRendering="crispEdges">
      <rect x="4" y="0" width="2" height="2" fill="currentColor" />
      <rect x="2" y="2" width="3" height="2" fill="currentColor" />
      <rect x="1" y="4" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelHeartbeat({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`inline-block ${className}`} shapeRendering="crispEdges">
      <rect x="0" y="3" width="1" height="2" fill="currentColor" />
      <rect x="1" y="2" width="1" height="4" fill="currentColor" />
      <rect x="2" y="0" width="1" height="8" fill="currentColor" />
      <rect x="3" y="1" width="1" height="6" fill="currentColor" />
      <rect x="4" y="0" width="1" height="8" fill="currentColor" />
      <rect x="5" y="2" width="1" height="4" fill="currentColor" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

// ─── Severity Config ─────────────────────────────────────────────────────────

const severityConfig: Record<Severity, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: React.ReactElement;
  order: number;
}> = {
  p0: {
    label: 'P0 — Critical',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    icon: <PixelSkull size={14} />,
    order: 0,
  },
  p1: {
    label: 'P1 — High',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    icon: <PixelFire size={14} />,
    order: 1,
  },
  p2: {
    label: 'P2 — Medium',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    icon: <PixelWarning size={14} />,
    order: 2,
  },
  p3: {
    label: 'P3 — Low',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    icon: <PixelInfo size={14} />,
    order: 3,
  },
};

const statusConfig: Record<Status, {
  label: string;
  color: string;
  bgColor: string;
  dotColor: string;
  badgeColor: string;
}> = {
  active: {
    label: 'Active',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    dotColor: 'bg-red-500',
    badgeColor: 'bg-red-100 text-red-700',
  },
  mitigated: {
    label: 'Mitigated',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    dotColor: 'bg-yellow-500',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
  resolved: {
    label: 'Resolved',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    dotColor: 'bg-green-500',
    badgeColor: 'bg-green-100 text-green-700',
  },
  postmortem: {
    label: 'Postmortem',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    dotColor: 'bg-purple-500',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const incidents: Incident[] = [
  {
    id: 'INC-2026-041',
    title: 'PostgreSQL DAM probe memory spike on db-prod-03',
    severity: 'p0',
    status: 'postmortem',
    startedAt: '2026-06-10 14:32 SGT',
    duration: '2h 17m',
    impacted: ['eBPF DAM', 'PostgreSQL monitoring', 'Alerting pipeline'],
    assignee: 'desss',
    summary: 'The DAM probe running on db-prod-03 encountered an unexpected memory spike during a batch analytics query, causing the eBPF map to fill and dropping all probe events for 2+ hours.',
    blamelessNotes: 'Root cause: unbounded ring buffer growth under high-cardinality query patterns. The probe was not accounting for variable-length string fields in the query fingerprint. Contributing factor: monitoring dashboards were set to 5min resolution, so the spike wasn\'t caught until the buffer exhausted. No alerting on probe memory usage itself.',
    nextSteps: [
      'Add probe memory usage metric + alert at >80% of allowed map entries',
      'Implement cardinality limiting on query fingerprint extraction (cap at 256 bytes)',
      'Update runbook with memory buffer sizing for different instance classes',
      'Add health check endpoint to probe that reports map fill percentage',
    ],
    tags: ['eBPF', 'PostgreSQL', 'memory', 'probe', 'dam'],
  },
  {
    id: 'INC-2026-040',
    title: 'Docker container restart loop on staging guarddog',
    severity: 'p1',
    status: 'resolved',
    startedAt: '2026-06-08 09:15 SGT',
    duration: '34m',
    impacted: ['staging guarddog', 'CI/CD pipeline'],
    assignee: 'desss',
    summary: 'Guarddog container entered a restart loop after a misconfigured health check interval was deployed. The container kept restarting every 10 seconds, exhausting container logs.',
    blamelessNotes: 'The health check interval was changed from 30s to 1s in a config update without adjusting the grace period. Docker interpreted the 1s interval as a failed health check immediately after startup, triggering restart. Hotfix reverted the config within 34 minutes.',
    nextSteps: [
      'Add validation rule: health check interval must be >= 5s',
      'Document health check configuration standards in runbook',
    ],
    tags: ['Docker', 'guarddog', 'staging', 'healthcheck'],
  },
  {
    id: 'INC-2026-039',
    title: 'Mission Control sidebar not loading for non-admin users',
    severity: 'p2',
    status: 'resolved',
    startedAt: '2026-06-05 16:45 SGT',
    duration: '1h 12m',
    impacted: ['Mission Control', 'non-admin users'],
    assignee: 'desss',
    summary: 'Sidebar navigation failed to render for non-admin users due to a role check that was accidentally inverted during the permissions refactor on June 4th.',
    blamelessNotes: 'A one-character change flipped `!==` to `===` in the role check, causing non-admin users to be treated as admins for data but not for UI rendering. Caught when a team member tested the new permissions model on their own account.',
    nextSteps: [
      'Add integration test covering role-based sidebar rendering',
      'Add pre-commit hook to run permission-related unit tests',
    ],
    tags: ['Next.js', 'permissions', 'sidebar', 'auth'],
  },
  {
    id: 'INC-2026-038',
    title: 'Suntec office network latency spike',
    severity: 'p2',
    status: 'resolved',
    startedAt: '2026-06-03 10:05 SGT',
    duration: '45m',
    impacted: ['Suntec office network', 'VPN', 'All office services'],
    assignee: 'desss',
    summary: 'Network latency from office to cloud services spiked to 400ms+ due to ISP routing change during scheduled maintenance.',
    blamelessNotes: 'ISP performed an unplanned route change during the maintenance window, causing traffic to be routed through a suboptimal path. Latency returned to normal after ISP corrected the route.',
    nextSteps: [
      'Request ISP provide 48h advance notice of any routing changes',
      'Consider backup ISP for critical infrastructure',
    ],
    tags: ['network', 'latency', 'office', 'ISP'],
  },
  {
    id: 'INC-2026-037',
    title: 'Passive income tracker showing stale data',
    severity: 'p3',
    status: 'resolved',
    startedAt: '2026-06-01 08:00 SGT',
    duration: '6h',
    impacted: ['Passive income dashboard'],
    assignee: 'desss',
    summary: 'Income data was cached with a 24h TTL but the underlying data source only updated daily. This caused the tracker to show yesterday\'s data during the early morning hours.',
    blamelessNotes: 'Expected behavior — cache was working correctly but the refresh window was misaligned with the data availability window. Fixed by adjusting the cache TTL to expire at 6AM when new data is available.',
    nextSteps: [
      'Add cache expiry indicator to dashboard',
    ],
    tags: ['income', 'cache', 'stale data'],
  },
];

// ─── Pixel Timeline Dot ───────────────────────────────────────────────────────

function TimelineDot({ color }: { color: string }) {
  return (
    <div className={`w-3 h-3 rounded-sm ${color} shrink-0`} />
  );
}

// ─── MTTR Stat ───────────────────────────────────────────────────────────────

function MTTRBar({ mttr, severity }: { mttr: string; severity: Severity }) {
  const minutes = parseInt(mttr);
  const maxMinutes = severity === 'p0' ? 180 : severity === 'p1' ? 240 : severity === 'p2' ? 360 : 720;
  const pct = Math.min(100, (minutes / maxMinutes) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full ${severity === 'p0' ? 'bg-red-400' : severity === 'p1' ? 'bg-orange-400' : severity === 'p2' ? 'bg-yellow-400' : 'bg-blue-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[9px] font-mono text-gray-400 w-10 text-right">{mttr}</span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function IncidentsPage() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'list' | 'stats' | 'timeline'>('list');

  // Derive filtered incidents
  const filtered = incidents.filter(inc => {
    if (filterSeverity !== 'all' && inc.severity !== filterSeverity) return false;
    if (filterStatus !== 'all' && inc.status !== filterStatus) return false;
    if (filterTag !== 'all' && !inc.tags.includes(filterTag)) return false;
    return true;
  });

  // Gather all unique tags
  const allTags = Array.from(new Set(incidents.flatMap(i => i.tags))).sort();

  // Stats
  const activeIncidents = incidents.filter(i => i.status === 'active');
  const avgMTTR = (() => {
    const durations = [137, 34, 72, 45, 360]; // in minutes
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    const hrs = Math.floor(avg / 60);
    const mins = Math.round(avg % 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  })();

  const severityCounts = {
    p0: incidents.filter(i => i.severity === 'p0').length,
    p1: incidents.filter(i => i.severity === 'p1').length,
    p2: incidents.filter(i => i.severity === 'p2').length,
    p3: incidents.filter(i => i.severity === 'p3').length,
  };

  return (
    <div className="max-w-7xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Incident Review</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {incidents.length} incidents tracked · {activeIncidents.length} active
            {activeIncidents.length > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 text-red-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Requires attention
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-md p-0.5 gap-0.5">
            {(['list', 'stats', 'timeline'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] px-3 py-1 rounded transition-colors font-medium uppercase tracking-wider ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Incident Banner */}
      {activeIncidents.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <PixelSkull size={20} className="text-red-500 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Active Incident{activeIncidents.length > 1 ? 's' : ''}</span>
                <span className="bg-red-100 text-red-700 text-[9px] font-mono px-1.5 py-0.5 rounded">{activeIncidents.length}</span>
              </div>
              {activeIncidents.map(inc => (
                <button
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className="block text-sm text-red-800 hover:text-red-900 hover:underline text-left"
                >
                  {inc.id} — {inc.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Row */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-4 gap-4">
          {/* Severity breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">By Severity</span>
            </div>
            <div className="px-4 py-3 space-y-2">
              {(['p0', 'p1', 'p2', 'p3'] as Severity[]).map(sev => {
                const cfg = severityConfig[sev];
                const count = severityCounts[sev];
                return (
                  <div key={sev} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center ${cfg.bgColor} border ${cfg.borderColor}`}>
                      <span className={cfg.color}>{cfg.icon}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 flex-1">{sev.toUpperCase()}</span>
                    <span className="text-[11px] font-mono font-bold text-gray-900">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MTTR */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Avg MTTR</span>
            </div>
            <div className="px-4 py-4 text-center">
              <div className="text-2xl font-bold text-gray-900 font-mono">{avgMTTR}</div>
              <p className="text-[9px] text-gray-400 mt-1">mean time to resolve</p>
            </div>
          </div>

          {/* Resolution rate */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Resolution Rate</span>
            </div>
            <div className="px-4 py-4 text-center">
              <div className="text-2xl font-bold text-gray-900 font-mono">
                {Math.round((incidents.filter(i => i.status === 'resolved' || i.status === 'postmortem').length / incidents.length) * 100)}%
              </div>
              <p className="text-[9px] text-gray-400 mt-1">
                {incidents.filter(i => i.status === 'resolved' || i.status === 'postmortem').length}/{incidents.length} closed
              </p>
            </div>
          </div>

          {/* Postmortem rate */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Postmortems</span>
            </div>
            <div className="px-4 py-4 text-center">
              <div className="text-2xl font-bold text-purple-600 font-mono">
                {incidents.filter(i => i.status === 'postmortem').length}
              </div>
              <p className="text-[9px] text-gray-400 mt-1">completed</p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline View */}
      {activeTab === 'timeline' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Incident Timeline</span>
          </div>
          <div className="divide-y divide-gray-50">
            {[...incidents]
              .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
              .map((inc, i) => {
                const cfg = severityConfig[inc.severity];
                const stCfg = statusConfig[inc.status];
                return (
                  <div
                    key={inc.id}
                    className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedIncident(inc)}
                  >
                    <TimelineDot color={cfg.bgColor.replace('bg-', '').replace('-50', '-200')} />
                    <div className={`w-2 h-2 rounded-sm ${cfg.bgColor} border ${cfg.borderColor} flex items-center justify-center`}>
                      <span className={`${cfg.color}`}>{cfg.icon}</span>
                    </div>
                    <div className="w-28 shrink-0">
                      <span className="text-[10px] font-mono text-gray-400">{inc.id}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{inc.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[9px] font-medium ${stCfg.color}`}>{stCfg.label}</span>
                        <span className="text-[9px] text-gray-300">·</span>
                        <span className="text-[9px] text-gray-400">{inc.startedAt}</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <MTTRBar mttr={inc.duration} severity={inc.severity} />
                    </div>
                    <div className="shrink-0">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${stCfg.badgeColor}`}>
                        {stCfg.label}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-[9px] text-gray-400 uppercase tracking-wider">
          <PixelFilter size={10} />
          Filter:
        </div>
        {/* Severity */}
        <select
          value={filterSeverity}
          onChange={e => setFilterSeverity(e.target.value as Severity | 'all')}
          className="text-[10px] border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white outline-none focus:border-gray-400"
        >
          <option value="all">All Severity</option>
          <option value="p0">P0 Critical</option>
          <option value="p1">P1 High</option>
          <option value="p2">P2 Medium</option>
          <option value="p3">P3 Low</option>
        </select>
        {/* Status */}
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as Status | 'all')}
          className="text-[10px] border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white outline-none focus:border-gray-400"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="mitigated">Mitigated</option>
          <option value="resolved">Resolved</option>
          <option value="postmortem">Postmortem</option>
        </select>
        {/* Tag */}
        <select
          value={filterTag}
          onChange={e => setFilterTag(e.target.value)}
          className="text-[10px] border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white outline-none focus:border-gray-400"
        >
          <option value="all">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <span className="text-[9px] text-gray-400 ml-auto">
          {filtered.length} incident{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Incident List */}
      {activeTab === 'list' && (
        <div className="space-y-2">
          {filtered.map(inc => {
            const cfg = severityConfig[inc.severity];
            const stCfg = statusConfig[inc.status];
            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`bg-white border rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm hover:-translate-y-px ${cfg.borderColor}`}
              >
                <div className="flex items-start gap-3">
                  {/* Severity icon */}
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${cfg.bgColor}`}>
                    <span className={cfg.color}>{cfg.icon}</span>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-gray-400">{inc.id}</span>
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${stCfg.badgeColor}`}>
                        {stCfg.label}
                      </span>
                      {inc.status === 'active' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">{inc.title}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{inc.summary}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-[9px] text-gray-400">
                        <PixelClock size={10} />
                        <span>{inc.startedAt}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-gray-400">
                        <PixelLightning size={10} />
                        <span>{inc.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-gray-400">
                        <PixelHeartbeat size={10} />
                        <span>{inc.impacted[0]}</span>
                        {inc.impacted.length > 1 && (
                          <span className="text-gray-300">+{inc.impacted.length - 1}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
                    <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                      {inc.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[8px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-[9px] text-gray-400 mt-1">
                      @{inc.assignee}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Panel */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/20 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedIncident(null); }}>
          <div className="w-[560px] h-full bg-white shadow-2xl overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            {/* Panel header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-400">{selectedIncident.id}</span>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${statusConfig[selectedIncident.status].badgeColor}`}>
                    {statusConfig[selectedIncident.status].label}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-gray-900 mt-0.5">{selectedIncident.title}</h2>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-gray-400 hover:text-gray-700 text-lg leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Panel body */}
            <div className="px-6 py-5 space-y-6">
              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Severity</div>
                  <div className={`flex items-center gap-1.5 ${severityConfig[selectedIncident.severity].color}`}>
                    {severityConfig[selectedIncident.severity].icon}
                    <span className="text-xs font-bold">{severityConfig[selectedIncident.severity].label.split('—')[0].trim()}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Duration</div>
                  <div className="flex items-center gap-1.5 text-orange-600">
                    <PixelLightning size={12} />
                    <span className="text-xs font-bold">{selectedIncident.duration}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Started</div>
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <PixelClock size={12} />
                    <span className="text-[11px] font-medium">{selectedIncident.startedAt}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md px-3 py-2.5">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Assignee</div>
                  <div className="text-xs font-bold text-gray-900">@{selectedIncident.assignee}</div>
                </div>
              </div>

              {/* Impacted services */}
              <div>
                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Impacted</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIncident.impacted.map(s => (
                    <span key={s} className="bg-red-50 text-red-600 text-[10px] px-2 py-1 rounded border border-red-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Summary</h4>
                <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 rounded-md p-3">
                  {selectedIncident.summary}
                </p>
              </div>

              {/* Blameless postmortem */}
              {(selectedIncident.status === 'postmortem' || selectedIncident.status === 'resolved') && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <PixelSparkle size={10} className="text-purple-500" />
                    <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Blameless Postmortem</h4>
                  </div>
                  <div className="bg-purple-50 rounded-md p-3 border border-purple-100">
                    <p className="text-[11px] text-gray-700 leading-relaxed">{selectedIncident.blamelessNotes}</p>
                  </div>
                </div>
              )}

              {/* Next steps */}
              {selectedIncident.nextSteps.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Next Steps</h4>
                  <div className="space-y-1.5">
                    {selectedIncident.nextSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-sm bg-gray-900 text-white text-[9px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                          {i + 1}
                        </div>
                        <p className="text-[11px] text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIncident.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-gray-300 font-mono">
        <span>Mission Control · Incident Review · Screen 43</span>
        <span>{incidents.length} incidents · MTTR {avgMTTR}</span>
      </div>
    </div>
  );
}

// ─── Pixel Filter Icon ───────────────────────────────────────────────────────

function PixelFilter({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="1" width="8" height="1" fill="currentColor" />
      <rect x="0" y="3" width="6" height="1" fill="currentColor" />
      <rect x="0" y="5" width="4" height="1" fill="currentColor" />
      <rect x="0" y="7" width="2" height="1" fill="currentColor" />
    </svg>
  );
}