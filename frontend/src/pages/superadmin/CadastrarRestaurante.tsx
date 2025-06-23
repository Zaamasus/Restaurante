import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

// Tipagem para usuário
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

function CadastrarRestaurante() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { nome: "", email: "", funcao: "admin-restaurante" },
  ]);

  function handleUsuarioChange(index: number, field: keyof Usuario, value: string) {
    const novosUsuarios = [...usuarios];
    if (field === "funcao") {
      novosUsuarios[index][field] = value as Usuario["funcao"];
    } else {
      novosUsuarios[index][field] = value;
    }
    setUsuarios(novosUsuarios);
  }

  function adicionarUsuario() {
    setUsuarios([...usuarios, { nome: "", email: "", funcao: "garcom" }]);
  }

  function removerUsuario(index: number) {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Enviar para o backend
    const res = await fetch("/api/superadmin/cadastrar-restaurante", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, endereco, usuarios }),
    });
    if (res.ok) {
      alert("Restaurante cadastrado com sucesso!");
      setNome("");
      setEndereco("");
      setUsuarios([{ nome: "", email: "", funcao: "admin-restaurante" }]);
    } else {
      alert("Erro ao cadastrar restaurante.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full border border-green-100">
        <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">Cadastrar Restaurante</h2>
        <p className="text-center text-gray-500 mb-6">Preencha os dados do restaurante e dos usuários iniciais</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do restaurante:</label>
          <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400" value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Endereço:</label>
          <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400" value={endereco} onChange={e => setEndereco(e.target.value)} required />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-green-700">Usuários do restaurante</h3>
        <div className="space-y-3 mb-4">
          {usuarios.map((usuario, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-2 items-stretch md:items-end bg-green-50 rounded p-3 border border-green-100">
              <input
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:border-green-400"
                placeholder="Nome"
                value={usuario.nome}
                onChange={e => handleUsuarioChange(idx, "nome", e.target.value)}
                required
              />
              <input
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:border-green-400"
                placeholder="Email"
                type="email"
                value={usuario.email}
                onChange={e => handleUsuarioChange(idx, "email", e.target.value)}
                required
              />
              <select
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-300 focus:border-green-400"
                value={usuario.funcao}
                onChange={e => handleUsuarioChange(idx, "funcao", e.target.value)}
              >
                {funcoes.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
              {usuarios.length > 1 && (
                <button type="button" onClick={() => removerUsuario(idx)} className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full transition" title="Remover usuário">
                  <HiOutlineTrash size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={adicionarUsuario} className="mb-6 w-full md:w-auto bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-4 py-2 rounded transition">
          + Adicionar usuário
        </button>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition text-lg shadow">
          Cadastrar Restaurante
        </button>
      </form>
    </div>
  );
}

export default CadastrarRestaurante; 