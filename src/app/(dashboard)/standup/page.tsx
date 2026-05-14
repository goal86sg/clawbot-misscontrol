'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PixelClock, PixelCheck, PixelAlert, PixelHeart } from '@/lib/pixel-icons';
import { PixelCalendar, PixelTasks } from '@/lib/pixel-icons-extra';

// Fake data for demo — replace with real cron/agent data
const todayTasks = [
  { id: 1, text: 'Review eBPF DAM architecture doc', priority: 'high', done: false, project: 'eBPF' },
  { id: 2, text: 'Update Mission Control sidebar', priority: 'medium', done: true, project: 'MC' },
  { id: 3, text: 'Sync with guarddog on nightly audit', priority: 'medium', done: false, project: 'Agents' },
  { id: 4, text: 'Write spending tracker release notes', priority: 'low', done: false, project: 'Spending' },
];

const upcomingEvents = [
  { time: '09:00', title: 'Team standup', type: 'meeting' },
  { time: '14:00', title: '1:1 with manager', type: '1on1' },
  { time: '17:00', title: 'Sovereign Cloud review', type: 'review' },
];

const recentActivity = [
  { agent: 'main', action: 'Nightly build: Portfolio screen', time: '12h ago' },
  { agent: 'guarddog', action: 'Security audit completed', time: '14h ago' },
  { agent: 'main', action: 'Agents page update', time: '1d ago' },
  { agent: 'cron', action: 'Memory dreaming promotion', time: '1d ago' },
];

const quotes = [
  'Ship it, then make it better.',
  'Automate the boring stuff.',
  'Make it work, make it right, make it fast.',
  'The best error message is the one that never shows up.',
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning, Commander';
  if (h < 17) return 'Good afternoon, Commander';
  return 'Good evening, Commander';
}

function getDayName() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

function getDateStr() {
  return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default function StandupPage() {
  const [time, setTime] = useState('');
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Singapore',
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const priorityColors: Record<string, string> = {
    high: 'text-red-500',
    medium: 'text-yellow-600',
    low: 'text-gray-400',
  };

  return (
    <div className="max-w-5xl space-y-5">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded">
            STANDUP v1.0
          </div>
          <div className="text-xs font-mono text-gray-400">
            <span className="uppercase">{getDayName()}</span> · {getDateStr()}
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="text-gray-400">
            <span className="text-[9px] uppercase text-gray-300">SGT</span>{' '}
            <span className="text-gray-700">{time}</span>
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <div className="text-gray-400">
            <span className="text-[9px] uppercase text-gray-300">UTC</span>{' '}
            <span className="text-gray-700">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
            </span>
          </div>
        </div>
      </div>

      {/* Greeting + Quote */}
      <div className="bg-gray-900 rounded-lg px-5 py-4 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight">{getGreeting()}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 font-mono">
              Day {getDayOfYear()} of 365 · Week {Math.ceil(getDayOfYear() / 7)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-gray-500 font-mono uppercase">Quote of the day</div>
            <div className="text-[11px] text-gray-300 italic mt-0.5 max-w-xs">"{quote}"</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Tasks */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelTasks size={14} className="text-blue-500" />
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Today&apos;s Tasks</h2>
              <span className="ml-auto text-[9px] text-gray-400 font-mono">
                {todayTasks.filter(t => t.done).length}/{todayTasks.length} done
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {todayTasks.map(task => (
                <div key={task.id} className="px-4 py-2.5 flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-200'}`}>
                    {task.done && <PixelCheck size={10} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] ${task.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{task.text}</p>
                    <span className="text-[9px] text-gray-400">{task.project}</span>
                  </div>
                  <span className={`text-[9px] font-medium ${priorityColors[task.priority]} uppercase`}>{task.priority}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100">
              <Link href="/tasks" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">→ View all tasks</Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelPulse size={14} className="text-purple-500" />
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {recentActivity.map((item, i) => (
                <div key={i} className="px-4 py-2 flex items-center gap-3">
                  <span className="text-[9px] font-mono text-gray-400 w-16 shrink-0 bg-gray-100 px-1.5 py-0.5 rounded">{item.agent}</span>
                  <span className="text-[11px] text-gray-700 flex-1">{item.action}</span>
                  <span className="text-[9px] text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100">
              <Link href="/activity" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">→ View full activity</Link>
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          {/* Weather / Time */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <svg width="14" height="14" viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
                <rect x="3" y="0" width="2" height="1" fill="currentColor" />
                <rect x="2" y="1" width="4" height="1" fill="currentColor" />
                <rect x="1" y="2" width="6" height="4" fill="currentColor" />
                <rect x="0" y="3" width="1" height="2" fill="currentColor" />
                <rect x="7" y="3" width="1" height="2" fill="currentColor" />
                <rect x="3" y="6" width="2" height="2" fill="currentColor" opacity="0.5" />
              </svg>
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Weather</h2>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">28°C</div>
                  <div className="text-[10px] text-gray-500">Singapore, Haze</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-400">Humidity: 75%</div>
                  <div className="text-[10px] text-gray-400">Wind: 12 km/h</div>
                </div>
              </div>
              <div className="mt-2 text-[9px] text-gray-400">
                Sunrise 6:57 AM · Sunset 7:09 PM
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelCalendar size={14} className="text-green-500" />
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Calendar</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {upcomingEvents.map((ev, i) => (
                <div key={i} className="px-4 py-2.5 flex items-center gap-3">
                  <div className="text-[10px] font-mono text-gray-500 w-10 shrink-0">{ev.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-800 truncate">{ev.title}</p>
                    <span className="text-[9px] text-gray-400 capitalize">{ev.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100">
              <Link href="/calendar" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">→ View calendar</Link>
            </div>
          </div>

          {/* System Vitals Mini */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <PixelHeart size={14} className="text-red-400" />
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">System</h2>
            </div>
            <div className="px-4 py-2.5 space-y-1.5">
              {[
                { label: 'Main Agent', ok: true },
                { label: 'Guarddog', ok: true },
                { label: 'Nightly Build', ok: true },
                { label: 'Security Audit', ok: false },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600">{item.label}</span>
                  <span className={item.ok ? 'text-green-600' : 'text-red-600'}>
                    {item.ok ? '● ok' : '● error'}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100">
              <Link href="/vitals" className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">→ View vitals</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono bg-white border border-gray-200 rounded-lg px-4 py-2">
        <span>MISSION CONTROL · STANDUP</span>
        <div className="flex items-center gap-3">
          <span>🧠 Des_bot: <span className="text-gray-600">online</span></span>
          <span>🐕 guarddog: <span className="text-gray-600">idle</span></span>
          <span>⏰ Last sync: <span className="text-gray-600">just now</span></span>
        </div>
      </div>
    </div>
  );
}

function PixelPulse({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="3" width="1" height="2" fill="currentColor" />
      <rect x="2" y="1" width="1" height="6" fill="currentColor" />
      <rect x="4" y="0" width="1" height="8" fill="currentColor" />
      <rect x="6" y="2" width="1" height="4" fill="currentColor" />
    </svg>
  );
}