import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env desde la raíz de /server
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('✅ Conexión establecida con la base de datos PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en el pool de la base de datos:', err);
});
