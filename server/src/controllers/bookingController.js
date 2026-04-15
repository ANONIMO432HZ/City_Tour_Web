import { pool } from '../config/db.js';

export const createBooking = async (req, res) => {
  const { cliente, tour_id, pasajeros } = req.body;
  // pasajeros es un array: [{ nombre, documento, tipo_pasajero, precio }]

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Upsert del Cliente (O lo buscamos o lo creamos)
    const clientQuery = `
      INSERT INTO cliente (nombre_completo, email, telefono, documento_id)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET nombre_completo = EXCLUDED.nombre_completo
      RETURNING id
    `;
    const clientRes = await client.query(clientQuery, [
      cliente.nombre,
      cliente.email,
      cliente.telefono,
      cliente.documento
    ]);
    const clienteId = clientRes.rows[0].id;

    // 2. Buscar una salida disponible para el tour
    const salidaQuery = `
      SELECT id, cupos_disponibles FROM salida 
      WHERE fk_tour = $1 AND estado = 'abierta' AND fecha_hora > NOW()
      ORDER BY fecha_hora ASC LIMIT 1
    `;
    const salidaRes = await client.query(salidaQuery, [tour_id]);
    
    if (salidaRes.rows.length === 0) {
      throw new Error('No hay salidas disponibles para este tour');
    }
    
    const salida = salidaRes.rows[0];
    if (salida.cupos_disponibles < pasajeros.length) {
      throw new Error('No hay suficientes cupos disponibles');
    }

    // 3. Crear la Reserva (Cabecera)
    const montoTotal = pasajeros.reduce((sum, p) => sum + parseFloat(p.precio), 0);
    const reservaQuery = `
      INSERT INTO reserva (fk_cliente, monto_total, estado_pago, estado_reserva)
      VALUES ($1, $2, 'pendiente', 'confirmada')
      RETURNING id
    `;
    const reservaRes = await client.query(reservaQuery, [clienteId, montoTotal]);
    const reservaId = reservaRes.rows[0].id;

    // 4. Registrar Pasajeros
    const paxQuery = `
      INSERT INTO reserva_pasajero (fk_reserva, fk_salida, nombre_pasajero, documento, tipo_pasajero, precio_aplicado)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    for (const pax of pasajeros) {
      await client.query(paxQuery, [
        reservaId,
        salida.id,
        pax.nombre,
        pax.documento,
        pax.tipo_pasajero,
        pax.precio
      ]);
    }

    // 5. Descontar Cupos
    await client.query(
      'UPDATE salida SET cupos_disponibles = cupos_disponibles - $1 WHERE id = $2',
      [pasajeros.length, salida.id]
    );

    await client.query('COMMIT');
    res.status(201).json({ 
      success: true, 
      reserva_id: reservaId,
      mensaje: 'Reserva creada exitosamente' 
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error en Transacción de Reserva:', err.message);
    res.status(400).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
};
