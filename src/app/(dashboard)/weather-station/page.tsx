'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PixelClock } from '@/lib/pixel-icons';

// ─── Pixel Art Weather Icons ─────────────────────────────────────────────────

function PixelSunny({ size = 48, phase = 0 }: { size?: number; phase?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="text-yellow-400" shapeRendering="crispEdges">
      {/* Core */}
      <rect x="6" y="6" width="4" height="4" fill="currentColor" />
      <rect x="5" y="5" width="6" height="6" fill="currentColor" opacity="0.6" />
      <rect x="4" y="4" width="8" height="8" fill="currentColor" opacity="0.3" />
      {/* Rays with phase animation */}
      <rect x="7" y="1" width="2" height="2" fill="currentColor" opacity={0.5 + Math.sin(phase) * 0.3} />
      <rect x="7" y="13" width="2" height="2" fill="currentColor" opacity={0.5 + Math.sin(phase + 1) * 0.3} />
      <rect x="1" y="7" width="2" height="2" fill="currentColor" opacity={0.5 + Math.sin(phase + 2) * 0.3} />
      <rect x="13" y="7" width="2" height="2" fill="currentColor" opacity={0.5 + Math.sin(phase + 3) * 0.3} />
      <rect x="3" y="3" width="2" height="2" fill="currentColor" opacity={0.4 + Math.sin(phase + 4) * 0.2} />
      <rect x="11" y="3" width="2" height="2" fill="currentColor" opacity={0.4 + Math.sin(phase + 5) * 0.2} />
      <rect x="3" y="11" width="2" height="2" fill="currentColor" opacity={0.4 + Math.sin(phase + 6) * 0.2} />
      <rect x="11" y="11" width="2" height="2" fill="currentColor" opacity={0.4 + Math.sin(phase + 7) * 0.2} />
    </svg>
  );
}

function PixelCloudy({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="text-gray-300" shapeRendering="crispEdges">
      {/* Cloud shape */}
      <rect x="2" y="8" width="12" height="4" fill="currentColor" opacity="0.9" />
      <rect x="4" y="6" width="8" height="4" fill="currentColor" opacity="0.9" />
      <rect x="6" y="4" width="4" height="4" fill="currentColor" />
      <rect x="1" y="9" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="13" y="9" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="5" width="2" height="2" fill="currentColor" opacity="0.5" />
      <rect x="10" y="5" width="2" height="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function PixelRainy({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
      {/* Cloud */}
      <rect x="2" y="4" width="12" height="4" fill="#94a3b8" opacity="0.9" />
      <rect x="4" y="2" width="8" height="4" fill="#94a3b8" />
      <rect x="6" y="1" width="4" height="3" fill="#94a3b8" opacity="0.6" />
      <rect x="3" y="3" width="2" height="2" fill="#94a3b8" opacity="0.5" />
      <rect x="10" y="3" width="2" height="2" fill="#94a3b8" opacity="0.5" />
      {/* Rain drops */}
      <rect x="3" y="9" width="1" height="2" fill="#60a5fa" opacity="0.7" />
      <rect x="6" y="10" width="1" height="3" fill="#60a5fa" opacity="0.6" />
      <rect x="9" y="9" width="1" height="2" fill="#60a5fa" opacity="0.8" />
      <rect x="12" y="10" width="1" height="2" fill="#60a5fa" opacity="0.5" />
      <rect x="4" y="13" width="1" height="2" fill="#60a5fa" opacity="0.4" />
      <rect x="8" y="13" width="1" height="2" fill="#60a5fa" opacity="0.5" />
    </svg>
  );
}

function PixelStormy({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
      {/* Dark cloud */}
      <rect x="2" y="4" width="12" height="4" fill="#64748b" opacity="0.9" />
      <rect x="4" y="2" width="8" height="4" fill="#64748b" />
      <rect x="6" y="1" width="4" height="3" fill="#475569" />
      <rect x="1" y="5" width="2" height="2" fill="#475569" opacity="0.6" />
      <rect x="13" y="5" width="2" height="2" fill="#475569" opacity="0.6" />
      {/* Lightning bolt */}
      <rect x="7" y="7" width="2" height="2" fill="#fbbf24" />
      <rect x="6" y="9" width="2" height="2" fill="#fbbf24" opacity="0.8" />
      <rect x="8" y="9" width="2" height="2" fill="#fbbf24" opacity="0.8" />
      <rect x="6" y="11" width="2" height="2" fill="#f59e0b" />
      <rect x="7" y="11" width="1" height="1" fill="#fbbf24" />
      {/* Rain */}
      <rect x="3" y="9" width="1" height="2" fill="#60a5fa" opacity="0.5" />
      <rect x="11" y="9" width="1" height="2" fill="#60a5fa" opacity="0.5" />
      <rect x="2" y="12" width="1" height="2" fill="#60a5fa" opacity="0.3" />
      <rect x="12" y="12" width="1" height="2" fill="#60a5fa" opacity="0.3" />
    </svg>
  );
}

function PixelSnowy({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
      {/* Cloud */}
      <rect x="2" y="4" width="12" height="4" fill="#cbd5e1" opacity="0.9" />
      <rect x="4" y="2" width="8" height="4" fill="#cbd5e1" />
      <rect x="6" y="1" width="4" height="3" fill="#e2e8f0" opacity="0.6" />
      <rect x="3" y="3" width="2" height="2" fill="#e2e8f0" opacity="0.5" />
      {/* Snowflakes */}
      <rect x="4" y="9" width="1" height="1" fill="#bae6fd" />
      <rect x="4" y="10" width="1" height="1" fill="#e0f2fe" opacity="0.7" />
      <rect x="7" y="10" width="1" height="1" fill="#bae6fd" />
      <rect x="7" y="11" width="1" height="1" fill="#e0f2fe" opacity="0.7" />
      <rect x="10" y="9" width="1" height="1" fill="#bae6fd" />
      <rect x="10" y="10" width="1" height="1" fill="#e0f2fe" opacity="0.7" />
      <rect x="5" y="13" width="1" height="1" fill="#e0f2fe" opacity="0.5" />
      <rect x="9" y="13" width="1" height="1" fill="#e0f2fe" opacity="0.5" />
      <rect x="6" y="14" width="1" height="1" fill="#bae6fd" opacity="0.6" />
    </svg>
  );
}

function PixelNightClear({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="text-indigo-300" shapeRendering="crispEdges">
      {/* Moon */}
      <rect x="4" y="3" width="8" height="8" fill="currentColor" opacity="0.3" />
      <rect x="5" y="4" width="6" height="6" fill="currentColor" opacity="0.5" />
      <rect x="6" y="5" width="4" height="4" fill="currentColor" />
      <rect x="12" y="2" width="1" height="1" fill="currentColor" opacity="0.5" />
      <rect x="13" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="11" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="14" y="6" width="1" height="1" fill="currentColor" opacity="0.2" />
      {/* Stars */}
      <rect x="1" y="2" width="1" height="1" fill="white" opacity="0.6" />
      <rect x="2" y="6" width="1" height="1" fill="white" opacity="0.4" />
    </svg>
  );
}

function PixelPartlyCloudy({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
      {/* Sun behind */}
      <rect x="0" y="0" width="4" height="4" fill="#fbbf24" opacity="0.2" />
      <rect x="1" y="1" width="2" height="2" fill="#fbbf24" opacity="0.4" />
      <rect x="2" y="2" width="2" height="2" fill="#fcd34d" opacity="0.5" />
      {/* Cloud in front */}
      <rect x="5" y="6" width="9" height="4" fill="#94a3b8" opacity="0.85" />
      <rect x="7" y="4" width="6" height="4" fill="#94a3b8" />
      <rect x="9" y="3" width="3" height="3" fill="#94a3b8" opacity="0.6" />
      <rect x="4" y="7" width="2" height="2" fill="#94a3b8" opacity="0.5" />
      <rect x="13" y="7" width="2" height="2" fill="#94a3b8" opacity="0.5" />
    </svg>
  );
}

function PixelThermometer({ temp = 28, size = 80 }: { temp?: number; size?: number }) {
  const pct = Math.min(100, Math.max(0, ((temp - 10) / 30) * 100));
  const filled = Math.round((pct / 100) * 50);
  const color = temp >= 32 ? '#ef4444' : temp >= 25 ? '#f97316' : temp >= 18 ? '#22c55e' : temp >= 10 ? '#3b82f6' : '#6366f1';

  return (
    <svg width={size} height={size} viewBox="0 0 16 32" shapeRendering="crispEdges">
      {/* Tube */}
      <rect x="6" y="2" width="4" height="24" fill="#e2e8f0" opacity="0.5" rx="2" />
      {/* Mercury column */}
      <rect x="7" y={26 - filled} width="2" height={filled} fill={color} />
      {/* Bulb */}
      <rect x="5" y="26" width="6" height="6" fill={color} opacity="0.8" />
      <rect x="6" y="27" width="4" height="4" fill={color} />
      {/* Tick marks */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x="11" y={6 + i * 4} width="2" height="1" fill="#94a3b8" opacity="0.5" />
      ))}
    </svg>
  );
}

function PixelDrop({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.5" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" opacity="0.7" />
      <rect x="2" y="4" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="2" height="2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

// ─── Animated Weather Effects ────────────────────────────────────────────────

function RainEffect({ intensity = 1 }: { intensity?: number }) {
  const drops = Array.from({ length: 20 * intensity }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.5 + Math.random() * 0.5,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {drops.map(d => (
        <div
          key={d.id}
          className="absolute text-blue-300"
          style={{
            left: `${d.x}%`,
            top: 0,
            animation: `rainDrop ${d.duration}s linear ${d.delay}s infinite`,
          }}
        >
          <div className="w-px" style={{ height: d.size, background: 'linear-gradient(to bottom, transparent, #93c5fd)', opacity: 0.6 }} />
        </div>
      ))}
      <style>{`
        @keyframes rainDrop {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(200px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function SnowEffect({ intensity = 1 }: { intensity?: number }) {
  const flakes = Array.from({ length: 15 * intensity }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    size: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {flakes.map(f => (
        <div
          key={f.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${f.x}%`,
            top: -10,
            width: f.size,
            height: f.size,
            animation: `snowFall ${f.duration}s linear ${f.delay}s infinite`,
            opacity: 0.5 + Math.random() * 0.5,
          }}
        />
      ))}
      <style>{`
        @keyframes snowFall {
          0% { transform: translateY(-10px) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(200px) translateX(20px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type WeatherCondition = 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'night-clear';

interface HourlyForecast {
  time: string;
  temp: number;
  condition: WeatherCondition;
  rain: number; // probability %
}

interface DailyForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  rain: number;
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

const location = { city: 'Singapore', area: 'Punggol Northshore', timezone: 'Asia/Singapore' };

const currentWeather = {
  temp: 31,
  feelsLike: 35,
  humidity: 78,
  wind: 12,
  uv: 8, // Very High
  visibility: 8, // km
  pressure: 1012, // hPa
  condition: 'partly-cloudy' as WeatherCondition,
  aqi: 42, // Good
  description: 'Partly Cloudy',
};

const hourlyForecast: HourlyForecast[] = [
  { time: '12PM', temp: 31, condition: 'partly-cloudy', rain: 10 },
  { time: '1PM', temp: 32, condition: 'sunny', rain: 5 },
  { time: '2PM', temp: 32, condition: 'sunny', rain: 5 },
  { time: '3PM', temp: 31, condition: 'partly-cloudy', rain: 15 },
  { time: '4PM', temp: 30, condition: 'rainy', rain: 60 },
  { time: '5PM', temp: 29, condition: 'rainy', rain: 75 },
  { time: '6PM', temp: 28, condition: 'rainy', rain: 65 },
  { time: '7PM', temp: 27, condition: 'cloudy', rain: 30 },
  { time: '8PM', temp: 27, condition: 'night-clear', rain: 20 },
  { time: '9PM', temp: 26, condition: 'night-clear', rain: 10 },
  { time: '10PM', temp: 26, condition: 'night-clear', rain: 5 },
  { time: '11PM', temp: 25, condition: 'night-clear', rain: 5 },
];

const dailyForecast: DailyForecast[] = [
  { day: 'Thu', date: 'Jun 25', high: 32, low: 25, condition: 'rainy', rain: 80 },
  { day: 'Fri', date: 'Jun 26', high: 31, low: 24, condition: 'rainy', rain: 70 },
  { day: 'Sat', date: 'Jun 27', high: 30, low: 24, condition: 'stormy', rain: 90 },
  { day: 'Sun', date: 'Jun 28', high: 29, low: 23, condition: 'rainy', rain: 75 },
  { day: 'Mon', date: 'Jun 29', high: 31, low: 25, condition: 'partly-cloudy', rain: 30 },
  { day: 'Tue', date: 'Jun 30', high: 32, low: 25, condition: 'sunny', rain: 10 },
  { day: 'Wed', date: 'Jul 1', high: 33, low: 26, condition: 'sunny', rain: 5 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function WeatherIcon({ condition, size = 48 }: { condition: WeatherCondition; size?: number }) {
  switch (condition) {
    case 'sunny': return <PixelSunny size={size} />;
    case 'partly-cloudy': return <PixelPartlyCloudy size={size} />;
    case 'cloudy': return <PixelCloudy size={size} />;
    case 'rainy': return <PixelRainy size={size} />;
    case 'stormy': return <PixelStormy size={size} />;
    case 'snowy': return <PixelSnowy size={size} />;
    case 'night-clear': return <PixelNightClear size={size} />;
  }
}

function ConditionLabel({ condition }: { condition: WeatherCondition }) {
  const labels: Record<WeatherCondition, string> = {
    'sunny': '☀️ Sunny',
    'partly-cloudy': '⛅ Partly Cloudy',
    'cloudy': '☁️ Cloudy',
    'rainy': '🌧️ Rainy',
    'stormy': '⛈️ Thunderstorm',
    'snowy': '❄️ Snowy',
    'night-clear': '🌙 Clear Night',
  };
  return <span>{labels[condition]}</span>;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WeatherStationPage() {
  const [time, setTime] = useState('');
  const [sunPhase, setSunPhase] = useState(0);
  const [animatedRain, setAnimatedRain] = useState(false);
  const [animatedSnow, setAnimatedSnow] = useState(false);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'Asia/Singapore',
      }));
      setSunPhase(Date.now() / 1000);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentWeather.condition === 'rainy' || currentWeather.condition === 'stormy') {
      setAnimatedRain(true);
    } else if (currentWeather.condition === 'snowy') {
      setAnimatedSnow(true);
    }
  }, []);

  const condition = currentWeather.condition;
  const cardBgClass = condition === 'sunny' ? 'from-amber-50 to-orange-50' :
    condition === 'rainy' || condition === 'stormy' ? 'from-slate-100 to-blue-50' :
    condition === 'night-clear' ? 'from-indigo-950 to-slate-900' :
    'from-slate-50 to-gray-50';

  return (
    <div className="max-w-6xl space-y-5">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.4)); }
          50% { filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.8)); }
        }
        .float-anim { animation: float 3s ease-in-out infinite; }
        .glow-anim { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
              <svg width={20} height={20} viewBox="0 0 8 8" className="text-white" shapeRendering="crispEdges">
                <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.6" />
                <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.6" />
                <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.6" />
                <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.6" />
                <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.3" />
                <rect x="6" y="1" width="1" height="1" fill="currentColor" opacity="0.3" />
                <rect x="2" y="2" width="4" height="4" fill="currentColor" />
              </svg>
            </div>
            {condition === 'sunny' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-60 glow-anim" />}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Weather Station</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {location.area}, {location.city}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-gray-100 px-2.5 py-1.5 rounded border border-gray-200">
            <PixelClock size={11} />
            <span>{time} SGT</span>
          </div>
        </div>
      </div>

      {/* ── Main Hero Card ─────────────────────────────────────────────── */}
      <div className={`relative bg-gradient-to-br ${cardBgClass} border border-gray-200 rounded-2xl overflow-hidden`}>
        {/* Animated weather effects */}
        {animatedRain && <RainEffect intensity={condition === 'stormy' ? 2 : 1} />}
        {animatedSnow && <SnowEffect />}

        <div className="relative px-6 py-6">
          <div className="flex items-start justify-between">
            {/* Left: Temp + Condition */}
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className={condition === 'sunny' ? 'float-anim' : ''}>
                  <WeatherIcon condition={condition} size={72} />
                </div>
                <div className="mt-1">
                  <div className="flex items-end gap-2">
                    <span className="text-6xl font-bold text-gray-900 font-mono leading-none">
                      {currentWeather.temp}°
                    </span>
                    <span className="text-lg text-gray-400 mb-2">C</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    <ConditionLabel condition={condition} />
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Feels like {currentWeather.feelsLike}°C · UV {currentWeather.uv} (Very High)
                  </p>
                </div>
              </div>

              {/* Key stats row */}
              <div className="flex items-center gap-5 mt-5">
                <div className="flex items-center gap-1.5">
                  <svg width={10} height={10} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
                    <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.3" />
                    <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.5" />
                    <rect x="1" y="2" width="6" height="2" fill="currentColor" opacity="0.7" />
                    <rect x="2" y="4" width="4" height="2" fill="currentColor" />
                    <rect x="3" y="6" width="2" height="2" fill="currentColor" opacity="0.8" />
                  </svg>
                  <span className="text-xs text-gray-600">{currentWeather.humidity}%</span>
                  <span className="text-[10px] text-gray-400">humidity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width={10} height={10} viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
                    <rect x="3" y="2" width="2" height="4" fill="currentColor" opacity="0.5" />
                    <rect x="1" y="4" width="6" height="2" fill="currentColor" />
                    <rect x="2" y="3" width="4" height="2" fill="currentColor" opacity="0.7" />
                  </svg>
                  <span className="text-xs text-gray-600">{currentWeather.wind} km/h</span>
                  <span className="text-[10px] text-gray-400">wind</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width={10} height={10} viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
                    <rect x="1" y="2" width="6" height="5" fill="currentColor" opacity="0.1" />
                    <rect x="2" y="3" width="4" height="3" fill="currentColor" opacity="0.2" />
                    <rect x="3" y="4" width="2" height="2" fill="currentColor" opacity="0.4" />
                    <rect x="2" y="0" width="4" height="2" fill="currentColor" opacity="0.3" />
                  </svg>
                  <span className="text-xs text-gray-600">{currentWeather.visibility} km</span>
                  <span className="text-[10px] text-gray-400">visibility</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width={10} height={10} viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
                    <rect x="2" y="1" width="4" height="6" fill="currentColor" opacity="0.1" />
                    <rect x="3" y="2" width="2" height="5" fill="currentColor" opacity="0.2" />
                    <rect x="4" y="0" width="1" height="3" fill="currentColor" opacity="0.4" />
                  </svg>
                  <span className="text-xs text-gray-600">{currentWeather.pressure} hPa</span>
                  <span className="text-[10px] text-gray-400">pressure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                    currentWeather.aqi <= 50 ? 'bg-green-100 text-green-600' :
                    currentWeather.aqi <= 100 ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {currentWeather.aqi}
                  </div>
                  <span className="text-[10px] text-gray-400">AQI</span>
                </div>
              </div>
            </div>

            {/* Right: Thermometer */}
            <div className="hidden lg:flex flex-col items-center gap-1">
              <PixelThermometer temp={currentWeather.temp} size={80} />
              <span className="text-[9px] text-gray-400 font-mono">TEMP</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hourly Forecast ─────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div
          className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
        >
          <svg width={12} height={12} viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
            <rect x="0" y="3" width="8" height="2" fill="currentColor" opacity="0.3" />
            <rect x="1" y="0" width="2" height="2" fill="currentColor" opacity="0.5" />
            <rect x="5" y="0" width="2" height="2" fill="currentColor" opacity="0.5" />
            <rect x="1" y="6" width="2" height="2" fill="currentColor" opacity="0.5" />
            <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.5" />
          </svg>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hourly Forecast</h2>
        </div>
        <div className="px-5 py-4 overflow-x-auto">
          <div className="flex gap-4">
            {hourlyForecast.map((h, i) => (
              <div key={i} className={`flex flex-col items-center gap-1.5 shrink-0 w-14 rounded-lg p-2 transition-colors ${
                i === 0 ? 'bg-sky-50 border border-sky-200' : 'hover:bg-gray-50'
              }`}>
                <span className={`text-[10px] font-medium ${i === 0 ? 'text-sky-600' : 'text-gray-500'}`}>
                  {h.time}
                </span>
                <WeatherIcon condition={h.condition} size={28} />
                <span className="text-sm font-bold text-gray-800 font-mono">{h.temp}°</span>
                {h.rain > 20 && (
                  <div className="flex items-center gap-0.5">
                    <PixelDrop size={6} />
                    <span className="text-[9px] text-blue-400">{h.rain}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7-Day Forecast ───────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div
          className="px-5 py-3 border-b border-gray-100 flex items-center gap-2"
          style={{ backgroundImage: 'linear-gradient(90deg, transparent 7px, rgba(0,0,0,0.015) 1px)', backgroundSize: '8px 100%' }}
        >
          <svg width={12} height={12} viewBox="0 0 8 8" className="text-gray-400" shapeRendering="crispEdges">
            <rect x="0" y="1" width="8" height="7" fill="currentColor" opacity="0.1" />
            <rect x="0" y="1" width="8" height="2" fill="currentColor" opacity="0.3" />
            <rect x="1" y="0" width="1" height="3" fill="currentColor" opacity="0.2" />
            <rect x="6" y="0" width="1" height="3" fill="currentColor" opacity="0.2" />
            <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity="0.3" />
            <rect x="4" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
          </svg>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">7-Day Forecast</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {dailyForecast.map((d, i) => (
            <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
              <div className="w-10 shrink-0">
                <p className={`text-xs font-semibold ${i === 0 ? 'text-sky-600' : 'text-gray-700'}`}>{d.day}</p>
                <p className="text-[9px] text-gray-400">{d.date}</p>
              </div>
              <div className="flex items-center gap-1">
                <WeatherIcon condition={d.condition} size={28} />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <PixelDrop size={6} />
                <span className="text-[10px] text-blue-400 font-medium">{d.rain}%</span>
              </div>
              <div className="flex-1 flex items-center gap-2 justify-end">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-red-500 font-mono w-6 text-right">{d.high}°</span>
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                      style={{ width: `${((d.high - d.low) / 15) * 100}%`, marginLeft: `${((d.low - 20) / 15) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-blue-500 font-mono w-6">{d.low}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Weather Stats Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Dew Point', value: '27°C', sub: 'Muggy & humid', color: 'text-blue-500', icon: '💧' },
          { label: 'Wind Direction', value: 'SW', sub: 'Southwest 12 km/h', color: 'text-gray-600', icon: '🧭' },
          { label: 'Sunrise', value: '6:58 AM', sub: '↑ 6h 42m daylight', color: 'text-amber-500', icon: '🌅' },
          { label: 'Sunset', value: '7:12 PM', sub: 'Moon: Waxing Crescent', color: 'text-indigo-500', icon: '🌇' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px]">{stat.icon}</span>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">{stat.label}</p>
            </div>
            <p className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-center gap-1 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2"
            style={{
              backgroundColor: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6'][i % 4],
              borderRadius: i % 3 === 0 ? '50%' : '2px',
              opacity: Math.sin(i * 0.6) * 0.3 + 0.7,
            }}
          />
        ))}
      </div>

      <p className="text-center text-[9px] text-gray-300 font-mono tracking-widest uppercase">
        Des_bot · Nightly Build · Weather Station · Screen 62
      </p>
    </div>
  );
}