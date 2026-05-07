'use client';

import React from 'react';

type PixelProgressProps = {
  value: number;
  max?: number;
  className?: string;
  variant?: 'green' | 'blue' | 'yellow' | 'red';
};

const variantColors = {
  green: { fill: '#22c55e', bg: '#bbf7d0' },
  blue: { fill: '#3b82f6', bg: '#bfdbfe' },
  yellow: { fill: '#eab308', bg: '#fef08a' },
  red: { fill: '#ef4444', bg: '#fecaca' },
};

export const PixelProgress: React.FC<PixelProgressProps> = ({
  value,
  max = 100,
  className,
  variant = 'green',
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const segments = 20;
  const filled = Math.round((pct / 100) * segments);
  const colors = variantColors[variant];
  const segW = 4;
  const segH = 8;
  const gap = 1;
  const totalW = segments * (segW + gap) - gap;

  return (
    <svg
      width={totalW}
      height={segH}
      className={className}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated' }}
    >
      {Array.from({ length: segments }).map((_, i) => (
        <rect
          key={i}
          x={i * (segW + gap)}
          y={0}
          width={segW}
          height={segH}
          fill={i < filled ? colors.fill : colors.bg}
          rx={0}
        />
      ))}
    </svg>
  );
};
