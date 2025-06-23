import { Router } from 'express';
import { loginSuperadmin, listarEmpresas, criarEmpresa } from '../controllers/superadminController';

// Cria um roteador para as rotas do superadministrador
const router = Router();

// Rota para login do superadministrador
router.post('/login', loginSuperadmin);

// Rota para listar empresas
router.get('/empresas', listarEmpresas);

// Rota para criar nova empresa
router.post('/empresas', criarEmpresa);

export default router; 