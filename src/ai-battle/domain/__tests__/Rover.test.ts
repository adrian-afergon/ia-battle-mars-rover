import { describe, it, expect } from 'vitest';
import { Rover } from '../Rover';
import { WorldMap } from '../WorldMap';
import { Position } from '../Position';

describe('Rover - Fase 2 (Basic)', () => {
  describe('constructor and getters', () => {
    it('should create a rover with initial position and direction', () => {
      const worldMap = new WorldMap(10, 10);
      const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

      expect(rover.getPosition()).toEqual({ x: 5, y: 5 });
      expect(rover.getDirection()).toBe('N');
    });

    it('should create a rover at origin', () => {
      const worldMap = new WorldMap(10, 10);
      const rover = new Rover({ x: 0, y: 0 }, 'E', worldMap);

      expect(rover.getPosition()).toEqual({ x: 0, y: 0 });
      expect(rover.getDirection()).toBe('E');
    });

    it('should support all directions', () => {
      const worldMap = new WorldMap(10, 10);

      const roverN = new Rover({ x: 5, y: 5 }, 'N', worldMap);
      const roverS = new Rover({ x: 5, y: 5 }, 'S', worldMap);
      const roverE = new Rover({ x: 5, y: 5 }, 'E', worldMap);
      const roverW = new Rover({ x: 5, y: 5 }, 'W', worldMap);

      expect(roverN.getDirection()).toBe('N');
      expect(roverS.getDirection()).toBe('S');
      expect(roverE.getDirection()).toBe('E');
      expect(roverW.getDirection()).toBe('W');
    });

    it('should initialize with position history', () => {
      const worldMap = new WorldMap(10, 10);
      const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);
      const result = rover.execute('');

      expect(result.positionHistory).toHaveLength(1);
      expect(result.positionHistory[0]).toEqual({ x: 5, y: 5 });
    });
  });
});
