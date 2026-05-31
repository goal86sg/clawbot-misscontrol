'use client';

import React, { useState } from 'react';
import { PixelClock, PixelCheck, PixelAlert, PixelSparkle } from '@/lib/pixel-icons';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Repo {
  name: string;
  lang: string;
  langColor: string;
  stars: number;
  commits: number;
  prs: number;
  branches: number;
  lastCommit: string;
  description: string;
  status: 'active' | 'paused' | 'archived';
  size: 'xs' | 'sm' | 'md' | 'lg';
}

interface Commit {
  id: string;
  repo: string;
  message: string;
  author: string;
  time: string;
  additions: number;
  deletions: number;
  branch: string;
  hash: string;
  verified: boolean;
}

interface PR {
  id: string;
  title: string;
  repo: string;
  status: 'open' | 'merged' | 'closed';
  author: string;
  reviewers: string[];
  additions: number;
  deletions: number;
  created: string;
  updated: string;
}

// ─── Pixel Art Icons ────────────────────────────────────────────────────────

function PixelBranch({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
      <rect x="2" y="0" width="1" height="3" fill="currentColor" />
      <rect x="2" y="5" width="1" height="3" fill="currentColor" />
      <rect x="5" y="3" width="1" height="3" fill="currentColor" />
      <rect x="1" y="3" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="2" y="3" width="3" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2.5" y="2.5" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelCommit({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-500" shapeRendering="crispEdges">
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelPR({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-green-500" shapeRendering="crispEdges">
      <rect x="1" y="1" width="4" height="2" fill="currentColor" opacity="0.4" />
      <rect x="4" y="1" width="3" height="1" fill="currentColor" />
      <rect x="5" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      <rect x="1" y="6" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="5" width="3" height="1" fill="currentColor" />
      <rect x="3" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelMerge({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-600" shapeRendering="crispEdges">
      <rect x="1" y="0" width="1" height="3" fill="currentColor" opacity="0.5" />
      <rect x="1" y="4" width="1" height="3" fill="currentColor" opacity="0.5" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.6" />
      <rect x="1" y="3" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelStar({ size = 14, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={filled ? 'text-yellow-400' : 'text-gray-300'} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="1" width="6" height="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="2" width="8" height="4" fill="currentColor" opacity={filled ? "0.7" : "0.2"} />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" opacity={filled ? "0.9" : "0.3"} />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity={filled ? "1" : "0.4"} />
    </svg>
  );
}

function PixelFire({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="1" fill="currentColor" opacity="0.7" />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" />
      <rect x="2" y="5" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Pixel Contribution Graph ──────────────────────────────────────────────

function ContributionGraph() {
  const WEEKS = 20;
  const DAYS = 7;
  const INTENSITY: Record<number, string> = {
    0: 'bg-gray-100',
    1: 'bg-green-200',
    2: 'bg-green-300',
    3: 'bg-green-400',
    4: 'bg-green-600',
    5: 'bg-green-700',
  };

  // Seed with realistic activity pattern
  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const isWeekend = d >= 5;
      if (isWeekend) {
        col.push(Math.random() < 0.15 ? Math.floor(Math.random() * 3) + 1 : 0);
      } else {
        const base = Math.floor(Math.random() * 5);
        col.push(base);
      }
    }
    grid.push(col);
  }

  const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', ''];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-1">
          {dayLabels.map((d, i) => (
            <div key={i} className="h-3 flex items-center">
              <span className="text-[7px] text-gray-400 w-full">{d}</span>
            </div>
          ))}
        </div>
        {/* Weeks */}
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((val, di) => (
              <div
                key={di}
                className={`w-3 h-3 rounded-sm ${INTENSITY[Math.min(val, 5)]} hover:ring-1 hover:ring-gray-400 transition-colors cursor-default`}
                title={`${val} commit${val !== 1 ? 's' : ''} · ${['Sun','Mon','Tue','WedWed','Thu','Fri','Sat'][di]}`}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Month labels + legend */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-1 ml-8">
          {monthLabels.map((m, i) => (
            <span key={i} className="text-[8px] text-gray-400">{m}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] text-gray-400">Less</span>
          {[0, 1, 2, 3, 4, 5].map(l => (
            <div key={l} className={`w-2.5 h-2.5 rounded-sm ${INTENSITY[l]}`} />
          ))}
          <span className="text-[8px] text-gray-400">More</span>
        </div>
      </div>
    </div>
  );
}

// ─── Pixel Bar Chart ────────────────────────────────────────────────────────

function PixelBar({ value, max, color = 'bg-green-500' }: { value: number; max: number; color?: string }) {
  const filled = Math.round((value / max) * 20);
  return (
    <div className="flex flex-col-reverse gap-px">
      {Array.from({ length: 20 }, (_, r) => (
        <div
          key={r}
          className={`w-4 h-2 rounded-sm transition-colors ${r < filled ? color : 'bg-gray-100'}`}
        />
      ))}
    </div>
  );
}

// ─── Lang Colors ───────────────────────────────────────────────────────────

const langColors: Record<string, string> = {
  TypeScript: 'text-blue-400 bg-blue-400',
  Rust: 'text-orange-400 bg-orange-500',
  Go: 'text-cyan-400 bg-cyan-500',
  Python: 'text-yellow-400 bg-yellow-500',
  Shell: 'text-gray-400 bg-gray-400',
  HTML: 'text-red-400 bg-red-500',
  CSS: 'text-purple-400 bg-purple-500',
  SQL: 'text-green-400 bg-green-500',
  Nix: 'text-teal-400 bg-teal-500',
};

// ─── Data ────────────────────────────────────────────────────────────────

const repos: Repo[] = [
  { name: 'mission-control', lang: 'TypeScript', langColor: '#3b82f6', stars: 0, commits: 892, prs: 47, branches: 12, lastCommit: '2h ago', description: 'Pixel-art dashboard · 34 screens · Next.js + Tailwind', status: 'active', size: 'lg' },
  { name: 'ebpf-postgres-dam', lang: 'Rust', langColor: '#f97316', stars: 3, commits: 234, prs: 8, branches: 5, lastCommit: '1d ago', description: 'eBPF-based PostgreSQL Data Access Monitor', status: 'active', size: 'md' },
  { name: 'guarddog', lang: 'TypeScript', langColor: '#3b82f6', stars: 1, commits: 156, prs: 3, branches: 3, lastCommit: '14h ago', description: 'Security audit + hardening automation', status: 'active', size: 'sm' },
  { name: 'spending-tracker', lang: 'TypeScript', langColor: '#3b82f6', stars: 0, commits: 89, prs: 2, branches: 2, lastCommit: '3d ago', description: 'Personal finance dashboard', status: 'paused', size: 'sm' },
  { name: 'kahoot-clone', lang: 'TypeScript', langColor: '#3b82f6', stars: 2, commits: 67, prs: 1, branches: 1, lastCommit: '1w ago', description: 'Multiplayer quiz platform', status: 'archived', size: 'xs' },
];

const recentCommits: Commit[] = [
  { id: 'c1', repo: 'mission-control', message: '🌙 Nightly build: Reading Tracker — Screen 34', author: 'Des_bot', time: '2h ago', additions: 412, deletions: 38, branch: 'main', hash: '9018c3f', verified: true },
  { id: 'c2', repo: 'mission-control', message: 'docs: add nightly report for sleep tracker build', author: 'Des_bot', time: '5h ago', additions: 24, deletions: 0, branch: 'main', hash: '3d576ab', verified: true },
  { id: 'c3', repo: 'mission-control', message: '🌙 Nightly build: Sleep & Energy Tracker — Screen 33', author: 'Des_bot', time: '1d ago', additions: 380, deletions: 12, branch: 'main', hash: '35188d4', verified: true },
  { id: 'c4', repo: 'guarddog', message: 'Fix: unpinned npm dep — update openclaw package', author: 'guarddog', time: '1d ago', additions: 2, deletions: 2, branch: 'fix/npm-audit', hash: 'a7f3b21', verified: true },
  { id: 'c5', repo: 'ebpf-postgres-dam', message: 'Add connection-level metrics aggregation', author: 'goal86sg', time: '1d ago', additions: 156, deletions: 23, branch: 'feat/connection-metrics', hash: 'b2c9d44', verified: false },
  { id: 'c6', repo: 'mission-control', message: '🌙 Nightly build: Snippets — code snippet library (Screen 32)', author: 'Des_bot', time: '2d ago', additions: 290, deletions: 8, branch: 'main', hash: 'fe76d07', verified: true },
  { id: 'c7', repo: 'ebpf-postgres-dam', message: 'WIP: pg_stat_activity integration probe', author: 'goal86sg', time: '3d ago', additions: 89, deletions: 45, branch: 'feat/pg-stat', hash: 'c8e1f55', verified: false },
  { id: 'c8', repo: 'mission-control', message: '🌙 Nightly build: Docker — container management screen (Screen 31)', author: 'Des_bot', time: '3d ago', additions: 220, deletions: 15, branch: 'main', hash: '5461aa7', verified: true },
];

const pullRequests: PR[] = [
  { id: 'pr1', title: 'feat: connection-level metrics aggregation', repo: 'ebpf-postgres-dam', status: 'open', author: 'goal86sg', reviewers: ['reviewer1'], additions: 156, deletions: 23, created: '2d ago', updated: '4h ago' },
  { id: 'pr2', title: 'docs: update README with new screen info', repo: 'mission-control', status: 'open', author: 'Des_bot', reviewers: [], additions: 24, deletions: 0, created: '1d ago', updated: '1d ago' },
  { id: 'pr3', title: 'feat: pg_stat_activity monitoring probe', repo: 'ebpf-postgres-dam', status: 'merged', author: 'goal86sg', reviewers: ['reviewer1'], additions: 89, deletions: 45, created: '5d ago', updated: '3d ago' },
  { id: 'pr4', title: 'chore: upgrade Next.js to v15', repo: 'mission-control', status: 'merged', author: 'main', reviewers: [], additions: 12, deletions: 8, created: '1w ago', updated: '6d ago' },
];

// ─── Page ────────────────────────────────────────────────────────────────

export default function GitActivityPage() {
  const [tab, setTab] = useState<'feed' | 'repos' | 'prs'>('feed');
  const [tabFilter, setTabFilter] = useState<'open' | 'merged' | 'all'>('open');

  const totalCommits = repos.reduce((s, r) => s + r.commits, 0);
  const totalPRs = repos.reduce((s, r) => s + r.prs, 0);
  const openPRs = pullRequests.filter(p => p.status === 'open').length;
  const activeRepos = repos.filter(r => r.status === 'active').length;

  const langDist = [
    { lang: 'TypeScript', lines: 1240, color: '#3b82f6' },
    { lang: 'Rust', lines: 340, color: '#f97316' },
    { lang: 'Shell', lines: 180, color: '#9ca3af' },
    { lang: 'Python', lines: 120, color: '#eab308' },
    { lang: 'SQL', lines: 80, color: '#22c55e' },
  ];

  const filteredPRs = pullRequests.filter(p => {
    if (tabFilter === 'all') return true;
    return p.status === tabFilter;
  });

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 16 16" className="text-gray-900" shapeRendering="crispEdges">
              <rect x="1" y="4" width="4" height="8" fill="currentColor" opacity="0.4" />
              <rect x="2" y="5" width="2" height="6" fill="currentColor" />
              <rect x="6" y="1" width="4" height="8" fill="currentColor" opacity="0.3" />
              <rect x="7" y="2" width="2" height="6" fill="currentColor" opacity="0.4" />
              <rect x="11" y="3" width="4" height="10" fill="currentColor" opacity="0.2" />
              <rect x="12" y="4" width="2" height="8" fill="currentColor" opacity="0.3" />
              <rect x="3" y="2" width="2" height="2" fill="currentColor" opacity="0.6" />
              <rect x="8" y="0" width="2" height="1" fill="currentColor" opacity="0.5" />
              <rect x="3" y="2.5" width="1" height="1" fill="white" opacity="0.3" />
              <rect x="8" y="0.5" width="1" height="1" fill="white" opacity="0.3" />
            </svg>
            Git Activity
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Commit history · repositories · pull requests</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
          <PixelBranch size={12} />
          <span>goal86sg</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total Commits', value: totalCommits.toLocaleString(), sub: 'all time', color: 'text-gray-900', icon: <PixelCommit size={14} /> },
          { label: 'Repositories', value: repos.length.toString(), sub: `${activeRepos} active`, color: 'text-blue-600', icon: <PixelBranch size={14} /> },
          { label: 'Open PRs', value: openPRs.toString(), sub: `${totalPRs} total`, color: openPRs > 0 ? 'text-green-600' : 'text-gray-900', icon: <PixelPR size={14} /> },
          { label: 'Merged PRs', value: pullRequests.filter(p => p.status === 'merged').length.toString(), sub: 'all time', color: 'text-purple-600', icon: <PixelMerge size={14} /> },
          { label: 'Contributions', value: '142', sub: 'this month', color: 'text-orange-500', icon: <PixelFire size={14} /> },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-gray-400">{stat.icon}</span>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">{stat.label}</p>
            </div>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Contribution Graph */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contribution Activity</h2>
            <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
              <PixelFire size={12} />
              142 this month · +18% vs last month
            </span>
          </div>
        </div>
        <div className="px-5 py-4">
          <ContributionGraph />
        </div>
      </div>

      {/* Main Content: tabs */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Tab bar */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center gap-1">
            {(['feed', 'repos', 'prs'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-[10px] px-3 py-1.5 rounded font-medium transition-colors capitalize ${
                  tab === t ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {t}
                {t === 'feed' && <span className="ml-1 text-[9px] opacity-60">({recentCommits.length})</span>}
                {t === 'repos' && <span className="ml-1 text-[9px] opacity-60">({repos.length})</span>}
                {t === 'prs' && <span className="ml-1 text-[9px] opacity-60">({pullRequests.length})</span>}
              </button>
            ))}
          </div>
          {tab === 'prs' && (
            <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
              {(['open', 'merged', 'all'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setTabFilter(f)}
                  className={`text-[9px] px-2 py-1 rounded font-medium transition-colors capitalize ${
                    tabFilter === f ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Commit Feed */}
        {tab === 'feed' && (
          <div className="divide-y divide-gray-50">
            {recentCommits.map(commit => (
              <div key={commit.id} className="px-5 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <PixelCommit size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-medium text-gray-900">{commit.message}</p>
                      {commit.verified && (
                        <span className="flex items-center gap-0.5 text-[9px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                          <PixelCheck size={8} /> Verified
                        </span>
                      )}
                      <span className="text-[9px] text-gray-400 font-mono">{commit.hash}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[10px] text-gray-500">
                        <span className="text-gray-400">in</span>{' '}
                        <span className="font-medium text-gray-700">{commit.repo}</span>
                        <span className="text-gray-400 ml-1">on</span>{' '}
                        <span className="font-mono text-gray-600">{commit.branch}</span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        <PixelClock size={9} className="inline mr-0.5" />
                        {commit.time}
                      </span>
                      <span className="text-[10px] font-mono">
                        <span className="text-green-600">+{commit.additions}</span>
                        <span className="text-gray-300 mx-1">/</span>
                        <span className="text-red-500">-{commit.deletions}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Repos Grid */}
        {tab === 'repos' && (
          <div className="divide-y divide-gray-50">
            {repos.map(repo => (
              <div key={repo.name} className="px-5 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{repo.name}</p>
                      <span className={`text-[9px] px-2 py-0.5 rounded border font-medium ${
                        repo.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                        repo.status === 'paused' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {repo.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{repo.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      {/* Lang badge */}
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                        <span className="text-[10px] text-gray-500">{repo.lang}</span>
                      </div>
                      {/* Stats */}
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <PixelCommit size={10} />
                        {repo.commits.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <PixelPR size={10} />
                        {repo.prs}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <PixelBranch size={10} />
                        {repo.branches}
                      </span>
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-gray-400">
                          <PixelStar size={10} filled />
                          {repo.stars}
                        </span>
                      )}
                      <span className="text-[9px] text-gray-400 font-mono ml-auto">
                        <PixelClock size={9} className="inline mr-0.5" />
                        {repo.lastCommit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PR List */}
        {tab === 'prs' && (
          <div className="divide-y divide-gray-50">
            {filteredPRs.map(pr => (
              <div key={pr.id} className="px-5 py-3 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {pr.status === 'merged' ? (
                      <PixelMerge size={14} />
                    ) : pr.status === 'open' ? (
                      <PixelPR size={14} />
                    ) : (
                      <PixelAlert size={14} className="text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-semibold text-gray-900">{pr.title}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${
                        pr.status === 'open' ? 'bg-green-50 text-green-700 border-green-200' :
                        pr.status === 'merged' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {pr.status}
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono ml-auto">
                        {pr.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[10px] text-gray-500">
                        <span className="text-gray-400 font-mono">{pr.repo}</span>
                      </span>
                      <span className="text-[10px] text-gray-400">
                        by <span className="text-gray-600">{pr.author}</span>
                      </span>
                      {pr.reviewers.length > 0 && (
                        <span className="text-[10px] text-gray-400">
                          · {pr.reviewers.length} review{pr.reviewers.length !== 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="text-[10px] font-mono">
                        <span className="text-green-600">+{pr.additions}</span>
                        <span className="text-gray-300 mx-1">/</span>
                        <span className="text-red-500">-{pr.deletions}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Language Distribution */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden col-span-1">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Languages</h2>
          </div>
          <div className="px-5 py-4 space-y-3">
            {langDist.map(l => {
              const max = langDist[0].lines;
              return (
                <div key={l.lang} className="flex items-center gap-3">
                  <div className="w-24 text-[10px] text-gray-500 truncate">{l.lang}</div>
                  <PixelBar value={l.lines} max={max} color={l.color} />
                  <div className="w-10 text-right">
                    <span className="text-[10px] font-mono text-gray-600">{l.lines}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commit Activity Sparkline */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden col-span-2">
          <div className="px-5 py-3 border-b border-gray-100"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Commit Activity — Last 8 weeks</h2>
              <span className="text-[10px] text-gray-400 font-mono">WEEKLY</span>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="flex items-end gap-2 h-20">
              {[
                { w: 'W1', c: 14 }, { w: 'W2', c: 8 }, { w: 'W3', c: 22 },
                { w: 'W4', c: 18 }, { w: 'W5', c: 31 }, { w: 'W6', c: 27 },
                { w: 'W7', c: 12 }, { w: 'W8', c: 38 },
              ].map((week, i) => {
                const barH = Math.round((week.c / 40) * 80);
                const barColor = week.c > 25 ? 'bg-green-600' : week.c > 15 ? 'bg-green-400' : 'bg-green-200';
                return (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex flex-col-reverse gap-px" style={{ height: 80 }}>
                      <div className={`w-full rounded-sm transition-colors ${barColor}`} style={{ height: barH }} />
                    </div>
                    <span className="text-[8px] text-gray-400 font-mono">{week.w}</span>
                    <span className="text-[8px] text-gray-500">{week.c}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Git Activity · Screen 35 · Des_bot Nightly Build
      </p>
    </div>
  );
}
