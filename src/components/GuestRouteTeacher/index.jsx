import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const GuestRouteTeacher = () => {
  const { isTeacherApproved, isTeacherPending } = useAuth()

  if (isTeacherApproved) return <Navigate to="/teacherAuth/dashboard" replace />
  if (isTeacherPending) return <Navigate to="/teacher/vacancies" replace />

  return <Outlet />
}