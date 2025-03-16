export function Navbar() {
    return (
      <header className="fixed top-0 w-full background-blue-md bg-black/30 border-b border-gray-700 border-opacity-20 z-50">
          <nav className="wax-w-7xl mx-auto py-6 pc-6 lg:px-32 flex items-center justify-between text-white">
          <div className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-red-600 via-rose-500 to-red-400 text-transparent bg-clip-text transition-all duration-300 hover:scale-110">
                <span>SEEDHE </span>
                <span className="text-white">MAUT</span>
            </div>
             <div>
                <img src="/logo.png" className=" h-10 w-10">
                </img>
             </div>
          </nav>
      </header>
    )
  }