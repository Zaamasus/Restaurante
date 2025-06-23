// Importa os tipos do Express para usar nas funções
import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

// Função para login do superadministrador usando Supabase Auth
export const loginSuperadmin = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  // Autentica o usuário no Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error || !data.user) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  // Busca o tipo de usuário (funcao) na tabela 'usuarios' pelo id do usuário autenticado
  const { data: usuario, error: erroUsuario } = await supabase
    .from('usuarios')
    .select('funcao')
    .eq('id', data.user.id)
    .single();

  if (erroUsuario || !usuario) {
    return res.status(403).json({ erro: 'Usuário não possui perfil cadastrado.' });
  }

  // Retorna token, tipo de usuário e email para o frontend
  return res.json({
    token: data.session?.access_token,
    funcao: usuario.funcao, // agora retorna o campo correto da tabela
    email: data.user.email,
  });
};

// Função para listar empresas cadastradas na plataforma
export const listarEmpresas = (req: Request, res: Response) => {
  // Aqui normalmente você buscaria no banco de dados
  // Exemplo de empresas fictícias
  const empresas = [
    { id: 1, nome: 'Restaurante Sabor', plano: 'Premium', status: 'Ativo' },
    { id: 2, nome: 'Pizzaria Massa', plano: 'Básico', status: 'Pausado' },
  ];

  // Retorna a lista de empresas
  return res.json(empresas);
};

// Função para criar uma nova empresa
export const criarEmpresa = (req: Request, res: Response) => {
  // Pega os dados enviados pelo superadmin
  const { nome, logo, subdominio, plano } = req.body;

  // Aqui você salvaria no banco de dados
  // Exemplo de resposta simulando sucesso
  return res.status(201).json({
    id: 3,
    nome,
    logo,
    subdominio,
    plano,
    status: 'Ativo',
  });
}; 