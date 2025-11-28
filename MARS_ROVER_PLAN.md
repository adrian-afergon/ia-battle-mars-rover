# Plan de Implementación - Mars Rover Kata

## Resumen de la Kata

La Mars Rover Kata es una kata incremental que simula el control remoto de un vehículo en la superficie de Marte. El objetivo es desarrollar una API que traduzca comandos enviados desde la Tierra en instrucciones comprensibles para el rover.

## Requisitos Identificados

1. **Posición inicial**: El rover tiene una posición inicial (x, y) y una dirección (N, S, E, W)
2. **Comandos**: El rover recibe un array de caracteres como comandos:
   - `f` - avanzar hacia adelante
   - `b` - retroceder
   - `l` - girar a la izquierda
   - `r` - girar a la derecha
3. **Wrapping en bordes**: El mapa es plano, por lo que al llegar al borde colapsa y no se mueve.
4. **Detección de obstáculos**: Antes de cada movimiento, verificar si hay un obstáculo. Si lo hay, el rover se detiene en la última posición válida y reporta el obstáculo

## Enfoque TDD

Seguiremos un enfoque de **Test-Driven Development (TDD)** estricto:
- Escribir el test primero (RED)
- Implementar el mínimo código para que pase (GREEN)
- Refactorizar (REFACTOR)

---

## DUDAS Y DECISIONES DE DISEÑO
### 💡 Decisiones propuestas (por defecto):

1. **Tamaño del mapa**: El tamaño del mapa será parametrizable.
2. **Formato de comandos**: Los comandos vendrán como array de strings (["f", "f", "l", "r"])
3. **Obstáculos**: los obstáculos inicialmente como Array de posiciones [(x,y), ...] parametrizable.
4. **Respuesta del API**: Debe devolver
   - Posición final + dirección
   - Historial de posiciones
   - En caso de encontrar un obstáculo devuelve la posición antes de encontrarse con el obstáculo y el historial de decisiones
5. **Framework de testing**: Vitest
6. **Estructura de carpetas**: El codigo se ubicará en `src/ai-battle/domain/`

---

## PLAN DE IMPLEMENTACIÓN

### 📋 FASE 0: Preparación del entorno
**Objetivo**: Configurar el entorno de testing y estructura de carpetas

#### Pasos:
1. Instalar Jest y dependencias necesarias para TypeScript
2. Configurar Jest (jest.config.js)
3. Crear estructura de carpetas:
   ```
   src/ai-battle/lib/mars-rover/
   ├── __tests__/
   │   ├── Rover.test.ts
   │   ├── Position.test.ts
   │   └── Grid.test.ts
   ├── Rover.ts
   ├── Position.ts
   ├── Direction.ts
   ├── Grid.ts
   └── index.ts
   ```
4. Añadir script de test en package.json

**Resultado esperado**: Entorno de testing funcionando, estructura de carpetas creada

---

### 📋 FASE 1: Modelado básico (sin movimiento)
**Objetivo**: Crear las entidades básicas con sus tipos

> Referenciar el concepto `grid` como `WorldMap`.

#### Paso 1.1: Crear tipos básicos
- Crear type `Direction` = 'N' | 'S' | 'E' | 'W'
- Crear la clase `Position` con x, y
- **Test**: Verificar tipos (opcional con TypeScript)

#### Paso 1.2: Implementar clase Position
- Constructor con x, y
- Método `equals(other: Position): boolean`
- **Tests**:
  - Crear posición
  - Comparar posiciones iguales
  - Comparar posiciones diferentes

#### Paso 1.3: Crear clase WorldMap
- Constructor con width, height, obstacles
- Método `isValidPosition(position: Position): boolean`
- Método `hasObstacle(position: Position): boolean`
- Método `wrapPosition(position: Position): Position`
- **Tests**:
  - Crear WorldMap - Validar posiciones dentro del WorldMap
  - Detectar obstáculos
  - Wrapping en todos los bordes (norte, sur, este, oeste)

**Resultado esperado**: Clases Position y WorldMap completamente testeadas

---

### 📋 FASE 2: Rover básico (posición y dirección)
**Objetivo**: Crear el Rover con capacidad de almacenar estado

#### Paso 2.1: Crear clase Rover
- Constructor con position, direction, WorldMap
- Getters para position y direction
- **Tests**:
  - Crear rover con posición y dirección inicial
  - Obtener posición actual
  - Obtener dirección actual

**Resultado esperado**: Rover puede mantener estado

---

### 📋 FASE 3: Rotación (comandos L y R)
**Objetivo**: Implementar giros sin movimiento

#### Paso 3.1: Implementar rotación a la izquierda (L)
- Método privado `turnLeft(): void`
- **Tests**:
  - N → W → S → E → N (ciclo completo)

#### Paso 3.2: Implementar rotación a la derecha (R)
- Método privado `turnRight(): void`
- **Tests**:
  - N → E → S → W → N (ciclo completo)

#### Paso 3.3: Integrar comandos de rotación
- Método `execute(commands: string): ExecutionResult`
- Procesar comandos 'l' y 'r'
- **Tests**:
  - Ejecutar "ll" (dos giros a la izquierda)
  - Ejecutar "rr" (dos giros a la derecha)
  - Ejecutar "lr" (giro izquierda + derecha = posición original)
  - Ejecutar "rrrrr" (más de 360 grados)

**Resultado esperado**: Rover puede girar correctamente

---

### 📋 FASE 4: Movimiento básico (comandos F y B)
**Objetivo**: Implementar movimiento hacia adelante y atrás

#### Paso 4.1: Implementar cálculo de siguiente posición
- Método privado `getNextPosition(forward: boolean): Position`
- Considerar la dirección actual
- **Tests**:
  - Calcular posición siguiente mirando al norte (y+1)
  - Calcular posición siguiente mirando al sur (y-1)
  - Calcular posición siguiente mirando al este (x+1)
  - Calcular posición siguiente mirando al oeste (x-1)

#### Paso 4.2: Implementar movimiento hacia adelante (F)
- Método privado `moveForward(): boolean`
- Retorna false si hay obstáculo
- **Tests**:
  - Mover hacia adelante sin obstáculos
  - Mover hacia adelante con obstáculo (no se mueve)

#### Paso 4.3: Implementar movimiento hacia atrás (B)
- Método privado `moveBackward(): boolean`
- Retorna false si hay obstáculo
- **Tests**:
  - Mover hacia atrás sin obstáculos
  - Mover hacia atrás con obstáculo (no se mueve)

#### Paso 4.4: Integrar comandos de movimiento
- Actualizar método `execute(commands: string): ExecutionResult`
- Procesar comandos 'f' y 'b'
- **Tests**:
  - Ejecutar "ff" (dos movimientos adelante)
  - Ejecutar "bb" (dos movimientos atrás)
  - Ejecutar "ffbb" (adelante y atrás = posición original)
  - Ejecutar comandos mixtos "ffrff"

**Resultado esperado**: Rover puede moverse en todas las direcciones

---

### 📋 FASE 5: Wrapping en bordes
**Objetivo**: El rover no continúa al alcanzar un borde. Se comporta como si fuese un obstáculo

#### Paso 5.1: Integrar wrapping con movimiento
- El método `moveForward()` y `moveBackward()` usan `grid.wrapPosition()`
- **Tests**:
  - Rover en (0, 5) mirando W, ejecutar "f" → posición (0, 5)
  - Rover en (9, 5) mirando E, ejecutar "f" → posición (9, 5)
  - Rover en (5, 0) mirando S, ejecutar "f" → posición (5, 0)
  - Rover en (5, 9) mirando N, ejecutar "f" → posición (5, 9)

**Resultado esperado**: Rover maneja correctamente los bordes del mapa

---

### 📋 FASE 6: Detección de obstáculos
**Objetivo**: Detener movimiento y reportar obstáculos

#### Paso 6.1: Mejorar ExecutionResult
- Añadir información sobre obstáculos encontrados
- **Tests**:
  - Ejecutar comando que encuentra obstáculo
  - Verificar que el rover se detiene antes del obstáculo
  - Verificar que se reporta la posición del obstáculo
  - Verificar la última posición válida

#### Paso 6.2: Detección durante secuencia de comandos
- Si se encuentra obstáculo, abortar secuencia
- **Tests**:
  - Ejecutar "fff" con obstáculo en el segundo movimiento
  - Verificar que solo se ejecuta el primer movimiento
  - Ejecutar "ffrf" con obstáculo después del giro
  - Wrapping con obstáculo en posición envuelta

**Resultado esperado**: Sistema completo de detección de obstáculos

---

### 📋 FASE 7: Integración y casos edge
**Objetivo**: Asegurar robustez del código

#### Paso 7.1: Tests de integración complejos
- **Tests**:
  - Secuencia larga de comandos mixtos
  - Comandos inválidos lanzar error
  - String vacío de comandos
  - Rover rodeado de obstáculos

#### Paso 7.2: Tests de casos extremos
- **Tests**:
  - Grid de tamaño 1x1
  - Grid completamente lleno de obstáculos excepto posición inicial
  - Posición inicial en esquina
  - Comandos de retroceso sobre obstáculos

**Resultado esperado**: Código robusto y bien testeado

---

### 📋 FASE 8: Documentación y API pública
**Objetivo**: Crear interfaz pública limpia y documentación

#### Paso 8.1: Crear API facade
- Archivo `index.ts` con exports públicos
- Función factory para crear Rover fácilmente
- **Ejemplo de uso**:
  ```typescript
  const rover = createRover({
    position: {x: 0, y: 0},
    direction: 'N',
    gridSize: {width: 10, height: 10},
    obstacles: [{x: 2, y: 2}, {x: 3, y: 5}]
  });
  
  const result = rover.execute("ffrff");
  ```

#### Paso 8.2: Documentación
- README.md específico para la kata
- Ejemplos de uso
- Documentación de la API con JSDoc

**Resultado esperado**: API clara y bien documentada

---

### 📋 FASE 9: Visualización
**Objetivo**: Crear interfaz visual en Next.js

#### Paso 9.1: Componente de visualización
- Grid visual del mapa
- Mostrar rover con dirección
- Mostrar obstáculos
- Input para comandos
- Botón para ejecutar

#### Paso 9.2: Animación
- Animar movimientos del rover
- Mostrar trayectoria

**Resultado esperado**: Demo visual funcionando

---

## Estructura de archivos final

```
src/ai-battle/domain/
├── __tests__/
│   ├── Position.test.ts
│   ├── Grid.test.ts
│   ├── Rover.test.ts
│   └── integration.test.ts
├── types/
│   └── index.ts                 # Direction, IPosition, ExecutionResult
├── Position.ts
├── Grid.ts
├── Rover.ts
├── index.ts                     # API pública
└── README.md

src/ai-battle/app/
├── page.tsx
└── components/
    ├── GridView.tsx
    └── RoverController.tsx
```

---

## Checklist de progreso

### Fase 0: Preparación ✅
- [x] Vitest instalado y configurado
- [x] Estructura de carpetas creada
- [x] Scripts de test añadidos a package.json

### Fase 1: Modelado básico ✅
- [x] Tipos básicos definidos (Direction, IPosition, ExecutionResult)
- [x] Clase Position con tests (28 tests: creación, equals, toString)
- [x] Clase WorldMap con tests (19 tests: validación, obstáculos, wrapping)

### Fase 2: Rover básico ✅
- [x] Clase Rover con estado inicial
- [x] Tests de creación y getters (4 tests)

### Fase 3: Rotación ✅
- [x] Giro izquierda implementado y testeado (N->W->S->E->N)
- [x] Giro derecha implementado y testeado (N->E->S->W->N)
- [x] Comando execute procesa 'l' y 'r' (14 tests de rotación)

### Fase 4: Movimiento básico ✅
- [x] Cálculo de siguiente posición
- [x] Movimiento adelante implementado y testeado
- [x] Movimiento atrás implementado y testeado
- [x] Comando execute procesa 'f' y 'b' (15 tests de movimiento)

### Fase 5: Wrapping ✅
- [x] Bordes actúan como obstáculos (no se continúa, se detiene)
- [x] Integración con movimientos testeado (10 tests de bordes)
- [x] Reporte correcto de posición de obstáculo fuera del mapa

### Fase 6: Obstáculos ✅
- [x] Detección de obstáculos
- [x] Abortar secuencia al encontrar obstáculo
- [x] Reportar información de obstáculo (10 tests de obstáculos)

### Fase 7: Integración ✅
- [x] Tests de integración complejos (14 tests)
- [x] Tests de casos extremos (grids 1x1, muy grandes, etc)
- [x] Manejo de errores y edge cases completo

### Fase 8: Documentación ⬜
- [ ] API pública limpia
- [ ] README con ejemplos
- [ ] JSDoc completo

### Fase 9: Visualización (opcional) ⬜
- [ ] Componente React del grid
- [ ] Controlador de comandos
- [ ] Página Next.js funcionando

---

## Estimación de tiempo

- **Fase 0**: 15-20 minutos
- **Fase 1**: 30-40 minutos
- **Fase 2**: 15-20 minutos
- **Fase 3**: 25-30 minutos
- **Fase 4**: 40-50 minutos
- **Fase 5**: 20-30 minutos
- **Fase 6**: 30-40 minutos
- **Fase 7**: 30-40 minutos
- **Fase 8**: 20-30 minutos
- **Fase 9**: 60-90 minutos (opcional)

**Total estimado (sin UI)**: 3.5 - 4.5 horas
**Total con UI**: 5 - 6 horas

---

## Notas adicionales

### Principios a seguir:
- **YAGNI** (You Aren't Gonna Need It): No añadir funcionalidad que no se necesita ahora
- **KISS** (Keep It Simple, Stupid): Mantener el código simple
- **DRY** (Don't Repeat Yourself): Evitar duplicación de código
- **Single Responsibility**: Cada clase tiene una única responsabilidad

### Reglas TDD:
1. No escribir código de producción sin un test que falle primero
2. No escribir más de un test que sea suficiente para fallar
3. No escribir más código de producción del necesario para pasar el test

### Convenciones de código:
- Nombres de clases en PascalCase
- Nombres de métodos y variables en camelCase
- Métodos privados prefijados con guión bajo si es necesario (opcional)
- Tests descriptivos con formato: "should [expected behavior] when [condition]"

---

## ¿Listo para comenzar?

Una vez revisado y resueltas las dudas, podemos proceder fase por fase. Confirma las decisiones propuestas o indica los cambios necesarios para comenzar con la **Fase 0**.
