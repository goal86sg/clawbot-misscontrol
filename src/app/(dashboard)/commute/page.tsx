'use client';

import React, { useState, useEffect } from 'react';
import { PixelProgress } from '@/components/PixelProgress';
import { PixelClock } from '@/lib/pixel-icons';

// ─── Fake live data ────────────────────────────────────────────────────────
// In production: wire to real API (LTA, Google Maps, OneMotoring, etc.)
const DEFAULT_DATA = {
  generated: '',
  origin: { name: 'Punggol Northshore', address: 'Blk 422A, Punggol Northshore Dr' },
  destination: { name: 'Suntec Tower 3', address: '12 Marina Blvd, Suntec City' },
  mode: 'MRT' as 'MRT' | 'Bus' | 'Drive' | 'Cycle',
  departure: '08:00',
  eta: '09:02',
  duration_mins: 62,
  delay_mins: 0,
  status: 'good' as 'good' | 'moderate' | 'busy' | 'incident',
  status_msg: 'Green line · No delays',
  // MRT breakdown
  mrt: {
    line: 'North South Line',
    next_departure: '08:07',
    wait_mins: 5,
    crowds: [
      { station: 'Punggol', crowd: 40, capacity: 100 },
      { station: 'Sengkang', crowd: 55, capacity: 100 },
      { station: 'Buangkok', crowd: 60, capacity: 100 },
      { station: 'Kovan', crowd: 55, capacity: 100 },
      { station: 'Hougang', crowd: 70, capacity: 100 },
      { station: 'Tai Seng', crowd: 75, capacity: 100 },
      { station: 'Bartley', crowd: 65, capacity: 100 },
      { station: 'Serangoon', crowd: 80, capacity: 100 },
      { station: 'Lorong Chuan', crowd: 70, capacity: 100 },
      { station: 'Bishan', crowd: 85, capacity: 100 },
      { station: 'Ang Mo Kio', crowd: 80, capacity: 100 },
      { station: 'Yio Chu Kang', crowd: 65, capacity: 100 },
      { station: 'Khatib', crowd: 60, capacity: 100 },
      { station: 'Yishun', crowd: 55, capacity: 100 },
      { station: 'Canberra', crowd: 50, capacity: 100 },
      { station: 'Sembawang', crowd: 45, capacity: 100 },
      { station: 'Admiralty', crowd: 50, capacity: 100 },
      { station: 'Woodlands', crowd: 60, capacity: 100 },
      { station: 'Kranji', crowd: 50, capacity: 100 },
      { station: 'Marsiling', crowd: 45, capacity: 100 },
      { station: 'Yew Tee', crowd: 40, capacity: 100 },
      { station: 'Choa Chu Kang', crowd: 45, capacity: 100 },
      { station: 'Bukit Gombak', crowd: 40, capacity: 100 },
      { station: 'Hillview', crowd: 35, capacity: 100 },
      { station: 'Hume', crowd: 30, capacity: 100 },
      { station: 'Beauty World', crowd: 35, capacity: 100 },
      { station: 'King Albert Park', crowd: 30, capacity: 100 },
      { station: 'Sixth Avenue', crowd: 25, capacity: 100 },
      { station: 'Tan Kah Kee', crowd: 20, capacity: 100 },
      { station: 'Botanic Gardens', crowd: 30, capacity: 100 },
      { station: 'Caldecott', crowd: 40, capacity: 100 },
      { station: 'Marymount', crowd: 45, capacity: 100 },
      { station: 'Ang Mo Kio', crowd: 75, capacity: 100 },
    ],
  },
  // Bus alternative
  bus: {
    service: '43',
    next_departure: '08:12',
    wait_mins: 8,
    crowd_pct: 72,
  },
  // Drive
  drive: {
    route: 'CLE / CTE',
    traffic: 'moderate' as 'light' | 'moderate' | 'heavy',
    toll: 'S$2.30',
    est_time: '55 mins',
  },
};

const statusConfig = {
  good: { color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: 'GOOD', dot: 'bg-green-500' },
  moderate: { color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200', label: 'MODERATE', dot: 'bg-yellow-500' },
  busy: { color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', label: 'BUSY', dot: 'bg-orange-500' },
  incident: { color: 'text-red-600', bg: 'bg-red-50 border-red-200', label: 'INCIDENT', dot: 'bg-red-500' },
};

function getStatusForCrowd(pct: number) {
  if (pct > 85) return 'busy';
  if (pct > 65) return 'moderate';
  return 'good';
}

// Pixel map grid for MRT line
const STATIONS = DEFAULT_DATA.mrt.crowds.map(s => s.station);

export default function CommutePage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [mode, setMode] = useState<'MRT' | 'Bus' | 'Drive'>('MRT');
  const [time, setTime] = useState('');
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Singapore',
      }));
    };
    update();
    const id = setInterval(update, 1000);
    const anim = setInterval(() => setAnimFrame(f => f + 1), 600);
    return () => { clearInterval(id); clearInterval(anim); };
  }, []);

  const status = statusConfig[data.status];
  const crowdMax = 100;

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded">
            COMMUTE v1.0
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Commute</h1>
            <p className="text-xs text-gray-500">Punggol → Suntec · live</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded border ${status.bg} ${status.color}`}>
            <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
            {status.label}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2 py-1.5 rounded">
            <PixelClock size={12} />
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {(['MRT', 'Bus', 'Drive'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`text-[11px] px-4 py-1.5 rounded font-medium transition-all ${
              mode === m ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Route Summary Bar */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <span className="text-xs font-medium text-gray-900 truncate">{data.origin.name}</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-200 border-dashed" style={{ borderStyle: 'dashed', borderWidth: '1px 0 0 0', borderColor: '#e5e7eb' }} />
              <span className="text-[10px] text-gray-400 font-mono">{data.duration_mins} min</span>
              <div className="h-px flex-1 bg-gray-200 border-dashed" style={{ borderStyle: 'dashed', borderWidth: '1px 0 0 0', borderColor: '#e5e7eb' }} />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-medium text-gray-900 truncate">{data.destination.name}</span>
              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-1.5">
            <span className="text-[9px] text-gray-400 font-mono">Dep: {data.departure}</span>
            <span className="text-[9px] text-gray-400">→</span>
            <span className="text-[9px] text-gray-400 font-mono">ETA: {data.eta}</span>
            {data.delay_mins > 0 && (
              <span className="text-[9px] text-orange-500 font-medium">⚠ +{data.delay_mins} min delay</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {mode === 'MRT' && (
        <div className="space-y-4">
          {/* Next Train Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Next Departure</p>
              <p className="text-2xl font-bold font-mono text-gray-900 mt-1">{data.mrt.next_departure}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">in {data.mrt.wait_mins} min · {data.mrt.line}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Status</p>
              <p className={`text-xl font-bold mt-1 ${status.color}`}>{data.status_msg}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{data.origin.name}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Journey</p>
              <p className="text-2xl font-bold font-mono text-gray-900 mt-1">{data.duration_mins} min</p>
              <p className="text-[10px] text-gray-400 mt-0.5">/{STATIONS.length} stations</p>
            </div>
          </div>

          {/* Pixel MRT Map */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-5 py-2.5 border-b border-gray-100"
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">MRT Crowd Map · North South Line</h2>
                <div className="flex items-center gap-3 text-[9px] text-gray-400 font-mono">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-400 inline-block" /> good</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-400 inline-block" /> moderate</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 inline-block" /> busy</span>
                </div>
              </div>
            </div>

            {/* Pixel grid map */}
            <div className="px-5 py-4">
              <div className="flex flex-col gap-0.5">
                {data.mrt.crowds.map((station, i) => {
                  const crowdPct = Math.round((station.crowd / crowdMax) * 100);
                  const s = getStatusForCrowd(crowdPct);
                  const color = s === 'busy' ? '#ef4444' : s === 'moderate' ? '#eab308' : '#22c55e';
                  const pulse = animFrame % 4 === 0 && crowdPct > 80;
                  return (
                    <div key={station.station} className="flex items-center gap-2 group">
                      {/* Station dot */}
                      <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                        <div
                          className="w-2.5 h-2.5 rounded-sm transition-all"
                          style={{ backgroundColor: color, opacity: pulse ? 0.5 : 1 }}
                        />
                      </div>

                      {/* Station name */}
                      <span className={`text-[10px] w-24 shrink-0 font-medium ${
                        station.station === 'Punggol' || station.station === 'Suntec'
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}>
                        {station.station}
                      </span>

                      {/* Crowd pixel bar */}
                      <div className="flex-1 flex items-center gap-0.5">
                        {Array.from({ length: 20 }).map((_, px) => (
                          <div
                            key={px}
                            className="h-2 transition-all"
                            style={{
                              width: '4px',
                              backgroundColor: px < Math.round(crowdPct / 5)
                                ? color
                                : '#f3f4f6',
                              opacity: px < Math.round(crowdPct / 5) ? 1 : 0.4,
                            }}
                          />
                        ))}
                      </div>

                      {/* Percentage */}
                      <span className="text-[9px] font-mono w-8 text-right" style={{ color }}>
                        {crowdPct}%
                      </span>

                      {/* Tooltip on hover */}
                      <span className="text-[8px] text-gray-400 w-6 text-right hidden group-hover:block">
                        {station.crowd}/{crowdMax}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'Bus' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-6">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-3">Bus {data.bus.service}</p>
            <div className="flex items-end gap-4">
              <div>
                <p className="text-3xl font-bold font-mono text-gray-900">{data.bus.next_departure}</p>
                <p className="text-xs text-gray-400 mt-1">next bus</p>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <p className="text-2xl font-bold font-mono text-blue-600">{data.bus.wait_mins} min</p>
                <p className="text-xs text-gray-400 mt-1">wait time</p>
              </div>
            </div>
            <div className="mt-4">
              <PixelProgress value={data.bus.crowd_pct} max={100} variant={data.bus.crowd_pct > 80 ? 'red' : data.bus.crowd_pct > 60 ? 'yellow' : 'green'} />
              <p className="text-[10px] text-gray-400 mt-1">Crowd: {data.bus.crowd_pct}% capacity</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-6">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-3">Alternative Routes</p>
            <div className="space-y-3">
              {[
                { service: '43M', wait: '14 min', crowd: 55 },
                { service: '62', wait: '22 min', crowd: 40 },
                { service: '82', wait: '31 min', crowd: 30 },
              ].map(b => (
                <div key={b.service} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs font-mono font-medium text-gray-700">Bus {b.service}</span>
                  <div className="flex items-center gap-3">
                    <PixelProgress value={b.crowd} max={100} variant={b.crowd > 80 ? 'red' : 'green'} />
                    <span className="text-[10px] text-gray-400 w-12 text-right">{b.wait}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'Drive' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Route</p>
            <p className="text-lg font-bold font-mono text-gray-900 mt-1">{data.drive.route}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">via expressway</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Traffic</p>
            <p className={`text-lg font-bold mt-1 ${data.drive.traffic === 'heavy' ? 'text-red-500' : data.drive.traffic === 'moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
              {data.drive.traffic.charAt(0).toUpperCase() + data.drive.traffic.slice(1)}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">est. {data.drive.est_time}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">ERP / Toll</p>
            <p className="text-lg font-bold font-mono text-gray-900 mt-1">{data.drive.toll}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">estimated cost</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono bg-white border border-gray-200 rounded-lg px-4 py-2">
        <span>MISSION CONTROL · COMMUTE</span>
        <span>Data is simulated · wire to LTA / Google Maps API for live data</span>
      </div>
    </div>
  );
}