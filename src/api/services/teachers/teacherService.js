import { api } from "../api";

export const getTasksTeacher = async () => {
  const response = await api.get("task/tasksByTeacher")
  console.log(response.data)
  return response.data
}