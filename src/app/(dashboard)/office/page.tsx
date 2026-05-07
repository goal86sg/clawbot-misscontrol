'use client';

import React, { useState, useEffect } from 'react';
import { PixelAvatar } from '@/components/PixelAvatar';
import { PixelHeart, PixelSparkle, PixelClock } from '@/lib/pixel-icons';

interface DeskAgent {
  id: string;
  name: string;
  type: 'cyber' | 'scout' | 'engineer' | 'guardian';
  status: 'working' | 'idle' | 'away' | 'sleeping';
  deskX: number;
  deskY: number;
  currentTask: string;
}

const agents: DeskAgent[] = [
  { id: 'AG-001', name: 'Des_bot', type: 'cyber', status: 'working', deskX: 2, deskY: 1, currentTask: 'Building 7 screens for Mission Control' },
  { id: 'AG-002', name: 'guarddog', type: 'guardian', status: 'idle', deskX: 5, deskY: 1, currentTask: 'Waiting for 23:00 audit' },
  { id: 'AG-003', name: 'NBuilder', type: 'engineer', status: 'sleeping', deskX: 8, deskY: 1, currentTask: 'Charging for tonight\'s build' },
  { id: 'AG-004', name: 'S Scout', type: 'scout', status: 'idle', deskX: 1, deskY: 4, currentTask: 'Next stock check at 08:00' },
  { id: 'AG-005', name: 'R Scout', type: 'scout', status: 'idle', deskX: 4, deskY: 4, currentTask: 'Route check complete' },
  { id: 'AG-006', name: 'NewsHound', type: 'engineer', status: 'working', deskX: 7, deskY: 4, currentTask: 'Scanning K8s RSS feeds...' },
];

const statusEmoji: Record<string, string> = {
  working: '🟢',
  idle: '🟡',
  away: '⚪',
  sleeping: '💤',
};

const statusLabel: Record<string, string> = {
  working: 'working',
  idle: 'idle',
  away: 'away',
  sleeping: 'sleeping',
};

const GRID_W = 12;
const GRID_H = 7;

export default function OfficePage() {
  const [tick, setTick] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState<DeskAgent | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  // Update agent statuses based on time
  useEffect(() => {
    const hour = new Date().getHours();
    agents.forEach(a => {
      if (a.id === 'AG-003') {
        a.status = (hour >= 0 && hour < 4) ? 'working' : 'sleeping';
      }
      if (a.id === 'AG-002') {
        a.status = (hour === 23) ? 'working' : 'idle';
      }
    });
  }, [tick]);

  const getAgentAt = (x: number, y: number) => agents.find(a => a.deskX === x && a.deskY === y);

  // Pixel-art office elements
  const renderCell = (x: number, y: number) => {
    const agent = getAgentAt(x, y);

    // Floor pattern
    const isFloor = y >= 3;
    const isWall = y === 2;
    const isDesk = agent !== undefined;

    let bg = 'bg-gray-50';
    if (isFloor) bg = 'bg-amber-50';
    if (isWall) bg = 'bg-gray-200';

    return (
      <div
        key={`${x}-${y}`}
        className={`relative border border-gray-100/50 flex items-center justify-center ${bg}`}
        style={{ width: 72, height: 72 }}
      >
        {/* Desk */}
        {isDesk && (
          <div className="absolute inset-1 flex flex-col items-center justify-center">
            {/* Desk surface */}
            <div className="w-12 h-8 bg-gray-400 rounded-sm relative">
              {/* Monitor */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-6 bg-gray-300 rounded-sm border border-gray-400">
                <div className={`w-6 h-4 mx-auto mt-0.5 rounded-sm ${agent.status === 'working' ? 'bg-blue-400' : 'bg-gray-500'}`}>
                  {agent.status === 'working' && (
                    <div className="flex gap-0.5 p-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-green-300" style={{ opacity: Math.sin(tick * 0.5 + i) > 0 ? 1 : 0.3 }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Chair + agent */}
            <div className="relative mt-0.5">
              <div className="w-8 h-4 bg-gray-500 rounded-t-sm mx-auto" />
              <div className={`transform scale-75 -mt-8 ${agent.status === 'idle' ? 'opacity-60' : agent.status === 'sleeping' ? 'opacity-30' : ''}`}>
                <PixelAvatar agent={agent.type} size={24} />
              </div>
            </div>
          </div>
        )}

        {/* Wall decorations */}
        {isWall && !isDesk && (
          <>
            {/* Clock on wall */}
            {x === 6 && y === 2 && (
              <div className="text-[9px] font-mono text-gray-500 bg-white border border-gray-300 rounded px-1 py-0.5">
                🕐 {new Date().getHours().toString().padStart(2, '0')}:{new Date().getMinutes().toString().padStart(2, '0')}
              </div>
            )}
            {/* Whiteboard */}
            {x === 9 && y === 2 && (
              <div className="bg-white border border-gray-300 rounded-sm w-14 h-8 p-1">
                <div className="text-[6px] text-gray-400 font-mono leading-tight">
                  TODOs:<br />
                  □ deploy<br />
                  □ commit<br />
                  ☑ coffee
                </div>
              </div>
            )}
            {/* Window */}
            {x === 0 && y === 2 && (
              <div className="w-10 h-8 bg-blue-100 border-2 border-gray-400 rounded-sm relative overflow-hidden">
                <div className="absolute top-1 left-1 w-3 h-2 bg-yellow-200 rounded-full" />
                <div className="absolute bottom-0 w-full h-1 bg-green-300" />
              </div>
            )}
          </>
        )}

        {/* Floor details */}
        {isFloor && !isDesk && (
          <span className="text-[20px] opacity-20 select-none">
            {['🌿', '🪴', '📦', '☕', '', '🖨️', '🗄️', '', '📚', '💡', '', '🪑'][(x * 7 + y) % 12]}
          </span>
        )}

        {/* Status dot */}
        {isDesk && (
          <div className="absolute top-1 right-1 flex items-center gap-0.5">
            <span className="text-[8px]">{statusEmoji[agent.status]}</span>
          </div>
        )}

        {/* Click area */}
        {isDesk && (
          <button className="absolute inset-0" onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)} />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Visual Office</h1>
          <p className="text-xs text-gray-500 mt-0.5">{agents.filter(a => a.status === 'working').length} agents working · Live view</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-gray-400 font-mono">🟢 working</span>
          <span className="text-[9px] text-gray-400 font-mono">🟡 idle</span>
          <span className="text-[9px] text-gray-400 font-mono">💤 sleeping</span>
        </div>
      </div>

      {/* Office grid */}
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        {/* Office header bar */}
        <div className="bg-gray-800 text-white px-4 py-1.5 flex items-center justify-between text-[9px] font-mono">
          <span>🏢 DES_BOT HQ — FLOOR 1</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {agents.filter(a => a.status === 'working').length}/{agents.length} ACTIVE
          </span>
        </div>

        <div className="p-4">
          {/* Grid */}
          <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${GRID_W}, 72px)`, gridTemplateRows: `repeat(${GRID_H}, 72px)` }}>
            {Array.from({ length: GRID_H }).flatMap((_, y) =>
              Array.from({ length: GRID_W }).map((_, x) => renderCell(x, y))
            )}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4 text-[9px] text-gray-400 font-mono">
            <span>🚪 DOOR</span>
            <span>🪟 WINDOW</span>
            <span>📋 WHITEBOARD</span>
            <span>🕐 CLOCK</span>
          </div>
        </div>
      </div>

      {/* Selected agent detail */}
      {selectedAgent && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
          <PixelAvatar agent={selectedAgent.type} size={40} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-gray-900">{selectedAgent.name}</p>
              <span className="text-[8px] text-gray-400 font-mono">{selectedAgent.id}</span>
              <span className={`text-[9px] ${selectedAgent.status === 'working' ? 'text-green-600' : selectedAgent.status === 'idle' ? 'text-yellow-600' : 'text-gray-400'}`}>
                {statusEmoji[selectedAgent.status]} {statusLabel[selectedAgent.status]}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">🎯 {selectedAgent.currentTask}</p>
          </div>
          <div className="text-[10px] text-gray-400">
            Desk [{selectedAgent.deskX}, {selectedAgent.deskY}]
          </div>
        </div>
      )}

      {/* Agent roster quick view */}
      <div className="grid grid-cols-6 gap-3">
        {agents.map(agent => (
          <div key={agent.id}
            className={`bg-white border rounded-lg p-2 text-center cursor-pointer transition-all hover:border-gray-400 ${selectedAgent?.id === agent.id ? 'border-gray-900 shadow-sm' : 'border-gray-200'}`}
            onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}>
            <div className="flex justify-center">
              <PixelAvatar agent={agent.type} size={24} />
            </div>
            <p className="text-[8px] font-medium text-gray-900 mt-1">{agent.name}</p>
            <p className="text-[7px] text-gray-400">{statusEmoji[agent.status]} {statusLabel[agent.status]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
