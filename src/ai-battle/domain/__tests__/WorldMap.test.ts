import { describe, it, expect } from 'vitest';
import { WorldMap } from '../WorldMap';
import { Position } from '../Position';

describe('WorldMap', () => {
  describe('constructor', () => {
    it('should create a world map with given dimensions', () => {
      const worldMap = new WorldMap(10, 10);

      expect(worldMap.width).toBe(10);
      expect(worldMap.height).toBe(10);
    });

    it('should accept obstacles in constructor', () => {
      const obstacles = [{ x: 2, y: 2 }, { x: 3, y: 5 }];
      const worldMap = new WorldMap(10, 10, obstacles);

      expect(worldMap.hasObstacle(new Position(2, 2))).toBe(true);
      expect(worldMap.hasObstacle(new Position(3, 5))).toBe(true);
    });

    it('should initialize without obstacles if none provided', () => {
      const worldMap = new WorldMap(10, 10);

      expect(worldMap.hasObstacle(new Position(5, 5))).toBe(false);
    });
  });

  describe('isValidPosition', () => {
    const worldMap = new WorldMap(10, 10);

    it('should return true for positions within boundaries', () => {
      expect(worldMap.isValidPosition(new Position(0, 0))).toBe(true);
      expect(worldMap.isValidPosition(new Position(5, 5))).toBe(true);
      expect(worldMap.isValidPosition(new Position(9, 9))).toBe(true);
    });

    it('should return false for negative x coordinate', () => {
      expect(worldMap.isValidPosition(new Position(-1, 5))).toBe(false);
    });

    it('should return false for negative y coordinate', () => {
      expect(worldMap.isValidPosition(new Position(5, -1))).toBe(false);
    });

    it('should return false for x >= width', () => {
      expect(worldMap.isValidPosition(new Position(10, 5))).toBe(false);
    });

    it('should return false for y >= height', () => {
      expect(worldMap.isValidPosition(new Position(5, 10))).toBe(false);
    });

    it('should return false for positions outside all boundaries', () => {
      expect(worldMap.isValidPosition(new Position(-1, -1))).toBe(false);
      expect(worldMap.isValidPosition(new Position(10, 10))).toBe(false);
    });
  });

  describe('hasObstacle', () => {
    const obstacles = [
      { x: 2, y: 2 },
      { x: 3, y: 5 },
      { x: 0, y: 0 },
    ];
    const worldMap = new WorldMap(10, 10, obstacles);

    it('should return true when position has an obstacle', () => {
      expect(worldMap.hasObstacle(new Position(2, 2))).toBe(true);
    });

    it('should return false when position does not have an obstacle', () => {
      expect(worldMap.hasObstacle(new Position(1, 1))).toBe(false);
    });

    it('should detect obstacle at origin', () => {
      expect(worldMap.hasObstacle(new Position(0, 0))).toBe(true);
    });

    it('should detect multiple obstacles correctly', () => {
      expect(worldMap.hasObstacle(new Position(3, 5))).toBe(true);
      expect(worldMap.hasObstacle(new Position(2, 2))).toBe(true);
    });
  });

  describe('wrapPosition', () => {
    const worldMap = new WorldMap(10, 10);

    it('should return the same position for valid positions', () => {
      const position = new Position(5, 5);
      const wrapped = worldMap.wrapPosition(position);

      expect(wrapped.equals(position)).toBe(true);
    });

    it('should return the same position when x is out of bounds (negative)', () => {
      const position = new Position(-1, 5);
      const wrapped = worldMap.wrapPosition(position);

      expect(wrapped.equals(position)).toBe(true);
    });

    it('should return the same position when x is out of bounds (>= width)', () => {
      const position = new Position(10, 5);
      const wrapped = worldMap.wrapPosition(position);

      expect(wrapped.equals(position)).toBe(true);
    });

    it('should return the same position when y is out of bounds (negative)', () => {
      const position = new Position(5, -1);
      const wrapped = worldMap.wrapPosition(position);

      expect(wrapped.equals(position)).toBe(true);
    });

    it('should return the same position when y is out of bounds (>= height)', () => {
      const position = new Position(5, 10);
      const wrapped = worldMap.wrapPosition(position);

      expect(wrapped.equals(position)).toBe(true);
    });

    it('should return corner positions as-is', () => {
      const position = new Position(0, 0);
      const wrapped = worldMap.wrapPosition(position);

      expect(wrapped.equals(position)).toBe(true);
    });
  });
});
