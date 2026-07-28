import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"

export const useLogout = () => {
  const { logout, userType } = useAuth()
  const navigate = useNavigate()

  // useLogout.js
  const handleLogout = async () => {
    try {
      await logout()
    } finally {

      navigate(
        userType === "student"
          ? "/auth/login-student"
          : "/auth/login-teacherUser"
      )
    }
  }

  return { handleLogout }
}