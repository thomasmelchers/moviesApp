import React, { useState, useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refreshToken = useRefreshToken()
  const { auth, persist } = useAuth()
  const isMounted = useRef(true)

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // create a new accessToken if expired
        await refreshToken()
      } catch (error: any) {
        console.error(error)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    // run the function only if there is no valid accessToken
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    return () => {
      isMounted.current = false
    }
  }, [])

  // check if it generate a new accessToken
  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`)
  //   console.log(`at: ${JSON.stringify(auth?.accessToken)}`)
  // }, [isLoading])

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading....</p> : <Outlet />}</>
  )
}

export default PersistLogin
