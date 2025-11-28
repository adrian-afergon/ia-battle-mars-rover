'use client';

import React from 'react';
import { IPosition, Direction } from '@/domain';

interface GridViewProps {
  width: number;
  height: number;
  roverPosition: IPosition;
  roverDirection: Direction;
  obstacles: IPosition[];
  positionHistory: IPosition[];
}

export function GridView({
  width,
  height,
  roverPosition,
  roverDirection,
  obstacles,
  positionHistory,
}: GridViewProps) {
  const obstacleSet = new Set(obstacles.map(o => `${o.x},${o.y}`));
  const historySet = new Set(positionHistory.map(p => `${p.x},${p.y}`));

  const directionArrows: Record<Direction, string> = {
    N: '↑',
    S: '↓',
    E: '→',
    W: '←',
  };

  const getCellContent = (x: number, y: number): string => {
    if (roverPosition.x === x && roverPosition.y === y) {
      return directionArrows[roverDirection];
    }
    if (obstacleSet.has(`${x},${y}`)) {
      return '✕';
    }
    if (historySet.has(`${x},${y}`)) {
      return '·';
    }
    return '';
  };

  const getCellClass = (x: number, y: number): string => {
    let classes = 'border border-gray-300 aspect-square flex items-center justify-center text-sm ';

    if (roverPosition.x === x && roverPosition.y === y) {
      return classes + 'bg-blue-500 text-white font-bold text-lg';
    }
    if (obstacleSet.has(`${x},${y}`)) {
      return classes + 'bg-red-500 text-white';
    }
    if (historySet.has(`${x},${y}`)) {
      return classes + 'bg-yellow-100';
    }
    return classes + 'bg-white';
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Mars Rover Grid ({width}x{height})</h2>

      <div className="mb-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded" />
          <span>Rover</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded" />
          <span>Obstacle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-100 border border-yellow-300 rounded" />
          <span>History</span>
        </div>
      </div>

      <div
        className="border-4 border-gray-800 bg-white inline-block"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${width}, minmax(40px, 1fr))`,
          gap: 0,
        }}
      >
        {Array.from({ length: height }).map((_, rowIndex) => {
          const y = height - 1 - rowIndex; // Invert Y axis so 0 is at bottom
          return Array.from({ length: width }).map((_, x) => (
            <div key={`${x},${y}`} className={getCellClass(x, y)}>
              {getCellContent(x, y)}
            </div>
          ));
        })}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Rover Position: <span className="font-mono font-bold">{roverPosition.x}, {roverPosition.y}</span>
        </p>
        <p>
          Rover Direction: <span className="font-mono font-bold">{roverDirection}</span>
        </p>
        <p>
          Position History: <span className="font-mono text-xs">{positionHistory.length} positions</span>
        </p>
      </div>
    </div>
  );
}
