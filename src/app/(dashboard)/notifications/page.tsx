'use client';

import React, { useState, useEffect } from 'react';
import { PixelBell } from '@/lib/pixel-icons-extra';

type NotifType = 'info' | 'success' | 'warning' | 'error' | 'agent' | 'cron' | 'build' | 'security';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  agent?: string;
  pinned?: boolean;
}

const typeColors: Record<NotifType, { bg: string; border: string; dot: string; text: string }> = {
  info:     { bg: 'bg-blue-50',   border: 'border-blue-200',   dot: 'bg-blue-500',   text: 'text-blue-700' },
  success:  { bg: 'bg-green-50',  border: 'border-green-200',  dot: 'bg-green-500',  text: 'text-green-700' },
  warning:  { bg: 'bg-yellow-50',  border: 'border-yellow-200', dot: 'bg-yellow-500', text: 'text-yellow-700' },
  error:    { bg: 'bg-red-50',    border: 'border-red-200',    dot: 'bg-red-500',    text: 'text-red-700' },
  agent:    { bg: 'bg-purple-50', border: 'border-purple-200', dot: 'bg-purple-500', text: 'text-purple-700' },
  cron:     { bg: 'bg-indigo-50', border: 'border-indigo-200', dot: 'bg-indigo-500', text: 'text-indigo-700' },
  build:    { bg: 'bg-cyan-50',   border: 'border-cyan-200',   dot: 'bg-cyan-500',   text: 'text-cyan-700' },
  security: { bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500', text: 'text-orange-700' },
};

const typeBadge: Record<NotifType, string> = {
  info:     'ℹ️',
  success:  '✅',
  warning:  '⚠️',
  error:    '🚨',
  agent:    '🤖',
  cron:     '⏰',
  build:    '⚡',
  security: '🔐',
};

const seed: Notification[] = [
  {
    id: 'n-001',
    type: 'security',
    title: 'Security Audit Complete',
    body: 'Deep audit: 4 findings (1 high group policy, 1 warning multi-user trust, 1 medium unpinned npm, 1 info). sandbox.mode=off applied. No critical exploits.',
    time: 'Today 00:05 SGT',
    read: false,
    pinned: true,
  },
  {
    id: 'n-002',
    type: 'cron',
    title: 'Morning Briefing Delivered — 0 events today | 2 tomorrow | 1 Thu',
    body: 'iCloud CalDAV + Tech Digest combined · sent to Telegram · next run tomorrow 08:00',
    time: 'Today 08:00 SGT',
    read: false,
    agent: 'daily_briefing',
  },
  {
    id: 'n-003',
    type: 'cron',
    title: 'morning_scout tech digest delivered',
    body: 'HN · K8s 1.36 · GitHub Trending · ArXiv · Claude Platform on AWS topped scoring',
    time: 'Today 08:00 SGT',
    read: false,
    agent: 'morning_scout',
  },
  {
    id: 'n-004',
    type: 'build',
    title: 'Screen 18: Notifications Center built',
    body: 'Full notification history hub · 8 types · grouped timeline · filter tabs · unread badge · v2.4.0',
    time: 'Today 04:00 SGT',
    read: false,
    agent: 'main',
  },
  {
    id: 'n-005',
    type: 'build',
    title: 'Screen 19: Daily Briefing Agent added to MC',
    body: 'Daily Briefing agent card added to Agents page · iCloud CalDAV wired · tech digest integrated',
    time: 'Today 03:30 SGT',
    read: true,
    agent: 'main',
  },
  {
    id: 'n-006',
    type: 'info',
    title: 'iCloud Calendar connected — 6 calendars found',
    body: 'apple-calendar-ops patched · Reminders · Home · Work · Davian · Daviel · DesReen Calendar',
    time: '10/05/26 SGT',
    read: true,
  },
  {
    id: 'n-007',
    type: 'build',
    title: 'Mission Control v2.4.0 — 18 screens shipped',
    body: 'Notifications Center · round robin builds · sandbox fixed · healthcheck fixed · Daily Briefing Agent',
    time: '09/05/26 SGT',
    read: true,
  },
  {
    id: 'n-008',
    type: 'warning',
    title: 'Docker sandbox unavailable — fall back to non-sandbox',
    body: 'Docker binary not in gateway PATH · agents.defaults.sandbox.mode=off applied · gateway restarted',
    time: '09/05/26 SGT',
    read: true,
  },
];

const FILTERS = ['All', 'Unread', 'Agent', 'Cron', 'Build', 'Security'] as const;
type Filter = typeof FILTERS[number];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(seed);
  const [filter, setFilter] = useState<Filter>('All');
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setAnimFrame(f => f + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const unread = notifs.filter(n => !n.read).length;
  const pinned = notifs.filter(n => n.pinned);

  const filtered = notifs.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return !n.read;
    if (filter === 'Agent') return n.type === 'agent';
    if (filter === 'Cron') return n.type === 'cron';
    if (filter === 'Build') return n.type === 'build';
    if (filter === 'Security') return n.type === 'security';
    return true;
  });

  const markRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const groupByTime = (items: Notification[]) => {
    const groups: { label: string; items: Notification[] }[] = [
      { label: 'Pinned', items: items.filter(n => n.pinned && !n.read) },
      { label: 'Just now', items: items.filter(n => n.time === 'Just now' && !n.pinned) },
      { label: 'Earlier today', items: items.filter(n => n.time.includes('SGT') && !n.pinned) },
      { label: 'Yesterday', items: items.filter(n => n.time === 'Yesterday' && !n.pinned) },
      { label: 'Earlier this week', items: items.filter(n => n.time.startsWith('2 days') || n.time.startsWith('3 days') || n.time.startsWith('4 days') || n.time.startsWith('5 days')) },
    ];
    return groups.filter(g => g.items.length > 0);
  };

  const groups = groupByTime(filtered);

  const pulse = animFrame % 2 === 0;

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <PixelBell size={20} className="text-yellow-500" />
            Notifications
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {unread === 0 ? 'All caught up' : `${unread} unread`} · {notifs.length} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Unread badge */}
          {unread > 0 && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full ${pulse ? 'animate-pulse' : ''}`}>
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-semibold text-red-700">{unread} unread</span>
            </div>
          )}
          {/* Mark all read */}
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {FILTERS.map(f => {
          const count = f === 'All' ? notifs.length
            : f === 'Unread' ? unread
            : notifs.filter(n => n.type === f.toLowerCase() as NotifType).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filter === f
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f}
              <span className={`ml-1.5 text-[10px] ${filter === f ? 'opacity-70' : 'opacity-50'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Notification groups */}
      <div className="space-y-6">
        {groups.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <PixelBell size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No notifications here</p>
            <p className="text-xs mt-1">Try a different filter</p>
          </div>
        )}

        {groups.map(group => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
              {group.label}
              <span className="ml-2 text-gray-300 font-normal">({group.items.length})</span>
            </p>
            <div className="space-y-2">
              {group.items.map(notif => {
                const colors = typeColors[notif.type];
                return (
                  <div
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className={`block rounded-xl border p-4 cursor-pointer transition-all hover:shadow-sm ${
                      colors.bg
                    } ${colors.border} ${notif.read ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Dot indicator */}
                      {!notif.read && (
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${colors.dot} animate-pulse`} />
                      )}
                      {notif.read && (
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-gray-300" />
                      )}

                      {/* Icon + content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{typeBadge[notif.type]}</span>
                          <span className={`text-xs font-semibold ${colors.text}`}>{notif.title}</span>
                          {notif.pinned && <span className="text-[9px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">📌 Pinned</span>}
                          {notif.agent && (
                            <span className="text-[9px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded font-mono">{notif.agent}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{notif.body}</p>
                        <p className="text-[10px] text-gray-400 mt-1.5 font-mono">{notif.time}</p>
                      </div>

                      {/* Mark read button (show on hover) */}
                      {!notif.read && (
                        <button
                          onClick={e => { e.stopPropagation(); markRead(notif.id); }}
                          className="text-[10px] text-gray-400 hover:text-gray-700 shrink-0 px-2 py-1 rounded border border-transparent hover:border-gray-300 transition-colors opacity-0 group-hover:opacity-100"
                          style={{ opacity: 1 }}
                        >
                          ✓ Read
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        {([
          ['Total', notifs.length, 'bg-gray-100', 'text-gray-700'],
          ['Unread', unread, 'bg-red-50', 'text-red-700'],
          ['Security', notifs.filter(n => n.type === 'security').length, 'bg-orange-50', 'text-orange-700'],
          ['Today', notifs.filter(n => n.time === 'Just now' || n.time.includes('SGT')).length, 'bg-blue-50', 'text-blue-700'],
        ] as [string, number, string, string][]).map(([label, count, bg, text]) => (
          <div key={label} className={`rounded-xl border border-gray-200 px-4 py-3 ${bg}`}>
            <p className={`text-xl font-bold ${text}`}>{count}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
