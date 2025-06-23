import { Router } from 'express';
import { criarPedido, listarPedidos } from '../controllers/orderController';

const router = Router();

// Aqui futuramente adicionaremos as rotas de pedidos, mesas, etc.

router.post('/pedidos', criarPedido);
router.get('/pedidos', listarPedidos);

export default router; 