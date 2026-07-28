import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

// PrivateRouteTeacherPending.jsx
export function PrivateRouteTeacherPending() {
  const { isTeacherPending, isTeacherApproved } = useAuth()

  const token = sessionStorage.getItem("token_auth")
  const userType = sessionStorage.getItem("user_type")
  const teacherStatus = sessionStorage.getItem("teacher_status")

  const isAnyTeacher =
    isTeacherPending ||
    isTeacherApproved ||
    (!!token && userType === "teacher" && teacherStatus === "pending") // fallback direto do sessionStorage

  return isAnyTeacher
    ? <Outlet />
    : <Navigate to="/auth/login-teacherUser" replace />
}