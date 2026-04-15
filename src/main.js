import './style.css';
import { store } from './store.js';
import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { Catalog } from './components/Catalog.js';
import { Modal } from './components/Modal.js';

function initApp() {
  const navbarContainer = document.querySelector('#navbar-container');
  const heroContainer = document.querySelector('#hero-container');
  const catalogContainer = document.querySelector('#catalog-container');
  const modalElement = document.querySelector('#image-modal');

  // Inicializar componentes
  const navbar = new Navbar(navbarContainer);
  const hero = new Hero(heroContainer);
  const catalog = new Catalog(catalogContainer);
  const modal = new Modal(modalElement);

  // Cargar datos desde la API
  store.fetchInitialData();

  // Montar componentes
  navbar.mount();
  hero.mount();
  catalog.mount();

  // Inicializar Lucide Icons por primera vez
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);
