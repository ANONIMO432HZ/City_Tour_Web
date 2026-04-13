import './style.css'

// Datos reales de las zonas turísticas de Huanta, Ayacucho
const zones = [
  {
    id: 1,
    name: "Plaza de Armas de Huanta",
    image: "/imagenes/plaza_de_armas_de_huanta.png",
    status: "open",
    occupancy: 35,
    lastUpdate: "Hace 5 min",
    category: "Cultura",
    address: "Centro de Huanta"
  },
  {
    id: 2,
    name: "Santuario Señor de Maynay",
    image: "/imagenes/santuario_señor_de_maynay.png",
    status: "open",
    occupancy: 15,
    lastUpdate: "Hace 15 min",
    category: "Religioso",
    address: "Barrio de Maynay"
  },
  {
    id: 3,
    name: "Catarata Paccha Cucho",
    image: "/imagenes/catarata_paccha_cucho_sirenachayoq.png",
    status: "busy",
    occupancy: 85,
    lastUpdate: "Hace 2 min",
    category: "Naturaleza",
    address: "Afueras de Huanta"
  },
  {
    id: 4,
    name: "Mirador Cristo Blanco",
    image: "/imagenes/mirador_cristo_blanco.png",
    status: "open",
    occupancy: 25,
    lastUpdate: "Hace 10 min",
    category: "Mirador",
    address: "Cerro San Cristóbal"
  },
  {
    id: 5,
    name: "Nevado Razuhuillca",
    image: "/imagenes/nevado_razuhuillca.png",
    status: "open",
    occupancy: 10,
    lastUpdate: "Hace 30 min",
    category: "Aventura",
    address: "Cordillera Central"
  },
  {
    id: 6,
    name: "Puente Huarpa",
    image: "/imagenes/puente_huarpa.png",
    status: "open",
    occupancy: 50,
    lastUpdate: "Hace 8 min",
    category: "Arquitectura",
    address: "Vía Huanta-Ayacucho"
  }
]

const statusConfig = {
  open: {
    label: "Abierto",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: 'check-circle-2'
  },
  busy: {
    label: "Mucha Afluencia",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: 'triangle-alert'
  },
  closed: {
    label: "Cerrado",
    color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    icon: 'x-circle'
  }
}

function renderApp() {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between border-b border-white/5">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <i data-lucide="map-pin" class="text-white w-6 h-6"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">HuantaStatus</span>
          <span class="text-[10px] text-blue-400 font-bold tracking-widest uppercase">La Esmeralda de los Andes</span>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#" class="hover:text-blue-400 transition-colors">Zonas</a>
        <a href="#" class="hover:text-blue-400 transition-colors">Mapa</a>
        <a href="#" class="hover:text-blue-400 transition-colors">Festividades</a>
      </div>
      <button class="p-2 hover:bg-white/5 rounded-lg transition-colors md:hidden">
        <i data-lucide="menu"></i>
      </button>
      <button class="hidden md:block px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-blue-600/20">
        Guía Turística
      </button>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-20 pb-16 px-6 overflow-hidden">
      <!-- Background mesh -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Explora Huanta en tiempo real
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          Descubre la joya <br/>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400">de Ayacucho.</span>
        </h1>
        <p class="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Consulta el estado de las cataratas, santuarios y miradores de la Bella Huanta. Planifica tu aventura sin contratiempos.
        </p>
        
        <!-- Search Bar -->
        <div class="group relative max-w-xl mx-auto">
          <div class="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-emerald-400 transition-colors">
            <i data-lucide="search"></i>
          </div>
          <input 
            type="text" 
            placeholder="Buscar cataratas, museos, lagunas..." 
            class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-lg shadow-xl"
          />
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-7xl mx-auto px-6 pb-24 w-full">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">Zonas Turísticas</h2>
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-emerald-400 font-bold border-emerald-500/20">Todos</button>
          <button class="px-4 py-2 text-slate-500 text-sm hover:text-white transition-colors">Naturaleza</button>
          <button class="px-4 py-2 text-slate-500 text-sm hover:text-white transition-colors">Cultura</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${zones.map(zone => {
          const cfg = statusConfig[zone.status]
          return `
            <div class="group bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden card-hover glass">
              <div class="relative h-64 overflow-hidden">
                <img src="${zone.image}" alt="${zone.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div class="absolute top-3 left-3">
                  <span class="px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${cfg.color} backdrop-blur-md uppercase tracking-wider">
                    <i data-lucide="${cfg.icon}" class="w-3 h-3"></i>
                    ${cfg.label}
                  </span>
                </div>
                <div class="absolute bottom-4 left-4 right-4">
                  <span class="text-[10px] text-emerald-400 font-bold mb-1 block uppercase tracking-widest">${zone.category}</span>
                  <h3 class="text-xl font-bold text-white leading-tight">${zone.name}</h3>
                </div>
              </div>
              
              <div class="p-6">
                <div class="flex items-center justify-between text-slate-400 text-xs mb-6">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-500"></i>
                    ${zone.address}
                  </div>
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                    ${zone.lastUpdate}
                  </div>
                </div>

                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-xs font-medium text-slate-400">Nivel de Afluencia</span>
                      <span class="text-sm font-bold ${zone.occupancy > 80 ? 'text-amber-400' : 'text-emerald-400'}">${zone.occupancy}%</span>
                    </div>
                    <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div class="h-full rounded-full transition-all duration-1000 ${zone.occupancy > 80 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}" style="width: ${zone.occupancy}%"></div>
                    </div>
                  </div>
                  
                  <button class="w-full py-3 bg-white/5 hover:bg-emerald-600/10 border border-white/10 hover:border-emerald-500/30 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:text-emerald-400 group/btn">
                    Ver Detalles Turísticos
                    <i data-lucide="chevron-right" class="w-4 h-4 transition-transform group-hover/btn:translate-x-1"></i>
                  </button>
                </div>
              </div>
            </div>
          `
        }).join('')}
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-12 px-6 bg-slate-950/50">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
        <div class="flex items-center gap-2">
           <i data-lucide="map-pin" class="w-5 h-5"></i>
           <span class="font-bold text-slate-300">Huanta, Ayacucho - Perú</span>
        </div>
        <p>© 2026 HuantaStatus. Todos los derechos reservados.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-emerald-400 transition-colors">Instagram</a>
          <a href="#" class="hover:text-emerald-400 transition-colors">Facebook</a>
        </div>
      </div>
    </footer>
  `

  // Inicializar iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons()
  }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', renderApp)
