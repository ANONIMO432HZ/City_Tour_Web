-- SCRIPT DE RESTAURACIÓN TOTAL - INKAEXPLORE (24 DESTINOS)
-- Corregido según db_inka_explore.sql

-- 1. Asegurar categorías (Upsert por nombre)
-- Usamos una lógica de bloque para evitar errores si ya existen
DO $$ 
BEGIN
    INSERT INTO categoria (nombre, descripcion) VALUES 
    ('Ciudad', 'Zonas urbanas y centros históricos'),
    ('Naturaleza', 'Espacios naturales, lagunas y bosques'),
    ('Aventura', 'Tours de adrenalina y trekking'),
    ('Mirador', 'Puntos panorámicos espectaculares'),
    ('Religioso', 'Templos, iglesias y centros de fe'),
    ('Cultura', 'Monumentos y sitios arqueológicos'),
    ('Paisaje', 'Vistas naturales y atardeceres'),
    ('Arquitectura', 'Puentes y construcciones históricas')
    ON CONFLICT DO NOTHING;
END $$;

-- 2. Limpiar tours actuales para evitar duplicados
TRUNCATE TABLE tour CASCADE;

-- 3. Insertar los 24 destinos originales
INSERT INTO tour (codigo, nombre, descripcion, fk_categoria, precio_base_adulto, precio_base_nino, duracion_horas, estado)
VALUES
('TOUR-001', 'Plaza de Armas e Iglesia Matriz', 'La Plaza de Armas es el punto de inicio ideal. Aquí podrás admirar la imponente Iglesia San Pedro de Huanta.', (SELECT id FROM categoria WHERE nombre='Ciudad' LIMIT 1), 20.00, 10.00, 2, 'activo'),
('TOUR-002', 'Bosque de Piedras de Laupay', 'Un espacio mágico lleno de figuras poliformas de piedra que parecen cobrar vida. Perfecto para trekking.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 45.00, 25.00, 6, 'activo'),
('TOUR-003', 'Nevado y Lagunas de Razuhuillca', 'El guardián místico de Huanta. Circuito por el nevado y sus lagunas de colores intensos.', (SELECT id FROM categoria WHERE nombre='Aventura' LIMIT 1), 80.00, 50.00, 8, 'activo'),
('TOUR-004', 'Mirador Cristo Blanco', 'La escultura gigante que vigila todo el valle. Sitio preferido para fotografías panorámicas.', (SELECT id FROM categoria WHERE nombre='Mirador' LIMIT 1), 15.00, 10.00, 1, 'activo'),
('TOUR-005', 'Catarata Paccha Cucho', 'Conocida como Sirenachayoq, una de las caídas de agua más hermosas y relajantes.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 25.00, 15.00, 3, 'activo'),
('TOUR-006', 'Santuario Señor de Maynay', 'Centro de una profunda fe católica y hogar de la feria más importante de la región.', (SELECT id FROM categoria WHERE nombre='Religioso' LIMIT 1), 10.00, 5.00, 2, 'activo'),
('TOUR-007', 'Arco de la Memoria', 'Monumento que rinde homenaje a la valentía y el espíritu inquebrantable de los huanteños.', (SELECT id FROM categoria WHERE nombre='Cultura' LIMIT 1), 10.00, 5.00, 1, 'activo'),
('TOUR-008', 'Laguna Verde Qocha', 'Su color esmeralda intenso parece sacado de un sueño. Rodeada de montañas que se reflejan.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 40.00, 20.00, 5, 'activo'),
('TOUR-009', 'Atardecer Huantino', 'Los cielos de Huanta se tiñen de rojos y violetas al caer el sol, recordándonos el valle.', (SELECT id FROM categoria WHERE nombre='Paisaje' LIMIT 1), 10.00, 5.00, 2, 'activo'),
('TOUR-010', 'Catarata Potrero', 'Un tesoro natural escondido que recompensa a los aventureros con un salto de agua refrescante.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 30.00, 15.00, 4, 'activo'),
('TOUR-011', 'Convento Sagrado Corazón', 'Arquitectura religiosa que impone por su diseño y paz interior. Patrimonio espiritual.', (SELECT id FROM categoria WHERE nombre='Religioso' LIMIT 1), 15.00, 10.00, 2, 'activo'),
('TOUR-012', 'Ciudadela Huayra Patamarca', 'Restos prehispánicos en las cumbres que vigilan el valle fértil. Testimonio de grandeza.', (SELECT id FROM categoria WHERE nombre='Cultura' LIMIT 1), 35.00, 20.00, 5, 'activo'),
('TOUR-013', 'Laguna 8 Huayllay', 'Misteriosa laguna de altura rodeada de pampa altoandina y aire puro. Entorno virgen.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 50.00, 30.00, 6, 'activo'),
('TOUR-014', 'Laguna Chacaccocha', 'Espejo de agua glaciar a los pies de las nieves eternas de Razuhuillca.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 45.00, 25.00, 6, 'activo'),
('TOUR-015', 'Laguna Yanaccocha', 'Conocida como la Laguna Negra, sus aguas oscuras están rodeadas de mitos y leyendas.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 45.00, 25.00, 6, 'activo'),
('TOUR-016', 'Lagunas de Huaper', 'Un conjunto hídrico lleno de vida donde el ganado altoandino encuentra un refugio.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 40.00, 20.00, 5, 'activo'),
('TOUR-017', 'Cañón de Huatuscalle', 'Desde aquí podrás apreciar la fuerza del tiempo esculpida en piedra. Geologías impresionantes.', (SELECT id FROM categoria WHERE nombre='Mirador' LIMIT 1), 30.00, 15.00, 4, 'activo'),
('TOUR-018', 'Parque de los Héroes', 'Un espacio de reunión familiar y respeto histórico. Sus áreas verdes invitan a pasear.', (SELECT id FROM categoria WHERE nombre='Ciudad' LIMIT 1), 0.00, 0.00, 1, 'activo'),
('TOUR-019', 'Parroquia San Pedro Matriz', 'La cúpula que destaca en el horizonte urbano de Huanta. Centro de tradiciones.', (SELECT id FROM categoria WHERE nombre='Religioso' LIMIT 1), 10.00, 5.00, 1, 'activo'),
('TOUR-020', 'Pozas Esmeralda Mayocc', 'Pozas de agua tibia y color turquesa, refugio perfecto junto al río Mantaro.', (SELECT id FROM categoria WHERE nombre='Naturaleza' LIMIT 1), 60.00, 40.00, 8, 'activo'),
('TOUR-021', 'Puente Huarpa', 'Estructura histórica que une ciudades sobre el río Huarpa. Vistas espectaculares.', (SELECT id FROM categoria WHERE nombre='Arquitectura' LIMIT 1), 20.00, 15.00, 2, 'activo'),
('TOUR-022', 'Puente Rumichaca', 'Su nombre significa Puente de Piedra. Testimonio de la arquitectura colonial.', (SELECT id FROM categoria WHERE nombre='Arquitectura' LIMIT 1), 20.00, 15.00, 2, 'activo'),
('TOUR-023', 'Vista Panorámica de Huanta', 'Toda la Esmeralda de los Andes a tus pies en una sola mirada.', (SELECT id FROM categoria WHERE nombre='Mirador' LIMIT 1), 10.00, 5.00, 1, 'activo'),
('TOUR-024', 'Plaza de Armas (Sunset)', 'La plaza en su hora más mágica, cuando la luz dorada baña nuestra pileta central.', (SELECT id FROM categoria WHERE nombre='Ciudad' LIMIT 1), 0.00, 0.00, 1, 'activo');

-- 4. Crear salidas de ejemplo para que las reservas funcionen
INSERT INTO salida (fk_tour, fecha_hora, cupos_totales, cupos_disponibles, estado)
SELECT id, NOW() + INTERVAL '1 day', 40, 40, 'abierta' FROM tour;
