import { supabase } from './supabaseClient';

export interface OrderInput {
  restaurant_id: string;
  table_number: number;
  items: any[];
  total: number;
}

export async function criarPedidoNoSupabase(order: OrderInput) {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        ...order,
        status: 'pending',
        items: JSON.stringify(order.items),
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listarPedidosDoSupabase() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
} 