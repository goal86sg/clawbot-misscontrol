'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PixelSparkle, PixelAlert, PixelHeart, PixelCheck, PixelClock } from '@/lib/pixel-icons';

interface PulseEvent {
  id: string;
  type: 'agent' | 'cron' | 'system' | 'build' | 'deploy' | 'alert' | 'comm';
  label: string;
  detail: string;
  time: string;
  color: 'green' | 'blue' | 'purple' | 'yellow' | 'red' | 'gray';
  active?: boolean;
}

const colorClasses: Record<string, string> = {
  green: 'border-l-green-400 bg-green-50/40',
  blue:   'border-l-blue-400 bg-blue-50/40',
  purple: 'border-l-purple-400 bg-purple-50/40',
  yellow: 'border-l-yellow-400 bg-yellow-50/40',
  red:    'border-l-red-400 bg-red-50/40',
  gray:   'border-l-gray-300 bg-gray-50/30',
};

const colorDot: Record<string, string> = {
  green: 'bg-green-500',
  blue:   'bg-blue-500',
  purple: 'bg-purple-500',
  yellow: 'bg-yellow-500',
  red:    'bg-red-500',
  gray:   'bg-gray-400',
};

const typeIcon: Record<string, React.ReactNode> = {
  agent:   <PixelSparkle size={12} />,
  cron:    <PixelClock size={12} />,
  system:  <PixelCheck size={12} />,
  build:   <PixelSparkle size={12} />,
  deploy:  <PixelCheck size={12} />,
  alert:   <PixelAlert size={12} />,
  comm:    <PixelHeart size={12} />,
};

const now = new Date();
const sgtOffset = 8 * 60;
const sgtDate = new Date(now.getTime() + (sgtOffset - now.getTimezoneOffset()) * 60000);
const sgtStr = sgtDate.toISOString().replace('T', ' ').substring(0, 16);

const initialEvents: PulseEvent[] = [
  { id: '1', type: 'system', label: 'OpenClaw Heartbeat', detail: 'All systems nominal', time: sgtStr, color: 'green', active: true },
  { id: '2', type: 'cron', label: 'morning_scout:daily-digest', detail: 'Next run: Tomorrow 08:00 SGT', time: sgtStr, color: 'blue' },
  { id: '3', type: 'build', label: 'pixfetch v1.0', detail: 'Built & committed to scripts/', time: sgtStr, color: 'purple' },
  { id: '4', type: 'agent', label: 'Des_bot', detail: 'Nightly build session active', time: sgtStr, color: 'green', active: true },
  { id: '5', type: 'comm', label: 'Telegram', detail: 'Morning briefing delivered (1261)', time: sgtStr, color: 'blue' },
  { id: '6', type: 'system', label: 'Healthcheck Daily', detail: 'Scheduled 23:00 SGT — guarddog agent', time: sgtStr, color: 'gray' },
  { id: '7', type: 'build', label: 'Mission Control v2', detail: '7 new screens added (13 total)', time: sgtStr, color: 'purple' },
  { id: '8', type: 'agent', label: 'guarddog', detail: 'Security audit agent — 1 error last run', time: sgtStr, color: 'yellow' },
  { id: '9', type: 'cron', label: 'memory:dreaming-promotion', detail: 'SGT 23:59 daily — dream layer active', time: sgtStr, color: 'blue' },
  { id: '10', type: 'deploy', label: 'kahoot clone', detail: 'Pushed to github.com/goal86sg/kahoot', time: sgtStr, color: 'green' },
  { id: '11', type: 'system', label: 'Workspace stats', detail: '13 memory files · 13 scripts · 11 project dirs', time: sgtStr, color: 'gray' },
  { id: '12', type: 'alert', label: 'Docker not installed', detail: 'healthcheck cron failing — needs manual install', time: sgtStr, color: 'yellow' },
];

const fakeEvents: Omit<PulseEvent, 'id' | 'time'>[] = [
  { type: 'system', label: 'Cron tick', detail: 'Heartbeat check — all agents responding', color: 'gray' },
  { type: 'agent', label: 'Des_bot', detail: 'Processing morning briefing queue', color: 'green' },
  { type: 'comm', label: 'Telegram', detail: 'Message sent to @goal86sg · status: delivered', color: 'blue' },
  { type: 'cron', label: 'healthcheck:daily', detail: 'Security scan complete — no critical findings', color: 'green' },
  { type: 'build', label: 'Mission Control', detail: 'Rendering dashboard — 13 screens ready', color: 'purple' },
  { type: 'system', label: 'Disk I/O', detail: 'Write to memory/2026-05-08.md complete', color: 'gray' },
  { type: 'agent', label: 'guarddog', detail: 'Idle — next run in 4h 23m', color: 'yellow' },
  { type: 'cron', label: 'morning_scout', detail: 'Hacker News + GitHub Trending fetched', color: 'blue' },
  { type: 'system', label: 'pixfetch', detail: 'Script invoked — workspace stats compiled', color: 'green' },
];

function buildEvent(raw: Omit<PulseEvent, 'id' | 'time'>, idx: number): PulseEvent {
  const t = new Date(Date.now() + idx * 1000);
  const ts = t.toISOString().replace('T', ' ').substring(0, 16);
  return { ...raw, id: `live-${Date.now()}-${idx}`, time: ts };
}

export default function PulsePage() {
  const [events, setEvents] = useState<PulseEvent[]>(initialEvents);
  const [tick, setTick] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const feedRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Tick every 4 seconds — add a new fake event
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => {
        const next = t + 1;
        const src = fakeEvents[next % fakeEvents.length];
        setEvents(prev => {
          const newEvent = buildEvent(src, next);
          const nextEvents = [newEvent, ...prev].slice(0, 60);
          return nextEvents;
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to top when new events arrive
  useEffect(() => {
    if (autoScroll && feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [events, autoScroll]);

  const filters = ['all', 'agent', 'cron', 'system', 'build', 'alert'];
  const labels: Record<string, string> = {
    all: 'All',
    agent: 'Agents',
    cron: 'Cron',
    system: 'System',
    build: 'Builds',
    alert: 'Alerts',
  };

  const filtered = events.filter(e => filter === 'all' || e.type === filter);

  // Stats
  const stats = [
    { label: 'Events tracked', value: events.length.toString(), color: 'text-purple-600' },
    { label: 'Active agents', value: '2', color: 'text-green-600' },
    { label: 'Cron jobs', value: '3', color: 'text-blue-600' },
    { label: 'Uptime', value: '99.9%', color: 'text-gray-900' },
  ];

  const typeOrder: Record<string, number> = { alert: 0, agent: 1, build: 2, cron: 3, deploy: 4, comm: 5, system: 6 };

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Pulse</h1>
          <p className="text-xs text-gray-500 mt-0.5">Live activity feed — events stream in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Pulse indicator */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium">LIVE</span>
          </div>
          <div className="text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
            <PixelClock size={12} className="inline mr-1" />
            {new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Singapore' })} SGT
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{s.label}</p>
            <p className={`text-xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[10px] px-3 py-1.5 rounded-full font-medium transition-colors ${
              filter === f
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {labels[f]}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={e => setAutoScroll(e.target.checked)}
              className="accent-gray-900 w-3 h-3"
            />
            <span className="text-[10px] text-gray-400">auto-scroll</span>
          </label>
        </div>
      </div>

      {/* Feed */}
      <div
        ref={feedRef}
        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
        style={{ maxHeight: '520px', overflowY: 'auto' }}
      >
        <div className="px-5 py-2 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Stream</h2>
          <span className="text-[10px] text-gray-400">{filtered.length} events</span>
        </div>

        <div className="divide-y divide-gray-50">
          {[...filtered]
            .sort((a, b) => typeOrder[a.type] - typeOrder[b.type])
            .map((event, i) => (
              <div
                key={event.id}
                className={`px-5 py-3 border-l-4 flex items-start gap-3 ${colorClasses[event.color] ?? 'border-l-gray-300'}`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {/* Type icon */}
                <div className={`mt-0.5 p-1 rounded ${colorDot[event.color] ?? 'bg-gray-400'} bg-opacity-10`}>
                  <span className={colorDot[event.color] ?? 'bg-gray-400'}>
                    {typeIcon[event.type]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-900">{event.label}</p>
                    {event.active && (
                      <span className="flex items-center gap-0.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                      </span>
                    )}
                    <span className={`w-1.5 h-1.5 rounded-full ${colorDot[event.color] ?? 'bg-gray-400'}`} />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{event.detail}</p>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-mono whitespace-nowrap">
                  <PixelClock size={10} />
                  {event.time.substring(11)}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Watermark line */}
      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Pulse Feed · {events.length} events loaded
      </p>
    </div>
  );
}