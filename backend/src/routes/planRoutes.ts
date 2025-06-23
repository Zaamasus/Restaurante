import { Router } from 'express';
import { listarPlanos, criarPlano, editarPlano, excluirPlano } from '../controllers/planController';

// Cria um roteador para as rotas de planos
const router = Router();

// Rota para listar todos os planos
router.get('/', listarPlanos);

// Rota para criar um novo plano
router.post('/', criarPlano);

// Rota para editar um plano existente
router.put('/:id', editarPlano);

// Rota para excluir um plano
router.delete('/:id', excluirPlano);

export default router; 