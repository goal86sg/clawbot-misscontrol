'use client';

import React, { useState } from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelCheck, PixelPlay, PixelHeart } from '@/lib/pixel-icons';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'complete' | 'paused';
  tech: string[];
  repo?: string;
  tasks: number;
  doneTasks: number;
  memories: number;
  docs: number;
  lastActivity: string;
}

const projects: Project[] = [
  {
    id: 'P-001', name: 'Mission Control', description: 'Agent management dashboard with pixel-art UI',
    progress: 70, status: 'active', tech: ['Next.js', 'TypeScript', 'Tailwind'],
    repo: 'github.com/goal86sg/clawbot-misscontrol', tasks: 8, doneTasks: 5, memories: 3, docs: 2,
    lastActivity: '2 min ago',
  },
  {
    id: 'P-002', name: 'Spending Tracker', description: 'Upload bank statements, track spending trends',
    progress: 85, status: 'active', tech: ['Next.js', 'Recharts', 'TypeScript'],
    repo: 'github.com/goal86sg/spending-tracker', tasks: 5, doneTasks: 4, memories: 1, docs: 1,
    lastActivity: '15 min ago',
  },
  {
    id: 'P-003', name: 'eBPF PostgreSQL DAM', description: 'Database activity monitoring via eBPF probes',
    progress: 40, status: 'active', tech: ['Rust', 'eBPF', 'PostgreSQL'],
    repo: 'workspace/ebpf-probe', tasks: 4, doneTasks: 1, memories: 5, docs: 1,
    lastActivity: '2 days ago',
  },
  {
    id: 'P-004', name: 'K8s News Monitor', description: 'Kubernetes & cloud-native news aggregator',
    progress: 90, status: 'active', tech: ['Bash', 'Cron', 'RSS'],
    tasks: 3, doneTasks: 3, memories: 2, docs: 0,
    lastActivity: '3 hours ago',
  },
  {
    id: 'P-005', name: 'Commute Tools', description: 'Stock updates, route checks, commute monitoring',
    progress: 75, status: 'active', tech: ['Bash', 'cron', 'API'],
    tasks: 4, doneTasks: 3, memories: 1, docs: 0,
    lastActivity: '6 hours ago',
  },
  {
    id: 'P-006', name: 'Sovereign Cloud PPTX', description: 'Automated PowerPoint generation pipeline',
    progress: 100, status: 'complete', tech: ['Node.js', 'python-pptx'],
    tasks: 2, doneTasks: 2, memories: 1, docs: 1,
    lastActivity: '1 week ago',
  },
  {
    id: 'P-007', name: 'Investment Dashboard', description: 'Portfolio tracking, dividend calendar, alerts',
    progress: 15, status: 'paused', tech: ['TBD'],
    tasks: 2, doneTasks: 0, memories: 0, docs: 0,
    lastActivity: '2 weeks ago',
  },
];

const statusStyles: Record<string, string> = {
  active: 'bg-blue-100 text-blue-700 border-blue-200',
  complete: 'bg-green-100 text-green-700 border-green-200',
  paused: 'bg-gray-100 text-gray-500 border-gray-200',
};

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Projects</h1>
          <p className="text-xs text-gray-500 mt-0.5">{projects.length} projects · {projects.filter(p => p.status === 'active').length} active</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {projects.map(proj => (
          <div
            key={proj.id}
            className={`bg-white border rounded-lg overflow-hidden transition-all cursor-pointer ${selected?.id === proj.id ? 'border-gray-400 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => setSelected(selected?.id === proj.id ? null : proj)}
          >
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-400">{proj.id}</span>
                  <h3 className="text-sm font-semibold text-gray-900">{proj.name}</h3>
                </div>
                <span className={`text-[8px] px-1.5 py-0.5 rounded border font-medium uppercase ${statusStyles[proj.status]}`}>{proj.status}</span>
              </div>

              <p className="text-[11px] text-gray-500 mb-3">{proj.description}</p>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-3">
                <PixelProgress value={proj.progress} max={100} variant={proj.progress === 100 ? 'green' : proj.progress > 50 ? 'blue' : 'yellow'} />
                <span className="text-[10px] text-gray-400 font-mono">{proj.progress}%</span>
              </div>

              {/* Tech tags */}
              <div className="flex items-center gap-1 mb-3">
                {proj.tech.map(t => (
                  <span key={t} className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{t}</span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-[10px] text-gray-400">
                <span>📋 {proj.tasks} tasks ({proj.doneTasks} done)</span>
                <span>🧠 {proj.memories} memories</span>
                <span>📄 {proj.docs} docs</span>
                <span className="ml-auto">{proj.lastActivity}</span>
              </div>
            </div>

            {/* Expanded detail */}
            {selected?.id === proj.id && (
              <div className="border-t border-gray-100 px-5 py-3 bg-gray-50/50 space-y-2">
                {proj.repo && (
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-gray-400">Repo:</span>
                    <a href={`https://${proj.repo}`} target="_blank" rel="noopener" className="text-blue-500 hover:underline font-mono">{proj.repo}</a>
                  </div>
                )}
                <div className="flex gap-2">
                  <Link href="/tasks" className="text-[10px] px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50">View Tasks</Link>
                  <Link href="/memory" className="text-[10px] px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50">View Memories</Link>
                  <Link href="/docs" className="text-[10px] px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50">View Docs</Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
