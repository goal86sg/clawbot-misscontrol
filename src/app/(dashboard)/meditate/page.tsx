'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PixelSparkle } from '@/lib/pixel-icons';

// ─── Pixel Art Meditation Icons ────────────────────────────────────────────────

function PixelLotus({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="6" y="2" width="4" height="5" fill="currentColor" opacity="0.4" />
      <rect x="7" y="1" width="2" height="2" fill="currentColor" />
      <rect x="3" y="5" width="3" height="4" fill="currentColor" opacity="0.35" />
      <rect x="2" y="6" width="2" height="3" fill="currentColor" opacity="0.25" />
      <rect x="10" y="5" width="3" height="4" fill="currentColor" opacity="0.35" />
      <rect x="12" y="6" width="2" height="3" fill="currentColor" opacity="0.25" />
      <rect x="5" y="9" width="6" height="3" fill="currentColor" opacity="0.2" />
      <rect x="4" y="11" width="8" height="2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function PixelBreatheCircle({ size = 120, phase, progress }: { size?: number; phase: string; progress: number }) {
  const baseColor = phase === 'inhale' ? 'text-cyan-400' : phase === 'exhale' ? 'text-blue-400' : 'text-indigo-400';
  const scaled = Math.floor(8 + progress * 16);
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={baseColor} shapeRendering="crispEdges">
      <rect x="12" y="0" width="8" height="2" fill="currentColor" opacity="0.3" />
      <rect x="14" y="2" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="8" y="4" width="16" height="2" fill="currentColor" opacity="0.4" />
      <rect x="4" y="6" width="24" height="2" fill="currentColor" opacity="0.5" />
      <rect x="2" y="8" width="28" height="2" fill="currentColor" opacity="0.6" />
      <rect x="0" y="10" width="32" height="12" fill="currentColor" opacity="0.7" />
      <rect x="2" y="22" width="28" height="2" fill="currentColor" opacity="0.6" />
      <rect x="4" y="24" width="24" height="2" fill="currentColor" opacity="0.5" />
      <rect x="8" y="26" width="16" height="2" fill="currentColor" opacity="0.4" />
      <rect x="14" y="28" width="4" height="2" fill="currentColor" opacity="0.5" />
      <rect x="12" y="30" width="8" height="2" fill="currentColor" opacity="0.3" />
      {/* Inner glow */}
      <rect x="10" y="12" width="12" height="8" fill="currentColor" opacity="0.2" />
      <rect x="12" y="14" width="8" height="4" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function PixelMoon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="2" y="2" width="10" height="10" fill="currentColor" opacity="0.15" />
      <rect x="3" y="3" width="8" height="8" fill="currentColor" opacity="0.2" />
      <rect x="4" y="4" width="6" height="6" fill="currentColor" opacity="0.3" />
      <rect x="5" y="5" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="12" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="13" y="3" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="11" y="4" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelBell({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
      <rect x="7" y="1" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="6" y="3" width="4" height="1" fill="currentColor" opacity="0.6" />
      <rect x="5" y="4" width="6" height="1" fill="currentColor" />
      <rect x="4" y="5" width="8" height="1" fill="currentColor" opacity="0.8" />
      <rect x="3" y="6" width="10" height="2" fill="currentColor" />
      <rect x="2" y="8" width="12" height="1" fill="currentColor" opacity="0.8" />
      <rect x="1" y="9" width="14" height="1" fill="currentColor" opacity="0.5" />
      <rect x="7" y="10" width="2" height="2" fill="currentColor" opacity="0.3" />
      <rect x="7" y="12" width="2" height="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PixelStar({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="5" y="1" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="2" width="6" height="1" fill="currentColor" opacity="0.7" />
      <rect x="0" y="3" width="8" height="2" fill="currentColor" />
      <rect x="1" y="5" width="6" height="1" fill="currentColor" opacity="0.7" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type BreathingPattern = {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  hold2: number;
  description: string;
  emoji: string;
};

const PATTERNS: BreathingPattern[] = [
  { name: '4-7-8 Calm', inhale: 4, hold: 7, exhale: 8, hold2: 0, description: 'Deep relaxation & sleep', emoji: '🌙' },
  { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, hold2: 4, description: 'Focus & stress relief', emoji: '📦' },
  { name: 'Energize', inhale: 6, hold: 0, exhale: 2, hold2: 0, description: 'Morning energy boost', emoji: '⚡' },
  { name: 'Deep Rest', inhale: 5, hold: 5, exhale: 10, hold2: 0, description: 'Nervous system reset', emoji: '🌊' },
];

type Session = {
  id: number;
  pattern: string;
  minutes: number;
  date: string;
  completed: boolean;
};

// ─── Ambient Stars ─────────────────────────────────────────────────────────────

function AmbientStars() {
  const stars = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 40),
    size: Math.random() > 0.6 ? 12 : 8,
    opacity: 0.2 + Math.random() * 0.4,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute text-indigo-300"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            animation: `starPulse ${3 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <PixelStar size={s.size} />
        </div>
      ))}
    </div>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────

function FloatingParticles({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setParticles((prev) => {
          const next = [
            ...prev.slice(-15),
            {
              id: Date.now(),
              x: 10 + Math.random() * 80,
              delay: Math.random() * 2,
              duration: 6 + Math.random() * 4,
            },
          ];
          return next;
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-cyan-400 opacity-30"
          style={{
            left: `${p.x}%`,
            bottom: '30%',
            animation: `floatUp ${p.duration}s ease-out forwards`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <PixelSparkle size={8} />
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MeditatePage() {
  const [patternIndex, setPatternIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'hold2' | 'idle'>('idle');
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, pattern: '4-7-8 Calm', minutes: 10, date: 'Today', completed: true },
    { id: 2, pattern: 'Box Breathing', minutes: 5, date: 'Today', completed: true },
    { id: 3, pattern: 'Deep Rest', minutes: 15, date: 'Yesterday', completed: true },
    { id: 4, pattern: 'Energize', minutes: 3, date: 'Yesterday', completed: false },
  ]);
  const [streak, setStreak] = useState(7);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pattern = PATTERNS[patternIndex];

  const totalCycleSeconds = pattern.inhale + pattern.hold + pattern.exhale + pattern.hold2;

  const stopTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setPhase('idle');
    setProgress(0);
    setSeconds(0);
  }, []);

  const startSession = useCallback(() => {
    setTotalSeconds(0);
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    let cycleElapsed = 0;
    let phaseTimer = 0;

    const tick = () => {
      cycleElapsed += 0.1;
      phaseTimer += 0.1;
      setTotalSeconds((prev) => prev + 0.1);

      const cyclePos = cycleElapsed % totalCycleSeconds;
      let newPhase: typeof phase = 'idle';
      let phaseDur = 0;
      let phaseStart = 0;

      if (cyclePos < pattern.inhale) {
        newPhase = 'inhale';
        phaseDur = pattern.inhale;
        phaseStart = cyclePos;
      } else if (cyclePos < pattern.inhale + pattern.hold) {
        newPhase = 'hold';
        phaseDur = pattern.hold;
        phaseStart = cyclePos - pattern.inhale;
      } else if (cyclePos < pattern.inhale + pattern.hold + pattern.exhale) {
        newPhase = 'exhale';
        phaseDur = pattern.exhale;
        phaseStart = cyclePos - pattern.inhale - pattern.hold;
      } else {
        newPhase = 'hold2';
        phaseDur = pattern.hold2;
        phaseStart = cyclePos - pattern.inhale - pattern.hold - pattern.exhale;
      }

      setPhase(newPhase);
      setProgress(phaseDur > 0 ? phaseStart / phaseDur : 0);
      setSeconds(cycleElapsed);
    };

    intervalRef.current = setInterval(tick, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, pattern, totalCycleSeconds]);

  const handlePatternSelect = (i: number) => {
    if (isActive) stopTimer();
    setPatternIndex(i);
  };

  const handleComplete = () => {
    const completedSeconds = totalSeconds;
    stopTimer();
    const newSession: Session = {
      id: Date.now(),
      pattern: pattern.name,
      minutes: Math.round(completedSeconds / 60),
      date: 'Today',
      completed: completedSeconds >= 60,
    };
    setSessions((prev) => [newSession, ...prev.slice(0, 9)]);
    setStreak((prev) => prev + 1);
  };

  const phaseLabel = {
    idle: 'Ready',
    inhale: 'Breathe In',
    hold: 'Hold',
    exhale: 'Breathe Out',
    hold2: 'Hold',
  }[phase];

  const phaseEmoji = {
    idle: '🧘',
    inhale: '🌬️',
    hold: '⏸️',
    exhale: '💨',
    hold2: '⏸️',
  }[phase];

  const totalMinutes = Math.floor(sessions.reduce((acc, s) => acc + s.minutes, 0) / 60);
  const completedSessions = sessions.filter((s) => s.completed).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-hidden">
      <style>{`
        @keyframes starPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          100% { transform: translateY(-200px) scale(0.5); opacity: 0; }
        }
        @keyframes breatheGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.5); }
        }
      `}</style>

      <AmbientStars />
      <FloatingParticles active={isActive && phase === 'inhale'} />

      {/* Header */}
      <div className="relative z-10 px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <PixelLotus size={28} className="text-indigo-400" />
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Meditation Timer</h1>
        </div>
        <p className="text-slate-500 text-sm ml-1">breathe · focus · restore</p>
      </div>

      <div className="relative z-10 px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
        {/* Main Timer */}
        <div className="lg:col-span-2 flex flex-col items-center">
          {/* Timer Card */}
          <div
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center gap-6"
            style={{ animation: isActive ? 'breatheGlow 4s ease-in-out infinite' : 'none' }}
          >
            {/* Pattern Name */}
            <div className="text-center">
              <div className="text-3xl mb-1">{pattern.emoji}</div>
              <h2 className="text-lg font-bold text-slate-200">{pattern.name}</h2>
              <p className="text-slate-500 text-xs mt-1">{pattern.description}</p>
            </div>

            {/* Breathing Circle */}
            <div className="relative flex items-center justify-center">
              <div
                className="transition-all duration-1000 ease-in-out"
                style={{
                  transform: `scale(${isActive ? (phase === 'inhale' ? 0.6 + progress * 0.7 : phase === 'exhale' ? 1.3 - progress * 0.7 : 1.3) : 1})`,
                }}
              >
                <PixelBreatheCircle size={160} phase={phase} progress={progress} />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl mb-1">{phaseEmoji}</div>
                <div className="text-2xl font-bold text-slate-100">{phaseLabel}</div>
                {isActive && (
                  <div className="text-slate-400 text-sm mt-1">
                    {Math.floor(seconds / 60)}:{String(Math.floor(seconds % 60)).padStart(2, '0')}
                  </div>
                )}
              </div>
            </div>

            {/* Phase Timers */}
            {isActive && (
              <div className="flex gap-4 text-xs">
                {[
                  { label: 'Inhale', value: pattern.inhale, active: phase === 'inhale' },
                  { label: 'Hold', value: pattern.hold, active: phase === 'hold' },
                  { label: 'Exhale', value: pattern.exhale, active: phase === 'exhale' },
                  ...(pattern.hold2 > 0 ? [{ label: 'Hold', value: pattern.hold2, active: phase === 'hold2' }] : []),
                ].map((p) => (
                  <div
                    key={p.label}
                    className={`px-3 py-1.5 rounded border ${p.active ? 'border-indigo-500 bg-indigo-950 text-indigo-300' : 'border-slate-700 bg-slate-800 text-slate-500'}`}
                  >
                    {p.label}: {p.value}s
                  </div>
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-3 mt-2">
              {!isActive ? (
                <>
                  <button
                    onClick={startSession}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-slate-100 rounded-lg border border-indigo-500 text-sm font-bold transition-colors flex items-center gap-2"
                  >
                    <PixelBreatheCircle size={16} phase="idle" progress={0} />
                    Start Session
                  </button>
                  <button
                    onClick={handleComplete}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg border border-slate-700 text-sm transition-colors"
                  >
                    End
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleComplete}
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-emerald-100 rounded-lg border border-emerald-600 text-sm font-bold transition-colors flex items-center gap-2"
                  >
                    <PixelBell size={14} className="text-emerald-300" />
                    Complete Session
                  </button>
                  <button
                    onClick={stopTimer}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg border border-slate-700 text-sm transition-colors"
                  >
                    Stop
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Pattern Selector */}
          <div className="w-full mt-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Breathing Patterns</h3>
            <div className="grid grid-cols-2 gap-2">
              {PATTERNS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => handlePatternSelect(i)}
                  className={`p-3 rounded-lg border text-left transition-all ${patternIndex === i ? 'border-indigo-500 bg-indigo-950' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{p.emoji}</span>
                    <span className={`text-sm font-bold ${patternIndex === i ? 'text-indigo-300' : 'text-slate-300'}`}>{p.name}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {p.inhale}-{p.hold}-{p.exhale}
                    {p.hold2 > 0 && `-${p.hold2}`}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Your Practice</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-indigo-400">{streak}</div>
                <div className="text-xs text-slate-500">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">{totalMinutes}</div>
                <div className="text-xs text-slate-500">Total Mins</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-400">{completedSessions}</div>
                <div className="text-xs text-slate-500">Sessions</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Tips</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <PixelMoon size={12} className="text-indigo-400 mt-0.5 shrink-0" />
                Find a quiet, comfortable spot
              </li>
              <li className="flex items-start gap-2">
                <PixelMoon size={12} className="text-indigo-400 mt-0.5 shrink-0" />
                Sit or lie down with a straight spine
              </li>
              <li className="flex items-start gap-2">
                <PixelMoon size={12} className="text-indigo-400 mt-0.5 shrink-0" />
                Close your eyes if comfortable
              </li>
              <li className="flex items-start gap-2">
                <PixelMoon size={12} className="text-indigo-400 mt-0.5 shrink-0" />
                Start with 5 min, build up gradually
              </li>
            </ul>
          </div>

          {/* Recent Sessions */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex-1">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">Recent Sessions</h3>
            <div className="space-y-2">
              {sessions.slice(0, 6).map((s) => (
                <div key={s.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {s.completed ? (
                      <PixelSparkle size={10} className="text-emerald-400" />
                    ) : (
                      <PixelMoon size={10} className="text-slate-600" />
                    )}
                    <span className={s.completed ? 'text-slate-300' : 'text-slate-600'}>{s.pattern}</span>
                  </div>
                  <div className="text-slate-500">{s.minutes}m · {s.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-8" />
    </div>
  );
}
