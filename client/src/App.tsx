import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./views/Layout"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Unauthorized from "./pages/unauthorized/Unauthorized"
import PersistLogin from "./views/PersistLogin"
import LandingPage from "./pages/landingPage/LandingPage"

function App() {
  const ROLES = {
    user: 1000,
    editor: 2000,
    admin: 3000,
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* PRIVATE ROUTES */}
        <Route element={<PersistLogin />}></Route>

        {/* CATCH ALL OTHER ROUTES */}
      </Route>
    </Routes>
  )
}

export default App
