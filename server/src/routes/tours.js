import { Router } from 'express';
import { pool } from '../config/db.js';

const router = Router();

// GET: Obtener todas las categorías
router.get('/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categoria ORDER BY nombre ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// GET: Obtener todos los tours
router.get('/tours', async (req, res) => {
  try {
    const query = `
      SELECT t.*, c.nombre as categoria_nombre 
      FROM tour t
      LEFT JOIN categoria c ON t.fk_categoria = c.id
      WHERE t.estado = 'activo'
      ORDER BY t.nombre ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener tours' });
  }
});

export default router;
