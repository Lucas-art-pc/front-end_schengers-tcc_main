
import { api } from "../api";

export const registerTeacherUser = async (data) => {
  const response = await api.post("auth/teacher/register", data)
  return response.data;
}

export const loginTeacherUser = async (data) => {
  const response = await api.post("auth/teacher/login", data)
  return response.data;
}