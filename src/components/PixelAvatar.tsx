import React from 'react';

type PixelAvatarProps = {
  agent: 'cyber' | 'scout' | 'engineer' | 'guardian';
  size?: number;
  className?: string;
};

const agentPixels: Record<PixelAvatarProps['agent'], number[][]> = {
  cyber: [
    [0,0,0,1,1,0,0,0],
    [0,0,1,2,2,1,0,0],
    [0,1,2,3,3,2,1,0],
    [0,1,4,4,4,4,1,0],
    [0,1,4,5,5,4,1,0],
    [1,2,4,4,4,4,2,1],
    [1,2,2,2,2,2,2,1],
    [0,1,2,1,1,2,1,0],
    [0,0,1,0,0,1,0,0],
  ],
  scout: [
    [0,0,0,0,1,0,0,0],
    [0,0,1,1,1,1,1,0],
    [0,1,3,3,1,3,3,1],
    [0,1,3,3,1,3,3,1],
    [0,1,1,1,1,1,1,1],
    [0,0,1,2,2,2,1,0],
    [0,0,1,2,2,2,1,0],
    [0,0,1,1,0,1,1,0],
    [0,0,1,0,0,0,1,0],
  ],
  engineer: [
    [0,0,0,1,1,0,0,0],
    [0,0,1,4,4,1,0,0],
    [0,1,4,4,4,4,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,2,2,2,2,1,0],
    [1,2,2,3,3,2,2,1],
    [1,2,2,2,2,2,2,1],
    [0,1,2,1,1,2,1,0],
    [0,0,1,1,0,1,0,0],
  ],
  guardian: [
    [0,0,0,1,1,0,0,0],
    [0,0,1,3,3,1,0,0],
    [0,1,3,3,3,3,1,0],
    [0,1,1,1,1,1,1,0],
    [0,1,4,4,4,4,1,0],
    [1,2,2,4,4,2,2,1],
    [1,2,2,2,2,2,2,1],
    [0,1,1,1,1,1,1,0],
    [0,0,1,1,0,1,0,0],
  ],
};

const colorMap: Record<number, string> = {
  0: 'transparent',
  1: '#1a1a2e',
  2: '#e94560',
  3: '#0f3460',
  4: '#16213e',
  5: '#533483',
};

export const PixelAvatar: React.FC<PixelAvatarProps> = ({ agent, size = 36, className }) => {
  const pixels = agentPixels[agent];
  if (!pixels) return null;
  const cellSize = Math.floor(size / pixels[0].length);

  return (
    <svg
      width={size}
      height={pixels.length * cellSize}
      viewBox={`0 0 ${pixels[0].length} ${pixels.length}`}
      className={className}
      shapeRendering="crispEdges"
    >
      {pixels.map((row, y) =>
        row.map((color, x) =>
          color !== 0 ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={colorMap[color]}
            />
          ) : null
        )
      )}
    </svg>
  );
};
