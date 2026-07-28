import { NavLink } from "react-router-dom";

export const SidebarItem = ({ icon, label, to, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 p-3 rounded-lg transition group
      ${isActive ? "bg-blue-900 text-white" : "hover:bg-blue-800"}`
    }
    onClick={onClick}
  >
    {icon}
    <span className="opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
      {label}
    </span>
  </NavLink>
);