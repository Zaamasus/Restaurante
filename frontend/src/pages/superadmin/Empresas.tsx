import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import EditarEmpresaModal from './EditarEmpresaModal';

interface Empresa {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
  plano: string;
  status: 'Ativo' | 'Inativo';
  usuarios?: number;
  criado_em: string;
  endereco?: string;
}

function Empresas() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null);

  useEffect(() => {
    fetch('/api/superadmin/empresas')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar empresas');
        return res.json();
      })
      .then(data => {
        setEmpresas(data);
        setLoading(false);
      })
      .catch(err => {
        setErro(err.message);
        setLoading(false);
      });
  }, []);

  function handleVisualizar(empresa: Empresa) {
    fetch(`/api/superadmin/empresas/${empresa.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar empresa');
        return res.json();
      })
      .then(data => {
        alert(`Empresa: ${data.nome}\nEndereço: ${data.endereco}\nTelefone: ${data.telefone}\nPlano: ${data.plano}\nStatus: ${data.status}`);
      })
      .catch(err => {
        alert('Erro ao buscar empresa: ' + err.message);
      });
  }

  function handleEditar(empresa: Empresa) {
    fetch(`/api/superadmin/empresas/${empresa.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar empresa');
        return res.json();
      })
      .then(data => {
        setEmpresaSelecionada(data);
        setModalAberto(true);
      })
      .catch(err => {
        alert('Erro ao buscar empresa: ' + err.message);
      });
  }

  function handleSalvarEdicao(dados: Partial<Empresa>) {
    if (!empresaSelecionada) return;
    fetch(`/api/superadmin/empresas/${empresaSelecionada.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao editar empresa');
        setEmpresas(empresas.map(e => e.id === empresaSelecionada.id ? { ...e, ...dados } : e));
        setModalAberto(false);
        setEmpresaSelecionada(null);
        alert('Empresa editada com sucesso!');
      })
      .catch(err => {
        alert('Erro ao editar empresa: ' + err.message);
      });
  }

  function handleExcluir(empresa: Empresa) {
    if (window.confirm(`Tem certeza que deseja excluir a empresa "${empresa.nome}"?`)) {
      fetch(`/api/superadmin/empresas/${empresa.id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) throw new Error('Erro ao excluir empresa');
          setEmpresas(empresas.filter(e => e.id !== empresa.id));
          alert('Empresa excluída com sucesso!');
        })
        .catch(err => {
          alert('Erro ao excluir empresa: ' + err.message);
        });
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* HEADER FIXO */}
          <header className="h-16 bg-white border-b flex items-center justify-between px-2 sm:px-4 md:px-8">
            <div className="flex-1 flex justify-center">
              <span className="text-base sm:text-lg font-semibold text-center">Painel Super Administrador</span>
            </div>
          </header>
          <main className="flex-1 p-2 sm:p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Empresas</h2>
                  <p className="text-gray-500 text-xs sm:text-sm">Gerencie todas as empresas cadastradas</p>
                </div>
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-5 py-2 rounded transition flex items-center justify-center">
                  + Nova Empresa
                </button>
              </div>
              <div className="bg-white rounded-lg shadow border p-2 sm:p-0">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">Carregando empresas...</div>
                ) : erro ? (
                  <div className="p-8 text-center text-red-500">{erro}</div>
                ) : (
                  <>
                    {/* Cards para mobile */}
                    <div className="block sm:hidden space-y-3">
                      {empresas.map((empresa) => (
                        <div key={empresa.id} className="border rounded-lg p-3 flex flex-col gap-1 shadow-sm">
                          <div className="font-semibold text-base">{empresa.nome}</div>
                          <div className="text-xs text-gray-500 mb-1">{empresa.telefone}</div>
                          <div className="text-xs"><b>Endereço:</b> {empresa.endereco || '-'}</div>
                          <div className="text-xs"><b>Plano:</b> {empresa.plano}</div>
                          <div className="text-xs flex items-center gap-2"><b>Status:</b> <span className={`px-2 py-1 rounded text-xs font-semibold ${empresa.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{empresa.status}</span></div>
                          <div className="text-xs"><b>Criado em:</b> {new Date(empresa.criado_em).toLocaleString('pt-BR')}</div>
                          <div className="flex gap-3 mt-2">
                            <button className="text-gray-500 hover:text-blue-600" title="Visualizar" onClick={() => handleVisualizar(empresa)}>
                              <HiOutlineEye size={18} />
                            </button>
                            <button className="text-gray-500 hover:text-yellow-500" title="Editar" onClick={() => handleEditar(empresa)}>
                              <HiOutlinePencil size={18} />
                            </button>
                            <button className="text-gray-500 hover:text-red-600" title="Excluir" onClick={() => handleExcluir(empresa)}>
                              <HiOutlineTrash size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Tabela para telas médias e grandes */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="min-w-[600px] w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700">
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Nome</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Endereço</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Plano</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Status</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Criado em</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {empresas.map((empresa) => (
                            <tr key={empresa.id} className="border-t last:border-b">
                              <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                                <div className="font-medium text-gray-900 break-words max-w-[120px] sm:max-w-none">{empresa.nome}</div>
                                <div className="text-xs text-gray-500 break-words max-w-[120px] sm:max-w-none">{empresa.telefone}</div>
                              </td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap break-words max-w-[120px] sm:max-w-none">{empresa.endereco || '-'}</td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{empresa.plano}</td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${empresa.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{empresa.status}</span>
                              </td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{new Date(empresa.criado_em).toLocaleString('pt-BR')}</td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                                <div className="flex items-center justify-center gap-2 sm:gap-3">
                                  <button className="text-gray-500 hover:text-blue-600" title="Visualizar" onClick={() => handleVisualizar(empresa)}>
                                    <HiOutlineEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                                  </button>
                                  <button className="text-gray-500 hover:text-yellow-500" title="Editar" onClick={() => handleEditar(empresa)}>
                                    <HiOutlinePencil size={16} className="sm:w-[18px] sm:h-[18px]" />
                                  </button>
                                  <button className="text-gray-500 hover:text-red-600" title="Excluir" onClick={() => handleExcluir(empresa)}>
                                    <HiOutlineTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <EditarEmpresaModal
        open={modalAberto}
        onClose={() => { setModalAberto(false); setEmpresaSelecionada(null); }}
        empresa={empresaSelecionada}
        onSave={handleSalvarEdicao}
      />
    </>
  );
}

export default Empresas; 