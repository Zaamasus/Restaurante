import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // Estados para armazenar email, senha e mensagem de erro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/superadmin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.erro || 'Erro ao fazer login');
        return;
      }
      // Salva o tipo de usuário e email no localStorage
      localStorage.setItem('role', data.funcao || 'superadmin');
      localStorage.setItem('email', email);
      // Redireciona para o painel correto conforme o tipo de usuário (pt-br)
      if (data.funcao === 'superadmin') {
        navigate('/superadmin/cadastrar-restaurante');
      } else if (data.funcao === 'admin-restaurante') {
        navigate('/admin/dashboard');
      } else if (data.funcao === 'garcom') {
        navigate('/garcom/dashboard');
      } else if (data.funcao === 'cozinha') {
        navigate('/cozinha/dashboard');
      } 
    } catch (err) {
      setError('Erro de conexão com o servidor');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">Acessar o Sistema</h1>
        <p className="text-center text-gray-500 mb-6">Entre com seu e-mail e senha para continuar</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Sua senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login; 