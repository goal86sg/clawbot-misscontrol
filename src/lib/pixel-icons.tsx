// 8-bit style pixel icons as SVG components
import React from 'react';

type PixelIconProps = { size?: number; className?: string };

export const PixelHome: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="2" y="2" width="12" height="12" fill="currentColor" opacity="0.15" />
    <rect x="4" y="6" width="2" height="6" fill="currentColor" />
    <rect x="8" y="4" width="4" height="8" fill="currentColor" />
    <rect x="2" y="14" width="12" height="2" fill="currentColor" />
  </svg>
);

export const PixelAgents: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="6" y="2" width="4" height="4" fill="currentColor" />
    <rect x="4" y="6" width="8" height="6" fill="currentColor" />
    <rect x="4" y="12" width="2" height="2" fill="currentColor" />
    <rect x="10" y="12" width="2" height="2" fill="currentColor" />
    <rect x="6" y="10" width="4" height="2" fill="currentColor" />
  </svg>
);

export const PixelMission: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="7" y="1" width="2" height="2" fill="currentColor" />
    <rect x="7" y="4" width="2" height="2" fill="currentColor" />
    <rect x="3" y="6" width="4" height="6" fill="currentColor" />
    <rect x="9" y="6" width="4" height="6" fill="currentColor" />
    <rect x="7" y="12" width="2" height="2" fill="currentColor" />
    <rect x="5" y="1" width="2" height="4" fill="currentColor" />
    <rect x="9" y="1" width="2" height="4" fill="currentColor" />
  </svg>
);

export const PixelTerminal: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="1" y="2" width="14" height="12" fill="currentColor" opacity="0.15" />
    <rect x="2" y="3" width="12" height="10" fill="currentColor" />
    <rect x="4" y="5" width="2" height="2" fill="white" />
    <rect x="7" y="5" width="2" height="2" fill="white" />
    <rect x="10" y="5" width="4" height="2" fill="white" />
    <rect x="4" y="8" width="8" height="2" fill="white" opacity="0.5" />
    <rect x="4" y="11" width="4" height="2" fill="white" opacity="0.3" />
  </svg>
);

export const PixelSettings: React.FC<PixelIconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    <rect x="6" y="1" width="4" height="4" fill="currentColor" />
    <rect x="7" y="0" width="2" height="2" fill="currentColor" />
    <rect x="1" y="5" width="4" height="2" fill="currentColor" />
    <rect x="11" y="5" width="4" height="2" fill="currentColor" />
    <rect x="3" y="7" width="10" height="6" fill="currentColor" opacity="0.2" />
    <rect x="6" y="8" width="4" height="4" fill="currentColor" />
    <rect x="1" y="10" width="4" height="2" fill="currentColor" />
    <rect x="11" y="10" width="4" height="2" fill="currentColor" />
  </svg>
);

export const PixelCheck: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="0" y="3" width="2" height="2" fill="currentColor" />
    <rect x="2" y="2" width="2" height="2" fill="currentColor" />
    <rect x="4" y="1" width="2" height="2" fill="currentColor" />
    <rect x="6" y="0" width="2" height="2" fill="currentColor" />
  </svg>
);

export const PixelAlert: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="3" y="0" width="2" height="2" fill="currentColor" />
    <rect x="3" y="2" width="2" height="3" fill="currentColor" />
    <rect x="3" y="5" width="2" height="2" fill="currentColor" />
  </svg>
);

export const PixelPlay: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="1" y="1" width="2" height="6" fill="currentColor" />
    <rect x="3" y="2" width="2" height="4" fill="currentColor" />
    <rect x="5" y="3" width="2" height="2" fill="currentColor" />
  </svg>
);

export const PixelSparkle: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="4" y="0" width="1" height="8" fill="currentColor" />
    <rect x="0" y="4" width="8" height="1" fill="currentColor" />
    <rect x="1" y="1" width="2" height="2" fill="currentColor" />
    <rect x="5" y="1" width="2" height="2" fill="currentColor" />
    <rect x="1" y="5" width="2" height="2" fill="currentColor" />
    <rect x="5" y="5" width="2" height="2" fill="currentColor" />
  </svg>
);

export const PixelHeart: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="1" y="1" width="2" height="2" fill="currentColor" />
    <rect x="5" y="1" width="2" height="2" fill="currentColor" />
    <rect x="0" y="3" width="8" height="3" fill="currentColor" />
    <rect x="1" y="6" width="2" height="1" fill="currentColor" />
    <rect x="5" y="6" width="2" height="1" fill="currentColor" />
  </svg>
);

export const PixelClock: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" className={className} shapeRendering="crispEdges">
    <rect x="1" y="0" width="6" height="2" fill="currentColor" />
    <rect x="1" y="6" width="6" height="2" fill="currentColor" />
    <rect x="0" y="1" width="2" height="6" fill="currentColor" />
    <rect x="6" y="1" width="2" height="6" fill="currentColor" />
    <rect x="4" y="3" width="2" height="2" fill="currentColor" />
    <rect x="4" y="1" width="2" height="2" fill="currentColor" />
    <rect x="3" y="3" width="1" height="1" fill="currentColor" />
  </svg>
);

export const PixelSunset: React.FC<PixelIconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} shapeRendering="crispEdges">
    {/* Horizon line */}
    <rect x="0" y="10" width="16" height="1" fill="currentColor" opacity="0.2" />
    {/* Sun */}
    <rect x="6" y="4" width="4" height="2" fill="currentColor" />
    <rect x="7" y="3" width="2" height="1" fill="currentColor" opacity="0.6" />
    <rect x="5" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
    <rect x="10" y="5" width="1" height="1" fill="currentColor" opacity="0.5" />
    {/* Sun rays */}
    <rect x="7" y="1" width="2" height="1" fill="currentColor" opacity="0.3" />
    <rect x="3" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    <rect x="12" y="6" width="1" height="1" fill="currentColor" opacity="0.3" />
    {/* Mountains / hills */}
    <rect x="0" y="11" width="5" height="4" fill="currentColor" opacity="0.15" />
    <rect x="11" y="11" width="5" height="4" fill="currentColor" opacity="0.15" />
    <rect x="2" y="12" width="3" height="3" fill="currentColor" opacity="0.1" />
    <rect x="9" y="12" width="4" height="3" fill="currentColor" opacity="0.1" />
  </svg>
);
