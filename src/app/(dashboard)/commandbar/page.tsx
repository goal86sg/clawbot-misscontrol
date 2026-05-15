'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { PixelTerminal, PixelClock, PixelSparkle, PixelSettings, PixelMission, PixelHeart, PixelHome, PixelAgents } from '@/lib/pixel-icons';
import {
  PixelTasks, PixelCalendar, PixelProjects, PixelMemory, PixelDocs,
  PixelTeam, PixelOffice, PixelPulse, PixelSound, PixelActivity,
  PixelBell, PixelPortfolio, PixelStandup, PixelGoals, PixelCommandBar,
} from '@/lib/pixel-icons-extra';

// ─── Command Registry ─────────────────────────────────────────────────────────

interface Command {
  id: string;
  label: string;
  description: string;
  category: 'navigation' | 'action' | 'agent' | 'system';
  icon: React.ReactNode;
  shortcut?: string;
  href?: string;
  action?: string; // for actions that aren't navigation
  args?: string[];
}

const commands: Command[] = [
  // Navigation
  { id: 'nav-dashboard', label: 'Dashboard', description: 'Main overview', category: 'navigation', icon: <PixelHome size={14} />, href: '/', shortcut: 'G D' },
  { id: 'nav-standup', label: 'Standup', description: 'Daily briefing', category: 'navigation', icon: <PixelStandup size={14} />, href: '/standup', shortcut: 'G S' },
  { id: 'nav-vitals', label: 'Vitals', description: 'System monitoring', category: 'navigation', icon: <PixelHeart size={14} />, href: '/vitals', shortcut: 'G V' },
  { id: 'nav-activity', label: 'Activity', description: 'Contribution heatmap', category: 'navigation', icon: <PixelActivity size={14} />, href: '/activity', shortcut: 'G A' },
  { id: 'nav-goals', label: 'Goals', description: 'Goals & milestones', category: 'navigation', icon: <PixelGoals size={14} />, href: '/goals', shortcut: 'G G' },
  { id: 'nav-tasks', label: 'Tasks', description: 'Task list', category: 'navigation', icon: <PixelTasks size={14} />, href: '/tasks', shortcut: 'G T' },
  { id: 'nav-calendar', label: 'Calendar', description: 'Calendar & events', category: 'navigation', icon: <PixelCalendar size={14} />, href: '/calendar', shortcut: 'G C' },
  { id: 'nav-agents', label: 'Agents', description: 'Agent status', category: 'navigation', icon: <PixelAgents size={14} />, href: '/agents', shortcut: 'G ;' },
  { id: 'nav-missions', label: 'Missions', description: 'Active missions', category: 'navigation', icon: <PixelMission size={14} />, href: '/missions' },
  { id: 'nav-notifications', label: 'Notifications', description: 'Alert center', category: 'navigation', icon: <PixelBell size={14} />, href: '/notifications' },
  { id: 'nav-projects', label: 'Projects', description: 'Project hub', category: 'navigation', icon: <PixelProjects size={14} />, href: '/projects', shortcut: 'G P' },
  { id: 'nav-portfolio', label: 'Portfolio', description: 'Investment tracker', category: 'navigation', icon: <PixelPortfolio size={14} />, href: '/portfolio', shortcut: 'G F' },
  { id: 'nav-memory', label: 'Memory', description: 'Memory files', category: 'navigation', icon: <PixelMemory size={14} />, href: '/memory' },
  { id: 'nav-docs', label: 'Docs', description: 'Knowledge base', category: 'navigation', icon: <PixelDocs size={14} />, href: '/docs' },
  { id: 'nav-pulse', label: 'Pulse', description: 'Live event feed', category: 'navigation', icon: <PixelPulse size={14} />, href: '/pulse' },
  { id: 'nav-sound', label: 'Sound', description: 'Ambient monitor', category: 'navigation', icon: <PixelSound size={14} />, href: '/sound' },
  { id: 'nav-team', label: 'Team', description: 'Team directory', category: 'navigation', icon: <PixelTeam size={14} />, href: '/team' },
  { id: 'nav-office', label: 'Office', description: 'Office overview', category: 'navigation', icon: <PixelOffice size={14} />, href: '/office' },
  { id: 'nav-terminal', label: 'Terminal', description: 'Terminal output', category: 'navigation', icon: <PixelTerminal size={14} />, href: '/terminal', shortcut: 'G `' },
  { id: 'nav-settings', label: 'Settings', description: 'Configuration', category: 'navigation', icon: <PixelSettings size={14} />, href: '/settings', shortcut: 'G ,' },

  // Actions
  { id: 'action-healthcheck', label: 'Run Health Check', description: 'Deep security audit', category: 'action', icon: <span className="text-xs">🛡️</span>, shortcut: 'H' },
  { id: 'action-nightly', label: 'Trigger Nightly Build', description: 'Build something delightful', category: 'action', icon: <PixelSparkle size={12} className="text-yellow-500" />, shortcut: 'N' },
  { id: 'action-refresh-vitals', label: 'Refresh Vitals', description: 'Re-fetch system data', category: 'action', icon: <PixelHeart size={12} className="text-red-400" /> },
  { id: 'action-clear-notifications', label: 'Clear Notifications', description: 'Mark all as read', category: 'action', icon: <PixelBell size={12} className="text-blue-400" /> },

  // Agent commands
  { id: 'agent-status', label: 'Agent Status', description: 'Show all agent states', category: 'agent', icon: <PixelAgents size={14} />, shortcut: '?' },
  { id: 'agent-guarddog', label: 'Guarddog Audit', description: 'Run security scan', category: 'agent', icon: <span className="text-xs">🐕</span> },
  { id: 'agent-memory', label: 'Memory Status', description: 'Check memory health', category: 'agent', icon: <PixelMemory size={14} /> },

  // System
  { id: 'sys-uptime', label: 'System Uptime', description: 'Show uptime stats', category: 'system', icon: <PixelClock size={12} /> },
  { id: 'sys-help', label: 'Help', description: 'Keyboard shortcuts reference', category: 'system', icon: <span className="text-xs">⌨️</span>, shortcut: '?' },
];

const CATEGORY_LABELS: Record<string, string> = {
  navigation: 'Navigation',
  action: 'Actions',
  agent: 'Agent Commands',
  system: 'System',
};

// ─── Pixel Animated Border ────────────────────────────────────────────────────

function AnimatedBorder({ active }: { active: boolean }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setFrame(f => f + 1), 120);
    return () => clearInterval(id);
  }, [active]);

  const phases = [
    'border-green-400',
    'border-green-500',
    'border-green-400',
    'border-green-300',
  ];

  return (
    <div className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-colors ${active ? phases[frame % 4] : 'border-transparent'}`} />
  );
}

// ─── Scanline Overlay ─────────────────────────────────────────────────────────

function Scanlines() {
  return (
    <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden opacity-[0.03]"
      style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)' }} />
  );
}

// ─── Command Palette ──────────────────────────────────────────────────────────

function CommandPalette({ query, onSelect }: { query: string; onSelect: (cmd: Command) => void }) {
  const filtered = commands.filter(c =>
    !query ||
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase()) ||
    c.id.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  const categoryOrder = ['navigation', 'action', 'agent', 'system'];

  return (
    <div className="divide-y divide-gray-100">
      {categoryOrder.map(cat => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        return (
          <div key={cat}>
            <div className="px-3 py-1.5">
              <span className="text-[8px] font-semibold text-gray-300 uppercase tracking-widest">
                {CATEGORY_LABELS[cat] ?? cat}
              </span>
            </div>
            {items.map(cmd => (
              <div
                key={cmd.id}
                onClick={() => onSelect(cmd)}
                className="flex items-center gap-3 px-3 py-2 mx-1 rounded-md cursor-pointer hover:bg-gray-50 transition-colors group"
              >
                <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  {cmd.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">{cmd.label}</p>
                  <p className="text-[9px] text-gray-400">{cmd.description}</p>
                </div>
                {cmd.shortcut && (
                  <div className="flex items-center gap-0.5">
                    {(cmd.shortcut ?? '').split(' ').map((key, i) => (
                      <React.Fragment key={i}>
                        <kbd className="text-[8px] font-mono bg-gray-900 text-white px-1 py-0.5 rounded">{key}</kbd>
                        {i < (cmd.shortcut ?? '').split(' ').length - 1 && <span className="text-gray-300 text-[8px]">+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                )}
                <span className="text-[9px] text-gray-300 group-hover:text-gray-500">↵</span>
              </div>
            ))}
          </div>
        );
      })}
      {filtered.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-xs text-gray-400">No commands match "{query}"</p>
          <p className="text-[9px] text-gray-300 mt-1">Try a page name, action, or agent command</p>
        </div>
      )}
    </div>
  );
}

// ─── Recent Commands Log ────────────────────────────────────────────────────────

interface LogEntry {
  id: number;
  type: 'navigation' | 'action' | 'agent' | 'system' | 'error';
  text: string;
  time: string;
}

const INITIAL_LOG: LogEntry[] = [
  { id: 1, type: 'navigation', text: 'Navigated to Goals', time: '2m ago' },
  { id: 2, type: 'action', text: 'Triggered health check', time: '5m ago' },
  { id: 3, type: 'agent', text: 'Guarddog: audit complete — 0 issues', time: '15m ago' },
  { id: 4, type: 'navigation', text: 'Navigated to Vitals', time: '18m ago' },
  { id: 5, type: 'system', text: 'Nightly build triggered — Mission Control Screen 22', time: '1h ago' },
  { id: 6, type: 'agent', text: 'Memory dreaming promoted 3 entries', time: '2h ago' },
  { id: 7, type: 'navigation', text: 'Navigated to Dashboard', time: '2h ago' },
  { id: 8, type: 'error', text: 'Docker container restart failed (postgres-ddam)', time: '3h ago' },
];

const TYPE_COLORS: Record<string, string> = {
  navigation: 'text-blue-500',
  action: 'text-green-600',
  agent: 'text-purple-600',
  system: 'text-yellow-600',
  error: 'text-red-500',
};

const TYPE_ICONS: Record<string, string> = {
  navigation: '→',
  action: '⚡',
  agent: '🤖',
  system: '⚙️',
  error: '✗',
};

const TYPE_BG: Record<string, string> = {
  navigation: 'bg-blue-50 border-blue-100',
  action: 'bg-green-50 border-green-100',
  agent: 'bg-purple-50 border-purple-100',
  system: 'bg-yellow-50 border-yellow-100',
  error: 'bg-red-50 border-red-100',
};

// ─── Quick Action Button ───────────────────────────────────────────────────────

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  cmd: string;
}

const quickActions: QuickAction[] = [
  { id: 'health', label: 'Health Check', icon: '🛡️', cmd: 'healthcheck' },
  { id: 'nightly', label: 'Nightly Build', icon: '🌙', cmd: 'nightly' },
  { id: 'vitals', label: 'Refresh Vitals', icon: '💓', cmd: 'vitals' },
  { id: 'status', label: 'Agent Status', icon: '🤖', cmd: 'status' },
  { id: 'memory', label: 'Memory Check', icon: '🧠', cmd: 'memory' },
  { id: 'clear', label: 'Clear Log', icon: '🗑️', cmd: 'clear' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommandBarPage() {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [log, setLog] = useState<LogEntry[]>(INITIAL_LOG);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const logIdRef = useRef(INITIAL_LOG.length);

  // Real-time clock
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Singapore' }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Ticker for animated elements
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addLog = useCallback((type: LogEntry['type'], text: string) => {
    logIdRef.current += 1;
    setLog(prev => [{ id: logIdRef.current, type, text, time: 'just now' }, ...prev].slice(0, 20));
  }, []);

  const handleCommand = useCallback((cmd: Command) => {
    addLog(cmd.category === 'action' || cmd.id.startsWith('nav-') ? 'navigation' : cmd.category, cmd.label);

    if (cmd.href) {
      window.location.href = cmd.href;
    } else if (cmd.id === 'action-healthcheck') {
      addLog('action', 'Running deep security audit...');
    } else if (cmd.id === 'action-nightly') {
      addLog('action', 'Triggering nightly build agent...');
    } else if (cmd.id === 'action-clear-notifications') {
      addLog('action', 'Clearing notification queue...');
    } else if (cmd.id === 'action-refresh-vitals') {
      addLog('action', 'Fetching fresh system vitals...');
    } else if (cmd.id === 'agent-status') {
      addLog('agent', 'Des_bot: online · guarddog: idle · cron: active');
    } else if (cmd.id === 'agent-guarddog') {
      addLog('agent', 'guarddog: running security scan...');
    } else if (cmd.id === 'agent-memory') {
      addLog('agent', 'Memory health: 847 entries · 12 pending dreaming');
    } else if (cmd.id === 'sys-uptime') {
      addLog('system', 'Uptime: 99.9% · 47d 13h 22m · Last boot: Mar 29 2026');
    } else if (cmd.id === 'sys-help') {
      addLog('system', 'Commands: G+key = go to page · H = health check · N = nightly · ? = agent status');
    }

    setQuery('');
    setIsActive(false);
  }, [addLog]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Focus on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsActive(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      // Escape to close
      if (e.key === 'Escape' && isActive) {
        setIsActive(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isActive]);

  const filtered = commands.filter(c =>
    !query ||
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded">
            COMMAND BAR v1.0
          </div>
          <div className="text-xs font-mono text-gray-400">
            Quick Launcher · <span className="text-gray-600">Ctrl+K to activate</span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="text-gray-400">
            <span className="text-[9px] uppercase text-gray-300">SGT</span>{' '}
            <span className="text-gray-700">{time}</span>
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <kbd className="text-[9px] bg-gray-900 text-white px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>
      </div>

      {/* Command Input */}
      <div
        className={`relative bg-white border-2 rounded-xl transition-colors ${isActive ? 'border-green-400' : 'border-gray-200 hover:border-gray-300'}`}
        onClick={() => { setIsActive(true); inputRef.current?.focus(); }}
      >
        <AnimatedBorder active={isActive} />
        <Scanlines />

        <div className="relative z-10 flex items-center gap-3 px-4 py-3">
          {/* Pixel cursor icon */}
          <div className={`transition-all ${isActive ? 'text-green-500' : 'text-gray-400'}`}>
            <svg width="16" height="16" viewBox="0 0 8 8" className="animate-pulse" shapeRendering="crispEdges">
              <rect x="2" y="0" width="2" height="2" fill="currentColor" />
              <rect x="1" y="2" width="6" height="2" fill="currentColor" />
              <rect x="0" y="4" width="8" height="4" fill="currentColor" />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setIsActive(true); }}
            onFocus={() => setIsActive(true)}
            placeholder="Type a command, page name, or action..."
            className="flex-1 text-sm bg-transparent outline-none font-mono text-gray-900 placeholder-gray-300"
            onKeyDown={e => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(i => Math.max(i - 1, 0));
              } else if (e.key === 'Enter' && filtered.length > 0) {
                handleCommand(filtered[selectedIndex]);
              } else if (e.key === 'Escape') {
                setIsActive(false);
                setQuery('');
              }
            }}
          />

          {/* Status indicator */}
          <div className="flex items-center gap-1.5">
            {isActive ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] text-green-600 font-mono">active</span>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <span className="text-[9px] text-gray-400 font-mono">idle</span>
              </>
            )}
          </div>
        </div>

        {/* Command palette dropdown */}
        {isActive && (
          <div className="relative z-20 border-t border-gray-100 max-h-80 overflow-y-auto"
            style={{ borderRadius: '0 0 10px 10px' }}>
            <CommandPalette query={query} onSelect={handleCommand} />
          </div>
        )}
      </div>

      {/* Two-column layout below */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <svg width="12" height="12" viewBox="0 0 8 8" className="text-green-500" shapeRendering="crispEdges">
                <rect x="1" y="1" width="6" height="2" fill="currentColor" />
                <rect x="2" y="4" width="4" height="2" fill="currentColor" />
                <rect x="3" y="6" width="2" height="2" fill="currentColor" />
              </svg>
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Quick Actions</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {quickActions.map((qa, i) => (
                <div
                  key={qa.id}
                  onClick={() => {
                    const cmd = commands.find(c => c.id === `action-${qa.id}` || c.id === `agent-${qa.id}`);
                    if (cmd) handleCommand(cmd);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <span className="text-base">{qa.icon}</span>
                  <span className="text-[11px] text-gray-700 flex-1 group-hover:text-gray-900">{qa.label}</span>
                  <span className="text-[9px] text-gray-300 group-hover:text-gray-500">{qa.cmd}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keyboard Reference */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">⌨️ Shortcuts</h2>
            </div>
            <div className="px-4 py-3 space-y-2">
              {[
                { key: 'Ctrl+K', desc: 'Open command bar' },
                { key: '↑↓', desc: 'Navigate commands' },
                { key: 'Enter', desc: 'Execute command' },
                { key: 'Esc', desc: 'Close palette' },
                { key: 'G + D', desc: 'Go to Dashboard' },
                { key: 'G + V', desc: 'Go to Vitals' },
                { key: 'G + G', desc: 'Go to Goals' },
                { key: 'H', desc: 'Run health check' },
                { key: 'N', desc: 'Trigger nightly' },
              ].map(({ key, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-400">{desc}</span>
                  <div className="flex gap-0.5">
                    {(key ?? '').split('+').map((k, i) => (
                      <React.Fragment key={i}>
                        <kbd className="text-[8px] font-mono bg-gray-900 text-white px-1 py-0.5 rounded">{k}</kbd>
                        {i < (key ?? '').split('+').length - 1 && <span className="text-gray-300 text-[8px]">+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Command Log */}
        <div className="col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <div className="flex items-center gap-2">
                <PixelTerminal size={12} className="text-gray-400" />
                <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Command Log</h2>
              </div>
              <span className="text-[9px] text-gray-400 font-mono">{log.length} entries</span>
            </div>
            <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
              {log.map((entry) => (
                <div key={entry.id} className="px-4 py-2 flex items-start gap-3 hover:bg-gray-50/50 transition-colors">
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 text-[10px] ${TYPE_BG[entry.type]}`}>
                    <span className={TYPE_COLORS[entry.type]}>{TYPE_ICONS[entry.type]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-700">{entry.text}</p>
                  </div>
                  <span className="text-[9px] text-gray-400 shrink-0 font-mono">{entry.time}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[9px] text-gray-400">Press <kbd className="text-[8px] font-mono bg-gray-200 px-1 rounded">Ctrl+K</kbd> to open launcher</span>
              <button
                onClick={() => setLog([])}
                className="text-[9px] text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear log
              </button>
            </div>
          </div>

          {/* Pixel decoration */}
          <div className="mt-3 flex justify-center gap-1 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gray-400 rounded-sm"
                style={{ opacity: Math.sin(i * 0.7 + tick * 0.4) * 0.4 + 0.6 }}
              />
            ))}
          </div>

          <p className="text-center text-[9px] text-gray-300 font-mono mt-2">
            Mission Control · Command Bar · Screen 23 · Des_bot
          </p>
        </div>
      </div>
    </div>
  );
}