'use client';

import React, { useState } from 'react';
import { PixelSearch, PixelDocs as PixDoc } from '@/lib/pixel-icons-extra';

interface Doc {
  id: string;
  title: string;
  type: 'brief' | 'newsletter' | 'report' | 'script' | 'config' | 'presentation';
  project: string;
  created: string;
  size: string;
  summary: string;
  path: string;
}

const docs: Doc[] = [
  { id: 'D-001', title: 'Mission Control — Project Documentation', type: 'brief', project: 'Mission Control', created: '2026-05-07', size: '3.4 KB', summary: 'Full architecture, component catalog, all 6 screens documented', path: 'docs/projects/mission-control.md' },
  { id: 'D-002', title: 'Project Registry Index', type: 'report', project: 'Workspace', created: '2026-05-07', size: '0.5 KB', summary: 'Master index of all projects with status and links', path: 'docs/projects/INDEX.md' },
  { id: 'D-003', title: 'Sovereign Cloud — Automated PPTX', type: 'script', project: 'Sovereign Cloud', created: '2026-04-28', size: '1.2 KB', summary: 'Node.js script that generates a 6-slide Sovereign Cloud deck', path: 'scripts/create_sovereign_cloud_pptx.js' },
  { id: 'D-004', title: 'Daily Stock Update Script', type: 'script', project: 'Commute Tools', created: '2026-04-20', size: '0.8 KB', summary: 'Fetches stock prices and sends update via Telegram', path: 'scripts/send-stock-update.sh' },
  { id: 'D-005', title: 'Daily Route Check Script', type: 'script', project: 'Commute Tools', created: '2026-04-20', size: '0.9 KB', summary: 'Checks traffic/PT from Punggol to Suntec, sends to Telegram', path: 'scripts/send-route-update.sh' },
  { id: 'D-006', title: 'K8s News Monitor Pipeline', type: 'script', project: 'K8s News Monitor', created: '2026-04-18', size: '1.1 KB', summary: 'Aggregates K8s RSS feeds and delivers via cron', path: 'scripts/k8s-news-monitor.sh' },
  { id: 'D-007', title: 'Daily Security Audit Script', type: 'script', project: 'Mission Control', created: '2026-05-07', size: '1.6 KB', summary: 'Runs openclaw security audit --deep and reports findings', path: 'scripts/daily-security-audit.sh' },
  { id: 'D-008', title: 'Shopping List (shared)', type: 'config', project: 'Home', created: '2026-05-01', size: '0.3 KB', summary: 'Shared shopping list with categories', path: 'shopping_list.md' },
  { id: 'D-009', title: 'Sunday Invitation PPTX', type: 'presentation', project: 'Personal', created: '2026-04-25', size: '1.8 MB', summary: 'Invitation design for Sunday event', path: 'invitation-sunday.pptx' },
  { id: 'D-010', title: 'AGENTS.md — Workspace Rules', type: 'config', project: 'Workspace', created: '2026-04-14', size: '5.2 KB', summary: 'Complete workspace rules, memory protocol, heartbeat config', path: 'AGENTS.md' },
  { id: 'D-011', title: 'SOUL.md — Agent Identity', type: 'config', project: 'Workspace', created: '2026-04-14', size: '1.4 KB', summary: 'Core personality: helpful, opinionated, obsessive documenter', path: 'SOUL.md' },
  { id: 'D-012', title: 'eBPF DAM Architecture', type: 'brief', project: 'eBPF DAM', created: '2026-04-10', size: '2.1 KB', summary: 'Probe architecture: pg_parse_query hook + MyProcPort reader', path: 'docs/ebpf-architecture.md' },
];

const typeIcons: Record<string, string> = {
  brief: '📋',
  newsletter: '📰',
  report: '📊',
  script: '⚡',
  config: '⚙️',
  presentation: '🎬',
};

export default function DocsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selected, setSelected] = useState<Doc | null>(null);

  const filtered = docs.filter(d => {
    if (search && !d.title.toLowerCase().includes(search.toLowerCase()) && !d.summary.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && d.type !== typeFilter) return false;
    return true;
  });

  const types = ['all', ...new Set(docs.map(d => d.type))];

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Docs</h1>
          <p className="text-xs text-gray-500 mt-0.5">{docs.length} documents indexed · searchable</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <PixelSearch size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search docs..." value={search} onChange={e => setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-md pl-7 pr-3 py-1.5 w-48 outline-none focus:border-gray-400" />
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-600">
            {types.map(t => <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(doc => (
          <div key={doc.id}
            className={`bg-white border rounded-lg overflow-hidden transition-all cursor-pointer ${selected?.id === doc.id ? 'border-gray-400 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => setSelected(selected?.id === doc.id ? null : doc)}>
            <div className="px-5 py-3 flex items-center gap-3">
              <span className="text-lg">{typeIcons[doc.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900">{doc.title}</p>
                <p className="text-[10px] text-gray-400 truncate">{doc.summary}</p>
              </div>
              <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded capitalize">{doc.type}</span>
              <span className="text-[10px] text-gray-400">{doc.size}</span>
              <span className="text-[10px] text-gray-400 w-16 text-right">{doc.created}</span>
            </div>
            {selected?.id === doc.id && (
              <div className="border-t border-gray-100 px-5 py-3 bg-gray-50/50 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-gray-500">📁 /{doc.path}</p>
                  <p className="text-[9px] text-gray-400">Project: {doc.project} · Created: {doc.created}</p>
                </div>
                <button className="text-[10px] px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50">Open</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
