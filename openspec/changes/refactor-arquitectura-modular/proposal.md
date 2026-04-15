# Proposal: Refactor Arquitectura Modular

## Intent

El proyecto actual tiene una arquitectura monolítica en `main.js` que mezcla datos, lógica de negocio y renderizado. Esto dificulta el mantenimiento y degrada la performance por el uso excesivo de `innerHTML`. El objetivo es separar responsabilidades y modernizar la estructura sin usar frameworks pesados (Vanilla JS Modular).

## Scope

### In Scope
- **Extracción de Datos**: Mover los 25 destinos a un archivo `src/data/destinos.js`.
- **Arquitectura de Componentes**: Crear módulos independientes para `Navbar`, `Hero`, `Catalog` y `Modal`.
- **Gestión de Estado**: Crear un `store.js` simple para manejar la vista actual y los filtros sin contaminar el objeto `window`.
- **Optimización de Renderizado**: Reemplazar el reemplazo total del DOM por actualizaciones puntuales o componentes autocontenidos.
- **Cleanup de Eventos**: Delegación de eventos centralizada para evitar fugas de memoria y selectores repetitivos.

### Out of Scope
- Migración a React/Vue/Svelte (se mantiene en Vanilla JS).
- Creación de nuevas secciones de contenido (Festividades, etc.).
- Cambio radical del diseño visual (Emerald Aesthetic se mantiene).

## Capabilities

### New Capabilities
- `core-modular-architecture`: Estructura base modular para el proyecto que permite añadir nuevas zonas y secciones sin modificar el código core.

### Modified Capabilities
- None

## Approach

1. **Desacoplamiento**: Extraer los datos a un módulo ES6.
2. **Componentización**: Cada sección de la UI se convierte en una función/clase que devuelve un nodo DOM o maneja su propio fragmento.
3. **Reactive Store**: El `store.js` notificará a los componentes cuando cambie el filtro o la vista.
4. **Vite entry point**: `main.js` solo orquestará el arranque de los módulos.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/main.js` | Modified | Se reduce a un orquestador de componentes. |
| `src/data/destinos.js` | New | Albergará la data de las 25 zonas turísticas. |
| `src/components/` | New | Directorio para componentes modulares. |
| `src/store.js` | New | Manejo de estado de la aplicación. |
| `index.html` | Modified | Limpieza de scripts y tags redundantes. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Regresión en filtros | Low | Pruebas manuales exhaustivas post-refactor. |
| Rotura de paths de imágenes | Med | Centralizar la resolución de URLs en el store o data loader. |
| Problemas de Lucide Icons | Low | Asegurar que `lucide.createIcons()` se llame tras cada actualización de componente. |

## Rollback Plan

El cambio se realizará en una rama separada (o commit atómico) que permite volver al `main.js` original si la complejidad supera los beneficios inmediatos o se rompe la interactividad.

## Dependencies

- Navegador moderno compatible con ES Modules (ya requerido por Vite).

## Success Criteria

- [ ] `main.js` reducido de 322 líneas a menos de 100.
- [ ] Datos totalmente aislados de la lógica de renderizado.
- [ ] Cero uso de `window.*` para funciones de filtrado o navegación.
- [ ] Interactividad idéntica o superior (más fluida).
