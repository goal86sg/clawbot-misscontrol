'use client';

import React, { useState, useEffect } from 'react';
import { PixelClock, PixelCheck, PixelAlert } from '@/lib/pixel-icons';
import { PixelWeather } from '@/lib/pixel-icons-extra';

// ─── Pixel Cloud ──────────────────────────────────────────────────────────────

function PixelCloud({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="inline-block" shapeRendering="crispEdges">
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.2" />
      <rect x="2" y="1" width="4" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelRainDrop({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 4 6" className="inline-block" shapeRendering="crispEdges">
      <rect x="1" y="0" width="2" height="2" fill="currentColor" />
      <rect x="0" y="2" width="4" height="2" fill="currentColor" opacity="0.7" />
      <rect x="1" y="4" width="2" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// ─── Hourly Row ───────────────────────────────────────────────────────────────

interface HourlyForecast {
  hour: string;
  icon: 'sun' | 'cloud' | 'rain' | 'storm' | 'wind';
  temp: number;
  rain: number;
}

const hourlyData: HourlyForecast[] = [
  { hour: 'Now', icon: 'sun', temp: 28, rain: 0 },
  { hour: '9AM', icon: 'cloud', temp: 27, rain: 5 },
  { hour: '10AM', icon: 'sun', temp: 28, rain: 0 },
  { hour: '11AM', icon: 'sun', temp: 30, rain: 0 },
  { hour: '12PM', icon: 'sun', temp: 31, rain: 0 },
  { hour: '1PM', icon: 'sun', temp: 31, rain: 0 },
  { hour: '2PM', icon: 'cloud', temp: 30, rain: 10 },
  { hour: '3PM', icon: 'rain', temp: 29, rain: 45 },
  { hour: '4PM', icon: 'rain', temp: 28, rain: 60 },
  { hour: '5PM', icon: 'rain', temp: 27, rain: 55 },
  { hour: '6PM', icon: 'cloud', temp: 27, rain: 20 },
  { hour: '7PM', icon: 'cloud', temp: 26, rain: 10 },
];

// ─── Commute Segments ────────────────────────────────────────────────────────

interface CommuteSegment {
  from: string;
  to: string;
  duration: string;
  distance: string;
  route: string;
  status: 'clear' | 'moderate' | 'heavy';
  eta: string;
}

const morningCommute: CommuteSegment = {
  from: 'Blk 422A Northshore Dr',
  to: 'Suntec Tower 3',
  duration: '42 min',
  distance: '18.3 km',
  route: 'Tuas Link → AYE → CTE',
  status: 'moderate',
  eta: '8:42 AM',
};

const eveningCommute: CommuteSegment = {
  from: 'Suntec Tower 3',
  to: 'Blk 422A Northshore Dr',
  duration: '48 min',
  distance: '19.1 km',
  route: 'CTE → AYE → Tuas Link',
  status: 'clear',
  eta: '6:32 PM',
};

// ─── Air Quality ─────────────────────────────────────────────────────────────

interface AQIReading {
  label: string;
  value: number;
  desc: string;
}

const aqiReadings: AQIReading[] = [
  { label: 'PSI', value: 62, desc: 'Moderate' },
  { label: 'PM2.5', value: 28, desc: 'Good' },
  { label: 'Humidity', value: 78, desc: 'High' },
  { label: 'UV Index', value: 7, desc: 'High' },
];

// ─── Pixel 5-Day ─────────────────────────────────────────────────────────────

interface DayForecast {
  day: string;
  weather: 'sun' | 'cloud' | 'rain' | 'storm';
  high: number;
  low: number;
  rain: number;
}

const fiveDay: DayForecast[] = [
  { day: 'Sat', weather: 'sun', high: 31, low: 26, rain: 5 },
  { day: 'Sun', weather: 'rain', high: 29, low: 25, rain: 75 },
  { day: 'Mon', weather: 'cloud', high: 30, low: 26, rain: 30 },
  { day: 'Tue', weather: 'rain', high: 28, low: 25, rain: 80 },
  { day: 'Wed', weather: 'storm', high: 27, low: 24, rain: 95 },
];

// ─── Helper ──────────────────────────────────────────────────────────────────

function getWeatherIcon(icon: HourlyForecast['icon'], size = 16) {
  if (icon === 'sun') {
    return (
      <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
        <rect x="3" y="0" width="2" height="1" fill="currentColor" />
        <rect x="0" y="3" width="8" height="2" fill="currentColor" />
        <rect x="3" y="7" width="2" height="1" fill="currentColor" />
        <rect x="0" y="1" width="1" height="2" fill="currentColor" opacity="0.5" />
        <rect x="7" y="1" width="1" height="2" fill="currentColor" opacity="0.5" />
        <rect x="0" y="5" width="1" height="2" fill="currentColor" opacity="0.5" />
        <rect x="7" y="5" width="1" height="2" fill="currentColor" opacity="0.5" />
      </svg>
    );
  }
  if (icon === 'cloud') {
    return (
      <svg width={size} height={size} viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
        <rect x="1" y="2" width="6" height="4" fill="currentColor" />
        <rect x="2" y="1" width="4" height="2" fill="currentColor" />
      </svg>
    );
  }
  if (icon === 'rain') {
    return (
      <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
        <rect x="1" y="0" width="6" height="4" fill="currentColor" opacity="0.3" />
        <rect x="2" y="1" width="4" height="2" fill="currentColor" opacity="0.4" />
        <rect x="1" y="5" width="1" height="2" fill="currentColor" />
        <rect x="3" y="5" width="1" height="2" fill="currentColor" />
        <rect x="5" y="5" width="1" height="2" fill="currentColor" />
      </svg>
    );
  }
  if (icon === 'storm') {
    return (
      <svg width={size} height={size} viewBox="0 0 8 8" className="text-purple-400" shapeRendering="crispEdges">
        <rect x="1" y="0" width="6" height="4" fill="currentColor" opacity="0.3" />
        <rect x="2" y="1" width="4" height="2" fill="currentColor" opacity="0.4" />
        <rect x="2" y="4" width="1" height="3" fill="currentColor" opacity="0.5" />
        <rect x="4" y="3" width="2" height="2" fill="currentColor" opacity="0.7" />
      </svg>
    );
  }
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WeatherPage() {
  const [time, setTime] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Singapore',
    }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const aqiColor = (v: number) => v <= 50 ? 'text-green-600' : v <= 100 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="max-w-6xl space-y-5">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 text-white text-[10px] font-mono px-2 py-1 rounded">
            WEATHER v1.0
          </div>
          <div className="text-xs font-mono text-gray-400">
            <span className="uppercase">Singapore</span> · Haze · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="text-gray-400">
            <span className="text-[9px] uppercase text-gray-300">SGT</span>{' '}
            <span className="text-gray-700">{time}</span>
          </div>
        </div>
      </div>

      {/* Main hero card */}
      <div className="grid grid-cols-3 gap-4">
        {/* Current conditions — hero */}
        <div className="bg-gray-900 text-white rounded-lg p-6 col-span-1 flex flex-col items-center justify-center">
          <div className="relative">
            <svg width="64" height="64" viewBox="0 0 16 16" className="text-yellow-400" shapeRendering="crispEdges">
              <rect x="7" y="1" width="2" height="2" fill="currentColor" />
              <rect x="5" y="3" width="6" height="1" fill="currentColor" />
              <rect x="2" y="4" width="12" height="6" fill="currentColor" opacity="0.15" />
              <rect x="0" y="5" width="2" height="4" fill="currentColor" opacity="0.3" />
              <rect x="14" y="5" width="2" height="4" fill="currentColor" opacity="0.3" />
              <rect x="4" y="4" width="3" height="3" fill="currentColor" opacity="0.3" />
              <rect x="9" y="4" width="3" height="3" fill="currentColor" opacity="0.3" />
              <rect x="5" y="11" width="3" height="4" fill="currentColor" opacity="0.5" />
              <rect x="8" y="11" width="3" height="4" fill="currentColor" opacity="0.4" />
            </svg>
          </div>
          <div className="mt-3 text-5xl font-bold font-mono leading-none">28°</div>
          <div className="text-[11px] text-gray-400 mt-1">Feels like 31°C</div>
          <div className="mt-3 text-[10px] text-gray-500 text-center">Haze · Wind 12 km/h</div>
          <div className="mt-1 text-[10px] text-gray-500">UV 7 · Humidity 78%</div>
        </div>

        {/* Hourly forecast strip */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <svg width="14" height="14" viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
              <rect x="3" y="0" width="2" height="1" fill="currentColor" />
              <rect x="0" y="3" width="8" height="2" fill="currentColor" />
            </svg>
            <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Hourly Forecast</h2>
          </div>
          <div className="px-4 py-3 flex gap-4 overflow-x-auto">
            {hourlyData.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 shrink-0 w-12">
                <span className="text-[9px] font-mono text-gray-500">{h.hour}</span>
                <div className="w-6 h-6 flex items-center justify-center">
                  {getWeatherIcon(h.icon, 20)}
                </div>
                <span className="text-[11px] font-mono font-bold text-gray-900">{h.temp}°</span>
                {h.rain > 0 && (
                  <div className="flex items-center gap-0.5">
                    <PixelRainDrop size={6} />
                    <span className="text-[8px] text-blue-400">{h.rain}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5-Day + Air Quality row */}
      <div className="grid grid-cols-2 gap-4">
        {/* 5-day forecast */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <svg width="14" height="14" viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
              <rect x="0" y="2" width="8" height="1" fill="currentColor" />
              <rect x="0" y="5" width="8" height="1" fill="currentColor" />
            </svg>
            <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">5-Day Outlook</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {fiveDay.map((d, i) => {
              const weatherColors: Record<string, string> = {
                sun: 'text-yellow-400',
                cloud: 'text-gray-400',
                rain: 'text-blue-400',
                storm: 'text-purple-400',
              };
              return (
                <div key={i} className="px-4 py-2.5 flex items-center gap-3">
                  <span className="text-[11px] font-mono font-medium text-gray-600 w-8">{d.day}</span>
                  <div className="w-5 h-5 flex items-center justify-center">
                    {getWeatherIcon(d.weather as HourlyForecast['icon'], 16)}
                  </div>
                  <div className="flex items-center gap-1 flex-1">
                    {/* Rain bar */}
                    <div className="flex flex-col-reverse gap-px h-4 w-16">
                      <div className={`w-full rounded-sm ${d.rain > 70 ? 'bg-blue-400' : d.rain > 30 ? 'bg-blue-300' : 'bg-blue-100'}`}
                        style={{ height: `${Math.max(4, d.rain / 100 * 16)}px` }} />
                    </div>
                    <span className="text-[9px] text-blue-400 w-8">{d.rain}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-red-500">{d.high}°</span>
                    <span className="text-[11px] font-mono text-blue-400">{d.low}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Air quality */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <svg width="14" height="14" viewBox="0 0 8 8" className="text-green-400" shapeRendering="crispEdges">
              <rect x="3" y="0" width="2" height="8" fill="currentColor" />
              <rect x="1" y="2" width="6" height="2" fill="currentColor" />
            </svg>
            <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Air Quality & Indices</h2>
          </div>
          <div className="px-4 py-3 grid grid-cols-2 gap-3">
            {aqiReadings.map(a => (
              <div key={a.label} className="border border-gray-100 rounded-lg px-3 py-2.5">
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">{a.label}</p>
                <p className={`text-xl font-bold font-mono mt-0.5 ${aqiColor(a.value)}`}>{a.value}</p>
                <p className="text-[10px] text-gray-500">{a.desc}</p>
                {/* Mini gauge */}
                <div className="mt-1.5 flex flex-col-reverse gap-px" style={{ height: 6 }}>
                  {Array.from({ length: 10 }, (_, r) => {
                    const threshold = a.label === 'PSI' ? 50 : a.label === 'PM2.5' ? 25 : a.label === 'Humidity' ? 60 : 6;
                    const level = (a.value / threshold) * 10;
                    return (
                      <div
                        key={r}
                        className={`w-full rounded-sm ${r < level ? (r < 5 ? 'bg-green-400' : 'bg-yellow-400') : 'bg-gray-100'}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commute cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Morning */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <svg width="14" height="14" viewBox="0 0 8 8" className="text-orange-400" shapeRendering="crispEdges">
              <rect x="3" y="0" width="2" height="1" fill="currentColor" />
              <rect x="3" y="7" width="2" height="1" fill="currentColor" />
              <rect x="0" y="3" width="1" height="2" fill="currentColor" />
              <rect x="7" y="3" width="1" height="2" fill="currentColor" />
              <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
              <rect x="6" y="1" width="1" height="1" fill="currentColor" opacity="0.5" />
              <rect x="1" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
              <rect x="6" y="6" width="1" height="1" fill="currentColor" opacity="0.5" />
            </svg>
            <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Morning Commute</h2>
            <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded border font-medium ${
              morningCommute.status === 'clear' ? 'bg-green-50 text-green-700 border-green-200' :
              morningCommute.status === 'moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
              'bg-red-50 text-red-600 border-red-200'
            }`}>
              {morningCommute.status}
            </span>
          </div>
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="text-center shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-[9px] text-gray-500 font-mono">HOME</span>
                </div>
                <div className="w-px h-4 bg-gray-200 mx-auto my-1" />
                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                  <span className="text-[9px] text-white font-mono">WORK</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">{morningCommute.from}</span>
                  <span className="text-[10px] font-mono text-gray-500">→</span>
                  <span className="text-[10px] text-gray-500">{morningCommute.to}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-4 text-[11px]">
                  <div>
                    <span className="text-[9px] text-gray-400 block">Duration</span>
                    <span className="font-mono font-bold text-gray-900">{morningCommute.duration}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block">Distance</span>
                    <span className="font-mono text-gray-700">{morningCommute.distance}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block">ETA arrival</span>
                    <span className="font-mono font-bold text-gray-900">{morningCommute.eta}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Route */}
            <div className="bg-gray-50 rounded px-3 py-2">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Route</p>
              <p className="text-[11px] font-mono text-gray-700">{morningCommute.route}</p>
            </div>
            {/* Traffic bar */}
            <div>
              <div className="flex justify-between text-[9px] text-gray-400 mb-1">
                <span>Traffic density</span>
                <span>{morningCommute.status === 'moderate' ? '2/5' : morningCommute.status === 'clear' ? '1/5' : '4/5'}</span>
              </div>
              <div className="flex flex-col-reverse gap-px" style={{ height: 8 }}>
                {Array.from({ length: 5 }, (_, r) => (
                  <div
                    key={r}
                    className={`w-full rounded-sm ${
                      r < 2
                        ? 'bg-green-400'
                        : r < 4
                        ? 'bg-yellow-400'
                        : 'bg-red-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Evening */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2"
            style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}>
            <svg width="14" height="14" viewBox="0 0 8 8" className="text-indigo-400" shapeRendering="crispEdges">
              <rect x="3" y="0" width="2" height="2" fill="currentColor" />
              <rect x="2" y="3" width="4" height="3" fill="currentColor" opacity="0.3" />
              <rect x="1" y="4" width="1" height="1" fill="currentColor" opacity="0.5" />
              <rect x="6" y="4" width="1" height="1" fill="currentColor" opacity="0.5" />
              <rect x="3" y="5" width="2" height="2" fill="currentColor" opacity="0.2" />
            </svg>
            <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Evening Commute</h2>
            <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded border font-medium ${
              eveningCommute.status === 'clear' ? 'bg-green-50 text-green-700 border-green-200' :
              eveningCommute.status === 'moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
              'bg-red-50 text-red-600 border-red-200'
            }`}>
              {eveningCommute.status}
            </span>
          </div>
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="text-center shrink-0">
                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                  <span className="text-[9px] text-white font-mono">WORK</span>
                </div>
                <div className="w-px h-4 bg-gray-200 mx-auto my-1" />
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-[9px] text-gray-500 font-mono">HOME</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">{eveningCommute.from}</span>
                  <span className="text-[10px] font-mono text-gray-500">→</span>
                  <span className="text-[10px] text-gray-500">{eveningCommute.to}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-4 text-[11px]">
                  <div>
                    <span className="text-[9px] text-gray-400 block">Duration</span>
                    <span className="font-mono font-bold text-gray-900">{eveningCommute.duration}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block">Distance</span>
                    <span className="font-mono text-gray-700">{eveningCommute.distance}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block">ETA arrival</span>
                    <span className="font-mono font-bold text-gray-900">{eveningCommute.eta}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded px-3 py-2">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Route</p>
              <p className="text-[11px] font-mono text-gray-700">{eveningCommute.route}</p>
            </div>
            <div>
              <div className="flex justify-between text-[9px] text-gray-400 mb-1">
                <span>Traffic density</span>
                <span>{eveningCommute.status === 'clear' ? '1/5' : '2/5'}</span>
              </div>
              <div className="flex flex-col-reverse gap-px" style={{ height: 8 }}>
                {Array.from({ length: 5 }, (_, r) => (
                  <div
                    key={r}
                    className={`w-full rounded-sm ${r < 1 ? 'bg-green-400' : r < 3 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated pixel footer */}
      <div className="flex justify-center gap-1 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400"
            style={{ opacity: Math.sin(i * 0.6 + tick * 0.3) * 0.4 + 0.6 }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono">
        Mission Control · Weather & Commute · Screen 24 · Des_bot
      </p>
    </div>
  );
}