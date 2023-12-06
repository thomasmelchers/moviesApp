import React from "react"
import { useNavigate } from "react-router-dom"
import useLogout from "../../hooks/useLogout"

const NavBar = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  const signOut = async () => {
    await logout()
    navigate("/")
  }

  return (
    <div>
      <button onClick={signOut}>sign Out</button>
    </div>
  )
}

export default NavBar
