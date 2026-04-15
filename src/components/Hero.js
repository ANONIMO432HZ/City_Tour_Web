import { store } from '../store.js';

export class Hero {
  constructor(container) {
    this.container = container;
    this.store = store;
    this.store.subscribe(() => this.render());
  }

  render() {
    const { view, zones } = this.store.getState();
    
    if (view === 'catalogo') {
      this.container.innerHTML = `
        <header class="relative pt-32 pb-24 px-8 overflow-hidden">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] bg-emerald-600/10 blur-[180px] rounded-full -z-10 animate-pulse"></div>
          <div class="max-w-5xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[11px] font-black uppercase tracking-[0.3em] mb-10 shadow-xl">
               <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               Estado Turístico Actual
            </div>
            <h1 class="text-7xl md:text-9xl font-black mb-10 leading-[0.85] tracking-tighter">
              Explora la Bella <br/>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">Esmeralda de los Andes.</span>
            </h1>
            <p class="text-slate-400 text-lg md:text-2xl mb-14 max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
              Descubre la magia, cultura y afluencia de los ${zones.length} destinos más emblemáticos. Haz clic para ampliar cada maravilla.
            </p>
            <a href="#catalogo" class="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-emerald-600/40 inline-block hover:-translate-y-1">
              Explorar Catálogo
            </a>
          </div>
        </header>
      `;
    } else if (view === 'mapa') {
      this.container.innerHTML = `
        <header class="relative pt-24 pb-16 px-8 overflow-hidden text-center">
          <h1 class="text-6xl md:text-7xl font-black mb-6 tracking-tighter text-white uppercase font-outfit">Rutas Dinámicas</h1>
          <p class="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium opacity-80 decoration-emerald-500/30">Trazamos tu camino hacia la aventura con mapas interactivos y rutas GPS precisas.</p>
        </header>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  mount() {
    this.render();
  }
}
