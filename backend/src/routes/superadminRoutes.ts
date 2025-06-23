import { Router, Request, Response } from 'express';
import { loginSuperadmin, listarEmpresas, criarEmpresa, cadastrarRestauranteEUsuarios, atualizarPlanoRestaurante, dashboardSuperadmin, buscarEmpresaPorId, editarEmpresa, excluirEmpresa } from '../controllers/superadminController';

// Cria um roteador para as rotas do superadministrador
const router = Router();

// Rota para login do superadministrador
router.post('/login', loginSuperadmin as (req: Request, res: Response) => void);

// Rota para listar empresas
router.get('/empresas', listarEmpresas as (req: Request, res: Response) => void);

// Rota para criar nova empresa
router.post('/empresas', criarEmpresa as (req: Request, res: Response) => void);

// Rota para cadastrar restaurante e usuários
router.post('/cadastrar-restaurante', cadastrarRestauranteEUsuarios as (req: Request, res: Response) => void);

// Rota para atualizar o plano de um restaurante
router.put('/restaurantes/atualizar-plano', atualizarPlanoRestaurante as (req: Request, res: Response) => void);

// Rota para dashboard resumido do superadmin
router.get('/dashboard', dashboardSuperadmin as (req: Request, res: Response) => void);

// Rota para buscar uma empresa específica pelo id
router.get('/empresas/:id', buscarEmpresaPorId as (req: Request, res: Response) => void);

// Rota para editar uma empresa
router.put('/empresas/:id', editarEmpresa as (req: Request, res: Response) => void);

// Rota para excluir uma empresa
router.delete('/empresas/:id', excluirEmpresa as (req: Request, res: Response) => void);

export default router; 