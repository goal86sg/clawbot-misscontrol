'use client';

import React, { useState, useEffect } from 'react';
import { PixelClock, PixelAlert, PixelCheck } from '@/lib/pixel-icons';
import { PixelPulse } from '@/lib/pixel-icons-extra';

// ─── Pixel Icons ─────────────────────────────────────────────────────────────

function PixelServer({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="1" y="1" width="6" height="6" fill="currentColor" opacity="0.15" />
      <rect x="1" y="1" width="6" height="1" fill="currentColor" opacity="0.4" />
      <rect x="2" y="2.5" width="1" height="1" fill="currentColor" />
      <rect x="5" y="2.5" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="2" y="4.5" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="4.5" width="1" height="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelWave({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="4" width="1" height="2" fill="currentColor" />
      <rect x="1" y="3" width="1" height="3" fill="currentColor" />
      <rect x="2" y="1" width="1" height="5" fill="currentColor" />
      <rect x="3" y="2" width="1" height="4" fill="currentColor" />
      <rect x="4" y="0" width="1" height="6" fill="currentColor" />
      <rect x="5" y="2" width="1" height="4" fill="currentColor" />
      <rect x="6" y="1" width="1" height="5" fill="currentColor" />
      <rect x="7" y="4" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelLightning({ size = 12, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="4" y="0" width="2" height="1" fill="currentColor" />
      <rect x="3" y="1" width="3" height="1" fill="currentColor" />
      <rect x="2" y="2" width="3" height="2" fill="currentColor" />
      <rect x="1" y="4" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="3" height="1" fill="currentColor" />
      <rect x="4" y="5" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelDatabase({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="1" fill="currentColor" />
      <rect x="1" y="1" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="6" height="1" fill="currentColor" />
      <rect x="1" y="3" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="4" width="6" height="1" fill="currentColor" />
      <rect x="1" y="5" width="6" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="6" width="6" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelRocket({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="4" y="1" width="2" height="1" fill="currentColor" opacity="0.6" />
      <rect x="2" y="2" width="4" height="3" fill="currentColor" />
      <rect x="1" y="3" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="6" y="3" width="1" height="2" fill="currentColor" opacity="0.4" />
      <rect x="3" y="5" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="2" y="6" width="4" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelShield({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.15" />
      <rect x="2" y="2" width="4" height="3" fill="currentColor" />
      <rect x="3" y="3" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" />
      <rect x="2" y="7" width="4" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelCode({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="2" width="2" height="4" fill="currentColor" opacity="0.4" />
      <rect x="3" y="1" width="2" height="6" fill="currentColor" opacity="0.6" />
      <rect x="6" y="2" width="2" height="4" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelGraph({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
      <rect x="0" y="7" width="8" height="1" fill="currentColor" opacity="0.2" />
      <rect x="1" y="5" width="1" height="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="3" width="1" height="4" fill="currentColor" />
      <rect x="5" y="1" width="1" height="6" fill="currentColor" />
      <rect x="7" y="4" width="1" height="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type EndpointStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

interface Endpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  status: EndpointStatus;
  latency: number; // ms
  p99: number;
  errorRate: number; // percentage
  uptime: number; // percentage
  requestsPerMin: number;
  lastChecked: string;
  category: string;
  region: string;
  history: number[]; // last 12 latency readings
}

interface Incident {
  id: string;
  endpoint: string;
  type: 'latency' | 'error' | 'down' | 'recovery';
  message: string;
  timestamp: string;
  resolved: boolean;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

function generateHistory(base: number, variance: number): number[] {
  return Array.from({ length: 12 }, () =>
    Math.round(base + (Math.random() - 0.5) * variance)
  );
}

const ENDPOINTS: Endpoint[] = [
  {
    id: 'pg-dma-query',
    name: 'PostgreSQL DAM Query',
    method: 'POST',
    path: '/api/v1/query',
    status: 'healthy',
    latency: 12,
    p99: 45,
    errorRate: 0.02,
    uptime: 99.98,
    requestsPerMin: 847,
    lastChecked: '2s ago',
    category: 'database',
    region: 'us-east-1',
    history: generateHistory(12, 20),
  },
  {
    id: 'pg-dma-ingest',
    name: 'DAM Log Ingest',
    method: 'POST',
    path: '/api/v1/ingest',
    status: 'healthy',
    latency: 8,
    p99: 22,
    errorRate: 0.0,
    uptime: 100.0,
    requestsPerMin: 2340,
    lastChecked: '1s ago',
    category: 'database',
    region: 'us-east-1',
    history: generateHistory(8, 15),
  },
  {
    id: 'ebpf-trace',
    name: 'eBPF Trace Stream',
    method: 'GET',
    path: '/api/v1/trace/stream',
    status: 'degraded',
    latency: 145,
    p99: 380,
    errorRate: 1.2,
    uptime: 99.1,
    requestsPerMin: 156,
    lastChecked: '5s ago',
    category: 'tracing',
    region: 'us-east-1',
    history: generateHistory(145, 120),
  },
  {
    id: 'auth-token',
    name: 'Auth Token Validate',
    method: 'POST',
    path: '/api/v1/auth/validate',
    status: 'healthy',
    latency: 5,
    p99: 18,
    errorRate: 0.0,
    uptime: 99.99,
    requestsPerMin: 3420,
    lastChecked: '1s ago',
    category: 'auth',
    region: 'global',
    history: generateHistory(5, 8),
  },
  {
    id: 'metrics-scrape',
    name: 'Prometheus Scrape',
    method: 'GET',
    path: '/metrics',
    status: 'healthy',
    latency: 22,
    p99: 67,
    errorRate: 0.01,
    uptime: 99.95,
    requestsPerMin: 120,
    lastChecked: '3s ago',
    category: 'monitoring',
    region: 'us-east-1',
    history: generateHistory(22, 30),
  },
  {
    id: 'health-check',
    name: 'Health Check',
    method: 'GET',
    path: '/health',
    status: 'healthy',
    latency: 2,
    p99: 5,
    errorRate: 0.0,
    uptime: 100.0,
    requestsPerMin: 60,
    lastChecked: '0s ago',
    category: 'monitoring',
    region: 'global',
    history: generateHistory(2, 3),
  },
  {
    id: 'k8s-pods',
    name: 'K8s Pod Status',
    method: 'GET',
    path: '/api/v1/k8s/pods',
    status: 'healthy',
    latency: 34,
    p99: 89,
    errorRate: 0.05,
    uptime: 99.87,
    requestsPerMin: 280,
    lastChecked: '4s ago',
    category: 'infrastructure',
    region: 'us-east-1',
    history: generateHistory(34, 40),
  },
  {
    id: 'log-shipper',
    name: 'Log Shipper Batch',
    method: 'POST',
    path: '/api/v1/logs/batch',
    status: 'down',
    latency: 0,
    p99: 0,
    errorRate: 100.0,
    uptime: 94.2,
    requestsPerMin: 0,
    lastChecked: '12s ago',
    category: 'logging',
    region: 'us-east-1',
    history: generateHistory(50, 200),
  },
];

const INCIDENTS: Incident[] = [
  {
    id: 'inc-001',
    endpoint: 'ebpf-trace',
    type: 'latency',
    message: 'P99 latency spike detected: 380ms (threshold: 200ms)',
    timestamp: '14:23:01',
    resolved: false,
  },
  {
    id: 'inc-002',
    endpoint: 'log-shipper',
    type: 'down',
    message: 'Endpoint unreachable after deployment',
    timestamp: '14:18:45',
    resolved: false,
  },
  {
    id: 'inc-003',
    endpoint: 'pg-dma-query',
    type: 'recovery',
    message: 'Latency recovered to normal: 12ms',
    timestamp: '13:55:12',
    resolved: true,
  },
  {
    id: 'inc-004',
    endpoint: 'auth-token',
    type: 'error',
    message: 'Spike in 401 errors: 0.8% (threshold: 0.5%)',
    timestamp: '13:42:30',
    resolved: true,
  },
  {
    id: 'inc-005',
    endpoint: 'k8s-pods',
    type: 'latency',
    message: 'Increased latency after scaling event',
    timestamp: '12:15:00',
    resolved: true,
  },
];

const CATEGORIES = ['All', 'database', 'tracing', 'auth', 'monitoring', 'infrastructure', 'logging'];
const REGIONS = ['All', 'us-east-1', 'global'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<EndpointStatus, { label: string; color: string; bg: string; dot: string }> = {
  healthy: { label: 'Healthy', color: 'text-green-600', bg: 'bg-green-50 border-green-200', dot: 'bg-green-500' },
  degraded: { label: 'Degraded', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200', dot: 'bg-yellow-500' },
  down: { label: 'Down', color: 'text-red-600', bg: 'bg-red-50 border-red-200', dot: 'bg-red-500' },
  unknown: { label: 'Unknown', color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200', dot: 'bg-gray-400' },
};

const METHOD_COLORS: Record<string, string> = {
  GET: 'text-blue-600 bg-blue-50',
  POST: 'text-green-600 bg-green-50',
  PUT: 'text-amber-600 bg-amber-50',
  DELETE: 'text-red-600 bg-red-50',
  PATCH: 'text-purple-600 bg-purple-50',
};

function LatencySparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 20;
  const w = 60;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0" shapeRendering="crispEdges">
      {data.map((v, i) => {
        const barH = Math.max(2, Math.round(((v - min) / range) * (h - 2)));
        const x = Math.round((i / (data.length - 1)) * (w - 4));
        const y = h - barH - 1;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={3}
            height={barH}
            fill={color}
            opacity={0.6 + (i / data.length) * 0.4}
          />
        );
      })}
    </svg>
  );
}

function HealthGauge({ value }: { value: number }) {
  const color = value >= 99 ? '#22c55e' : value >= 95 ? '#eab308' : '#ef4444';
  const segments = 10;
  const filled = Math.round((value / 100) * segments);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-[2px]">
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className="w-2 h-4 rounded-sm"
            style={{
              backgroundColor: i < filled ? color : '#e5e7eb',
              opacity: i < filled ? 1 : 0.5,
            }}
          />
        ))}
      </div>
      <span className="text-sm font-bold font-mono" style={{ color }}>
        {value.toFixed(1)}%
      </span>
    </div>
  );
}

// ─── Components ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: EndpointStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[9px] font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
      {cfg.label}
    </span>
  );
}

function EndpointRow({ endpoint, selected, onClick }: {
  endpoint: Endpoint;
  selected: boolean;
  onClick: () => void;
}) {
  const latencyColor = endpoint.latency < 50 ? '#22c55e' : endpoint.latency < 200 ? '#eab308' : '#ef4444';
  const errorColor = endpoint.errorRate < 0.1 ? '#22c55e' : endpoint.errorRate < 1 ? '#eab308' : '#ef4444';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50 ${
        selected ? 'bg-indigo-50 hover:bg-indigo-50' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Status dot */}
        <div className={`w-2 h-2 rounded-full mt-0.5 shrink-0 ${STATUS_CONFIG[endpoint.status].dot}`}
          style={{ animation: endpoint.status === 'down' ? 'ping 1s infinite' : 'none' }}
        />

        {/* Method */}
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${METHOD_COLORS[endpoint.method]}`}>
          {endpoint.method}
        </span>

        {/* Name + path */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-900 truncate">{endpoint.name}</p>
          <p className="text-[9px] text-gray-400 font-mono truncate">{endpoint.path}</p>
        </div>

        {/* Latency sparkline */}
        <div className="hidden sm:flex items-center gap-1.5">
          <PixelWave size={10} />
          <LatencySparkline data={endpoint.history} color={latencyColor} />
          <span className="text-[10px] font-mono font-bold w-10 text-right" style={{ color: latencyColor }}>
            {endpoint.latency}ms
          </span>
        </div>

        {/* Error rate */}
        <div className="hidden md:flex items-center gap-1">
          <PixelAlert size={10} />
          <span className="text-[10px] font-mono font-bold w-10 text-right" style={{ color: errorColor }}>
            {endpoint.errorRate.toFixed(2)}%
          </span>
        </div>

        {/* Uptime */}
        <div className="hidden lg:flex items-center gap-1">
          <PixelShield size={10} />
          <span className="text-[10px] font-mono w-10 text-right text-gray-500">
            {endpoint.uptime.toFixed(2)}%
          </span>
        </div>

        {/* Status badge */}
        <div className="shrink-0">
          <StatusBadge status={endpoint.status} />
        </div>

        {/* Last checked */}
        <span className="text-[9px] text-gray-300 font-mono w-14 text-right shrink-0">
          {endpoint.lastChecked}
        </span>
      </div>

      {/* Mobile stats row */}
      <div className="flex items-center gap-4 mt-2 sm:hidden">
        <span className="text-[9px] text-gray-400">
          <PixelWave size={9} className="inline mr-0.5" />
          {endpoint.latency}ms
        </span>
        <span className="text-[9px] text-gray-400">
          <PixelAlert size={9} className="inline mr-0.5" />
          {endpoint.errorRate.toFixed(2)}%
        </span>
        <span className="text-[9px] text-gray-400">
          <PixelShield size={9} className="inline mr-0.5" />
          {endpoint.uptime.toFixed(1)}%
        </span>
        <span className="text-[9px] text-gray-400 ml-auto">
          {endpoint.requestsPerMin.toLocaleString()}/min
        </span>
      </div>
    </button>
  );
}

function EndpointDetail({ endpoint, onClose }: { endpoint: Endpoint; onClose: () => void }) {
  const cfg = STATUS_CONFIG[endpoint.status];
  const latencyColor = endpoint.latency < 50 ? '#22c55e' : endpoint.latency < 200 ? '#eab308' : '#ef4444';

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div
        className="px-5 py-3 border-b border-gray-100 flex items-center justify-between"
        style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
      >
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
          <div>
            <h3 className="text-xs font-semibold text-gray-900">{endpoint.name}</h3>
            <p className="text-[9px] text-gray-400 font-mono">{endpoint.method} {endpoint.path}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[10px] text-gray-400 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          ✕ Close
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Status + Region */}
        <div className="flex items-center gap-3">
          <StatusBadge status={endpoint.status} />
          <span className="text-[10px] text-gray-400">
            <PixelServer size={10} className="inline mr-1" />
            {endpoint.region}
          </span>
          <span className="text-[10px] text-gray-400 ml-auto">
            <PixelClock size={10} className="inline mr-1" />
            Last checked: {endpoint.lastChecked}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Latency</p>
            <p className="text-xl font-bold font-mono mt-1" style={{ color: latencyColor }}>
              {endpoint.latency}ms
            </p>
            <p className="text-[9px] text-gray-400">avg</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">P99</p>
            <p className="text-xl font-bold font-mono mt-1 text-gray-700">
              {endpoint.p99}ms
            </p>
            <p className="text-[9px] text-gray-400">99th pct</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Error Rate</p>
            <p className="text-xl font-bold font-mono mt-1 text-gray-700">
              {endpoint.errorRate.toFixed(2)}%
            </p>
            <p className="text-[9px] text-gray-400">of all requests</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">RPM</p>
            <p className="text-xl font-bold font-mono mt-1 text-gray-700">
              {endpoint.requestsPerMin.toLocaleString()}
            </p>
            <p className="text-[9px] text-gray-400">requests/min</p>
          </div>
        </div>

        {/* Latency History */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <PixelGraph size={12} />
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Latency History (last 12 checks)</p>
          </div>
          <div className="flex items-end gap-[2px] h-12">
            {endpoint.history.map((v, i) => {
              const max = Math.max(...endpoint.history);
              const h = Math.max(3, Math.round((v / max) * 48));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div
                    className="w-full rounded-t-sm"
                    style={{ height: h, backgroundColor: latencyColor, opacity: 0.4 + (i / endpoint.history.length) * 0.6 }}
                  />
                  <span className="text-[7px] text-gray-300 font-mono">{v}ms</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Uptime */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PixelShield size={12} />
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Uptime</p>
            <span className="ml-auto text-[10px] text-gray-500 font-mono">{endpoint.uptime.toFixed(3)}%</span>
          </div>
          <HealthGauge value={endpoint.uptime} />
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <PixelCode size={11} />
          <span className="bg-gray-100 px-2 py-0.5 rounded text-[9px] font-medium">{endpoint.category}</span>
          <span className="text-[9px] text-gray-400 ml-auto">ID: {endpoint.id}</span>
        </div>
      </div>
    </div>
  );
}

function IncidentRow({ incident }: { incident: Incident }) {
  const typeConfig = {
    latency: { icon: <PixelClock size={10} />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    error: { icon: <PixelAlert size={10} />, color: 'text-red-600', bg: 'bg-red-50' },
    down: { icon: <PixelServer size={10} />, color: 'text-red-700', bg: 'bg-red-100' },
    recovery: { icon: <PixelCheck size={10} />, color: 'text-green-600', bg: 'bg-green-50' },
  }[incident.type];

  return (
    <div className={`flex items-start gap-2 px-4 py-2 border-b border-gray-100 last:border-0 ${incident.resolved ? 'opacity-50' : ''}`}>
      <span className={`mt-0.5 ${typeConfig.color}`}>{typeConfig.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] leading-snug ${incident.resolved ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
          {incident.message}
        </p>
        <p className="text-[9px] text-gray-400 font-mono mt-0.5">{incident.timestamp}</p>
      </div>
      {incident.resolved && (
        <span className="text-[9px] text-green-500 font-medium shrink-0">Resolved</span>
      )}
    </div>
  );
}

function OverviewStrip({ endpoints }: { endpoints: Endpoint[] }) {
  const healthy = endpoints.filter(e => e.status === 'healthy').length;
  const degraded = endpoints.filter(e => e.status === 'degraded').length;
  const down = endpoints.filter(e => e.status === 'down').length;
  const totalRpm = endpoints.reduce((s, e) => s + e.requestsPerMin, 0);
  const avgUptime = endpoints.reduce((s, e) => s + e.uptime, 0) / endpoints.length;
  const avgLatency = endpoints.filter(e => e.latency > 0).reduce((s, e) => s + e.latency, 0) / endpoints.filter(e => e.latency > 0).length;

  const stats = [
    { label: 'Total Endpoints', value: endpoints.length.toString(), icon: <PixelServer size={12} />, color: 'text-indigo-600' },
    { label: 'Healthy', value: healthy.toString(), icon: <PixelCheck size={12} className="text-green-500" />, color: 'text-green-600' },
    { label: 'Degraded', value: degraded.toString(), icon: <PixelAlert size={12} className="text-yellow-500" />, color: 'text-yellow-600' },
    { label: 'Down', value: down.toString(), icon: <PixelAlert size={12} className="text-red-500" />, color: 'text-red-600' },
    { label: 'Total RPM', value: `${(totalRpm / 1000).toFixed(1)}k`, icon: <PixelPulse size={12} className="text-blue-500" />, color: 'text-blue-600' },
    { label: 'Avg Uptime', value: `${avgUptime.toFixed(2)}%`, icon: <PixelShield size={12} />, color: 'text-emerald-600' },
    { label: 'Avg Latency', value: `${Math.round(avgLatency)}ms`, icon: <PixelWave size={12} />, color: 'text-cyan-600' },
  ];

  return (
    <div className="grid grid-cols-7 gap-3">
      {stats.map(stat => (
        <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
          <div className="flex justify-center mb-1">{stat.icon}</div>
          <p className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function CategoryFilter({ categories, active, onSelect }: {
  categories: string[];
  active: string;
  onSelect: (c: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`text-[9px] px-2.5 py-1 rounded-full font-medium transition-colors uppercase tracking-wider ${
            active === cat
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function StatusFilter({ active, onSelect }: { active: string; onSelect: (s: string) => void }) {
  const options = ['All', 'healthy', 'degraded', 'down'];
  return (
    <div className="flex items-center bg-gray-100 rounded-md p-0.5 gap-0.5">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`text-[9px] px-2.5 py-1 rounded transition-colors font-medium uppercase tracking-wider ${
            active === opt ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function APIMonitorPage() {
  const [selected, setSelected] = useState<Endpoint | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Singapore',
      }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = ENDPOINTS.filter(e => {
    if (categoryFilter !== 'All' && e.category !== categoryFilter) return false;
    if (statusFilter !== 'All' && e.status !== statusFilter) return false;
    if (regionFilter !== 'All' && e.region !== regionFilter) return false;
    return true;
  });

  const openIncidents = INCIDENTS.filter(i => !i.resolved);
  const resolvedIncidents = INCIDENTS.filter(i => i.resolved);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <PixelServer size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">API Monitor</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {ENDPOINTS.length} endpoints · {openIncidents.length} open incidents
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded">
            <PixelClock size={11} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-green-50 border border-green-200 px-2.5 py-1.5 rounded">
            <PixelLightning size={11} className="text-yellow-500" />
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* Overview Strip */}
      <OverviewStrip endpoints={ENDPOINTS} />

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Endpoint List */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div
            className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-4"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
          >
            <div className="flex items-center gap-2">
              <PixelRocket size={14} />
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Endpoints</h2>
              <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                {filtered.length} shown
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StatusFilter active={statusFilter} onSelect={setStatusFilter} />
            </div>
          </div>

          {/* Column headers */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 border-b border-gray-100 text-[8px] text-gray-400 uppercase tracking-widest">
            <div className="w-2" />
            <div className="w-12">Method</div>
            <div className="flex-1">Endpoint</div>
            <div className="hidden sm:flex items-center gap-1 w-28">
              <PixelWave size={9} /> Latency
            </div>
            <div className="hidden md:flex items-center gap-1 w-14">
              <PixelAlert size={9} /> Error
            </div>
            <div className="hidden lg:flex items-center gap-1 w-14">
              <PixelShield size={9} /> Uptime
            </div>
            <div className="w-16">Status</div>
            <div className="w-14 text-right">Checked</div>
          </div>

          {/* Category filter */}
          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
            <CategoryFilter categories={CATEGORIES} active={categoryFilter} onSelect={setCategoryFilter} />
          </div>

          {/* Rows */}
          <div className="max-h-[420px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-8 text-center">
                <PixelServer size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-xs text-gray-400">No endpoints match filters</p>
              </div>
            ) : (
              filtered.map(ep => (
                <EndpointRow
                  key={ep.id}
                  endpoint={ep}
                  selected={selected?.id === ep.id}
                  onClick={() => setSelected(selected?.id === ep.id ? null : ep)}
                />
              ))
            )}
          </div>
        </div>

        {/* Detail / Incidents Panel */}
        <div className="space-y-4">
          {selected ? (
            <EndpointDetail endpoint={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div
                className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
                style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
              >
                <PixelRocket size={12} className="text-blue-500" />
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Endpoint Detail</h3>
              </div>
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
                  <PixelServer size={24} className="text-gray-300" />
                </div>
                <p className="text-xs text-gray-400">Click an endpoint to inspect</p>
                <p className="text-[10px] text-gray-300 mt-1">Latency · Error Rate · Uptime</p>
              </div>
            </div>
          )}

          {/* Incidents */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div
              className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
            >
              <PixelAlert size={12} className="text-red-500" />
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Incidents</h3>
              <span className="ml-auto text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">
                {openIncidents.length} open
              </span>
            </div>

            {openIncidents.length > 0 && (
              <div>
                <p className="text-[9px] text-red-500 font-semibold uppercase tracking-widest px-4 pt-2">Active</p>
                {openIncidents.map(inc => <IncidentRow key={inc.id} incident={inc} />)}
              </div>
            )}

            {resolvedIncidents.length > 0 && (
              <div className={openIncidents.length > 0 ? 'border-t border-gray-100' : ''}>
                <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest px-4 pt-2">Resolved</p>
                {resolvedIncidents.map(inc => <IncidentRow key={inc.id} incident={inc} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Region filter bar */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-gray-400 uppercase tracking-widest">Region:</span>
        {REGIONS.map(r => (
          <button
            key={r}
            onClick={() => setRegionFilter(r)}
            className={`text-[9px] px-2 py-0.5 rounded font-medium transition-colors ${
              regionFilter === r ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {r}
          </button>
        ))}
        <span className="ml-auto text-[9px] text-gray-300 font-mono">
          PostgreSQL DAM · eBPF Trace · K8s · Auth
        </span>
      </div>

      {/* Pixel Art Footer */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2"
            style={{
              backgroundColor: ['#3b82f6', '#06b6d4', '#10b981', '#6366f1', '#ec4899'][i % 5],
              borderRadius: i % 3 === 0 ? '50%' : '2px',
              opacity: Math.sin(i * 0.5) * 0.3 + 0.7,
            }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · API Monitor · Screen 43
      </p>
    </div>
  );
}