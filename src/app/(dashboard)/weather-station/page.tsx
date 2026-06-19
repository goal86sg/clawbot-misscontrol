'use client';

import React, { useState, useEffect } from 'react';
import { PixelSparkle } from '@/lib/pixel-icons';

// ─── Pixel Art Weather Icons ─────────────────────────────────────────────────

function PixelSun({ size = 32, animated = true }: { size?: number; animated?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-400" shapeRendering="crispEdges">
      {/* Core */}
      <rect x="3" y="2" width="2" height="2" fill="currentColor" />
      <rect x="2" y="3" width="4" height="1" fill="currentColor" />
      <rect x="3" y="4" width="2" height="1" fill="currentColor" opacity="0.7" />
      {/* Rays */}
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="3" y="7" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="3" width="1" height="2" fill="currentColor" />
      <rect x="7" y="3" width="1" height="2" fill="currentColor" opacity="0.5" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" opacity="0.6" />
      <rect x="1" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="6" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      {animated && (
        <>
          <style>{`.pixel-sun-ray { animation: sunPulse 2s ease-in-out infinite; } @keyframes sunPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
        </>
      )}
    </svg>
  );
}

function PixelCloud({ size = 32, rain = false }: { size?: number; rain?: boolean }) {
  return (
    <svg width={size} height={rain ? size + 4 : size} viewBox={rain ? "0 0 8 12" : "0 0 8 8"} className="text-gray-400" shapeRendering="crispEdges">
      {/* Cloud body */}
      <rect x="1" y="3" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="8" height="2" fill="currentColor" />
      <rect x="2" y="2" width="3" height="1" fill="currentColor" opacity="0.7" />
      <rect x="1" y="1" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="5" y="1" width="2" height="1" fill="currentColor" opacity="0.5" />
      {/* Rain drops */}
      {rain && (
        <>
          <rect x="1" y="7" width="1" height="2" fill="currentColor" opacity="0.4" />
          <rect x="3" y="8" width="1" height="2" fill="currentColor" opacity="0.3" />
          <rect x="5" y="7" width="1" height="2" fill="currentColor" opacity="0.4" />
          <rect x="2" y="10" width="1" height="2" fill="currentColor" opacity="0.2" />
          <rect x="4" y="9" width="1" height="2" fill="currentColor" opacity="0.2" />
        </>
      )}
    </svg>
  );
}

function PixelMoon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-indigo-300" shapeRendering="crispEdges">
      <rect x="2" y="1" width="5" height="5" fill="currentColor" opacity="0.2" />
      <rect x="3" y="2" width="4" height="4" fill="currentColor" opacity="0.3" />
      <rect x="4" y="3" width="3" height="3" fill="currentColor" opacity="0.5" />
      <rect x="5" y="4" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelSnowflake({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-cyan-300" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="8" fill="currentColor" opacity="0.6" />
      <rect x="0" y="3" width="8" height="2" fill="currentColor" opacity="0.6" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="6" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="6" y="6" width="1" height="1" fill="currentColor" opacity="0.4" />
      <rect x="4" y="4" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelStorm({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-gray-500" shapeRendering="crispEdges">
      {/* Cloud */}
      <rect x="1" y="2" width="6" height="2" fill="currentColor" opacity="0.5" />
      <rect x="0" y="3" width="8" height="2" fill="currentColor" opacity="0.6" />
      <rect x="2" y="1" width="3" height="1" fill="currentColor" opacity="0.4" />
      {/* Lightning bolt */}
      <rect x="4" y="0" width="2" height="1" fill="currentColor" />
      <rect x="3" y="1" width="2" height="1" fill="currentColor" opacity="0.7" />
      <rect x="4" y="2" width="2" height="1" fill="currentColor" />
      <rect x="2" y="3" width="2" height="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="4" width="2" height="1" fill="currentColor" />
      <rect x="2" y="5" width="1" height="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelUmbrella({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-pink-400" shapeRendering="crispEdges">
      <rect x="1" y="2" width="6" height="1" fill="currentColor" />
      <rect x="0" y="3" width="8" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="3" width="2" height="4" fill="currentColor" opacity="0.5" />
      <rect x="4" y="7" width="2" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelThermometer({ size = 16, fill = 0.6 }: { size?: number; fill?: number }) {
  const filledPixels = Math.round(fill * 7);
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-red-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" opacity="0.3" />
      <rect x="3" y="1" width="2" height="5" fill="currentColor" opacity="0.2" />
      <rect x="3" y={8 - filledPixels} width="2" height={filledPixels} fill="currentColor" opacity="0.8" />
      <rect x="2" y="7" width="4" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelWind({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-cyan-400" shapeRendering="crispEdges">
      <rect x="0" y="2" width="6" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="4" width="7" height="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="6" width="5" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelStar({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-yellow-400" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="4" height="1" fill="currentColor" />
      <rect x="1" y="2" width="6" height="2" fill="currentColor" />
      <rect x="0" y="4" width="8" height="2" fill="currentColor" />
      <rect x="1" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function PixelHeart({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-rose-400" shapeRendering="crispEdges">
      <rect x="1" y="1" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="5" y="1" width="2" height="2" fill="currentColor" opacity="0.4" />
      <rect x="0" y="2" width="8" height="2" fill="currentColor" opacity="0.5" />
      <rect x="1" y="4" width="6" height="2" fill="currentColor" opacity="0.7" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelLeaf({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-emerald-500" shapeRendering="crispEdges">
      <rect x="3" y="0" width="2" height="3" fill="currentColor" opacity="0.5" />
      <rect x="1" y="3" width="6" height="3" fill="currentColor" />
      <rect x="2" y="6" width="2" height="1" fill="currentColor" opacity="0.4" />
      <rect x="5" y="2" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelShirt({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-blue-400" shapeRendering="crispEdges">
      <rect x="2" y="1" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="2" width="6" height="4" fill="currentColor" opacity="0.5" />
      <rect x="0" y="2" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="7" y="2" width="1" height="2" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PixelCoat({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className="text-amber-700" shapeRendering="crispEdges">
      <rect x="2" y="0" width="4" height="1" fill="currentColor" opacity="0.4" />
      <rect x="1" y="1" width="6" height="5" fill="currentColor" opacity="0.5" />
      <rect x="0" y="1" width="1" height="3" fill="currentColor" opacity="0.3" />
      <rect x="7" y="1" width="1" height="3" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
      <rect x="5" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─── Animated Weather Background ─────────────────────────────────────────────

function WeatherBackground({ condition }: { condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'night' }) {
  const [drops, setDrops] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);
  const [snowflakes, setSnowflakes] = useState<{ id: number; x: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    if (condition === 'rainy' || condition === 'stormy') {
      const newDrops = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.5 + Math.random() * 0.5,
      }));
      setDrops(newDrops);
    } else if (condition === 'snowy') {
      const newSnow = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        size: 2 + Math.floor(Math.random() * 3),
      }));
      setSnowflakes(newSnow);
    } else {
      setDrops([]);
      setSnowflakes([]);
    }
  }, [condition]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
      {condition === 'sunny' && (
        <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10">
          <PixelSun size={96} />
        </div>
      )}
      {condition === 'rainy' || condition === 'stormy' ? (
        drops.map(drop => (
          <div
            key={drop.id}
            className="absolute w-0.5 bg-blue-300 rounded-full animate-fall"
            style={{
              left: `${drop.x}%`,
              top: '-10px',
              height: '12px',
              opacity: 0.4,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
              animationFillMode: 'forwards',
            }}
          />
        ))
      ) : null}
      {condition === 'snowy' ? (
        snowflakes.map(flake => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-cyan-200 animate-snow"
            style={{
              left: `${flake.x}%`,
              top: '-10px',
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: 0.6,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))
      ) : null}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 0.4; }
          80% { opacity: 0.4; }
          100% { transform: translateY(200px); opacity: 0; }
        }
        @keyframes snow {
          0% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50% { transform: translateY(100px) translateX(10px); opacity: 0.5; }
          100% { transform: translateY(200px) translateX(-5px); opacity: 0; }
        }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
        .animate-snow { animation-name: snow; animation-timing-function: linear; animation-iteration-count: infinite; }
      `}</style>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'partly-cloudy' | 'night';
type ClothingLevel = 'light' | 'moderate' | 'warm' | 'cold' | 'freezing';

interface DayForecast {
  day: string;
  date: string;
  condition: WeatherCondition;
  high: number;
  low: number;
  rainChance: number;
  mood?: 'great' | 'okay' | 'low';
}

interface ClothingSuggestion {
  level: ClothingLevel;
  label: string;
  items: React.ReactNode[];
  tip: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WeatherStationPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedUnit, setSelectedUnit] = useState<'C' | 'F'>('C');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Current weather (sample Singapore data)
  const current = {
    condition: 'partly-cloudy' as WeatherCondition,
    temp: 31,
    feelsLike: 35,
    humidity: 78,
    wind: 12,
    uv: 8,
    visibility: 10,
    pressure: 1012,
    dewPoint: 26,
    rainChance: 40,
  };

  const toF = (c: number) => Math.round(c * 9 / 5 + 32);
  const displayTemp = (c: number) => selectedUnit === 'C' ? `${c}°` : `${toF(c)}°`;

  const getWeatherIcon = (condition: WeatherCondition, size = 32) => {
    switch (condition) {
      case 'sunny': return <PixelSun size={size} />;
      case 'partly-cloudy': return (
        <div className="relative">
          <div className="absolute -top-1 -left-1 opacity-60"><PixelSun size={size * 0.7} /></div>
          <PixelCloud size={size} />
        </div>
      );
      case 'cloudy': return <PixelCloud size={size} />;
      case 'rainy': return <PixelCloud size={size} rain />;
      case 'stormy': return <PixelStorm size={size} />;
      case 'snowy': return <PixelSnowflake size={size} />;
      case 'night': return <PixelMoon size={size} />;
      default: return <PixelSun size={size} />;
    }
  };

  const getClothing = (temp: number, condition: WeatherCondition): ClothingSuggestion => {
    if (temp >= 32) return {
      level: 'light',
      label: '🥵 Hot & Humid',
      items: [<PixelShirt size={14} key="shirt" />, <PixelLeaf size={12} key="leaf" />],
      tip: 'Light breathable clothing, stay hydrated',
    };
    if (temp >= 27) return {
      level: 'moderate',
      label: '☀️ Warm',
      items: [<PixelShirt size={14} key="shirt" />],
      tip: 'Light layers, Sunglasses recommended',
    };
    if (temp >= 20) return {
      level: 'warm',
      label: '🌤️ Pleasant',
      items: [<PixelShirt size={14} key="shirt" />, <PixelCoat size={14} key="coat" />],
      tip: 'Layer up — slight breeze expected',
    };
    if (temp >= 10) return {
      level: 'cold',
      label: '❄️ Chilly',
      items: [<PixelCoat size={14} key="coat" />],
      tip: 'Jacket needed, warm layers',
    };
    return {
      level: 'freezing',
      label: '🥶 Freezing',
      items: [<PixelCoat size={14} key="coat" />],
      tip: 'Heavy winter gear, limit outdoor time',
    };
  };

  const forecasts: DayForecast[] = [
    { day: 'Today', date: 'Jun 19', condition: 'partly-cloudy', high: 31, low: 26, rainChance: 40, mood: 'great' },
    { day: 'Sat', date: 'Jun 20', condition: 'rainy', high: 29, low: 25, rainChance: 85, mood: 'okay' },
    { day: 'Sun', date: 'Jun 21', condition: 'cloudy', high: 30, low: 26, rainChance: 60, mood: 'okay' },
    { day: 'Mon', date: 'Jun 22', condition: 'sunny', high: 32, low: 27, rainChance: 20, mood: 'great' },
    { day: 'Tue', date: 'Jun 23', condition: 'sunny', high: 33, low: 27, rainChance: 10, mood: 'great' },
    { day: 'Wed', date: 'Jun 24', condition: 'partly-cloudy', high: 31, low: 26, rainChance: 35, mood: 'okay' },
    { day: 'Thu', date: 'Jun 25', condition: 'stormy', high: 28, low: 24, rainChance: 90, mood: 'low' },
    { day: 'Fri', date: 'Jun 26', condition: 'night', high: 25, low: 23, rainChance: 15, mood: 'great' },
  ];

  const clothing = getClothing(current.temp, current.condition);
  const hourlyTemps = [31, 31, 30, 29, 29, 30, 31, 32, 33, 33, 32, 31, 30, 30, 29, 29, 30, 31, 31, 30, 30, 30, 30, 30];

  const uvLabel = current.uv >= 8 ? 'Very High' : current.uv >= 6 ? 'High' : current.uv >= 3 ? 'Moderate' : 'Low';
  const uvColor = current.uv >= 8 ? 'text-red-500' : current.uv >= 6 ? 'text-orange-500' : current.uv >= 3 ? 'text-yellow-500' : 'text-green-500';

  const isGoodWeatherDay = (fc: DayForecast) => fc.rainChance < 50 && fc.condition !== 'stormy';

  return (
    <div className="max-w-5xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getWeatherIcon(current.condition, 32)}
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Weather Station</h1>
            <p className="text-xs text-gray-500 mt-0.5">Singapore · {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {(['C', 'F'] as const).map(unit => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-all ${
                  selectedUnit === unit ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                °{unit}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-mono text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-lg">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} SGT
          </div>
        </div>
      </div>

      {/* Main Weather Hero */}
      <div className="relative bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-blue-100 rounded-xl overflow-hidden">
        <WeatherBackground condition={current.condition === 'partly-cloudy' ? 'sunny' : current.condition === 'night' ? 'night' : current.condition} />
        <div className="relative z-10 p-6 flex items-center gap-6">
          {/* Big temp */}
          <div className="flex items-end gap-2">
            <span className="text-6xl font-bold text-gray-900 leading-none">{displayTemp(current.temp)}</span>
            <div className="mb-2 space-y-0.5">
              <p className="text-sm text-gray-500">Feels like {displayTemp(current.feelsLike)}</p>
              <p className="text-xs text-blue-500 capitalize">{current.condition.replace('-', ' ')}</p>
            </div>
          </div>

          {/* Big icon */}
          <div className="ml-auto">
            <div className="w-24 h-24 flex items-center justify-center">
              {getWeatherIcon(current.condition, 80)}
            </div>
          </div>
        </div>

        {/* Weather details strip */}
        <div className="relative z-10 grid grid-cols-6 gap-4 px-6 pb-5">
          {[
            { icon: <PixelThermometer size={14} />, label: 'Humidity', value: `${current.humidity}%`, color: 'text-blue-500' },
            { icon: <PixelWind size={14} />, label: 'Wind', value: `${current.wind} km/h`, color: 'text-cyan-500' },
            { icon: <PixelSun size={14} />, label: 'UV Index', value: `${current.uv} ${uvLabel}`, color: uvColor },
            { icon: <PixelSparkle size={14} />, label: 'Visibility', value: `${current.visibility} km`, color: 'text-teal-500' },
            { icon: <PixelThermometer size={14} fill={0.8} />, label: 'Pressure', value: `${current.pressure} hPa`, color: 'text-indigo-500' },
            { icon: <PixelThermometer size={14} fill={0.5} />, label: 'Dew Point', value: `${current.dewPoint}°`, color: 'text-violet-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/40">
              <div className={item.color}>{item.icon}</div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-xs font-semibold text-gray-700">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Temperature + Clothing Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Hourly Temp */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <PixelThermometer size={14} />
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Hourly Forecast</p>
          </div>
          <div className="flex gap-1">
            {hourlyTemps.map((temp, i) => {
              const hour = (currentTime.getHours() + i) % 24;
              const isNow = i === 0;
              const maxTemp = Math.max(...hourlyTemps);
              const minTemp = Math.min(...hourlyTemps);
              const barHeight = 20 + ((temp - minTemp) / (maxTemp - minTemp)) * 40;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-[9px] font-mono ${isNow ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                    {isNow ? 'Now' : `${hour}:00`}
                  </span>
                  <div className="w-full flex items-end justify-center" style={{ height: '48px' }}>
                    <div
                      className={`w-4 rounded-t-sm ${isNow ? 'bg-blue-500' : 'bg-gray-200 hover:bg-gray-300 transition-colors'}`}
                      style={{ height: `${barHeight}px`, transition: 'height 0.3s' }}
                    />
                  </div>
                  <span className={`text-[10px] font-medium ${isNow ? 'text-blue-600' : 'text-gray-500'}`}>
                    {temp}°
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clothing Suggestion */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            {clothing.level === 'light' ? <PixelLeaf size={14} /> : clothing.level === 'freezing' ? <PixelCoat size={14} /> : <PixelShirt size={14} />}
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">What to Wear</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-800">{clothing.label}</span>
            <div className="flex gap-1">{clothing.items}</div>
          </div>
          <p className="text-xs text-gray-500 flex-1">{clothing.tip}</p>
          {current.rainChance > 50 && (
            <div className="mt-3 flex items-center gap-1.5 bg-blue-50 rounded-lg px-2.5 py-2">
              <PixelUmbrella size={12} />
              <span className="text-[10px] text-blue-600 font-medium">{current.rainChance}% rain chance — bring an umbrella!</span>
            </div>
          )}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <PixelStar size={14} />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">7-Day Forecast</p>
        </div>
        <div className="divide-y divide-gray-50">
          {forecasts.map((fc, i) => {
            const isSelected = selectedDay === i;
            const good = isGoodWeatherDay(fc);
            return (
              <div
                key={i}
                onClick={() => setSelectedDay(isSelected ? null : i)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-gray-50 ${isSelected ? 'bg-blue-50/50' : ''}`}
              >
                {/* Day + Date */}
                <div className="w-16">
                  <p className={`text-xs font-medium ${i === 0 ? 'text-gray-900' : 'text-gray-600'}`}>{fc.day}</p>
                  <p className="text-[10px] text-gray-400">{fc.date}</p>
                </div>

                {/* Icon */}
                <div className="w-12 flex justify-center">
                  {getWeatherIcon(fc.condition, 24)}
                </div>

                {/* Rain chance */}
                <div className="w-16 flex items-center gap-1">
                  <PixelUmbrella size={10} />
                  <span className="text-[10px] text-gray-400">{fc.rainChance}%</span>
                </div>

                {/* Temp range bar */}
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700 w-7">{fc.high}°</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-red-400"
                      style={{ left: '0%', right: `${100 - ((fc.high - 24) / 10) * 100}%` }}
                    />
                    <div
                      className="absolute h-full rounded-full bg-blue-300"
                      style={{ left: `${((fc.low - 24) / 10) * 100}%`, right: '0%' }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-7 text-right">{fc.low}°</span>
                </div>

                {/* Mood */}
                <div className="w-12 flex justify-end">
                  {fc.mood === 'great' ? (
                    <div className="flex items-center gap-0.5"><PixelStar size={10} /><span className="text-[9px] text-amber-500">great</span></div>
                  ) : fc.mood === 'okay' ? (
                    <div className="flex items-center gap-0.5"><PixelLeaf size={10} /><span className="text-[9px] text-emerald-500">okay</span></div>
                  ) : (
                    <div className="flex items-center gap-0.5"><PixelHeart size={10} /><span className="text-[9px] text-rose-400">low</span></div>
                  )}
                </div>

                {/* Good day badge */}
                {good && (
                  <div className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-[9px] text-emerald-600 font-medium">
                    Good day ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather & Mood Correlation */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <PixelHeart size={14} />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Weather & Mood</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { weather: '☀️ Sunny', mood: 'Energized', pct: 78, color: 'bg-amber-100 border-amber-200', textColor: 'text-amber-700', icon: <PixelStar size={14} /> },
            { weather: '🌧️ Rainy', mood: 'Reflective', pct: 62, color: 'bg-blue-100 border-blue-200', textColor: 'text-blue-700', icon: <PixelHeart size={14} /> },
            { weather: '❄️ Snowy', mood: 'Cozy', pct: 88, color: 'bg-cyan-100 border-cyan-200', textColor: 'text-cyan-700', icon: <PixelSnowflake size={14} /> },
          ].map((item, i) => (
            <div key={i} className={`rounded-lg p-3 border ${item.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={item.textColor}>{item.icon}</div>
                <div>
                  <p className="text-xs font-medium text-gray-800">{item.weather}</p>
                  <p className="text-[10px] text-gray-500">makes you feel: {item.mood}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.textColor.replace('text-', 'bg-')}`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className={`text-[10px] font-medium ${item.textColor}`}>{item.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-gray-400">
        <div className="flex items-center gap-1">
          <PixelSun size={10} />
          <span>Weather data for Singapore, North East District</span>
        </div>
        <div className="flex items-center gap-1">
          <PixelSparkle size={10} />
          <span>Auto-updated every 30 minutes</span>
        </div>
      </div>
    </div>
  );
}