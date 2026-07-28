import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const GuestRouteStudent = () => {
  const { isStudent } = useAuth()

  return isStudent
    ? <Navigate to="/student/dashboard" replace />
    : <Outlet />
}