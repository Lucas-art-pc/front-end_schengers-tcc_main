import { api } from "../api";

export const logout = async () => {
  try {
    await api.post("auth/logout"); // 1. chama o backend PRIMEIRO
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  } finally {
    // 2. limpa o sessionStorage DEPOIS, independente do resultado
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("auth_token_student");
    sessionStorage.removeItem("auth_token_teacher");
  }
};