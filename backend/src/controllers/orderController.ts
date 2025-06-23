import { Request, Response } from 'express';
import { criarPedidoNoSupabase, listarPedidosDoSupabase } from '../services/orderService';

export const criarPedido = async (req: Request, res: Response) => {
  try {
    const pedido = await criarPedidoNoSupabase(req.body);
    res.status(201).json(pedido);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
};

export const listarPedidos = async (req: Request, res: Response) => {
  try {
    const pedidos = await listarPedidosDoSupabase();
    res.json(pedidos);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
}; 