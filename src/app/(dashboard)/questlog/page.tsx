'use client';

import React, { useState, useEffect } from 'react';
import { PixelCheck, PixelClock, PixelSparkle, PixelAlert, PixelHeart } from '@/lib/pixel-icons';
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
} from '@/lib/pixel-icons-extra';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  xp: number;
  status: 'active' | 'completed' | 'failed' | 'locked';
  deadline?: string;
  tags: string[];
  completedAt?: string;
  subquest?: boolean;
  parentId?: string;
}

type QuestCategory =
  | 'build'
  | 'research'
  | 'health'
  | 'learning'
  | 'social'
  | 'admin'
  | 'creative'
  | 'review';

interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  level: number;
  xp: number;
  quests: number;
  color: string;
}

interface DailyStreak {
  date: string;
  questsDone: number;
  xpEarned: number;
}

// ─── Pixel Icons ─────────────────────────────────────────────────────────────

function PixelSword({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" style={{ color }}>
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="2" width="2" height="3" fill="currentColor" />
      <rect x="2" y="5" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="6" width="6" height="1" fill="currentColor" opacity="0.4" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelShield({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" style={{ color }}>
      <rect x="2" y="0" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="1" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="6" height="4" fill="currentColor" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.7" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelGem({ size = 12, color = '#a855f7' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="1" fill={color} opacity="0.5" />
      <rect x="1" y="1" width="6" height="1" fill={color} opacity="0.7" />
      <rect x="0" y="2" width="8" height="2" fill={color} />
      <rect x="1" y="4" width="6" height="2" fill={color} opacity="0.8" />
      <rect x="2" y="6" width="4" height="1" fill={color} opacity="0.6" />
      <rect x="3" y="7" width="2" height="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function PixelScroll({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-amber-600">
      <rect x="2" y="0" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.15" />
      <rect x="2" y="2" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="4" width="3" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="7" width="4" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelStar({ size = 12, filled = true }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="#eab308" opacity={filled ? 1 : 0.2} />
      <rect x="2" y="1" width="4" height="1" fill="#eab308" opacity={filled ? 1 : 0.2} />
      <rect x="1" y="2" width="6" height="2" fill="#eab308" opacity={filled ? 1 : 0.2} />
      <rect x="0" y="4" width="8" height="2" fill="#eab308" opacity={filled ? 1 : 0.2} />
      <rect x="1" y="6" width="2" height="1" fill="#eab308" opacity={filled ? 1 : 0.2} />
      <rect x="5" y="6" width="2" height="1" fill="#eab308" opacity={filled ? 1 : 0.2} />
    </svg>
  );
}

function PixelSkull({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-red-400">
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="3" fill="currentColor" />
      <rect x="2" y="5" width="1" height="1" fill="white" opacity="0.5" />
      <rect x="5" y="5" width="1" height="1" fill="white" opacity="0.5" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" />
      <rect x="2" y="7" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="7" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelLock({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-gray-400">
      <rect x="2" y="3" width="4" height="4" fill="currentColor" />
      <rect x="3" y="1" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="2" width="2" height="2" fill="none" stroke="currentColor" strokeWidth={1} opacity="0.4" />
    </svg>
  );
}

// ─── Category Config ─────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<QuestCategory, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  build:    { label: 'Build',     color: '#3b82f6', icon: <PixelDumbbell size={12} />,  bg: 'bg-blue-50' },
  research: { label: 'Research',  color: '#8b5cf6', icon: <PixelDocs size={12} />,      bg: 'bg-purple-50' },
  health:   { label: 'Health',    color: '#22c55e', icon: <PixelHeart size={12} />,     bg: 'bg-green-50' },
  learning: { label: 'Learning',  color: '#f59e0b', icon: <PixelReading size={12} />,   bg: 'bg-amber-50' },
  social:   { label: 'Social',    color: '#ec4899', icon: <PixelTeam size={12} />,      bg: 'bg-pink-50' },
  admin:    { label: 'Admin',     color: '#6b7280', icon: <PixelTasks size={12} />,     bg: 'bg-gray-50' },
  creative: { label: 'Creative',  color: '#f97316', icon: <PixelSparkle size={12} />,   bg: 'bg-orange-50' },
  review:   { label: 'Review',    color: '#06b6d4', icon: <PixelCalendar size={12} />,  bg: 'bg-cyan-50' },
};

// ─── Difficulty XP table ─────────────────────────────────────────────────────

const DIFFICULTY_XP: Record<number, number> = {
  1: 10,
  2: 25,
  3: 50,
  4: 100,
  5: 200,
};

const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Trivial',
  2: 'Easy',
  3: 'Medium',
  4: 'Hard',
  5: 'Epic',
};

// ─── Pixel XP Bar ────────────────────────────────────────────────────────────

function PixelXPBar({ value, max, color = '#a855f7' }: { value: number; max: number; color?: string }) {
  const segments = 20;
  const filled = Math.round((value / max) * segments);
  return (
    <div className="flex gap-px">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-sm transition-all"
          style={{
            backgroundColor: i < filled ? color : '#f3f4f6',
            opacity: i < filled ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

// ─── Quest Card ──────────────────────────────────────────────────────────────

function QuestCard({ quest, onComplete }: { quest: Quest; onComplete?: (id: string) => void }) {
  const cat = CATEGORY_CONFIG[quest.category];
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const difficultyStars = Array.from({ length: 5 }, (_, i) => i < quest.difficulty);

  return (
    <div
      className={`bg-white border rounded-lg overflow-hidden transition-all hover:shadow-sm group ${
        quest.status === 'completed'
          ? 'border-green-200 opacity-75'
          : quest.status === 'failed'
          ? 'border-red-200 opacity-60'
          : quest.status === 'locked'
          ? 'border-gray-100 opacity-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Pixel art header stripe */}
      <div
        className="h-1"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${cat.color} 0px, ${cat.color} 8px, transparent 8px, transparent 10px)`,
          backgroundSize: '10px 100%',
        }}
      />

      <div className="px-4 py-3">
        {/* Header row */}
        <div className="flex items-start gap-2 mb-2">
          {/* Status icon */}
          <div className="mt-0.5 shrink-0">
            {quest.status === 'completed' && (
              <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                <PixelCheck size={10} className="text-green-600" />
              </div>
            )}
            {quest.status === 'active' && (
              <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 rounded-sm bg-blue-500" />
              </div>
            )}
            {quest.status === 'failed' && <PixelSkull size={14} />
            }
            {quest.status === 'locked' && <PixelLock size={14} />
            }
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={`text-xs font-semibold ${quest.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {quest.title}
              </p>
              {/* Category badge */}
              <span
                className="text-[7px] px-1.5 py-0.5 rounded border font-semibold uppercase"
                style={{ color: cat.color, borderColor: cat.color + '40', backgroundColor: cat.bg }}
              >
                {cat.label}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">{quest.description}</p>
          </div>

          {/* XP badge */}
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1">
              <PixelGem size={10} color="#a855f7" />
              <span className="text-[10px] font-bold font-mono text-purple-600">+{quest.xp} XP</span>
            </div>
          </div>
        </div>

        {/* Footer: difficulty + deadline + tags */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {/* Difficulty stars */}
          <div className="flex items-center gap-0.5">
            {difficultyStars.map((f, i) => (
              <PixelStar key={i} size={9} filled={f} />
            ))}
            <span className="text-[8px] text-gray-400 ml-0.5">{DIFFICULTY_LABELS[quest.difficulty]}</span>
          </div>

          {quest.deadline && quest.status !== 'completed' && (
            <div className="flex items-center gap-1">
              <PixelClock size={9} className="text-gray-400" />
              <span className="text-[9px] text-gray-400">{quest.deadline}</span>
            </div>
          )}

          {quest.tags.map(tag => (
            <span key={tag} className="text-[7px] bg-gray-100 text-gray-500 px-1 rounded">{tag}</span>
          ))}

          {/* Complete button for active quests */}
          {quest.status === 'active' && onComplete && (
            <button
              onClick={() => onComplete(quest.id)}
              className="ml-auto text-[9px] px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-1"
            >
              <PixelCheck size={9} /> Complete
            </button>
          )}

          {quest.status === 'completed' && quest.completedAt && (
            <span className="ml-auto text-[9px] text-green-600 font-medium">
              ✓ Done {quest.completedAt}
            </span>
          )}
        </div>
      </div>

      {/* Animated scanline for active quests */}
      {quest.status === 'active' && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)',
          }}
        />
      )}
    </div>
  );
}

// ─── Skill Badge ─────────────────────────────────────────────────────────────

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-300 transition-colors">
      <div className="w-7 h-7 rounded bg-gray-900 flex items-center justify-center">
        {skill.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-gray-900">{skill.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex gap-px">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-sm"
                style={{ backgroundColor: i < skill.level ? skill.color : '#e5e7eb' }}
              />
            ))}
          </div>
          <span className="text-[8px] text-gray-400">{skill.quests} quests · {skill.xp} XP</span>
        </div>
      </div>
    </div>
  );
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

const QUESTS: Quest[] = [
  // Active quests
  {
    id: 'Q-101',
    title: 'Build eBPF PostgreSQL DAM probe',
    description: 'Instrument postgres via eBPF USDT probes — capture all queries with latency & row counts',
    category: 'build',
    difficulty: 5,
    xp: 200,
    status: 'active',
    deadline: 'Jun 15',
    tags: ['eBPF', 'Rust', 'PostgreSQL'],
  },
  {
    id: 'Q-102',
    title: 'Morning standup ritual',
    description: 'Review overnight alerts, check cron status, greet the team',
    category: 'admin',
    difficulty: 1,
    xp: 10,
    status: 'active',
    tags: ['routine'],
  },
  {
    id: 'Q-103',
    title: 'Read "Designing Data-Intensive Applications"',
    description: 'Chapters 8–10: Replication, partitioning, transactions',
    category: 'learning',
    difficulty: 3,
    xp: 50,
    status: 'active',
    deadline: 'Jun 20',
    tags: ['reading', 'distributed-systems'],
  },
  {
    id: 'Q-104',
    title: 'Nightly build — Mission Control Screen 41',
    description: 'Build the Pixel Quest Log screen with XP, skills, and quest tracking',
    category: 'creative',
    difficulty: 2,
    xp: 25,
    status: 'active',
    tags: ['nightly', 'mission-control'],
  },
  {
    id: 'Q-105',
    title: 'Run 5km around Punggol Waterfront',
    description: 'Steady state cardio — keep HR in Z2',
    category: 'health',
    difficulty: 2,
    xp: 25,
    status: 'active',
    tags: ['running', 'cardio'],
  },
  {
    id: 'Q-106',
    title: 'Review guarddog security audit report',
    description: 'Go through last night\'s findings, apply any --fix recommendations',
    category: 'review',
    difficulty: 2,
    xp: 25,
    status: 'active',
    tags: ['security', 'guarddog'],
  },
  {
    id: 'Q-107',
    title: 'Sync with manager on Q3 OKRs',
    description: 'Align on goals, key results, and blockers for next quarter',
    category: 'social',
    difficulty: 2,
    xp: 25,
    status: 'active',
    deadline: 'Jun 12',
    tags: ['work', 'OKRs'],
  },
  // Completed quests
  {
    id: 'Q-090',
    title: 'Deploy spending tracker v1',
    description: 'Launch bank statement parser with category auto-tagging',
    category: 'build',
    difficulty: 3,
    xp: 50,
    status: 'completed',
    completedAt: 'Jun 5',
    tags: ['nextjs', 'finance'],
  },
  {
    id: 'Q-089',
    title: 'Health metrics dashboard (Screen 40)',
    description: 'Unified health score, radar chart, vitals grid, sleep & workout summaries',
    category: 'build',
    difficulty: 4,
    xp: 100,
    status: 'completed',
    completedAt: 'Jun 7',
    tags: ['nightly', 'mission-control'],
  },
  {
    id: 'Q-088',
    title: 'Set up T-bill auto-rollover',
    description: 'Configure DBSG recurring buy for 4-week T-bills',
    category: 'admin',
    difficulty: 2,
    xp: 25,
    status: 'completed',
    completedAt: 'Jun 3',
    tags: ['investment', 'automation'],
  },
  {
    id: 'Q-087',
    title: 'Complete 30-day meditation streak',
    description: '30 consecutive days of 10-minute morning meditation',
    category: 'health',
    difficulty: 3,
    xp: 50,
    status: 'completed',
    completedAt: 'Jun 1',
    tags: ['meditation', 'streak'],
  },
  // Failed quest
  {
    id: 'Q-080',
    title: 'Ship K8s news monitor before June 1',
    description: 'RSS aggregator with daily digest email — missed deadline due to scope creep',
    category: 'build',
    difficulty: 4,
    xp: 100,
    status: 'failed',
    tags: ['k8s', 'cron', 'rss'],
  },
];

const SKILLS: Skill[] = [
  { id: 's1', name: 'Building', icon: <PixelSword size={12} color="white" />, level: 8, xp: 420, quests: 23, color: '#3b82f6' },
  { id: 's2', name: 'Research', icon: <PixelDocs size={12} className="text-white" />, level: 5, xp: 180, quests: 12, color: '#8b5cf6' },
  { id: 's3', name: 'Health', icon: <PixelHeart size={12} className="text-white" />, level: 6, xp: 240, quests: 18, color: '#22c55e' },
  { id: 's4', name: 'Learning', icon: <PixelReading size={12} className="text-white" />, level: 4, xp: 130, quests: 9, color: '#f59e0b' },
  { id: 's5', name: 'Protecting', icon: <PixelShield size={12} color="white" />, level: 3, xp: 90, quests: 7, color: '#ef4444' },
  { id: 's6', name: 'Automating', icon: <PixelSparkle size={12} className="text-white" />, level: 7, xp: 310, quests: 21, color: '#06b6d4' },
];

const WEEKLY_XP = [
  { day: 'Mon', xp: 75, quests: 3 },
  { day: 'Tue', xp: 120, quests: 4 },
  { day: 'Wed', xp: 45, quests: 2 },
  { day: 'Thu', xp: 200, quests: 5 },
  { day: 'Fri', xp: 90, quests: 3 },
  { day: 'Sat', xp: 25, quests: 1 },
  { day: 'Sun', xp: 0, quests: 0 },
];

// ─── Stats ───────────────────────────────────────────────────────────────────

const PLAYER_STATS = {
  level: 12,
  totalXP: 1485,
  xpToNext: 2000,
  questsCompleted: 87,
  questsFailed: 3,
  currentStreak: 7,
  longestStreak: 14,
  activeQuests: QUESTS.filter(q => q.status === 'active').length,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QuestLogPage() {
  const [filter, setFilter] = useState<'active' | 'all' | 'completed' | 'failed'>('active');
  const [categoryFilter, setCategoryFilter] = useState<QuestCategory | 'all'>('all');
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState('');

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    const timeId = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour12: false, timeZone: 'Asia/Singapore',
      }));
    }, 1000);
    return () => { clearInterval(id); clearInterval(timeId); };
  }, []);

  const filteredQuests = QUESTS.filter(q => {
    if (filter === 'active') return q.status === 'active';
    if (filter === 'completed') return q.status === 'completed';
    if (filter === 'failed') return q.status === 'failed';
    return true;
  }).filter(q => {
    if (categoryFilter === 'all') return true;
    return q.category === categoryFilter;
  });

  const handleComplete = (id: string) => {
    // In production: update state / API
    console.log('Quest completed:', id);
  };

  const xpPct = Math.round((PLAYER_STATS.totalXP / PLAYER_STATS.xpToNext) * 100);
  const weeklyPeak = Math.max(...WEEKLY_XP.map(w => w.xp));

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded">
            QUEST LOG v1.0
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Quest Log</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {PLAYER_STATS.activeQuests} active quests · Level {PLAYER_STATS.level} · {PLAYER_STATS.currentStreak}-day streak 🔥
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <kbd className="text-[9px] bg-gray-900 text-white px-1.5 py-0.5 rounded">N</kbd>
          <span className="text-[9px] text-gray-400">new quest</span>
          <div className="w-px h-3 bg-gray-200" />
          <div className="text-gray-400">
            <span className="text-[9px] uppercase text-gray-300">SGT</span>{' '}
            <span className="text-gray-700">{time}</span>
          </div>
        </div>
      </div>

      {/* Player Stats Bar */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center gap-3">
            {/* Pixel avatar */}
            <div className="relative">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-3 gap-px">
                  <div className="w-2 h-2 bg-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-[7px] font-bold px-1 rounded">
                Lv.{PLAYER_STATS.level}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-900">Des_bot</p>
              <p className="text-[9px] text-gray-400">Software Architect · Singapore</p>
            </div>

            {/* XP Bar */}
            <div className="flex items-center gap-2 ml-4">
              <PixelGem size={12} color="#a855f7" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <PixelXPBar value={PLAYER_STATS.totalXP} max={PLAYER_STATS.xpToNext} />
                  <span className="text-[9px] font-mono text-gray-400">
                    {PLAYER_STATS.totalXP} / {PLAYER_STATS.xpToNext} XP
                  </span>
                </div>
                <p className="text-[8px] text-gray-400">
                  {PLAYER_STATS.xpToNext - PLAYER_STATS.totalXP} XP to Level {PLAYER_STATS.level + 1}
                </p>
              </div>
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-sm font-bold font-mono text-gray-900">{PLAYER_STATS.questsCompleted}</p>
              <p className="text-[8px] text-gray-400">Completed</p>
            </div>
            <div className="w-px h-6 bg-gray-100" />
            <div className="text-center">
              <p className="text-sm font-bold font-mono text-red-500">{PLAYER_STATS.questsFailed}</p>
              <p className="text-[8px] text-gray-400">Failed</p>
            </div>
            <div className="w-px h-6 bg-gray-100" />
            <div className="text-center">
              <p className="text-sm font-bold font-mono text-orange-500">🔥 {PLAYER_STATS.currentStreak}</p>
              <p className="text-[8px] text-gray-400">Day Streak</p>
            </div>
            <div className="w-px h-6 bg-gray-100" />
            <div className="text-center">
              <p className="text-sm font-bold font-mono text-gray-400">⚡ {PLAYER_STATS.longestStreak}</p>
              <p className="text-[8px] text-gray-400">Best Streak</p>
            </div>
          </div>
        </div>

        {/* Weekly XP chart */}
        <div className="px-5 py-3 bg-gray-50/50">
          <div className="flex items-end gap-2 h-14">
            {WEEKLY_XP.map((day, i) => {
              const height = day.xp === 0 ? 4 : Math.max(4, Math.round((day.xp / weeklyPeak) * 48));
              const isToday = i === new Date().getDay() - 1 || (i === 6 && new Date().getDay() === 0);
              return (
                <div key={day.day} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-[8px] font-mono text-gray-500">{day.xp > 0 ? `+${day.xp}` : ''}</span>
                  <div
                    className="w-full rounded-sm transition-all"
                    style={{
                      height: `${height}px`,
                      backgroundColor: day.xp === 0 ? '#f3f4f6' : isToday ? '#a855f7' : '#3b82f6',
                      opacity: day.xp === 0 ? 0.4 : 1,
                    }}
                  />
                  <span className={`text-[8px] font-mono ${isToday ? 'text-purple-600 font-bold' : 'text-gray-400'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-2.5 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <PixelShield size={11} color="#374151" /> Skill Tree
          </p>
        </div>
        <div className="px-5 py-3 grid grid-cols-6 gap-2">
          {SKILLS.map(skill => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>
      </div>

      {/* Quest List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Filter bar */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-4 flex-wrap"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          {/* Status filter */}
          <div className="flex gap-1">
            {(['active', 'completed', 'failed', 'all'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[10px] px-3 py-1.5 rounded font-medium transition-all ${
                  filter === f
                    ? f === 'active' ? 'bg-blue-500 text-white' :
                      f === 'completed' ? 'bg-green-500 text-white' :
                      f === 'failed' ? 'bg-red-500 text-white' :
                      'bg-gray-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {f === 'all' ? 'All Quests' : f === 'active' ? 'Active' : f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="ml-1.5 text-[9px] opacity-60">
                  {f === 'all' ? QUESTS.length :
                   f === 'active' ? QUESTS.filter(q => q.status === 'active').length :
                   f === 'completed' ? QUESTS.filter(q => q.status === 'completed').length :
                   QUESTS.filter(q => q.status === 'failed').length}
                </span>
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`text-[9px] px-2 py-1 rounded transition-colors ${categoryFilter === 'all' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              All Categories
            </button>
            {(Object.keys(CATEGORY_CONFIG) as QuestCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[9px] px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                  categoryFilter === cat ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                {CATEGORY_CONFIG[cat].icon}
                {CATEGORY_CONFIG[cat].label}
              </button>
            ))}
          </div>

          <div className="ml-auto text-[9px] text-gray-400 font-mono">
            {filteredQuests.length} quest{filteredQuests.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Quest list */}
        <div className="divide-y divide-gray-50">
          {filteredQuests.length === 0 ? (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-3">
                <PixelScroll size={32} />
              </div>
              <p className="text-xs text-gray-400">No quests in this category</p>
              <p className="text-[9px] text-gray-300 mt-1">Try a different filter</p>
            </div>
          ) : (
            filteredQuests.map(quest => (
              <div key={quest.id} className="relative">
                <QuestCard quest={quest} onComplete={handleComplete} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pixel decoration */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-sm"
            style={{ opacity: Math.sin(i * 0.6 + tick * 0.4) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Quest Log · Screen 41 · Des_bot
      </p>
    </div>
  );
}