
import { api } from "../api";

/**
 * Cria um novo aluno
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {Date} data.date_of_birthday
 * @param {string} data.term_privacy
 * @param {string} data.password
 * @param {string} data.password_confirmation
 */
export const createStudent = async (data) => {
  const response = await api.post("auth/user/register", data);
  return response.data;
};

// studentAuthService.js
export const loginStudent = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
}


export const editPasswordUser = async (data) => {
  try {
    const response = await api.post("auth/change-password", data)
    return response.data
  }
  catch (error) {
    throw error.response?.data || error;
  }
}

export const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append("url_image_profile", file);

  const { data } = await api.post("auth/update-avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("auth/forgot-password", { email });
  return response.data;
};

export const resetPassword = async ({ token, email, password, password_confirmation }) => {
  const response = await api.post("auth/reset-password", {
    token,
    email,
    password,
    password_confirmation,
  });
  return response.data;
};