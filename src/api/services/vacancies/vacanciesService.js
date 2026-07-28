import { api } from "../api"

export const indexVacancies = async () => {
  const response = await api.get("vacancy/")
  return response.data
}

export const createVacancy = async (data) => {
  const response = await api.post(`vacancy/`, data)
  return response.data
}
export const showVacancy = async (public_id) => {
  const response = await api.get(`vacancy/${public_id}`)
  return response.data
}

export const updateVacancy = async (public_id, data) => {
  const response = await api.patch(`vacancy/${public_id}`, data)
  return response.data
}


