'use client';

import React, { useState } from 'react';
import { PixelCheck, PixelAlert } from '@/lib/pixel-icons';

export default function SettingsPage() {
  const [theme, setTheme] = useState('system');
  const [notifications, setNotifications] = useState(true);
  const [autoDeploy, setAutoDeploy] = useState(false);
  const [logLevel, setLogLevel] = useState('info');
  const [refreshRate, setRefreshRate] = useState('5');

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">Configure your mission control preferences</p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {/* Appearance */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Appearance</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Theme</p>
                <p className="text-[11px] text-gray-400">Choose your preferred color scheme</p>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-2.5 py-1.5 bg-white text-gray-700"
              >
                <option value="light">Light</option>
                <option value="dark">Dark (Coming Soon)</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Pixel Grid Headers</p>
                <p className="text-[11px] text-gray-400">Show retro grid background in section headers</p>
              </div>
              <button
                onClick={() => {}}
                className="relative w-9 h-5 rounded-full bg-gray-900 transition-colors"
              >
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notifications</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                <p className="text-[11px] text-gray-400">Receive alerts for mission completions and failures</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-9 h-5 rounded-full transition-colors ${notifications ? 'bg-gray-900' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${notifications ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-Deploy Agents</p>
                <p className="text-[11px] text-gray-400">Automatically deploy idle agents for queued missions</p>
              </div>
              <button
                onClick={() => setAutoDeploy(!autoDeploy)}
                className={`relative w-9 h-5 rounded-full transition-colors ${autoDeploy ? 'bg-gray-900' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${autoDeploy ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* System */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">System</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Log Level</p>
                <p className="text-[11px] text-gray-400">Minimum log level to display</p>
              </div>
              <select
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-2.5 py-1.5 bg-white text-gray-700"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warn">Warning</option>
                <option value="error">Error Only</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Refresh Rate</p>
                <p className="text-[11px] text-gray-400">Dashboard auto-refresh interval</p>
              </div>
              <select
                value={refreshRate}
                onChange={(e) => setRefreshRate(e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-2.5 py-1.5 bg-white text-gray-700"
              >
                <option value="1">1 second</option>
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="0">Off</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-lg overflow-hidden">
          <div
            className="px-5 py-3 border-b border-red-100 bg-red-50/50"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(239,68,68,0.03) 1px)',
              backgroundSize: '8px 100%',
            }}
          >
            <h2 className="text-xs font-semibold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
              <PixelAlert size={14} />
              Danger Zone
            </h2>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Reset All Agents</p>
                <p className="text-[11px] text-gray-400">Recall all agents and clear mission queues</p>
              </div>
              <button className="text-[10px] px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-md font-medium hover:bg-red-50 transition-colors">
                RESET
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Purge Logs</p>
                <p className="text-[11px] text-gray-400">Delete all terminal and system logs permanently</p>
              </div>
              <button className="text-[10px] px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-md font-medium hover:bg-red-50 transition-colors">
                PURGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
