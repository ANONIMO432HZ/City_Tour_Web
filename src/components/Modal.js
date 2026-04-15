import { store } from '../store.js';

export class Modal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.store = store;
    this.view = 'detail'; // detail | booking | success
    this.currentZone = null;
    this.store.subscribe((state) => this.handleStateChange(state));
    this.setupEvents();
  }

  handleStateChange(state) {
    if (state.activeZoneId !== null) {
      if (!this.currentZone || this.currentZone.id !== state.activeZoneId) {
        this.view = 'detail';
        this.open(state.activeZoneId);
      }
    } else {
      this.close();
    }
  }

  open(zoneId) {
    const { zones } = this.store.getState();
    this.currentZone = zones.find(z => z.id === zoneId);
    if (!this.currentZone) return;

    this.render();
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    this.modal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
    document.body.style.overflow = '';
    this.currentZone = null;
  }

  render() {
    const modalImg = this.modal.querySelector('#modal-img');
    const contentArea = this.modal.querySelector('#modal-content-area');

    if (modalImg) modalImg.src = this.currentZone.image;

    if (this.view === 'detail') {
      contentArea.innerHTML = `
        <div class="text-center">
          <span class="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] mb-2 block">${this.currentZone.category}</span>
          <div class="flex items-center justify-center gap-3 mb-4">
            <h3 class="text-3xl font-black text-white tracking-tighter">${this.currentZone.name}</h3>
            <a href="${this.currentZone.routeUrl}" target="_blank" class="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 transition-all" title="Ver en Google Maps">
              <i data-lucide="navigation" class="w-5 h-5"></i>
            </a>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-8">${this.currentZone.descripcion || this.currentZone.desc}</p>
          
          <button id="start-booking" class="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20">
            Reservar Cupos Ahora
          </button>
        </div>
      `;
    } else if (this.view === 'booking') {
      contentArea.innerHTML = `
        <div class="animate-fadeIn">
          <h3 class="text-2xl font-black text-white tracking-tighter mb-6 text-center">Confirmar Reserva</h3>
          <form id="booking-form" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="nombre" placeholder="Nombre Completo" required class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all">
              <input type="text" name="documento" placeholder="DNI / Pasaporte" required class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all">
            </div>
            <input type="email" name="email" placeholder="Correo Electrónico" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all">
            <div class="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl mt-4">
               <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Precio por Persona</span>
               <span class="text-xl font-black text-emerald-400 font-outfit">S/ ${this.currentZone.precio_base_adulto}</span>
            </div>
            <div class="flex gap-3 pt-4">
              <button type="button" id="cancel-booking" class="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Cancelar</button>
              <button type="submit" class="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2">
                Finalizar Reserva <i data-lucide="check-circle" class="w-4 h-4"></i>
              </button>
            </div>
          </form>
        </div>
      `;
    } else if (this.view === 'success') {
      contentArea.innerHTML = `
        <div class="text-center py-6 animate-fadeIn">
          <div class="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <i data-lucide="check" class="text-emerald-500 w-12 h-12"></i>
          </div>
          <h3 class="text-3xl font-black text-white tracking-tighter mb-2">¡Reserva Exitosa!</h3>
          <p class="text-slate-400 font-medium mb-8">Te enviamos los detalles a tu correo. Prepárate para la aventura.</p>
          <button id="close-success" class="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Volver al Catálogo</button>
        </div>
      `;
    }

    this.setupDynamicEvents();
    if (window.lucide) window.lucide.createIcons();
  }

  setupDynamicEvents() {
    this.modal.querySelector('#start-booking')?.addEventListener('click', () => {
      this.view = 'booking';
      this.render();
    });

    this.modal.querySelector('#cancel-booking')?.addEventListener('click', () => {
      this.view = 'detail';
      this.render();
    });

    this.modal.querySelector('#close-success')?.addEventListener('click', () => {
      this.store.setState({ activeZoneId: null });
    });

    const form = this.modal.querySelector('#booking-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = {
        cliente: {
          nombre: formData.get('nombre'),
          documento: formData.get('documento'),
          email: formData.get('email'),
          telefono: '999999999' // Placeholder
        },
        tour_id: this.currentZone.id,
        pasajeros: [
          {
            nombre: formData.get('nombre'),
            documento: formData.get('documento'),
            tipo_pasajero: 'adulto',
            precio: this.currentZone.precio_base_adulto
          }
        ]
      };

      try {
        const response = await fetch('http://localhost:3000/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('No se pudo procesar la reserva');
        
        this.view = 'success';
        this.render();
      } catch (err) {
        alert('❌ Error: ' + err.message);
      }
    });
  }

  setupEvents() {
    this.modal.querySelector('#close-modal')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.store.setState({ activeZoneId: null });
    });

    this.modal.querySelector('#prev-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.view === 'detail') this.navigate(-1);
    });

    this.modal.querySelector('#next-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.view === 'detail') this.navigate(1);
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.store.setState({ activeZoneId: null });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (this.modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') this.store.setState({ activeZoneId: null });
    });
  }

  navigate(direction) {
    const { zones, filter, activeZoneId } = this.store.getState();
    const filteredZones = filter === 'Todos' ? zones : zones.filter(z => z.category === filter);
    const currentIdx = filteredZones.findIndex(z => z.id === activeZoneId);
    
    if (currentIdx === -1) return;

    let nextIdx = (currentIdx + direction + filteredZones.length) % filteredZones.length;
    this.store.setState({ activeZoneId: filteredZones[nextIdx].id });
  }
}

