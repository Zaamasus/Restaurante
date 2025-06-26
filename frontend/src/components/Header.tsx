

function Header() {
    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8 md:pl-64 transition-all duration-200">
        <div className="flex-1 flex justify-center md:justify-start">
          <span className="text-lg font-semibold">Painel Super Administrador</span>
        </div>
        <div className="flex items-center gap-6">
        
          <button className="text-gray-400 hover:text-red-500 ml-2">
            <span className="inline-block align-middle">Sair</span>
          </button>
        </div>
      </header> 
    )

}


  

export default Header;