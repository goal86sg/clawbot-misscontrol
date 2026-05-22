'use client';

import React, { useState, useEffect } from 'react';
import { PixelSparkle, PixelCheck, PixelAlert, PixelClock, PixelTerminal } from '@/lib/pixel-icons';
import { PixelMonitor, PixelBuild, PixelPR } from '@/lib/pixel-icons-extra';

// ─── Pixel Heatmap Cell ───────────────────────────────────────────────────────

function HeatmapCell({ level }: { level: 0 | 1 | 2 | 3 | 4 }) {
  const colors = ['#f1f5f9', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1'];
  return (
    <div
      className="w-3 h-3 rounded-sm"
      style={{ backgroundColor: colors[level] }}
      title={['zero', 'low', 'medium', 'high', 'peak'][level]}
    />
  );
}

function CommitHeatmap({ weeks = 12 }: { weeks?: number }) {
  // Generate fake commit data
  const cells = Array.from({ length: weeks * 7 }, (_, i) => {
    const r = Math.random();
    const level = r > 0.7 ? 4 : r > 0.5 ? 3 : r > 0.3 ? 2 : r > 0.15 ? 1 : 0;
    return level as 0 | 1 | 2 | 3 | 4;
  });

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 mb-1">
        {Array.from({ length: weeks }, (_, w) => (
          <span key={w} className="text-[7px] text-gray-300 font-mono w-3 text-center">{w === 0 ? 'May' : ''}</span>
        ))}
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col gap-0.5">
          {dayLabels.map((l, i) => (
            <span key={i} className="text-[7px] text-gray-300 font-mono h-3 leading-3">{l}</span>
          ))}
        </div>
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-0.5">
            {cells.slice(w * 7, w * 7 + 7).map((level, d) => (
              <HeatmapCell key={d} level={level} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[8px] text-gray-400">Less</span>
        {[0, 1, 2, 3, 4].map(l => <HeatmapCell key={l} level={l as 0 | 1 | 2 | 3 | 4} />)}
        <span className="text-[8px] text-gray-400">More</span>
      </div>
    </div>
  );
}

// ─── Pixel Bar (vertical) ─────────────────────────────────────────────────────

function PixelBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const pct = (value / max) * 100;
  const filled = Math.max(1, Math.round((pct / 100) * 14));
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] font-mono text-gray-500">{value}</span>
      <div className="flex flex-col-reverse gap-px">
        {Array.from({ length: 14 }, (_, r) => (
          <div
            key={r}
            className="w-5 rounded-sm"
            style={{ height: 4, backgroundColor: r < filled ? color : '#e2e8f0' }}
          />
        ))}
      </div>
      <span className="text-[8px] text-gray-400">{label}</span>
    </div>
  );
}

// ─── Pipeline Stage ──────────────────────────────────────────────────────────

function PipelineStage({ label, status, duration }: { label: string; status: 'passed' | 'running' | 'failed' | 'pending'; duration?: string }) {
  const colors = {
    passed: 'bg-green-500',
    running: 'bg-blue-500 animate-pulse',
    failed: 'bg-red-500',
    pending: 'bg-gray-300',
  };
  const dotClass = { passed: 'bg-green-500', running: 'bg-blue-500', failed: 'bg-red-500', pending: 'bg-gray-300' };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${status === 'running' ? 'ring-2 ring-blue-300' : ''}`} style={{ backgroundColor: status === 'pending' ? '#f1f5f9' : 'transparent', border: status !== 'pending' ? '2px solid currentColor' : 'none', borderColor: 'transparent' }}>
        <div className={`w-4 h-4 rounded-full ${dotClass[status]}`} />
      </div>
      <span className="text-[9px] font-medium text-gray-600">{label}</span>
      {duration && <span className="text-[8px] text-gray-400">{duration}</span>}
      <span className="text-[8px] font-medium" style={{ color: status === 'passed' ? '#22c55e' : status === 'failed' ? '#ef4444' : status === 'running' ? '#3b82f6' : '#94a3b8' }}>{status}</span>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface Project {
  name: string;
  stage: 'production' | 'development' | 'experiment';
  status: 'healthy' | 'warning' | 'error' | 'deploying';
  language: string;
  commits: number;
  lastCommit: string;
  description: string;
}

const projects: Project[] = [
  { name: 'mission-control', stage: 'production', status: 'healthy', language: 'TypeScript', commits: 47, lastCommit: '2h ago', description: 'Pixel art command center dashboard' },
  { name: 'pixfetch', stage: 'production', status: 'healthy', language: 'Bash', commits: 12, lastCommit: '7h ago', description: 'Workspace stats fetcher script' },
  { name: 'ebpf-pg-dam', stage: 'development', status: 'warning', language: 'C', commits: 8, lastCommit: '1d ago', description: 'PostgreSQL eBPF DAM research' },
  { name: 'kahoot-clone', stage: 'experiment', status: 'deploying', language: 'Next.js', commits: 23, lastCommit: '3d ago', description: 'Real-time quiz app experiment' },
  { name: 'openclaw-config', stage: 'production', status: 'healthy', language: 'YAML', commits: 89, lastCommit: '12h ago', description: 'OpenClaw agent configuration' },
  { name: 'sovereign-pptx', stage: 'experiment', status: 'healthy', language: 'Python', commits: 5, lastCommit: '2d ago', description: 'AI-generated pitch deck builder' },
];

const statusColors = {
  healthy: { dot: 'bg-green-500', text: 'text-green-600', border: 'border-l-green-400' },
  warning: { dot: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-l-yellow-400' },
  error: { dot: 'bg-red-500', text: 'text-red-600', border: 'border-l-red-400' },
  deploying: { dot: 'bg-blue-500 animate-pulse', text: 'text-blue-600', border: 'border-l-blue-400' },
};

const stageColors = {
  production: 'bg-green-100 text-green-700',
  development: 'bg-blue-100 text-blue-700',
  experiment: 'bg-purple-100 text-purple-700',
};

// ─── PR Card ───────────────────────────────────────────────────────────────────

interface PR {
  title: string;
  repo: string;
  status: 'open' | 'merged' | 'closed';
  age: string;
  author: string;
  additions: number;
  deletions: number;
}

const prs: PR[] = [
  { title: 'feat: add Monitor screen (Screen 30)', repo: 'mission-control', status: 'open', age: '1h', author: 'main', additions: 312, deletions: 14 },
  { title: 'fix: sidebar nav highlighting', repo: 'mission-control', status: 'merged', age: '2d', author: 'guarddog', additions: 8, deletions: 8 },
  { title: 'chore: update pixel icons package', repo: 'mission-control', status: 'open', age: '3d', author: 'main', additions: 56, deletions: 3 },
  { title: 'feat: integrate vitals data API', repo: 'mission-control', status: 'merged', age: '5d', author: 'main', additions: 189, deletions: 42 },
];

const prColors = { open: 'bg-blue-50 border-l-blue-400', merged: 'bg-purple-50 border-l-purple-400', closed: 'bg-gray-50 border-l-gray-300' };
const prLabels = { open: '● open', merged: '◉ merged', closed: '○ closed' };

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function MonitorPage() {
  const [tick, setTick] = useState(0);
  const [filterStage, setFilterStage] = useState<string>('all');

  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Singapore' });

  const stages = ['all', 'production', 'development', 'experiment'];
  const stageLabels = { all: 'All', production: 'Production', development: 'Dev', experiment: 'Exp' };

  const filtered = filterStage === 'all' ? projects : projects.filter(p => p.stage === filterStage);

  const pipelineStages = [
    { label: 'build', status: 'passed' as const, duration: '1m 23s' },
    { label: 'test', status: 'passed' as const, duration: '3m 01s' },
    { label: 'scan', status: 'running' as const },
    { label: 'deploy', status: 'pending' as const },
  ];

  // Stats
  const stats = [
    { label: 'Projects', value: projects.length.toString(), color: 'text-blue-600', icon: PixelMonitor },
    { label: 'Healthy', value: projects.filter(p => p.status === 'healthy').length.toString(), color: 'text-green-600', icon: PixelCheck },
    { label: 'Commits today', value: '14', color: 'text-purple-600', icon: PixelTerminal },
    { label: 'PRs open', value: prs.filter(p => p.status === 'open').length.toString(), color: 'text-orange-600', icon: PixelPR },
  ];

  // Commit activity per day
  const weeklyCommits = [8, 12, 5, 14, 9, 3, 6];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <PixelMonitor size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Monitor</h1>
            <p className="text-xs text-gray-500 mt-0.5">DevOps overview — projects, builds, PRs</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[10px] text-gray-400 font-mono bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <PixelClock size={11} />
            {timeStr} SGT
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] text-gray-500 font-medium">live</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-gray-400" />
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{s.label}</p>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Pipeline + Commit Heatmap row */}
      <div className="grid grid-cols-3 gap-4">
        {/* CI/CD Pipeline */}
        <div className="col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <PixelBuild size={14} className="text-purple-500" />
            <h2 className="text-xs font-semibold text-gray-700">Pipeline</h2>
            <span className="ml-auto text-[9px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded font-medium">mission-control #47</span>
          </div>
          <div className="px-5 py-5">
            <div className="flex items-start justify-between gap-2">
              {pipelineStages.map((stage, i) => (
                <React.Fragment key={stage.label}>
                  <PipelineStage {...stage} />
                  {i < pipelineStages.length - 1 && (
                    <div className="flex-1 mt-4 flex items-center">
                      <div className="w-full h-0.5 bg-gray-200 rounded relative">
                        {i === 1 && (
                          <div className="absolute right-0 -top-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[9px] text-gray-400">Total duration</span>
              <span className="text-[10px] font-mono font-medium text-gray-700">4m 24s</span>
            </div>
          </div>
        </div>

        {/* Weekly Commit Chart */}
        <div className="col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <PixelTerminal size={14} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-700">Weekly Commits</h2>
          </div>
          <div className="px-5 py-5">
            <div className="flex items-end justify-between gap-2 h-28">
              {weeklyCommits.map((count, i) => {
                const height = Math.max(4, Math.round((count / 14) * 112));
                const isToday = i === new Date().getDay() - 1 || (new Date().getDay() === 0 && i === 6);
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                    <span className="text-[9px] font-mono text-gray-400">{count}</span>
                    <div
                      className="w-full rounded-sm transition-all"
                      style={{
                        height: height,
                        backgroundColor: isToday ? '#6366f1' : count > 10 ? '#a5b4fc' : count > 5 ? '#c7d2fe' : '#e0e7ff',
                      }}
                    />
                    <span className={`text-[8px] ${isToday ? 'text-indigo-600 font-semibold' : 'text-gray-400'}`}>{dayLabels[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* GitHub-style Heatmap */}
        <div className="col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <PixelClock size={14} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-700">Contribution</h2>
            <span className="ml-auto text-[9px] font-mono text-gray-400">12 weeks</span>
          </div>
          <div className="px-5 py-4">
            <CommitHeatmap weeks={12} />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PixelMonitor size={14} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-700">Project Health</h2>
          </div>
          <div className="flex items-center gap-1">
            {stages.map(s => (
              <button
                key={s}
                onClick={() => setFilterStage(s)}
                className={`text-[9px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                  filterStage === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {stageLabels[s as keyof typeof stageLabels]}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map(project => {
            const sc = statusColors[project.status];
            return (
              <div key={project.name} className={`px-5 py-4 border-l-4 ${sc.border} flex items-center gap-4 hover:bg-gray-50 transition-colors`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{project.name}</p>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    <span className={`text-[9px] font-medium ${sc.text}`}>{project.status}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${stageColors[project.stage]}`}>{project.stage}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{project.description}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-[9px] text-gray-400">{project.commits} commits</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{project.lastCommit}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{project.language}</span>
                    <PixelSparkle size={10} className="text-gray-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PR Status Board */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PixelPR size={14} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-700">Pull Requests</h2>
          </div>
          <span className="text-[10px] text-gray-400">{prs.filter(p => p.status === 'open').length} open · {prs.filter(p => p.status === 'merged').length} merged</span>
        </div>
        <div className="divide-y divide-gray-50">
          {prs.map((pr, i) => (
            <div key={i} className={`px-5 py-3 border-l-4 ${prColors[pr.status]} flex items-center gap-4 hover:bg-gray-50 transition-colors`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700">{pr.title}</span>
                  <span className="text-[9px] font-medium text-gray-500">{prLabels[pr.status]}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] text-gray-400 font-mono">{pr.repo}</span>
                  <span className="text-[9px] text-gray-300">·</span>
                  <span className="text-[9px] text-gray-400">by {pr.author}</span>
                  <span className="text-[9px] text-gray-300">·</span>
                  <span className="text-[9px] text-gray-400">{pr.age} ago</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-green-600 font-mono">+{pr.additions}</span>
                  <span className="text-[9px] text-red-500 font-mono">-{pr.deletions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Monitor · {projects.length} projects tracked
      </p>
    </div>
  );
}