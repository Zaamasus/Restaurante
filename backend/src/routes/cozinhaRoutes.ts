import { Router } from 'express';
import { loginCozinha, listarPedidos, atualizarStatusPedido } from '../controllers/cozinhaController';

// Cria um roteador para as rotas do app Cozinha
const router = Router();

// Rota para login da cozinha
router.post('/login', loginCozinha);

// Rota para listar pedidos pendentes ou em preparo
router.get('/pedidos', listarPedidos);

// Rota para atualizar o status de um pedido
router.put('/pedidos/:id/status', atualizarStatusPedido);

export default router; 