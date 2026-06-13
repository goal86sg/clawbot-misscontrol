'use client';

import React, { useState } from 'react';
import { PixelSparkle, PixelHeart } from '@/lib/pixel-icons';
import { PixelHabits } from '@/lib/pixel-icons-extra';

// ─── Pixel Plant Sprites ───────────────────────────────────────────────────────

type PlantStage = 0 | 1 | 2 | 3 | 4 | 5;
type PlantType = 'succulent' | 'flower' | 'tree' | 'herb' | 'cactus' | 'moss';

function SeedSprout({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Soil */}
      <rect x="2" y="13" width="12" height="3" fill="currentColor" opacity="0.15" />
      <rect x="4" y="13" width="8" height="1" fill="currentColor" opacity="0.25" />
      {/* Seed */}
      <rect x="7" y="10" width="2" height="3" fill="currentColor" opacity="0.3" />
      <rect x="6" y="9" width="4" height="1" fill="currentColor" opacity="0.2" />
      {/* Tiny sprout */}
      <rect x="7" y="7" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="8" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function YoungPlant({ size = 48, color = 'text-green-500', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={`${color} ${className}`} shapeRendering="crispEdges">
      {/* Soil */}
      <rect x="2" y="13" width="12" height="3" fill="currentColor" opacity="0.15" />
      {/* Stem */}
      <rect x="7" y="8" width="2" height="5" fill="currentColor" opacity="0.7" />
      {/* Small leaves */}
      <rect x="5" y="7" width="2" height="2" fill="currentColor" />
      <rect x="9" y="7" width="2" height="2" fill="currentColor" />
      <rect x="6" y="6" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="8" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="11" y="8" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function GrowingPlant({ size = 48, color = 'text-green-500', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={`${color} ${className}`} shapeRendering="crispEdges">
      {/* Soil */}
      <rect x="2" y="13" width="12" height="3" fill="currentColor" opacity="0.15" />
      {/* Main stem */}
      <rect x="7" y="4" width="2" height="9" fill="currentColor" opacity="0.7" />
      {/* Leaves lower */}
      <rect x="4" y="9" width="3" height="2" fill="currentColor" />
      <rect x="9" y="9" width="3" height="2" fill="currentColor" />
      {/* Leaves middle */}
      <rect x="5" y="7" width="2" height="2" fill="currentColor" />
      <rect x="9" y="7" width="2" height="2" fill="currentColor" />
      {/* Leaves upper */}
      <rect x="6" y="5" width="4" height="2" fill="currentColor" />
      {/* Top bud */}
      <rect x="6" y="3" width="4" height="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function BloomingPlant({ size = 48, flowerColor = 'text-pink-500', className = '' }: { size?: number; flowerColor?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Soil */}
      <rect x="2" y="13" width="12" height="3" fill="currentColor" opacity="0.15" />
      {/* Stem */}
      <rect x="7" y="4" width="2" height="9" fill="currentColor" opacity="0.7" />
      {/* Leaves */}
      <rect x="4" y="9" width="3" height="2" fill="currentColor" />
      <rect x="9" y="9" width="3" height="2" fill="currentColor" />
      <rect x="5" y="7" width="2" height="2" fill="currentColor" />
      <rect x="9" y="7" width="2" height="2" fill="currentColor" />
      <rect x="6" y="5" width="4" height="2" fill="currentColor" />
      {/* Flower */}
      <rect x="5" y="1" width="6" height="3" fill={flowerColor} className={flowerColor} />
      <rect x="6" y="0" width="4" height="1" fill={flowerColor} className={flowerColor} opacity="0.6" />
      <rect x="4" y="2" width="1" height="2" fill={flowerColor} className={flowerColor} opacity="0.6" />
      <rect x="11" y="2" width="1" height="2" fill={flowerColor} className={flowerColor} opacity="0.6" />
      <rect x="6" y="3" width="4" height="1" fill={flowerColor} className={flowerColor} opacity="0.4" />
    </svg>
  );
}

function FlourishingPlant({ size = 56, flowerColor = 'text-pink-500', className = '' }: { size?: number; flowerColor?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Soil mound */}
      <rect x="1" y="13" width="14" height="3" fill="currentColor" opacity="0.15" />
      <rect x="3" y="12" width="10" height="1" fill="currentColor" opacity="0.1" />
      {/* Main stem */}
      <rect x="7" y="3" width="2" height="10" fill="currentColor" opacity="0.7" />
      {/* Branch left */}
      <rect x="4" y="6" width="3" height="2" fill="currentColor" />
      <rect x="2" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
      {/* Branch right */}
      <rect x="9" y="6" width="3" height="2" fill="currentColor" />
      <rect x="12" y="5" width="2" height="1" fill="currentColor" opacity="0.5" />
      {/* Lower leaves */}
      <rect x="4" y="9" width="3" height="2" fill="currentColor" />
      <rect x="9" y="9" width="3" height="2" fill="currentColor" />
      {/* Upper leaves */}
      <rect x="5" y="5" width="2" height="2" fill="currentColor" />
      <rect x="9" y="5" width="2" height="2" fill="currentColor" />
      {/* Top cluster */}
      <rect x="6" y="2" width="4" height="2" fill="currentColor" />
      {/* Flower bloom */}
      <rect x="5" y="0" width="6" height="2" fill={flowerColor} className={flowerColor} />
      <rect x="4" y="1" width="1" height="2" fill={flowerColor} className={flowerColor} opacity="0.6" />
      <rect x="11" y="1" width="1" height="2" fill={flowerColor} className={flowerColor} opacity="0.6" />
      <rect x="6" y="1" width="1" height="1" fill={flowerColor} className={flowerColor} opacity="0.3" />
      <rect x="9" y="1" width="1" height="1" fill={flowerColor} className={flowerColor} opacity="0.3" />
      {/* Sparkle */}
      <rect x="13" y="3" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="14" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function WiltedPlant({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      {/* Dry soil */}
      <rect x="2" y="13" width="12" height="3" fill="currentColor" opacity="0.1" />
      <rect x="3" y="12" width="10" height="1" fill="currentColor" opacity="0.08" />
      {/* Droopy stem */}
      <rect x="6" y="8" width="2" height="4" fill="currentColor" opacity="0.3" />
      <rect x="8" y="6" width="2" height="3" fill="currentColor" opacity="0.25" />
      {/* Droopy leaves */}
      <rect x="5" y="9" width="3" height="1" fill="currentColor" opacity="0.2" />
      <rect x="4" y="10" width="2" height="1" fill="currentColor" opacity="0.15" />
      <rect x="8" y="7" width="2" height="1" fill="currentColor" opacity="0.2" />
      {/* Wilted top */}
      <rect x="9" y="5" width="2" height="1" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

// ─── Pixel Decorations ────────────────────────────────────────────────────────

function PixelSunny({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      <rect x="1" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="6" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelCloud({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-gray-300" shapeRendering="crispEdges">
      <rect x="2" y="2" width="4" height="2" fill="currentColor" />
      <rect x="1" y="3" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="7" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelRaindrop({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.8" />
      <rect x="2" y="2" width="4" height="2" fill="currentColor" />
      <rect x="3" y="4" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="4" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelButterfly({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-400" shapeRendering="crispEdges">
      <rect x="3" y="2" width="2" height="4" fill="currentColor" opacity="0.5" />
      <rect x="1" y="1" width="2" height="2" fill="currentColor" />
      <rect x="5" y="1" width="2" height="2" fill="currentColor" />
      <rect x="0" y="3" width="2" height="2" fill="currentColor" opacity="0.7" />
      <rect x="6" y="3" width="2" height="2" fill="currentColor" opacity="0.7" />
      <rect x="2" y="4" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="4" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelFence({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="text-amber-700" shapeRendering="crispEdges">
      <rect x="1" y="4" width="2" height="10" fill="currentColor" opacity="0.7" />
      <rect x="7" y="4" width="2" height="10" fill="currentColor" opacity="0.7" />
      <rect x="13" y="4" width="2" height="10" fill="currentColor" opacity="0.7" />
      <rect x="0" y="5" width="3" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="5" width="3" height="2" fill="currentColor" opacity="0.5" />
      <rect x="12" y="5" width="3" height="2" fill="currentColor" opacity="0.5" />
      <rect x="0" y="9" width="16" height="2" fill="currentColor" opacity="0.6" />
      <rect x="0" y="12" width="16" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelWateringCan({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="3" y="6" width="8" height="6" fill="currentColor" opacity="0.8" />
      <rect x="4" y="5" width="6" height="1" fill="currentColor" />
      <rect x="11" y="5" width="3" height="1" fill="currentColor" opacity="0.6" />
      <rect x="13" y="6" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="14" y="7" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="8" width="1" height="2" fill="currentColor" opacity="0.4" />
      {/* Water drops */}
      <rect x="8" y="12" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="10" y="13" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface GardenHabit {
  id: string;
  name: string;
  type: PlantType;
  streak: number;
  stage: PlantStage;
  lastWatered: string;
  color: string;
  flowerColor: string;
  category: string;
}

interface DayEntry {
  date: string;
  value: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const gardenHabits: GardenHabit[] = [
  { id: '1', name: 'Morning Pages', type: 'flower', streak: 14, stage: 5, lastWatered: '2026-06-12', color: 'text-amber-500', flowerColor: 'text-amber-400', category: 'creative' },
  { id: '2', name: 'Run 5K', type: 'tree', streak: 7, stage: 4, lastWatered: '2026-06-12', color: 'text-green-600', flowerColor: 'text-orange-400', category: 'fitness' },
  { id: '3', name: 'Read 30m', type: 'herb', streak: 21, stage: 5, lastWatered: '2026-06-12', color: 'text-emerald-500', flowerColor: 'text-teal-400', category: 'knowledge' },
  { id: '4', name: 'Meditate', type: 'moss', streak: 3, stage: 2, lastWatered: '2026-06-11', color: 'text-purple-500', flowerColor: 'text-violet-400', category: 'wellness' },
  { id: '5', name: 'Drink Water', type: 'succulent', streak: 30, stage: 5, lastWatered: '2026-06-12', color: 'text-cyan-500', flowerColor: 'text-sky-400', category: 'health' },
  { id: '6', name: 'No Sugar', type: 'cactus', streak: 5, stage: 3, lastWatered: '2026-06-12', color: 'text-green-500', flowerColor: 'text-pink-400', category: 'health' },
  { id: '7', name: 'Code Challenge', type: 'tree', streak: 10, stage: 4, lastWatered: '2026-06-12', color: 'text-blue-600', flowerColor: 'text-cyan-400', category: 'tech' },
  { id: '8', name: 'Gratitude', type: 'flower', streak: 2, stage: 1, lastWatered: '2026-06-11', color: 'text-rose-500', flowerColor: 'text-red-400', category: 'wellness' },
];

const weekHistory: Record<string, DayEntry[]> = {
  '1': [
    { date: '2026-06-06', value: 1 }, { date: '2026-06-07', value: 1 }, { date: '2026-06-08', value: 1 },
    { date: '2026-06-09', value: 1 }, { date: '2026-06-10', value: 1 }, { date: '2026-06-11', value: 1 }, { date: '2026-06-12', value: 1 },
  ],
  '2': [
    { date: '2026-06-06', value: 0 }, { date: '2026-06-07', value: 1 }, { date: '2026-06-08', value: 1 },
    { date: '2026-06-09', value: 0 }, { date: '2026-06-10', value: 1 }, { date: '2026-06-11', value: 1 }, { date: '2026-06-12', value: 1 },
  ],
  '3': [
    { date: '2026-06-06', value: 1 }, { date: '2026-06-07', value: 1 }, { date: '2026-06-08', value: 1 },
    { date: '2026-06-09', value: 1 }, { date: '2026-06-10', value: 1 }, { date: '2026-06-11', value: 1 }, { date: '2026-06-12', value: 1 },
  ],
  '4': [
    { date: '2026-06-06', value: 0 }, { date: '2026-06-07', value: 0 }, { date: '2026-06-08', value: 1 },
    { date: '2026-06-09', value: 1 }, { date: '2026-06-10', value: 0 }, { date: '2026-06-11', value: 0 }, { date: '2026-06-12', value: 0 },
  ],
  '5': [
    { date: '2026-06-06', value: 1 }, { date: '2026-06-07', value: 1 }, { date: '2026-06-08', value: 1 },
    { date: '2026-06-09', value: 1 }, { date: '2026-06-10', value: 1 }, { date: '2026-06-11', value: 1 }, { date: '2026-06-12', value: 1 },
  ],
  '6': [
    { date: '2026-06-06', value: 1 }, { date: '2026-06-07', value: 1 }, { date: '2026-06-08', value: 0 },
    { date: '2026-06-09', value: 1 }, { date: '2026-06-10', value: 1 }, { date: '2026-06-11', value: 1 }, { date: '2026-06-12', value: 1 },
  ],
  '7': [
    { date: '2026-06-06', value: 1 }, { date: '2026-06-07', value: 1 }, { date: '2026-06-08', value: 1 },
    { date: '2026-06-09', value: 1 }, { date: '2026-06-10', value: 1 }, { date: '2026-06-11', value: 1 }, { date: '2026-06-12', value: 1 },
  ],
  '8': [
    { date: '2026-06-06', value: 0 }, { date: '2026-06-07', value: 0 }, { date: '2026-06-08', value: 1 },
    { date: '2026-06-09', value: 1 }, { date: '2026-06-10', value: 0 }, { date: '2026-06-11', value: 0 }, { date: '2026-06-12', value: 0 },
  ],
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ─── Plant Renderer ───────────────────────────────────────────────────────────

function PlantDisplay({ habit, size = 56 }: { habit: GardenHabit; size?: number }) {
  if (habit.streak === 0) return <SeedSprout size={size} className={habit.color} />;
  if (habit.stage === 1) return <YoungPlant size={size} color={habit.color} />;
  if (habit.stage === 2) return <GrowingPlant size={size} color={habit.color} />;
  if (habit.stage === 3) return <BloomingPlant size={size} flowerColor={habit.flowerColor} />;
  if (habit.stage === 4) return <BloomingPlant size={size * 0.9} flowerColor={habit.flowerColor} />;
  return <FlourishingPlant size={size} flowerColor={habit.flowerColor} />;
}

// ─── Week Grid ────────────────────────────────────────────────────────────────

function WeekGrid({ habitId }: { habitId: string }) {
  const history = weekHistory[habitId] || [];
  const today = new Date('2026-06-13');
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);

  return (
    <div className="flex items-center gap-0.5">
      {weekDays.map((day, i) => {
        const dayDate = new Date(monday);
        dayDate.setDate(monday.getDate() + i);
        const dateStr = dayDate.toISOString().split('T')[0];
        const entry = history.find(h => h.date === dateStr);
        const done = entry?.value === 1;
        return (
          <div
            key={day}
            className={`w-4 h-4 rounded-sm flex items-center justify-center text-[7px] font-bold transition-all ${
              done
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-50 text-gray-300 border border-gray-100'
            }`}
            title={day}
          >
            {done ? '✓' : ''}
          </div>
        );
      })}
    </div>
  );
}

// ─── Garden Tile ──────────────────────────────────────────────────────────────

function GardenTile({ habit, onWater }: { habit: GardenHabit; onWater: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const isWilted = habit.stage <= 1 && habit.streak > 0 && habit.streak < 3;
  const needsWater = habit.lastWatered !== '2026-06-12';

  return (
    <div
      className={`relative bg-white border rounded-xl p-4 flex flex-col items-center gap-2 transition-all cursor-pointer ${
        hovered ? 'border-gray-300 shadow-md -translate-y-0.5' : 'border-gray-100'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onWater(habit.id)}
    >
      {/* Status indicators */}
      <div className="absolute top-2 right-2 flex gap-1">
        {needsWater && (
          <span title="Needs water today!" className="animate-pulse">
            <PixelRaindrop size={10} />
          </span>
        )}
        {habit.streak >= 7 && (
          <span title={`${habit.streak}-day streak!`}>
            <PixelButterfly size={10} />
          </span>
        )}
      </div>

      {/* Plant */}
      <div className={`transition-transform ${hovered ? 'scale-110' : ''}`}>
        {isWilted ? (
          <WiltedPlant size={52} className={habit.color} />
        ) : (
          <PlantDisplay habit={habit} size={52} />
        )}
      </div>

      {/* Name */}
      <p className="text-[11px] font-semibold text-gray-800 text-center leading-tight">{habit.name}</p>

      {/* Streak */}
      <div className="flex items-center gap-1">
        <PixelSunny size={10} />
        <span className="text-[10px] font-bold text-amber-600">{habit.streak}d</span>
      </div>

      {/* Week dots */}
      <WeekGrid habitId={habit.id} />

      {/* Hover tooltip */}
      {hovered && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap z-10">
          Click to water ✨
        </div>
      )}
    </div>
  );
}

// ─── Garden Stats ─────────────────────────────────────────────────────────────

function GardenStats() {
  const totalStreak = gardenHabits.reduce((sum, h) => sum + h.streak, 0);
  const avgStage = (gardenHabits.reduce((sum, h) => sum + h.stage, 0) / gardenHabits.length).toFixed(1);
  const flourishing = gardenHabits.filter(h => h.stage === 5).length;
  const todayWatered = gardenHabits.filter(h => h.lastWatered === '2026-06-12').length;

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="bg-white border border-gray-100 rounded-lg p-3 flex items-center gap-2.5">
        <PixelSunny size={18} />
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Total Streak Days</p>
          <p className="text-lg font-bold text-gray-900">{totalStreak}</p>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg p-3 flex items-center gap-2.5">
        <PixelPlant size={18} className="text-green-500" />
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Avg Growth Stage</p>
          <p className="text-lg font-bold text-gray-900">{avgStage}<span className="text-xs text-gray-400">/5</span></p>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg p-3 flex items-center gap-2.5">
        <FlourishingPlant size={18} flowerColor="text-pink-400" />
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Flourishing</p>
          <p className="text-lg font-bold text-gray-900">{flourishing}<span className="text-xs text-gray-400">/{gardenHabits.length}</span></p>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg p-3 flex items-center gap-2.5">
        <PixelWateringCan size={18} />
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Watered Today</p>
          <p className="text-lg font-bold text-gray-900">{todayWatered}<span className="text-xs text-gray-400">/{gardenHabits.length}</span></p>
        </div>
      </div>
    </div>
  );
}

// Missing PixelPlant icon
function PixelPlant({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="7" y="4" width="2" height="8" fill="currentColor" opacity="0.7" />
      <rect x="5" y="6" width="6" height="2" fill="currentColor" />
      <rect x="4" y="4" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="10" y="4" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="6" y="2" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="7" y="1" width="2" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GardenPage() {
  const [habits, setHabits] = useState<GardenHabit[]>(gardenHabits);
  const [filter, setFilter] = useState<'all' | 'healthy' | 'needs-care'>('all');
  const [justWatered, setJustWatered] = useState<string | null>(null);

  const handleWater = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const newStreak = h.streak + 1;
      const newStage = Math.min(5, h.stage + (newStreak % 7 === 0 ? 1 : 0)) as PlantStage;
      return { ...h, streak: newStreak, stage: newStage, lastWatered: '2026-06-12' };
    }));
    setJustWatered(id);
    setTimeout(() => setJustWatered(null), 1200);
  };

  const filteredHabits = habits.filter(h => {
    if (filter === 'healthy') return h.stage >= 3;
    if (filter === 'needs-care') return h.stage < 3 || h.lastWatered !== '2026-06-12';
    return true;
  });

  const categories = [
    { key: 'all' as const, label: 'All Plants' },
    { key: 'healthy' as const, label: '🌿 Flourishing' },
    { key: 'needs-care' as const, label: '💧 Needs Care' },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <PixelHabits size={20} className="text-green-500" />
            Habit Garden
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Grow something beautiful every day</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-white border border-gray-100 rounded-lg px-3 py-1.5">
            <PixelWateringCan size={16} />
            <span>Click a plant to water it!</span>
          </div>
        </div>
      </div>

      {/* Sky decoration row */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center gap-4">
          <PixelSunny size={18} />
          <div className="flex gap-1">
            <PixelCloud size={16} />
            <PixelCloud size={14} />
            <PixelCloud size={12} />
          </div>
          <PixelRaindrop size={12} />
          <PixelRaindrop size={10} />
        </div>
        <div className="flex items-center gap-2">
          <PixelButterfly size={14} />
          <PixelButterfly size={12} />
          <PixelFence size={32} />
        </div>
      </div>

      {/* Stats */}
      <GardenStats />

      {/* Filter */}
      <div className="flex items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
              filter === cat.key
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Garden Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filteredHabits.map(habit => (
          <div key={habit.id} className="relative">
            {justWatered === habit.id && (
              <div className="absolute inset-0 bg-green-50 rounded-xl border border-green-300 flex items-center justify-center z-20 animate-pulse">
                <div className="text-center">
                  <FlourishingPlant size={40} flowerColor={habit.flowerColor} />
                  <p className="text-[10px] text-green-700 font-bold mt-1">✨ Watered!</p>
                </div>
              </div>
            )}
            <GardenTile habit={habit} onWater={handleWater} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-white border border-gray-100 rounded-lg px-5 py-4">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Growth Stages</p>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <SeedSprout size={20} className="text-gray-400" />
            <span className="text-[11px] text-gray-500">Seed</span>
          </div>
          <div className="flex items-center gap-2">
            <YoungPlant size={20} color="text-green-400" />
            <span className="text-[11px] text-gray-500">Sprout</span>
          </div>
          <div className="flex items-center gap-2">
            <GrowingPlant size={20} color="text-green-500" />
            <span className="text-[11px] text-gray-500">Growing</span>
          </div>
          <div className="flex items-center gap-2">
            <BloomingPlant size={20} flowerColor="text-pink-400" />
            <span className="text-[11px] text-gray-500">Blooming</span>
          </div>
          <div className="flex items-center gap-2">
            <FlourishingPlant size={24} flowerColor="text-pink-400" />
            <span className="text-[11px] text-gray-500">Flourishing</span>
          </div>
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
            <WiltedPlant size={20} className="text-gray-400" />
            <span className="text-[11px] text-gray-500">Wilted (needs love)</span>
          </div>
        </div>
      </div>
    </div>
  );
}