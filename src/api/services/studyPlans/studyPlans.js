import {api} from "../api"

// services/studyPlan.js
export const getPlans = async () => {
  const response = await api.get("studyplan");
  return response.data.plans;
};

export const createPlan = async (task) => {
  const response = await api.post("studyplan", task);
  return response.data;
};

export const updatePlan = async (id, task) => {
  console.log("ID:", id);
  console.log("Body:", task);
  const response = await api.patch(`studyplan/${id}`, task);
  return response.data;
};

export const deletePlan = async (id) => {
  await api.delete(`studyplan/${id}`);
};