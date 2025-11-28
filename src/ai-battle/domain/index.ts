/**
 * Mars Rover - Main public API
 * Exports all classes and types for public consumption
 */

import { Rover } from './Rover';
import { Position } from './Position';
import { WorldMap } from './WorldMap';
import type { Direction, IPosition, ExecutionResult } from './types/index';

export { Rover, Position, WorldMap };
export type { Direction, IPosition, ExecutionResult };

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
