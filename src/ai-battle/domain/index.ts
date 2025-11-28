/**
 * Mars Rover - Main public API
 * Exports all classes and types for public consumption
 */

export { Rover } from './Rover';
export { Position } from './Position';
export { WorldMap } from './WorldMap';
export type { Direction, IPosition, ExecutionResult } from './types/index';

/**
 * Configuration for creating a Rover
 */
export interface RoverConfig {
  position: IPosition;
  direction: Direction;
  gridSize: { width: number; height: number };
  obstacles?: IPosition[];
}

/**
 * Factory function to create a configured Rover
 * @param config Configuration for the rover
 * @returns A configured Rover instance
 */
export function createRover(config: RoverConfig): Rover {
  const worldMap = new WorldMap(config.gridSize.width, config.gridSize.height, config.obstacles);
  return new Rover(config.position, config.direction, worldMap);
}

import { Direction, IPosition } from './types/index';
