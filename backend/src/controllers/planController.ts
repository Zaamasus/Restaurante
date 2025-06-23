// Importa os tipos do Express para usar nas funções
import { Request, Response } from 'express';

// Função para listar todos os planos disponíveis na plataforma
export const listarPlanos = (req: Request, res: Response) => {
  // Exemplo de planos fictícios
  const planos = [
    { id: 1, nome: 'Básico', preco: 99, recursos: ['Pedidos ilimitados', '1 restaurante'] },
    { id: 2, nome: 'Premium', preco: 199, recursos: ['Pedidos ilimitados', 'Vários restaurantes', 'Suporte dedicado'] },
  ];

  // Retorna a lista de planos
  return res.json(planos);
};

// Função para criar um novo plano
export const criarPlano = (req: Request, res: Response) => {
  // Pega os dados enviados pelo superadmin
  const { nome, preco, recursos } = req.body;

  // Aqui você salvaria no banco de dados
  // Exemplo de resposta simulando sucesso
  return res.status(201).json({
    id: 3,
    nome,
    preco,
    recursos,
  });
};

// Função para editar um plano existente
export const editarPlano = (req: Request, res: Response) => {
  // Pega o id do plano pela URL e os novos dados pelo corpo da requisição
  const { id } = req.params;
  const { nome, preco, recursos } = req.body;

  // Aqui você atualizaria no banco de dados
  // Exemplo de resposta simulando sucesso
  return res.json({
    id,
    nome,
    preco,
    recursos,
  });
}; 