import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tourRoutes from './routes/tours.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', tourRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('InkaExplore API is running...');
});

app.listen(PORT, () => {
  console.log(`
  🚀 INKAEXPLORE BACKEND INICIADO
  -------------------------------
  📡 URL: http://localhost:${PORT}
  🛠️  Modo: Desarrollo
  -------------------------------
  `);
});
