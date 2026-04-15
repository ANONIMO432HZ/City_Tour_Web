# Design: Refactor Arquitectura Modular

## Technical Approach

El refactor descompone el monolito ineficiente de `main.js` en una arquitectura basada en componentes desacoplados y un almacén de estado (Store) reactivo. Se utilizará el patrón **Publish-Subscribe** para notificar cambios de estado a los componentes, evitando el uso de `innerHTML` sobre el contenedor principal `#app` para actualizaciones parciales.

## Architecture Decisions

### Decision: Reactividad Simple (Vanilla Store)
**Choice**: Un objeto `Store` con métodos `getState`, `setState` y un sistema de suscripción simple.
**Alternatives considered**: Redux (overkill), Global variables (no reactivo).
**Rationale**: Permite que múltiples componentes (ej. Catalog y Hero) reaccionen al mismo cambio de filtro sin necesidad de conocerse entre sí.

### Decision: Estructura de Componentes
**Choice**: Funciones constructoras/clases que reciben un contenedor y manejan su propio ciclo de vida (`mount`, `render`, `update`).
**Alternatives considered**: Solo funciones de strings (como está ahora).
**Rationale**: Facilita la limpieza de event listeners y la gestión de sub-vistas (Modal vs Catálogo) sin limpiar todo el DOM.

## Data Flow

```text
[ destinos.js ] ─── carga ──▶ [ Store ] ◀─── interactúa ─── [ Componentes ]
                                 │                                ▲
                                 └──────── notifications ─────────┘
```

1. `main.js` inicializa el `Store` con los datos de `destinos.js`.
2. Los componentes se registran (subscribe) al `Store`.
3. Cuando el usuario interactúa (ej. clic en filtro), el componente llama a `store.setState()`.
4. El `Store` actualiza el estado y notifica a todos los suscriptores.
5. Cada suscriptor ejecuta su método `render()` o `update()` si es necesario.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/main.js` | Modify | Orquestador de arranque. Inicializa el Store y monta los componentes. |
| `src/data/destinos.js` | Create | Exporta la constante `imageFiles` y configuraciones estáticas. |
| `src/store.js` | Create | Lógica del Store (observable state). |
| `src/components/Navbar.js` | Create | Lógica de navegación y branding. |
| `src/components/Hero.js` | Create | Sección de cabecera dinámica. |
| `src/components/Catalog.js` | Create | Grilla de destinos y filtros. |
| `src/components/Modal.js` | Create | Vista de detalle y Lightbox. |
| `index.html` | Modify | Remover scripts duplicados y handlers `window.*`. |

## Interfaces / Contracts

### Store Interface
```javascript
{
  state: {
    view: 'catalogo' | 'mapa',
    filter: 'Todos',
    zones: Array,
    activeZoneId: Number | null
  },
  subscribe(fn): Function (unsubscribe),
  setState(updates): void
}
```

### Component Protocol
```javascript
class Component {
  constructor(container, store) { ... }
  render() { ... } // Genera el HTML/DOM
  mount() { ... }  // Inserta en el container e inicializa Lucide
}
```

## Testing Strategy
| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual | Filtrado | Verificar que al clickear "Naturaleza" solo queden los destinos correctos. |
| Manual | Navegación | Verificar cambio de vista Catálogo -> Mapa sin error de consola. |
| Manual | Performance | Revisar que solo el componente afectado se actualice en el DOM Inspector. |

## Migration / Rollout
No se requiere migración de datos. El refactor se implementará en caliente reemplazando la lógica de `main.js`.
