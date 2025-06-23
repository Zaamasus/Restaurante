// Importa os tipos do Express para usar nas funções
import { Request, Response } from 'express';
// Importa o cliente do Supabase para acessar o banco de dados
import { supabase } from '../services/supabaseClient';

// Função para login da cozinha
export const loginCozinha = async (req: Request, res: Response) => {
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
  const tipoUsuario = data.user.user_metadata?.role || 'cozinha';
  return res.json({
    token: data.session?.access_token,
    role: tipoUsuario,
    email: data.user.email,
  });
};

// Função para listar pedidos pendentes ou em preparo
export const listarPedidos = async (req: Request, res: Response) => {
  const restauranteId = req.query.restauranteId as string;
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('restaurant_id', restauranteId)
    .in('status', ['pending', 'preparing'])
    .order('created_at', { ascending: true });
  if (error) {
    return res.status(500).json({ erro: 'Erro ao buscar pedidos', detalhes: error.message });
  }
  return res.json(data);
};

// Função para atualizar o status de um pedido (preparando ou pronto)
export const atualizarStatusPedido = async (req: Request, res: Response) => {
  const { id } = req.params; // id do pedido
  const { status } = req.body; // novo status: 'preparing' ou 'ready'
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    return res.status(500).json({ erro: 'Erro ao atualizar pedido', detalhes: error.message });
  }
  return res.json(data);
}; 