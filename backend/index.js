import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Root Info Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Ajju Aquarium Backend API',
    status: 'online',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      login: '/api/auth/login'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// API Routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
