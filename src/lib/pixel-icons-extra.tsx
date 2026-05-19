// New pixel icons for the additional screens
import React from 'react';

type PixelIconProps = { size?: number; className?: string };

export const PixelTasks: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="2" y="2" width="4" height="4" fill="currentColor" />
    <rect x="7" y="2" width="4" height="4" fill="currentColor" opacity="0.5" />
    <rect x="12" y="2" width="4" height="4" fill="currentColor" opacity="0.2" />
    <rect x="2" y="7" width="12" height="1" fill="currentColor" opacity="0.15" />
    <rect x="2" y="9" width="4" height="4" fill="currentColor" opacity="0.5" />
    <rect x="7" y="9" width="4" height="4" fill="currentColor" opacity="0.2" />
  </svg>
);

export const PixelCalendar: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="1" y="2" width="14" height="13" fill="currentColor" opacity="0.1" />
    <rect x="1" y="2" width="14" height="3" fill="currentColor" />
    <rect x="3" y="0" width="2" height="5" fill="currentColor" opacity="0.4" />
    <rect x="11" y="0" width="2" height="5" fill="currentColor" opacity="0.4" />
    <rect x="3" y="7" width="3" height="2" fill="currentColor" opacity="0.5" />
    <rect x="7" y="7" width="3" height="2" fill="currentColor" opacity="0.3" />
    <rect x="11" y="7" width="3" height="2" fill="currentColor" opacity="0.3" />
    <rect x="3" y="10" width="3" height="2" fill="currentColor" opacity="0.3" />
  </svg>
);

export const PixelProjects: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="1" y="1" width="6" height="5" fill="currentColor" opacity="0.3" />
    <rect x="9" y="1" width="6" height="5" fill="currentColor" opacity="0.15" />
    <rect x="1" y="8" width="4" height="7" fill="currentColor" opacity="0.5" />
    <rect x="6" y="10" width="4" height="5" fill="currentColor" opacity="0.2" />
    <rect x="11" y="8" width="4" height="4" fill="currentColor" opacity="0.25" />
  </svg>
);

export const PixelMemory: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="2" y="1" width="12" height="14" fill="currentColor" opacity="0.1" />
    <rect x="4" y="2" width="8" height="1" fill="currentColor" opacity="0.3" />
    <rect x="4" y="4" width="8" height="1" fill="currentColor" opacity="0.3" />
    <rect x="4" y="6" width="6" height="1" fill="currentColor" opacity="0.2" />
    <rect x="4" y="8" width="8" height="1" fill="currentColor" opacity="0.2" />
    <rect x="4" y="10" width="5" height="1" fill="currentColor" opacity="0.15" />
    <rect x="4" y="12" width="7" height="1" fill="currentColor" opacity="0.15" />
  </svg>
);

export const PixelDocs: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="3" y="1" width="10" height="14" fill="currentColor" opacity="0.1" />
    <rect x="1" y="3" width="3" height="10" fill="currentColor" opacity="0.15" />
    <rect x="4" y="3" width="8" height="3" fill="currentColor" opacity="0.3" />
    <rect x="4" y="7" width="6" height="2" fill="currentColor" opacity="0.2" />
    <rect x="4" y="10" width="7" height="2" fill="currentColor" opacity="0.15" />
  </svg>
);

export const PixelTeam: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="5" y="1" width="6" height="5" fill="currentColor" />
    <rect x="6" y="0" width="4" height="2" fill="currentColor" />
    <rect x="1" y="7" width="5" height="5" fill="currentColor" opacity="0.5" />
    <rect x="10" y="7" width="5" height="5" fill="currentColor" opacity="0.3" />
    <rect x="5" y="13" width="6" height="1" fill="currentColor" opacity="0.2" />
  </svg>
);

export const PixelOffice: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="0" y="0" width="16" height="2" fill="currentColor" opacity="0.15" />
    <rect x="0" y="14" width="16" height="2" fill="currentColor" opacity="0.15" />
    <rect x="0" y="0" width="2" height="16" fill="currentColor" opacity="0.15" />
    <rect x="14" y="0" width="2" height="16" fill="currentColor" opacity="0.15" />
    <rect x="4" y="6" width="3" height="3" fill="currentColor" opacity="0.4" />
    <rect x="9" y="6" width="3" height="3" fill="currentColor" opacity="0.3" />
    <rect x="4" y="11" width="3" height="3" fill="currentColor" opacity="0.2" />
    <rect x="9" y="11" width="3" height="3" fill="currentColor" opacity="0.2" />
  </svg>
);

export const PixelSearch: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="1" y="1" width="5" height="5" fill="currentColor" opacity="0.2" />
    <rect x="2" y="2" width="3" height="3" fill="currentColor" opacity="0.5" />
    <rect x="5" y="5" width="3" height="1" fill="currentColor" />
    <rect x="7" y="4" width="1" height="3" fill="currentColor" />
  </svg>
);

export const PixelPulse: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="0" y="3" width="1" height="2" fill="currentColor" />
    <rect x="2" y="1" width="1" height="6" fill="currentColor" />
    <rect x="4" y="0" width="1" height="8" fill="currentColor" />
    <rect x="6" y="2" width="1" height="4" fill="currentColor" />
  </svg>
);

export const PixelActivity: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="0" y="5" width="1" height="2" fill="currentColor" />
    <rect x="1" y="4" width="1" height="3" fill="currentColor" />
    <rect x="2" y="3" width="1" height="4" fill="currentColor" />
    <rect x="3" y="2" width="1" height="5" fill="currentColor" />
    <rect x="4" y="1" width="1" height="6" fill="currentColor" />
    <rect x="5" y="2" width="1" height="5" fill="currentColor" />
    <rect x="6" y="3" width="1" height="4" fill="currentColor" />
    <rect x="7" y="5" width="1" height="2" fill="currentColor" />
  </svg>
);

export const PixelSound: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="0" y="3" width="1" height="2" fill="currentColor" />
    <rect x="2" y="2" width="1" height="4" fill="currentColor" />
    <rect x="4" y="1" width="1" height="6" fill="currentColor" />
    <rect x="6" y="0" width="1" height="8" fill="currentColor" />
  </svg>
);

export const PixelBell: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="3" y="0" width="2" height="1" fill="currentColor" />
    <rect x="2" y="1" width="4" height="1" fill="currentColor" />
    <rect x="1" y="2" width="6" height="4" fill="currentColor" />
    <rect x="2" y="3" width="4" height="2" fill="currentColor" opacity="0.2" />
    <rect x="3" y="6" width="2" height="1" fill="currentColor" />
    <rect x="3" y="7" width="2" height="1" fill="currentColor" />
  </svg>
);

export const PixelPortfolio: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="1" y="1" width="14" height="14" fill="currentColor" opacity="0.1" />
    <rect x="1" y="1" width="14" height="2" fill="currentColor" opacity="0.4" />
    <rect x="4" y="5" width="2" height="6" fill="currentColor" />
    <rect x="7" y="7" width="2" height="5" fill="currentColor" opacity="0.6" />
    <rect x="10" y="4" width="2" height="7" fill="currentColor" opacity="0.3" />
    <rect x="1" y="13" width="14" height="2" fill="currentColor" opacity="0.3" />
  </svg>
);

export const PixelStandup: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="1" y="1" width="14" height="2" fill="currentColor" />
    <rect x="1" y="4" width="3" height="10" fill="currentColor" opacity="0.2" />
    <rect x="4" y="6" width="2" height="2" fill="currentColor" />
    <rect x="7" y="5" width="2" height="2" fill="currentColor" opacity="0.6" />
    <rect x="10" y="7" width="2" height="2" fill="currentColor" opacity="0.3" />
    <rect x="4" y="9" width="8" height="1" fill="currentColor" opacity="0.15" />
    <rect x="4" y="11" width="5" height="1" fill="currentColor" opacity="0.15" />
    <rect x="12" y="2" width="2" height="3" fill="currentColor" opacity="0.3" />
  </svg>
);

export const PixelGoals: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="7" y="1" width="2" height="2" fill="currentColor" />
    <rect x="5" y="3" width="6" height="2" fill="currentColor" />
    <rect x="3" y="5" width="10" height="8" fill="currentColor" opacity="0.15" />
    <rect x="4" y="6" width="2" height="6" fill="currentColor" opacity="0.5" />
    <rect x="7" y="8" width="2" height="4" fill="currentColor" />
    <rect x="10" y="7" width="2" height="4" fill="currentColor" opacity="0.4" />
    <rect x="3" y="13" width="10" height="2" fill="currentColor" opacity="0.3" />
    <rect x="7" y="13" width="2" height="2" fill="currentColor" />
  </svg>
);

export const PixelCommandBar: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="1" y="1" width="14" height="14" fill="currentColor" opacity="0.08" />
    <rect x="2" y="3" width="3" height="2" fill="currentColor" />
    <rect x="6" y="3" width="8" height="1" fill="currentColor" opacity="0.4" />
    <rect x="6" y="5" width="5" height="1" fill="currentColor" opacity="0.3" />
    <rect x="2" y="7" width="12" height="1" fill="currentColor" opacity="0.15" />
    <rect x="2" y="9" width="2" height="2" fill="currentColor" opacity="0.6" />
    <rect x="5" y="9" width="6" height="1" fill="currentColor" opacity="0.3" />
    <rect x="2" y="12" width="12" height="1" fill="currentColor" opacity="0.15" />
    <rect x="11" y="9" width="3" height="2" fill="currentColor" />
  </svg>
);

export const PixelWeather: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="5" y="0" width="2" height="2" fill="currentColor" />
    <rect x="3" y="1" width="6" height="1" fill="currentColor" />
    <rect x="1" y="2" width="10" height="4" fill="currentColor" opacity="0.15" />
    <rect x="0" y="3" width="1" height="2" fill="currentColor" opacity="0.4" />
    <rect x="11" y="3" width="1" height="2" fill="currentColor" opacity="0.4" />
    <rect x="2" y="3" width="2" height="2" fill="currentColor" opacity="0.3" />
    <rect x="8" y="3" width="2" height="2" fill="currentColor" opacity="0.3" />
    <rect x="4" y="7" width="4" height="1" fill="currentColor" opacity="0.4" />
    <rect x="3" y="9" width="2" height="4" fill="currentColor" opacity="0.5" />
    <rect x="7" y="9" width="2" height="4" fill="currentColor" opacity="0.5" />
    <rect x="11" y="9" width="2" height="2" fill="currentColor" opacity="0.3" />
    <rect x="12" y="11" width="2" height="2" fill="currentColor" opacity="0.3" />
  </svg>
);

export const PixelCommute: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Train body */}
    <rect x="3" y="4" width="10" height="6" fill="currentColor" opacity="0.2" />
    <rect x="4" y="5" width="8" height="4" fill="currentColor" opacity="0.4" />
    {/* Windows */}
    <rect x="5" y="6" width="2" height="2" fill="currentColor" />
    <rect x="9" y="6" width="2" height="2" fill="currentColor" />
    {/* Wheels */}
    <rect x="4" y="10" width="2" height="2" fill="currentColor" opacity="0.6" />
    <rect x="10" y="10" width="2" height="2" fill="currentColor" opacity="0.6" />
    {/* Track */}
    <rect x="2" y="12" width="12" height="1" fill="currentColor" opacity="0.2" />
    {/* Rail ties */}
    <rect x="3" y="12" width="1" height="1" fill="currentColor" opacity="0.3" />
    <rect x="7" y="12" width="1" height="1" fill="currentColor" opacity="0.3" />
    <rect x="11" y="12" width="1" height="1" fill="currentColor" opacity="0.3" />
    {/* Head */}
    <rect x="7" y="2" width="2" height="2" fill="currentColor" opacity="0.7" />
    <rect x="6" y="1" width="4" height="1" fill="currentColor" opacity="0.4" />
  </svg>
);


export const PixelFocus: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Clock face */}
    <rect x="2" y="2" width="12" height="12" fill="currentColor" opacity="0.1" />
    <rect x="3" y="3" width="10" height="10" fill="currentColor" opacity="0.2" />
    <rect x="7" y="5" width="2" height="1" fill="currentColor" />
    <rect x="7" y="4" width="2" height="1" fill="currentColor" opacity="0.5" />
    {/* Center dot */}
    <rect x="7" y="8" width="2" height="2" fill="currentColor" />
    {/* Minute hand */}
    <rect x="8" y="7" width="1" height="4" fill="currentColor" />
    {/* Hour hand */}
    <rect x="6" y="9" width="2" height="1" fill="currentColor" />
    {/* Top hour mark */}
    <rect x="7" y="1" width="2" height="2" fill="currentColor" opacity="0.4" />
    {/* 3 o'clock mark */}
    <rect x="13" y="7" width="2" height="2" fill="currentColor" opacity="0.4" />
    {/* 6 o'clock mark */}
    <rect x="7" y="13" width="2" height="2" fill="currentColor" opacity="0.4" />
    {/* 9 o'clock mark */}
    <rect x="1" y="7" width="2" height="2" fill="currentColor" opacity="0.4" />
  </svg>
);

export const PixelSpending: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Dollar sign pixel art */}
    <rect x="7" y="1" width="2" height="1" fill="currentColor" />
    <rect x="5" y="2" width="6" height="1" fill="currentColor" opacity="0.3" />
    <rect x="8" y="3" width="1" height="3" fill="currentColor" />
    <rect x="6" y="4" width="2" height="1" fill="currentColor" opacity="0.5" />
    <rect x="5" y="5" width="4" height="1" fill="currentColor" />
    <rect x="8" y="6" width="1" height="3" fill="currentColor" />
    <rect x="6" y="8" width="3" height="1" fill="currentColor" opacity="0.4" />
    <rect x="5" y="10" width="6" height="1" fill="currentColor" />
    <rect x="8" y="11" width="1" height="1" fill="currentColor" />
    <rect x="6" y="12" width="4" height="1" fill="currentColor" opacity="0.4" />
    <rect x="5" y="13" width="2" height="1" fill="currentColor" opacity="0.3" />
    {/* Coins */}
    <rect x="2" y="5" width="2" height="2" fill="currentColor" opacity="0.5" />
    <rect x="1" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    <rect x="3" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    <rect x="12" y="5" width="2" height="2" fill="currentColor" opacity="0.4" />
    <rect x="11" y="6" width="1" height="1" fill="currentColor" opacity="0.25" />
    <rect x="13" y="6" width="1" height="1" fill="currentColor" opacity="0.25" />
  </svg>
);

export const PixelIncome: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Coin stack */}
    <rect x="1" y="9" width="6" height="2" fill="currentColor" opacity="0.3" />
    <rect x="2" y="8" width="6" height="2" fill="currentColor" opacity="0.4" />
    <rect x="3" y="6" width="6" height="2" fill="currentColor" opacity="0.6" />
    <rect x="4" y="5" width="4" height="2" fill="currentColor" />
    {/* Arrow up */}
    <rect x="11" y="8" width="2" height="1" fill="currentColor" />
    <rect x="12" y="6" width="2" height="2" fill="currentColor" />
    <rect x="13" y="4" width="2" height="2" fill="currentColor" />
    <rect x="11" y="4" width="2" height="2" fill="currentColor" opacity="0.6" />
    <rect x="13" y="2" width="2" height="2" fill="currentColor" />
    <rect x="14" y="0" width="2" height="2" fill="currentColor" />
    <rect x="12" y="2" width="2" height="2" fill="currentColor" opacity="0.4" />
  </svg>
);
