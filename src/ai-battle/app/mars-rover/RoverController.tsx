'use client';

import React, { useState } from 'react';
import { createRover, ExecutionResult, Direction, IPosition } from '@/domain';
import { GridView } from './GridView';

export function RoverController() {
  const defaultConfig = {
    gridSize: 10,
    startX: 5,
    startY: 5,
    direction: 'N' as Direction,
    obstacles: '2,2|3,5|7,8',
    commands: 'ffrfflfflfflfffrfff',
  };

  const [config, setConfig] = useState(defaultConfig);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseObstacles = (obstacleStr: string): IPosition[] => {
    if (!obstacleStr.trim()) return [];
    return obstacleStr.split('|').map(obs => {
      const [x, y] = obs.split(',').map(Number);
      return { x, y };
    });
  };

  const handleExecute = () => {
    try {
      setError(null);

      const obstacles = parseObstacles(config.obstacles);

      const rover = createRover({
        position: { x: config.startX, y: config.startY },
        direction: config.direction,
        gridSize: {
          width: config.gridSize,
          height: config.gridSize,
        },
        obstacles,
      });

      const result = rover.execute(config.commands);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Mars Rover Simulator</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Configuration</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Grid Size</label>
            <input
              type="number"
              min="1"
              max="20"
              value={config.gridSize}
              onChange={e => setConfig({ ...config, gridSize: parseInt(e.target.value) })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Direction</label>
            <select
              value={config.direction}
              onChange={e => setConfig({ ...config, direction: e.target.value as Direction })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="N">North (N)</option>
              <option value="S">South (S)</option>
              <option value="E">East (E)</option>
              <option value="W">West (W)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start X</label>
            <input
              type="number"
              min="0"
              value={config.startX}
              onChange={e => setConfig({ ...config, startX: parseInt(e.target.value) })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Y</label>
            <input
              type="number"
              min="0"
              value={config.startY}
              onChange={e => setConfig({ ...config, startY: parseInt(e.target.value) })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Obstacles (x,y|x,y|...)</label>
          <input
            type="text"
            value={config.obstacles}
            onChange={e => setConfig({ ...config, obstacles: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
            placeholder="2,2|3,5|7,8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Commands (f, b, l, r)</label>
          <textarea
            value={config.commands}
            onChange={e => setConfig({ ...config, commands: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
            rows={3}
            placeholder="ffrfflfflfflfffrfff"
          />
          <p className="mt-1 text-xs text-gray-500">f = forward, b = backward, l = left, r = right</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExecute}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Execute
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <>
          <GridView
            width={config.gridSize}
            height={config.gridSize}
            roverPosition={result.position}
            roverDirection={result.direction}
            obstacles={parseObstacles(config.obstacles)}
            positionHistory={result.positionHistory}
          />

          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Execution Result</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Final Position</p>
                <p className="text-lg font-mono font-bold">
                  ({result.position.x}, {result.position.y})
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Final Direction</p>
                <p className="text-lg font-mono font-bold">{result.direction}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p
                  className={`text-lg font-semibold ${
                    result.status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {result.status === 'success' ? '✓ Success' : '⚠ Obstacle Detected'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Positions Visited</p>
                <p className="text-lg font-mono font-bold">{result.positionHistory.length}</p>
              </div>
            </div>

            {result.obstaclePosition && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm font-semibold text-yellow-800">Obstacle Found at:</p>
                <p className="font-mono text-lg">
                  ({result.obstaclePosition.x}, {result.obstaclePosition.y})
                </p>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Position History</p>
              <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs overflow-auto max-h-40">
                {result.positionHistory
                  .map((p, i) => `${i}: (${p.x}, ${p.y})`)
                  .join('\n')}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
