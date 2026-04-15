# Core Modular Architecture Specification

## Purpose

Define la estructura fundamental del proyecto City_Tour_Web utilizando un enfoque modular en Vanilla JS. Esta arquitectura permite la separación de datos, lógica de estado y representación visual (UI).

## Requirements

### Requirement: Data Isolation
El sistema DEBERÁ mantener los datos de los destinos turísticos aislados de cualquier lógica de renderizado o manipulación del DOM.
- Los datos DEBERÁN exportarse desde un módulo dedicado (`destinos.js`).
- Los componentes NO DEBERÁN modificar los datos originales; DEBERÁN tratarlos como inmutables para el renderizado.

#### Scenario: Acceso a datos centralizados
- GIVEN un componente del sistema (ej. Catálogo)
- WHEN se requiere mostrar la lista de destinos
- THEN el componente DEBERÁ importar los datos desde `@/data/destinos.js`
- AND DEBERÁ filtrar y mapear los datos sin alterar el origen.

### Requirement: Centralized State Store
El sistema DEBERÁ poseer un almacén de estado (Store) centralizado para gestionar la vista actual, los filtros activos y la selección de zonas.
- El estado DEBERÁ ser la única fuente de verdad para la UI.
- Los cambios en el estado DEBERÁN notificar a los suscriptores/componentes interesados.

#### Scenario: Cambio de filtro reactivo
- GIVEN el usuario se encuentra en la vista de Catálogo
- WHEN el usuario cambia el filtro a "Naturaleza"
- THEN el Store DEBERÁ actualizar el estado interno `currentFilter`
- AND el componente `Catalog` DEBERÁ redibujarse automáticamente con los datos filtrados.

### Requirement: Component Decoupling
Los componentes DEBERÁN ser modularmente independientes y comunicarse únicamente a través del Store o callbacks.
- Los componentes NO DEBERÁN usar el objeto global `window` para exponer funciones.
- La navegación y el filtrado DEBERÁN dispararse mediante eventos o acciones del Store.

#### Scenario: Navegación sin contaminación global
- GIVEN el componente `Navbar`
- WHEN el usuario hace clic en "Rutas GPS"
- THEN el Navbar DEBERÁ invocar una acción del Store (ej. `store.setView('mapa')`)
- AND NO DEBERÁ existir una llamada a `window.setView()` en el DOM.

### Requirement: Single-Responsibility Rendering
Cada parte de la UI (Navbar, Hero, Catalog, Modal) DEBERÁ tener su propia lógica de renderizado encapsulada.
- Los componentes DEBERÁN evitar el uso de `innerHTML` sobre el contenedor principal (`#app`) para actualizaciones menores.
- DEBERÁN preferir la actualización de nodos específicos o el uso de fragmentos de documento.

#### Scenario: Apertura de Modal eficiente
- GIVEN el usuario está viendo el catálogo
- WHEN hace clic en una tarjeta de destino
- THEN el componente `Modal` DEBERÁ actualizar su contenido interno
- AND se DEBERÁ mostrar sin afectar el renderizado de la galería de fondos.
