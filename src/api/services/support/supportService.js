import { api } from "../api";
export const createSupportMessage = async (data) => {
  const response = await api.post("/support",data);
  return response.data;
};

/**
 * Lista as mensagens de suporte do usuário autenticado.
 * Rota: GET /support/supportByUser
 */
export const getMySupportMessages = async () => {
  const response = await api.get("/support/supportByUser");
  return response.data;
};


/**
 * Lista todos os supports enviados pelos alunos.
 * Rota: GET /support
 */
export const getAllSupports = async () => {
  const response = await api.get("/support");
  return response.data;
};

/**
 * Atualiza o status de um support.
 * Rota: POST /support/{public_id}
 *
 * Assumi que o body espera "status_support" com os valores
 * pendente / em_andamento / resolvido — ajusta se o seu updateStatus
 * usar outro nome de campo ou outros valores.
 */
export const updateSupportStatus = async (public_id, data) => {
  const response = await api.post(`/support/${public_id}`, data);
  return response.data;
};

/**
 * Remove um support.
 * Rota: DELETE /support/{public_id}
 */
export const deleteSupport = async (public_id) => {
  const response = await api.delete(`/support/${public_id}`);
  return response.data;
};