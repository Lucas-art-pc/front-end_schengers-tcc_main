export const Sidebar = ({children}) => {
  return (
    <aside className="group bg-blue-primary text-white w-20 hover:w-64 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="p-4 text-center font-bold text-lg whitespace-nowrap">
        <span className="group-hover:inline hidden">Área do Aluno</span>
        <span className="group-hover:hidden inline">
          <img
            src="/assets/images-schengers/logo-schengers-branca.png"
            alt="Schengers"
            className="h-10 w-auto object-contain"
          />
          </span>
      </div>

      <nav className="flex flex-col gap-4 mt-6 px-2">
        {children}
      </nav>
    </aside>
  );
};
