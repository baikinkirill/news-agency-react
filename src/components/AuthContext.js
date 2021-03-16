import React, { useState, useEffect, createContext } from "react"
import Cookies from "js-cookie"
import axios from "axios"

import config from "../config.json"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(Cookies.get("token"))
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: `${config.json_server_address}/tokens`,
      responseType: "json"
    })
      .then((response) => {
        response.data.includes(token)
          ? setUser(Cookies.get("user"))
          : setUser(null)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        tokenContext: [token, setToken],
        userContext: [user, setUser],
        loadingContext: [isLoading, setIsLoading]
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
