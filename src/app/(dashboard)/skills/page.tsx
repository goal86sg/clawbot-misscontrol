'use client';

import React, { useState } from 'react';
import { PixelSparkle, PixelClock, PixelHeart, PixelCheck, PixelAlert } from '@/lib/pixel-icons';
import {
  PixelTasks,
  PixelCalendar,
  PixelProjects,
  PixelMemory,
  PixelDocs,
  PixelTeam,
  PixelOffice,
  PixelPulse,
  PixelSound,
  PixelActivity,
  PixelBell,
  PixelPortfolio,
  PixelStandup,
  PixelGoals,
  PixelCommandBar,
  PixelWeather,
  PixelCommute,
  PixelSpending,
  PixelFocus,
  PixelIncome,
  PixelHabits,
  PixelMonitor,
  PixelJournal,
  PixelLink,
  PixelDocker,
  PixelSnippets,
  PixelSleep,
  PixelReading,
  PixelGit,
  PixelBriefing,
  PixelDumbbell,
  PixelWeekly,
  PixelOpsCenter,
  PixelStar,
} from '@/lib/pixel-icons-extra';

function PixelSword({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="4" y="2" width="2" height="4" fill="currentColor" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="7" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="7" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelShield({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="1" fill="currentColor" />
      <rect x="1" y="1" width="6" height="1" fill="currentColor" />
      <rect x="0" y="2" width="8" height="4" fill="currentColor" opacity="0.8" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelBook({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="1" width="8" height="6" fill="currentColor" opacity="0.2" />
      <rect x="0" y="1" width="2" height="6" fill="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="2" width="3" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="4" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="5" width="3" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelCode({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="2" width="2" height="2" fill="currentColor" />
      <rect x="2" y="1" width="2" height="2" fill="currentColor" />
      <rect x="4" y="0" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="2" y="3" width="2" height="2" fill="currentColor" />
      <rect x="4" y="4" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="6" y="2" width="2" height="2" fill="currentColor" opacity="0.3" />
      <rect x="0" y="4" width="2" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelBolt({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="3" height="1" fill="currentColor" />
      <rect x="1" y="2" width="4" height="2" fill="currentColor" />
      <rect x="0" y="4" width="6" height="2" fill="currentColor" opacity="0.5" />
      <rect x="5" y="4" width="2" height="2" fill="currentColor" />
      <rect x="4" y="6" width="3" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelLeaf({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" opacity="0.7" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="6" width="2" height="2" fill="currentColor" opacity="0.3" />
      <rect x="6" y="2" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelBrain({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="2" width="3" height="2" fill="currentColor" opacity="0.7" />
      <rect x="4" y="2" width="3" height="2" fill="currentColor" opacity="0.7" />
      <rect x="1" y="4" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelMusic({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="1" width="1" height="5" fill="currentColor" />
      <rect x="4" y="0" width="1" height="6" fill="currentColor" />
      <rect x="1" y="1" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="4" y="3" width="3" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelTarget({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="1" y="1" width="6" height="1" fill="currentColor" />
      <rect x="0" y="2" width="8" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="3" width="2" height="2" fill="currentColor" />
      <rect x="5" y="3" width="2" height="2" fill="currentColor" />
      <rect x="0" y="5" width="8" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="6" width="6" height="1" fill="currentColor" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelFlame({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.8" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelDiamond({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="6" width="2" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelCoin({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.3" />
      <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelTrophy({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="1" fill="currentColor" />
      <rect x="1" y="1" width="6" height="2" fill="currentColor" />
      <rect x="2" y="3" width="4" height="2" fill="currentColor" opacity="0.8" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelXP({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="2" width="3" height="2" fill="currentColor" opacity="0.4" />
      <rect x="3" y="1" width="2" height="2" fill="currentColor" />
      <rect x="5" y="0" width="2" height="3" fill="currentColor" opacity="0.5" />
      <rect x="2" y="4" width="2" height="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Skill {
  id: string;
  name: string;
  category: 'tech' | 'language' | 'fitness' | 'creative' | 'knowledge' | 'life';
  level: number;
  xp: number;
  xpToNext: number;
  streak: number; // days
  status: 'active' | 'mastered' | 'dormant';
  icon: React.ReactNode;
  color: string;
  description: string;
  recentActivity: { date: string; action: string; xpEarned: number }[];
}

interface Quest {
  id: string;
  title: string;
  skillId: string;
  xp: number;
  status: 'available' | 'in-progress' | 'completed';
  difficulty: 1 | 2 | 3;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const skills: Skill[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'tech',
    level: 12,
    xp: 3450,
    xpToNext: 4000,
    streak: 14,
    status: 'active',
    color: '#3178c6',
    description: 'Building type-safe applications',
    icon: <PixelCode size={16} className="text-blue-500" />,
    recentActivity: [
      { date: 'Jun 12', action: 'Completed eBPF DAM types', xpEarned: 150 },
      { date: 'Jun 11', action: 'API monitor types', xpEarned: 100 },
      { date: 'Jun 10', action: 'TypeScript patterns', xpEarned: 200 },
    ],
  },
  {
    id: 'ebpf',
    name: 'eBPF',
    category: 'tech',
    level: 6,
    xp: 1200,
    xpToNext: 2000,
    streak: 7,
    status: 'active',
    color: '#0d9488',
    description: 'Linux kernel observability',
    icon: <PixelBolt size={16} className="text-teal-500" />,
    recentActivity: [
      { date: 'Jun 12', action: 'PostgreSQL DAM project', xpEarned: 300 },
      { date: 'Jun 9', action: 'Perf counter analysis', xpEarned: 150 },
    ],
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'tech',
    level: 9,
    xp: 2100,
    xpToNext: 3000,
    streak: 10,
    status: 'active',
    color: '#336791',
    description: 'Advanced database engineering',
    icon: <PixelDatabase size={16} className="text-indigo-500" />,
    recentActivity: [
      { date: 'Jun 12', action: 'DAM rule evaluation', xpEarned: 200 },
      { date: 'Jun 11', action: 'Query optimization', xpEarned: 100 },
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'tech',
    level: 15,
    xp: 5200,
    xpToNext: 6000,
    streak: 21,
    status: 'active',
    color: '#000000',
    description: 'Full-stack React frameworks',
    icon: <PixelSword size={16} className="text-gray-800" />,
    recentActivity: [
      { date: 'Jun 12', action: 'Mission control features', xpEarned: 250 },
      { date: 'Jun 11', action: 'Dashboard screens', xpEarned: 300 },
    ],
  },
  {
    id: 'chinese',
    name: '中文学习',
    category: 'language',
    level: 4,
    xp: 580,
    xpToNext: 1000,
    streak: 5,
    status: 'active',
    color: '#dc2626',
    description: 'Mandarin Chinese',
    icon: <PixelBook size={16} className="text-red-500" />,
    recentActivity: [
      { date: 'Jun 12', action: 'HSK3 vocabulary', xpEarned: 50 },
      { date: 'Jun 10', action: 'Conversation practice', xpEarned: 80 },
    ],
  },
  {
    id: 'japanese',
    name: '日本語',
    category: 'language',
    level: 3,
    xp: 340,
    xpToNext: 800,
    streak: 3,
    status: 'active',
    color: '#f43f5e',
    description: 'Japanese language',
    icon: <PixelBook size={16} className="text-pink-500" />,
    recentActivity: [
      { date: 'Jun 11', action: 'Kanji practice', xpEarned: 40 },
    ],
  },
  {
    id: 'running',
    name: 'Running',
    category: 'fitness',
    level: 8,
    xp: 1800,
    xpToNext: 2500,
    streak: 12,
    status: 'active',
    color: '#16a34a',
    description: 'Cardio & endurance',
    icon: <PixelFlame size={16} className="text-green-500" />,
    recentActivity: [
      { date: 'Jun 12', action: '5km morning run', xpEarned: 120 },
      { date: 'Jun 10', action: 'Interval training', xpEarned: 80 },
    ],
  },
  {
    id: 'gym',
    name: 'Strength',
    category: 'fitness',
    level: 7,
    xp: 1500,
    xpToNext: 2200,
    streak: 9,
    status: 'active',
    color: '#ea580c',
    description: 'Weight training & lifting',
    icon: <PixelShield size={16} className="text-orange-500" />,
    recentActivity: [
      { date: 'Jun 11', action: 'Pull day + legs', xpEarned: 150 },
      { date: 'Jun 9', action: 'Push day', xpEarned: 100 },
    ],
  },
  {
    id: 'writing',
    name: 'Writing',
    category: 'creative',
    level: 5,
    xp: 920,
    xpToNext: 1500,
    streak: 6,
    status: 'active',
    color: '#7c3aed',
    description: 'Technical & creative writing',
    icon: <PixelPen size={16} className="text-purple-500" />,
    recentActivity: [
      { date: 'Jun 12', action: 'Documentation', xpEarned: 80 },
      { date: 'Jun 10', action: 'Blog draft', xpEarned: 120 },
    ],
  },
  {
    id: 'music',
    name: 'Music',
    category: 'creative',
    level: 2,
    xp: 180,
    xpToNext: 500,
    streak: 2,
    status: 'active',
    color: '#0891b2',
    description: 'Guitar & music theory',
    icon: <PixelMusic size={16} className="text-cyan-500" />,
    recentActivity: [
      { date: 'Jun 8', action: 'Chord progressions', xpEarned: 30 },
    ],
  },
  {
    id: 'investing',
    name: 'Investing',
    category: 'knowledge',
    level: 6,
    xp: 1100,
    xpToNext: 1800,
    streak: 8,
    status: 'active',
    color: '#ca8a04',
    description: 'Finance & wealth building',
    icon: <PixelCoin size={16} className="text-yellow-600" />,
    recentActivity: [
      { date: 'Jun 11', action: 'Portfolio review', xpEarned: 50 },
      { date: 'Jun 9', action: 'FIRE tracking', xpEarned: 100 },
    ],
  },
  {
    id: 'system-design',
    name: 'System Design',
    category: 'knowledge',
    level: 8,
    xp: 1650,
    xpToNext: 2500,
    streak: 11,
    status: 'active',
    color: '#4f46e5',
    description: 'Distributed systems architecture',
    icon: <PixelTarget size={16} className="text-indigo-500" />,
    recentActivity: [
      { date: 'Jun 12', action: 'eBPF architecture', xpEarned: 150 },
      { date: 'Jun 10', action: 'DAM design doc', xpEarned: 100 },
    ],
  },
];

const quests: Quest[] = [
  { id: 'q1', title: 'Complete eBPF DAM project', skillId: 'ebpf', xp: 500, status: 'in-progress', difficulty: 3 },
  { id: 'q2', title: 'Type 10 Next.js screens', skillId: 'nextjs', xp: 300, status: 'in-progress', difficulty: 2 },
  { id: 'q3', title: 'Learn 50 new Chinese chars', skillId: 'chinese', xp: 150, status: 'available', difficulty: 2 },
  { id: 'q4', title: 'Run 50km this month', skillId: 'running', xp: 200, status: 'in-progress', difficulty: 2 },
  { id: 'q5', title: 'Master PostgreSQL indexes', skillId: 'postgres', xp: 250, status: 'available', difficulty: 3 },
  { id: 'q6', title: 'Publish tech blog post', skillId: 'writing', xp: 180, status: 'available', difficulty: 2 },
];

// Pixel database icon (inline since not in icons)
function PixelDatabase({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="1" width="8" height="1" fill="currentColor" opacity="0.8" />
      <rect x="0" y="2" width="8" height="2" fill="currentColor" opacity="0.4" />
      <rect x="0" y="4" width="8" height="1" fill="currentColor" opacity="0.8" />
      <rect x="0" y="5" width="8" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Pixel pen icon (inline)
function PixelPen({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="0" width="2" height="2" fill="currentColor" />
      <rect x="3" y="2" width="2" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─── Components ──────────────────────────────────────────────────────────────

function LevelBadge({ level }: { level: number }) {
  const color = level >= 10 ? 'bg-purple-100 text-purple-700' : level >= 5 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold ${color}`}>
      {level}
    </span>
  );
}

function XpBar({ xp, xpToNext }: { xp: number; xpToNext: number }) {
  const pct = Math.round((xp / xpToNext) * 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px] text-gray-400">
        <span className="flex items-center gap-1"><PixelXP size={10} /> {xp.toLocaleString()} XP</span>
        <span>{xpToNext.toLocaleString()} XP</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-sm overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StreakBadge({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-1 text-[10px] text-orange-500 font-medium">
      <PixelFlame size={10} />
      <span>{streak}d</span>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const [expanded, setExpanded] = useState(false);

  const catColors: Record<string, string> = {
    tech: 'border-l-blue-400',
    language: 'border-l-red-400',
    fitness: 'border-l-green-400',
    creative: 'border-l-purple-400',
    knowledge: 'border-l-yellow-400',
    life: 'border-l-gray-400',
  };

  return (
    <div
      className={`bg-white border border-gray-200 border-l-4 ${catColors[skill.category]} rounded-lg overflow-hidden transition-all hover:shadow-sm`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center gap-3 text-left"
      >
        <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center shrink-0">
          {skill.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{skill.name}</span>
            <LevelBadge level={skill.level} />
            <StreakBadge streak={skill.streak} />
          </div>
          <p className="text-[11px] text-gray-400 truncate mt-0.5">{skill.description}</p>
        </div>
        <div className="text-[10px] text-gray-300">
          {expanded ? '▲' : '▼'}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-3 space-y-3">
            <XpBar xp={skill.xp} xpToNext={skill.xpToNext} />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Recent Activity</p>
              <div className="space-y-1.5">
                {skill.recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="text-gray-300 w-12 shrink-0">{a.date}</span>
                    <span className="text-gray-600 flex-1 truncate">{a.action}</span>
                    <span className="text-green-600 font-medium shrink-0">+{a.xpEarned}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestCard({ quest }: { quest: Quest }) {
  const skill = skills.find(s => s.id === quest.skillId);
  const diffColors = ['text-gray-400', 'text-yellow-500', 'text-orange-500'];
  const statusConfig = {
    'in-progress': { bg: 'bg-blue-50', text: 'text-blue-600', label: 'In Progress' },
    'available': { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Available' },
    'completed': { bg: 'bg-green-50', text: 'text-green-600', label: 'Done' },
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
      <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
        {quest.status === 'completed' ? (
          <PixelCheck size={12} className="text-green-500" />
        ) : quest.status === 'in-progress' ? (
          <PixelSparkle size={12} className="text-blue-500" />
        ) : (
          <PixelTarget size={12} className="text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 truncate">{quest.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {skill && (
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              {skill.icon}
              {skill.name}
            </span>
          )}
          <span className="text-[10px] text-gray-300">·</span>
          <span className={`text-[10px] font-medium ${diffColors[quest.difficulty - 1]}`}>
            {'★'.repeat(quest.difficulty)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] text-yellow-600 font-medium flex items-center gap-1">
          <PixelXP size={10} /> {quest.xp}
        </span>
        <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${statusConfig[quest.status].bg} ${statusConfig[quest.status].text}`}>
          {statusConfig[quest.status].label}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SkillsPage() {
  const [filter, setFilter] = useState<'all' | 'tech' | 'language' | 'fitness' | 'creative' | 'knowledge' | 'life'>('all');

  const filtered = filter === 'all' ? skills : skills.filter(s => s.category === filter);

  // Stats
  const totalXp = skills.reduce((sum, s) => sum + s.xp, 0);
  const totalLevel = skills.reduce((sum, s) => sum + s.level, 0);
  const activeStreaks = skills.filter(s => s.streak >= 7).length;
  const inProgressQuests = quests.filter(q => q.status === 'in-progress').length;

  const categories = [
    { key: 'all' as const, label: 'All' },
    { key: 'tech' as const, label: 'Tech' },
    { key: 'language' as const, label: 'Languages' },
    { key: 'fitness' as const, label: 'Fitness' },
    { key: 'creative' as const, label: 'Creative' },
    { key: 'knowledge' as const, label: 'Knowledge' },
    { key: 'life' as const, label: 'Life' },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Skills & Progression</h1>
          <p className="text-xs text-gray-500 mt-0.5">Level up every day</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-gray-500">
              <PixelXP size={14} className="text-yellow-500" />
              <span className="font-semibold">{totalXp.toLocaleString()}</span>
              <span className="text-gray-400">total XP</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <PixelTrophy size={14} className="text-purple-500" />
              <span className="font-semibold">Lv {totalLevel}</span>
              <span className="text-gray-400">combined</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <PixelSword size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Tech Skills</p>
            <p className="text-xl font-bold text-gray-900">{skills.filter(s => s.category === 'tech').length}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
            <PixelFlame size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Active Streaks</p>
            <p className="text-xl font-bold text-gray-900">{activeStreaks}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <PixelDiamond size={20} className="text-purple-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Quests Active</p>
            <p className="text-xl font-bold text-gray-900">{inProgressQuests}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <PixelHeart size={20} className="text-green-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Total Skills</p>
            <p className="text-xl font-bold text-gray-900">{skills.length}</p>
          </div>
        </div>
      </div>

      {/* Skill Tree + Quests */}
      <div className="grid grid-cols-3 gap-4">
        {/* Skills Column */}
        <div className="col-span-2 space-y-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
                  filter === cat.key
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skill Cards */}
          <div className="space-y-2">
            {filtered.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>

        {/* Quests Sidebar */}
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="px-4 py-3 border-b border-gray-100"
              style={{
                backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
                backgroundSize: '8px 100%',
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <PixelTrophy size={14} className="text-yellow-500" />
                  Quests
                </h2>
                <span className="text-[10px] text-gray-400">{quests.filter(q => q.status === 'completed').length}/{quests.length}</span>
              </div>
            </div>
            <div className="p-3 space-y-2">
              {quests.map(quest => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </div>

          {/* Leaderboard / Achievements teaser */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div
              className="px-4 py-3 border-b border-gray-100"
              style={{
                backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
                backgroundSize: '8px 100%',
              }}
            >
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <PixelStar size={14} className="text-yellow-400" />
                Top Skills
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {skills.sort((a, b) => b.level - a.level).slice(0, 5).map((skill, i) => (
                <div key={skill.id} className="px-4 py-2.5 flex items-center gap-3">
                  <span className={`text-[11px] font-bold w-4 ${i === 0 ? 'text-yellow-500' : 'text-gray-400'}`}>
                    #{i + 1}
                  </span>
                  <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center">
                    {skill.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900">{skill.name}</p>
                    <p className="text-[10px] text-gray-400">Lv {skill.level}</p>
                  </div>
                  <LevelBadge level={skill.level} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}