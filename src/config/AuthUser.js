import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthUser() {
    const API_URL = 'http://94.74.86.174:8080/api'
    
    const navigate = useNavigate()

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString)
        
        return userToken
    }

    const [token, setToken] = useState(getToken())
    
    const saveToken = (token) => {
        sessionStorage.setItem('token', JSON.stringify(token))

        setToken(token)
        window.location.reload()
    }

    const logout = () => { 
        sessionStorage.clear()
        navigate('/')
    }

    const AxiosAuth = axios.create({
        withCredentials: false,
        baseURL: API_URL,
    })

    return {
        AxiosAuth,
        token,
        getToken,
        setToken:saveToken,
        logout
    }
}