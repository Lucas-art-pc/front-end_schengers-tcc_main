import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { dataUser } from "../../api/services/auth/dataUser";
import { useLogout } from "../../hooks/useLogout";
import { Typograph } from "../Typograph";

export const SidebarAdmin = ({ navItems}) => {
  const { handleLogout } = useLogout();

  const [user, setUser] = useState(null);

  useEffect(() => {
    dataUser().then(setUser).catch(console.error);
  }, []);

  return (
    <aside className="bg-blue-primary w-60 shrink-0 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="border-b border-b-white px-6 py-5">
        <div className="flex items-center gap-2">
          <img
            src="/assets/images-schengers/logo-schengers-branca.png"
            alt="Schengers"
            className="h-10 w-auto object-contain"
          />
          <Typograph tag="title_small" className="text-white">
            Schengers
          </Typograph>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left
     transition-all duration-200
     ${
       isActive
         ? "bg-yellow-primary text-shadow-blue-primary shadow-sm"
         : "text-white/90 hover:bg-blue-hover/60 hover:text-white hover:pl-4"
     }`
            }
          >
            {label}
          </NavLink>
        ))}
        <NavLink
          onClick={handleLogout}
          className="mt-1 flex items-center px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
          }
        >
          Sair
        </NavLink>
      </nav>

      {/* User */}
      <div
        className="px-4 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-yellow-primary text-shadow-blue-hover w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
            {user?.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-xs font-medium truncate">
              {user?.name}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
