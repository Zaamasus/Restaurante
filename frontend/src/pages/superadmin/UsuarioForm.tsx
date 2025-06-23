import { HiOutlineTrash } from "react-icons/hi";
import React from "react";

interface Usuario {
  nome: string;
  email: string;
  funcao: "admin-restaurante" | "garcom" | "cozinha";
  senha?: string;
}

const funcoes = [
  { value: "admin-restaurante", label: "Admin" },
  { value: "garcom", label: "Garçom" },
  { value: "cozinha", label: "Cozinha" },
];

interface UsuarioFormProps {
  usuario: Usuario;
  index: number;
  onChange: (index: number, field: keyof Usuario, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ usuario, index, onChange, onRemove, canRemove }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-end bg-green-50 rounded p-3 border border-green-100">
      <input
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:border-green-400"
        placeholder="Nome"
        value={usuario.nome}
        onChange={e => onChange(index, "nome", e.target.value)}
        required
      />
      <input
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:border-green-400"
        placeholder="Email"
        type="email"
        value={usuario.email}
        onChange={e => onChange(index, "email", e.target.value)}
        required
      />
      <select
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:border-green-400"
        value={usuario.funcao}
        onChange={e => onChange(index, "funcao", e.target.value)}
      >
        {funcoes.map(f => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>
      {canRemove && (
        <button type="button" onClick={() => onRemove(index)} className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full transition" title="Remover usuário">
          <HiOutlineTrash size={20} />
        </button>
      )}
    </div>
  );
};

export default UsuarioForm; 