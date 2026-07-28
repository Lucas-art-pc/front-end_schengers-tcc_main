import { api } from "../api";

export const storeCurriculum = async (public_id, formData) => {
  const response = await api.post(`curriculum/vacancies/${public_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};