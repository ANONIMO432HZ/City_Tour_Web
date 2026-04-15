class Store {
  constructor() {
    this.state = {
      view: 'catalogo',
      filter: 'Todos',
      activeZoneId: null,
      activeMapId: null,
      loading: true,
      zones: [],
      error: null
    };
    this.listeners = [];
  }

  async fetchInitialData() {
    try {
      this.setState({ loading: true });
      const response = await fetch('http://localhost:3000/api/tours');
      
      if (!response.ok) throw new Error('Error al conectar con la API');
      
      const tours = await response.json();
      
      // Mapear los datos de la DB al formato que esperan los componentes
      const mappedZones = tours.map(tour => ({
        ...tour,
        // Pequeño hack para las imágenes existentes
        image: `/img/${tour.codigo === 'INKA-001' ? 'nevado_razuhuillca.png' : 'laguna_verde_qocha_esmeralda.png'}`,
        status: "open",
        occupancy: Math.floor(Math.random() * 40) + 20,
        routeUrl: `https://www.google.com/maps/dir/?api=1&destination=${tour.nombre}`
      }));

      this.setState({ 
        zones: mappedZones, 
        loading: false 
      });
    } catch (err) {
      console.error("❌ Store Error:", err);
      this.setState({ error: err.message, loading: false });
    }
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

