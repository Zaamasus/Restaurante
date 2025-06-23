import { Router } from 'express';
import { loginAdminRestaurante, listarProdutos, criarProduto } from '../controllers/adminRestauranteController';

// Cria um roteador para as rotas do administrador do restaurante
const router = Router();

// Rota para login do administrador do restaurante
router.post('/login', loginAdminRestaurante);

// Rota para listar produtos do restaurante
router.get('/produtos', listarProdutos);

// Rota para criar um novo produto
router.post('/produtos', criarProduto);

export default router; 