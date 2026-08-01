import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token_auth"); // ← mesma chave do AuthProvider

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;

      const isLoginPage = path.includes("/auth/login");
      if (isLoginPage) return Promise.reject(error);

      // limpa os dados de autenticação, já que o token expirou
      sessionStorage.removeItem("token_auth");
      sessionStorage.removeItem("user_type");

      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);