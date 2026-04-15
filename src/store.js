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
      
      // Mapear los datos de la DB al formato que esperan los componentes (name, desc, category)
      const mappedZones = tours.map((tour, index) => {
        // Mapeo dinámico de imágenes basado en el código o id
        let imagePath = '/img/nevado_razuhuillca.png';
        if (tour.codigo === 'INKA-001') imagePath = '/img/nevado_razuhuillca.png';
        else if (tour.codigo === 'INKA-002') imagePath = '/img/laguna_verde_qocha_esmeralda.png';
        else if (index < 24) {
          // Si es uno de los 24 originales que restauraremos
          const originalImages = [
            "plaza_de_armas_de_huanta.png", "boques-de-piedra-de-Laupay.jpg", "nevado_razuhuillca.png",
            "mirador_cristo_blanco.png", "catarata_paccha_cucho_sirenachayoq.png", "santuario_señor_de_maynay.png",
            "arco_de_la_memoria.png", "laguna_verde_qocha_esmeralda.png", "atardecer_huanta.png",
            "catarata_potrero.png", "convento_sagrado_corazon_de_jesus.png", "cuidadela_huayra_patamarca.png",
            "laguna_8_huayllay.png", "laguna_chacaccocha_razuhuillca.png", "laguna_yanaccocha.png",
            "lagunas_de_huaper.png", "mirrador_cañon_de_huatuscalle.png", "parque_de_los_heroes.png",
            "parroquia_san_pedro_matriz.png", "pozas_esmeralda_de_mayocc.png", "puente_huarpa.png",
            "puente_rumichaca.png", "mirador_cristo_blando_panoramico.jpg", "Plaza-de-Armas-Huanta.jpg"
          ];
          imagePath = `/img/${originalImages[index] || originalImages[0]}`;
        }

        return {
          ...tour,
          name: tour.nombre,
          desc: tour.descripcion,
          category: tour.categoria_nombre,
          image: imagePath,
          status: "open",
          occupancy: Math.floor(Math.random() * 40) + 20,
          routeUrl: `https://www.google.com/maps/dir/?api=1&destination=${tour.nombre}`
        };
      });

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

