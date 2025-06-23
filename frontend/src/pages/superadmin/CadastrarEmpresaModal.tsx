import React, { useState, useEffect } from 'react';

interface Plano {
  id: number;
  nome: string;
}

interface CadastrarEmpresaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (dados: {
    nome: string;
    endereco: string;
    telefone: string;
    plano: string;
    status: 'Ativo' | 'Inativo';
  }) => void;
}

const CadastrarEmpresaModal: React.FC<CadastrarEmpresaModalProps> = ({ open, onClose, onSave }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [plano, setPlano] = useState('');
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo');
  const [planos, setPlanos] = useState<Plano[]>([]);

  useEffect(() => {
    if (open) {
      fetch('/api/planos')
        .then(res => res.json())
        .then(data => setPlanos(data))
        .catch(() => setPlanos([]));
    }
    if (open) {
      setNome('');
      setEndereco('');
      setTelefone('');
      setPlano('');
      setStatus('Ativo');
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ nome, endereco, telefone, plano, status });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Cadastrar Nova Empresa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input className="w-full border rounded px-3 py-2" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Endereço</label>
            <input className="w-full border rounded px-3 py-2" value={endereco} onChange={e => setEndereco(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input className="w-full border rounded px-3 py-2" value={telefone} onChange={e => setTelefone(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Plano</label>
            <select className="w-full border rounded px-3 py-2" value={plano} onChange={e => setPlano(e.target.value)} required>
              <option value="" disabled>Selecione um plano</option>
              {planos.map(p => (
                <option key={p.id} value={p.nome}>{p.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select className="w-full border rounded px-3 py-2" value={status} onChange={e => setStatus(e.target.value as 'Ativo' | 'Inativo')} required>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarEmpresaModal; 