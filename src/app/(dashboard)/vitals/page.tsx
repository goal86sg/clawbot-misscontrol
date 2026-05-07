'use client';

import React, { useState, useEffect } from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelHeart, PixelSparkle, PixelClock } from '@/lib/pixel-icons';

interface VitalsData {
  generated: string;
  generated_sgt: string;
  cpu: { pct: number; load: string };
  memory: { total_mb: number; used_mb: number; pct: number };
  disk: { pct: number; used: string; total: string };
  uptime: string;
  processes: number;
  network: { interface: string; ip: string };
  temperature_c: string;
  docker_containers: number;
  openclaw: string;
  repos: number;
}

const defaultData: VitalsData = {
  generated: '',
  generated_sgt: '',
  cpu: { pct: 0, load: '0' },
  memory: { total_mb: 0, used_mb: 0, pct: 0 },
  disk: { pct: 0, used: '0', total: '0' },
  uptime: '...',
  processes: 0,
  network: { interface: '...', ip: '...' },
  temperature_c: 'N/A',
  docker_containers: 0,
  openclaw: 'online',
  repos: 0,
};

const pixelBorder = (color: string) => ({
  border: `2px solid ${color}`,
  boxShadow: `inset 0 0 0 1px ${color}`,
});

export default function VitalsPage() {
  const [data, setData] = useState<VitalsData>(defaultData);
  const [lastRefresh, setLastRefresh] = useState<string>('');
  const [animFrame, setAnimFrame] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch('/vitals-data.json?' + Date.now());
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastRefresh(new Date().toLocaleTimeString('en-US', { hour12: false }));
      }
    } catch {
      // keep stale data
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    const anim = setInterval(() => setAnimFrame(f => f + 1), 800);
    return () => { clearInterval(interval); clearInterval(anim); };
  }, []);

  const varCpu = (data.cpu.pct + Math.sin(animFrame * 0.7) * 3).toFixed(0);

  const segments: { label: string; icon: React.ReactNode; pct: number; max: number; variant: 'green' | 'blue' | 'yellow' | 'red'; detail: string }[] = [
    {
      label: 'CPU',
      icon: <span className="font-mono text-xs">{varCpu}%</span>,
      pct: data.cpu.pct,
      max: 100,
      variant: data.cpu.pct > 80 ? 'red' : data.cpu.pct > 50 ? 'yellow' : 'green',
      detail: `load ${data.cpu.load}`,
    },
    {
      label: 'RAM',
      icon: <PixelHeart size={14} className="text-red-400" />,
      pct: data.memory.pct,
      max: 100,
      variant: data.memory.pct > 85 ? 'red' : data.memory.pct > 60 ? 'yellow' : 'green',
      detail: `${data.memory.used_mb}MB / ${data.memory.total_mb}MB`,
    },
    {
      label: 'DISK',
      icon: <span className="font-mono text-[10px]">💾</span>,
      pct: data.disk.pct,
      max: 100,
      variant: data.disk.pct > 90 ? 'red' : data.disk.pct > 75 ? 'yellow' : 'green',
      detail: `${data.disk.used} / ${data.disk.total}`,
    },
  ];

  const sparkles = ['✦', '✧', '⋆', '✶'];

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">System Vitals</h1>
            <span className="text-xs animate-pulse text-green-500">{sparkles[animFrame % 4]}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time host monitoring · last refresh: {lastRefresh || 'loading...'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
          <PixelClock size={12} />
          <span>{data.uptime}</span>
        </div>
      </div>

      {/* Main Vitals */}
      <div className="grid grid-cols-3 gap-4">
        {segments.map((seg) => (
          <div key={seg.label} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{seg.label}</span>
              {seg.icon}
            </div>
            <PixelProgress value={seg.pct} max={seg.max} variant={seg.variant} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{seg.detail}</span>
              <span className="text-[10px] font-mono text-gray-400">{seg.pct}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* System Info Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Network */}
        <div className="bg-white border border-gray-200 rounded-lg p-4" style={pixelBorder('#e5e7eb')}>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Network</p>
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex justify-between">
              <span className="text-gray-400">iface</span>
              <span className="text-gray-700 font-medium">{data.network.interface}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ip</span>
              <span className="text-gray-700">{data.network.ip}</span>
            </div>
          </div>
        </div>

        {/* Processes */}
        <div className="bg-white border border-gray-200 rounded-lg p-4" style={pixelBorder('#e5e7eb')}>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Processes</p>
          <p className="text-2xl font-bold text-gray-900 font-mono">{data.processes}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">running tasks</p>
        </div>

        {/* Services */}
        <div className="bg-white border border-gray-200 rounded-lg p-4" style={pixelBorder('#e5e7eb')}>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Services</p>
          <div className="space-y-2 font-mono text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">OpenClaw</span>
              <span className={`flex items-center gap-1 ${data.openclaw === 'online' ? 'text-green-600' : 'text-red-500'}`}>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {data.openclaw}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Docker</span>
              <span className="text-gray-600">{data.docker_containers} containers</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Repos</span>
              <span className="text-gray-600">{data.repos} tracked</span>
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-white border border-gray-200 rounded-lg p-4" style={pixelBorder('#e5e7eb')}>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Temperature</p>
          {data.temperature_c !== 'N/A' ? (
            <>
              <p className="text-2xl font-bold text-gray-900 font-mono">{data.temperature_c}°C</p>
              <PixelProgress
                value={parseFloat(data.temperature_c)}
                max={90}
                variant={parseFloat(data.temperature_c) > 70 ? 'red' : parseFloat(data.temperature_c) > 50 ? 'yellow' : 'green'}
              />
            </>
          ) : (
            <div className="text-center py-2">
              <p className="text-xs text-gray-400 font-mono">no sensor</p>
              <p className="text-[9px] text-gray-300 mt-1">VM / no hwmon</p>
            </div>
          )}
        </div>
      </div>

      {/* Pixel footer decoration */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{
              opacity: Math.sin(i * 0.5 + animFrame * 0.3) * 0.5 + 0.5,
              clipPath: i % 5 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : undefined,
            }}
          />
        ))}
      </div>

      {/* Auto-refresh indicator */}
      <div className="text-center">
        <p className="text-[9px] text-gray-300 font-mono">
          auto-refresh every 15s · generated {data.generated_sgt || data.generated}
        </p>
      </div>
    </div>
  );
}
