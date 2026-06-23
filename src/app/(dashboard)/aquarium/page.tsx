'use client';

import React, { useState, useEffect, useCallback } from 'react';

// ─── Pixel Art Icons ─────────────────────────────────────────────────────────

function PixelFish({ size = 16, color = '#3b82f6' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="1" y="3" width="5" height="2" fill={color} opacity="0.8" />
      <rect x="0" y="2" width="2" height="4" fill={color} opacity="0.6" />
      <rect x="6" y="3" width="2" height="2" fill={color} opacity="0.4" />
      <rect x="7" y="2" width="1" height="1" fill={color} opacity="0.3" />
      <rect x="7" y="5" width="1" height="1" fill={color} opacity="0.3" />
      <rect x="2" y="2" width="1" height="1" fill={color} opacity="0.4" />
      <rect x="2" y="5" width="1" height="1" fill={color} opacity="0.4" />
      <rect x="3" y="3" width="1" height="1" fill="white" opacity="0.9" />
    </svg>
  );
}

function PixelGoldfish({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="0" y="3" width="5" height="2" fill="#f97316" opacity="0.9" />
      <rect x="5" y="2" width="2" height="4" fill="#fb923c" opacity="0.5" />
      <rect x="7" y="1" width="1" height="2" fill="#fdba74" opacity="0.4" />
      <rect x="7" y="5" width="1" height="2" fill="#fdba74" opacity="0.4" />
      <rect x="1" y="2" width="1" height="1" fill="#fed7aa" opacity="0.5" />
      <rect x="1" y="5" width="1" height="1" fill="#fed7aa" opacity="0.5" />
      <rect x="2" y="3" width="1" height="1" fill="white" />
    </svg>
  );
}

function PixelAngelfish({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="2" y="0" width="2" height="2" fill="#a78bfa" opacity="0.4" />
      <rect x="1" y="1" width="5" height="6" fill="#8b5cf6" opacity="0.7" />
      <rect x="2" y="1" width="3" height="6" fill="#a78bfa" opacity="0.5" />
      <rect x="6" y="3" width="2" height="2" fill="#8b5cf6" opacity="0.5" />
      <rect x="0" y="2" width="2" height="4" fill="#c4b5fd" opacity="0.3" />
      <rect x="2" y="3" width="1" height="1" fill="white" opacity="0.9" />
    </svg>
  );
}

function PixelBetta({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="2" y="2" width="3" height="3" fill="#ec4899" opacity="0.8" />
      <rect x="1" y="1" width="2" height="2" fill="#f472b6" opacity="0.5" />
      <rect x="5" y="1" width="3" height="2" fill="#f472b6" opacity="0.4" />
      <rect x="6" y="2" width="2" height="1" fill="#ec4899" opacity="0.3" />
      <rect x="5" y="3" width="3" height="2" fill="#f472b6" opacity="0.4" />
      <rect x="6" y="5" width="2" height="2" fill="#f472b6" opacity="0.3" />
      <rect x="3" y="3" width="1" height="1" fill="white" />
      <rect x="0" y="3" width="2" height="1" fill="#ec4899" opacity="0.5" />
    </svg>
  );
}

function PixelBubble({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 4 4" shapeRendering="crispEdges">
      <rect x="1" y="0" width="2" height="2" fill="#93c5fd" opacity="0.3" />
      <rect x="0" y="1" width="2" height="2" fill="#93c5fd" opacity="0.2" />
      <rect x="2" y="1" width="2" height="2" fill="#93c5fd" opacity="0.3" />
      <rect x="1" y="2" width="2" height="2" fill="#93c5fd" opacity="0.2" />
      <rect x="0" y="2" width="1" height="1" fill="white" opacity="0.5" />
    </svg>
  );
}

function PixelSeaweed({ height = 24 }: { height?: number }) {
  return (
    <svg width="12" height={height} viewBox="0 0 6 12" shapeRendering="crispEdges">
      <rect x="0" y="0" width="2" height="2" fill="#22c55e" opacity="0.4" />
      <rect x="1" y="2" width="2" height="2" fill="#22c55e" opacity="0.5" />
      <rect x="0" y="4" width="2" height="2" fill="#22c55e" opacity="0.6" />
      <rect x="2" y="6" width="2" height="2" fill="#22c55e" opacity="0.5" />
      <rect x="1" y="8" width="2" height="2" fill="#22c55e" opacity="0.6" />
      <rect x="0" y="10" width="2" height="2" fill="#22c55e" opacity="0.4" />
      <rect x="3" y="1" width="2" height="2" fill="#16a34a" opacity="0.3" />
      <rect x="4" y="3" width="2" height="2" fill="#16a34a" opacity="0.4" />
      <rect x="3" y="5" width="2" height="2" fill="#16a34a" opacity="0.3" />
      <rect x="4" y="7" width="2" height="2" fill="#16a34a" opacity="0.4" />
      <rect x="3" y="9" width="2" height="2" fill="#16a34a" opacity="0.3" />
    </svg>
  );
}

function PixelCoral({ color = '#f43f5e' }: { color?: string }) {
  return (
    <svg width="20" height="16" viewBox="0 0 10 8" shapeRendering="crispEdges">
      <rect x="1" y="3" width="2" height="5" fill={color} opacity="0.4" />
      <rect x="4" y="1" width="2" height="7" fill={color} opacity="0.5" />
      <rect x="7" y="2" width="2" height="6" fill={color} opacity="0.4" />
      <rect x="0" y="4" width="2" height="4" fill={color} opacity="0.3" />
      <rect x="3" y="2" width="2" height="6" fill={color} opacity="0.6" />
      <rect x="6" y="3" width="2" height="5" fill={color} opacity="0.5" />
      <rect x="8" y="4" width="2" height="4" fill={color} opacity="0.3" />
    </svg>
  );
}

function PixelTreasureChest({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="1" y="4" width="6" height="3" fill="#92400e" opacity="0.8" />
      <rect x="0" y="3" width="8" height="2" fill="#b45309" opacity="0.7" />
      <rect x="2" y="2" width="4" height="2" fill="#d97706" opacity="0.5" />
      <rect x="3" y="3" width="2" height="2" fill="#fbbf24" opacity="0.8" />
      <rect x="3" y="1" width="2" height="2" fill="#fbbf24" opacity="0.4" />
      <rect x="2" y="2" width="1" height="1" fill="#fef3c7" opacity="0.6" />
      <rect x="0" y="7" width="2" height="1" fill="#92400e" opacity="0.3" />
      <rect x="6" y="7" width="2" height="1" fill="#92400e" opacity="0.3" />
    </svg>
  );
}

function PixelStarfish({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="2" fill="#fb923c" opacity="0.7" />
      <rect x="0" y="3" width="2" height="2" fill="#fb923c" opacity="0.7" />
      <rect x="6" y="3" width="2" height="2" fill="#fb923c" opacity="0.7" />
      <rect x="3" y="6" width="2" height="2" fill="#fb923c" opacity="0.7" />
      <rect x="3" y="3" width="2" height="2" fill="#fdba74" opacity="0.9" />
    </svg>
  );
}

function PixelShark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 6" shapeRendering="crispEdges">
      <rect x="0" y="2" width="10" height="2" fill="#64748b" opacity="0.8" />
      <rect x="10" y="2" width="2" height="1" fill="#64748b" opacity="0.5" />
      <rect x="10" y="4" width="2" height="1" fill="#64748b" opacity="0.5" />
      <rect x="1" y="1" width="2" height="1" fill="#64748b" opacity="0.5" />
      <rect x="2" y="0" width="2" height="2" fill="#64748b" opacity="0.4" />
      <rect x="3" y="2" width="1" height="1" fill="white" opacity="0.9" />
    </svg>
  );
}

function PixelCastle({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" shapeRendering="crispEdges">
      <rect x="0" y="10" width="14" height="4" fill="#94a3b8" opacity="0.3" />
      <rect x="1" y="6" width="12" height="5" fill="#94a3b8" opacity="0.5" />
      <rect x="3" y="2" width="3" height="5" fill="#cbd5e1" opacity="0.5" />
      <rect x="8" y="2" width="3" height="5" fill="#cbd5e1" opacity="0.5" />
      <rect x="5" y="0" width="4" height="7" fill="#e2e8f0" opacity="0.5" />
      <rect x="6" y="8" width="2" height="3" fill="#64748b" opacity="0.4" />
      <rect x="4" y="4" width="1" height="1" fill="#fef3c7" opacity="0.7" />
      <rect x="9" y="4" width="1" height="1" fill="#fef3c7" opacity="0.7" />
      <rect x="6" y="2" width="2" height="2" fill="#93c5fd" opacity="0.3" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Fish {
  id: string;
  type: 'goldfish' | 'angelfish' | 'betta' | 'shark' | 'generic';
  name: string;
  earnedFor: string;
  earnedAt: string;
  x: number; // percentage position
  y: number;
  speed: number;
  direction: 1 | -1;
  color: string;
  size: number;
  lastReward?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  tier: 'bronze' | 'silver' | 'gold' | 'legendary';
  reward: string;
}

interface AquariumStats {
  totalFish: number;
  totalAchievements: number;
  unlockedAchievements: number;
  longestStreak: number;
  currentStreak: number;
  treasuresCollected: number;
  level: number;
  xp: number;
  xpToNext: number;
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

const initialFish: Fish[] = [
  { id: 'fish-1', type: 'goldfish', name: 'Morning Glory', earnedFor: '7-day meditation streak', earnedAt: '2026-05-15', x: 20, y: 45, speed: 1.2, direction: 1, color: '#f97316' },
  { id: 'fish-2', type: 'angelfish', name: 'Deep Thought', earnedFor: 'Completed "Understanding Git" article', earnedAt: '2026-05-18', x: 65, y: 30, speed: 0.8, direction: -1, color: '#8b5cf6' },
  { id: 'fish-3', type: 'betta', name: 'Crimson Fin', earnedFor: '10/10 on weekly review', earnedAt: '2026-05-22', x: 40, y: 60, speed: 1.5, direction: 1, color: '#ec4899' },
  { id: 'fish-4', type: 'generic', name: 'Pixel', earnedFor: 'First habit check-in', earnedAt: '2026-05-10', x: 80, y: 20, speed: 1.0, direction: -1, color: '#3b82f6' },
  { id: 'fish-5', type: 'goldfish', name: 'Sunny', earnedFor: '5-day exercise streak', earnedAt: '2026-05-20', x: 35, y: 75, speed: 1.3, direction: 1, color: '#fb923c' },
  { id: 'fish-6', type: 'generic', name: 'Bubble', earnedFor: 'Logged 3 days in a row', earnedAt: '2026-05-12', x: 55, y: 40, speed: 0.9, direction: 1, color: '#06b6d4' },
];

const achievements: Achievement[] = [
  { id: 'ach-1', title: 'First Splash', description: 'Add your first habit', icon: '🐟', unlockedAt: '2026-05-10', tier: 'bronze', reward: '1 common fish', progress: 1, maxProgress: 1 },
  { id: 'ach-2', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', unlockedAt: '2026-05-15', tier: 'silver', reward: '1 rare fish', progress: 7, maxProgress: 7 },
  { id: 'ach-3', title: 'Deep Diver', description: 'Log sleep data for 14 days', icon: '🌙', tier: 'silver', reward: '1 angelfish', progress: 9, maxProgress: 14 },
  { id: 'ach-4', title: 'Bookworm', description: 'Finish 5 books', icon: '📚', tier: 'gold', reward: '1 betta fish', progress: 3, maxProgress: 5 },
  { id: 'ach-5', title: 'Focus Master', description: 'Accumulate 50h of deep focus', icon: '⚡', tier: 'gold', reward: '1 shark', progress: 32, maxProgress: 50 },
  { id: 'ach-6', title: 'Legend', description: 'Maintain 30-day streak', icon: '👑', tier: 'legendary', reward: 'Golden castle + 3 rare fish', progress: 5, maxProgress: 30 },
  { id: 'ach-7', title: 'Treasure Hunter', description: 'Collect 10 treasures', icon: '💎', tier: 'bronze', reward: '1 treasure chest decor', progress: 4, maxProgress: 10 },
  { id: 'ach-8', title: 'Perfect Week', description: 'Complete all daily goals in a week', icon: '⭐', unlockedAt: '2026-05-18', tier: 'gold', reward: '2 rare fish', progress: 1, maxProgress: 1 },
];

const stats: AquariumStats = {
  totalFish: 6,
  totalAchievements: achievements.length,
  unlockedAchievements: achievements.filter(a => a.unlockedAt).length,
  longestStreak: 14,
  currentStreak: 5,
  treasuresCollected: 4,
  level: 7,
  xp: 2450,
  xpToNext: 3000,
};

const decorItems = [
  { type: 'seaweed', x: 5, height: 48 },
  { type: 'seaweed', x: 18, height: 32 },
  { type: 'coral', x: 75, color: '#f43f5e' },
  { type: 'coral', x: 88, color: '#fb923c' },
  { type: 'starfish', x: 30, y: 88 },
  { type: 'treasure', x: 55, y: 85 },
  { type: 'castle', x: 60, y: 75 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: Achievement['tier'] }) {
  const styles = {
    bronze: 'bg-amber-100 text-amber-700 border-amber-200',
    silver: 'bg-gray-100 text-gray-500 border-gray-300',
    gold: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    legendary: 'bg-purple-100 text-purple-700 border-purple-300',
  };
  return (
    <span className={`text-[7px] px-1 py-0.5 rounded border font-bold uppercase ${styles[tier]}`}>
      {tier}
    </span>
  );
}

function XPBar({ value, max }: { value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-mono text-gray-400">{value}/{max} XP</span>
    </div>
  );
}

// ─── Fish Renderer ───────────────────────────────────────────────────────────

function FishRenderer({ fish }: { fish: Fish }) {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="absolute transition-all pointer-events-none"
      style={{
        left: `${fish.x}%`,
        top: `${fish.y}%`,
        transform: `scaleX(${fish.direction})`,
      }}
    >
      {fish.type === 'goldfish' && <PixelGoldfish size={fish.size} />}
      {fish.type === 'angelfish' && <PixelAngelfish size={fish.size} />}
      {fish.type === 'betta' && <PixelBetta size={fish.size} />}
      {fish.type === 'shark' && <PixelShark size={fish.size} />}
      {fish.type === 'generic' && <PixelFish size={fish.size} color={fish.color} />}
    </div>
  );
}

// ─── Bubble Animation ─────────────────────────────────────────────────────────

function Bubbles() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => {
        const next = [...prev, {
          id: Date.now(),
          x: 10 + Math.random() * 80,
          delay: 0,
          size: 4 + Math.floor(Math.random() * 6),
        }];
        return next.slice(-12);
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {bubbles.map((b, i) => (
        <div
          key={b.id}
          className="absolute rounded-full animate-bounce"
          style={{
            left: `${b.x}%`,
            bottom: '10%',
            width: b.size,
            height: b.size,
            backgroundColor: 'rgba(147, 197, 253, 0.3)',
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AquariumPage() {
  const [fish, setFish] = useState<Fish[]>(initialFish);
  const [time, setTime] = useState('');
  const [activeTab, setActiveTab] = useState<'aquarium' | 'achievements' | 'stats'>('aquarium');
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore',
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Animate fish swimming
  useEffect(() => {
    const interval = setInterval(() => {
      setFish(prev => prev.map(f => {
        let newX = f.x + f.speed * f.direction * 0.3;
        let newY = f.y + Math.sin(Date.now() * 0.001 + f.x) * 0.2;
        let newDirection = f.direction;

        if (newX > 88) newDirection = -1;
        if (newX < 5) newDirection = 1;
        newX = Math.max(5, Math.min(88, newX));
        newY = Math.max(8, Math.min(78, newY));

        return { ...f, x: newX, y: newY, direction: newDirection as 1 | -1 };
      }));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const levelProgress = Math.round((stats.xp / stats.xpToNext) * 100);

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <PixelFish size={20} color="white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Aquarium</h1>
            <p className="text-xs text-gray-500 mt-0.5">Your habits, swimming alive</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded">
            <PixelBubble size={10} />
            <span>{time}</span>
          </div>
          <span className="text-[10px] font-mono bg-cyan-50 text-cyan-600 px-2 py-1 rounded border border-cyan-100">
            Lvl {stats.level}
          </span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <PixelStar size={12} />
          <span className="text-[10px] text-gray-500 font-medium">Level {stats.level}</span>
        </div>
        <XPBar value={stats.xp} max={stats.xpToNext} />
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <span>🔥</span>
            <span>{stats.currentStreak} day streak</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <span>🏆</span>
            <span>{stats.unlockedAchievements}/{stats.totalAchievements} achievements</span>
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex bg-gray-100 rounded-lg p-0.5 w-fit">
        {(['aquarium', 'achievements', 'stats'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-[11px] font-medium rounded-md transition-all ${
              activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'aquarium' ? '🎐 Aquarium' : tab === 'achievements' ? '🏆 Achievements' : '📊 Stats'}
          </button>
        ))}
      </div>

      {/* Aquarium View */}
      {activeTab === 'aquarium' && (
        <>
          <div className="relative w-full rounded-xl overflow-hidden border border-blue-200 shadow-inner"
               style={{
                 height: 320,
                 background: 'linear-gradient(180deg, #bfdbfe 0%, #93c5fd 40%, #60a5fa 100%)',
               }}>
            {/* Sky reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-200/30 to-transparent pointer-events-none" />

            {/* Water surface shimmer */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Sand floor */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-200 to-amber-100 pointer-events-none" />

            {/* Decor: seaweed */}
            {decorItems.filter(d => d.type === 'seaweed').map((d, i) => (
              <div key={i} className="absolute bottom-6" style={{ left: `${d.x}%` }}>
                <PixelSeaweed height={(d as any).height || 32} />
              </div>
            ))}

            {/* Decor: coral */}
            {decorItems.filter(d => d.type === 'coral').map((d, i) => (
              <div key={i} className="absolute bottom-6" style={{ left: `${d.x}%` }}>
                <PixelCoral color={(d as any).color || '#f43f5e'} />
              </div>
            ))}

            {/* Decor: starfish */}
            {decorItems.filter(d => d.type === 'starfish').map((d, i) => (
              <div key={i} className="absolute" style={{ left: `${d.x}%`, bottom: '8%' }}>
                <PixelStarfish size={14} />
              </div>
            ))}

            {/* Decor: treasure */}
            {decorItems.filter(d => d.type === 'treasure').map((d, i) => (
              <div key={i} className="absolute" style={{ left: `${d.x}%`, bottom: '8%' }}>
                <PixelTreasureChest size={18} />
              </div>
            ))}

            {/* Decor: castle */}
            {decorItems.filter(d => d.type === 'castle').map((d, i) => (
              <div key={i} className="absolute" style={{ left: `${d.x}%`, bottom: '8%' }}>
                <PixelCastle size={32} />
              </div>
            ))}

            {/* Bubbles */}
            <Bubbles />

            {/* Fish */}
            {fish.map(f => (
              <FishRenderer key={f.id} fish={f} />
            ))}

            {/* Click hint */}
            <div className="absolute bottom-2 right-3 text-[9px] text-blue-300 font-mono">
              click a fish to name it
            </div>
          </div>

          {/* Fish Collection Strip */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700">Fish Collection</span>
                <span className="text-[9px] text-gray-400">{fish.length} fish</span>
              </div>
              <span className="text-[9px] text-gray-400">
                {achievements.filter(a => a.unlockedAt).length}/{achievements.length} achievements unlocked
              </span>
            </div>
            <div className="flex gap-3 px-4 py-3 overflow-x-auto">
              {fish.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFish(selectedFish?.id === f.id ? null : f)}
                  className={`shrink-0 flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                    selectedFish?.id === f.id
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="scale-x-[-1]">
                    {f.type === 'goldfish' && <PixelGoldfish size={18} />}
                    {f.type === 'angelfish' && <PixelAngelfish size={18} />}
                    {f.type === 'betta' && <PixelBetta size={18} />}
                    {f.type === 'shark' && <PixelShark size={20} />}
                    {f.type === 'generic' && <PixelFish size={16} color={f.color} />}
                  </div>
                  <span className="text-[9px] font-medium text-gray-600 whitespace-nowrap">{f.name}</span>
                </button>
              ))}

              {/* Empty slot */}
              <div className="shrink-0 flex flex-col items-center gap-1.5 p-2 rounded-lg border border-dashed border-gray-200 opacity-40">
                <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-300 text-[9px]">+</span>
                </div>
                <span className="text-[9px] text-gray-400">more fish</span>
              </div>
            </div>
          </div>

          {/* Selected Fish Detail */}
          {selectedFish && (
            <div className="bg-white border border-blue-200 rounded-xl px-4 py-3 flex items-start gap-4">
              <div className="scale-x-[-1]">
                {selectedFish.type === 'goldfish' && <PixelGoldfish size={32} />}
                {selectedFish.type === 'angelfish' && <PixelAngelfish size={32} />}
                {selectedFish.type === 'betta' && <PixelBetta size={32} />}
                {selectedFish.type === 'shark' && <PixelShark size={40} />}
                {selectedFish.type === 'generic' && <PixelFish size={28} color={selectedFish.color} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{selectedFish.name}</h3>
                  <TierBadge tier={
                    selectedFish.type === 'shark' ? 'legendary' :
                    selectedFish.type === 'betta' || selectedFish.type === 'angelfish' ? 'gold' :
                    selectedFish.type === 'goldfish' ? 'silver' : 'bronze'
                  } />
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Earned for: <span className="text-gray-700">{selectedFish.earnedFor}</span>
                </p>
                <p className="text-[9px] text-gray-400 mt-0.5">Unlocked {selectedFish.earnedAt}</p>
              </div>
              <button
                onClick={() => setSelectedFish(null)}
                className="text-[9px] text-gray-400 hover:text-gray-600 px-2 py-1 border border-gray-200 rounded"
              >
                ✕ close
              </button>
            </div>
          )}
        </>
      )}

      {/* Achievements View */}
      {activeTab === 'achievements' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {achievements.map(ach => {
              const isUnlocked = !!ach.unlockedAt;
              const progress = ach.maxProgress ? Math.round((ach.progress / ach.maxProgress) * 100) : 100;

              return (
                <div
                  key={ach.id}
                  className={`rounded-xl border p-4 transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200'
                      : 'bg-white border-gray-200 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      isUnlocked ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      {ach.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold text-gray-900">{ach.title}</h3>
                        <TierBadge tier={ach.tier} />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">{ach.description}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">Reward: {ach.reward}</p>
                      {isUnlocked ? (
                        <p className="text-[9px] text-green-600 mt-1 font-medium">✓ Unlocked {ach.unlockedAt}</p>
                      ) : ach.maxProgress ? (
                        <div className="mt-2">
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-[9px] text-gray-400 mt-0.5">{ach.progress}/{ach.maxProgress}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats View */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Fish', value: stats.totalFish, icon: '🐟', color: 'text-blue-600' },
              { label: 'Achievements', value: `${stats.unlockedAchievements}/${stats.totalAchievements}`, icon: '🏆', color: 'text-yellow-600' },
              { label: 'Current Streak', value: `${stats.currentStreak} days`, icon: '🔥', color: 'text-orange-500' },
              { label: 'Best Streak', value: `${stats.longestStreak} days`, icon: '⭐', color: 'text-amber-600' },
              { label: 'Level', value: stats.level, icon: '🎮', color: 'text-purple-600' },
              { label: 'Treasures', value: stats.treasuresCollected, icon: '💎', color: 'text-cyan-600' },
              { label: 'Total XP', value: stats.xp.toLocaleString(), icon: '✨', color: 'text-indigo-600' },
              { label: 'XP to Next', value: (stats.xpToNext - stats.xp).toLocaleString(), icon: '📈', color: 'text-green-600' },
            ].map(stat => (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span>{stat.icon}</span>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{stat.label}</p>
                </div>
                <p className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent unlocks */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Recent Unlocks</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { fish: 'Morning Glory', type: 'goldfish', reward: '7-day meditation streak', date: 'May 15' },
                { fish: 'Deep Thought', type: 'angelfish', reward: 'Completed "Understanding Git"', date: 'May 18' },
                { fish: 'Crimson Fin', type: 'betta', reward: '10/10 on weekly review', date: 'May 22' },
              ].map((item, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50/50">
                  <div className="scale-x-[-1]">
                    {item.type === 'goldfish' && <PixelGoldfish size={16} />}
                    {item.type === 'angelfish' && <PixelAngelfish size={16} />}
                    {item.type === 'betta' && <PixelBetta size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">{item.fish}</p>
                    <p className="text-[9px] text-gray-400">for: {item.reward}</p>
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-3">
            <span className="text-lg">💡</span>
            <div>
              <p className="text-[11px] font-semibold text-blue-700">How the Aquarium Works</p>
              <p className="text-[10px] text-blue-600 mt-1 leading-relaxed">
                Complete habits, achieve goals, and read books to earn fish. Each achievement tier unlocks rarer fish with unique colors and patterns. Keep your streaks alive — your fish are counting on you! Higher streaks unlock legendary fish like sharks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-center gap-1 opacity-20 pt-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-cyan-400"
            style={{
              opacity: Math.sin(i * 0.7) * 0.4 + 0.5,
              borderRadius: i % 3 === 0 ? '50%' : '2px',
            }}
          />
        ))}
      </div>
      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Aquarium · {fish.length} fish swimming
      </p>
    </div>
  );
}
