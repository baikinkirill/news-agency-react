import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const getCookie = (name) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
        else return null 
    }

    const [token, setToken] = useState(getCookie('token'))
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios({ method: 'get', url: 'http://localhost:5500/tokens', responseType: 'json' })
            .then(response => response.data.includes(token) ? setUser(getCookie('user')) : setUser(null))
            .catch(error => console.log(error))

    }, [token])

    return (
        <AuthContext.Provider value={{ tokenContext: [token, setToken], userContext: [user, setUser] }}>
            {children}
        </AuthContext.Provider>
    )
}