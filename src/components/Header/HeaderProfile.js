import React, { useContext } from "react"

import { AuthContext } from "../AuthContext"

function HeaderProfile() {
  const { tokenContext, userContext } = useContext(AuthContext)

  const [, setToken] = tokenContext
  const [user, setUser] = userContext

  /* Logout function */
  const handleLogout = () => {
    document.cookie
      .split(";")
      .forEach(
        (c) =>
          (document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            ))
      )

    setUser(null)
    setToken(null)
  }

  return (
    <div className="info-section__auth">
      <div className="profile-info">
        <p className="profile-info__username">
          {user} <i className="ri-shield-flash-line"></i>
        </p>
        <button className="profile-info__logout" onClick={handleLogout}>
          ВЫХОД
        </button>
      </div>
    </div>
  )
}

export default HeaderProfile
