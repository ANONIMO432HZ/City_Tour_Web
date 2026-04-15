import { imageFiles } from './data/destinos.js';

class Store {
  constructor() {
    this.state = {
      view: 'catalogo',
      filter: 'Todos',
      activeZoneId: null,
      activeMapId: null,
      zones: imageFiles.map((img) => ({
        ...img,
        image: `/img/${img.file}`,
        status: img.id % 5 === 0 ? "busy" : "open",
        occupancy: Math.floor(Math.random() * 40) + 20,
        routeUrl: `https://www.google.com/maps/dir/?api=1&destination=${img.map}`
      }))
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const store = new Store();
