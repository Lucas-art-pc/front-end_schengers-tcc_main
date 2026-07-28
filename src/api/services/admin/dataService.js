import { api } from "../api";

export const countersAdmin = async () => {
  const response = await api.get("admin/counters")
  return response.data;
}

export const classesPerArea = async () => {
  const response = await api.get("admin/classesPerArea")
  return response.data;
}

export const listStudents = async () => {
  const response = await api.get("admin/listStudents")
  return response.data.students;
}

export const listTeachers = async () => {
  const response = await api.get("admin/listTeachers")
  return response.data.teachers;
}

export const listCourses = async () => {
  const response = await api.get("admin/listCourses")
  return response.data;
}

export const curriculumByVacancy = async (public_id) => {
  const response = await api.get(`curriculum/vacancies/${public_id}`)
  return response.data;
}

export const vacanciesAdmin = async () => {
  const response = await api.get(`vacancy/adminVacancies`)
  return response.data;
}

export const showCurriculumByVacancy = async (public_id) => {
  const response = await api.get(`curriculum/${public_id}`)
  return response.data;
}

export const approveCurriculum = async (public_id) => {
  const response = await api.patch(`curriculum/${public_id}/approve`)
  return response.data;
}

export const rejectCurriculum = async (public_id) => {
  const response = await api.patch(`curriculum/${public_id}/reject`)
  return response.data;
}

export const sendTask = async (public_id, data) => {
  const response = await api.post(`task/${public_id}`, data)
  return response.data;
}





