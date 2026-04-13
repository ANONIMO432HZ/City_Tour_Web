import './style.css'

// Catálogo completo de imágenes de Huanta, Ayacucho
const imageFiles = [
  { file: "arco_de_la_memoria.png", name: "Arco de la Memoria", category: "Cultura", desc: "Monumento histórico en la entrada de Huanta." },
  { file: "atardecer_huanta.png", name: "Atardecer Huantino", category: "Paisaje", desc: "Vista espectacular de los cielos de la Esmeralda de los Andes." },
  { file: "catarata_paccha_cucho_sirenachayoq.png", name: "Catarata Paccha Cucho", category: "Naturaleza", desc: "Caída de agua cristalina rodeada de densa vegetación." },
  { file: "catarata_potrero.png", name: "Catarata Potrero", category: "Naturaleza", desc: "Famosa catarata ideal para el trekking." },
  { file: "convento_sagrado_corazon_de_jesus.png", name: "Convento Sagrado Corazón", category: "Religioso", desc: "Arquitectura colonial y centro de espiritualidad." },
  { file: "cuidadela_huayra_patamarca.png", name: "Ciudadela Huayra Patamarca", category: "Arqueología", desc: "Restos arqueológicos pre-incas." },
  { file: "laguna_8_huayllay.png", name: "Laguna 8 Huayllay", category: "Naturaleza", desc: "Hermosa laguna de altura en la cordillera." },
  { file: "laguna_chacaccocha_razuhuillca.png", name: "Laguna Chacaccocha", category: "Naturaleza", desc: "Ubicada a los pies del imponente Razuhuillca." },
  { file: "laguna_verde_qocha_esmeralda.png", name: "Laguna Verde Qocha", category: "Naturaleza", desc: "Famosa por su color verde esmeralda intenso." },
  { file: "laguna_yanaccocha.png", name: "Laguna Yanaccocha", category: "Naturaleza", desc: "Laguna de aguas místicas y oscuras." },
  { file: "lagunas_de_huaper.png", name: "Lagunas de Huaper", category: "Naturaleza", desc: "Conjunto de espejos de agua en la puna." },
  { file: "mirador_cristo_blanco.png", name: "Mirador Cristo Blanco", category: "Mirador", desc: "Icono de la ciudad con vista total del valle." },
  { file: "mirrador_cañon_de_huatuscalle.png", name: "Cañón de Huatuscalle", category: "Mirador", desc: "Impresionante formación geológica." },
  { file: "nevado_razuhuillca.png", name: "Nevado Razuhuillca", category: "Aventura", desc: "El guardián de Huanta, ideal para andinismo." },
  { file: "parque_de_los_heroes.png", name: "Parque de los Héroes", category: "Cultura", desc: "Espacio público dedicado a los próceres." },
  { file: "parroquia_san_pedro_matriz.png", name: "Parroquia San Pedro Matriz", category: "Religioso", desc: "La iglesia principal frente a la plaza." },
  { file: "plaza_de_armas_de_huanta.png", name: "Plaza de Armas de Huanta", category: "Ciudad", desc: "Una de las plazas más bellas y verdes del Perú." },
  { file: "portada.png", name: "Portada Huantina", category: "Arquitectura", desc: "Símbolo arquitectónico tradicional." },
  { file: "pozas_esmeralda_de_mayocc.png", name: "Pozas Esmeralda Mayocc", category: "Naturaleza", desc: "Pozas naturales de agua turquesa." },
  { file: "puente_huarpa.png", name: "Puente Huarpa", category: "Arquitectura", desc: "Conexión histórica sobre el río Huarpa." },
  { file: "puente_rumichaca.png", name: "Puente Rumichaca", category: "Arquitectura", desc: "Puente de piedra de origen colonial." },
  { file: "santuario_señor_de_maynay.png", name: "Santuario Señor de Maynay", category: "Religioso", desc: "Hogar del patrón de Huanta." }
]

const zones = imageFiles.map((img, index) => ({
  id: index + 1,
  name: img.name,
  image: `/imagenes/${img.file}`,
  status: index % 4 === 0 ? "busy" : "open",
  occupancy: Math.floor(Math.random() * 60) + 10,
  lastUpdate: `Hace ${Math.floor(Math.random() * 15) + 2} min`,
  category: img.category,
  address: "Huanta, Ayacucho",
  description: img.desc
}))

const statusConfig = {
  open: { label: "Abierto", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: 'check-circle-2' },
  busy: { label: "Afluencia Alta", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: 'triangle-alert' },
  closed: { label: "Cerrado", color: "bg-rose-500/20 text-rose-400 border-rose-500/30", icon: 'x-circle' }
}

function renderApp() {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between border-b border-white/5">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <i data-lucide="map-pin" class="text-white w-6 h-6"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 font-outfit">HuantaStatus</span>
          <span class="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">La Esmeralda de los Andes</span>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#catalogo" class="hover:text-emerald-400 transition-colors">Catálogo</a>
        <a href="#" class="hover:text-emerald-400 transition-colors">Mapa</a>
        <a href="#" class="hover:text-emerald-400 transition-colors">Festividades</a>
      </div>
      <button class="md:hidden p-2 hover:bg-white/5 rounded-lg">
        <i data-lucide="menu"></i>
      </button>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-24 pb-20 px-6 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full -z-10"></div>
      
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
           <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
           Monitoreo Turístico en Vivo
        </div>
        <h1 class="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
          Explora la Bella <br/>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">Huanta.</span>
        </h1>
        <p class="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
          Conoce el estado actual de los 22 atractivos más emblemáticos. Haz clic en cualquier imagen para verla en pantalla completa.
        </p>
        <a href="#catalogo" class="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm transition-all shadow-2xl shadow-emerald-600/40 inline-block">
          Explorar Catálogo
        </a>
      </div>
    </header>

    <!-- Catalogue -->
    <main id="catalogo" class="max-w-7xl mx-auto px-6 pb-32">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
        <div>
          <h2 class="text-3xl font-bold mb-2">Galería de Destinos</h2>
          <p class="text-slate-500 text-sm italic">Mostrando las ${zones.length} maravillas de la provincia.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="px-5 py-2.5 bg-emerald-600/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-400">Todos</button>
          <button class="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors">Naturaleza</button>
          <button class="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors">Cultura</button>
          <button class="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors">Aventura</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${zones.map(zone => renderCard(zone)).join('')}
      </div>
    </main>
  `

  if (window.lucide) window.lucide.createIcons()
  setupModalEvents()
}

function renderCard(zone) {
  const cfg = statusConfig[zone.status]
  return `
    <div 
      class="group relative bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:bg-slate-900/60 hover:border-emerald-500/20 hover:scale-[1.02] cursor-pointer"
      onclick="window.openModal('${zone.image}', '${zone.name}', '${zone.description}', '${zone.category}')"
      role="button"
      tabindex="0"
    >
      <div class="relative h-72 overflow-hidden">
        <img src="${zone.image}" alt="${zone.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        <!-- Zoom Overlay -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-emerald-950/20 backdrop-blur-[2px]">
           <div class="bg-white/10 p-4 rounded-full backdrop-blur-xl border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
             <i data-lucide="maximize-2" class="text-white w-6 h-6"></i>
           </div>
        </div>

        <div class="absolute top-4 left-4">
          <span class="px-3 py-1.5 rounded-full text-[9px] font-black border flex items-center gap-1.5 ${cfg.color} backdrop-blur-xl uppercase tracking-widest shadow-xl">
            <i data-lucide="${cfg.icon}" class="w-3 h-3"></i>
            ${cfg.label}
          </span>
        </div>
      </div>
      
      <div class="p-6 relative">
        <span class="text-[9px] text-emerald-500 font-black mb-2 block uppercase tracking-[0.2em]">${zone.category}</span>
        <h3 class="text-lg font-bold text-white mb-4 line-clamp-1">${zone.name}</h3>
        
        <div class="flex items-center justify-between">
           <div class="h-1 flex-1 bg-white/5 rounded-full overflow-hidden mr-4">
              <div class="h-full rounded-full ${zone.occupancy > 70 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${zone.occupancy}%"></div>
           </div>
           <span class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">${zone.occupancy}%</span>
        </div>
      </div>
    </div>
  `
}

// Global Modal Function
window.openModal = (src, title, desc, category) => {
  const modal = document.querySelector('#image-modal')
  const modalImg = document.querySelector('#modal-img')
  const modalTitle = document.querySelector('#modal-title')
  const modalDesc = document.querySelector('#modal-desc')

  modalImg.onerror = () => {
    console.error('Error al cargar imagen:', src);
    modalTitle.textContent = 'Error al cargar imagen';
  }
  
  modalImg.src = src
  modalTitle.textContent = title
  modalDesc.textContent = desc
  
  modal.classList.remove('hidden')
  modal.classList.add('flex')
  document.body.style.overflow = 'hidden'

  // Animate modal entry
  modalImg.style.opacity = '1'
  modalImg.style.transform = 'scale(1)'
}

function setupModalEvents() {
  const modal = document.querySelector('#image-modal')
  const closeBtn = document.querySelector('#close-modal')

  const closeModal = () => {
    // Animate out
    const modalImg = document.querySelector('#modal-img')
    modalImg.style.transform = 'scale(0.9)'
    modalImg.style.opacity = '0'
    
    setTimeout(() => {
      modal.classList.add('hidden')
      modal.classList.remove('flex')
      document.body.style.overflow = ''
    }, 300)
  }

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation()
    closeModal()
  })

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
  })
}

// Init
document.addEventListener('DOMContentLoaded', renderApp)
