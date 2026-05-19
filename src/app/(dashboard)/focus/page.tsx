'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PixelClock, PixelCheck, PixelAlert, PixelSparkle, PixelPlay } from '@/lib/pixel-icons';
import { PixelFocus } from '@/lib/pixel-icons-extra';

// ─── Config ───────────────────────────────────────────────────────────────────

const WORK_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;
const SESSIONS_BEFORE_LONG_BREAK = 4;

// ─── Pixel Timer Ring ─────────────────────────────────────────────────────────

function PixelRing({
  progress,
  size = 200,
  strokeWidth = 12,
  bgColor = '#e5e7eb',
  fgColor = '#3b82f6',
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  bgColor?: string;
  fgColor?: string;
}) {
  const segments = 32;
  const filled = Math.round((1 - progress) * segments);
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth) / 2 - 4;

  return (
    <svg width={size} height={size} className="pixel-ring">
      {/* Background dots */}
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return (
          <rect
            key={i}
            x={x - 4}
            y={y - 4}
            width={8}
            height={8}
            fill={i >= filled ? fgColor : bgColor}
            shapeRendering="crispEdges"
          />
        );
      })}
    </svg>
  );
}

// ─── Pixel Fire (streak) ───────────────────────────────────────────────────────

function PixelFire({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="inline-block" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="#f59e0b" />
      <rect x="2" y="1" width="4" height="1" fill="#f59e0b" />
      <rect x="1" y="2" width="6" height="1" fill="#ef4444" />
      <rect x="1" y="3" width="6" height="2" fill="#f59e0b" />
      <rect x="2" y="5" width="4" height="2" fill="#ef4444" />
      <rect x="3" y="7" width="2" height="1" fill="#fbbf24" />
    </svg>
  );
}

// ─── Session History ───────────────────────────────────────────────────────────

interface Session {
  type: 'work' | 'break';
  duration: number;
  label: string;
  completedAt: string;
}

const fakeSessions: Session[] = [
  { type: 'work', duration: 25, label: 'eBPF architecture review', completedAt: '09:32' },
  { type: 'work', duration: 25, label: 'Mission Control standup prep', completedAt: '10:45' },
  { type: 'break', duration: 5, label: 'Short break', completedAt: '11:12' },
  { type: 'work', duration: 25, label: 'Postgres DAM query analysis', completedAt: '11:45' },
  { type: 'work', duration: 25, label: 'Writing spending tracker notes', completedAt: '14:05' },
  { type: 'break', duration: 15, label: 'Long break', completedAt: '14:38' },
  { type: 'work', duration: 25, label: 'Nightly build coding', completedAt: '15:30' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FocusPage() {
  const [mode, setMode] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(WORK_MINUTES * 60);
  const [sessionsToday, setSessionsToday] = useState(4);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(100);
  const [tick, setTick] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showComplete, setShowComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const modeLabel = mode === 'work' ? 'FOCUS' : mode === 'short-break' ? 'SHORT BREAK' : 'LONG BREAK';
  const totalSeconds = (mode === 'work' ? WORK_MINUTES : mode === 'short-break' ? SHORT_BREAK_MINUTES : LONG_BREAK_MINUTES) * 60;
  const progress = secondsLeft / totalSeconds;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => s - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Tick animation
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 800);
    return () => clearInterval(id);
  }, []);

  // Mode-specific colors
  const modeColors: Record<string, { primary: string; bg: string; ring: string; accent: string }> = {
    work: { primary: '#3b82f6', bg: '#eff6ff', ring: '#3b82f6', accent: '#1d4ed8' },
    'short-break': { primary: '#10b981', bg: '#ecfdf5', ring: '#10b981', accent: '#059669' },
    'long-break': { primary: '#8b5cf6', bg: '#f5f3ff', ring: '#8b5cf6', accent: '#7c3aed' },
  };
  const colors = modeColors[mode];

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft((mode === 'work' ? WORK_MINUTES : mode === 'short-break' ? SHORT_BREAK_MINUTES : LONG_BREAK_MINUTES) * 60);
    setShowComplete(false);
  };

  const switchMode = (newMode: typeof mode) => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft((newMode === 'work' ? WORK_MINUTES : newMode === 'short-break' ? SHORT_BREAK_MINUTES : LONG_BREAK_MINUTES) * 60);
    setShowComplete(false);
  };

  const completeSession = () => {
    if (mode === 'work') {
      setSessionsToday(s => s + 1);
      setTotalFocusMinutes(m => m + WORK_MINUTES);
    }
    setShowComplete(true);
    setIsRunning(false);
    // Auto-switch
    setTimeout(() => {
      if (mode === 'work') {
        const next = sessionsToday % SESSIONS_BEFORE_LONG_BREAK === 0 ? 'long-break' : 'short-break';
        switchMode(next);
      } else {
        switchMode('work');
      }
      setShowComplete(false);
    }, 2000);
  };

  // Check if timer finished
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      completeSession();
    }
  }, [secondsLeft, isRunning]);

  const sparkles = ['✦', '✧', '⋆', '✶'];
  const animSparkle = sparkles[tick % 4];

  return (
    <div className="max-w-5xl space-y-6">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded">
            FOCUS v1.0
          </div>
          <div className="text-xs font-mono text-gray-400">Pomodoro Timer</div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
          <PixelClock size={12} />
          <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' })}</span>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center justify-center gap-2">
        {(['work', 'short-break', 'long-break'] as const).map(m => {
          const labels = { work: 'Focus', 'short-break': 'Short Break', 'long-break': 'Long Break' };
          const durations = { work: '25 min', 'short-break': '5 min', 'long-break': '15 min' };
          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-4 py-2 rounded-md text-[11px] font-medium transition-all ${
                mode === m
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {labels[m]}
              <span className="ml-1.5 text-[9px] opacity-60">{durations[m]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Timer + Stats Grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Timer Card */}
        <div className="col-span-2 flex flex-col items-center">
          <div
            className="relative rounded-2xl p-8 flex flex-col items-center justify-center"
            style={{ backgroundColor: colors.bg, border: `2px solid ${colors.ring}20` }}
          >
            {/* Mode label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.primary }}>
                {animSparkle} {modeLabel}
              </span>
            </div>

            {/* Pixel Ring Timer */}
            <div className="relative">
              <PixelRing progress={progress} size={220} strokeWidth={14} bgColor={`${colors.ring}20`} fgColor={colors.ring} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold font-mono tracking-tight" style={{ color: colors.primary, letterSpacing: '-0.05em' }}>
                  {timeDisplay}
                </div>
                <div className="text-[10px] text-gray-400 mt-1 font-mono">
                  {isRunning ? '● RUNNING' : secondsLeft === totalSeconds ? '○ READY' : '⏸ PAUSED'}
                </div>
              </div>
            </div>

            {/* Current task */}
            {currentTask && (
              <div className="mt-4 px-4 py-2 bg-white/60 rounded-md max-w-xs">
                <p className="text-[10px] text-gray-500 truncate">Working on: <span className="text-gray-700 font-medium">{currentTask}</span></p>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-3 mt-6">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-xs font-semibold transition-transform hover:scale-105 active:scale-95"
                  style={{ backgroundColor: colors.primary }}
                >
                  <PixelPlay size={12} />
                  Start
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold transition-transform hover:scale-105 active:scale-95"
                >
                  <span className="text-[10px]">⏸</span>
                  Pause
                </button>
              )}
              <button
                onClick={resetTimer}
                className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-500 text-xs font-medium hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Sound toggle */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setSoundEnabled(s => !s)}
                className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors ${
                  soundEnabled ? 'border-green-200 bg-green-50 text-green-600' : 'border-gray-200 bg-gray-50 text-gray-400'
                }`}
              >
                🔔 Sound {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Session complete overlay */}
          {showComplete && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
              <div className="text-center">
                <PixelCheck size={32} className="text-green-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-900">Session Complete!</p>
                <p className="text-xs text-gray-400 mt-1">Switching modes...</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Stats + Task Input */}
        <div className="space-y-4">
          {/* Daily Stats */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <div className="flex items-center gap-2">
                <PixelFire size={12} />
                <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Today&apos;s Focus</h2>
              </div>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Sessions</span>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: Math.min(sessionsToday, 8) }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.primary, opacity: 0.3 + i * 0.08 }} />
                  ))}
                  <span className="text-[10px] font-mono font-bold text-gray-700 ml-1">{sessionsToday}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Total Focus</span>
                <span className="text-[11px] font-mono font-bold text-gray-900">{totalFocusMinutes} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Streak</span>
                <div className="flex items-center gap-1">
                  <PixelFire size={10} />
                  <span className="text-[11px] font-mono font-bold text-orange-500">{Math.floor(totalFocusMinutes / 25)} days</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Until long break</span>
                <span className="text-[10px] font-mono text-gray-500">{SESSIONS_BEFORE_LONG_BREAK - (sessionsToday % SESSIONS_BEFORE_LONG_BREAK)} sessions</span>
              </div>
            </div>
          </div>

          {/* What are you working on? */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <div className="flex items-center gap-2">
                <PixelSparkle size={10} className="text-yellow-500" />
                <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Current Task</h2>
              </div>
            </div>
            <div className="px-4 py-3">
              <input
                type="text"
                value={currentTask}
                onChange={e => setCurrentTask(e.target.value)}
                placeholder="What are you working on?"
                className="w-full text-xs border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 bg-gray-50/50 placeholder-gray-300"
              />
              {currentTask && (
                <p className="text-[9px] text-gray-400 mt-1.5 truncate">📋 {currentTask}</p>
              )}
            </div>
          </div>

          {/* Quick Session Start */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Quick Start</h2>
            </div>
            <div className="px-4 py-2.5 space-y-1.5">
              {[
                { label: '25 min deep work', mins: 25, emoji: '🧠' },
                { label: '45 min coding', mins: 45, emoji: '💻' },
                { label: '90 min focus block', mins: 90, emoji: '⚡' },
              ].map(qs => (
                <button
                  key={qs.mins}
                  onClick={() => {
                    setMode('work');
                    setSecondsLeft(qs.mins * 60);
                    setIsRunning(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 text-left transition-colors"
                >
                  <span className="text-sm">{qs.emoji}</span>
                  <span className="text-[11px] text-gray-600">{qs.label}</span>
                  <span className="ml-auto text-[9px] font-mono text-gray-400">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Recent Sessions</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {fakeSessions.map((session, i) => (
            <div key={i} className="px-5 py-2.5 flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${session.type === 'work' ? 'bg-blue-400' : 'bg-green-400'}`} />
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${session.type === 'work' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                {session.type === 'work' ? `${session.duration}m` : session.duration}
              </span>
              <span className="text-[11px] text-gray-700 flex-1 truncate">{session.label}</span>
              <span className="text-[9px] font-mono text-gray-400">{session.completedAt}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-2 bg-gray-50/50 border-t border-gray-100">
          <p className="text-[9px] text-gray-400 font-mono">
            {sessionsToday} sessions today · {totalFocusMinutes} min total focus time
          </p>
        </div>
      </div>

      {/* Pixel decoration footer */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{ opacity: Math.sin(i * 0.6 + tick * 0.3) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Focus Timer · Screen 27 · Des_bot
      </p>
    </div>
  );
}