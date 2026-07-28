// PrivateRouteStudent.jsx — é um COMPONENTE
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PrivateRouteStudent() {
  const { isStudent } = useAuth() // usa o hook...
  return isStudent               // ...mas retorna JSX = componente
    ? <Outlet />
    : <Navigate to="/auth/login-student" replace />
}