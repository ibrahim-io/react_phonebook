import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const update = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj)
}

const create = (newObj) => {
  return axios.post(baseUrl, newObj)
}

export default { getAll, create, update }