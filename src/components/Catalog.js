import { store } from '../store.js';
import { statusConfig } from '../data/destinos.js';

export class Catalog {
  constructor(container) {
    this.container = container;
    this.store = store;
    this.store.subscribe(() => this.render());
  }

  render() {
    const { view, filter, zones, activeMapId } = this.store.getState();
    const filteredZones = filter === 'Todos' ? zones : zones.filter(z => z.category === filter);

    this.container.innerHTML = view === 'catalogo' 
      ? this.renderGallery(filteredZones, filter) 
      : this.renderMapCatalog(zones, activeMapId);

    this.setupEvents(view);
    if (window.lucide) window.lucide.createIcons();
  }

  renderGallery(zones, currentFilter) {
    return `
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 border-b border-white/10 pb-12">
        <div>
          <h2 class="text-4xl font-black mb-3 tracking-tight">Galería de Destinos</h2>
          <p class="text-slate-500 text-base italic font-medium">Mostrando las ${zones.length} maravillas que hacen único a nuestro valle.</p>
        </div>
        <div id="filter-container" class="flex flex-wrap gap-3">
          ${['Todos', 'Naturaleza', 'Aventura', 'Religioso', 'Ciudad', 'Mirador', 'Cultura', 'Arquitectura'].map(cat => `
            <button 
              data-filter="${cat}" 
              class="filter-btn px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${currentFilter === cat ? 'bg-emerald-600 border border-emerald-500 shadow-lg shadow-emerald-600/20 text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'}"
            >
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        ${zones.map((zone) => this.renderCard(zone)).join('')}
      </div>
    `;
  }

  renderCard(zone) {
    const cfg = statusConfig[zone.status];
    return `
      <div 
        class="zone-card group relative bg-slate-900/40 border-2 border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:bg-slate-900/60 hover:border-emerald-500/30 hover:scale-[1.03] cursor-pointer shadow-xl hover:shadow-emerald-900/20"
        data-id="${zone.id}"
      >
        <div class="relative h-72 overflow-hidden">
          <img src="${zone.image}" alt="${zone.name}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-emerald-950/30 backdrop-blur-[3px]">
             <div class="bg-white/10 p-5 rounded-full backdrop-blur-2xl border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-700">
               <i data-lucide="maximize-2" class="text-white w-7 h-7"></i>
             </div>
          </div>

          <div class="absolute top-5 left-5">
            <span class="px-4 py-2 rounded-full text-[10px] font-black border-2 flex items-center gap-2 ${cfg.color} backdrop-blur-2xl uppercase tracking-[0.15em] shadow-2xl">
              <i data-lucide="${cfg.icon}" class="w-3.5 h-3.5"></i>
              ${cfg.label}
            </span>
          </div>
        </div>
        
        <div class="p-8 relative">
          <span class="text-[10px] text-emerald-500 font-black mb-2 block uppercase tracking-[0.25em] font-outfit">${zone.category}</span>
          <h3 class="text-2xl font-black text-white mb-3 tracking-tighter group-hover:text-emerald-400 transition-colors">${zone.name}</h3>
          <p class="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 font-medium opacity-80">${zone.desc}</p>
          
          <div class="flex items-center justify-between border-t border-white/10 pt-6">
             <div class="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden mr-5 shadow-inner">
                <div class="h-full rounded-full transition-all duration-1000 ${zone.occupancy > 70 ? 'bg-amber-500' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'}" style="width: ${zone.occupancy}%"></div>
             </div>
             <span class="text-xs font-black text-slate-400 font-outfit uppercase tracking-tighter">${zone.occupancy}%</span>
          </div>
        </div>
      </div>
    `;
  }

  renderMapCatalog(zones, activeMapId) {
    return `
      <div class="columns-1 lg:columns-2 gap-10">
        ${zones.map(zone => `
          <div class="break-inside-avoid mb-10 w-full bg-slate-900/60 border-2 border-white/5 rounded-[3rem] p-8 lg:p-10 flex flex-col gap-8 transition-all hover:border-emerald-500/30 shadow-2xl ${activeMapId === zone.id ? 'border-emerald-500/50 scale-[1.02]' : ''}">
            <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div class="flex items-center gap-5 flex-1 min-w-0">
                 <div class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white/5 rounded-[2rem] flex items-center justify-center overflow-hidden border-2 border-white/10 shadow-2xl group/thumb relative transition-all duration-500 hover:border-emerald-500/40">
                   <img src="${zone.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110" />
                   <div class="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity"></div>
                 </div>
                 <div class="flex-1 min-w-0">
                   <h3 class="font-black text-white text-xl md:text-2xl lg:text-3xl tracking-tighter leading-[1.2]">${zone.name}</h3>
                   <span class="text-[10px] text-emerald-500 uppercase font-black tracking-[0.2em] md:tracking-[0.3em] font-outfit mt-1.5 block opacity-90">${zone.category}</span>
                 </div>
              </div>
              
              <div class="flex gap-3 flex-shrink-0">
                 <button data-toggle-map="${zone.id}" class="toggle-map-btn flex-1 xl:flex-none px-6 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2.5 uppercase tracking-widest outline-none shadow-xl">
                   <i data-lucide="${activeMapId === zone.id ? 'eye-off' : 'map-pinned'}" class="w-4 h-4"></i>
                   ${activeMapId === zone.id ? 'Ocultar' : 'Mapa'}
                 </button>
                 <a href="${zone.routeUrl}" target="_blank" class="flex-1 xl:flex-none px-6 py-3.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black hover:bg-emerald-500 transition-all shadow-2xl flex items-center justify-center gap-2.5 uppercase tracking-widest shadow-emerald-600/20">
                   <i data-lucide="route" class="w-4 h-4"></i>
                   Ruta
                 </a>
              </div>
            </div>

            ${activeMapId === zone.id ? `
              <div class="w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden border-2 border-emerald-500/20 shadow-inner animate-fadeIn relative">
                  <iframe 
                    src="${zone.embed}" 
                    class="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    style="border:0;" 
                    allowfullscreen="" 
                    referrerpolicy="no-referrer-when-downgrade">
                  </iframe>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  setupEvents(view) {
    if (view === 'catalogo') {
      this.container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.store.setState({ filter: btn.dataset.filter });
        });
      });

      this.container.querySelectorAll('.zone-card').forEach(card => {
        card.addEventListener('click', () => {
          this.store.setState({ activeZoneId: parseInt(card.dataset.id) });
        });
      });
    } else {
      this.container.querySelectorAll('.toggle-map-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.toggleMap);
          const currentActive = this.store.getState().activeMapId;
          this.store.setState({ activeMapId: currentActive === id ? null : id });
        });
      });
    }
  }

  mount() {
    this.render();
  }
}
