# Tasks: Refactor Arquitectura Modular

## Phase 1: Foundation (Data & Store)

- [x] 1.1 Crear `src/data/destinos.js` extrayendo la data de `imageFiles` y `statusConfig`.
- [x] 1.2 Crear `src/store.js` con el patrón Store (state, setState, subscribe).
- [x] 1.3 Configurar el estado inicial (view: 'catalogo', filter: 'Todos', activeZoneId: null).

## Phase 2: Component Implementation

- [ ] 2.1 Crear `src/components/Navbar.js` como componente modular.
- [ ] 2.2 Crear `src/components/Hero.js` que reaccione al cambio de vista.
- [ ] 2.3 Crear `src/components/Catalog.js` encapsulando filtros y grilla de cards.
- [ ] 2.4 Crear `src/components/Modal.js` manejando el estado de `activeZoneId`.

## Phase 3: Integration & Wiring

- [ ] 3.1 Refactorizar `src/main.js` para inicializar el Store y montar los componentes.
- [ ] 3.2 Limpiar `index.html` eliminando scripts redundantes y handlers `window.*`.
- [ ] 3.3 Implementar re-inicialización de Lucide Icons en el ciclo de actualización de componentes.

## Phase 4: Verification & Cleanup

- [ ] 4.1 Verificar persistencia de vistas al navegar (Catálogo <-> Rutas GPS).
- [ ] 4.2 Probar reactividad de filtros en el componente `Catalog`.
- [ ] 4.3 Validar apertura de Modal y navegación interna (flechas/swipe).
- [ ] 4.4 Eliminar el código legacy comentado en `main.js`.
