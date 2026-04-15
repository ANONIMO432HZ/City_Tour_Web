-- ==========================================================
-- SISTEMA INKAEXPLORE - BASE DE DATOS PROFESIONAL
-- ==========================================================

-- 1. MODULO DE CATALOGO (EL PRODUCTO)
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    creado_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tour (
    id SERIAL PRIMARY KEY,
    fk_categoria INTEGER REFERENCES categoria(id),
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio_base_adulto NUMERIC(10,2) NOT NULL CHECK (precio_base_adulto >= 0),
    precio_base_nino NUMERIC(10,2) NOT NULL DEFAULT 0,
    duracion_horas INTEGER,
    incluye TEXT,
    no_incluye TEXT,
    recomendaciones TEXT,
    estado VARCHAR(20) DEFAULT 'activo', -- activo, inactivo
    creado_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE itinerario (
    id SERIAL PRIMARY KEY,
    fk_tour INTEGER REFERENCES tour(id) ON DELETE CASCADE,
    nro_dia INTEGER DEFAULT 1,
    hora_inicio TIME,
    titulo VARCHAR(200),
    descripcion TEXT
);

-- 2. MODULO ALIADOS (CONVENIOS Y COSTOS)
CREATE TABLE aliado (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Restaurante, Hotel, Transporte, Guia
    contacto_nombre VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    ruc VARCHAR(11) UNIQUE,
    direccion TEXT
);

CREATE TABLE convenio (
    id SERIAL PRIMARY KEY,
    fk_aliado INTEGER REFERENCES aliado(id),
    concepto VARCHAR(150), -- Ej: Almuerzo Buffet Turistico
    costo_negociado NUMERIC(10,2) NOT NULL, -- Lo que pagamos nosotros
    moneda VARCHAR(3) DEFAULT 'PEN',
    fecha_inicio DATE,
    fecha_fin DATE,
    notas TEXT
);

-- 3. MODULO OPERATIVO (SALIDAS Y GASTOS REALES)
CREATE TABLE salida (
    id SERIAL PRIMARY KEY,
    fk_tour INTEGER REFERENCES tour(id),
    fecha_hora TIMESTAMPTZ NOT NULL,
    cupos_totales INTEGER NOT NULL,
    cupos_disponibles INTEGER NOT NULL,
    estado VARCHAR(20) DEFAULT 'abierta' -- abierta, cerrada, cancelada
);

CREATE TABLE gasto_operativo (
    id SERIAL PRIMARY KEY,
    fk_salida INTEGER REFERENCES salida(id),
    fk_aliado INTEGER REFERENCES aliado(id),
    monto NUMERIC(10,2) NOT NULL,
    descripcion VARCHAR(200),
    comprobante_nro VARCHAR(50),
    fecha_gasto DATE DEFAULT CURRENT_DATE
);

-- 4. MODULO DE VENTAS (CRM Y RESERVAS)
CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    documento_id VARCHAR(20) UNIQUE,
    nacionalidad VARCHAR(50),
    creado_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reserva (
    id SERIAL PRIMARY KEY,
    fk_cliente INTEGER REFERENCES cliente(id),
    fecha_reserva TIMESTAMPTZ DEFAULT NOW(),
    monto_total NUMERIC(10,2) NOT NULL,
    adelanto_pagado NUMERIC(10,2) DEFAULT 0,
    estado_pago VARCHAR(20) DEFAULT 'pendiente', -- pendiente, parcial, pagado
    estado_reserva VARCHAR(20) DEFAULT 'confirmada' -- cotizacion, confirmada, cancelada
);

CREATE TABLE reserva_pasajero (
    id SERIAL PRIMARY KEY,
    fk_reserva INTEGER REFERENCES reserva(id) ON DELETE CASCADE,
    fk_salida INTEGER REFERENCES salida(id),
    nombre_pasajero VARCHAR(200),
    documento VARCHAR(20),
    tipo_pasajero VARCHAR(20) DEFAULT 'adulto', -- adulto, niño, infante
    precio_aplicado NUMERIC(10,2) NOT NULL -- Precio real cobrado a este pasajero
);

CREATE TABLE pago (
    id SERIAL PRIMARY KEY,
    fk_reserva INTEGER REFERENCES reserva(id),
    monto NUMERIC(10,2) NOT NULL,
    metodo_pago VARCHAR(50), -- Efectivo, Transferencia, Tarjeta, Yape
    nro_operacion VARCHAR(100),
    fecha_pago TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- 5. DATOS DE PRUEBA (MOCK DATA)
-- ==========================================================

INSERT INTO categoria (nombre, descripcion) VALUES 
('Aventura y Trekking', 'Tours de alto esfuerzo físico en los Andes'),
('Cultura y Religión', 'Visitas a templos, iglesias y museos históricos'),
('Naturaleza y Paisaje', 'Circuitos de lagunas y miradores panorámicos');

INSERT INTO tour (fk_categoria, codigo, nombre, precio_base_adulto, duracion_horas) VALUES 
(1, 'INKA-001', 'Nevado Razuhuillca Extreme', 120.00, 8),
(3, 'INKA-002', 'Laguna Verde Qocha Esmeralda', 80.00, 6);

INSERT INTO aliado (nombre, tipo, ruc) VALUES 
('Restaurante La Huanta', 'Restaurante', '20123456789'),
('Transportes Veloz S.A.', 'Transporte', '20987654321');

INSERT INTO salida (fk_tour, fecha_hora, cupos_totales, cupos_disponibles) VALUES 
(1, '2026-05-20 08:00:00-05', 15, 15);
