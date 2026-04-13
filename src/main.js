import './style.css'

// Catálogo HuantaTour con lenguaje natural y amigable (Basado en RedBus y fuentes locales)
const imageFiles = [
  { 
    file: "plaza_de_armas_de_huanta.png", 
    name: "Plaza de Armas e Iglesia Matriz", 
    category: "Ciudad", 
    desc: "La Plaza de Armas es el punto de inicio ideal. Aquí podrás admirar la imponente Iglesia San Pedro de Huanta, que data de 1724, con sus dos torres góticas y campanas francesas. ¡No te vayas sin probar los famosos chicharrones en los locales cercanos!",
    map: "https://www.google.com/maps/search/?api=1&query=Plaza+de+Armas+Huanta"
  },
  { 
    file: "boques-de-piedra-de-Laupay.jpg", 
    name: "Bosque de Piedras de Laupay", 
    category: "Naturaleza",
    desc: "Un espacio mágico lleno de figuras poliformas de piedra que parecen cobrar vida como humanos o animales. Es un destino virgen perfecto para el trekking y camping, donde las estrellas brillan con una claridad asombrosa durante la noche.",
    map: "https://www.google.com/maps/search/?api=1&query=Bosque+de+Piedras+Laupay+Huanta"
  },
  { 
    file: "nevado_razuhuillca.png", 
    name: "Nevado y Lagunas de Razuhuillca", 
    category: "Aventura",
    desc: "El guardián místico de Huanta. Este circuito te lleva por el majestuoso nevado y sus lagunas de colores intensos como Chacaqocha y Yanaqocha. Alcanzar los 4100 msnm te regalará una conexión única con la flora y fauna altoandina.",
    map: "https://www.google.com/maps/search/?api=1&query=Nevado+Razuhuillca+Huanta"
  },
  { 
    file: "mirador_cristo_blanco.png", 
    name: "Mirador Cristo Blanco", 
    category: "Mirador",
    desc: "La escultura gigante que vigila todo el valle. Es el sitio preferido por los viajeros para tomar esas fotografías panorámicas que parecen postales. Un lugar de paz para admirar la naturaleza en todo su esplendor.",
    map: "https://maps.app.goo.gl/2qejaMmXHDPHtAtW8"
  },
  { 
    file: "catarata_paccha_cucho_sirenachayoq.png", 
    name: "Catarata Paccha Cucho", 
    category: "Naturaleza",
    desc: "Conocida como Sirenachayoq, es una de las caídas de agua más hermosas y relajantes. Sus aguas cristalinas y el entorno verde profundo te invitan a desconectar del mundo y disfrutar del sonido de la selva alta.",
    map: "https://www.google.com/maps/search/?api=1&query=Catarata+Paccha+Cucho+Huanta"
  },
  { 
    file: "santuario_señor_de_maynay.png", 
    name: "Santuario Señor de Maynay", 
    category: "Religioso",
    desc: "Centro de una profunda fe católica y hogar de la feria más importante de la región. En septiembre, este lugar se llena de vida celebrando la agricultura, ganadería y artesanía huanteña en honor a su patrón.",
    map: "https://www.google.com/maps/search/?api=1&query=Santuario+Señor+de+Maynay+Huanta"
  },
  { 
    file: "arco_de_la_memoria.png", 
    name: "Arco de la Memoria", 
    category: "Cultura",
    desc: "Ubicado en la entrada triunfal de la ciudad, este monumento rinde homenaje a la valentía y el espíritu inquebrantable de los pobladores huanteños a lo largo de nuestra historia.",
    map: "https://www.google.com/maps/search/?api=1&query=Arco+de+la+Memoria+Huanta"
  },
  { 
    file: "laguna_verde_qocha_esmeralda.png", 
    name: "Laguna Verde Qocha", 
    category: "Naturaleza",
    desc: "Su color esmeralda intenso parece sacado de un sueño. Rodeada de montañas que se reflejan en sus aguas tranquilas, es un paraíso para los amantes de la fotografía y el misticismo andino.",
    map: "https://www.google.com/maps/search/?api=1&query=Laguna+Verde+Qocha+Huanta"
  },
  { 
    file: "atardecer_huanta.png", 
    name: "Atardecer Huantino", 
    category: "Paisaje", 
    desc: "Los cielos de Huanta se tiñen de rojos y violetas al caer el sol, recordándonos por qué llaman a este valle 'La Esmeralda de los Andes'. Un espectáculo natural gratuito cada tarde.",
    map: "https://www.google.com/maps/search/?api=1&query=Valle+de+Huanta+Ayacucho" 
  },
  { 
    file: "catarata_potrero.png", 
    name: "Catarata Potrero", 
    category: "Naturaleza", 
    desc: "Un tesoro natural escondido que recompensa a los aventureros con un salto de agua refrescante tras una caminata entre montañas. Ideal para quienes buscan salirse de la ruta tradicional.",
    map: "https://www.google.com/maps/search/?api=1&query=Catarata+Potrero+Huanta" 
  },
  { file: "convento_sagrado_corazon_de_jesus.png", name: "Convento Sagrado Corazón", category: "Religioso", desc: "Arquitectura religiosa que impone por su diseño y paz interior. Un patrimonio espiritual que ha acogido a generaciones de huanteños en busca de reflexión.", map: "https://www.google.com/maps/search/?api=1&query=Convento+Sagrado+Corazón+Huanta" },
  { file: "cuidadela_huayra_patamarca.png", name: "Ciudadela Huayra Patamarca", category: "Arqueología", desc: "Restos prehispánicos que desafiaron las alturas en las cumbres que vigilan el valle. Un testimonio mudo de la grandeza de las civilizaciones que habitaron estas tierras.", map: "https://www.google.com/maps/search/?api=1&query=Ciudadela+Huayra+Patamarca+Huanta" },
  { file: "laguna_8_huayllay.png", name: "Laguna 8 Huayllay", category: "Naturaleza", desc: "Una misteriosa laguna rodeada de la inmensidad de la pampa altoandina. El aire puro y el silencio de la altura te harán sentir en la cima del mundo.", map: "https://www.google.com/maps/search/?api=1&query=Laguna+Huayllay+Huanta" },
  { file: "laguna_chacaccocha_razuhuillca.png", name: "Laguna Chacaccocha", category: "Naturaleza", desc: "Este espejo de agua glaciar reposa a los pies de las nieves eternas, siendo la puerta de entrada para descubrir los secretos de la cordillera de Razuhuillca.", map: "https://www.google.com/maps/search/?api=1&query=Laguna+Chacaccocha+Huanta" },
  { file: "laguna_yanaccocha.png", name: "Laguna Yanaccocha", category: "Naturaleza", desc: "Conocida como la 'Laguna Negra', sus aguas oscuras y profundas están rodeadas de mitos que fascinan a cada visitante. Un lugar cargado de energía andina.", map: "https://www.google.com/maps/search/?api=1&query=Laguna+Yanaccocha+Huanta" },
  { file: "lagunas_de_huaper.png", name: "Lagunas de Huaper", category: "Naturaleza", desc: "Un conjunto hídrico lleno de vida donde el ganado altoandino y las aves migratorias encuentran un refugio natural de una belleza singular.", map: "https://www.google.com/maps/search/?api=1&query=Lagunas+de+Huaper+Huanta" },
  { file: "mirrador_cañon_de_huatuscalle.png", name: "Cañón de Huatuscalle", category: "Mirador", desc: "Desde aquí podrás apreciar la fuerza del tiempo esculpida en piedra. Un cañón profundo con geologías impresionantes que te harán sentir la escala de la naturaleza.", map: "https://www.google.com/maps/search/?api=1&query=Cañón+de+Huatuscalle+Huanta" },
  { file: "parque_de_los_heroes.png", name: "Parque de los Héroes", category: "Cultura", desc: "Un espacio de reunión familiar y respeto histórico. Sus bustos y áreas verdes invitan a pasear mientras recordamos la valentía de quienes forjaron nuestra provincia.", map: "https://www.google.com/maps/search/?api=1&query=Parque+de+los+Héroes+Huanta" },
  { file: "parroquia_san_pedro_matriz.png", name: "Parroquia San Pedro Matriz", category: "Religioso", desc: "La cúpula que domina el horizonte de Huanta. Más que un edificio, es el corazón espiritual de nuestra comunidad y el lugar donde se celebran nuestras tradiciones más queridas.", map: "https://www.google.com/maps/search/?api=1&query=Parroquia+San+Pedro+Huanta" },
  { file: "pozas_esmeralda_de_mayocc.png", name: "Pozas Esmeralda Mayocc", category: "Naturaleza", desc: "En el límite con Huancavelica, estas pozas de agua tibia y color turquesa son el refugio perfecto para relajarse junto al imponente río Mantaro.", map: "https://www.google.com/maps/search/?api=1&query=Pozas+Esmeralda+Mayocc" },
  { file: "puente_huarpa.png", name: "Puente Huarpa", category: "Arquitectura", desc: "Estructura histórica que une pueblos y regiones sobre el río Huarpa. Un hito de ingeniería con vistas panorámicas que no puedes dejar de fotografiar.", map: "https://www.google.com/maps/search/?api=1&query=Puente+Huarpa+Ayacucho" },
  { file: "puente_rumichaca.png", name: "Puente Rumichaca", category: "Arquitectura", desc: "Construido en piedra, este puente colonial ha resistido el paso de los siglos como un símbolo de la ingeniería duradera y las rutas comerciales de antaño.", map: "https://www.google.com/maps/search/?api=1&query=Puente+Rumichaca+Huanta" },
  { 
    file: "mirador_cristo_blando_panoramico.jpg", 
    name: "Vista Panorámica de Huanta", 
    category: "Mirador", 
    desc: "Toda la 'Esmeralda de los Andes' a tus pies en una sola mirada. Captura la inmensidad del valle y la disposición orgánica de nuestra bella ciudad desde las alturas.", 
    map: "https://www.google.com/maps/search/?api=1&query=Mirador+Huanta+Ayacucho" 
  },
  { 
    file: "Plaza-de-Armas-Huanta.jpg", 
    name: "Plaza de Armas (Sunset)", 
    category: "Ciudad", 
    desc: "La plaza en su hora más mágica, cuando la luz dorada baña nuestra pileta central y palmeras, iluminando el espíritu de todo aquel que la recorre al caer el sol.", 
    map: "https://www.google.com/maps/search/?api=1&query=Plaza+de+Armas+Huanta" 
  }
]

let currentFilter = 'Todos'
let currentIdx = 0
let filteredZones = []

const zones = imageFiles.map((img, index) => ({
  id: index,
  name: img.name,
  image: `/img/${img.file}`, // Ruta corregida según cambio manual
  status: index % 4 === 0 ? "busy" : "open",
  occupancy: Math.floor(Math.random() * 60) + 10,
  lastUpdate: `Hace ${Math.floor(Math.random() * 15) + 2} min`,
  category: img.category,
  address: "Huanta, Ayacucho",
  description: img.desc,
  mapUrl: img.map
}))

const statusConfig = {
  open: { label: "Abierto", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: 'check-circle-2' },
  busy: { label: "Afluencia Alta", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: 'triangle-alert' },
  closed: { label: "Cerrado", color: "bg-rose-500/20 text-rose-400 border-rose-500/30", icon: 'x-circle' }
}

function renderApp() {
  const app = document.querySelector('#app')
  filteredZones = currentFilter === 'Todos' ? zones : zones.filter(z => z.category === currentFilter)

  app.innerHTML = `
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between border-b border-white/5">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <i data-lucide="map-pin" class="text-white w-6 h-6"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 font-outfit">HuantaTour</span>
          <span class="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">La Bella Esmeralda de los Andes</span>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#catalogo" class="hover:text-emerald-400 transition-colors">Catálogo</a>
        <a href="#" class="hover:text-emerald-400 transition-colors">Mapa</a>
        <a href="#" class="hover:text-emerald-400 transition-colors">Festividades</a>
      </div>
      <button class="md:hidden p-2 hover:bg-white/5 rounded-lg text-slate-400">
        <i data-lucide="menu"></i>
      </button>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-24 pb-20 px-6 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full -z-10"></div>
      
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
           <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
           Guía Turística Oficial
        </div>
        <h1 class="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
          Explora la Bella <br/>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">Esmeralda de los Andes.</span>
        </h1>
        <p class="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
          Conoce la ubicación exacta y el encanto de los ${zones.length} destinos más emblemáticos de Huanta.
        </p>
        <div class="flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="#catalogo" class="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm transition-all shadow-2xl shadow-emerald-600/40 inline-block">
            Explorar Catálogo
          </a>
          <button class="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
            Mapa Interactivo
          </button>
        </div>
      </div>
    </header>

    <!-- Catalogue -->
    <main id="catalogo" class="max-w-7xl mx-auto px-6 pb-32">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
        <div>
          <h2 class="text-3xl font-bold mb-2">Galería de Destinos</h2>
          <p class="text-slate-500 text-sm italic">Haz clic en una imagen para ver detalles y ubicación GPS.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${['Todos', 'Naturaleza', 'Cultura', 'Religioso', 'Ciudad', 'Mirador', 'Aventura', 'Arqueología', 'Paisaje', 'Arquitectura'].map(cat => `
            <button 
              onclick="window.setFilter('${cat}')"
              class="px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all ${currentFilter === cat ? 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}"
            >
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${filteredZones.map((zone, idx) => renderCard(zone, idx)).join('')}
      </div>
    </main>
  `

  if (window.lucide) window.lucide.createIcons()
  setupModalEvents()
}

function renderCard(zone, idx) {
  const cfg = statusConfig[zone.status]
  return `
    <div 
      class="group relative bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:bg-slate-900/60 hover:border-emerald-500/20 hover:scale-[1.02] cursor-pointer"
      onclick="window.openModalByIdx(${idx})"
      role="button"
      tabindex="0"
    >
      <div class="relative h-64 overflow-hidden">
        <img src="${zone.image}" alt="${zone.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-emerald-950/20 backdrop-blur-[2px]">
           <div class="bg-white/10 p-4 rounded-full backdrop-blur-xl border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
             <i data-lucide="maximize-2" class="text-white w-6 h-6"></i>
           </div>
        </div>

        <div class="absolute top-4 left-4 flex gap-2">
          <span class="px-3 py-1.5 rounded-full text-[9px] font-black border flex items-center gap-1.5 ${cfg.color} backdrop-blur-xl uppercase tracking-widest shadow-xl">
            <i data-lucide="${cfg.icon}" class="w-3 h-3"></i>
            ${cfg.label}
          </span>
        </div>
      </div>
      
      <div class="p-6 relative">
        <span class="text-[9px] text-emerald-500 font-black mb-1 block uppercase tracking-[0.2em] font-outfit">${zone.category}</span>
        <h3 class="text-lg font-bold text-white mb-2 line-clamp-1">${zone.name}</h3>
        <p class="text-slate-500 text-[11px] leading-relaxed mb-4 line-clamp-2">${zone.description}</p>
        
        <div class="flex items-center justify-between border-t border-white/5 pt-4">
           <div class="h-1 flex-1 bg-white/5 rounded-full overflow-hidden mr-4">
              <div class="h-full rounded-full ${zone.occupancy > 70 ? 'bg-amber-500' : 'bg-emerald-500'}" style="width: ${zone.occupancy}%"></div>
           </div>
           <span class="text-[10px] font-bold text-slate-400 font-outfit uppercase tracking-tighter">${zone.occupancy}%</span>
        </div>
      </div>
    </div>
  `
}

window.setFilter = (filter) => {
  currentFilter = filter
  renderApp()
  document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' })
}

window.openModalByIdx = (idx) => {
  currentIdx = idx
  updateModalContent()
  
  const modal = document.querySelector('#image-modal')
  modal.classList.remove('hidden')
  modal.classList.add('flex')
  document.body.style.overflow = 'hidden'
}

function updateModalContent() {
  const zone = filteredZones[currentIdx]
  const modalImg = document.querySelector('#modal-img')
  const modalTitle = document.querySelector('#modal-title')
  const modalDesc = document.querySelector('#modal-desc')
  const modalCategory = document.querySelector('#modal-category')
  const mapLink = document.querySelector('#map-link')

  modalImg.style.opacity = '0'
  modalImg.style.transform = 'scale(0.95)'
  
  setTimeout(() => {
    modalImg.src = zone.image
    modalTitle.textContent = zone.name
    modalDesc.textContent = zone.description
    modalCategory.textContent = zone.category
    if (mapLink) mapLink.href = zone.mapUrl
    
    modalImg.style.opacity = '1'
    modalImg.style.transform = 'scale(1)'
  }, 100)

  if (window.lucide) window.lucide.createIcons()
}

function setupModalEvents() {
  const modal = document.querySelector('#image-modal')
  const closeBtn = document.querySelector('#close-modal')
  const prevBtn = document.querySelector('#prev-btn')
  const nextBtn = document.querySelector('#next-btn')

  // Swipe Support
  let touchStartX = 0
  let touchEndX = 0

  const handleSwipe = () => {
    const swipeThreshold = 50
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) nextImg()
      else prevImg()
    }
  }

  const closeModal = () => {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
    document.body.style.overflow = ''
  }

  const nextImg = (e) => {
    e?.stopPropagation()
    currentIdx = (currentIdx + 1) % filteredZones.length
    updateModalContent()
  }

  const prevImg = (e) => {
    e?.stopPropagation()
    currentIdx = (currentIdx - 1 + filteredZones.length) % filteredZones.length
    updateModalContent()
  }

  closeBtn?.addEventListener('click', (e) => { e.stopPropagation(); closeModal(); })
  prevBtn?.addEventListener('click', prevImg)
  nextBtn?.addEventListener('click', nextImg)

  modal?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX }, { passive: true })
  modal?.addEventListener('touchend', (e) => { touchEndX = e.changedTouches[0].screenX; handleSwipe() }, { passive: true })
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
    if (e.key === 'ArrowRight') nextImg()
    if (e.key === 'ArrowLeft') prevImg()
  })
}

// Init
document.addEventListener('DOMContentLoaded', renderApp)
