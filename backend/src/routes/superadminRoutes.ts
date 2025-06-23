import { Router } from 'express';
import { loginSuperadmin, listarEmpresas, criarEmpresa, cadastrarRestauranteEUsuarios, atualizarPlanoRestaurante, dashboardSuperadmin } from '../controllers/superadminController';

// Cria um roteador para as rotas do superadministrador
const router = Router();

// Rota para login do superadministrador
router.post('/login', loginSuperadmin);

// Rota para listar empresas
router.get('/empresas', listarEmpresas);

// Rota para criar nova empresa
router.post('/empresas', criarEmpresa);

// Rota para cadastrar restaurante e usuários
router.post('/cadastrar-restaurante', cadastrarRestauranteEUsuarios);

// Rota para atualizar o plano de um restaurante
router.put('/restaurantes/atualizar-plano', atualizarPlanoRestaurante);

// Rota para dashboard resumido do superadmin
router.get('/dashboard', dashboardSuperadmin);

export default router; 