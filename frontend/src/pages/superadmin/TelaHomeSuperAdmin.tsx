import { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import Header from "../../components/Header";

type DashboardData = {
  empresas_ativas: number;
  total_usuarios: number;
  receita_mensal: number;
  taxa_crescimento: number;
  empresas_recentes: { nome: string; email: string; status: string }[];
  distribuicao_planos: { nome: string; qtd: number }[];
};

function TelaHomeSuperAdmin() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/superadmin/dashboard")
      .then(res => res.json())
      .then(data => {
        setDashboard(data);
        setLoading(false);
      });
  }, []);

  if (loading || !dashboard) {
    return <div className="p-8 text-center text-gray-500">Carregando dados do dashboard...</div>;
  }

  // Agora use dashboard.empresas_ativas, dashboard.total_usuarios, etc. nos cards
  // Exemplo de uso:
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* HEADER FIXO */}
        <Header />
        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 p-4 md:p-8 flex flex-col items-center transition-all duration-200">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 border">
                <div className="flex items-center gap-2 text-gray-500 text-sm">Empresas Ativas</div>
                <div className="text-2xl font-bold text-blue-700">{dashboard.empresas_ativas}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 border">
                <div className="flex items-center gap-2 text-gray-500 text-sm">Total de Usuários</div>
                <div className="text-2xl font-bold text-green-700">{dashboard.total_usuarios}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 border">
                <div className="flex items-center gap-2 text-gray-500 text-sm">Receita Mensal</div>
                <div className="text-2xl font-bold text-purple-700">
                  {dashboard.receita_mensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
              </div>
          
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Empresas Recentes */}
              <div className="bg-white rounded-lg shadow p-6 border">
                <div className="font-semibold mb-4">Empresas Recentes</div>
                <div className="space-y-2">
                  {dashboard.empresas_recentes.map((e, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded px-4 py-2">
                      <div>
                        <div className="font-medium text-gray-800">{e.nome}</div>
                        <div className="text-xs text-gray-500">{e.email}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${e.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{e.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Distribuição de Planos */}
              <div className="bg-white rounded-lg shadow p-6 border">
                <div className="font-semibold mb-4">Distribuição de Planos</div>
                <div className="space-y-3">
                  {dashboard.distribuicao_planos.map((p, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>{p.nome}</span>
                        <span>{p.qtd} empresas</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded">
                        <div className={`h-2 rounded ${p.qtd > 0 ? 'bg-blue-500' : 'bg-gray-200'}`} style={{ width: `${p.qtd * 50}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TelaHomeSuperAdmin;