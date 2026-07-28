import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export function PrivateRouteAdmin() {
  const { isAdmin } = useAuth()

  const token = sessionStorage.getItem("token_auth")
  const userType = sessionStorage.getItem("user_type")
  const teacherStatus = sessionStorage.getItem("teacher_status")

  const approved =
    isAdmin ||
    (!!token && userType === "admin" && teacherStatus === "approved")

  return approved
    ? <Outlet />
    : <Navigate to="/auth/login-teacherUser" replace />
}