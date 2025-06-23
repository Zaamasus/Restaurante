// Importa os tipos do Express para usar nas funções
import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';
import crypto from 'crypto';

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
export const listarEmpresas = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('restaurantes')
    .select('id, nome, endereco, telefone, plano, status, criado_em');

  if (error) {
    return res.status(500).json({ erro: 'Erro ao buscar empresas', detalhes: error.message });
  }
  return res.json(data);
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

// Função para cadastrar restaurante e seus usuários
export const cadastrarRestauranteEUsuarios = async (req: Request, res: Response) => {
  const { nome, endereco, usuarios } = req.body;

  // 1. Cria o restaurante
  const { data: restaurante, error: erroRestaurante } = await supabase
    .from('restaurantes')
    .insert([{ nome, endereco }])
    .select()
    .single();

  if (erroRestaurante || !restaurante) {
    return res.status(500).json({ erro: 'Erro ao criar restaurante', detalhes: erroRestaurante?.message });
  }

  const usuariosCriados: any[] = [];
  try {
    for (const u of usuarios) {
      // 2. Cria o usuário no Supabase Auth
      const senha = u.senha || require('crypto').randomBytes(8).toString('hex');
      const { data: userAuth, error: erroAuth } = await supabase.auth.admin.createUser({
        email: u.email,
        password: senha,
        email_confirm: true,
      });

      if (erroAuth || !userAuth?.user) {
        throw new Error(`Erro ao criar usuário ${u.email}: ${erroAuth?.message}`);
      }

      // 3. Insere o usuário na tabela usuarios
      const { data: usuarioDB, error: erroUsuarioDB } = await supabase
        .from('usuarios')
        .insert([{
          id: userAuth.user.id,
          restaurante_id: restaurante.id,
          nome: u.nome,
          email: u.email,
          funcao: u.funcao,
        }])
        .select()
        .single();

      if (erroUsuarioDB || !usuarioDB) {
        throw new Error(`Erro ao inserir usuário ${u.email} no banco: ${erroUsuarioDB?.message}`);
      }

      usuariosCriados.push(usuarioDB);
    }

    return res.status(201).json({ restaurante, usuarios: usuariosCriados });
  } catch (err: any) {
    // Rollback manual: remove restaurante e usuários criados
    await supabase.from('usuarios').delete().eq('restaurante_id', restaurante.id);
    await supabase.from('restaurantes').delete().eq('id', restaurante.id);
    return res.status(500).json({ erro: err.message });
  }
};

// Atualizar o plano de um restaurante
export const atualizarPlanoRestaurante = async (req: Request, res: Response) => {
  const { restaurante_id, plano_id } = req.body;

  const { data, error } = await supabase
    .from('restaurantes')
    .update({ plano_id })
    .eq('id', restaurante_id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ erro: 'Erro ao atualizar plano do restaurante', detalhes: error.message });
  }
  return res.json(data);
};

// Endpoint resumido para o dashboard do superadmin
export const dashboardSuperadmin = async (req: Request, res: Response) => {
  // Buscar empresas
  const { data: empresas, error: erroEmpresas } = await supabase
    .from('restaurantes')
    .select('id, nome, endereco, telefone, plano_id, status, criado_em')
    .order('criado_em', { ascending: false });
  if (erroEmpresas) {
    return res.status(500).json({ erro: 'Erro ao buscar empresas', detalhes: erroEmpresas.message });
  }

  // Buscar usuários
  const { data: usuarios, error: erroUsuarios } = await supabase
    .from('usuarios')
    .select('id');
  if (erroUsuarios) {
    return res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: erroUsuarios.message });
  }

  // Buscar planos
  const { data: planos, error: erroPlanos } = await supabase
    .from('planos')
    .select('id, nome, preco');
  if (erroPlanos) {
    return res.status(500).json({ erro: 'Erro ao buscar planos', detalhes: erroPlanos.message });
  }

  // Empresas ativas
  const empresasAtivas = empresas.filter(e => e.status === 'Ativo');

  // Receita mensal (soma dos preços dos planos dos restaurantes ativos)
  let receitaMensal = 0;
  empresasAtivas.forEach(e => {
    const plano = planos.find(p => p.id === e.plano_id);
    if (plano) receitaMensal += Number(plano.preco);
  });

  // Distribuição de planos
  const distribuicaoPlanos = planos.map(p => ({
    nome: p.nome,
    qtd: empresasAtivas.filter(e => e.plano_id === p.id).length
  }));

  // Empresas recentes (últimas 3)
  const empresasRecentes = empresas.slice(0, 3).map(e => ({
    nome: e.nome,
    email: e.telefone || '', // ou outro campo de contato
    status: e.status
  }));

  // Taxa de crescimento fictícia
  const taxaCrescimento = 12;

  return res.json({
    empresas_ativas: empresasAtivas.length,
    total_usuarios: usuarios.length,
    receita_mensal: receitaMensal,
    taxa_crescimento: taxaCrescimento,
    empresas_recentes: empresasRecentes,
    distribuicao_planos: distribuicaoPlanos
  });
};

export const buscarEmpresaPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('restaurantes')
    .select('id, nome, endereco, telefone, plano, status, criado_em')
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).json({ erro: 'Empresa não encontrada' });
  }
  return res.json(data);
};

export const editarEmpresa = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, plano, endereco, telefone, status } = req.body;

  const { data, error } = await supabase
    .from('restaurantes')
    .update({ nome, plano, endereco, telefone, status })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    return res.status(500).json({ erro: 'Erro ao editar empresa', detalhes: error?.message });
  }
  return res.json(data);
}; 