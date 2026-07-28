import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

// PrivateRouteTeacherApproved.jsx
export function PrivateRouteTeacherApproved() {
  const { isTeacherApproved } = useAuth()

  const token = sessionStorage.getItem("token_auth")
  const userType = sessionStorage.getItem("user_type")
  const teacherStatus = sessionStorage.getItem("teacher_status")

  const approved =
    isTeacherApproved ||
    (!!token && userType === "teacher" && teacherStatus === "approved")

  return approved
    ? <Outlet />
    : <Navigate to="/teacher/vacancies" replace />
}