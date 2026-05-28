'use client';

import React, { useState, useEffect } from 'react';
import { PixelCheck, PixelAlert, PixelClock, PixelSparkle, PixelHeart } from '@/lib/pixel-icons';

// ─── Pixel Icons ───────────────────────────────────────────────────────────────

function PixelContainer({ status = 'running', size = 16, className = '' }: { status?: string; size?: number; className?: string }) {
  const color = status === 'running' ? '#22c55e' : status === 'stopped' ? '#6b7280' : '#ef4444';
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`shrink-0 ${className}`} shapeRendering="crispEdges">
      <rect x="1" y="0" width="6" height="1" fill={color} opacity="0.5" />
      <rect x="0" y="1" width="8" height="5" fill={color} />
      <rect x="2" y="3" width="4" height="2" fill="white" opacity="0.3" />
      <rect x="0" y="6" width="8" height="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function PixelImage({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`shrink-0 ${className}`} shapeRendering="crispEdges">
      <rect x="0" y="1" width="8" height="6" fill="currentColor" opacity="0.2" />
      <rect x="1" y="0" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="1" width="2" height="2" fill="currentColor" />
      <rect x="4" y="1" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="4" width="4" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelVolume({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`shrink-0 ${className}`} shapeRendering="crispEdges">
      <rect x="1" y="2" width="3" height="4" fill="currentColor" opacity="0.5" />
      <rect x="0" y="3" width="2" height="2" fill="currentColor" />
      <rect x="5" y="1" width="2" height="6" fill="currentColor" opacity="0.5" />
      <rect x="4" y="2" width="1" height="4" fill="currentColor" />
      <rect x="6" y="2" width="2" height="1" fill="currentColor" />
      <rect x="6" y="5" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelNet({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={`shrink-0 ${className}`} shapeRendering="crispEdges">
      <rect x="0" y="3" width="2" height="2" fill="currentColor" />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" />
      <rect x="6" y="3" width="2" height="2" fill="currentColor" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="0" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="6" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="7" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelPlaySmall({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 6 6" shapeRendering="crispEdges">
      <rect x="1" y="1" width="1" height="4" fill="currentColor" />
      <rect x="2" y="2" width="2" height="2" fill="currentColor" />
      <rect x="4" y="2" width="1" height="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function PixelStopSmall({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 6 6" shapeRendering="crispEdges">
      <rect x="1" y="1" width="4" height="4" fill="currentColor" />
    </svg>
  );
}

function PixelRestartSmall({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 6 6" shapeRendering="crispEdges">
      <rect x="2" y="0" width="2" height="1" fill="currentColor" />
      <rect x="4" y="1" width="1" height="1" fill="currentColor" />
      <rect x="5" y="2" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="5" width="1" height="1" fill="currentColor" />
      <rect x="0" y="4" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="2" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Container {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'exited' | 'paused' | 'restarting';
  ports: string;
  cpu: string;
  mem: string;
  created: string;
  badge?: string;
}

interface Image {
  id: string;
  name: string;
  tag: string;
  size: string;
  created: string;
}

interface Volume {
  name: string;
  driver: string;
  mount: string;
  created: string;
}

interface Network {
  name: string;
  driver: string;
  type: 'bridge' | 'host' | 'overlay' | 'custom';
  containers: number;
  subnet: string;
}

interface LogEntry {
  time: string;
  container: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  msg: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const containers: Container[] = [
  { id: 'c1a2b3', name: 'postgres-dbeaver', image: 'postgres:16-alpine', status: 'running', ports: '5432:5432', cpu: '2.1%', mem: '48.3 MB', created: '14d ago', badge: 'db' },
  { id: 'd4e5f6', name: 'redis-cache', image: 'redis:7-alpine', status: 'running', ports: '6379:6379', cpu: '0.8%', mem: '12.1 MB', created: '14d ago', badge: 'cache' },
  { id: 'a1b2c3', name: 'openclaw-gateway', image: 'openclaw/gateway:latest', status: 'running', ports: '3000:3000', cpu: '5.4%', mem: '182 MB', created: '5d ago', badge: 'agent' },
  { id: 'e7f8g9', name: 'nginx-proxy', image: 'nginx:alpine', status: 'running', ports: '80:80 443:443', cpu: '0.3%', mem: '8.7 MB', created: '21d ago' },
  { id: 'h0i1j2', name: 'postgres-exporter', image: 'prometheuscommunity/postgres-exporter:latest', status: 'exited', ports: '9187:9187', cpu: '—', mem: '—', created: '10d ago' },
  { id: 'k3l4m5', name: 'grafana-dash', image: 'grafana/grafana:latest', status: 'running', ports: '3001:3000', cpu: '3.2%', mem: '96.4 MB', created: '8d ago' },
  { id: 'n6o7p8', name: 'prometheus-main', image: 'prom/prometheus:latest', status: 'restarting', ports: '9090:9090', cpu: '1.9%', mem: '134 MB', created: '12d ago' },
  { id: 'q9r0s1', name: 'docker-cleanup', image: 'trash-docker:latest', status: 'exited', ports: '—', cpu: '—', mem: '—', created: '2d ago' },
];

const images: Image[] = [
  { id: 'sha256:a1b2c3', name: 'postgres', tag: '16-alpine', size: '156 MB', created: '14d ago' },
  { id: 'sha256:d4e5f6', name: 'redis', tag: '7-alpine', size: '34 MB', created: '14d ago' },
  { id: 'sha256:789012', name: 'openclaw/gateway', tag: 'latest', size: '412 MB', created: '5d ago' },
  { id: 'sha256:345678', name: 'nginx', tag: 'alpine', size: '41 MB', created: '21d ago' },
  { id: 'sha256:901234', name: 'grafana/grafana', tag: 'latest', size: '298 MB', created: '8d ago' },
  { id: 'sha256:567890', name: 'prom/prometheus', tag: 'latest', size: '234 MB', created: '12d ago' },
  { id: 'sha256:123456', name: 'prometheuscommunity/postgres-exporter', tag: 'latest', size: '28 MB', created: '10d ago' },
  { id: 'sha256:abcdef', name: 'alpine', tag: 'latest', size: '7.3 MB', created: '30d ago' },
];

const volumes: Volume[] = [
  { name: 'postgres-data', driver: 'local', mount: '/var/lib/postgresql/data', created: '14d ago' },
  { name: 'redis-data', driver: 'local', mount: '/data', created: '14d ago' },
  { name: 'grafana-db', driver: 'local', mount: '/var/lib/grafana', created: '8d ago' },
  { name: 'prometheus-data', driver: 'local', mount: '/prometheus', created: '12d ago' },
  { name: 'nginx-certs', driver: 'local', mount: '/etc/nginx/certs', created: '21d ago' },
];

const networks: Network[] = [
  { name: 'bridge', driver: 'bridge', type: 'bridge', containers: 8, subnet: '172.17.0.0/16' },
  { name: 'monitoring', driver: 'bridge', type: 'custom', containers: 3, subnet: '172.20.0.0/16' },
  { name: 'openclaw-net', driver: 'bridge', type: 'custom', containers: 2, subnet: '172.21.0.0/16' },
  { name: 'host', driver: 'host', type: 'host', containers: 0, subnet: '—' },
];

const logs: LogEntry[] = [
  { time: '01:35:02', container: 'postgres-dbeaver', level: 'info', msg: 'database system is ready to accept connections' },
  { time: '01:32:47', container: 'redis-cache', level: 'info', msg: 'DB loaded from disk, ready to accept connections' },
  { time: '01:28:11', container: 'prometheus-main', level: 'warn', msg: 'WAL checkpoint took > 10s, storage may be degraded' },
  { time: '01:15:33', container: 'openclaw-gateway', level: 'info', msg: 'Agent session started: main session online' },
  { time: '01:08:04', container: 'nginx-proxy', level: 'info', msg: '443 https://api.desss.dev - 200 OK (12ms)' },
  { time: '00:58:21', container: 'grafana-dash', level: 'info', msg: 'Database OK, 5 dashboards loaded' },
  { time: '00:45:12', container: 'postgres-exporter', level: 'error', msg: 'connection refused: postgres:5432 not responding' },
  { time: '00:33:07', container: 'prometheus-main', level: 'info', msg: 'Compacting 4 chunks, freed 128 MB' },
  { time: '00:22:44', container: 'docker-cleanup', level: 'info', msg: 'Removed 3 dangling images, freed 890 MB' },
  { time: '00:15:00', container: 'openclaw-gateway', level: 'debug', msg: 'Heartbeat check: 8 agents online, 0 idle' },
];

const badgeColors: Record<string, string> = {
  db: 'bg-purple-100 text-purple-600 border-purple-200',
  cache: 'bg-orange-100 text-orange-600 border-orange-200',
  agent: 'bg-blue-100 text-blue-600 border-blue-200',
  infra: 'bg-gray-100 text-gray-600 border-gray-200',
};

const statusColors: Record<string, { dot: string; label: string; bg: string }> = {
  running:  { dot: 'bg-green-500', label: 'running', bg: 'bg-green-50' },
  exited:   { dot: 'bg-gray-400', label: 'exited', bg: 'bg-gray-50' },
  paused:   { dot: 'bg-yellow-400', label: 'paused', bg: 'bg-yellow-50' },
  restarting: { dot: 'bg-orange-400 animate-pulse', label: 'restarting', bg: 'bg-orange-50' },
};

const levelColors: Record<string, string> = {
  info: 'text-blue-500',
  warn: 'text-yellow-500',
  error: 'text-red-500',
  debug: 'text-gray-400',
};

// ─── Pixel Resource Bar ────────────────────────────────────────────────────────

function PixelResourceBar({ value, max = 100, segments = 12, color = 'bg-blue-500' }: {
  value: number; max?: number; segments?: number; color?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const filled = Math.round((pct / 100) * segments);
  return (
    <div className="flex gap-px">
      {Array.from({ length: segments }, (_, r) => (
        <div key={r} className={`w-2 rounded-sm ${r < filled ? color : 'bg-gray-100'}`}
          style={{ height: '10px' }} />
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function DockerPage() {
  const [activeTab, setActiveTab] = useState<'containers' | 'images' | 'volumes' | 'networks' | 'logs'>('containers');
  const [filter, setFilter] = useState('all');
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(
      new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Singapore', timeZoneName: 'short' })
    );
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const runningCount = containers.filter(c => c.status === 'running').length;
  const totalCount = containers.length;
  const alertCount = containers.filter(c => c.status === 'restarting' || c.status === 'exited').length;

  const filteredContainers = containers.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'running') return c.status === 'running';
    if (filter === 'stopped') return c.status === 'exited';
    return true;
  });

  const selected = containers.find(c => c.id === selectedContainer);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Docker</h1>
          <p className="text-xs text-gray-500 mt-0.5">Container management &amp; monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded">
            <PixelClock size={12} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-green-50 border border-green-200">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-600 font-medium">Docker Engine Online</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelContainer status="running" size={20} />
            <div>
              <p className="text-[10px] text-green-600 uppercase tracking-widest font-semibold">Containers</p>
              <p className="text-2xl font-bold text-green-700 mt-0.5 font-mono">
                {runningCount} <span className="text-base text-gray-400">/ {totalCount}</span>
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <PixelResourceBar value={runningCount} max={totalCount} segments={12} color="bg-green-500" />
            <span className="text-[9px] text-gray-400">{Math.round((runningCount/totalCount)*100)}% running</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelImage size={20} className="text-blue-500" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Images</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5 font-mono">{images.length}</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">~1.2 GB total</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelVolume size={20} className="text-purple-500" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Volumes</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5 font-mono">{volumes.length}</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">local driver</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <PixelNet size={20} className="text-orange-500" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Networks</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5 font-mono">{networks.length}</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">{networks.filter(n => n.type === 'custom').length} custom</p>
        </div>
      </div>

      {/* Tab Bar + Filter */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center gap-1">
            {(['containers', 'images', 'volumes', 'networks', 'logs'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] px-3 py-1.5 rounded capitalize transition-colors font-semibold uppercase tracking-wider ${
                  activeTab === tab
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Alert indicator */}
          {alertCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 border border-red-200 rounded">
              <PixelAlert size={10} className="text-red-500" />
              <span className="text-[10px] text-red-600 font-medium">{alertCount} need attention</span>
            </div>
          )}
        </div>

        {/* ── Containers Tab ─────────────────────────────────── */}
        {activeTab === 'containers' && (
          <div>
            {/* Filter row */}
            <div className="px-5 py-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <span className="text-[9px] text-gray-400 uppercase tracking-wider">Filter:</span>
              {(['all', 'running', 'stopped'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[9px] px-2 py-0.5 rounded border transition-colors ${
                    filter === f
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'text-gray-500 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Header */}
            <div className="px-5 py-2 grid grid-cols-12 gap-2 text-[9px] text-gray-400 uppercase tracking-wider border-b border-gray-50">
              <div className="col-span-1">Status</div>
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Image</div>
              <div className="col-span-2">Ports</div>
              <div className="col-span-1">CPU</div>
              <div className="col-span-1">Memory</div>
              <div className="col-span-1">Created</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Rows */}
            {filteredContainers.map(cont => {
              const sc = statusColors[cont.status];
              return (
                <div
                  key={cont.id}
                  onClick={() => setSelectedContainer(selectedContainer === cont.id ? null : cont.id)}
                  className={`px-5 py-3 grid grid-cols-12 gap-2 items-center hover:bg-gray-50/50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                    selectedContainer === cont.id ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="col-span-1 flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-sm ${sc.dot}`} />
                    <span className="text-[9px] text-gray-500">{sc.label}</span>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <PixelContainer status={cont.status} size={14} />
                    <span className="text-xs font-semibold text-gray-900 truncate">{cont.name}</span>
                    {cont.badge && (
                      <span className={`text-[8px] px-1.5 py-0.5 rounded border font-medium ${badgeColors[cont.badge] || ''}`}>
                        {cont.badge}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-gray-500 font-mono">{cont.image}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-gray-400 font-mono">{cont.ports || '—'}</span>
                  </div>
                  <div className="col-span-1">
                    <span className={`text-[10px] font-mono font-bold ${cont.cpu === '—' ? 'text-gray-300' : 'text-gray-700'}`}>{cont.cpu}</span>
                  </div>
                  <div className="col-span-1">
                    <span className={`text-[10px] font-mono ${cont.mem === '—' ? 'text-gray-300' : 'text-gray-700'}`}>{cont.mem}</span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-[9px] text-gray-400">{cont.created}</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-1">
                    {cont.status === 'running' ? (
                      <button className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                        title="Stop">
                        <PixelStopSmall size={8} />
                      </button>
                    ) : (
                      <button className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:text-green-500 hover:border-green-200 transition-colors"
                        title="Start">
                        <PixelPlaySmall size={8} />
                      </button>
                    )}
                    <button className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-colors"
                      title="Restart">
                      <PixelRestartSmall size={8} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Images Tab ────────────────────────────────────── */}
        {activeTab === 'images' && (
          <div>
            <div className="px-5 py-2 grid grid-cols-12 gap-2 text-[9px] text-gray-400 uppercase tracking-wider border-b border-gray-50">
              <div className="col-span-2">Image ID</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Tag</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Created</div>
            </div>
            {images.map(img => (
              <div key={img.id} className="px-5 py-3 grid grid-cols-12 gap-2 items-center hover:bg-gray-50/50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                <div className="col-span-2">
                  <span className="text-[9px] text-gray-400 font-mono">{img.id.slice(0, 12)}</span>
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <PixelImage size={12} className="text-blue-400" />
                  <span className="text-xs font-medium text-gray-800 truncate">{img.name}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 font-mono">{img.tag}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-gray-600 font-mono">{img.size}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] text-gray-400">{img.created}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Volumes Tab ───────────────────────────────────── */}
        {activeTab === 'volumes' && (
          <div>
            <div className="px-5 py-2 grid grid-cols-12 gap-2 text-[9px] text-gray-400 uppercase tracking-wider border-b border-gray-50">
              <div className="col-span-3">Volume Name</div>
              <div className="col-span-2">Driver</div>
              <div className="col-span-5">Mount Point</div>
              <div className="col-span-2">Created</div>
            </div>
            {volumes.map(vol => (
              <div key={vol.name} className="px-5 py-3 grid grid-cols-12 gap-2 items-center hover:bg-gray-50/50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                <div className="col-span-3 flex items-center gap-2">
                  <PixelVolume size={12} className="text-purple-400" />
                  <span className="text-xs font-medium text-gray-800 truncate">{vol.name}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-gray-500 font-mono">{vol.driver}</span>
                </div>
                <div className="col-span-5">
                  <span className="text-[9px] text-gray-400 font-mono truncate block">{vol.mount}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] text-gray-400">{vol.created}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Networks Tab ──────────────────────────────────── */}
        {activeTab === 'networks' && (
          <div>
            <div className="px-5 py-2 grid grid-cols-12 gap-2 text-[9px] text-gray-400 uppercase tracking-wider border-b border-gray-50">
              <div className="col-span-3">Network Name</div>
              <div className="col-span-2">Driver</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Containers</div>
              <div className="col-span-3">Subnet</div>
            </div>
            {networks.map(net => (
              <div key={net.name} className="px-5 py-3 grid grid-cols-12 gap-2 items-center hover:bg-gray-50/50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                <div className="col-span-3 flex items-center gap-2">
                  <PixelNet size={12} className="text-orange-400" />
                  <span className="text-xs font-medium text-gray-800">{net.name}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-gray-500 font-mono">{net.driver}</span>
                </div>
                <div className="col-span-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${
                    net.type === 'bridge' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                    net.type === 'host' ? 'bg-red-50 text-red-600 border-red-200' :
                    'bg-green-50 text-green-600 border-green-200'
                  }`}>
                    {net.type}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-gray-700 font-mono">{net.containers}</span>
                </div>
                <div className="col-span-3">
                  <span className="text-[9px] text-gray-400 font-mono">{net.subnet}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Logs Tab ─────────────────────────────────────── */}
        {activeTab === 'logs' && (
          <div className="bg-gray-900">
            <div className="px-5 py-2 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-mono">Live Logs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-gray-500">Auto-scrolling</span>
                <span className="text-[9px] text-gray-600">—</span>
              </div>
            </div>
            <div className="px-5 py-3 space-y-1.5 max-h-96 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[9px] text-gray-500 font-mono shrink-0">{log.time}</span>
                  <span className="text-[9px] text-gray-600 font-mono shrink-0">[{log.container.slice(0, 16).padEnd(16, '.')}]</span>
                  <span className={`text-[9px] font-mono font-bold uppercase shrink-0 ${levelColors[log.level]}`}>
                    {log.level}
                  </span>
                  <span className="text-[9px] text-gray-300 font-mono">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Container Detail */}
      {selected && activeTab === 'containers' && (
        <div className="bg-white border border-blue-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PixelContainer status={selected.status} size={18} />
              <h3 className="text-sm font-bold text-gray-900">{selected.name}</h3>
              <span className={`text-[9px] px-2 py-0.5 rounded border ${
                statusColors[selected.status].dot.replace('bg-', 'bg-').replace('animate-pulse', '') === 'bg-green-500' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}>
                {selected.status}
              </span>
            </div>
            <button
              onClick={() => setSelectedContainer(null)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Container ID</p>
              <p className="text-xs font-mono text-gray-700">{selected.id}</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Image</p>
              <p className="text-xs font-mono text-gray-700">{selected.image}</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Ports</p>
              <p className="text-xs font-mono text-gray-700">{selected.ports || 'none'}</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Created</p>
              <p className="text-xs text-gray-700">{selected.created}</p>
            </div>
          </div>

          {selected.status === 'running' && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-3">Resource Usage</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gray-500">CPU</span>
                    <span className="text-xs font-mono font-bold text-gray-700">{selected.cpu}</span>
                  </div>
                  <PixelResourceBar value={parseFloat(selected.cpu) || 0} max={20} segments={16} color="bg-blue-500" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gray-500">Memory</span>
                    <span className="text-xs font-mono font-bold text-gray-700">{selected.mem}</span>
                  </div>
                  <PixelResourceBar value={parseFloat(selected.mem) || 0} max={500} segments={16} color="bg-purple-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Note */}
      <div className="flex items-center gap-2 text-[10px] text-gray-400">
        <PixelSparkle size={10} className="text-blue-400" />
        <span>Docker Engine 24.0 · 8 containers · 8 images · 5 volumes · 4 networks</span>
      </div>
    </div>
  );
}