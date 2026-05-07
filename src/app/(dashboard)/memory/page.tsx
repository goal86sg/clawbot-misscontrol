'use client';

import React, { useState } from 'react';
import { PixelSearch, PixelMemory as PixMem } from '@/lib/pixel-icons-extra';

const memoryEntries = [
  { date: '2026-05-07', title: 'Session Summary — Mission Control build + Security Audit setup', type: 'daily', tags: ['mission-control', 'security', 'spending-tracker'], lines: 120 },
  { date: '2026-05-06', title: 'Heartbeat checks + Stock update refinement', type: 'daily', tags: ['stocks', 'heartbeat'], lines: 45 },
  { date: '2026-05-05', title: 'eBPF probe debugging session', type: 'daily', tags: ['ebpf', 'postgres'], lines: 80 },
  { date: '2026-05-04', title: 'K8s news formatting + Telegram delivery pipeline', type: 'daily', tags: ['k8s', 'telegram'], lines: 55 },
  { date: '2026-05-03', title: 'Sovereign Cloud PPTX v2 deployed', type: 'daily', tags: ['sovereign-cloud', 'pptx'], lines: 35 },
  { date: '2026-05-02', title: 'Weekend: Route checker fix + stock API migration', type: 'daily', tags: ['route', 'stocks'], lines: 60 },
  { date: '2026-05-01', title: 'Labour Day — system maintenance', type: 'daily', tags: ['maintenance'], lines: 20 },
  { date: '2026-04-30', title: 'Weekly review + memory compaction', type: 'daily', tags: ['review', 'memory'], lines: 90 },
];

const longTermMemories = [
  { id: 'M-001', text: 'GitHub Work — eBPF PostgreSQL DAM: probe attaches to pg_parse_query + MyProcPort', source: 'memory/2026-04-20.md' },
  { id: 'M-002', text: 'Possible Lasting Truths: No strong candidate truths surfaced (Apr 10-17 period)', source: 'memory/2026-04-17.md' },
];

const MEMORY_DIR = '/home/goal86sg/.openclaw/workspace/memory';

export default function MemoryPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'daily' | 'longterm'>('daily');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const filteredDaily = memoryEntries.filter(e =>
    !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.tags.some(t => t.includes(search.toLowerCase()))
  );

  const filteredLong = longTermMemories.filter(e =>
    !search || e.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Memory</h1>
          <p className="text-xs text-gray-500 mt-0.5">{memoryEntries.length} daily files · {longTermMemories.length} long-term memories</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <PixelSearch size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search memory..." value={search} onChange={e => setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-md pl-7 pr-3 py-1.5 w-48 outline-none focus:border-gray-400" />
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
            <button onClick={() => setView('daily')} className={`text-[10px] px-3 py-1 rounded font-medium ${view === 'daily' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Daily</button>
            <button onClick={() => setView('longterm')} className={`text-[10px] px-3 py-1 rounded font-medium ${view === 'longterm' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Long-Term</button>
          </div>
        </div>
      </div>

      {view === 'daily' ? (
        <div className="space-y-3">
          {filteredDaily.map(entry => (
            <div key={entry.date}
              className={`bg-white border rounded-lg overflow-hidden transition-all ${selectedDay === entry.date ? 'border-gray-400 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="px-5 py-3 flex items-center gap-3 cursor-pointer" onClick={() => setSelectedDay(selectedDay === entry.date ? null : entry.date)}>
                <span className="text-[10px] font-mono text-gray-900 font-medium w-24">{entry.date}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">{entry.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-gray-100 text-gray-500 px-1 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">{entry.lines} lines</span>
              </div>
              {selectedDay === entry.date && (
                <div className="border-t border-gray-100 px-5 py-3 bg-gray-50/50">
                  <p className="text-[10px] font-mono text-gray-500 mb-2">📁 {MEMORY_DIR}/{entry.date}.md</p>
                  <div className="bg-gray-900 rounded-md p-3 font-mono text-[10px] text-green-400 leading-relaxed">
                    <span className="text-gray-500"># {entry.date}</span><br />
                    <span className="text-gray-500">## {entry.title}</span><br /><br />
                    <span className="text-gray-400">[Journal entry — {entry.lines} lines]</span><br />
                    <span className="text-gray-400">Build log, decisions, session summary</span><br />
                    <span className="text-gray-400">Tags: {entry.tags.join(', ')}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Long-Term Memory · MEMORY.md</p>
              {filteredLong.map(m => (
                <div key={m.id} className="py-2 border-b border-gray-50 last:border-0">
                  <p className="text-xs text-gray-900">{m.text}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5 font-mono">Source: {m.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
