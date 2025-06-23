import { useState } from 'react';
import { HiOutlineHome, HiOutlineBuildingOffice2, HiOutlineCreditCard } from 'react-icons/hi2';
import { HiMenu } from 'react-icons/hi';
import { GiChefToque } from 'react-icons/gi';

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão de menu para mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded shadow border"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <HiMenu size={24} />
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r flex flex-col min-h-screen transform transition-transform duration-200 md:relative md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="h-16 flex items-center px-6 font-bold text-xl text-blue-700 gap-2">
          <span className="text-blue-500"><GiChefToque size={28} /></span>
          <span className="text-black">RestaurantOS</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          <a href="/superadmin" className={`flex items-center gap-3 px-4 py-2 rounded-lg ${window.location.pathname === '/superadmin' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
            <HiOutlineHome size={20} /> Dashboard
          </a>
          <a href="/superadmin/empresas" className={`flex items-center gap-3 px-4 py-2 rounded-lg ${window.location.pathname.includes('/superadmin/empresas') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
            <HiOutlineBuildingOffice2 size={20} /> Empresas
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <HiOutlineCreditCard size={20} /> Planos
          </a>
        </nav>
        {/* Botão para fechar no mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-red-500"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        >
          ×
        </button>
      </aside>
      {/* Overlay para mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar; 