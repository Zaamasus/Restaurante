export interface Order {
  id: string;
  mesa: number;
  itens: string[];
  status: 'pendente' | 'preparando' | 'entregue';
} 