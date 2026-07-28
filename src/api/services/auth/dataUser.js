import { api } from "../api"

export const dataUser = async () => {

  return (await api.get('dataUser')).data
}