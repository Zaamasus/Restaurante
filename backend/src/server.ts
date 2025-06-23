import express from 'express';
import cors from 'cors';
import router from './routes';
import superadminRoutes from './routes/superadminRoutes';
import planRoutes from './routes/planRoutes';
import adminRestauranteRoutes from './routes/adminRestauranteRoutes';
import garcomRoutes from './routes/garcomRoutes';
import cozinhaRoutes from './routes/cozinhaRoutes';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Restaurante está rodando!');
});

app.use('/api', router);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/planos', planRoutes);
app.use('/api/admin', adminRestauranteRoutes);
app.use('/api/garcom', garcomRoutes);
app.use('/api/cozinha', cozinhaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 