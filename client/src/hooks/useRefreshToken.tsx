import axios from "../api/axios"
import { IAuth } from "../context/IAuth"
import useAuth from "./useAuth"

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    })
    setAuth((prev: IAuth) => {
      console.log("previous", JSON.stringify(prev))
      console.log("NEW AT", response.data.accessToken)
      // adding the new accesstoken
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      }
    })
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken
