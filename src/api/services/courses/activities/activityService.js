import { api } from "../../api";

export const showActivity = async (idCourse, idActivity) => {
  const response = await api.get(`courses/${idCourse}/activities/${idActivity}`)
  return response.data;
}

export const answerActivity = async (answer) => {
  const response = await api.post(`courses/activities/answer`, answer)
  return response.data;
}

export const createActivity = async (idActivity, data) => {
  const response = await api.post(`courses/${idActivity}/activities`, data)
  return response.data;
}

export const updateActivity = async (idCourse, idActivity, data) => {
  const response = await api.patch(`courses/${idCourse}/activities/${idActivity}`, data)
  return response.data;
}

export const deleteActivity = async (idCourse, data) => {
  const response = await api.post(`courses/${idCourse}/activities`, data)
  return response.data;
}