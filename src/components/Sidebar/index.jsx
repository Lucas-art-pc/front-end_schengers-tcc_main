export const Sidebar = ({children}) => {
  return (
    <aside className="bg-blue-primary text-white w-58 flex flex-col overflow-hidden">
      <div className="p-4 text-center font-bold text-lg whitespace-nowrap">
        <span className="inline">Área do Aluno</span>
      </div>

      <nav className="flex flex-col gap-4 mt-6 px-2">
        {children}
      </nav>
    </aside>
  );
};