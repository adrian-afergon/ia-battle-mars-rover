# Mars Rover Kata

Una implementación completa de la Mars Rover Kata en TypeScript, resuelta mediante TDD (Test-Driven Development).

## Descripción

El objetivo de la kata es desarrollar una API que traduzca comandos enviados desde la Tierra en instrucciones comprensibles para un rover en Marte.

## Características

- ✅ **Posicionamiento 2D**: El rover sabe su posición (x, y) y la dirección hacia la que mira (N, S, E, W)
- ✅ **Comandos**: Soporta 4 tipos de comandos:
  - `f`: Avanzar hacia adelante
  - `b`: Retroceder
  - `l`: Girar a la izquierda
  - `r`: Girar a la derecha
- ✅ **Límites del mapa**: El rover no puede salir del mapa (los bordes actúan como obstáculos)
- ✅ **Detección de obstáculos**: El rover puede detectar obstáculos y aborta la secuencia de comandos
- ✅ **Historial de posiciones**: Mantiene registro de todas las posiciones visitadas
- ✅ **100% Testeado**: 95 tests de integración con cobertura completa

## Instalación

```bash
cd src/ai-battle
npm install
```

## Uso

### Ejemplo básico

```typescript
import { createRover } from './domain';

// Crear un rover
const rover = createRover({
  position: { x: 0, y: 0 },
  direction: 'N',
  gridSize: { width: 10, height: 10 },
  obstacles: [{ x: 5, y: 5 }],
});

// Ejecutar comandos
const result = rover.execute('ffrff');

console.log(result);
// {
//   position: { x: 2, y: 3 },
//   direction: 'E',
//   status: 'success',
//   positionHistory: [
//     { x: 0, y: 0 },
//     { x: 0, y: 1 },
//     { x: 0, y: 2 },
//     { x: 1, y: 2 },
//     { x: 2, y: 2 },
//     { x: 2, y: 3 }
//   ]
// }
```

### Con obstáculos

```typescript
const rover = createRover({
  position: { x: 5, y: 5 },
  direction: 'N',
  gridSize: { width: 10, height: 10 },
  obstacles: [{ x: 5, y: 7 }],
});

const result = rover.execute('fff');

console.log(result);
// {
//   position: { x: 5, y: 6 },
//   direction: 'N',
//   status: 'obstacle-detected',
//   positionHistory: [
//     { x: 5, y: 5 },
//     { x: 5, y: 6 }
//   ],
//   obstaclePosition: { x: 5, y: 7 }
// }
```

## API

### Clases

#### `Rover`
Representa el rover de Marte con su estado y capacidad de ejecutar comandos.

**Constructor:**
```typescript
constructor(
  position: IPosition,
  direction: Direction,
  worldMap: WorldMap
)
```

**Métodos:**
- `getPosition(): IPosition` - Obtiene la posición actual
- `getDirection(): Direction` - Obtiene la dirección actual
- `execute(commands: string): ExecutionResult` - Ejecuta una secuencia de comandos

#### `Position`
Representa una posición en el espacio 2D.

**Constructor:**
```typescript
constructor(x: number, y: number)
```

**Métodos:**
- `equals(other: Position): boolean` - Compara dos posiciones

#### `WorldMap`
Representa el mapa del mundo donde opera el rover.

**Constructor:**
```typescript
constructor(
  width: number,
  height: number,
  obstacles?: IPosition[]
)
```

**Métodos:**
- `isValidPosition(position: Position): boolean` - Verifica si una posición es válida
- `hasObstacle(position: Position): boolean` - Verifica si hay un obstáculo
- `wrapPosition(position: Position): Position` - Maneja los bordes del mapa

### Tipos

#### `Direction`
```typescript
type Direction = 'N' | 'S' | 'E' | 'W';
```

#### `IPosition`
```typescript
interface IPosition {
  x: number;
  y: number;
}
```

#### `ExecutionResult`
```typescript
interface ExecutionResult {
  position: IPosition;
  direction: Direction;
  status: 'success' | 'obstacle-detected';
  positionHistory: IPosition[];
  obstaclePosition?: IPosition;
}
```

### Factory Function

#### `createRover(config: RoverConfig): Rover`
Crea un rover configurado.

```typescript
interface RoverConfig {
  position: IPosition;
  direction: Direction;
  gridSize: { width: number; height: number };
  obstacles?: IPosition[];
}
```

## Ejecución de Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test:watch

# Ver interfaz de testing
npm test:ui

# Generar reporte de cobertura
npm test:coverage
```

## Estadísticas

- **Total de tests**: 95
- **Tests de Position**: 9
- **Tests de WorldMap**: 19
- **Tests de Rover**: 67
  - Fase 2 (Básico): 4 tests
  - Fase 3 (Rotación): 14 tests
  - Fase 4 (Movimiento): 15 tests
  - Fase 5 (Bordes): 10 tests
  - Fase 6 (Obstáculos): 10 tests
  - Fase 7 (Integración): 14 tests

## Principios de Diseño

Esta implementación sigue varios principios SOLID y prácticas de código limpio:

- **Single Responsibility**: Cada clase tiene una única responsabilidad
- **Open/Closed**: Las clases están abiertas para extensión, cerradas para modificación
- **Liskov Substitution**: Las interfaces se implementan correctamente
- **Dependency Inversion**: Las dependencias se inyectan a través del constructor
- **DRY (Don't Repeat Yourself)**: No hay duplicación de código
- **KISS (Keep It Simple, Stupid)**: El código es simple y directo

## Estructura del Proyecto

```
domain/
├── __tests__/
│   ├── Position.test.ts       (9 tests)
│   ├── WorldMap.test.ts       (19 tests)
│   └── Rover.test.ts          (67 tests)
├── types/
│   └── index.ts               (Types y interfaces)
├── Position.ts                (Clase Position)
├── WorldMap.ts                (Clase WorldMap)
├── Rover.ts                   (Clase Rover)
├── index.ts                   (API pública)
└── README.md                  (Esta documentación)
```

## Mejoras Futuras

- Integración visual con componentes React
- Soporte para comandos más avanzados
- Múltiples rovers coordinados
- Sistema de eventos para cambios de estado
- Persistencia de estado

## Licencia

MIT
