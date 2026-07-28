import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

export const SidebarTeacher = () => {
  const { pathname } = useLocation();


  const { handleLogout } = useLogout()

  const menu = [
    { name: "Dashboard", path: "/teacherAuth/dashboard" },
    { name: "Cursos", path: "/teacherAuth/courses" },
    { name: "Notificações", path: "/teacherAuth/tasks" },
  ];

  return (
    <aside className="bg-blue-primary w-64 flex flex-col">
      {/* Logo */}
      <div
        className="h-14 flex items-center px-6 shrink-0"
        style={{ borderBottom: "1px solid #1e3a8a" }}
      >
        <span className="text-white text-sm font-bold tracking-widest uppercase">
          Schengers
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-0.5">
        {menu.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-white/20 text-white"
                  : "text-blue-200 hover:bg-blue-hover/10 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3" style={{ borderTop: "1px solid #1e3a8a" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Sair
        </button>
      </div>
    </aside>
  );
};