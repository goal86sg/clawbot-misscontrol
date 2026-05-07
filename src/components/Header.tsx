'use client';

import React from 'react';
import { PixelSparkle } from '@/lib/pixel-icons';

export const Header: React.FC = () => {
  return (
    <header
      className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0"
      style={{
        backgroundImage:
          'linear-gradient(90deg, transparent 15px, rgba(0,0,0,0.02) 1px)',
        backgroundSize: '16px 100%',
      }}
    >
      <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
        <PixelSparkle size={14} className="text-yellow-500" />
        <span>SYS::STATUS::NOMINAL</span>
        <span className="text-gray-300">|</span>
        <span>UPTIME: 127:32:15</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-gray-400">
            <rect x="1" y="1" width="6" height="6" fill="currentColor" />
            <rect x="2" y="2" width="4" height="4" fill="white" />
            <rect x="0" y="0" width="1" height="1" fill="currentColor" />
            <rect x="7" y="7" width="1" height="1" fill="currentColor" />
          </svg>
          LOG
        </button>
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 8 8" shapeRendering="crispEdges" className="text-gray-400">
            <rect x="0" y="0" width="8" height="2" fill="currentColor" />
            <rect x="0" y="3" width="8" height="1" fill="currentColor" opacity="0.4" />
            <rect x="0" y="5" width="8" height="1" fill="currentColor" opacity="0.4" />
            <rect x="0" y="7" width="8" height="1" fill="currentColor" opacity="0.2" />
          </svg>
          EXPORT
        </button>
        <div className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">D</span>
        </div>
      </div>
    </header>
  );
};
