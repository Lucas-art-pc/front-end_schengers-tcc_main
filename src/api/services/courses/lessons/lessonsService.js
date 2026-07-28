import { api } from "../../api";

export const showLesson = async (idCourse, idLesson) => {
  const response = await api.get(`courses/${idCourse}/classes/${idLesson}`)
  return response.data.classCourse
}

export const watchedLesson = async (idLesson) => {
  try {
    const response = await api.post(`courses/${idLesson}/watchedLesson`)
    return response.data.is_completed
  } catch (err) {
    throw err.response?.data || err;
  }
}

export const getWatchedLesson = async (idLesson) => {
  const response = await api.get(`courses/${idLesson}/verifyLesson`)
  return response.data.is_completed
}

export const createLesson = async (idCourse, data) => {
  try {
    const response = await api.post(`courses/${idCourse}/classes`, data)
    return response.data
  } catch (err) {
    console.error("Validation error detail:", err.response?.data)
    throw err
  }
}