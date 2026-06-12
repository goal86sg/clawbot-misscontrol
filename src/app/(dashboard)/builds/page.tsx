'use client';

import React, { useState } from 'react';
import { PixelSparkle, PixelClock, PixelCheck, PixelAlert, PixelHeart } from '@/lib/pixel-icons';

// ─── Pixel Icons ─────────────────────────────────────────────────────────────

function PixelRocket({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="2" fill="currentColor" />
      <rect x="3" y="3" width="2" height="4" fill="currentColor" />
      <rect x="1" y="3" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="0" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="3" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="6" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelFire({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-orange-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelMoonSmall({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="1" width="5" height="5" fill="currentColor" opacity="0.4" />
      <rect x="2" y="0" width="2" height="1" fill="currentColor" />
      <rect x="0" y="2" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelStar({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="8" height="2" fill="currentColor" />
      <rect x="1" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelGrid({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-400" shapeRendering="crispEdges">
      <rect x="0" y="0" width="3" height="3" fill="currentColor" opacity="0.2" />
      <rect x="4" y="0" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="0" y="4" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="4" y="4" width="3" height="3" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelCalendar({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="0" y="1" width="8" height="7" fill="currentColor" opacity="0.15" />
      <rect x="0" y="1" width="8" height="2" fill="currentColor" opacity="0.4" />
      <rect x="1" y="0" width="1" height="3" fill="currentColor" opacity="0.3" />
      <rect x="6" y="0" width="1" height="3" fill="currentColor" opacity="0.3" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="5" width="1" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelCode({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-green-500" shapeRendering="crispEdges">
      <rect x="1" y="2" width="1" height="1" fill="currentColor" />
      <rect x="2" y="3" width="1" height="1" fill="currentColor" />
      <rect x="1" y="4" width="1" height="1" fill="currentColor" />
      <rect x="5" y="2" width="2" height="1" fill="currentColor" />
      <rect x="5" y="3" width="1" height="1" fill="currentColor" />
      <rect x="5" y="4" width="2" height="1" fill="currentColor" />
      <rect x="6" y="3" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelHeartSmall({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-pink-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="2" height="2" fill="currentColor" />
      <rect x="3" y="2" width="2" height="2" fill="currentColor" />
      <rect x="5" y="1" width="2" height="2" fill="currentColor" />
      <rect x="0" y="2" width="2" height="2" fill="currentColor" opacity="0.3" />
      <rect x="6" y="2" width="2" height="2" fill="currentColor" opacity="0.3" />
      <rect x="1" y="3" width="6" height="3" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function PixelSparkleSmall({ size = 10, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`text-yellow-400 ${className || ''}`} shapeRendering="crispEdges">
      <rect x="4" y="0" width="1" height="8" fill="currentColor" />
      <rect x="0" y="4" width="8" height="1" fill="currentColor" />
      <rect x="1" y="1" width="2" height="2" fill="currentColor" />
      <rect x="5" y="1" width="2" height="2" fill="currentColor" />
      <rect x="1" y="5" width="2" height="2" fill="currentColor" />
      <rect x="5" y="5" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type ScreenCategory = 'dashboard' | 'tracker' | 'automation' | 'analytics' | 'social' | 'docs' | 'monitoring' | 'system';

interface BuildEntry {
  id: string;
  date: string;
  sgtTime: string;
  commitMsg: string;
  screenName: string;
  screenSlug: string;
  category: ScreenCategory;
  summary: string;
  features: string[];
  tech: string[];
  screenNum: number;
  stars: number;
  isNewScreen: boolean;
  pixelArtTheme: 'rocket' | 'moon' | 'grid' | 'heart' | 'calendar' | 'code';
  buildNum: number;
}

const categoryColors: Record<ScreenCategory, string> = {
  dashboard: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  tracker: 'bg-green-100 text-green-700 border-green-200',
  automation: 'bg-purple-100 text-purple-700 border-purple-200',
  analytics: 'bg-blue-100 text-blue-700 border-blue-200',
  social: 'bg-pink-100 text-pink-700 border-pink-200',
  docs: 'bg-amber-100 text-amber-700 border-amber-200',
  monitoring: 'bg-red-100 text-red-700 border-red-200',
  system: 'bg-gray-100 text-gray-600 border-gray-200',
};

const categoryDot: Record<ScreenCategory, string> = {
  dashboard: 'bg-indigo-400',
  tracker: 'bg-green-400',
  automation: 'bg-purple-400',
  analytics: 'bg-blue-400',
  social: 'bg-pink-400',
  docs: 'bg-amber-400',
  monitoring: 'bg-red-400',
  system: 'bg-gray-400',
};

const pixelIconsByTheme: Record<string, React.ReactNode> = {
  rocket: <PixelRocket size={32} />,
  moon: <PixelMoonSmall size={32} className="text-slate-400" />,
  grid: <PixelGrid size={32} />,
  heart: <PixelHeartSmall size={32} />,
  calendar: <PixelCalendar size={32} />,
  code: <PixelCode size={32} />,
};

// ─── Build Data ───────────────────────────────────────────────────────────────

const builds: BuildEntry[] = [
  {
    id: 'b042',
    date: '2026-06-12',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Year in Pixels — 365-day life dashboard with pixel art calendar grid, mood/energy/productivity tracking, quarter views, and click-to-inspect day detail panel',
    screenName: 'Year in Pixels',
    screenSlug: '/year-in-pixels',
    category: 'dashboard',
    summary: 'A full 365-day life dashboard — each day is a pixel you can click to inspect mood, energy, productivity, and tags.',
    features: ['365-day pixel calendar grid', 'Quarter view navigation', 'Mood/energy/productivity color coding', 'Click-to-inspect day detail panel', '5-star score system'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'React state'],
    screenNum: 42,
    stars: 5,
    isNewScreen: true,
    pixelArtTheme: 'calendar',
    buildNum: 42,
  },
  {
    id: 'b041',
    date: '2026-06-11',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Financial Dashboard — Screen 41 with net worth, cash flow chart, passive income streams, asset allocation, FIRE progress gauge, and financial goals tracker',
    screenName: 'Financial Dashboard',
    screenSlug: '/finance',
    category: 'analytics',
    summary: 'Complete financial overview — net worth, cash flow trends, passive income breakdown, asset allocation donut, FIRE progress gauge.',
    features: ['Net worth tracker', 'Cash flow sparkline chart', 'Passive income streams panel', 'Asset allocation pixel donut', 'FIRE progress gauge', 'Financial goals with deadlines'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Recharts-compatible'],
    screenNum: 41,
    stars: 5,
    isNewScreen: true,
    pixelArtTheme: 'grid',
    buildNum: 41,
  },
  {
    id: 'b040',
    date: '2026-06-10',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Health Metrics Hub — Screen 40 with unified health score, pixel radar chart, vital signs grid, energy/habits tracking, and sleep/workout weekly summaries',
    screenName: 'Health Metrics Hub',
    screenSlug: '/health',
    category: 'tracker',
    summary: 'Unified health view combining vitals, energy, habits, sleep, and workouts into one pixel-art dashboard with a radar chart.',
    features: ['Unified health score (0-100)', 'Pixel radar chart (6 axes)', 'Vital signs grid (heart rate, BP, SpO2)', 'Energy & habits tracker', 'Sleep & workout weekly summary'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'SVG radar chart'],
    screenNum: 40,
    stars: 5,
    isNewScreen: false,
    pixelArtTheme: 'heart',
    buildNum: 40,
  },
  {
    id: 'b039',
    date: '2026-06-09',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Operations Center — Screen 39 with system health, agent status, missions tracker, and live activity feed',
    screenName: 'Operations Center',
    screenSlug: '/ops',
    category: 'monitoring',
    summary: 'Mission Control ops overview — CPU, RAM, disk, network gauges, active agent cards, mission progress, and live scrolling feed.',
    features: ['System health pixel gauges', 'Agent status cards with HP bars', 'Mission progress tracker', 'Live activity feed (auto-scrolling)', 'Uptime display'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Live intervals'],
    screenNum: 39,
    stars: 4,
    isNewScreen: false,
    pixelArtTheme: 'code',
    buildNum: 39,
  },
  {
    id: 'b038',
    date: '2026-06-08',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Weekly Review — Screen 38 with energy/mood trends, task heatmap, focus recap, wins/lessons/gratitude, and week intentions',
    screenName: 'Weekly Review',
    screenSlug: '/weekly',
    category: 'dashboard',
    summary: 'End-of-week reflection screen — energy/mood line charts, task heatmap, focus time recap, structured wins/lessons/gratitude, and next week intentions.',
    features: ['Energy/mood 7-day trend chart', 'Task completion heatmap', 'Focus time recap', 'Wins / Lessons / Gratitude sections', 'Week intentions for next week'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'SVG charts'],
    screenNum: 38,
    stars: 5,
    isNewScreen: false,
    pixelArtTheme: 'grid',
    buildNum: 38,
  },
  {
    id: 'b037',
    date: '2026-06-07',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Day in Review — Screen 37 with energy/mood/tasks/wins/lessons/gratitude and animated pixel sunset',
    screenName: 'Day in Review',
    screenSlug: '/dayreview',
    category: 'dashboard',
    summary: 'Daily end-of-day reflection — energy/mood scores, completed tasks, wins, lessons learned, gratitude, and a pixel sunset animation.',
    features: ['Energy & mood 1-5 scoring', 'Task completion list', 'Wins / Lessons / Gratitude structured notes', 'Animated pixel sunset (CSS)', 'Day score badge'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'CSS animation'],
    screenNum: 37,
    stars: 4,
    isNewScreen: false,
    pixelArtTheme: 'rocket',
    buildNum: 37,
  },
  {
    id: 'b036',
    date: '2026-06-06',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Workout Tracker — Screen 36 with run/gym/hiit sessions, 500km yearly goal, personal records, and energy tracking',
    screenName: 'Workout Tracker',
    screenSlug: '/workout',
    category: 'tracker',
    summary: 'Workout session tracker supporting run, gym, and HIIT — with yearly distance goal, personal records, and energy tracking.',
    features: ['Run / Gym / HIIT session types', '500km yearly distance goal', 'Personal records (PR) section', 'Energy before/after workout', 'Weekly volume chart'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'SVG progress'],
    screenNum: 36,
    stars: 4,
    isNewScreen: false,
    pixelArtTheme: 'heart',
    buildNum: 36,
  },
  {
    id: 'b035',
    date: '2026-06-05',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Daily Briefing — one-page morning overview (Screen 35)',
    screenName: 'Daily Briefing',
    screenSlug: '/briefing',
    category: 'dashboard',
    summary: 'Morning overview combining weather, calendar, tasks, stocks, and energy — everything Desss needs to start the day.',
    features: ['Current weather widget', 'Calendar events panel', 'Top 3 priority tasks', 'Stock ticker', 'Energy & mood morning check'],
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    screenNum: 35,
    stars: 5,
    isNewScreen: false,
    pixelArtTheme: 'rocket',
    buildNum: 35,
  },
  {
    id: 'b034',
    date: '2026-06-04',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Git Activity — commit timeline, repo stats, contribution graph (Screen 34)',
    screenName: 'Git Activity',
    screenSlug: '/git',
    category: 'dashboard',
    summary: 'GitHub-style contribution graph, repo statistics, and recent commit timeline — all in pixel art.',
    features: ['52-week contribution heatmap', 'Repo stats (stars, forks, commits)', 'Recent commit timeline', 'Language breakdown'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'SVG heatmap'],
    screenNum: 34,
    stars: 4,
    isNewScreen: false,
    pixelArtTheme: 'code',
    buildNum: 34,
  },
  {
    id: 'b033',
    date: '2026-06-03',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Reading Tracker — Screen 33 with books, articles, papers, courses, streaks, and tag filtering',
    screenName: 'Reading Tracker',
    screenSlug: '/reading',
    category: 'tracker',
    summary: 'Track books, articles, papers, and courses with reading streaks, progress bars, and tag filtering.',
    features: ['Books / Articles / Papers / Courses tabs', 'Reading streak counter', 'Progress bars per item', 'Tag-based filtering', 'Rating system (1-5 stars)'],
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    screenNum: 33,
    stars: 4,
    isNewScreen: false,
    pixelArtTheme: 'grid',
    buildNum: 33,
  },
  {
    id: 'b032',
    date: '2026-06-02',
    sgtTime: '04:00 SGT',
    commitMsg: '🌙 Nightly build: Sleep & Energy Tracker — Screen 32',
    screenName: 'Sleep & Energy Tracker',
    screenSlug: '/sleep',
    category: 'tracker',
    summary: 'Sleep quality tracking with duration, quality scores, REM/light/deep breakdown, and daily energy levels.',
    features: ['Sleep duration tracker', 'Quality score (1-5)', 'Sleep stage breakdown', 'Energy level timeline', 'Weekly sleep chart'],
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'SVG charts'],
    screenNum: 32,
    stars: 4,
    isNewScreen: false,
    pixelArtTheme: 'moon',
    buildNum: 32,
  },
];

// ─── Streak helpers ───────────────────────────────────────────────────────────

function calcStreak(buildList: BuildEntry[]): number {
  const sorted = [...buildList].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  let cur = new Date();
  for (const b of sorted) {
    const bd = new Date(b.date);
    const diff = Math.round((cur.getTime() - bd.getTime()) / 86400000);
    if (diff === streak) streak++;
    else break;
  }
  return streak;
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        i < count
          ? <PixelStar size={10} />
          : <span className="opacity-20"><PixelStar size={10} /></span>
      ))}
    </div>
  );
}

// ─── Pixel art preview thumbnails ─────────────────────────────────────────────

function PixelThumbnail({ theme }: { theme: string }) {
  const colors: Record<string, string[]> = {
    calendar: ['#818cf8', '#c7d2fe', '#e0e7ff', '#fef3c7'],
    grid: ['#6366f1', '#a5b4fc', '#c7d2fe', '#ddd6fe'],
    heart: ['#f472b6', '#fbcfe8', '#fce7f3', '#fda4af'],
    rocket: ['#a855f7', '#d8b4fe', '#f3e8ff', '#e9d5ff'],
    moon: ['#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0'],
    code: ['#22c55e', '#86efac', '#bbf7d0', '#dcfce7'],
  };
  const cols = colors[theme] || colors.grid;

  return (
    <div className="grid grid-cols-4 gap-0.5 p-2 rounded" style={{ backgroundColor: cols[3] }}>
      {Array.from({ length: 16 }, (_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-sm"
          style={{
            backgroundColor: cols[Math.floor(Math.random() * 3)],
            opacity: Math.random() > 0.3 ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function BuildHistoryPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ScreenCategory | 'all'>('all');
  const [selectedBuild, setSelectedBuild] = useState<BuildEntry | null>(null);

  const streak = calcStreak(builds);
  const totalBuilds = builds.length;

  const filtered = builds.filter(b => {
    if (categoryFilter !== 'all' && b.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!b.screenName.toLowerCase().includes(q) &&
          !b.summary.toLowerCase().includes(q) &&
          !b.features.some(f => f.toLowerCase().includes(q)) &&
          !b.commitMsg.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const categories: (ScreenCategory | 'all')[] = ['all', 'dashboard', 'tracker', 'automation', 'analytics', 'social', 'docs', 'monitoring', 'system'];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <PixelRocket size={20} />
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Build History</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {totalBuilds} builds logged ·{' '}
            <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
              <PixelFire size={10} /> {streak}-night streak
            </span>
          </p>
        </div>

        {/* Search + filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <PixelSparkleSmall size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search builds..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-md pl-7 pr-3 py-1.5 w-48 outline-none focus:border-gray-400"
            />
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5 overflow-x-auto max-w-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[9px] px-2 py-1 rounded font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="flex flex-col items-center">
            <PixelFire size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 font-mono">{streak}</p>
            <p className="text-[10px] text-gray-500">Night streak</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="flex flex-col items-center">
            <PixelRocket size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 font-mono">{totalBuilds}</p>
            <p className="text-[10px] text-gray-500">Total builds</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="flex flex-col items-center">
            <PixelGrid size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 font-mono">{builds.filter(b => b.isNewScreen).length}</p>
            <p className="text-[10px] text-gray-500">New screens</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
          <div className="flex flex-col items-center">
            <PixelMoonSmall size={24} className="text-slate-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 font-mono">
              {builds.reduce((s, b) => s + b.stars, 0)}
            </p>
            <p className="text-[10px] text-gray-500">Total stars</p>
          </div>
        </div>
      </div>

      {/* Build list */}
      <div className="space-y-3">
        {filtered.map(build => (
          <div
            key={build.id}
            className={`bg-white border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-sm ${
              selectedBuild?.id === build.id ? 'border-indigo-300 shadow-sm' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedBuild(selectedBuild?.id === build.id ? null : build)}
          >
            <div className="flex items-stretch">
              {/* Left accent bar */}
              <div
                className="w-1.5 shrink-0"
                style={{ backgroundColor: categoryDot[build.category].replace('bg-', 'var(--').replace('-400', ', 0.6)').replace('bg-', 'var(--').replace('-400', ')') }}
                data-color={categoryDot[build.category]}
              />

              {/* Pixel thumbnail */}
              <div className="p-4 flex items-center border-r border-gray-100">
                <PixelThumbnail theme={build.pixelArtTheme} />
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{build.screenName}</h3>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded border font-medium uppercase ${categoryColors[build.category]}`}>
                        {build.category}
                      </span>
                      {build.isNewScreen && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 border border-indigo-200 font-medium uppercase">
                          NEW
                        </span>
                      )}
                      <Stars count={build.stars} />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{build.summary}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {build.tech.slice(0, 4).map(t => (
                        <span key={t} className="text-[8px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="shrink-0 text-right">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                      <PixelClock size={9} />
                      {build.sgtTime}
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">{build.date}</div>
                    <div className="text-[9px] text-indigo-400 font-mono mt-1">#{build.buildNum}</div>
                  </div>
                </div>

                {/* Expanded detail */}
                {selectedBuild?.id === build.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Features</p>
                        <ul className="space-y-1">
                          {build.features.map(f => (
                            <li key={f} className="flex items-center gap-1.5">
                              <PixelCheck size={8} className="text-green-500 shrink-0" />
                              <span className="text-xs text-gray-600">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Commit</p>
                        <p className="text-[9px] text-gray-500 font-mono leading-relaxed bg-gray-50 rounded p-2 border border-gray-100">
                          {build.commitMsg}
                        </p>
                        <a
                          href={build.screenSlug}
                          className="inline-flex items-center gap-1 mt-3 text-[10px] text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          → View screen
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <PixelSparkle size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No builds match your search</p>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="text-center py-4">
        <p className="text-[9px] text-gray-300 font-mono">
          Nightly builds run at 04:00 SGT · Built with love by Des_bot
        </p>
      </div>
    </div>
  );
}