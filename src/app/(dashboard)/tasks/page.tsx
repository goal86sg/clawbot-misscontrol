'use client';

import React, { useState, useEffect } from 'react';
import { PixelCheck, PixelPlay, PixelClock } from '@/lib/pixel-icons';
import { PixelPulse, PixelSearch } from '@/lib/pixel-icons-extra';

interface Task {
  id: string;
  title: string;
  status: 'backlog' | 'in-progress' | 'done';
  assignedTo: string;
  project: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  created: string;
  completed?: string;
}

const initialTasks: Task[] = [
  { id: 'T-001', title: 'Generate weekly K8s news digest', status: 'done', assignedTo: 'Des_bot', project: 'K8s Monitor', priority: 'medium', created: '2026-05-01', completed: '2026-05-07' },
  { id: 'T-002', title: 'Audit eBPF probe memory footprint', status: 'backlog', assignedTo: 'Des_bot', project: 'eBPF DAM', priority: 'high', created: '2026-05-02' },
  { id: 'T-003', title: 'Build spending tracker CSV parser', status: 'done', assignedTo: 'Des_bot', project: 'Spending Tracker', priority: 'high', created: '2026-05-02', completed: '2026-05-07' },
  { id: 'T-004', title: 'Add PDF statement support', status: 'done', assignedTo: 'Des_bot', project: 'Spending Tracker', priority: 'critical', created: '2026-05-03', completed: '2026-05-07' },
  { id: 'T-005', title: 'Deploy spending tracker to Vercel', status: 'done', assignedTo: 'Des_bot', project: 'Spending Tracker', priority: 'high', created: '2026-05-03', completed: '2026-05-07' },
  { id: 'T-006', title: 'Nightly build automation cron setup', status: 'done', assignedTo: 'Des_bot', project: 'Mission Control', priority: 'critical', created: '2026-05-03', completed: '2026-05-07' },
  { id: 'T-007', title: 'Add system vitals screen', status: 'done', assignedTo: 'Des_bot', project: 'Mission Control', priority: 'medium', created: '2026-05-04', completed: '2026-05-07' },
  { id: 'T-008', title: 'Mission Control dashboard screens', status: 'in-progress', assignedTo: 'Des_bot', project: 'Mission Control', priority: 'critical', created: '2026-05-04' },
  { id: 'T-009', title: 'guarddog agent security audit setup', status: 'done', assignedTo: 'Des_bot', project: 'Mission Control', priority: 'high', created: '2026-05-04', completed: '2026-05-07' },
  { id: 'T-010', title: 'PostgreSQL query fingerprinting', status: 'backlog', assignedTo: 'Desss', project: 'eBPF DAM', priority: 'high', created: '2026-05-05' },
  { id: 'T-011', title: 'Bank statement image OCR pipeline', status: 'backlog', assignedTo: 'Des_bot', project: 'Spending Tracker', priority: 'low', created: '2026-05-06' },
  { id: 'T-012', title: 'Monthly spending report automation', status: 'backlog', assignedTo: 'Des_bot', project: 'Spending Tracker', priority: 'medium', created: '2026-05-06' },
  { id: 'T-013', title: 'Route checker: real-time bus/train ETA', status: 'backlog', assignedTo: 'Des_bot', project: 'Commute Tools', priority: 'medium', created: '2026-05-06' },
  { id: 'T-014', title: 'Memory search via semantic embeddings', status: 'backlog', assignedTo: 'Des_bot', project: 'Mission Control', priority: 'low', created: '2026-05-06' },
  { id: 'T-015', title: 'Sovereign cloud PPTX automation', status: 'done', assignedTo: 'Des_bot', project: 'Sovereign Cloud', priority: 'high', created: '2026-04-28', completed: '2026-05-02' },
];

const priorityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  medium: 'bg-blue-50 text-blue-700 border-blue-200',
  low: 'bg-gray-100 text-gray-500 border-gray-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  backlog: <span className="text-gray-300 text-xs">○</span>,
  'in-progress': <PixelPulse size={12} className="text-blue-500" />,
  done: <PixelCheck size={12} className="text-green-500" />,
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = tasks.filter(t => {
    if (filter !== 'all' && t.status !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.project.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const backlog = filtered.filter(t => t.status === 'backlog');
  const inProgress = filtered.filter(t => t.status === 'in-progress');
  const done = filtered.filter(t => t.status === 'done');

  const moveTask = (id: string, to: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: to, ...(to === 'done' ? { completed: new Date().toISOString().slice(0, 10) } : {}) } : t));
  };

  const Column = ({ title, items, status }: { title: string; items: Task[]; status: Task['status'] }) => (
    <div className="bg-gray-50/50 rounded-lg p-3 min-h-[200px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>
          <span className="text-[10px] text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">{items.length}</span>
        </div>
      </div>
      <div className="space-y-2">
        {items.map(task => (
          <div key={task.id} className="bg-white border border-gray-200 rounded-md p-3 hover:border-gray-300 transition-colors group cursor-pointer">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">{statusIcons[task.status]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900">{task.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[9px] text-gray-400 font-mono">{task.id}</span>
                  <span className="text-[9px] text-gray-400">·</span>
                  <span className="text-[9px] text-gray-500">{task.project}</span>
                  <span className="text-[9px] text-gray-400">·</span>
                  <span className={`text-[8px] px-1 py-0.5 rounded border ${priorityColors[task.priority]}`}>{task.priority}</span>
                </div>
                {/* Move buttons */}
                <div className="hidden group-hover:flex items-center gap-1 mt-2">
                  {task.status !== 'backlog' && (
                    <button onClick={() => moveTask(task.id, 'backlog')} className="text-[9px] text-gray-400 hover:text-gray-600">← Backlog</button>
                  )}
                  {task.status !== 'in-progress' && (
                    <button onClick={() => moveTask(task.id, 'in-progress')} className="text-[9px] text-blue-500 hover:text-blue-600">▶ Start</button>
                  )}
                  {task.status !== 'done' && (
                    <button onClick={() => moveTask(task.id, 'done')} className="text-[9px] text-green-500 hover:text-green-600">✓ Done</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Tasks</h1>
          <p className="text-xs text-gray-500 mt-0.5">15 tasks · {inProgress.length} active · {done.length} done</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <PixelSearch size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-md pl-7 pr-3 py-1.5 w-40 outline-none focus:border-gray-400"
            />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-600">
            <option value="all">All</option>
            <option value="backlog">Backlog</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Backlog', value: backlog.length, color: 'text-gray-400' },
          { label: 'In Progress', value: inProgress.length, color: 'text-blue-500' },
          { label: 'Done', value: done.length, color: 'text-green-500' },
          { label: 'Total', value: tasks.length, color: 'text-gray-900' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-4">
        <Column title="Backlog" items={backlog} status="backlog" />
        <Column title="In Progress" items={inProgress} status="in-progress" />
        <Column title="Done" items={done} status="done" />
      </div>
    </div>
  );
}
