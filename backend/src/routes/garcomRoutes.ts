import { Router } from 'express';
import { loginGarcom, listarMesas, criarPedido, statusPedidosMesa } from '../controllers/garcomController';

// Cria um roteador para as rotas do app Garçom
const router = Router();

// Rota para login do garçom
router.post('/login', loginGarcom);

// Rota para listar mesas do restaurante
router.get('/mesas', listarMesas);

// Rota para criar um novo pedido para uma mesa
router.post('/pedidos', criarPedido);

// Rota para acompanhar o status dos pedidos de uma mesa
router.get('/pedidos/status', statusPedidosMesa);

export default router; 