import axios from "../api/axios"
import useAuth from "./useAuth"
import { initialAuthState } from "../context/AuthProvider"
import URL from "../api/routes"

const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth(initialAuthState)

    try {
      const response = await axios(URL.logout, {
        withCredentials: true,
      })
    } catch (err: any) {
      console.error(err)
    }
  }

  return logout
}

export default useLogout
