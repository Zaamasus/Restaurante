import React, { useState, useEffect } from 'react';

interface Empresa {
  id: number;
  nome: string;
  telefone: string;
  endereco?: string;
  plano: string;
  status: 'Ativo' | 'Inativo';
}

interface EditarEmpresaModalProps {
  open: boolean;
  onClose: () => void;
  empresa: Empresa | null;
  onSave: (dados: Partial<Empresa>) => void;
}

const EditarEmpresaModal: React.FC<EditarEmpresaModalProps> = ({ open, onClose, empresa, onSave }) => {
  const [nome, setNome] = useState('');
  const [plano, setPlano] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState<'Ativo' | 'Inativo'>('Ativo');

  useEffect(() => {
    if (empresa) {
      setNome(empresa.nome || '');
      setPlano(empresa.plano || '');
      setEndereco(empresa.endereco || '');
      setTelefone(empresa.telefone || '');
      setStatus(empresa.status || 'Ativo');
    }
  }, [empresa]);

  if (!open || !empresa) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ nome, plano, endereco, telefone, status });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Empresa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input className="w-full border rounded px-3 py-2" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Plano</label>
            <input className="w-full border rounded px-3 py-2" value={plano} onChange={e => setPlano(e.target.value)} required />
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
            <label className="block text-sm font-medium mb-1">Status</label>
            <select className="w-full border rounded px-3 py-2" value={status} onChange={e => setStatus(e.target.value as 'Ativo' | 'Inativo')} required>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEmpresaModal; 