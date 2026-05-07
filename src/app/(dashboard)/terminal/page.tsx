'use client';

import React, { useState, useRef, useEffect } from 'react';

const initialLogs = [
  { type: 'info', time: '14:23:01', text: '[SYS] Mission Control v1.0.0-beta initialized' },
  { type: 'info', time: '14:23:01', text: '[SYS] Loading agent profiles... 7 agents found' },
  { type: 'success', time: '14:23:02', text: '[SYS] All subsystems nominal' },
  { type: 'info', time: '14:23:03', text: '[AGENT] Cyber-7 deployed → Port sweep started' },
  { type: 'info', time: '14:23:05', text: '[AGENT] Scout-2 deployed → Recon Delta initiated' },
  { type: 'warn', time: '14:23:10', text: '[WARN] Guard-1 HP below threshold (76%)' },
  { type: 'success', time: '14:23:15', text: '[MISSION] M-044 progress: 64% — 152 ports scanned' },
  { type: 'info', time: '14:23:20', text: '[AGENT] Engi-4 idle — awaiting mission assignment' },
  { type: 'error', time: '14:23:25', text: '[ERROR] M-039 Log Analysis: anomaly detection timeout' },
  { type: 'info', time: '14:23:30', text: '[SYS] Health check passed — all critical services online' },
];

const typeStyles: Record<string, string> = {
  info: 'text-gray-500',
  success: 'text-green-600',
  warn: 'text-yellow-600',
  error: 'text-red-600',
};

const commands = {
  help: `Available commands:
  help      — Show this message
  status    — System status overview
  agents    — List active agents
  missions  — List active missions
  uptime    — Show system uptime
  clear     — Clear terminal
  whoami    — Display current user`,

  status: `[STATUS]
  System: ONLINE
  Agents Active: 5/7
  Missions In Progress: 2
  Uptime: 127:32:15
  CPU: 34%  MEM: 2.1GB / 8GB  DISK: 45GB / 256GB`,

  agents: `[AGENTS]
  Cyber-7   [ACTIVE]  HP:92%  Mission: Port sweep
  Scout-2   [ACTIVE]  HP:88%  Mission: Recon Delta
  Engi-4    [IDLE]   HP:100%  Mission: —
  Guard-1   [ACTIVE]  HP:76%  Mission: Perimeter
  Forge-5   [ACTIVE]  HP:95%  Mission: CI/CD audit
  Byte-9    [OFFLINE] HP:0%   Mission: —
  Echo-3    [MAINT]   HP:45%  Mission: —`,

  missions: `[MISSIONS]
  M-044  IN-PROGRESS  Network Scan      64%
  M-043  IN-PROGRESS  Recon Delta       31%
  M-045  QUEUED       Perimeter Check    0%`,

  uptime: 'System uptime: 127 hours, 32 minutes, 15 seconds',
  whoami: 'Commander // Access Level: ALPHA // Clearance: TOP SECRET',
};

export default function TerminalPage() {
  const [logs, setLogs] = useState(initialLogs);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const now = new Date().toLocaleTimeString('en-US', { hour12: false });

    // Add command to logs
    setLogs((prev) => [...prev, { type: 'info', time: now, text: `> ${cmd}` }]);

    if (trimmed === '') return;
    if (trimmed === 'clear') {
      setLogs([]);
      return;
    }

    const response = commands[trimmed as keyof typeof commands];
    if (response) {
      // Split multi-line responses
      response.split('\n').forEach((line) => {
        setLogs((prev) => [
          ...prev,
          { type: 'success', time: now, text: line },
        ]);
      });
    } else {
      setLogs((prev) => [
        ...prev,
        {
          type: 'error',
          time: now,
          text: `Unknown command: "${cmd}". Type "help" for available commands.`,
        },
      ]);
    }

    setHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(newIdx);
      if (history[newIdx] !== undefined) setInput(history[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx]);
    }
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Terminal</h1>
        <p className="text-xs text-gray-500 mt-0.5">Command-line interface for direct system control</p>
      </div>

      <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-[10px] text-gray-500 ml-4 font-mono">
            commander@mission-control ~
          </span>
        </div>

        {/* Terminal Output */}
        <div className="h-[480px] overflow-y-auto p-4 font-mono text-xs leading-relaxed">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-gray-600 shrink-0">{log.time}</span>
              <span className={typeStyles[log.type]}>{log.text}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <div className="flex items-center border-t border-gray-800 bg-gray-900 px-4 py-2">
          <span className="text-green-500 font-mono text-xs mr-2 shrink-0">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-200 font-mono text-xs outline-none placeholder-gray-600"
            placeholder='Type "help" for commands...'
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>

      {/* Quick Commands */}
      <div className="flex items-center gap-2 flex-wrap">
        {Object.keys(commands).map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setInput(cmd);
              inputRef.current?.focus();
            }}
            className="text-[10px] px-2 py-1 bg-gray-100 border border-gray-200 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
