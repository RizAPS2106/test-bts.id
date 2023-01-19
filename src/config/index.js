import axios from 'axios'

const API_URL = 'http://94.74.86.174:8080/api'

const getToken = () => {
  const tokenString = sessionStorage.getItem('token')
  const userToken = JSON.parse(tokenString)

  return userToken
}

export const AxiosCustom = axios.create({
  withCredentials: false,
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})
