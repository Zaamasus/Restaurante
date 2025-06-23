// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';

// Importar dashboards de exemplo (criaremos arquivos simples)
import GarcomDashboard from './pages/garcom/Dashboard';
import CozinhaDashboard from './pages/cozinha/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import SuperadminDashboard from './pages/superadmin/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/garcom/dashboard" element={<GarcomDashboard />} />
      <Route path="/cozinha/dashboard" element={<CozinhaDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/superadmin/dashboard" element={<SuperadminDashboard />} />
      {/* Outras rotas podem ser adicionadas aqui */}
    </Routes>
  );
}

export default App;
