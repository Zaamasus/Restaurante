// Importa os tipos do Express para usar nas funções
import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

// Função para listar todos os planos disponíveis na plataforma
export const listarPlanos = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('planos')
    .select('*');

  if (error) {
    return res.status(500).json({ erro: 'Erro ao buscar planos', detalhes: error.message });
  }
  return res.json(data);
};

// Função para criar um novo plano
export const criarPlano = async (req: Request, res: Response) => {
  const { nome, preco, descricao, recursos } = req.body;
  const { data, error } = await supabase
    .from('planos')
    .insert([{ nome, preco, descricao, recursos }])
    .select()
    .single();
  if (error) {
    return res.status(500).json({ erro: 'Erro ao criar plano', detalhes: error.message });
  }
  return res.status(201).json(data);
};

// Função para editar um plano existente
export const editarPlano = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, preco, descricao, recursos } = req.body;
  const { data, error } = await supabase
    .from('planos')
    .update({ nome, preco, descricao, recursos })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    return res.status(500).json({ erro: 'Erro ao editar plano', detalhes: error.message });
  }
  return res.json(data);
};

// Função para excluir um plano
export const excluirPlano = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('planos')
    .delete()
    .eq('id', id);
  if (error) {
    return res.status(500).json({ erro: 'Erro ao excluir plano', detalhes: error.message });
  }
  return res.status(204).send();
}; 