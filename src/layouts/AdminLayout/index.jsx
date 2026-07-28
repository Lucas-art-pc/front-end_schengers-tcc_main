import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  Video,
} from "lucide-react";
import { SidebarAdmin } from "../../components/SidebarAdmin";

const COLORS = {
  bluePrimary: "#1E40AF",
  blueHover: "#0B2373",
  blueSecondary: "#CFE2FF",
  yellowPrimary: "#FCAC21",
  yellowHover: "#D68906",
};

// Caminhos relativos ao segmento /admin/
const navItems = [
  { label: "Dashboard",   to: "dashboard",   Icon: LayoutDashboard },
  { label: "Professores", to: "listTeachers", Icon: GraduationCap   },
  { label: "Alunos",      to: "listStudents",      Icon: Users           },
  { label: "Cursos",      to: "listCourses",      Icon: BookOpen        },
  { label: "Áreas de curso",  to: "listAreas",  Icon: ClipboardCheck  },
  { label: "Solicitações",       to: "vacancies",       Icon: Video           },
  { label: "Vagas",       to: "listVacancies",       Icon: Video           },
  { label: "Suportes",       to: "supports",       Icon: Video           },
];

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen font-inter" style={{ background: "#F8FAFC" }}>
      {/* Sidebar */}
      
      <SidebarAdmin navItems={navItems} colors={COLORS} />
      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};