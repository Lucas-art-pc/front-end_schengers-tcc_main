import { Outlet } from "react-router-dom";
import { SidebarTeacher } from "../../components/SidebarTeacher";
import { HeaderTeacher } from "../../components/HeaderTeacher";

export const TeacherLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarTeacher />

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col">
        <HeaderTeacher />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};