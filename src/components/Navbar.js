import { store } from '../store.js';

export class Navbar {
  constructor(container) {
    this.container = container;
    this.store = store;
    this.store.subscribe(() => this.render());
  }

  render() {
    const { view } = this.store.getState();
    
    this.container.innerHTML = `
      <nav class="sticky top-0 z-50 glass px-8 py-5 flex items-center justify-between border-b border-white/10 shadow-2xl">
        <div id="logo-branding" class="flex items-center gap-3 cursor-pointer group">
          <div class="w-11 h-11 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <i data-lucide="map-pin" class="text-white w-6 h-6"></i>
          </div>
          <div class="flex flex-col">
            <span class="text-2xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400 font-outfit uppercase tracking-tighter">HuantaTour</span>
            <span class="text-[10px] text-emerald-400 font-bold tracking-[0.25em] uppercase">La Bella Esmeralda de los Andes</span>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-8 text-[10px] font-black text-slate-400 tracking-[0.3em]">
          <button id="nav-catalogo" class="uppercase transition-all ${view === 'catalogo' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : 'hover:text-emerald-400'}">Catálogo</button>
          <button id="nav-mapa" class="uppercase transition-all ${view === 'mapa' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : 'hover:text-emerald-400'}">Rutas GPS</button>
          <button class="uppercase transition-all hover:text-emerald-400">Festividades</button>
        </div>
        <button class="md:hidden p-3 hover:bg-white/5 rounded-2xl text-slate-400">
          <i data-lucide="menu"></i>
        </button>
      </nav>
    `;

    this.setupEvents();
    if (window.lucide) window.lucide.createIcons();
  }

  setupEvents() {
    this.container.querySelector('#logo-branding')?.addEventListener('click', () => {
      this.store.setState({ view: 'catalogo', activeMapId: null });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.container.querySelector('#nav-catalogo')?.addEventListener('click', () => {
      this.store.setState({ view: 'catalogo', activeMapId: null });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.container.querySelector('#nav-mapa')?.addEventListener('click', () => {
      this.store.setState({ view: 'mapa', activeMapId: null });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  mount() {
    this.render();
  }
}
