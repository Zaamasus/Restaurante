// Importa os tipos do Express para usar nas funções
import { Request, Response } from 'express';
// Importa o cliente do Supabase para acessar o banco de dados
import { supabase } from '../services/supabaseClient';

// Função para login do administrador do restaurante
export const loginAdminRestaurante = async (req: Request, res: Response) => {
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
  const tipoUsuario = data.user.user_metadata?.role || 'admin-restaurante';
  return res.json({
    token: data.session?.access_token,
    role: tipoUsuario,
    email: data.user.email,
  });
};

// Função para listar produtos do restaurante usando Supabase
export const listarProdutos = async (req: Request, res: Response) => {
  const restauranteId = req.query.restauranteId as string;
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restauranteId);
  if (error) {
    return res.status(500).json({ erro: 'Erro ao buscar produtos', detalhes: error.message });
  }
  return res.json(data);
};

// Função para criar um novo produto
export const criarProduto = async (req: Request, res: Response) => {
  const { restaurant_id, name, description, price, category } = req.body;
  const { data, error } = await supabase
    .from('menu_items')
    .insert([{ restaurant_id, name, description, price, category }])
    .select()
    .single();
  if (error) {
    return res.status(500).json({ erro: 'Erro ao criar produto', detalhes: error.message });
  }
  return res.status(201).json(data);
}; 