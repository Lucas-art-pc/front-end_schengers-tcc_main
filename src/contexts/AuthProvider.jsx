import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token_auth") || null
  );
  const [userType, setUserType] = useState(
    () => sessionStorage.getItem("user_type") || null
  );
  const [teacherStatus, setTeacherStatus] = useState(
    () => sessionStorage.getItem("teacher_status") || null
  );

  const saveAuth = (receivedToken, type, status = null) => {
    sessionStorage.setItem("token_auth", receivedToken);
    sessionStorage.setItem("user_type", type);


    if (status) {
      sessionStorage.setItem("teacher_status", status);
    } else {
      sessionStorage.removeItem("teacher_status"); 
    }

    setToken(receivedToken);
    setUserType(type);
    setTeacherStatus(status);
  };

  const logout = () => {
    setToken(null);
    setUserType(null);
    setTeacherStatus(null);
    sessionStorage.removeItem("token_auth");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("teacher_status");
  };

  return (
    <AuthContext.Provider value={{
      token,
      userType,
      teacherStatus,
      isStudent: !!token && userType === "student",
      isTeacherPending: !!token && userType === "teacher" && teacherStatus === "pending",
      isTeacherApproved: !!token && userType === "teacher" && teacherStatus === "approved",
      isAdmin: !!token && userType === "admin",
      saveAuth,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
