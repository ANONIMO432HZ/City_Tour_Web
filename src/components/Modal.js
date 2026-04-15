import { store } from '../store.js';

export class Modal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.store = store;
    this.store.subscribe((state) => this.handleStateChange(state));
    this.setupEvents();
  }

  handleStateChange(state) {
    if (state.activeZoneId !== null) {
      this.open(state.activeZoneId);
    } else {
      this.close();
    }
  }

  open(zoneId) {
    const { zones, filter } = this.store.getState();
    const filteredZones = filter === 'Todos' ? zones : zones.filter(z => z.category === filter);
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return;

    this.updateContent(zone);
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    this.modal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  updateContent(zone) {
    const modalImg = this.modal.querySelector('#modal-img');
    const modalTitle = this.modal.querySelector('#modal-title');
    const modalDesc = this.modal.querySelector('#modal-desc');
    const modalCategory = this.modal.querySelector('#modal-category');
    const mapLink = this.modal.querySelector('#map-link');

    modalImg.style.opacity = '0';
    modalImg.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      if (modalImg) modalImg.src = zone.image;
      if (modalTitle) modalTitle.textContent = zone.name;
      if (modalDesc) modalDesc.textContent = zone.desc;
      if (modalCategory) modalCategory.textContent = zone.category;
      if (mapLink) mapLink.href = zone.routeUrl;
      
      modalImg.style.opacity = '1';
      modalImg.style.transform = 'scale(1)';
    }, 100);

    if (window.lucide) window.lucide.createIcons();
  }

  setupEvents() {
    this.modal.querySelector('#close-modal')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.store.setState({ activeZoneId: null });
    });

    this.modal.querySelector('#prev-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navigate(-1);
    });

    this.modal.querySelector('#next-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navigate(1);
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.store.setState({ activeZoneId: null });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (this.modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') this.store.setState({ activeZoneId: null });
      if (e.key === 'ArrowRight') this.navigate(1);
      if (e.key === 'ArrowLeft') this.navigate(-1);
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
