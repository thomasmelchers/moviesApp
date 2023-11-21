import React from "react"
import { Outlet, useLocation, Navigate } from "react-router-dom"

const RequireAuth = () => {
  const location = useLocation()

  return <Outlet />
}

export default RequireAuth
