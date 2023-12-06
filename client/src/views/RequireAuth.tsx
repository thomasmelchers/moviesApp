import React from "react"
import { Outlet, useLocation, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { jwtDecode } from "jwt-decode"

interface Props {
  allowedRoles: number[]
}

interface accessTokenInterface {
  UserInfo: {
    username: string
    roles: number[]
  }
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  // Extract values from the roles object
  const decoded: accessTokenInterface | undefined = auth?.accessToken
    ? jwtDecode(auth.accessToken)
    : undefined
  const roles = decoded?.UserInfo?.roles || []

  // Check if any of the roles included allowedRoles
  const hasPermission = roles.find((role) => allowedRoles.includes(role))

  return hasPermission ? (
    <Outlet />
  ) : auth.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
