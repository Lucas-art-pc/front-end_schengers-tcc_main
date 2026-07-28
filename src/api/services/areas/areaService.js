import { api } from "../api";

export const listAreas = async () => {
  const response = await api.get("areas")
  return response.data;
}

export const createAreas = async (data) => {
  const response = await api.post("areas", data)
  return response.data;
}