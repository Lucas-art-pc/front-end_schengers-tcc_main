import { Outlet } from "react-router-dom";
import { LayoutGrid, User, Book, LogOut, Headphones } from "lucide-react";
import { TfiAgenda } from "react-icons/tfi";
import { Sidebar } from "../../components/Sidebar";
import { SidebarItem } from "../../components/SidebarItem";

import { useLogout } from "../../hooks/useLogout";

export const StudentLayout = () => {
  const { handleLogout } = useLogout()

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar>
        <SidebarItem
          icon={<LayoutGrid />}
          label="Dashboard"
          to="/student/dashboard"
        />
        <SidebarItem icon={<User />} label="Perfil" to="/student/profile" />
        <SidebarItem
          icon={<TfiAgenda />}
          label="Planos de estudo"
          to="/student/study-plans"
        />
        <SidebarItem
          icon={<Book />}
          label="Meus estudos"
          to="/student/my-courses"
        />

        <SidebarItem
          icon={<Headphones />}
          label="Central de Ajuda"
          to="/student/support"
        />

        <SidebarItem icon={<LogOut />} label="Sair" onClick={handleLogout} />
      </Sidebar>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};
