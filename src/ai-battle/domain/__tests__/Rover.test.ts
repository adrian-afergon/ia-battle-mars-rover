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

  describe('Fase 3: Rotation (L and R)', () => {
    describe('turn left (L)', () => {
      it('should turn left from North to West', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('l');

        expect(rover.getDirection()).toBe('W');
      });

      it('should turn left from West to South', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'W', worldMap);

        rover.execute('l');

        expect(rover.getDirection()).toBe('S');
      });

      it('should turn left from South to East', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'S', worldMap);

        rover.execute('l');

        expect(rover.getDirection()).toBe('E');
      });

      it('should turn left from East to North', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'E', worldMap);

        rover.execute('l');

        expect(rover.getDirection()).toBe('N');
      });

      it('should complete full rotation with left turns (N->W->S->E->N)', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('llll');

        expect(rover.getDirection()).toBe('N');
      });
    });

    describe('turn right (R)', () => {
      it('should turn right from North to East', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('r');

        expect(rover.getDirection()).toBe('E');
      });

      it('should turn right from East to South', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'E', worldMap);

        rover.execute('r');

        expect(rover.getDirection()).toBe('S');
      });

      it('should turn right from South to West', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'S', worldMap);

        rover.execute('r');

        expect(rover.getDirection()).toBe('W');
      });

      it('should turn right from West to North', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'W', worldMap);

        rover.execute('r');

        expect(rover.getDirection()).toBe('N');
      });

      it('should complete full rotation with right turns (N->E->S->W->N)', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('rrrr');

        expect(rover.getDirection()).toBe('N');
      });
    });

    describe('mixed rotation commands', () => {
      it('should return to original direction with left then right', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('lr');

        expect(rover.getDirection()).toBe('N');
      });

      it('should return to original direction with right then left', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('rl');

        expect(rover.getDirection()).toBe('N');
      });

      it('should handle more than 360 degrees rotation', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 5, y: 5 }, 'N', worldMap);

        rover.execute('rrrrr');

        expect(rover.getDirection()).toBe('E');
      });

      it('should maintain position when only rotating', () => {
        const worldMap = new WorldMap(10, 10);
        const rover = new Rover({ x: 3, y: 7 }, 'N', worldMap);

        rover.execute('lrlrlr');

        expect(rover.getPosition()).toEqual({ x: 3, y: 7 });
      });
    });
  });
});
