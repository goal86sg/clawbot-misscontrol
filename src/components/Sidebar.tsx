'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PixelHome,
  PixelAgents,
  PixelMission,
  PixelTerminal,
  PixelSettings,
  PixelHeart,
} from '@/lib/pixel-icons';
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
  PixelRituals,
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
  PixelDevTools,
  PixelYearInPixels,
  PixelBuilds,
  PixelIncidents,
  PixelApiMonitor,
  PixelMindGarden,
  PixelAquarium,
  PixelWinWall,
} from '@/lib/pixel-icons-extra';
import { PixelSunset } from '@/lib/pixel-icons';
import { PixelFinance, PixelSkills } from '@/lib/pixel-icons-extra';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/briefing', label: 'Briefing', icon: PixelBriefing },
      { href: '/dayreview', label: 'Day Review', icon: PixelSunset },
      { href: '/weekly', label: 'Weekly Review', icon: PixelWeekly },
      { href: '/week-ahead', label: 'Week Ahead', icon: PixelCalendar },
      { href: '/standup', label: 'Standup', icon: PixelStandup },
      { href: '/', label: 'Dashboard', icon: PixelHome },
      { href: '/vitals', label: 'Vitals', icon: PixelHeart },
      { href: '/weather', label: 'Weather', icon: PixelWeather },
      { href: '/commute', label: 'Commute', icon: PixelCommute },
      { href: '/activity', label: 'Activity', icon: PixelActivity },
      { href: '/spending', label: 'Spending', icon: PixelSpending },
      { href: '/income', label: 'Income', icon: PixelIncome },
      { href: '/goals', label: 'Goals', icon: PixelGoals },
      { href: '/focus', label: 'Focus', icon: PixelFocus },
      { href: '/finance', label: 'Finance', icon: PixelFinance },
      { href: '/habits', label: 'Habits', icon: PixelHabits },
      { href: '/rituals', label: 'Rituals', icon: PixelRituals },
      { href: '/mind-garden', label: 'Mind Garden', icon: PixelMindGarden },
      { href: '/aquarium', label: 'Aquarium', icon: PixelAquarium },
      { href: '/win-wall', label: 'Win Wall', icon: PixelWinWall },
      { href: '/workout', label: 'Workout', icon: PixelDumbbell },
      { href: '/journal', label: 'Journal', icon: PixelJournal },
      { href: '/sleep', label: 'Sleep', icon: PixelSleep },
      { href: '/reading', label: 'Reading', icon: PixelReading },
      { href: '/git', label: 'Git', icon: PixelGit },
      { href: '/year-in-pixels', label: 'Year in Pixels', icon: PixelYearInPixels },
      { href: '/skills', label: 'Skills', icon: PixelSkills },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/ops', label: 'Ops Center', icon: PixelOpsCenter },
      { href: '/monitor', label: 'Monitor', icon: PixelMonitor },
      { href: '/docker', label: 'Docker', icon: PixelDocker },
      { href: '/tasks', label: 'Tasks', icon: PixelTasks },
      { href: '/calendar', label: 'Calendar', icon: PixelCalendar },
      { href: '/agents', label: 'Agents', icon: PixelAgents },
      { href: '/missions', label: 'Missions', icon: PixelMission },
      { href: '/notifications', label: 'Notifications', icon: PixelBell },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      { href: '/projects', label: 'Projects', icon: PixelProjects },
      { href: '/snippets', label: 'Snippets', icon: PixelSnippets },
      { href: '/links', label: 'Links', icon: PixelLink },
      { href: '/portfolio', label: 'Portfolio', icon: PixelPortfolio },
      { href: '/memory', label: 'Memory', icon: PixelMemory },
      { href: '/docs', label: 'Docs', icon: PixelDocs },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { href: '/commandbar', label: 'Command Bar', icon: PixelCommandBar },
      { href: '/pulse', label: 'Pulse', icon: PixelPulse },
      { href: '/sound', label: 'Sound', icon: PixelSound },
      { href: '/team', label: 'Team', icon: PixelTeam },
      { href: '/office', label: 'Office', icon: PixelOffice },
      { href: '/terminal', label: 'Terminal', icon: PixelTerminal },
      { href: '/builds', label: 'Builds', icon: PixelBuilds },
      { href: '/incidents', label: 'Incidents', icon: PixelIncidents },
      { href: '/api-monitor', label: 'API Monitor', icon: PixelApiMonitor },
      { href: '/devtools', label: 'Dev Tools', icon: PixelDevTools },
      { href: '/settings', label: 'Settings', icon: PixelSettings },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col min-h-screen overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg width="28" height="28" viewBox="0 0 8 8" shapeRendering="crispEdges">
              <rect x="2" y="0" width="4" height="2" fill="#1a1a2e" />
              <rect x="1" y="2" width="6" height="2" fill="#e94560" />
              <rect x="0" y="4" width="8" height="2" fill="#1a1a2e" />
              <rect x="1" y="6" width="2" height="2" fill="#e94560" />
              <rect x="5" y="6" width="2" height="2" fill="#e94560" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-gray-900 tracking-tight leading-tight">
            MISSION<br />CONTROL
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-4">
        {navGroups.map(group => (
          <div key={group.label}>
            <span className="px-3 text-[9px] font-semibold text-gray-300 uppercase tracking-widest">{group.label}</span>
            <div className="mt-1 space-y-0.5">
              {group.items.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] transition-colors group ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon
                      size={16}
                      className={isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}
                    />
                    {item.label}
                    {item.label === 'Missions' && (
                      <span className="ml-auto bg-red-100 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                    )}
                    {item.label === 'Tasks' && (
                      <span className="ml-auto bg-blue-100 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full">1</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 sticky bottom-0 bg-white">
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span>System Online</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-gray-400">
            <rect x="0" y="2" width="2" height="4" fill="currentColor" />
            <rect x="3" y="0" width="2" height="8" fill="currentColor" />
            <rect x="6" y="2" width="2" height="4" fill="currentColor" />
          </svg>
          <span className="text-[9px] text-gray-400">v2.32.0 · 59 screens</span>
        </div>
      </div>
    </aside>
  );
};