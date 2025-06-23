// Importa os tipos do Express para usar nas funções
import { Request, Response } from 'express';
// Importa o cliente do Supabase para acessar o banco de dados
import { supabase } from '../services/supabaseClient';

// Função para login do garçom
export const loginGarcom = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  // Autentica o usuário no Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });
  if (error || !data.user) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }
  // Busca o tipo de usuário (papel) do user_metadata
  const tipoUsuario = data.user.user_metadata?.role || 'garcom';
  return res.json({
    token: data.session?.access_token,
    role: tipoUsuario,
    email: data.user.email,
  });
};

// Função para listar mesas do restaurante
export const listarMesas = async (req: Request, res: Response) => {
  const restauranteId = req.query.restauranteId as string;
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .eq('restaurant_id', restauranteId);
  if (error) {
    return res.status(500).json({ erro: 'Erro ao buscar mesas', detalhes: error.message });
  }
  return res.json(data);
};

// Função para criar um novo pedido para uma mesa
export const criarPedido = async (req: Request, res: Response) => {
  const { restaurant_id, table_number, items, total } = req.body;
  const { data, error } = await supabase
    .from('orders')
    .insert([{ restaurant_id, table_number, items, total, status: 'pending' }])
    .select()
    .single();
  if (error) {
    return res.status(500).json({ erro: 'Erro ao criar pedido', detalhes: error.message });
  }
  return res.status(201).json(data);
};

// Função para acompanhar o status dos pedidos de uma mesa
export const statusPedidosMesa = async (req: Request, res: Response) => {
  const { restaurant_id, table_number } = req.query;
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('restaurant_id', restaurant_id)
    .eq('table_number', table_number)
    .order('created_at', { ascending: false });
  if (error) {
    return res.status(500).json({ erro: 'Erro ao buscar pedidos', detalhes: error.message });
  }
  return res.json(data);
}; 