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

const navItems = [
  { href: '/', label: 'Dashboard', icon: PixelHome },
  { href: '/agents', label: 'Agents', icon: PixelAgents },
  { href: '/missions', label: 'Missions', icon: PixelMission },
  { href: '/vitals', label: 'Vitals', icon: PixelHeart },
  { href: '/terminal', label: 'Terminal', icon: PixelTerminal },
  { href: '/settings', label: 'Settings', icon: PixelSettings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
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
          <span className="font-semibold text-sm text-gray-900 tracking-tight">
            MISSION<br />CONTROL
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors group ${
                isActive
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon
                size={18}
                className={isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}
              />
              {item.label}
              {item.label === 'Missions' && (
                <span className="ml-auto bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>System Online</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-gray-400">
            <rect x="0" y="2" width="2" height="4" fill="currentColor" />
            <rect x="3" y="0" width="2" height="8" fill="currentColor" />
            <rect x="6" y="2" width="2" height="4" fill="currentColor" />
          </svg>
          <span className="text-[10px] text-gray-400">v1.0.0-beta</span>
        </div>
      </div>
    </aside>
  );
};
