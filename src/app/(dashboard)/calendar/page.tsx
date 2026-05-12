'use client';

import React, { useState } from 'react';
import { PixelClock, PixelCheck, PixelAlert } from '@/lib/pixel-icons';
import { PixelCalendar as PixelCal } from '@/lib/pixel-icons-extra';

interface CronEntry {
  name: string;
  schedule: string;
  sgtTime: string;
  agent: string;
  status: 'active' | 'idle' | 'ok' | 'failed';
  lastRun: string;
  nextRun: string;
  description: string;
}

const cronEntries: CronEntry[] = [
  { name: 'healthcheck:daily-security-audit', schedule: '0 15 * * *', sgtTime: '23:00', agent: 'guarddog', status: 'error', lastRun: '12h ago', nextRun: 'Today 23:00', description: 'Daily security audit — runs --deep, reports to Telegram' },
  { name: 'nightly:build-something-delightful', schedule: '0 20 * * *', sgtTime: '04:00', agent: 'main', status: 'ok', lastRun: '7h ago', nextRun: 'Tonight 04:00', description: 'Rotating builds — round robins mission-control, ebpf-postgres-dam, spending-tracker, guarddog' },
  { name: 'daily-briefing:morning-brief', schedule: '0 8 * * 1-5', sgtTime: '08:00', agent: 'daily_briefing', status: 'ok', lastRun: '3h ago', nextRun: 'Tomorrow 08:00', description: 'iCloud calendar briefing + tech digest — Mon-Fri 8AM · delivers to Telegram' },
  { name: 'morning_scout:daily-digest', schedule: '0 8 * * 1-5', sgtTime: '08:00', agent: 'morning_scout', status: 'ok', lastRun: '57m ago', nextRun: 'Tomorrow 08:00', description: 'Daily tech news: HN · Reddit · K8s/CNCF · GitHub · ArXiv · AI · scored + ranked' },
  { name: 'Memory Dreaming Promotion', schedule: '0 3 * * *', sgtTime: '11:00', agent: 'system', status: 'ok', lastRun: 'Yesterday 11:00', nextRun: 'Tomorrow 11:00', description: 'Memory compaction + long-term truth extraction from daily logs' },
];

const statusColors: Record<string, string> = {
  active: 'bg-blue-100 text-blue-700',
  idle: 'bg-gray-100 text-gray-500',
  ok: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

const statusIcons: Record<string, React.ReactNode> = {
  active: <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />,
  idle: <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />,
  ok: <PixelCheck size={12} className="text-green-500" />,
  failed: <PixelAlert size={12} className="text-red-500" />,
};

export default function CalendarPage() {
  const [view, setView] = useState<'list' | 'timeline'>('list');

  // Sort by SGT time
  const sorted = [...cronEntries].sort((a, b) => {
    const ta = a.sgtTime.split(':')[0];
    const tb = b.sgtTime.split(':')[0];
    return parseInt(ta) - parseInt(tb);
  });

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Calendar</h1>
          <p className="text-xs text-gray-500 mt-0.5">{cronEntries.length} cron jobs · {cronEntries.filter(c => c.status === 'active').length} active</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
          <button onClick={() => setView('list')} className={`text-[10px] px-3 py-1 rounded font-medium transition-colors ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>List</button>
          <button onClick={() => setView('timeline')} className={`text-[10px] px-3 py-1 rounded font-medium transition-colors ${view === 'timeline' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Timeline</button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 grid grid-cols-12 gap-4"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Time (SGT)</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-4">Job</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Agent</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Last Run</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider col-span-2">Status</span>
          </div>
          <div className="divide-y divide-gray-50">
            {sorted.map(cron => (
              <div key={cron.name} className="px-5 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-50/50">
                <div className="col-span-2 flex items-center gap-2">
                  <PixelClock size={14} className="text-gray-400" />
                  <span className="text-xs font-mono text-gray-700">{cron.sgtTime}</span>
                </div>
                <div className="col-span-4 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{cron.name}</p>
                  <p className="text-[9px] text-gray-400 truncate">{cron.description}</p>
                </div>
                <span className="col-span-2 text-[10px] text-gray-600">{cron.agent}</span>
                <span className="col-span-2 text-[10px] text-gray-400">{cron.lastRun}</span>
                <span className={`col-span-2 text-[9px] px-1.5 py-0.5 rounded font-medium inline-flex items-center gap-1 ${statusColors[cron.status]}`}>
                  {statusIcons[cron.status]}{cron.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Timeline view */
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="relative pl-12">
            {/* Hour markers */}
            {['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'].map(hour => (
              <div key={hour} className="flex items-center mb-8">
                <span className="absolute left-0 text-[10px] font-mono text-gray-400 w-10">{hour}</span>
                {/* Dots for jobs at this hour */}
                {sorted.filter(c => c.sgtTime.startsWith(hour.slice(0, 2)) || (hour === '00:00' && c.sgtTime === 'Every 3h')).map(c => (
                  <div key={c.name} className="ml-4 flex items-center gap-3 bg-gray-50 rounded-md px-3 py-2 border border-gray-200">
                    <div className={`w-2 h-2 rounded-full ${c.status === 'active' ? 'bg-blue-500' : c.status === 'ok' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <p className="text-[10px] font-medium text-gray-900">{c.name}</p>
                      <p className="text-[8px] text-gray-400">{c.description.slice(0, 60)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="absolute left-[38px] top-2 bottom-2 w-px bg-gray-200" />
          </div>
        </div>
      )}
    </div>
  );
}
